import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { StringInput } from "../form/StringInput";
import { FileInput } from "../form/FileInput";
import { useEffect, useState } from "react";
import { useToaster } from "~/utils/hooks/useToaster";
import { getRemStockSetting } from "~/utils/function/stockLocal";
import { useSession } from "next-auth/react";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import { useUploader } from "~/utils/hooks/useUploader";

const buyStockSchema = z.object({
  stockSettingId: z.string(),
  quantity: z.number(),
  buyerName: z.string(),
  buyerAddress: z.string().optional(),
  imageUrl: z.string().optional(),
});

type BuyStockFields = z.infer<typeof buyStockSchema>;

export const BtnBuyStock = () => {
  const toaster = useToaster();
  const { data: session } = useSession();
  const uploader = useUploader();

  const { register, formState, handleSubmit, reset, getValues, setValue } =
    useForm<BuyStockFields>({
      resolver: zodResolver(buyStockSchema),
    });

  const fileStateArr = useState<File | undefined | null>(null);

  const getStockSettingList = api.stock.getStockSettingList.useQuery();
  const createStockExchange = api.stock.createStockExchange.useMutation();
  const updateStockExchange = api.stock.updateStockExchange.useMutation();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const displayStockExchangeCreator = () => {
    onOpen();
  };

  const onSubmit = handleSubmit(async (data: BuyStockFields) => {
    const newData = await createStockExchange.mutateAsync(data);

    const file = fileStateArr[0];
    if (file) {
      const img = await uploader.uploader(
        newData.id,
        FolderEnum.PAYMENT_PROOF,
        file.name?.split(".").pop() as AllowableFileTypeEnum ?? AllowableFileTypeEnum.PNG,
        file
      );
      newData.imageUrl = img?.url ?? "";

      toaster(updateStockExchange.mutateAsync({
        ...newData
      }));
    }

    
    reset();
    onClose();
  });

  useEffect(() => {
    setValue("buyerAddress", session?.user.address ?? "");

    const initialStockId = getRemStockSetting();
    if (!initialStockId) {
      return;
    }

    setValue("stockSettingId", initialStockId);
    displayStockExchangeCreator();
  });

  return (
    <>
      <Button
        w="min(10em, 80%)"
        mx={{ base: "auto", lg: "1em" }}
        onClick={onOpen}
      >
        Beli Sekarang
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Beli Saham</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="cream.100" fontWeight="bold" fontSize="xl">
              Jenis Saham*
            </Text>
            <Select {...register("stockSettingId")}>
              {getStockSettingList.data?.map((stockSetting) => (
                <option
                  key={stockSetting.id}
                  value={stockSetting.id}
                >{`${stockSetting.name} (${stockSetting.code})`}</option>
              ))}
            </Select>
            <StringInput
              title={"Jumlah Saham*"}
              field="quantity"
              register={register}
              error={formState.errors.quantity}
              type="number"
            />
            <StringInput
              title={"Nama Pembeli*"}
              field="buyerName"
              register={register}
              error={formState.errors.buyerName}
            />
            <StringInput
              title={"Alamat Pembeli*"}
              field="buyerAddress"
              register={register}
              error={formState.errors.buyerAddress}
            />
            <Text color="cream.100" fontWeight="bold" fontSize="xl">
              Bukti Pembayaran
            </Text>
            <FileInput
              fileStateArr={fileStateArr}
              allowed={[
                AllowableFileTypeEnum.JPEG,
                AllowableFileTypeEnum.PDF,
                AllowableFileTypeEnum.PICTURES,
              ]}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmit}>Beli Sekarang</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

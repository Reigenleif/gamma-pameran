import {
  Button,
  Flex,
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
import { api, RouterInputs, RouterOutputs } from "~/utils/api";
import { StringInput } from "../form/StringInput";
import { FileInput } from "../form/FileInput";
import { useCallback, useEffect, useState } from "react";
import { useToaster } from "~/utils/hooks/useToaster";
import { getRemStockSetting } from "~/utils/function/stockLocal";
import { useSession } from "next-auth/react";
import { AllowableFileTypeEnum, FolderEnum } from "~/utils/file";
import { useUploader } from "~/utils/hooks/useUploader";
import { toCurrencyStr } from "~/utils/function/toCurrencyStr";
import { extensionContentTypeConverter } from "~/utils/function/extensionContentTypeConverter";

const buyStockSchema = z.object({
  stockSettingId: z.string(),
  quantity: z
    .number()
    .positive("Jumlah saham harus positif")
    .int("Jumlah saham harus bilangan bulat"),
  buyerName: z.string().optional(),
  buyerAddress: z.string().optional(),
  imageUrl: z.string().optional(),
});

type BuyStockFields = z.infer<typeof buyStockSchema>;

interface BtnBuyStockProps {
  stockSettingList: RouterOutputs["stock"]["getStockSettingList"];
  createStockExchangeMutation: (
    data: RouterInputs["stock"]["createStockExchange"]
  ) => Promise<RouterOutputs["stock"]["createStockExchange"]>;
  updateStockExchangeMutation: (
    data: RouterInputs["stock"]["updateStockExchange"]
  ) => Promise<RouterOutputs["stock"]["updateStockExchange"]>;
}

export const BtnBuyStock = ({
  stockSettingList,
  createStockExchangeMutation,
  updateStockExchangeMutation,
}: BtnBuyStockProps) => {
  const toaster = useToaster();
  const { data: session } = useSession();
  const uploader = useUploader();

  const {
    register,
    formState,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<BuyStockFields>({
    resolver: zodResolver(buyStockSchema),
  });

  const fileStateArr = useState<File | undefined | null>(null);
  console.log(fileStateArr[0], !!fileStateArr[0]);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const displayStockExchangeCreator = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const onSubmit = handleSubmit(async (data: BuyStockFields) => {
    const newData = await createStockExchangeMutation({
      ...data,
    });

    const file = fileStateArr[0];
    if (file) {
      const contentType = extensionContentTypeConverter(
        file.name?.split(".").pop() ?? ""
      );
      const img = await uploader.uploader(
        newData.id,
        FolderEnum.PAYMENT_PROOF,
        contentType,
        file
      );

      toaster(
        updateStockExchangeMutation({
          id: newData.id,
          imageUrl: img?.url,
        })
      );
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
  }, [displayStockExchangeCreator, setValue, session]);

  const selectedStockSettting = stockSettingList.find(
    (stockSetting) => stockSetting.id === watch("stockSettingId")
  ) ?? {
    maxStock: 0,
    stockExchangeSum: 0,
    price: 0,
  };

  const remainingStockQuantity = selectedStockSettting
    ? selectedStockSettting.maxStock - selectedStockSettting.stockExchangeSum
    : null;
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
              {stockSettingList.map((stockSetting) => (
                <option
                  key={stockSetting.id}
                  value={stockSetting.id}
                >{`${stockSetting.name} (${stockSetting.code})`}</option>
              ))}
            </Select>

            <Flex
              color="black"
              bg="cream.300"
              w="calc(100% + 3em)"
              flexDir="column"
              mx="-1.5em"
              borderRadius="10px"
              p="2em"
            >
              <StringInput
                title={"Jumlah Saham*"}
                field="quantity"
                register={register}
                error={formState.errors.quantity}
                type="number"
              />
              <Text fontSize="md">
                Lembar Tersisa : {remainingStockQuantity ?? "Loading..."}
              </Text>
              <Text>
                Jumlah yang harus dibayar :{" "}
                {toCurrencyStr(
                  remainingStockQuantity
                    ? watch("quantity") * selectedStockSettting.price
                    : 0
                )}
              </Text>
            </Flex>
            <Text>Informasi Pembayaran: </Text>
            <Text>Bank BCA, No. Rek: 7773058107 a.n. Kardina Sari Wardhani</Text>
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

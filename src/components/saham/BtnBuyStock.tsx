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
import { useState } from "react";
import { useToaster } from "~/utils/hooks/useToaster";

const buyStockSchema = z.object({
  stockSettingId: z.string(),
  quantity: z.number(),
  buyerName: z.string(),
  imageUrl: z.string().optional(),
});

type BuyStockFields = z.infer<typeof buyStockSchema>;

export const BtnBuyStock= () => {
  const toaster = useToaster();
  const { register, formState, handleSubmit, reset, getValues } =
    useForm<BuyStockFields>({
      resolver: zodResolver(buyStockSchema),
    });

  const fileStateArr = useState<File | undefined | null>(null);

  const getStockSettingList = api.stock.getStockSettingList.useQuery();
  const createStockExchange = api.stock.createStockExchange.useMutation();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const displayStockExchangeCreator = () => {
    onOpen();
  }

  const onSubmit = handleSubmit(async (data: BuyStockFields) => {
    toaster(createStockExchange.mutateAsync(data));
    reset();
    onClose();
  });

  return (
    <>
      <Button
        w="min(10em, 80%)"
        mx={{ base: "auto", lg: "1em" }}
        onClick={onOpen}
      >
        Beli Saham
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Beli Saham</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="cream.100" fontWeight="bold" fontSize="xl">
              Jenis Saham
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
              title={"Jumlah Saham"}
              field="quantity"
              register={register}
              error={formState.errors.quantity}
              type="number"
            />
            <StringInput
              title={"Nama Pembeli"}
              field="buyerName"
              register={register}
              error={formState.errors.buyerName}
            />
            <FileInput fileStateArr={fileStateArr} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmit}>
                Beli Saham
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

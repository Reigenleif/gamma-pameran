import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import { api, RouterInputs } from "~/utils/api";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StringInput } from "~/components/form/StringInput";
import { useToaster } from "~/utils/hooks/useToaster";

const StockSettingFormSchema = z.object({
  code: z.string(),
  description: z.string().optional(),
  maxStock: z.number(),
  name: z.string(),
  price: z.number(),
});

type StockSettingFormFields = z.infer<typeof StockSettingFormSchema>;

export const StockSettingComponent = () => {
  const toaster = useToaster();
  const { register, formState, handleSubmit, reset, setValue } =
    useForm<StockSettingFormFields>({
      resolver: zodResolver(StockSettingFormSchema),
    });

  const getStockSettingList = api.stock.adminGetStockSettingList.useQuery();
  const createStockSetting = api.stock.adminCreateStockSetting.useMutation();
  const updateStockSetting =
    api.stock.adminUpdateStockSettingById.useMutation();

  const stockSettingList = getStockSettingList.data;

  const stockSettingDisclosure = useDisclosure();
  const [selectedStockSettingId, setSelectedStockSettingId] = useState<
    string | null
  >(null);

  const displayStockSettingEditor = (stockSettingId: string) => {
    setSelectedStockSettingId(stockSettingId);
    const selectedStockSetting = stockSettingList?.find(
      (stockSetting) => stockSetting.id === stockSettingId
    );

    if (selectedStockSetting) {
      setValue("code", selectedStockSetting.code);
      setValue("description", selectedStockSetting.description);
      setValue("maxStock", selectedStockSetting.maxStock);
      setValue("name", selectedStockSetting.name);
      setValue("price", selectedStockSetting.price);
    }
    stockSettingDisclosure.onOpen();
  };

  const onSubmit = handleSubmit(async (data: StockSettingFormFields) => {
    if (selectedStockSettingId) {
      toaster(
        updateStockSetting.mutateAsync({
          id: selectedStockSettingId,
          ...data,
        })
      );
    } else {
      toaster(createStockSetting.mutateAsync(data));
    }
    stockSettingDisclosure.onClose();
    getStockSettingList.refetch();
    reset();
  });

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold">
        Pengaturan Saham
      </Text>
      <TableContainer>
        <Table>
          <Tr fontWeight="bold">
            <Td>No</Td>
            <Td>Kode</Td>
            <Td>Nama Saham</Td>
            <Td>Harga</Td>
            <Td>Lembar Total</Td>
            <Td>Lembar Tersisa</Td>
            <Td>Edit</Td>
          </Tr>
          {stockSettingList?.map((stockSetting, idx) => {
            return (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{stockSetting.code}</Td>
                <Td>{stockSetting.name}</Td>
                <Td>{stockSetting.price}</Td>
                <Td>{stockSetting.maxStock}</Td>
                <Td>{stockSetting.maxStock - stockSetting.stockExchangeSum}</Td>
                <Td>
                  <Button
                    variant="icon"
                    onClick={() => displayStockSettingEditor(stockSetting.id)}
                  >
                    <MdEdit />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Table>
      </TableContainer>
      <Modal
        isOpen={stockSettingDisclosure.isOpen}
        onClose={stockSettingDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Edit Pengaturan Saham</ModalHeader>
          <ModalBody>
            <StringInput
              field="code"
              title="Kode Saham"
              register={register}
              error={formState.errors.code}
            />
            <StringInput
              field="name"
              title="Nama Saham"
              register={register}
              error={formState.errors.name}
            />
            <StringInput
              field="description"
              title="Deskripsi"
              register={register}
              error={formState.errors.description}
            />
            <StringInput
              field="price"
              title="Harga"
              type="number"
              register={register}
              error={formState.errors.price}
            />
            <StringInput
              field="maxStock"
              title="Lembar Saham"
              type="number"
              register={register}
              error={formState.errors.maxStock}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmit}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

import {
  Flex,
  Text,
  Table,
  Td,
  Tr,
  Button,
  Modal,
  useDisclosure,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { BtnBuyStock } from "~/components/saham/BtnBuyStock";
import { api, RouterInputs, RouterOutputs } from "~/utils/api";
import { StringInput } from "../form/StringInput";
import { useState } from "react";
import { useUploader } from "~/utils/hooks/useUploader";
import { FolderEnum } from "~/utils/file";
import { extensionContentTypeConverter } from "~/utils/function/extensionContentTypeConverter";
import { useToaster } from "~/utils/hooks/useToaster";
import { FileInput } from "../form/FileInput";

interface UserStockExchangeTableProps {
  userStockExchangeList: RouterOutputs["stock"]["getUserStockExchangeList"];
  updateStockExchangeMutation: (
    data: RouterInputs["stock"]["updateStockExchange"]
  ) => Promise<RouterOutputs["stock"]["updateStockExchange"]>;
}

export const UserStockExchangeTable = ({
  userStockExchangeList,
  updateStockExchangeMutation,
}: UserStockExchangeTableProps) => {
  const { uploader } = useUploader();
  const toaster = useToaster();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fileStateArr = useState<File | null | undefined>(null);
  const [selectedStockExchangeId, setSelectedStockExchangeId] =
    useState<string>("");

  const onSubmit = async () => {
    const [file] = fileStateArr;
    if (!file) {
      return;
    }

    const extension = file.name.split(".").pop() ?? "";
    const contentType = extensionContentTypeConverter(extension);

    const img = await uploader(
      selectedStockExchangeId + "." + extension,
      FolderEnum.PAYMENT_PROOF,
      contentType,
      file
    );

    const newData = {
      imageUrl: img?.url ?? "",
    };

    toaster(updateStockExchangeMutation(newData));
    onClose();
  };

  return (
    <>
      <Table fontSize="sm">
        <Tr fontWeight="bold">
          <Td>Atas Nama</Td>
          <Td>Jumlah (Lembar)</Td>
          <Td>Beli di Harga (Rp)</Td>
          <Td>Total Nilai (Rp)</Td>
          <Td>Status</Td>
          <Td>Bukti Pembayaran</Td>
        </Tr>
        {userStockExchangeList.map((stockExchange) => (
          <Tr key={stockExchange.id}>
            <Td>{stockExchange.buyerName}</Td>
            <Td>{stockExchange.quantity}</Td>
            <Td>{stockExchange.price}</Td>
            <Td>{stockExchange.price * stockExchange.quantity}</Td>
            <Td>
              {stockExchange.imageUrl ? (
                stockExchange.status
              ) : (
                <Text>Belum Upload Bukti Pembayaran</Text>
              )}
            </Td>
            <Td>
              {stockExchange.imageUrl ? (
                <Flex gap="0.5em">
                  <Button>
                    <a
                      href={stockExchange.imageUrl ?? ""}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Lihat Bukti Pembayaran
                    </a>
                  </Button>
                  <Button onClick={onOpen}>Unggah Ulang</Button>
                </Flex>
              ) : (
                <Button onClick={onOpen}>Unggah Bukti</Button>
              )}
            </Td>
          </Tr>
        ))}
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Pembelian Saham</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="cream.100" fontWeight="bold" fontSize="xl">
              Bukti Pembayaran
            </Text>
            <FileInput fileStateArr={fileStateArr} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmit}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

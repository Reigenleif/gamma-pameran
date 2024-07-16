import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalCloseButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { StockExchangeConfirmationStatus } from "~/utils/enums";
import { FaEye } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { StringInput } from "~/components/form/StringInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEdit } from "react-icons/md";
import { useToaster } from "~/utils/hooks/useToaster";

const editStockExchangeSchema = z.object({
  price: z.number(),
  quantity: z.number(),
});

type EditStockExchangeFields = z.infer<typeof editStockExchangeSchema>;

export const StockExchangeComponent = () => {
  const toaster = useToaster();
  const [buyerNameSearchInput, setBuyerNameSearchInput] = useState("");
  const [statusSearchInput, setStatusSearchInput] = useState<
    StockExchangeConfirmationStatus | undefined
  >();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getStockExchangeList = api.stock.adminGetStockExchangeList.useQuery({
    buyerName: buyerNameSearchInput,
    status: statusSearchInput,
    page,
    pageSize,
  });
  const updateStockExchange =
    api.stock.adminUpdateStockExchangeById.useMutation();

  const stockExchangeList = getStockExchangeList.data?.data ?? [];
  const maxPage = Math.ceil(
    (getStockExchangeList.data?.metadata.count ?? 0) / pageSize
  );

  const onUpdateStatus =
    (id: string, status: StockExchangeConfirmationStatus) => () => {
      updateStockExchange.mutate({
        id,
        status,
      });
      getStockExchangeList.refetch();
    };

  const { register, formState, handleSubmit, setValue } =
    useForm<EditStockExchangeFields>({
      resolver: zodResolver(editStockExchangeSchema),
    });

  const [selectedStockExchangeId, setSelectedStockExchangeId] = useState<
    string | null
  >(null);

  const displayStockExchangeEditor = (stockExchangeId: string) => {
    setSelectedStockExchangeId(stockExchangeId);
    const selectedStockExchange = stockExchangeList?.find(
      (stockExchange) => stockExchange.id === stockExchangeId
    );

    if (selectedStockExchange) {
      setValue("price", selectedStockExchange.price);
      setValue("quantity", selectedStockExchange.quantity);
    }

    stockExchangeDisclosure.onOpen();
  };

  const stockExchangeDisclosure = useDisclosure();

  const onSubmit = handleSubmit(async (data: EditStockExchangeFields) => {
    if (selectedStockExchangeId) {
      toaster(
        updateStockExchange.mutateAsync({
          id: selectedStockExchangeId,
          ...data,
        })
      );
    }
    stockExchangeDisclosure.onClose();
    getStockExchangeList.refetch();
  });

  return (
    <Flex flexDir="column">
      <Text fontSize="2xl" fontWeight="bold">
        Daftar Pembeli Lembar Saham
      </Text>
      <Text>Cari Pembelian Saham</Text>
      <TableContainer>
        <Table w="min(40em, 40%)">
          <Tr>
            <Td>Nama Pembeli</Td>
            <Td>
              <Input
                value={buyerNameSearchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setBuyerNameSearchInput(e.target.value)
                }
                w="20em"
              />
            </Td>
          </Tr>
          <Tr>
            <Td>Status</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={
                    statusSearchInput ==
                    StockExchangeConfirmationStatus.ACCEPTED
                      ? "green.400"
                      : statusSearchInput ==
                        StockExchangeConfirmationStatus.PENDING
                      ? "yellow.400"
                      : statusSearchInput ==
                        StockExchangeConfirmationStatus.REJECTED
                      ? "red.400"
                      : undefined
                  }
                >
                  {statusSearchInput ?? "Semua"}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => setStatusSearchInput(undefined)}
                    key="all"
                  >
                    Semua
                  </MenuItem>
                  {Object.values(StockExchangeConfirmationStatus).map(
                    (status) => (
                      <MenuItem
                        onClick={() => setStatusSearchInput(status)}
                        key={status}
                        bg={
                          status == StockExchangeConfirmationStatus.ACCEPTED
                            ? "green.400"
                            : status == StockExchangeConfirmationStatus.PENDING
                            ? "yellow.400"
                            : status == StockExchangeConfirmationStatus.REJECTED
                            ? "red.400"
                            : ""
                        }
                      >
                        {status}
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </Menu>
            </Td>
          </Tr>

          <Tr>
            <Td>
              <Flex gap="1em" alignItems="center">
                <Button
                  onClick={() =>
                    setPage((curr) => (curr - 1 <= 0 ? maxPage : curr - 1))
                  }
                >
                  Prev
                </Button>
                <Text>{page}</Text>
                <Button
                  onClick={() =>
                    setPage((curr) => (curr + 1 > maxPage ? 1 : curr + 1))
                  }
                >
                  Next
                </Button>
              </Flex>
            </Td>
          </Tr>
        </Table>
      </TableContainer>
      <Box overflowX="auto" w="80vw" className="scrollable">
        <TableContainer>
          <Table>
            <Thead>
              <Tr fontWeight="bold">
                <Td> No. </Td>
                <Td>Jenis Saham</Td>
                <Td> Nama Pembeli </Td>
                <Td> Harga Saat Beli (Rp)</Td>
                <Td> Jumlah </Td>
                <Td> Kode Saham</Td>
                <Td> Bukti Pembayaran</Td>
                <Td> Status </Td>
                <Td> Edit</Td>
              </Tr>
            </Thead>
            {stockExchangeList?.map((stockExchange, index) => (
              <Tbody key={stockExchange.id}>
                <Tr>
                  <Td>{(page - 1) * pageSize + index + 1}</Td>
                  <Td>{stockExchange.StockSetting?.code ?? "-"}</Td>
                  <Td>{stockExchange.buyerName}</Td>
                  <Td>{stockExchange.price}</Td>
                  <Td>{stockExchange.quantity}</Td>
                  <Td>{stockExchange.code} - {stockExchange.code + stockExchange.quantity - 1}</Td>
                  <Td>
                    {stockExchange.imageUrl ? (
                      <Button>
                        <a href={stockExchange.imageUrl ?? ""} target="_blank">
                          <FaEye size="2em" />
                        </a>
                      </Button>
                    ) : (
                      <Text>Belum Upload</Text>
                    )}
                  </Td>
                  <Td>
                    {" "}
                    <BtnStatus
                      status={
                        stockExchange.status as StockExchangeConfirmationStatus
                      }
                      stockExchangeId={stockExchange.id}
                      onUpdateStatus={onUpdateStatus}
                    />
                  </Td>
                  <Td cursor="pointer">
                    <MdEdit onClick={stockExchangeDisclosure.onOpen} />
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Box>
      <Modal
        isOpen={stockExchangeDisclosure.isOpen}
        onClose={stockExchangeDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Edit Pengaturan Saham</ModalHeader>
          <ModalBody>
            <StringInput
              field="quantity"
              title="Jumlah Saham"
              register={register}
              error={formState.errors.quantity}
            />
            <StringInput
              field="price"
              title="Harga Saat Beli"
              register={register}
              error={formState.errors.price}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmit}>Simpan</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

interface BtnStatusProps {
  status: StockExchangeConfirmationStatus;
  stockExchangeId: string;
  onUpdateStatus: (
    id: string,
    status: StockExchangeConfirmationStatus
  ) => () => void;
}

const BtnStatus = ({
  status,
  stockExchangeId,
  onUpdateStatus,
}: BtnStatusProps) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        p="0.5em"
        borderRadius="5px"
        _hover={{}}
        border="1px solid"
        bg={
          status == StockExchangeConfirmationStatus.ACCEPTED
            ? "green.400"
            : status == StockExchangeConfirmationStatus.PENDING
            ? "yellow.400"
            : status == StockExchangeConfirmationStatus.REJECTED
            ? "red.400"
            : ""
        }
        color="cream.100"
      >
        {status}
      </MenuButton>
      <MenuList as={Flex} gap="1em" p="1em">
        {status != StockExchangeConfirmationStatus.ACCEPTED && (
          <Button
            onClick={onUpdateStatus(
              stockExchangeId,
              StockExchangeConfirmationStatus.ACCEPTED
            )}
            bg="green"
          >
            Accept
          </Button>
        )}
        {status != StockExchangeConfirmationStatus.PENDING && (
          <Button
            onClick={onUpdateStatus(
              stockExchangeId,
              StockExchangeConfirmationStatus.PENDING
            )}
            bg="yellow"
          >
            Pending
          </Button>
        )}
        {status != StockExchangeConfirmationStatus.REJECTED && (
          <Button
            onClick={onUpdateStatus(
              stockExchangeId,
              StockExchangeConfirmationStatus.REJECTED
            )}
            bg="red"
          >
            Reject
          </Button>
        )}
      </MenuList>
    </Menu>
  );
};

interface BtnDeleteStockExchangeProps {
  stockExchangeId: string;
  onDeleteStockExchange: (id: string) => void;
}

const BtnDeleteStockExchange = ({
  stockExchangeId,
  onDeleteStockExchange,
}: BtnDeleteStockExchangeProps) => {
  return (
    <Button
      onClick={() => {
        onDeleteStockExchange(stockExchangeId);
      }}
    >
      Delete
    </Button>
  );
};

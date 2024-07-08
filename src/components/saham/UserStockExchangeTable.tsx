import { Flex, Text, Table, Td, Tr, Button } from "@chakra-ui/react";
import { BtnBuyStock } from "~/components/saham/BtnBuyStock";
import { api } from "~/utils/api";
export const UserStockExchangeTable = () => {
  const getUserStockExchangeQuery =
    api.stock.getUserStockExchangeList.useQuery();

  const userStockExchangeList = getUserStockExchangeQuery.data ?? [];
  return (
    <>
      {userStockExchangeList.length > 0 ? (
        <Table>
          <Tr fontWeight="bold">
            <Td>Atas Nama</Td>
            <Td>Jumlah (Lembar)</Td>
            <Td>Beli di Harga (Rp)</Td>
            <Td>Status</Td>
            <Td>Download Bukti Pembayaran</Td>
          </Tr>
          {userStockExchangeList.map((stockExchange) => (
            <Tr key={stockExchange.id}>
              <Td>{stockExchange.buyerName}</Td>
              <Td>{stockExchange.quantity}</Td>
              <Td>{stockExchange.price}</Td>
              <Td>{stockExchange.status}</Td>
              <Td>
                <Button>
                  <a
                    href={stockExchange.imageUrl ?? ""}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </Button>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <Flex flexDir="column" alignItems="center" py="2em" gap="1em">
          <Text>Anda belum memiliki saham</Text>
          <BtnBuyStock />
        </Flex>
      )}
    </>
  );
};

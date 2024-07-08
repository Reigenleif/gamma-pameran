import { Button, Flex, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import {
  Table,
  Td,
  Tr,
} from "@chakra-ui/react";

export const getServerSideProps = withSession({ force: true });

export default function SahamPage() {
  return (
    <PublicLayout>
      <SahamPageComponent />
    </PublicLayout>
  );
}

const SahamPageComponent = () => {
  const getUserStockExchangeQuery =
    api.stock.getUserStockExchangeList.useQuery();

  const userStockExchangeList = getUserStockExchangeQuery.data ?? [];

  return (
    <Flex flexDir="column" gap="1em" ml="1em">
      <Text fontWeight="bold" fontSize="3xl">
        Saham Terakota
      </Text>
      <Button w="min(10em, 80%)" mx={{base: "auto", lg: "1em"}}>Beli Saham</Button>
      <Text fontWeight="bold" fontSize="2xl">
        Daftar Kepemilikan Saham Anda :
      </Text>
      {userStockExchangeList.length > 0 ? (
        <Table>
          <Tr fontWeight="bold">
            <Td>Atas Nama</Td>
            <Td>Jumlah (Lembar)</Td>
            <Td>Beli di Harga (Rp)</Td>
            <Td>Status</Td>
            <Td>Download Bukti Pembayaran</Td>
            
          </Tr>
          <Tr>
            <Td>John Doe</Td>
            <Td>
              <Text color="blue.500"></Text>
            </Td>
            <Td>10</Td>
          </Tr>
          <Tr>
            <Td>Jane Doe</Td>
            <Td>
              <Text color="blue.500"></Text>
            </Td>
            <Td>5</Td>
          </Tr>
        </Table>
      ) : (
        <Flex flexDir="column" alignItems="center" py="2em" gap="1em">
          <Text>Anda belum memiliki saham</Text>
          <Button>Beli Saham</Button>
        </Flex>
      )}
    </Flex>
  );
};

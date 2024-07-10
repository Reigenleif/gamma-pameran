import { Button, Flex, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api, RouterInputs } from "~/utils/api";
import { Table, Td, Tr } from "@chakra-ui/react";
import { BtnBuyStock } from "~/components/saham/BtnBuyStock";
import { UserStockExchangeTable } from "~/components/saham/UserStockExchangeTable";

export const getServerSideProps = withSession({ force: true });

export default function SahamPage() {
  return (
    <PublicLayout>
      <SahamPageComponent />
    </PublicLayout>
  );
}

const SahamPageComponent = () => {
  const getStockSettingQuery = api.stock.getStockSettingList.useQuery();
  const stockSettingList = getStockSettingQuery.data ?? [];

  const getUserStockExchangeListQuery =
    api.stock.getUserStockExchangeList.useQuery();
  const userStockExchangeList = getUserStockExchangeListQuery.data ?? [];

  const createStockExchange = api.stock.createStockExchange.useMutation();
  const updateStockExchange = api.stock.updateStockExchange.useMutation();

  const createStockExchangeMutation = async (
    data: RouterInputs["stock"]["createStockExchange"]
  ) => {
    const res = await createStockExchange.mutateAsync(data);
    getStockSettingQuery.refetch();
    getUserStockExchangeListQuery.refetch();
    return res;
  };

  const updateStockExchangeMutation = async (
    data: RouterInputs["stock"]["updateStockExchange"]
  ) => {
    const res = await updateStockExchange.mutateAsync(data);
    getStockSettingQuery.refetch();
    getUserStockExchangeListQuery.refetch();
    return res;
  };

  return (
    <Flex flexDir="column" gap="1em" ml="1em" py="2em">
      <Text fontWeight="bold" fontSize="2xl">
        Saham Terrakota
      </Text>
      {stockSettingList.length > 0 ? (
        <>
          <BtnBuyStock
            stockSettingList={stockSettingList}
            createStockExchangeMutation={createStockExchangeMutation}
            updateStockExchangeMutation={updateStockExchangeMutation}
          />
          <Text fontWeight="bold" fontSize="xl">
            Daftar Kepemilikan Saham Anda :
          </Text>
          {userStockExchangeList.length <= 0 && (
            <Flex flexDir="column" alignItems="center" py="2em" gap="1em">
              <Text>Anda belum memiliki saham</Text>
              <BtnBuyStock
                stockSettingList={stockSettingList}
                createStockExchangeMutation={createStockExchangeMutation}
                updateStockExchangeMutation={updateStockExchangeMutation}
              />
            </Flex>
          )}
          <UserStockExchangeTable
            userStockExchangeList={userStockExchangeList}
            updateStockExchangeMutation={updateStockExchangeMutation}
          />
        </>
      ) : (
        <Text>Belum ada saham yang tersedia</Text>
      )}
    </Flex>
  );
};

import { Flex, Text } from "@chakra-ui/react";
import { get } from "http";
import { useRouter } from "next/router";
import { Loading } from "~/components/common/Loading";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { StockCard } from "~/components/saham/StockCard";
import { api } from "~/utils/api";

export default function SahamPage() {
  const router = useRouter();

  const getStockSettingListQuery = api.stock.getStockSettingList.useQuery();
  const stockSettingList = getStockSettingListQuery.data ?? [];

  return (
    <PublicLayout>
      <Flex flexDir="column" py="3em">
        <Flex px="3em" w="100%">
          <Text fontWeight="bold" fontSize="3xl">
            Telusuri Saham Terakota
          </Text>
        </Flex>
        <Flex bg="cream.100" w="100%" p="2em" gap="2em">
          {getStockSettingListQuery.isLoading ? (
            <Loading />
          ) : (
            stockSettingList.map((stock) => (
              <StockCard
                key={stock.id}
                stock={stock}
                onClick={() => router.push(`/saham/${stock.code}`)}
              />
            ))
          )}
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

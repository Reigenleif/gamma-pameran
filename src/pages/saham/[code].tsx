import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loading } from "~/components/common/Loading";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { ProductCard } from "~/components/saham/ProductCard";
import { api } from "~/utils/api";
import { setStockSetting } from "~/utils/function/stockLocal";

export default function StockSettingByCodePage() {
  const router = useRouter();
  const code = router.query.code as string;
  const getStockSettingByCodeQuery = api.stock.getStockSettingByCode.useQuery({
    code,
  });

  if (getStockSettingByCodeQuery.isLoading) {
    return <PublicLayout>Loading...</PublicLayout>;
  }

  if (getStockSettingByCodeQuery.error) {
    return (
      <PublicLayout>
        <Flex flexDir="column" w="100%" alignItems="center" gap="1em" py="3em">
          <Text>
            Terjadi Kesalahan: {getStockSettingByCodeQuery.error.message}
          </Text>
          <Link href="javascript:history.back()">
            <Button>Kembali</Button>
          </Link>
        </Flex>
      </PublicLayout>
    );
  }

  const stockSetting = getStockSettingByCodeQuery.data;

  const onBuyStock = () => {
    setStockSetting(stockSetting.id);
    router.push("/beli-saham");
  };

  if (getStockSettingByCodeQuery.isLoading) {
    return <Loading />;
  }

  return (
    <PublicLayout>
      <Flex flexDir="column" py="3em">
        <Flex p="3em" w="100%" flexDir="column" gap="1em">
          <Text fontWeight="bold" fontSize="3xl">
            {stockSetting.name}
          </Text>
          <Text fontSize="xl">{stockSetting.description}</Text>
          <Button onClick={onBuyStock} w="10em">
            Beli Saham
          </Button>
        </Flex>
        <Flex flexDir="column" bg="cream.100" w="100%" py="1em" px="3em">
          <Text fontWeight="bold" fontSize="2xl" color="white">
            UMKM yang terkait dengan saham ini
          </Text>
          <Flex
            w="100%"
            p="2em"
            gap="2em"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {stockSetting.Product.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

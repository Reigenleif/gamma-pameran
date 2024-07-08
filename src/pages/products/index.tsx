import { Box, Flex, Text } from "@chakra-ui/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import dynamic, { Loader, LoaderComponent } from "next/dynamic";
import { ComponentType, useMemo } from "react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { NoNavLayout } from "~/components/layout/NoNavLayout";
import { api } from "~/utils/api";
import { ProductMapType } from "~/components/Product/Map";

export default function ProductPage() {
  const ProductMap = useMemo(
    () =>
      dynamic((() => import("~/components/Product/Map")) as Loader, {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  ) as ProductMapType;

  const productQuery = api.product.getAllProducts.useQuery();
  const productList = productQuery.data ?? [];
  console.log(productList);

  return (
    <NoNavLayout>
      <Flex justifyContent="center">
        <ProductMap productList={productList} />
      </Flex>
      <Flex pos="absolute" top="5em" w="100%">
        <Box
          color="black"
          border="2px solid"
          borderColor="cream.200"
          borderRadius="20px"
          px="3em"
          py="1em"
          bg="cream.300"
          mx="auto"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Produk-produk Terakota
          </Text>
        </Box>
      </Flex>
    </NoNavLayout>
  );
}

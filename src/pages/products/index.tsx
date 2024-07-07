import { Flex } from "@chakra-ui/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import dynamic, { Loader, LoaderComponent } from "next/dynamic";
import { ComponentType, useMemo } from "react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { NoNavLayout } from "~/components/layout/NoNavLayout";
import { api } from "~/utils/api";

export default function ProductPage() {
  const ProductMap = useMemo(
    () =>
      dynamic((() => import("~/components/Product/Map")) as Loader, {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const productQuery = api.product.getAllProducts.useQuery();
  const productList = productQuery.data ?? [];
  console.log(productList);

  return (
    <NoNavLayout>
      <Flex justifyContent="center">
        <ProductMap productList= {productList}/>
      </Flex>
    </NoNavLayout>
  );
}

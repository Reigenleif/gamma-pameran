import {
  MapContainer,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { majalengkaPolygon } from "./mapPolygon";
import { RouterOutputs } from "~/utils/api";
import { MarkerLayer, Marker } from "react-leaflet-marker";
import { Box, Img, Text } from "@chakra-ui/react";

interface ProductMapProps {
  productList: RouterOutputs["product"]["getAllProducts"];
}

const RADIUS = 0.07;

const getFloatPosition = (
  product: RouterOutputs["product"]["getAllProducts"][0],
  position: [number, number]
) => {
  return product.displayCoordinateY > position[1]
    ? product.displayCoordinateX > position[0]
      ? [
          product.displayCoordinateX + RADIUS,
          product.displayCoordinateY + RADIUS,
        ]
      : [
          product.displayCoordinateX - RADIUS,
          product.displayCoordinateY + RADIUS,
        ]
    : product.displayCoordinateX > position[0]
    ? [product.displayCoordinateX + RADIUS, product.displayCoordinateY - RADIUS]
    : [
        product.displayCoordinateX - RADIUS,
        product.displayCoordinateY - RADIUS,
      ];
};

const ProductMap = ({ productList }: ProductMapProps) => {
  const position: [number, number] = [-6.756731, 108.251103];
  productList = productList.slice(0, 12);

  return (
    <MapContainer
      center={position}
      zoom={10.5}
      style={{
        height: "100vh",
        width: "100vw",
        borderRadius: "4px",
        zIndex: 0,
      }}
      scrollWheelZoom={false}
    >
      <TileLayer url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      <Polygon
        positions={majalengkaPolygon.north}
        pathOptions={{ color: "red", fillColor: "red", opacity: 0.2 }}
      />
      <Polygon
        positions={majalengkaPolygon.middle}
        pathOptions={{ color: "yellow", fillColor: "yellow", opacity: 0.2 }}
      />
      <Polygon
        positions={majalengkaPolygon.south}
        pathOptions={{ color: "blue", fillColor: "blue", opacity: 0.2 }}
      />
      {productList.map((product, idx) => {
        return (
          <Polyline
            key={idx}
            positions={[
              [product.displayCoordinateX, product.displayCoordinateY],
              product.floatCoordinateX != 0 && product.floatCoordinateY != 0
                ? [product.floatCoordinateX, product.floatCoordinateY]
                : getFloatPosition(product, position),
            ]}
            pathOptions={{ color: "white" }}
          />
        );
      })}
      {productList.map((product, idx) => {
        return (
          <MarkerLayer key={idx}>
            <Marker
              placement="center"
              position={
                product.floatCoordinateX != 0 && product.floatCoordinateY != 0
                  ? [product.floatCoordinateX, product.floatCoordinateY]
                  : getFloatPosition(product, position)
              }
            >
              <Box
                px="1em"
                py="1em"
                color="cream.100"
                border="1px solid"
                borderRadius="10px"
                borderColor="cream.200"
                bg="cream.300"
              >
                <Img
                  src={product.imageUrl}
                  w="min(8em, 50vw)"
                  h="min(8em, 50vw)"
                  borderRadius="5px"
                />
                <Text fontSize="md" fontWeight="bold" w="100%" textAlign="center">
                  {product.name}
                </Text>
              </Box>
            </Marker>
          </MarkerLayer>
        );
      })}
    </MapContainer>
  );
};

export default ProductMap;

export type ProductMapType = typeof ProductMap;

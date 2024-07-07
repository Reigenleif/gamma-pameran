import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { majalengkaPolygon } from "./mapPolygon";
import { RouterOutputs } from "~/utils/api";

interface ProductMapProps {
  productList: RouterOutputs["product"]["getAllProducts"];
}

const RADIUS = 0.07;

const getFloatPosition = (
  product: RouterOutputs["product"]["getAllProducts"][0],
  position: [number, number]
) => {
  console.log(position)
  return product.displayCoordinateY > position[0]
    ? product.displayCoordinateX > position[1]
      ? [
          product.displayCoordinateX + RADIUS,
          product.displayCoordinateY + RADIUS,
        ]
      : [
          product.displayCoordinateX - RADIUS,
          product.displayCoordinateY + RADIUS,
        ]
    : product.displayCoordinateX > position[1]
    ? [product.displayCoordinateX + RADIUS, product.displayCoordinateY - RADIUS]
    : [
        product.displayCoordinateX - RADIUS,
        product.displayCoordinateY - RADIUS,
      ];
};

const ProductMap = ({ productList }: ProductMapProps) => {
  const position: [number, number] = [-6.820584, 108.26854];
  productList = productList.slice(0,12)

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
      {productList.map((product, idx) => (
        <Polyline
          key={idx}
          positions={[
            [product.displayCoordinateY, product.displayCoordinateX],
            product.floatCoordinateY != 0 && product.floatCoordinateX != 0
              ? [product.floatCoordinateX, product.floatCoordinateY]
              : getFloatPosition(product, position),
          ]}
          pathOptions={{ color: "white" }}
        />
      ))}
    </MapContainer>
  );
};

export default ProductMap;

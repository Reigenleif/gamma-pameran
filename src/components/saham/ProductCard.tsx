import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { RouterOutputs } from "~/utils/api";

interface ProductCardProps {
  product: RouterOutputs["stock"]["getStockSettingByCode"]["Product"][0];
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Flex
      px="1em"
      py="1em"
      color="cream.100"
      border="1px solid"
      borderRadius="10px"
      borderColor="cream.200"
      bg="cream.300"
      flexDir="column"
      alignItems="center"
      w="min(100%, 20em)"
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
    </Flex>
  );
};

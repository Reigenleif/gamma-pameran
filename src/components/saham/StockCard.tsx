import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { RouterOutputs } from "~/utils/api";
import { toCurrencyStr } from "~/utils/function/toCurrencyStr";

interface StockCardProps {
  stock: RouterOutputs["stock"]["getStockSettingList"][0];
  onClick?: () => void;
}

export const StockCard = ({ stock, onClick }: StockCardProps) => {
  return (
    <Flex
      p="2em"
      border="1px solid"
      borderColor="cream.200"
      bg="cream.300"
      color="cream.100"
      borderRadius="20px"
      flexDir="column"
      gap="1em"
    >
      <Text fontSize="xl" fontWeight="bold">
        {" "}
        {stock.code}{" "}
      </Text>
      <Text fontSize="md"> {stock.name} </Text>
      <Grid templateRows="1fr 1fr" templateColumns="1fr 2fr" gap="1em">
        <GridItem>
          <Text> Harga Beli</Text>
        </GridItem>
        <GridItem>
          <Text> : {toCurrencyStr(stock.price)} </Text>
        </GridItem>
        <GridItem>
          <Text> Lembar Tersisa </Text>
        </GridItem>
        <GridItem>
          <Text> : {stock.maxStock} </Text>
        </GridItem>
      </Grid>
      <Button onClick={onClick}>
        Beli Saham
      </Button>
    </Flex>
  );
};

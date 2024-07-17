import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
export const Footer = () => {
  return (
    <Flex
      gap="1em"
      w="100%"
      alignItems="center"
      px={["1em", "3em"]}
      py="1em"
      border="t"
      borderTop="2px solid"
      borderColor="cream.200"
      justifyContent="space-between"
    >
      <Text fontSize="md">
        &copy;2024 Pasar Saham Terrakota. All rights reserved.
      </Text>
      <Text fontSize="md">
        By Gamma Metrics
      </Text>
    </Flex>
  );
};

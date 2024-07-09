import { Flex, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";

export default function SahamPage() {
  return (
    <PublicLayout>
      <Flex flexDir="column">
        <Flex px="3em" w="100%">
          <Text fontWeight="bold" fontSize="3xl" >
            Telusuri Saham Terakota
          </Text>
        </Flex>

        <Flex bg="cream.100" w="100%">
            
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

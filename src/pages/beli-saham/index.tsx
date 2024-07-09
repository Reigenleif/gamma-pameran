

import { Button, Flex, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import { Table, Td, Tr } from "@chakra-ui/react";
import { BtnBuyStock } from "~/components/saham/BtnBuyStock";
import { UserStockExchangeTable } from "~/components/saham/UserStockExchangeTable";

export const getServerSideProps = withSession({ force: true });

export default function SahamPage() {
  return (
    <PublicLayout>
      <SahamPageComponent />
    </PublicLayout>
  );
}

const SahamPageComponent = () => {
  return (
    <Flex flexDir="column" gap="1em" ml="1em" py="2em">
      <Text fontWeight="bold" fontSize="2xl">
        Saham Terakota
      </Text>
      <BtnBuyStock />
      <Text fontWeight="bold" fontSize="xl">
        Daftar Kepemilikan Saham Anda :
      </Text>
      <UserStockExchangeTable />
    </Flex>
  );
};

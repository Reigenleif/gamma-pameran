import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const DashboardSideNav = () => {

  return (
    <Flex flexDir="column" overflowX="hidden" w="min(17em,100%)" p="1em" gap="1em" boxShadow="3px 0 0px 0px rgba(0,0,0,0.2)" minH="100vh">
      <NavBtn title="Data Saham" dashboardLink="saham" />
      <NavBtn title="Beli Manual" dashboardLink="pembelian" />
    </Flex>
  );
};

const NavBtn = ({
  title,
  dashboardLink,
}: {
  title: string;
  dashboardLink: string;
}) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      bg="gray.100"
      onClick={() => router.push(`/dashboard/${dashboardLink}`)}
      textAlign="left" 
    >
      {title}
    </Button>
  );
};

import {
  Box,
  Button,
  Divider,
  Flex,
  Table,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { z } from "zod";
import { withSession } from "~/server/auth/withSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StringInput } from "~/components/form/StringInput";
import { AuthorizedRoleLayout } from "~/components/layout/AuthorizedRoleLayout";
import { useSession } from "next-auth/react";
import { DashboardSideNav } from "~/components/dashboard/SideNav";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useState } from "react";
import { StockExchangeConfirmationStatus } from "~/utils/enums";
import { MdEdit } from "react-icons/md";
import { StockSetting } from "~/components/dashboard/stock/StockSetting";

export const getServerSideProps = withSession({ force: true });

const sahamFormSchema = z.object({
  hargaSaham: z.string(),
  jumlahSaham: z.string(),
});

type SahamFormFields = z.infer<typeof sahamFormSchema>;

export default function SahamDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user.role !== "ADMIN") {
    router.replace("/");
  }

  return (
    <AuthorizedRoleLayout session={session} type="admin">
      <DashboardPageComponent />
    </AuthorizedRoleLayout>
  );
}

const DashboardPageComponent = () => {
  const { register, formState, handleSubmit, reset } = useForm<SahamFormFields>(
    {
      resolver: zodResolver(sahamFormSchema),
    }
  );

  const [nameInput, setNameInput] = useState("");
  const [statusInput, setStatusInput] = useState<
    StockExchangeConfirmationStatus | undefined
  >();

  const stockExchangeDisclosure = useDisclosure();
  const [selectedStockExchangeId, setSelectedStockExchangeId] = useState<
    number | null
  >(null);

  return (
    <Flex flexDir="row">
      <DashboardSideNav />
      <Flex flexDir="column" w="100%" p="1em" gap="1em">
        <Text fontSize="3xl" fontWeight="bold">
          Dashboard Saham
        </Text>
        <Divider size="1em" bg="black" h="2px" />
        <StockSetting />
        <Divider size="1em" bg="black" h="2px" />
        <Text fontSize="2xl" fontWeight="bold">
          Daftar Pembeli Lembar Saham
        </Text>
        <Table>
          <Tr fontWeight="bold">
            <Td>Nama</Td>
            <Td>Email</Td>
            <Td>Jumlah Lembar Saham</Td>
          </Tr>
          <Tr>
            <Td>John Doe</Td>
            <Td>
              <Text color="blue.500"></Text>
            </Td>
            <Td>10</Td>
          </Tr>
          <Tr>
            <Td>Jane Doe</Td>
            <Td>
              <Text color="blue.500"></Text>
            </Td>
            <Td>5</Td>
          </Tr>
        </Table>
      </Flex>
    </Flex>
  );
};

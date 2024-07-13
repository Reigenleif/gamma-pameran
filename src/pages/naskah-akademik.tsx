import { Flex, Link, Text } from "@chakra-ui/react";
import { PublicLayout } from "~/components/layout/PublicLayout";

export default function NaskahAkademikPage() {
  return (
    <PublicLayout>
      <Flex
        direction="column"
        align="center"
        w="full"
        gap="2em"
        py="2em"
        fontWeight="bold"
      >
        <Text fontSize={["xl", "3xl"]}>Naskah Akademik</Text>
        <Link
          target="_blank"
          href="https://storage.googleapis.com/gamma-public/asset/Laporan%20Akhir%20-%20Rencana%20Strategis%20Pengembangan%20Bisnis%20JAF.pdf"
        >
          1. Proposal Rencana Strategi Bisnis JAF
        </Link>
        <Link
          target="_blank"
          href="https://storage.googleapis.com/gamma-public/asset/R8.%2009072024%20-%20Proposal%20Strategi%20Bisnis%20JAF.pdf"
        >
          2. Laporan Akhir - Rencana Strategis Pengembangan Bisnis JAF
        </Link>
      </Flex>
    </PublicLayout>
  );
}

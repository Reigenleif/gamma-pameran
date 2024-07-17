import { Flex, Img, Link, Text } from "@chakra-ui/react";
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
        <Flex flexDir={["column", "row"]} gap="1em" maxW="min(60em, 100%)">
          <Link
            target="_blank"
            href="https://storage.googleapis.com/tse-public/asset/Laporan%20Akhir%20-%20Rencana%20Strategis%20Pengembangan%20Bisnis%20JAF.pdf"
          >
            <Flex
              flexDir="column"
              fontSize={["lg", "2xl"]}
              fontWeight="bold"
              alignItems="center"
              p="1em"
              borderRadius="20px"
              border="1px solid"
              borderColor="cream.100"
              bg="cream.400"
              gap="1em"
              w="100%"
            >
              <Img
                src="/naskah-akademik-1.webp"
                alt="naskah-akademik-1"
                maxW={["50%", "100%"]}
              />
              Proposal Rencana Strategi Bisnis JAF
            </Flex>
          </Link>
          <Link
            target="_blank"
            href="https://storage.googleapis.com/tse-public/asset/R8.%2009072024%20-%20Proposal%20Strategi%20Bisnis%20JAF.pdf"
          >
            <Flex
              flexDir="column"
              fontSize={["lg", "2xl"]}
              fontWeight="bold"
              alignItems="center"
              p="1em"
              borderRadius="20px"
              border="1px solid"
              borderColor="cream.100"
              bg="cream.400"
              gap="1em"
            >
              <Img
                src="/naskah-akademik-2.webp"
                alt="naskah-akademik-2"
                maxW={["50%", "100%"]}
              />
              Laporan Akhir - Rencana Strategis Pengembangan Bisnis JAF
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

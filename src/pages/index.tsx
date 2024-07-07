import { Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import { BsGraphUpArrow } from "react-icons/bs";

export const getServerSideProps = withSession({ force: true });

export default function Home() {
  return (
    <PublicLayout>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        minH="100dvh"
      >
        {/* Section 1 */}
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems={{ base: "center", lg: "none" }}
          justifyContent="center"
          gap="5em"
          mt="2em"
          py="2em"
        >
          <Flex flexDir="column" gap="1em" w="min(40em, 90%)">
            <Text fontSize="4xl" fontWeight="bold" fontStyle="h">
              Mengapa Beli Saham Ini?
            </Text>
            <Text fontSize="2xl" textAlign="justify">
              This stock offers a unique value proposition with strong growth
              potential and a proven track record. Here are some key reasons why
              you should consider investing:
            </Text>
          </Flex>

          <Flex flexDir="column" gap="2em" w={{ base: "90%", lg: "30em" }}>
            <Flex alignItems="center" gap="1em">
              <BsGraphUpArrow size="10em" color="cream.100" />
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                  Consistent Growth
                </Text>
                <Text fontSize="xl" textAlign="justify">
                  The company has demonstrated steady year-over-year revenue and
                  profit growth for the past 5 years.
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center" gap="1em">
              <BsGraphUpArrow size="10em" color="cream.100" />
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                  Consistent Growth
                </Text>
                <Text fontSize="xl" textAlign="justify">
                  The company has demonstrated steady year-over-year revenue and
                  profit growth for the past 5 years.
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center" gap="1em">
              <BsGraphUpArrow size="10em" color="cream.100" />
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                  Consistent Growth
                </Text>
                <Text fontSize="xl" textAlign="justify">
                  The company has demonstrated steady year-over-year revenue and
                  profit growth for the past 5 years.
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Section 2 */}
        <Flex bg="cream.200" w="100%" justifyContent="center" py="10em">
          <Flex
            flexDir={{ base: "column-reverse", lg: "row" }}
            gap="3em"
            justifyContent="center"
            w="100%"
          >
            <Img src="/pots.webp" w="min(40em, 90%)" borderRadius="20px" />
            <Flex flexDir="column" w="min(40em, 90%)">
              <Text fontSize="4xl" fontWeight="bold" fontStyle="h" w="100%">
                What is This Stock?
              </Text>
              <Text fontSize="2xl" textAlign="justify" w="100%">
                This stock represents a leading company in the [industry]
                sector. The company has a strong market position, innovative
                products, and a proven business model that has delivered
                consistent financial performance
              </Text>
              <Grid
                gridTemplateColumns="repeat(2, 1fr)"
                gridTemplateRows="repeat(2, 1fr)"
                gap="1em"
                mt="1em"
              >
                <GridItem
                  display="flex"
                  fontSize="2xl"
                  flexDir="column"
                  gap="0.5em"
                >
                  <Text fontFamily="h" fontWeight="bold">
                    Market Cap
                  </Text>
                  <Text fontFamily="body">IDR 1.000.000.000</Text>
                </GridItem>
                <GridItem fontSize="2xl" flexDir="column" gap="0.5em">
                  <Text fontFamily="h" fontWeight="bold">
                    Market Cap
                  </Text>
                  <Text fontFamily="body">IDR 1.000.000.000</Text>
                </GridItem>
                <GridItem fontSize="2xl" flexDir="column" gap="0.5em">
                  <Text fontFamily="h" fontWeight="bold">
                    Market Cap
                  </Text>
                  <Text fontFamily="body">IDR 1.000.000.000</Text>
                </GridItem>
                <GridItem fontSize="2xl" flexDir="column" gap="0.5em">
                  <Text fontFamily="h" fontWeight="bold">
                    Market Cap
                  </Text>
                  <Text fontFamily="body">IDR 1.000.000.000</Text>
                </GridItem>
              </Grid>
            </Flex>
          </Flex>
        </Flex>

        {/* Section 3 */}
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems={{ base: "center", lg: "none" }}
          justifyContent="center"
          gap="5em"
          mt="2em"
          py="2em"
        >
          <Flex flexDir="column" gap="1em" w="min(40em, 90%)">
            <Text fontSize="4xl" fontWeight="bold" fontStyle="h">
              Mengapa Beli Saham Ini?
            </Text>
            <Text fontSize="2xl" textAlign="justify">
              This stock offers a unique value proposition with strong growth
              potential and a proven track record. Here are some key reasons why
              you should consider investing:
            </Text>
          </Flex>

          <Flex flexDir="column" gap="2em" w={{ base: "90%", lg: "30em" }}>
            <Flex alignItems="center" gap="1em">
              <BsGraphUpArrow size="10em" color="cream.100" />
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                  Consistent Growth
                </Text>
                <Text fontSize="xl" textAlign="justify">
                  The company has demonstrated steady year-over-year revenue and
                  profit growth for the past 5 years.
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center" gap="1em">
              <BsGraphUpArrow size="10em" color="cream.100" />
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                  Consistent Growth
                </Text>
                <Text fontSize="xl" textAlign="justify">
                  The company has demonstrated steady year-over-year revenue and
                  profit growth for the past 5 years.
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center" gap="1em">
              <BsGraphUpArrow size="10em" color="cream.100" />
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                  Consistent Growth
                </Text>
                <Text fontSize="xl" textAlign="justify">
                  The company has demonstrated steady year-over-year revenue and
                  profit growth for the past 5 years.
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Section 4 */}
        <Flex
          bg="cream.200"
          w="100%"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          py="3em"
        >
          <Text fontSize="3xl" fontFamily="h" fontWeight="bold">
            {" "}
            Tertarik Untuk Membeli Saham Kami?
          </Text>
          <Button mt="1em">
            <Link href="/saham">Beli Saham</Link>
          </Button>
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

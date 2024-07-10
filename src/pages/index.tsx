import { Box, Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { colors } from "~/styles/colors";
import { TbMoneybag } from "react-icons/tb";
import { Slide, StaggeredSlide } from "~/utils/animation/entrance-animation";
import { useMemo } from "react";
import { ProductMapType } from "~/components/Product/Map";
import dynamic, { Loader } from "next/dynamic";
import { useIsMobile } from "~/utils/hooks/useIsMobile";

export default function Home() {
  const ProductMap = useMemo(
    () =>
      dynamic((() => import("~/components/Product/Map")) as Loader, {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  ) as ProductMapType;

  return (
    <PublicLayout>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        minH="100dvh"
      >
        {/* Section 1 */}
        <Slide from="top">
          <Img
            src="/first-png.webp"
            w="100vw"
            h="calc(100dvh - 2em)"
            objectFit="cover"
            objectPosition="100% 0%"
          />
        </Slide>
        <Flex
          flexDir={["column", "row"]}
          alignItems={["center", "none"]}
          justifyContent="center"
          gap="5em"
          mt="2em"
          pb="10em"
          pt="2em"
          px="5%"
        >
          <Flex flexDir="column" gap="3em" w="min(75em, 100%)">
            <Slide from="left">
              <Text fontSize={["xl", "3xl"]} fontWeight="bold" fontStyle="h">
                Terrakota Stock Exchange - Pasar Saham Terrakota
              </Text>
            </Slide>
            <Slide from="right">
              <Text fontSize={["md", "2xl"]} textAlign="justify">
                Hadirnya Pasar Saham Terrakota (Terrakota Stock Exchange)
                merupakan sebuah inovasi gerakan kolektif dalam bentuk urundana
                (crowdfunding) untuk mendukung inisiasi Dana Abadi Kawasan
                Pemajuan Kebudayaan oleh Koperasi Tanaraya Jalan Kebudayaan.
                Adapun program Kawasan Pemajuan Kebudayaan merupakan program
                yang telah disepakati dalam Musyawarah Perencanaan dan
                Pembangunan (Musrenbang) dalam Pekan Kebudayaan Nasional (PKN
                2023) sebagai bentuk komitmen pengarusutamaan kebudayaan dalam
                rencana pembangunan menuju Indonesia Emas 2045.
              </Text>
            </Slide>
            <Slide from="left">
              <Text fontSize={["md", "2xl"]} textAlign="justify">
                Dana Abadi Kebudayaan nantinya diproyeksikan untuk menjadi
                katalis sekaligus akselerator eksperimentasi ekonomi berbasis
                identitas kebudayaan daerah oleh kolektif seni yang
                diharmonisasi dengan isu dan narasi pembangunan. Pasar Saham
                Terrakota menjadi media untuk menghimpun Dana Abadi Wilayah bagi
                inisiatif-inisiatif kolektif dalam rangka mengembangkan Kawasan
                Pemajuan Kebudayaan Terrakota. Pasar Saham Terrakota merupakan
                respon terhadap perkembangan ekonomi wilayah yang kontribusinya
                kurang signifikan dan pertumbuhannya kurang cepat. Karya ini
                menjadi inisiatif awal dalam menjawab bagaimana membangun sebuah
                wilayah secara kolektif. Inisiatif-inisiatif kolektif tersebut
                dikurasi dalam koridor ekonomi kebudayaan dan dievaluasi secara
                teknis yang kemudian kita hadirkan dalam bentuk saham. Siapapun
                dapat ikut memiliki saham Terrakota yang akan diputar melalui
                berbagai model ekonomi kultural.
              </Text>
            </Slide>
          </Flex>

          {/* <Flex flexDir="column" gap="2em" w={["100%", "30em"]}>
            <StaggeredSlide from="right" duration={0.5}>
              <Flex alignItems="center" gap="1em">
                <Box w="10em">
                  <MdGroups2 size="5em" color={colors.cream[100]} />
                </Box>
                <Flex flexDir="column" gap="1em">
                  <Text fontSize="xl" textAlign="justify">
                    Menggagas gerakan kolektif dalam rangka pengembangan Kawasan
                    Pemajuan Kebudayaan Terakota
                  </Text>
                </Flex>
              </Flex>

              <Flex alignItems="center" gap="1em">
                <Box w="10em">
                  <TbMoneybag size="5em" color={colors.cream[100]} />
                </Box>
                <Flex flexDir="column" gap="1em">
                  <Text fontSize="xl" textAlign="justify">
                    Menginisiasi dan menghimpun Dana Abadi Kebudayaan dalam
                    rangka mendukung gerakan implementasi Kawasan Pemajuan
                    Kebudayaan Terakota serta mendorong kemandirian kolektif
                    seni
                  </Text>
                </Flex>
              </Flex>
            </StaggeredSlide>
          </Flex> */}
        </Flex>

        {/* Section 2 */}
        <Flex bg="cream.200" w="100%" alignItems="center" py="10em" px="5%">
          <Flex
            flexDir={{ base: "column-reverse", lg: "row" }}
            justifyContent="center"
            w="100%"
          >
            <Flex
              flexDir="column"
              w="min(100em, 100%)"
              gap="3rem"
              color="white"
            >
              <Text
                fontSize={["2xl", "4xl"]}
                fontWeight="bold"
                fontStyle="h"
                w="100%"
              >
                Mengapa Saham Terrakota Perlu Diimplementasikan?
              </Text>
              <Section2Box
                text="Pasar Saham Terrakota menjadi media untuk menghimpun Dana Abadi Wilayah bagi inisiatif-inisiatif kolektif dalam rangka mengembangkan Kawasan Pemajuan Kebudayaan Terrakota. Pasar Saham Terrakota merupakan respon terhadap perkembangan ekonomi wilayah yang kontribusinya kurang signifikan dan pertumbuhannya kurang cepat. Karya ini menjadi inisiatif awal dalam menjawab bagaimana membangun sebuah wilayah secara kolektif. Inisiatif-inisiatif kolektif tersebut dikurasi dalam koridor ekonomi kebudayaan dan dievaluasi secara teknis yang kemudian kita hadirkan dalam bentuk saham. Siapapun dapat ikut memiliki saham Terrakota yang akan diputar melalui berbagai model ekonomi kultural."
                arrangement="left"
                imgUrl="why1.webp"
              />
              <Section2Box
                text="Kerja Tanah yang selama ini diupayakan kini mengarah pada aspirasi bersama tentang wilayah kebudayaan tanah yang kami sebut sebagai Kota-Terrakota. Aspirasi ini kini dituangkan dalam dokumen tata ruang Majalengka sebagai Kawasan Strategis Terrakota dan dijadikan sebagai percontohan untuk Kawasan Pemajuan Kebudayaan dalam RPJMN (Rencana Pembangunan Jangka Menengah Nasional). Proses perwujudan Kota-Terrakota sebagai Kawasan Strategis maupun Kawasan Pemajuan Kebudayaan ini kami sikapi sebagai sebuah upaya kolektif dan kolaboratif. "
                arrangement="right"
                imgUrl="why2.webp"
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Section 3 */}
        <Flex
          flexDir={"column"}
          alignItems={{ base: "center", lg: "none" }}
          justifyContent="center"
          gap="5em"
          mt="2em"
          pt="2em"
          px="5%"
        >
          <Text
            fontSize={["xl", "4xl"]}
            fontWeight="bold"
            fontStyle="h"
            w="100%"
            textAlign="center"
          >
            Rencana Pembangunan
          </Text>
          <ProductMap productList={[]} />
        </Flex>

        {/* Section 4 */}
        <Flex
          bg="cream.200"
          w="100%"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          py="3em"
          px="5%"
        >
          <Text fontSize="3xl" fontFamily="h" fontWeight="bold">
            {" "}
            Tertarik Untuk Membeli Saham Terrakota?
          </Text>

          <Link href="/saham">
            <Button mt="1em">Beli Saham</Button>
          </Link>
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

const Section2Box = ({
  text,
  imgUrl,
  arrangement,
}: {
  text: string;
  imgUrl: string;
  arrangement: "left" | "right";
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Flex flexDir="column" gap="1em">
        <Slide from={"left"}>
          <Text textAlign="justify" fontSize={["sm", "xl"]}>
            {text}
          </Text>
        </Slide>
        <Slide from={"right"}>
          <Box h="15em" w="15em" bg="grey">
            <Img src={imgUrl} h="15em" w="15em" objectFit="cover" />
          </Box>
        </Slide>
      </Flex>
    );
  }

  if (arrangement === "left") {
    return (
      <Grid
        gridTemplateColumns="3fr 1fr"
        gridTemplateRows="1fr"
        gap="1em"
        alignItems="center"
        w="100%"
      >
        <GridItem>
          <Slide from={"left"}>
            <Text textAlign="justify" fontSize={["sm", "xl"]}>
              {text}
            </Text>
          </Slide>
        </GridItem>
        <GridItem display="flex" justifyContent="center">
          <Slide from={"right"}>
            <Box h="15em" w="15em" bg="grey">
              <Img src={imgUrl} h="15em" w="15em" objectFit="cover" />
            </Box>
          </Slide>
        </GridItem>
      </Grid>
    );
  }
  return (
    <Grid
      templateColumns="1fr 3fr"
      templateRows="1fr"
      gap="1em"
      alignItems="center"
      w="100%"
      column={2}
      row={1}
    >
      <GridItem display="flex" justifyContent="center">
        <Slide from={"left"}>
          <Box h="15em" w="15em" bg="grey">
            <Img src={imgUrl} h="15em" w="15em" objectFit="cover" />
          </Box>
        </Slide>
      </GridItem>
      <GridItem>
        <Slide from={"right"}>
          <Text textAlign="justify" fontSize={["sm", "xl"]}>
            {text}
          </Text>
        </Slide>
      </GridItem>
    </Grid>
  );
};

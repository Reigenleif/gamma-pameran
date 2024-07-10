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
        <Img src="/stock.webp" w="100%" h="15em" objectFit="cover" objectPosition="100% 20%"/>
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
              <Text fontSize="3xl" fontWeight="bold" fontStyle="h">
                Terrakota Stock Exchange - Pasar Saham Terrakota
              </Text>
              <Text fontSize="2xl" textAlign="justify">
                Pasar Saham Terrakota menjadi media untuk menghimpun Dana Abadi
                Wilayah bagi inisiatif-inisiatif kolektif dalam rangka
                mengembangkan Kawasan Pemajuan Kebudayaan Terrakota. Pasar Saham
                Terrakota merupakan respon terhadap perkembangan ekonomi wilayah
                yang kontribusinya kurang signifikan dan pertumbuhannya kurang
                cepat. Karya ini menjadi inisiatif awal dalam menjawab bagaimana
                membangun sebuah wilayah secara kolektif. Inisiatif-inisiatif
                kolektif tersebut dikurasi dalam koridor ekonomi kebudayaan dan
                dievaluasi secara teknis yang kemudian kita hadirkan dalam
                bentuk saham. Siapapun dapat ikut memiliki saham Terrakota yang
                akan diputar melalui berbagai model ekonomi kultural.
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
              <Text fontSize="4xl" fontWeight="bold" fontStyle="h" w="100%">
                Mengapa Saham Terrakota Perlu Diimplementasikan?
              </Text>
              <Section2Box
                text="Hadirnya Pasar Saham Terakota (Terakota Stock Exchange)
                  merupakan sebuah inovasi gerakan kolektif dalam bentuk
                  urundana (crowdfunding) untuk mendukung inisiasi Dana Abadi
                  Kebudayaan oleh Koperasi Tanaraya Jalan Kebudayaan bersama
                  dengan Jatiwangi Art Factory, serta gagasan pengembangan
                  Kawasan Pemajuan Kebudayaan. Adapun program Kawasan Pemajuan
                  Kebudayaan merupakan program yang telah disepakati dalam
                  Musyawarah Perencanaan dan Pembangunan (Musrenbang) bersama
                  dengan Kementerian Perencanaan/Bappenas, Kementerian
                  Pendidikan dan Kebudayaan, dan Jatiwangi Art Factory dalam
                  Pekan Kebudayaan Nasional (PKN 2023) sebagai bentuk komitmen
                  pengarusutamaan kebudayaan dalam rencana pembangunan menuju
                  Indonesia Emas 2045."
                arrangement="left"
                imgUrl="home/sect2-1.png"
              />
              <Section2Box
                text="Inisiasi Dana Abadi Kebudayaan yang dihimpun oleh Pasar Saham
                  Terakota bak oase di teriknya gurun pasir skena kolektif seni
                  tanah air sekaligus terobosan untuk mendorong resiliensi dalam
                  bereksperimentasi dan berkegiatan seni. Selain itu, Dana Abadi
                  Kebudayaan dalam jangka panjang juga diproyeksikan untuk menjadi
                  solusi untuk mendorong kemandirian kolektif seni nasional."
                arrangement="right"
                imgUrl="home/sect2-2.png"
              />
              <Section2Box
                text="Dalam pengimplementasiannya, Dana Abadi Kebudayaan akan
                diselaraskan dengan pengembangan sektor-sektor berbasis
                identitas kebudayaan dan kewilayahan. Majalengka, sebagai salah
                satu daerah di Provinsi Jawa Barat sekaligus tempat lahirnya
                Pasar Saham Terakota prakarsa Koperasi Tanaraya Jalan Kebudayaan
                dan Jatiwangi Art Factory, dikenal memiliki identitas kebudayaan
                terakota serta keunggulan kompetitif yang disegmentasi menjadi
                tiga bagian wilayah Majalengka berdasarkan analisis sektoral
                Produk Domestik Regional Bruto (PDRB)."
                arrangement="left"
                imgUrl="home/sect2-3.png"
              />
              <Section2Box
                text="
                Pada wilayah Majalengka bagian Utara, keunggulan kompetitif pada
                sektor manufaktur dan jasa. Bergerak menuju ke Majalengka bagian
                Tengah, keunggulan kompetitif yang dimiliki oleh Majalengka
                Tengah adalah industri Food and Beverage (FnB), kriya, dan
                fesyen. Sedangkan pada wilayah Majalengka bagian Selatan
                ditunjang oleh sektor pertanian, kehutanan, dan perikanan."
                arrangement="right"
                imgUrl="/pots.webp"
              />
              <Section2Box
                text="Dana Abadi Kebudayaan nantinya diproyeksikan untuk menjadi
                katalis sekaligus akselerator eksperimentasi seni dan budaya
                berbasis identitas kebudayaan daerah oleh kolektif seni yang
                diharmonisasi dengan isu dan narasi pembangunan daerah berbasis
                potensi kewilayahan."
                arrangement="left"
                imgUrl="home/sect2-3.png"
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
            fontSize="4xl"
            fontWeight="bold"
            fontStyle="h"
            w="100%"
            textAlign="center"
          >
            Peta Majalengka
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
            Tertarik Untuk Membeli Saham Kami?
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
              <Img src={imgUrl} w="100%" />
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
            <Img src={imgUrl} w="100%" />
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

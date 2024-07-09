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
import { colors } from "~/styles/component/colors";
import { TbMoneybag } from "react-icons/tb";

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
          py="10em"
          px="5%"
        >
          <Flex flexDir="column" gap="3em" w="min(60em, 100%)">
            <Text fontSize="4em" fontWeight="bold" fontStyle="h">
              What is Terakota Stock Exchange?
            </Text>
            <Text fontSize="3em" textAlign="justify">
              Pasar Saham Terakota merupakan program yang diprakarsai oleh
              Koperasi Tanaraya Jalan Kebudayaan bersama dengan Jatiwangi Art
              Factory untuk menghimpun Dana Abadi Kebudayaan melalui skema
              transaksi jual-beli saham ekosistem terafiliasi Koperasi Tanaraya
              Jalan Kebudayaan. Program ini diinisiasi dengan tujuan:
            </Text>
          </Flex>

          <Flex flexDir="column" gap="2em" w={{ base: "90%", lg: "30em" }}>
            <Flex alignItems="center" gap="1em">
              <Box w="10em">
                <MdGroups2 size="5em" color={colors.cream[100]} />
              </Box>
              <Flex flexDir="column" gap="1em">
                <Text fontSize="3em" textAlign="justify">
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
                  Menginisiasi dan menghimpun Dana Abadi Kebudayaan dalam rangka
                  mendukung gerakan implementasi Kawasan Pemajuan Kebudayaan
                  Terakota serta mendorong kemandirian kolektif seni
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Section 2 */}
        <Flex bg="cream.200" w="100%" justifyContent="center" py="10em" px="5%">
          <Flex
            flexDir={{ base: "column-reverse", lg: "row" }}
            gap="3em"
            justifyContent="center"
            w="100%"
          >
            <Flex flexDir="column" w="min(100em, 90%)">
              <Text fontSize="4xl" fontWeight="bold" fontStyle="h" w="100%">
                Why does Terakota Stock Exhange need to be implemented?
              </Text>
              <Text fontSize="2xl" textAlign="justify" w="100%">
                Hadirnya Pasar Saham Terakota (Terakota Stock Exchange)
                merupakan sebuah inovasi gerakan kolektif dalam bentuk urundana
                (crowdfunding) untuk mendukung inisiasi Dana Abadi Kebudayaan
                oleh Koperasi Tanaraya Jalan Kebudayaan bersama dengan Jatiwangi
                Art Factory, serta gagasan pengembangan Kawasan Pemajuan
                Kebudayaan. Adapun program Kawasan Pemajuan Kebudayaan merupakan
                program yang telah disepakati dalam Musyawarah Perencanaan dan
                Pembangunan (Musrenbang) bersama dengan Kementerian
                Perencanaan/Bappenas, Kementerian Pendidikan dan Kebudayaan, dan
                Jatiwangi Art Factory dalam Pekan Kebudayaan Nasional (PKN 2023)
                sebagai bentuk komitmen pengarusutamaan kebudayaan dalam rencana
                pembangunan menuju Indonesia Emas 2045.
                <br />
                Inisiasi Dana Abadi Kebudayaan yang dihimpun oleh Pasar Saham
                Terakota bak oase di teriknya gurun pasir skena kolektif seni
                tanah air sekaligus terobosan untuk mendorong resiliensi dalam
                bereksperimentasi dan berkegiatan seni. Selain itu, Dana Abadi
                Kebudayaan dalam jangka panjang juga diproyeksikan untuk menjadi
                solusi untuk mendorong kemandirian kolektif seni nasional.
                <br />
                Dalam pengimplementasiannya, Dana Abadi Kebudayaan akan
                diselaraskan dengan pengembangan sektor-sektor berbasis
                identitas kebudayaan dan kewilayahan. Majalengka, sebagai salah
                satu daerah di Provinsi Jawa Barat sekaligus tempat lahirnya
                Pasar Saham Terakota prakarsa Koperasi Tanaraya Jalan Kebudayaan
                dan Jatiwangi Art Factory, dikenal memiliki identitas kebudayaan
                terakota serta keunggulan kompetitif yang disegmentasi menjadi
                tiga bagian wilayah Majalengka berdasarkan analisis sektoral
                Produk Domestik Regional Bruto (PDRB).
                <br />
                Pada wilayah Majalengka bagian Utara, keunggulan kompetitif pada
                sektor manufaktur dan jasa. Bergerak menuju ke Majalengka bagian
                Tengah, keunggulan kompetitif yang dimiliki oleh Majalengka
                Tengah adalah industri Food and Beverage (FnB), kriya, dan
                fesyen. Sedangkan pada wilayah Majalengka bagian Selatan
                ditunjang oleh sektor pertanian, kehutanan, dan perikanan.
                <br />
                Dana Abadi Kebudayaan nantinya diproyeksikan untuk menjadi
                katalis sekaligus akselerator eksperimentasi seni dan budaya
                berbasis identitas kebudayaan daerah oleh kolektif seni yang
                diharmonisasi dengan isu dan narasi pembangunan daerah berbasis
                potensi kewilayahan.
              </Text>
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
          px="5%"
        >
          <Text fontSize="4xl" fontWeight="bold" fontStyle="h" w="100%">
            Peta Majalengka
          </Text>
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
          <Button mt="1em">
            <Link href="/saham">Beli Saham</Link>
          </Button>
        </Flex>
      </Flex>
    </PublicLayout>
  );
}

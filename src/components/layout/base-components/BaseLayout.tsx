import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { type Session } from "next-auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Footer } from "./Footer";
import Head from "next/head";
import { useIsMobile } from "~/utils/hooks/useIsMobile";

export interface LayoutProps {
  children: React.ReactNode;
  type?: "signin" | "signup" | "admin";
}

export interface ProtectedLayoutProps extends LayoutProps {
  session: Session | null;
}

export function BaseLayout({ children, type }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.webp" />
      </Head>
      <Flex
        flexDir="column"
        w="100vw"
        overflowX="hidden"
        bg="cream.300"
        minH="100dvh"
      >
        <Navbar type={type} />
        <Box minH="calc(100dvh - 7.5em)">{children}</Box>
        <Footer />
      </Flex>
    </>
  );
}

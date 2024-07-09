import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavbarProps {
  type?: "signin" | "signup" | "admin";
}

export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Flex
      justifyContent="space-between"
      px="2em"
      py="0.5em"
      alignItems="center"
      boxShadow="4px 4px 5px rgba(0, 0, 0, 0.1)"
      pos="sticky"
      top="0"
    >
      <Text onClick={() => router.push("/")} cursor="pointer">
        Terakota Stock Exchange
      </Text>
      <Flex ml="auto" gap={{ base: "3em", md: "4em" }} fontSize="sm">
        {/* Webpage Buttons */}
        {type !== "admin" ? (
          <>
            <Link href="/products" className="navlink" prefetch={false}>
              Produk Kami
            </Link>
            <Link href="#why" className="navlink" prefetch={false}>
              Why Buy
            </Link>
            <Link href="#" className="navlink" prefetch={false}>
              What Is
            </Link>
            <Link href="#" className="navlink" prefetch={false}>
              How to Invest
            </Link>
          </>
        ) : (
          <></>
        )}

        {/* Webpage Buttons */}
        {session ? (
          <Menu>
            <MenuButton as={Button} variant="ghost">
              {session.user.name}
            </MenuButton>
            <MenuList
              display="flex"
              gap="1em"
              p="1em"
              flexDir="column"
              alignItems="center"
            >
              <Link href="/dashboard" className="navlink" prefetch={false}>
                Dashboard
              </Link>
              <Button variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
            </MenuList>
          </Menu>
        ) : (
          <Button variant="ghost" onClick={() => signIn()}>
            Login
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

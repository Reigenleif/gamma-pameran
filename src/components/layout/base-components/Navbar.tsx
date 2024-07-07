import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavbarProps {
  type?: "signin" | "signup";
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
    >
      <Text onClick={() => router.push("/")}> Exhibition M</Text>

      <Flex ml="auto" gap={{ base: "3em", md: "4em" }}>
        <Link
          href="/products"
          className="navlink"
          prefetch={false}
        >
          Products
        </Link>
        <Link
          href="#"
          className="navlink"
          prefetch={false}
        >
          Why Buy
        </Link>
        <Link
          href="#"
          className="navlink"
          prefetch={false}
        >
          What Is
        </Link>
        <Link
          href="#"
          className="navlink"
          prefetch={false}
        >
          How to Invest
        </Link>
      </Flex>
    </Flex>
  );
};

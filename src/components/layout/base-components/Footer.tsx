import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
export const Footer = () => {
  return (
    <Flex
      gap="1em"
      w="100%"
      alignItems="center"
      px={{ base: "2em", md: "3em" }}
      py="1em"
      border="t"
      borderTop="2px solid"
      borderColor="cream.200"
      justifyContent="space-between"
    >
      <Text fontSize="sm">
        &copy; 2024 Stock Showcase. All rights reserved.
      </Text>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy Policy
        </Link>
      </nav>
    </Flex>
  );
};

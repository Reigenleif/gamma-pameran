import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useIsMobile } from "~/utils/hooks/useIsMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { Session } from "next-auth";

interface NavbarProps {
  type?: "signin" | "signup" | "admin";
}

export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const isMobile = useIsMobile();

  const mobileNavDisclosure = useDisclosure();

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        px={["1em", "2em"]}
        py="0.5em"
        alignItems="center"
        boxShadow="4px 4px 5px rgba(0, 0, 0, 0.1)"
        pos="sticky"
        top="0"
        zIndex="1000"
      >
        <Text
          onClick={() => router.push("/")}
          cursor="pointer"
          fontSize={["0.8rem", "xl"]}
        >
          Terrakota Stock Exchange
        </Text>
        {!isMobile ? (
          <Flex
            ml="auto"
            gap={["1em", "2em"]}
            fontSize="0.8em"
            alignItems="center"
          >
            {/* Webpage Buttons */}
            {type !== "admin" ? (
              <>
                <Link href="/saham" className="navlink" prefetch={false}>
                  Seri Saham
                </Link>
                <Link
                  href="https://storage.googleapis.com/gamma-public/asset/R8.%2009072024%20-%20Proposal%20Strategi%20Bisnis%20JAF.pdf"
                  target="_blank"
                  className="navlink"
                  prefetch={false}
                >
                  Naskah Akademik
                </Link>
              </>
            ) : (
              <></>
            )}

            {/* Webpage Buttons */}
            {session ? (
              <Menu>
                <MenuButton as={Button}>Halo, {session.user.name}</MenuButton>
                <MenuList
                  display="flex"
                  gap="1em"
                  p="1em"
                  flexDir="column"
                  alignItems="center"
                  pos="relative"
                >
                  {session.user.role === "ADMIN" ? (
                    <Link
                      href="/dashboard"
                      className="navlink"
                      prefetch={false}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/beli-saham"
                        className="navlink"
                        prefetch={false}
                      >
                        Lihat Saham
                      </Link>
                    </>
                  )}
                  <Button onClick={() => signOut()}>Logout</Button>
                </MenuList>
              </Menu>
            ) : (
              <Button onClick={() => signIn()}>Login</Button>
            )}
          </Flex>
        ) : (
          <>
            <Button onClick={mobileNavDisclosure.onToggle} p="0.5em">
              <RxHamburgerMenu size="1.5em" />
            </Button>
            <MobileNavScroller
              isOpen={mobileNavDisclosure.isOpen}
              session={session}
            />
          </>
        )}
      </Flex>
    </Box>
  );
};

const MobileNavScroller = ({
  isOpen,
  session,
}: {
  isOpen: boolean;
  session: Session | null;
}) => {
  return (
    <Flex
      w="100vw"
      pos="fixed"
      top={isOpen ? "4em" : "-100vh"}
      left="0"
      bg="cream.300"
      zIndex="100"
      flexDir="column"
      gap="0.5em"
      transition="0.3s ease-in-out"
      alignItems="center"
      p="1em"
      fontSize="0.8em"
    >
      <Link href="/saham" className="navlink" prefetch={false}>
        Seri Saham
      </Link>
      <Link
        href="https://storage.googleapis.com/gamma-public/asset/R8.%2009072024%20-%20Proposal%20Strategi%20Bisnis%20JAF.pdf"
        target="_blank"
        className="navlink"
        prefetch={false}
      >
        Naskah Akademik
      </Link>
      {session ? (
        <Menu>
          <MenuButton as={Button}>
            Masuk Sebagai {session.user.name?.split(" ")[0]}
          </MenuButton>
          <MenuList
            display="flex"
            gap="1em"
            p="1em"
            flexDir="column"
            alignItems="center"
            pos="relative"
            zIndex="100"
          >
            {session.user.role === "ADMIN" ? (
              <Link href="/dashboard" className="navlink" prefetch={false}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/beli-saham" className="navlink" prefetch={false}>
                  Lihat Saham
                </Link>
              </>
            )}
            <Button onClick={() => signOut()}>Logout</Button>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={() => signIn()}>Login</Button>
      )}
    </Flex>
  );
};

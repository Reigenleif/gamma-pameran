import { MdArrowBack, MdSwipeLeft } from "react-icons/md";
import { BaseLayout, LayoutProps } from "./base-components/BaseLayout";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const NoNavLayout = ({ children, type }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      {children}
      <Box pos="fixed" left="1em" bottom="1em" onClick={() => router.push("/")}>
        <MdArrowBack size="1.5em" />
      </Box>
    </>
  );
};

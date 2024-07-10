import type { SystemStyleFunction } from "@chakra-ui/theme-tools";
import { type ComponentStyleConfig } from "@chakra-ui/react";

const TdDefault: SystemStyleFunction = () => {
  return {
    padding: "0",
    border: "1px solid",
    borderColor: "gray.400",
    color: "black",
  };
};

export const Td: ComponentStyleConfig = {
  variants: {
    default: TdDefault,
  },
  defaultProps: {
    variant: "default",
  },
};

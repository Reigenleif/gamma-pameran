import type { SystemStyleFunction } from "@chakra-ui/theme-tools";
import { type ComponentStyleConfig } from "@chakra-ui/react";

const blackTableStyle: SystemStyleFunction = () => {
  return {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderRadius: "10px",
      tr: {
        td: {
          padding: "0",
          h: "1.2em",
        },
      },
      thead: {
        borderRadius: "10px",
        bg: "black",
        color: "white",
        border: "1px solid",
        borderColor: "gray.400",
        th: {
          textAlign: "center",
        },
      },
      tbody: {
        tr: {
          td: {
            textAlign: "center",
            padding: "1rem",
            border: "1px solid",

            borderColor: "gray.400",
            color: "black",
          },
        },
      },
    },
  };
};

const defaultTableStyle: SystemStyleFunction = () => {
  return {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tr: {
        td: {
          padding: "0.5rem",
          h: "2em",
        },
      },
    },
  };
};

export const Table: ComponentStyleConfig = {
  variants: {
    black: blackTableStyle,
    default: defaultTableStyle,
  },
  defaultProps: {
    variant: "default",
  },
};

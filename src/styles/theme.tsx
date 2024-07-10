import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { Button } from "./component/button";
import { Input } from "./component/input";
import { Table } from "./component/table";
import { Textarea } from "./component/textarea";
import { breakpoints } from "./breakpoints";
import { Td } from "./component/td";

const theme = extendTheme({
  fonts: {
    h: `"Inter", sans-serif`,
    body: `"Space Mono", monospace`,
  },
  colors,
  styles: {
    global: {
      body: {
        color: "crimson.100",
      },
      "*": {
        "&::-webkit-scrollbar": {
          w: "2",
          h: "1.5",
        },
      },
    },
  },
  components: {
    Button,
    Input,
    Table,
    Textarea,
    Td,
  },
  breakpoints: breakpoints,
});

export default theme;

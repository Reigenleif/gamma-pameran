import { extendTheme } from "@chakra-ui/react";
import { colors } from "./component/colors";
import { Button } from "./component/button";
import { Input } from "./component/input";
import { Table } from "./component/table";
import { Textarea } from "./component/textarea";
import { breakpoints } from "./breakpoints";

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
  },
  breakpoints: breakpoints,
});

export default theme;

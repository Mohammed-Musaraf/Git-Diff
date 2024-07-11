import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { buttonSizes, buttonVariants } from "./theme";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button: {
      // ...Button,
      variants: buttonVariants,
      sizes: buttonSizes,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>
);

import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";

const theme = extendBaseTheme({});

const router = createBrowserRouter([
  {
    path: "/repositories/:owner/:repository/commit/:commitSHA",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <div>Hello, welcome</div>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  </React.StrictMode>
);

import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./core/theme.ts";
import mainRoutes from "./appRoutes.js";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

const App = () => (
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter basename={baseUrl}>
        <Routes>
          {mainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={mainRoutes[0].element} />
        </Routes>
      </BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </ChakraProvider>
  </React.StrictMode>
);

export default App;

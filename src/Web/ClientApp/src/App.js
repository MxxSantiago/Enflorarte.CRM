import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./core/theme.ts";
import mainRoutes from "./AppRoutes.js";
import { apiClient } from "./core/helpers/web-api-client.helper.ts";
import ProtectedRoute from "./components/api-authorization/ProtectedRoute.jsx";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

const App = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const user = await apiClient.getCurrentUser();
      localStorage.setItem("session", JSON.stringify(user));
    };

    fetchUser();
  }, []);

  return (
    <React.StrictMode>
      <ChakraProvider>
        <BrowserRouter basename={baseUrl}>
          <Routes>
            {mainRoutes.map((route, index) => {
              const { roles, element, path } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={ProtectedRoute(roles, element)}
                />
              );
            })}
            <Route path="*" element={mainRoutes[0].element} />
          </Routes>
        </BrowserRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default App;

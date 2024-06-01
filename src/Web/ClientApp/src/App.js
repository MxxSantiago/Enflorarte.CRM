import { StrictMode, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Spinner,
} from "@chakra-ui/react";
import theme from "./core/theme.ts";
import mainRoutes from "./AppRoutes.js";
import ProtectedRoute from "./components/api-authorization/ProtectedRoute.jsx";
import {
  SessionProvider,
  UserSessionContext,
} from "./core/auth/UserSessionContext.jsx";
import { spinnerConfiguration } from "./core/constants.ts";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

const AppBody = () => {
  const { loading } = useContext(UserSessionContext);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner {...spinnerConfiguration} />
      </Box>
    );
  }

  return (
    <Routes>
      {mainRoutes.map((route, index) => {
        const { roles, element, path } = route;
        return (
          <Route
            key={index}
            path={path}
            element={<ProtectedRoute roles={roles} element={element} />}
          />
        );
      })}
      <Route path="*" element={mainRoutes[0].element} />
    </Routes>
  );
};

const App = () => (
  <StrictMode>
    <ChakraProvider>
      <SessionProvider>
        <BrowserRouter basename={baseUrl}>
          <AppBody />
        </BrowserRouter>
      </SessionProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </ChakraProvider>
  </StrictMode>
);

export default App;

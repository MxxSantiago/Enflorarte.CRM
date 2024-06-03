import { Box, Grid } from "@chakra-ui/react";
import {
  headerDesktopHeight,
  headerMobileHeight,
  sidebarDesktopWidth,
  sidebarMobileWidth,
} from "../../core/constants.ts";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../api-authorization/ProtectedRoute.jsx";

const Layout = ({ routes, showSidebar }) => (
  <Grid
    gridTemplateColumns={{
      base: showSidebar
        ? `${sidebarMobileWidth} calc(100vw - ${sidebarMobileWidth})`
        : "100vw",
      md: showSidebar
        ? `${sidebarDesktopWidth} calc(100vw - ${sidebarDesktopWidth})`
        : "100vw",
    }}
    height="100vh"
    width="100vw"
    userSelect="none"
  >
    {showSidebar && <Sidebar routes={routes} />}
    <Box width="100%">
      <Header showSidebar={showSidebar} />
      <Box
        height={{
          base: `calc(100vh - ${headerMobileHeight})`,
          md: `calc(100vh - ${headerDesktopHeight})`,
        }}
        width="100%"
        gridArea="main"
        overflowY="auto"
        overflowX="hidden"
      >
        <Routes>
          {routes.map((route, index) => {
            const { element, role, ...rest } = route;
            return role ? (
              <ProtectedRoute
                key={index}
                {...rest}
                element={element}
                role={role}
              />
            ) : (
              <Route key={index} {...rest} element={element} />
            );
          })}
          <Route path="*" element={routes[0].element} />
        </Routes>
      </Box>
    </Box>
  </Grid>
);

export default Layout;

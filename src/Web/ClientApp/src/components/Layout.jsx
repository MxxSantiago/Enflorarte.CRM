import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  headerDesktopHeight,
  headerMobileHeight,
  sidebarDesktopWidth,
  sidebarMobileWidth,
} from "../constants.ts";

const Layout = ({ children }) => (
  <Box
    display="grid"
    gridTemplateColumns={{
      base: `${sidebarMobileWidth} calc(100vw - ${sidebarMobileWidth})`,
      md: `${sidebarDesktopWidth} calc(100vw - ${sidebarDesktopWidth})`,
    }}
    height="100vh"
    width="100vw"
    userSelect="none"
  >
    <Sidebar />
    <Box>
      <Header />
      <Box
        height={{
          base: `calc(100vh - ${headerMobileHeight})`,
          md: `calc(100vh - ${headerDesktopHeight})`,
        }}
        gridArea="main"
        overflowY="auto"
        overflowX="hidden"
      >
        {children}
      </Box>
    </Box>
  </Box>
);

export { Layout };

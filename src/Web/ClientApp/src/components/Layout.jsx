import { Box } from "@chakra-ui/react";
import { NavMenu } from "./NavMenu";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <Box
    display="grid"
    gridTemplateColumns="auto 1fr"
    gridTemplateRows="auto"
    gridTemplateAreas='"sidebar main"'
    height="100vh"
    overflow="hidden"
    userSelect="none"
  >
    <Sidebar />
    <Box>
      <NavMenu />
      <Box
        height={{ base: "calc(100vh - 4rem)", md: "calc(100vh - 6rem)" }}
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

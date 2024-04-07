import React from "react";
import { Box, Card, Flex, Button, Image, Stack } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  sidebarDesktopWidth,
  sidebarMobileWidth,
} from "../../core/constants.ts";
const logo = process.env.PUBLIC_URL + "/LogoFloreria.png";

const Sidebar = ({ routes }) => {
  const location = useLocation();

  return (
    <Card
      h="100vh"
      py={4}
      variant="filled"
      borderRadius="none"
      width={{ base: sidebarMobileWidth, md: sidebarDesktopWidth }}
      overflowY={{ base: "auto" }}
    >
      <Flex align="center" mb={6} justify="center">
        <Image
          src={logo}
          height={{
            base: "70%",
            md: "80%",
          }}
        />
      </Flex>
      <Stack spacing={0}>
        {routes.map(({ name, path, icon }) => (
          <Button
            key={name}
            width="100%"
            colorScheme="pink"
            variant={location.pathname.indexOf(path) !== -1 ? "solid" : "ghost"}
            as={NavLink}
            _hover={{ color: "currentColor" }}
            height={16}
            to={path}
            borderRadius={0}
            leftIcon={icon}
            display="flex"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Box display={{ base: "none", md: "block" }}>{name}</Box>
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

export default Sidebar;

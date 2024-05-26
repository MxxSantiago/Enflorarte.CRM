import React from "react";
import { Box, Card, Flex, Button, Image, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  primaryColorScheme,
  sidebarDesktopWidth,
  sidebarMobileWidth,
} from "../../core/constants.ts";
import { userHasRole } from "../../core/helpers/session.ts";
const logo = process.env.PUBLIC_URL + "/LogoFloreria.png";

const Sidebar = ({ routes }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Card
      h="100vh"
      py={4}
      variant="filled"
      borderRadius="none"
      width={{ base: sidebarMobileWidth, md: sidebarDesktopWidth }}
      overflowY={{ base: "auto" }}
    >
      <Flex
        align="center"
        mb={6}
        justify="center"
        height={{
          base: "6.5%",
          md: "18%",
        }}
      >
        <Image
          src={logo}
          height={{
            base: "70%",
            md: "80%",
          }}
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Flex>
      <Stack spacing={0}>
        {routes
          .filter((r) => !r.ignore)
          .map(({ name, path, icon, role }) => {
            if (role && !userHasRole(role)) return null;

            return (
              <Button
                key={name}
                width="100%"
                colorScheme={primaryColorScheme}
                variant={
                  location.pathname.indexOf(path) !== -1 ? "solid" : "ghost"
                }
                isActive={location.pathname.indexOf(path) !== -1}
                height={16}
                borderRadius={0}
                leftIcon={icon}
                display="flex"
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={() => navigate(path)}
              >
                <Box display={{ base: "none", md: "block" }}>{name}</Box>
              </Button>
            );
          })}
      </Stack>
    </Card>
  );
};

export default Sidebar;

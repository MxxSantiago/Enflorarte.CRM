import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  Flex,
  Button,
  Image,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  primaryColorScheme,
  sidebarDesktopWidth,
  sidebarMobileWidth,
} from "../../core/constants.ts";
import { UserSessionContext } from "../../core/auth/UserSessionContext.jsx";
const logo = process.env.PUBLIC_URL + "/LogoFloreria.png";

/**
 * Sidebar component that displays a navigation menu with buttons based on the provided routes.
 *
 * @component
 * @param {Object[]} routes - An array of route objects.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({ routes }) => {
  const { userHasRole } = useContext(UserSessionContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

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
        <Skeleton
          isLoaded={!imageLoading}
          width={{
            base: "70%",
            md: "80%",
          }}
        >
          <Image
            onLoad={() => setImageLoading(false)}
            src={logo}
            height={{
              base: "70%",
              md: "80%",
            }}
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Skeleton>
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

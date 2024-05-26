import {
  Card,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  MenuItem,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";
import { RiAlignJustify } from "react-icons/ri";
import { ChakraLink } from "../shared/index.js";
import { FaRegUser } from "react-icons/fa6";
import {
  headerDesktopHeight,
  headerMobileHeight,
  primaryColorScheme,
} from "../../core/constants.ts";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme.jsx";
import mainRoutes from "../../AppRoutes.js";
import { userHasRole } from "../../core/helpers/session.ts";
const logo = process.env.PUBLIC_URL + "/LogoFloreria.png";

const Header = ({ showSidebar }) => (
  <Card
    display="flex"
    borderRadius="none"
    variant="filled"
    justifyContent="center"
    w="100%"
    height={{ base: headerMobileHeight, md: headerDesktopHeight }}
    pr={{ base: "1rem", md: "2rem" }}
  >
    <Flex direction={{ base: "none", md: "row" }} alignItems="center">
      {!showSidebar && (
        <Flex>
          <Image
            src={logo}
            ml={5}
            height={{
              base: `calc(${headerMobileHeight} - 20px)`,
              md: `calc(${headerDesktopHeight} - 20px)`,
            }}
          />
        </Flex>
      )}
      <Stack
        display={{ base: "none", md: "flex" }}
        direction="row"
        height="fit-content"
      >
        {mainRoutes.map(({ name, path, roles }) => {
          if (roles && !userHasRole(roles)) return null;

          return (
            <ChakraLink
              key={name}
              marginBottom="0"
              fontWeight="bold"
              fontSize="lg"
              marginLeft="3rem"
              to={path}
              _hover={{ color: primaryColorScheme }}
              _focus={{ color: primaryColorScheme }}
            >
              {name}
            </ChakraLink>
          );
        })}
      </Stack>
      <ButtonGroup display={{ base: "none", md: "flex" }} marginLeft="auto">
        <ToggleTheme />
        <IconButton
          onClick={() => (window.location.href = "/Identity/Account/Manage")}
          icon={<FaRegUser />}
          colorScheme="cyan"
        />
      </ButtonGroup>
      <Menu>
        <MenuButton
          display={{ base: "flex", md: "none" }}
          as={IconButton}
          icon={<RiAlignJustify />}
          ml="auto"
          variant={{
            base: "ghost",
            md: "outline",
          }}
        ></MenuButton>
        <MenuList zIndex={2}>
          {mainRoutes.map(({ name, path, roles }) => {
            if (roles && !userHasRole(roles)) return null;

            return (
              <MenuItem
                key={name}
                as={Link}
                to={path}
                _hover={{ color: "currentcolor" }}
              >
                {name}
              </MenuItem>
            );
          })}
          <MenuItem
            onClick={() => (window.location.href = "/Identity/Account/Manage")}
          >
            Cuenta
          </MenuItem>
          <ToggleTheme
            width="100%"
            background="none"
            borderRadius={0}
            colorScheme="gray"
          />
        </MenuList>
      </Menu>
    </Flex>
  </Card>
);

export default Header;

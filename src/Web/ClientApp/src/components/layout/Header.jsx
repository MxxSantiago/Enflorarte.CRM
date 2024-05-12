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
} from "../../core/constants.ts";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme.jsx";
import mainRoutes from "../../AppRoutes.js";
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
    zIndex={999}
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
        {mainRoutes.map(({ name, path }) => (
          <ChakraLink
            key={name}
            marginBottom="0"
            fontSize="lg"
            marginLeft="3rem"
            to={path}
          >
            {name}
          </ChakraLink>
        ))}
      </Stack>
      <ButtonGroup display={{ base: "none", md: "flex" }} marginLeft="auto">
        <ToggleTheme colorScheme="pink" />
        <IconButton
          colorScheme="pink"
          onClick={() => (window.location.href = "/Identity/Account/Manage")}
          icon={<FaRegUser />}
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
          colorScheme="pink"
        ></MenuButton>
        <MenuList>
          {mainRoutes.map(({ name, path }) => (
            <MenuItem
              key={name}
              as={Link}
              to={path}
              _hover={{ color: "currentcolor" }}
            >
              {name}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => (window.location.href = "/Identity/Account/Manage")}
          >
            Cuenta
          </MenuItem>
          <ToggleTheme width="100%" background="none" borderRadius={0} />
        </MenuList>
      </Menu>
    </Flex>
  </Card>
);

export default Header;

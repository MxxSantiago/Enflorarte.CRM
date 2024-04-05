import {
  Flex,
  Text,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { RiAlignJustify } from "react-icons/ri";
import ChakraLink from "./ChakraLink.jsx";
import { FaRegUser } from "react-icons/fa6";
import {
  headerDesktopHeight,
  headerMobileHeight,
  sidebarDesktopWidth,
  sidebarMobileWidth,
  tertiaryColor,
} from "../constants.ts";
import { Link } from "react-router-dom";

const Header = (props) => (
  <Flex
    wrap="wrap"
    alignItems="center"
    bg={tertiaryColor}
    w="100%"
    height={{ base: headerMobileHeight, md: headerDesktopHeight }}
    width={{
      base: `calc(100vw - ${sidebarMobileWidth})`,
      md: `calc(100vw - ${sidebarDesktopWidth})`,
    }}
    px={{ base: "1rem", md: "2rem" }}
    {...props}
  >
    <Menu>
      <MenuButton
        display={{ base: "flex", md: "none" }}
        as={IconButton}
        icon={<RiAlignJustify />}
        ml="auto"
        variant="outline"
        colorScheme="pink"
      ></MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/">
          Pedidos
        </MenuItem>
        <MenuItem as={Link} to="/">
          Arreglos
        </MenuItem>
        <MenuItem as={Link} to="/">
          Administracion
        </MenuItem>
        <MenuItem
          onClick={() => (window.location.href = "/Identity/Account/Manage")}
        >
          Cuenta
        </MenuItem>
      </MenuList>
    </Menu>
    <Stack
      display={{ base: "none", md: "flex" }}
      direction="row"
      bg={tertiaryColor}
    >
      <Text marginBottom="0" fontSize="lg" marginLeft="2rem">
        <ChakraLink
          _hover={{ textDecoration: "none", color: "black" }}
          color="black"
          to="/"
        >
          Pedidos
        </ChakraLink>
      </Text>
      <Text marginBottom="0" fontSize="lg" marginLeft="3rem">
        <ChakraLink
          _hover={{ textDecoration: "none", color: "black" }}
          color="black"
          to="/"
        >
          Arreglos
        </ChakraLink>
      </Text>
      <Text fontSize="lg" marginBottom={0} marginLeft="3rem">
        <ChakraLink
          _hover={{ textDecoration: "none", color: "black" }}
          color="black"
          to="/Sucursal"
        >
          Administración
        </ChakraLink>
      </Text>
      <Text
        display="none"
        fontSize="lg"
        marginLeft="3rem"
        marginBottom="0"
        onClick={() => (window.location.href = "/Identity/Account/Manage")}
        cursor="pointer"
      >
        Cuenta
      </Text>
    </Stack>
    <IconButton
      display={{ base: "none", md: "flex" }}
      marginLeft="auto"
      variant="outline"
      colorScheme="pink"
      onClick={() => (window.location.href = "/Identity/Account/Manage")}
      icon={<FaRegUser />}
    ></IconButton>
  </Flex>
);

export default Header;

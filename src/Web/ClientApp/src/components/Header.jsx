import {
  Card,
  Text,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  MenuItem,
  ButtonGroup,
} from "@chakra-ui/react";
import { RiAlignJustify } from "react-icons/ri";
import ChakraLink from "./ChakraLink.jsx";
import { FaRegUser } from "react-icons/fa6";
import {
  headerDesktopHeight,
  headerMobileHeight,
  sidebarDesktopWidth,
  sidebarMobileWidth,
} from "../constants.ts";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme.jsx";

const Header = (props) => (
  <Card
    display="flex"
    borderRadius="none"
    variant="filled"
    justifyContent="center"
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
        variant={{
          base: "ghost",
          md: "outline",
        }}
        colorScheme="pink"
      ></MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/" _hover={{ color: "currentcolor" }}>
          Pedidos
        </MenuItem>
        <MenuItem as={Link} to="/" _hover={{ color: "currentcolor" }}>
          Arreglos
        </MenuItem>
        <MenuItem as={Link} to="/" _hover={{ color: "currentcolor" }}>
          Administracion
        </MenuItem>
        <MenuItem
          onClick={() => (window.location.href = "/Identity/Account/Manage")}
        >
          Cuenta
        </MenuItem>
        <ToggleTheme width="100%" background="none" borderRadius={0} />
      </MenuList>
    </Menu>
    <Flex direction={{ base: "none", md: "row" }} alignItems="center">
      <Stack
        display={{ base: "none", md: "flex" }}
        direction="row"
        height="fit-content"
      >
        <Text marginBottom="0" fontSize="lg" marginLeft="2rem">
          <ChakraLink to="/">Pedidos</ChakraLink>
        </Text>
        <Text marginBottom="0" fontSize="lg" marginLeft="3rem">
          <ChakraLink to="/">Arreglos</ChakraLink>
        </Text>
        <Text fontSize="lg" marginBottom={0} marginLeft="3rem">
          <ChakraLink to="/Sucursal">Administración</ChakraLink>
        </Text>
      </Stack>
      <ButtonGroup display={{ base: "none", md: "flex" }} marginLeft="auto">
        <ToggleTheme variant="outline" colorScheme="pink" />
        <IconButton
          variant="outline"
          colorScheme="pink"
          onClick={() => (window.location.href = "/Identity/Account/Manage")}
          icon={<FaRegUser />}
        />
      </ButtonGroup>
    </Flex>
  </Card>
);

export default Header;

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
import mainRoutes from "../../appRoutes.js";

const Header = () => (
  <Card
    display="flex"
    borderRadius="none"
    variant="filled"
    justifyContent="center"
    w="100%"
    height={{ base: headerMobileHeight, md: headerDesktopHeight }}
    pr={{ base: "1rem", md: "2rem" }}
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
    <Flex direction={{ base: "none", md: "row" }} alignItems="center">
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

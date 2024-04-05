import React from "react";
import { Box, Flex, Button, Image, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/LogoFloreria.png";
import {
  FiHome,
  FiGift,
  FiPhone,
  FiPackage,
  FiUserCheck,
} from "react-icons/fi";
import { IoFlowerOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import {
  sidebarDesktopWidth,
  sidebarMobileWidth,
  tertiaryColor,
} from "../constants.ts";

const adminRoutes = [
  {
    name: "Sucursales",
    route: "/Sucursal",
    icon: <FiHome />,
  },
  {
    name: "Tipo de Entrega",
    route: "/TipoEntrega",
    icon: <FiPackage />,
  },
  {
    name: "Envolturas",
    route: "/Envolturas",
    icon: <FiGift />,
  },
  {
    name: "Flores",
    route: "/Flor",
    icon: <IoFlowerOutline />,
  },
  {
    name: "Clientes",
    route: "/Cliente",
    icon: <FaRegUser />,
  },
  {
    name: "Comunicación",
    route: "/TipoComunicacion",
    icon: <FiPhone />,
  },
  {
    name: "Responsables",
    route: "/Responsable",
    icon: <FiUserCheck />,
  },
];

const Sidebar = () => (
  <Box
    bg={tertiaryColor}
    h="100vh"
    py={4}
    width={{ base: sidebarMobileWidth, md: sidebarDesktopWidth }}
  >
    <Flex align="center" mb={12} justify="center">
      <Image src={logo} boxSize="60%" />
    </Flex>
    <Stack spacing={6}>
      {adminRoutes.map(({ name, route, icon }) => (
        <Button
          key={name}
          width="100%"
          as={Link}
          to={route}
          borderRadius={0}
          variant="ghost"
          leftIcon={icon}
          _hover={{ bg: "red.200", color: "black" }}
          display="flex"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Box fontSize="14px" display={{ base: "none", md: "block" }}>
            {name}
          </Box>
        </Button>
      ))}
    </Stack>
  </Box>
);

export default Sidebar;

import React from "react";
import { Box, Card, Flex, Button, Image, Stack } from "@chakra-ui/react";
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
import { sidebarDesktopWidth, sidebarMobileWidth } from "../constants.ts";

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
  <Card
    h="100vh"
    py={4}
    variant="filled"
    borderRadius="none"
    width={{ base: sidebarMobileWidth, md: sidebarDesktopWidth }}
    overflowY={{ base: "auto" }}
  >
    <Flex align="center" mb={6} justify="center">
      <Image src={logo} boxSize="60%" />
    </Flex>
    <Stack spacing={0}>
      {adminRoutes.map(({ name, route, icon }) => (
        <Button
          key={name}
          width="100%"
          colorScheme="pink"
          variant="ghost"
          as={Link}
          _hover={{ color: "currentColor" }}
          height={16}
          to={route}
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

export default Sidebar;

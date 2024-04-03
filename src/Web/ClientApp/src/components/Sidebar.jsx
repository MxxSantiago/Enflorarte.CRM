import React from "react";
import { Box, Flex, Button, Divider, Image, Stack } from "@chakra-ui/react";
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

const adminRoutes = [
  {
    name: "Sucursales",
    route: "/Sucursal",
    icono: <FiHome />,
  },
  {
    name: "Tipo de Entrega",
    route: "/TipoEntrega",
    icono: <FiPackage />,
  },
  {
    name: "Envolturas",
    route: "/Envolturas",
    icono: <FiGift />,
  },
  {
    name: "Flores",
    route: "/Flor",
    icono: <IoFlowerOutline />,
  },
  {
    name: "Clientes",
    route: "/Cliente",
    icono: <FaRegUser />,
  },
  {
    name: "Comunicación",
    route: "/TipoComunicacion",
    icono: <FiPhone />,
  },
  {
    name: "Responsables",
    route: "/Responsable",
    icono: <FiUserCheck />,
  },
];

const Sidebar = () => (
  <Box bg="red.100" h="100vh" p={4} width={{ base: "60px", md: "180px" }}>
    <Flex align="center" mb={8} justify="center">
      <Image src={logo} alt="Logo" boxSize={{ base: "35px", md: "100px" }} />
    </Flex>
    <Divider mb={4} />
    <Stack spacing={6} align="center">
      {adminRoutes.map(({ name, route, icono }) => (
        <Button
          key={name}
          width="100%"
          as={Link}
          to={route}
          variant="ghost"
          color="black"
          leftIcon={icono}
          _hover={{ bg: "red.200", color: "black" }}
          display="flex"
          justifyContent="flex-start"
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

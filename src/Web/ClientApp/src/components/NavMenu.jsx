import {
  Box,
  Flex,
  Text,
  Stack,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { RiAlignJustify } from "react-icons/ri";
import ChakraLink from "./ChakraLink";
import { FaRegUser } from "react-icons/fa6";

const NavMenu = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      wrap="wrap"
      alignItems="center"
      bg="red.100"
      w="100%"
      height={{ base: "3rem", md: "5rem" }}
      minH={{ base: "3rem", md: "5rem" }}
      width={{ base: "calc(100vw - 60px)", md: "calc(100vw - 180px)" }}
      px={{ base: "1rem", md: "2rem" }}
      {...props}
    >
      <Box
        display={{ base: "block", md: "none" }}
        mt={isOpen ? ".5rem" : "0"}
        ml="auto"
        onClick={handleToggle}
      >
        <IconButton
          color="black"
          colorScheme="black"
          _hover={{ bg: "pink.200" }}
          icon={<RiAlignJustify />}
        ></IconButton>
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text
          marginBottom="0"
          fontSize="lg"
          marginLeft={{ base: "0", md: "2rem" }}
        >
          <ChakraLink
            _hover={{ textDecoration: "none", color: "black" }}
            color="black"
            to="/"
          >
            Pedidos
          </ChakraLink>
        </Text>
        <Text
          marginBottom="0"
          fontSize="lg"
          marginLeft={{ base: "0", md: "3rem" }}
        >
          <ChakraLink
            _hover={{ textDecoration: "none", color: "black" }}
            color="black"
            to="/"
          >
            Arreglos
          </ChakraLink>
        </Text>
        <Text
          fontSize="lg"
          marginBottom={0}
          marginLeft={{ base: "0", md: "3rem" }}
        >
          <ChakraLink
            _hover={{ textDecoration: "none", color: "black" }}
            color="black"
            to="/Sucursal"
          >
            Administración
          </ChakraLink>
        </Text>
        <Text
          display={{ base: "block", md: "none" }}
          fontSize="lg"
          marginLeft={{ base: "0", md: "3rem" }}
          marginBottom={{ base: "1.5rem", md: "0" }}
        >
          <a
            _hover={{ textDecoration: "none", color: "black" }}
            color="black"
            href="Identity/Account/Manage"
          >
            Cuenta
          </a>
        </Text>
      </Stack>

      <Box display={{ base: "none", md: "block" }} marginLeft="auto">
        <IconButton
          as="a"
          colorScheme="black"
          variant="outline"
          _hover={{ bg: "pink.200", color: "black" }}
          href="Identity/Account/Manage"
          icon={<FaRegUser />}
          aria-label={"Sesión"}
        ></IconButton>
      </Box>
    </Flex>
  );
};

export { NavMenu };

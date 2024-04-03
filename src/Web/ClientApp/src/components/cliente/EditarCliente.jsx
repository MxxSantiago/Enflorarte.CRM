import React from "react";
import {
  Box,
  Heading,
  Center,
  Button,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GrupoDatos from "./GrupoDatos";

function EditarCliente() {
  return (
    <div>
      <Center>
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={4}
          height="auto"
          width="800px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          marginTop="6rem"
        >
          <Heading as="h2" mt={0} mb={2} fontSize="3xl" fontWeight="bold">
            Editar Cliente
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem pt="2rem">
              <VStack spacing={5}>
                <GrupoDatos label="Nombre actual del Cliente" />
                <GrupoDatos label="Dirección actual del Cliente" />
                <GrupoDatos label="Número telefónico actual del Cliente" />
                <GrupoDatos label="Tipo de Comunicación actual del Cliente" />
              </VStack>
            </GridItem>
            <GridItem pt="2rem" pb="2rem">
              <VStack spacing={5}>
                <GrupoDatos label="Nuevo nombre del Cliente" />
                <GrupoDatos label="Nueva dirección del Cliente" />
                <GrupoDatos label="Nuevo número telefónico del Cliente" />
                <GrupoDatos label="Nuevo tipo de comunicación del Cliente" />
              </VStack>
            </GridItem>
          </Grid>
          <Box display="flex" flexDirection="row">
            <Link to="/Cliente">
              <Button
                bg="#EDF2F7"
                _hover={{ bg: "#CBD5E0" }}
                color="black"
                size="lg"
                marginRight="3rem"
              >
                Regresar
              </Button>
            </Link>
            <Button
              bg="#FC8181"
              _hover={{ bg: "#f36868" }}
              color="white"
              size="md"
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Center>
    </div>
  );
}

export default EditarCliente;

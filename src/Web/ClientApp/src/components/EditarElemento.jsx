import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, Select } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { updateEntity } from "../helpers/selectClient.ts";

function EditarElemento({
  titulo,
  entityName,
  nombreActual,
  nombreNuevo,
  tipoActual,
  tipoNuevo,
  variante,
  rutaRegresar,
}) {
  const containerHeight = variante ? "500px" : "400px";
  const params = useParams();

  const [newName, setNewName] = useState("");

  const handleEdit = async () => {
    const args = {
      id: Number(params.id),
      entity: {
        name: newName,
        id: Number(params.id),
      },
    };
    await updateEntity(entityName, args);
  };

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      height={containerHeight}
      width={{ base: "100%", md: "550px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      marginTop="6rem"
    >
      <Heading as="h2" mt={0} mb={2} fontSize="xl" fontWeight="bold">
        Editar {titulo}
      </Heading>
      <VStack spacing={10}>
        <Box mb={4}>
          <Box mb={4} mt={10} display="flex" justifyContent="center">
            <label htmlFor="nombre">Nombre actual de {nombreActual}</label>
          </Box>
          <Input disabled={true} id="nombre" size="lg" width="400px" />
          <Box mb={4} mt={10} display="flex" justifyContent="center">
            <label htmlFor="Enlace">Nuevo nombre de {nombreNuevo}</label>
          </Box>
          <Input
            id="Enlace"
            size="lg"
            width="400px"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
          {variante && (
            <>
              <Box mb={4} mt={10} display="flex" justifyContent="center">
                <label htmlFor="select1">{tipoActual} Actual</label>
              </Box>
              <Select id="select1" size="lg" width="400px">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Box mb={4} mt={10} display="flex" justifyContent="center">
                <label htmlFor="select2">Nuevo {tipoNuevo}</label>
              </Box>
              <Select id="select2" size="lg" width="400px">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </>
          )}
        </Box>
        <Box marginBottom="1rem">
          <Link to={rutaRegresar}>
            <Button
              bg="#EDF2F7"
              _hover={{ bg: "#CBD5E0" }}
              color="black"
              size="md"
              marginRight="3rem"
            >
              Regresar
            </Button>
          </Link>
          <Button
            bg="#FC8181"
            _hover={{ bg: "#9B2C2C" }}
            color="white"
            size="md"
            onClick={handleEdit}
          >
            Editar
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
export default EditarElemento;

import React from "react";
import { Box, Heading, Center, Input, Button, VStack } from "@chakra-ui/react";

function Alta4Campos({
  titulo,
  label1,
  pholder1,
  label2,
  pholder2,
  label3,
  pholder3,
  label4,
  pholder4,
}) {
  return (
    <div>
      <Center>
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={4}
          height="600px"
          width="700px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          marginTop="7rem"
        >
          <Heading as="h2" mt={0} mb={2} fontSize="3xl" fontWeight="bold">
            {titulo}
          </Heading>
          <VStack spacing={2}>
            <Box mb={2}>
              <Box mb={4} mt={5} display="flex" justifyContent="center">
                <label htmlFor="nombre">{label1}</label>
              </Box>
              <Input
                id="nombre"
                placeholder={pholder1}
                size="lg"
                width="400px"
              />
              <Box mb={4} mt={5} display="flex" justifyContent="center">
                <label htmlFor="Enlace">{label2}</label>
              </Box>
              <Input
                id="direccion"
                placeholder={pholder2}
                size="lg"
                width="400px"
              />
              <Box mb={4} mt={5} display="flex" justifyContent="center">
                <label htmlFor="nombre">{label3}</label>
              </Box>
              <Input
                id="telefono"
                placeholder={pholder3}
                size="lg"
                width="400px"
              />
              <Box mb={4} mt={5} display="flex" justifyContent="center">
                <label htmlFor="Enlace">{label4}</label>
              </Box>
              <Input
                id="comunicacion"
                placeholder={pholder4}
                size="lg"
                width="400px"
              />
            </Box>
            <Button
              bg="#FC8181"
              _hover={{ bg: "#f36868" }}
              color="white"
              size="md"
            >
              Agregar
            </Button>
          </VStack>
        </Box>
      </Center>
    </div>
  );
}

export default Alta4Campos;

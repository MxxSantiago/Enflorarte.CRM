import React from "react";
import { Button, Text, Box, Textarea, Select, Stack } from "@chakra-ui/react";
function Form() {
  return (
    <Box display="flex" justifyContent="center">
      <Stack
        direction="column"
        w="100%"
        p="10px"
        overflow="auto"
        maxH={{ base: "200px", md: "420px" }}
        h={{ base: "200px", md: "420px" }}
      >
        <Box pb="5px">
          <Text>Tipo de Arreglo</Text>
          <Select />
          <Button
            colorScheme="pink"
            display="flex"
            marginLeft="auto"
            mt="10px"
            size="sm"
          >
            Agregar
          </Button>
        </Box>
        <Box pb="5px">
          <Text>Variante de Envoltura</Text>
          <Select />
          <Button
            colorScheme="pink"
            display="flex"
            marginLeft="auto"
            mt="10px"
            size="sm"
          >
            Agregar
          </Button>
        </Box>
        <Box pb="5px">
          <Text>Variante de Flor</Text>
          <Select />
          <Button
            colorScheme="pink"
            display="flex"
            marginLeft="auto"
            mt="10px"
            size="sm"
          >
            Agregar
          </Button>
        </Box>
        <Box pb="5px">
          <Text>Disponible</Text>
          <Select />
        </Box>
        <Box pb="5px">
          <Text>Extra</Text>
          <Textarea></Textarea>
        </Box>
      </Stack>
    </Box>
  );
}

export default Form;

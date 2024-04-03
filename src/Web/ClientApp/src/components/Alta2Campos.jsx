import React from "react";
import {
  Box,
  Heading,
  Center,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";

function Alta2Campos({
  titulo,
  label1,
  pholder1,
  label2,
  pholder2,
  isDropdown,
}) {
  return (
    <div>
      <Center>
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={4}
          height={{ base: "auto", md: "600px" }}
          width={{ base: "100%", md: "43rem" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          marginTop="7rem"
        >
          <Heading
            as="h2"
            mt={0}
            mb={2}
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="bold"
          >
            {titulo}
          </Heading>
          <VStack spacing={10}>
            <Box mb={4}>
              <Box mb={4} mt={10} display="flex" justifyContent="center">
                <label htmlFor="nombre">{label1}</label>
              </Box>
              <Input
                id="nombre"
                placeholder={pholder1}
                size={{ base: "md", md: "lg" }}
                width={{ base: "80%", md: "400px" }}
              />
              <Box mb={4} mt={10} display="flex" justifyContent="center">
                <label htmlFor="Enlace">{label2}</label>
              </Box>
              {isDropdown ? (
                <Select
                  id="Enlace"
                  placeholder={pholder2}
                  size={{ base: "md", md: "lg" }}
                  width={{ base: "80%", md: "400px" }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              ) : (
                <Input
                  id="Enlace"
                  placeholder={pholder2}
                  size={{ base: "md", md: "lg" }}
                  width={{ base: "80%", md: "400px" }}
                />
              )}
            </Box>
            <Button
              bg="#FC8181"
              _hover={{ bg: "#f36868" }}
              color="white"
              size={{ base: "sm", md: "md" }}
            >
              Agregar
            </Button>
          </VStack>
        </Box>
      </Center>
    </div>
  );
}

export default Alta2Campos;

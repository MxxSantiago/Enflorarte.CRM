import { Box, Heading, Input, Button, VStack, Card } from "@chakra-ui/react";

function Alta({ titulo, label, pholder, label2, pholder2 }) {
  return (
    <Card
      bg="white"
      borderRadius="md"
      p={4}
      height={{ base: "auto" }}
      width={{ base: "100%", md: "550px" }}
      display="flex"
      alignItems="center"
    >
      <Heading
        mt={0}
        mb={2}
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="bold"
      >
        {titulo}
      </Heading>
      <VStack spacing={10}>
        <Box mb={4}>
          <Box mb={4} mt={7} display="flex" justifyContent="center">
            <label htmlFor="nombre">{label}</label>
          </Box>
          <Input
            id="nombre"
            placeholder={pholder}
            size={{ base: "md", md: "lg" }}
            width={{ base: "100%", md: "400px" }}
          />
          {titulo === "Crear Tipo de Comunicación" && (
            <>
              <Box mb={4} mt={10} display="flex" justifyContent="center">
                <label htmlFor="nombre2">{label2}</label>
              </Box>
              <Input
                id="nombre2"
                placeholder={pholder2}
                size={{ base: "md", md: "lg" }}
                width={{ base: "80%", md: "400px" }}
              />
            </>
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
    </Card>
  );
}

export default Alta;

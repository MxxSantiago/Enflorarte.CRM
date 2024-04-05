import { useState, Fragment, useEffect } from "react";
import { Box, Heading, Input, Button, VStack, Card } from "@chakra-ui/react";
import { createEntity } from "../helpers/selectClient.ts";

function CreateEntity({ titulo, entityName, entity }) {
  const [properties, setProperties] = useState({ ...entity });

  useEffect(() => setProperties({ ...entity }), [entity]);

  const handleCreate = async () => await createEntity(entityName, properties);

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
        <Box mb={4} display="flex" flexDirection="column">
          {Object.keys(properties)
            .filter((property) => property !== "id")
            .map((property) => (
              <Fragment key={property + entity.id}>
                <Box mb={2} mt={7} display="flex">
                  <label htmlFor={property}>{property}</label>
                </Box>
                <Input
                  id={property}
                  size={{ base: "md", md: "lg" }}
                  width={{ base: "100%", md: "400px" }}
                  onChange={(e) =>
                    setProperties({
                      ...properties,
                      [property]: e.target.value,
                    })
                  }
                />
              </Fragment>
            ))}
        </Box>
        <Button
          bg="#FC8181"
          _hover={{ bg: "#f36868" }}
          color="white"
          size={{ base: "sm", md: "md" }}
          onClick={handleCreate}
        >
          Agregar
        </Button>
      </VStack>
    </Card>
  );
}

export default CreateEntity;

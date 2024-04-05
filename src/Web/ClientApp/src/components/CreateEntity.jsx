import { useState, Fragment, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Card,
  useToast,
} from "@chakra-ui/react";
import {
  createEntity,
  createEntityPayload,
} from "../helpers/web-api-client.helper.ts";
import { primaryColor } from "../constants.ts";

function CreateEntity({ title, entityName, entity, refreshView }) {
  const toast = useToast();
  const [properties, setProperties] = useState({ ...entity });

  useEffect(() => setProperties({ ...entity }), [entity]);

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      await createEntity(entityName, createEntityPayload(properties));
      toast({
        title: `${entityName} creado correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      setProperties({ ...entity });
      refreshView();
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const isDisabled = () =>
    Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.trim() === "");

  return (
    <Card
      as="form"
      borderRadius="lg"
      p={4}
      height="100%"
      display="flex"
      maxW={{ base: "100%", md: "700px" }}
    >
      <Heading
        mt={0}
        mb={2}
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="bold"
        textAlign="center"
      >
        {title}
      </Heading>
      <VStack spacing={10}>
        <Box mb={4} display="flex" flexDirection="column">
          {Object.keys(properties)
            .filter((property) => property !== "id")
            .map((property) => (
              <Fragment key={property + entity.id}>
                <Box mb={1} mt={5} display="flex">
                  <label htmlFor={property}>{property}:</label>
                </Box>
                <Input
                  id={property}
                  size={{ base: "md", md: "lg" }}
                  value={properties[property] ?? ""}
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
          bg={primaryColor}
          _hover={{ bg: "#f36868" }}
          color="white"
          size={{ base: "sm", md: "md" }}
          onClick={handleCreate}
          type="submit"
          isDisabled={isDisabled()}
        >
          Agregar
        </Button>
      </VStack>
    </Card>
  );
}

export default CreateEntity;
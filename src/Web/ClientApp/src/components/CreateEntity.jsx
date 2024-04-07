import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Select,
  useToast,
  Grid,
  VStack,
} from "@chakra-ui/react";
import {
  createEntity,
  createEntityPayload,
  getAllEntities,
} from "../core/helpers/web-api-client.helper.ts";
import { LANG } from "../core/helpers/translations.helper.ts";

function CreateEntity({
  title,
  entityName,
  entity,
  refreshView,
  fatherEntityName,
  lastUpdated,
}) {
  const toast = useToast();
  const [properties, setProperties] = useState({ ...entity });
  const [fatherEntityData, setFatherEntityData] = useState([]);

  useEffect(() => setProperties({ ...entity }), [entity]);

  useEffect(() => {
    if (fatherEntityName) {
      populateFatherItems();
    }
  }, [lastUpdated]);

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      await createEntity(entityName, createEntityPayload(properties));
      toast({
        title: `${LANG(entityName)} creado correctamente`,
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

  const populateFatherItems = async () => {
    const data = await getAllEntities(fatherEntityName);
    setFatherEntityData(data);
  };

  const isDisabled = () =>
    Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.trim() === "");

  const propertyKeys = Object.keys(properties).filter(
    (property) => property !== "id"
  );

  return (
    <Card
      as="form"
      p={4}
      pt={8}
      variant="outline"
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
        <Grid
          gap={6}
          templateColumns={{
            base: "1fr",
            md: propertyKeys.length > 1 ? "1fr 1fr" : "1fr",
          }}
          justifyItems={{
            base: "start",
            md: propertyKeys.length > 1 ? "start" : "center",
          }}
        >
          {Object.keys(properties)
            .filter((property) => property !== "id")
            .map((property) => (
              <Box key={property + entity.id} width="100%">
                <Box mb={1} mt={5} display="flex">
                  <label htmlFor={property}>{LANG(property)}:</label>
                </Box>
                {property.toString().includes("Id") ? (
                  <Select
                    id={property}
                    size={{ base: "md", md: "lg" }}
                    value={properties[property] ?? ""}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        [property]:
                          e.target.value === "---" ? undefined : e.target.value,
                      })
                    }
                  >
                    <option>---</option>
                    {fatherEntityData.map((fatherEntity) => (
                      <option key={fatherEntity.id} value={fatherEntity.id}>
                        {fatherEntity.name}
                      </option>
                    ))}
                  </Select>
                ) : (
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
                )}
              </Box>
            ))}
        </Grid>
        <Button
          size={{ base: "sm", md: "md" }}
          colorScheme="pink"
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

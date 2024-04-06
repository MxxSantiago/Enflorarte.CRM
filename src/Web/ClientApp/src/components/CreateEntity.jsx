import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  createEntity,
  createEntityPayload,
  getAllEntities,
} from "../helpers/web-api-client.helper.ts";
import { primaryColor } from "../constants.ts";
import { LANG } from "../helpers/es.ts";

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

  const populateFatherItems = async () => {
    const data = await getAllEntities(fatherEntityName);
    setFatherEntityData(data);
    console.log(data);
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

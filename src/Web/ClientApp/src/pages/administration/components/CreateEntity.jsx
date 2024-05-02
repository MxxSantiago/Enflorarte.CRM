import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  useToast,
  Grid,
  VStack,
} from "@chakra-ui/react";
import {
  createEntity,
  createEntityPayload,
  getAllEntities,
} from "../../../core/helpers/web-api-client.helper.ts";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { AutocompleteSelect } from "../../../components/shared/AutocompleteSelect.jsx";

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
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => setProperties({ ...entity }), [entity]);

  useEffect(() => {
    if (fatherEntityName) {
      populateFatherItems();
    }
  }, [lastUpdated]);

  const handleSelectedItemChange = (selectedItem, property) => {
    if (selectedItem.length) {
      setSelectedItem(selectedItem);
      setProperties({
        ...properties,
        [property]: "" + selectedItem[0]?.value,
      });
    } else {
      setSelectedItem([]);
      setProperties({
        ...properties,
        [property]: "",
      });
    }
  };

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

  const isDisabled = () => {
    return Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.trim() === "");
  };

  const propertyKeys = Object.keys(properties).filter(
    (property) => property !== "id"
  );

  useEffect(() => {}, [properties]);

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
            .filter(
              (property) => property !== "id" && property !== fatherEntityName
            )
            .map((property) => (
              <Box key={property + entity.id} width="100%">
                <Box mb={1} mt={5} display="flex">
                  <label htmlFor={property}>{LANG(property)}:</label>
                </Box>
                {property.toString().includes("Id") ? (
                  <>
                    <AutocompleteSelect
                      _items={fatherEntityData.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onChange={(e) => handleSelectedItemChange(e, property)}
                      selectedItem={selectedItem}
                    />
                  </>
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

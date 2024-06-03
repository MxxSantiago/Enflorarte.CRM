import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Input,
  Text,
  Textarea,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { createLookupEntityPayload } from "../../../core/helpers/web-api-client.helper.ts";
import { Arrangement } from "../../../web-api-client.ts";
import { AutocompleteMultiSelect } from "../../../components/shared/AutocompleteSelect.jsx";
import { usePostQuery } from "../../../core/hooks/useApiClientHooks.tsx";
import {
  cancelChangesText,
  saveChangesText,
  saveColorScheme,
} from "../../../core/constants.ts";

const ArrangementEntity = new Arrangement().toJSON();

const CreateArrangmentTemplate = ({
  isOpen,
  onClose,
  arrangementTypeData,
  wrappingVariantData,
  flowerVariantData,
  isTemplate = true,
  refetch,
  arrangementsData,
}) => {
  const [selectedItems, setSelectedItems] = useState({
    arrangementTypes: [],
    wrapperVariants: [],
    flowerVariants: [],
  });
  const [properties, setProperties] = useState({
    ...ArrangementEntity,
    wrapperVariants: [],
    flowerVariants: [],
    arrangementTypes: [],
    isTemplate: isTemplate,
  });

  const { isSuccess, execute, isLoading } = usePostQuery(
    "arrangement",
    createLookupEntityPayload(properties)
  );

  useEffect(() => {
    if (isSuccess) refetch();
    onClose();
  }, [isSuccess]);

  const handleCreate = (event) => {
    event.preventDefault();
    execute();
  };

  const handleSelectedItemChange = (propertySelectedItems, property) => {
    if (propertySelectedItems.length) {
      setSelectedItems({
        ...selectedItems,
        [property]: propertySelectedItems,
      });
      setProperties({
        ...properties,
        [property]: propertySelectedItems.map((item) => item.value),
      });
    } else {
      setSelectedItems({
        ...selectedItems,
        [property]: [],
      });
      setProperties({
        ...properties,
        [property]: [],
      });
    }
  };
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    const nameAlreadyExists = arrangementsData.some(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );

    setAlreadyExists(nameAlreadyExists);
    setProperties({
      ...properties,
      name: newName,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{
        base: "full",
        md: "4xl",
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Plantilla de arreglo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
            <GridItem
              maxW={{ base: "100%", md: "400px" }}
              display="flex"
              alignItems="center"
            >
              <Image
                src={properties.referenceImage}
                objectFit="cover"
                borderRadius="10px"
                boxSize="500px"
                width={{ base: "100%", md: "500px" }}
                fallbackSrc="https://via.placeholder.com/500"
              />
            </GridItem>
            <GridItem
              height="500px"
              overflow="auto"
              w={{ base: "100%", md: "400px" }}
            >
              <Box p="10px">
                <Text marginY={2}>Nombre</Text>
                <Input
                  size={{ base: "md", md: "lg" }}
                  value={properties.name ?? ""}
                  onChange={handleNameChange}
                />
                {alreadyExists && (
                  <Alert status="warning">
                    <AlertIcon />
                    <AlertTitle>Advertencia</AlertTitle>
                    <AlertDescription>
                      Este nombre de arreglo ya existe.
                    </AlertDescription>
                  </Alert>
                )}
                <Text marginY={2} marginTop={8}>
                  URL Imagen de Referencia
                </Text>
                <Input
                  size={{ base: "md", md: "lg" }}
                  value={properties.referenceImage ?? ""}
                  onChange={(e) =>
                    setProperties({
                      ...properties,
                      referenceImage: e.target.value,
                    })
                  }
                />
                <Text marginY={2} marginTop={8}>
                  Tipo de Arreglo
                </Text>
                <AutocompleteMultiSelect
                  items={arrangementTypeData.map((item) => ({
                    value: item,
                    label: item.name,
                  }))}
                  _selectedItems={selectedItems.arrangementTypes}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemChange(
                      changes.selectedItems,
                      "arrangementTypes"
                    )
                  }
                />
                <Text marginY={2}>Variante de Envoltura</Text>
                <AutocompleteMultiSelect
                  items={wrappingVariantData.map((item) => ({
                    value: item,
                    label: item.name,
                  }))}
                  _selectedItems={selectedItems.wrapperVariants}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemChange(
                      changes.selectedItems,
                      "wrapperVariants"
                    )
                  }
                />
                <Text marginY={2} marginTop={8}>
                  Variante de Flor
                </Text>
                <AutocompleteMultiSelect
                  items={flowerVariantData.map((item) => ({
                    value: item,
                    label: item.name,
                  }))}
                  _selectedItems={selectedItems.flowerVariants}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemChange(
                      changes.selectedItems,
                      "flowerVariants"
                    )
                  }
                />
                <Box display="flex" alignItems="center" marginTop={8}>
                  <Text margin={0} marginRight={3}>
                    Disponible
                  </Text>
                  <Checkbox
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        isAvailable: e.target.checked,
                      })
                    }
                  />
                </Box>
                <Text marginY={2} marginTop={8}>
                  Extras
                </Text>
                <Textarea
                  value={properties.extras ?? ""}
                  onChange={(e) =>
                    setProperties({
                      ...properties,
                      extras: e.target.value,
                    })
                  }
                />
              </Box>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} isLoading={isLoading}>
            {cancelChangesText}
          </Button>
          <Button colorScheme={saveColorScheme} onClick={handleCreate}>
            {saveChangesText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateArrangmentTemplate;

import React, { useState, useEffect } from "react";
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
  useToast,
  Image,
  Box,
  Input,
  Text,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import Arrangment from "../Assest/ArregloPlantilla.jpeg";
import {
  createEntity,
  createEntityPayload,
} from "../../../core/helpers/web-api-client.helper.ts";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { Arrangement } from "../../../web-api-client.ts";
import { AutocompleteMultiSelect } from "../../../components/shared/AutocompleteSelect";
import { getAllEntities } from "../../../core/helpers/web-api-client.helper.ts";

const ArrangementEntity = new Arrangement().toJSON();

const CreateArrangmentTemplate = ({ isOpen, onClose, arrangementTypeData, wrappingVariantData, flowerVariantData }) => {
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
    extras: ["extra1", "extra2", "extra3"],
    tags: ["tag1", "tag2", "tag3"],
    isTemplate: true,
    referenceImage:
      "https://th.bing.com/th/id/OIP.jhDoQH_cNgvyWYy9yH6eKQHaG8?rs=1&pid=ImgDetMain",
  });
  const toast = useToast();

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      await createEntity("arrangement", createEntityPayload(properties));
      toast({
        title: `${LANG("arrangement")} creado correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      onClose();
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleSelectedItemChange = (propertySelectedItems, property) => {
    console.log(propertySelectedItems);

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

  return (
    <>
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
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
              <GridItem
                maxW={{ base: "100%", md: "400px" }}
                display="flex"
                alignItems="center"
              >
                <Image src={Arrangment} objectFit="cover" borderRadius="10px" />
              </GridItem>
              <GridItem w={{ base: "100%", md: "400px" }}>
                <Box p="10px" overflow="auto" h={{ md: "420px" }}>
                  <Text marginY={2}>Nombre</Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    value={properties.name ?? ""}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        name: e.target.value,
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
                    selectedItems={selectedItems.arrangementTypes}
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
                    selectedItems={selectedItems.wrappingVariants}
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
                    selectedItems={selectedItems.flowerVariants}
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
                    Extra
                  </Text>
                  <Textarea />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="pink" onClick={handleCreate}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateArrangmentTemplate;

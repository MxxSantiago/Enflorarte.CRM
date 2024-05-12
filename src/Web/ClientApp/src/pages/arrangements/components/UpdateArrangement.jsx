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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AutocompleteMultiSelect } from "../../../components/shared/AutocompleteSelect";
import {
  useDeleteQuery,
  usePutQuery,
} from "../../../core/hooks/useApiClientHooks.jsx";

function UpdateArrangement({
  isOpenUpdate,
  onCloseUpdate,
  arrangement,
  deleteArrangement,
  updateArrangement,
  arrangementTypeData,
  wrappingVariantData,
  flowerVariantData,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [selectedItems, setSelectedItems] = useState({
    arrangementTypes: arrangement.arrangementTypes.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    wrapperVariants: arrangement.wrapperVariants.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    flowerVariants: arrangement.flowerVariants.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  });
  const [properties, setProperties] = useState({ ...arrangement });

  const { isSuccess, putEntity } = usePutQuery("arrangement", properties);
  const { isSuccess: isDeleteSuccess, deleteEntity } = useDeleteQuery(
    "arrangement",
    arrangement.id
  );

  useEffect(() => {
    if (isSuccess) {
      updateArrangement(properties);
    }
    onCloseUpdate();
  }, [isSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      deleteArrangement(arrangement.id);
    }
    onClose();
  }, [isDeleteSuccess]);

  const handleSelectedItemChange = (propertySelectedItems, property) => {
    if (propertySelectedItems.length) {
      setSelectedItems({
        ...selectedItems,
        [property]: propertySelectedItems,
      });
      setProperties({
        ...properties,
        [property]: propertySelectedItems.map((item) => ({
          id: item.value,
          name: item.label,
        })),
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
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
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
            <Grid
              height="100%"
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            >
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
                w={{ base: "100%", md: "400px" }}
                overflow="auto"
              >
                <Box p="10px">
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
                      value: item.id,
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
                      value: item.id,
                      label: item.name,
                    }))}
                    selectedItems={selectedItems.wrapperVariants}
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
                      value: item.id,
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
                      isChecked={properties.isAvailable}
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
            <Button
              colorScheme="red"
              onClick={onOpen}
              display="flex"
              marginRight="auto"
            >
              Eliminar
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              motionPreset="slideInBottom"
              onClose={onClose}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Eliminar
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    ¿Estás seguro de que quieres eliminar este arreglo? Esta
                    acción no se puede deshacer.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={deleteEntity} ml={3}>
                      Eliminar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            <Box display="flex">
              <Button mr={3} onClick={onCloseUpdate}>
                Cerrar
              </Button>
              <Button colorScheme="pink" onClick={putEntity}>
                Guardar cambios
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateArrangement;

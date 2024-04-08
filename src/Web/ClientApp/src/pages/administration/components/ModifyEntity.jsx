import { useRef, useState, useEffect } from "react";
import { Input, Button, Box, Select } from "@chakra-ui/react";
import { updateEntity } from "../../../core/helpers/web-api-client.helper.ts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { FaRegEdit } from "react-icons/fa";
import AutocompleteSelect from "../../../components/shared/AutocompleteSelect.jsx";

function getRelatedFatherEntity(fatherEntityData, fatherEntityName, entity) {
  let fatherIdProperty = `${fatherEntityName}Id`;

  // TODO: Change prefferedCommunicationType to just communicationType
  if (fatherIdProperty.indexOf("communication") !== -1) {
    fatherIdProperty =
      "preferred" +
      fatherIdProperty.charAt(0).toUpperCase() +
      fatherIdProperty.slice(1);
  }

  const fatherId = entity[fatherIdProperty];

  const fatherEntity = fatherEntityData.find((item) => item.id === fatherId);

  if (!fatherEntity) {
    return [];
  } else {
    return [
      {
        value: fatherEntity.id,
        label: fatherEntity.name,
      },
    ];
  }
}

function ModifyEntity({
  entityName,
  entity,
  refreshView,
  lastUpdated,
  fatherEntityData,
  fatherEntityName,
}) {
  const toast = useToast();
  const [properties, setProperties] = useState({ ...entity });
  const [selectedItem, setSelectedItem] = useState(
    getRelatedFatherEntity(fatherEntityData, fatherEntityName, entity)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleUpdate = async () => {
    try {
      await updateEntity(entityName, {
        ...properties,
        id: entity.id,
      });

      toast({
        title: `${LANG(entityName)} modificada correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });

      onClose();
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

  const cleanProperties = () => setProperties({ ...entity });

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

  useEffect(() => {
    cleanProperties();
  }, [entity, lastUpdated, isOpen]);

  useEffect(() => {
    setSelectedItem(
      getRelatedFatherEntity(fatherEntityData, fatherEntityName, entity)
    );
  }, [entity, fatherEntityData, fatherEntityName]);

  const isDisabled = () =>
    Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.toString().trim() === "");

  return (
    <>
      <IconButton
        icon={<FaRegEdit />}
        colorScheme="pink"
        onClick={onOpen}
        size="sm"
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Modificar {LANG(entityName)} <b>{entity.name}</b>
            </AlertDialogHeader>
            <AlertDialogBody>
              {Object.keys(properties)
                .filter((property) => property !== "id")
                .map((property) => (
                  <Box key={property + entity.id} width="100%">
                    <Box mb={2} mt={7} display="flex">
                      <label htmlFor={property}>{LANG(property)}</label>
                    </Box>
                    {property.toString().includes("Id") ? (
                      <AutocompleteSelect
                        _items={fatherEntityData.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                        onChange={(e) => handleSelectedItemChange(e, property)}
                        selectedItem={selectedItem}
                      />
                    ) : (
                      <Input
                        id={property}
                        size={{ base: "md", md: "lg" }}
                        width={{ base: "100%", md: "400px" }}
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
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                ml={3}
                colorScheme="pink"
                onClick={handleUpdate}
                isDisabled={isDisabled()}
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ModifyEntity;

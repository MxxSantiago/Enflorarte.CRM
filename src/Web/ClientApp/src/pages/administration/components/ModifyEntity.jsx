import { useRef, useState, useEffect } from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { FaRegEdit } from "react-icons/fa";
import { AutocompleteSelect } from "../../../components/shared/AutocompleteSelect.jsx";
import { usePutQuery } from "../../../core/hooks/useApiClientHooks.tsx";
import {
  cancelChangesText,
  modifierColorScheme,
  saveChangesText,
  saveColorScheme,
} from "../../../core/constants.ts";

function getRelatedFatherEntity(fatherEntityName, entity) {
  const fatherEntity = entity && entity[fatherEntityName];
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
  fatherEntityData,
  fatherEntityName,
  refetch,
}) {
  const [properties, setProperties] = useState({ ...entity });
  const [selectedItem, setSelectedItem] = useState(
    getRelatedFatherEntity(fatherEntityName, entity)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { isSuccess, execute, isLoading } = usePutQuery(entityName, properties);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    cleanProperties();
  }, [entity, isOpen]);

  useEffect(() => {
    setSelectedItem(getRelatedFatherEntity(fatherEntityName, entity));
  }, [entity, fatherEntityData, fatherEntityName]);

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

  const isDisabled = () =>
    Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.toString().trim() === "");

  return (
    <>
      <IconButton
        icon={<FaRegEdit />}
        colorScheme={modifierColorScheme}
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
            <AlertDialogHeader fontSize="xl" fontWeight="bold">
              <b>
                Modificar {LANG(entityName)} '{entity.name}'
              </b>
            </AlertDialogHeader>
            <AlertDialogBody>
              {Object.keys(properties)
                .filter(
                  (property) =>
                    property !== "id" && property !== fatherEntityName
                )
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
              <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
                {cancelChangesText}
              </Button>
              <Button
                isLoading={isLoading}
                ml={3}
                colorScheme={saveColorScheme}
                onClick={execute}
                isDisabled={isDisabled()}
              >
                {saveChangesText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ModifyEntity;

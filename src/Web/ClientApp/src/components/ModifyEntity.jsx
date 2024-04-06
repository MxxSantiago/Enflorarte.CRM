import { useRef, useState, Fragment, useEffect } from "react";
import { Input, Button, Box, Select } from "@chakra-ui/react";
import {
  updateEntity,
  getAllEntities,
} from "../helpers/web-api-client.helper.ts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { primaryColor } from "../constants.ts";

function ModifyEntity({
  entityName,
  entity,
  refreshView,
  lastUpdated,
  fatherEntityName,
}) {
  const toast = useToast();
  const [properties, setProperties] = useState({ ...entity });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fatherEntityData, setFatherEntityData] = useState([]);
  const cancelRef = useRef();

  useEffect(() => {
    if (fatherEntityName) {
      populateFatherItems();
    }
  }, [lastUpdated]);

  const handleUpdate = async () => {
    try {
      await updateEntity(entityName, {
        ...properties,
        id: entity.id,
      });

      toast({
        title: `${entityName} creado correctamente`,
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

  const populateFatherItems = async () => {
    const data = await getAllEntities(fatherEntityName);
    setFatherEntityData(data);
    console.log(data);
  };

  const cleanProperties = () => {
    setProperties({ ...entity });
  };

  useEffect(() => {
    cleanProperties();
  }, [entity, lastUpdated, isOpen]);

  const isDisabled = () =>
    Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.toString().trim() === "");

  return (
    <>
      <Button
        onClick={onOpen}
        bg={primaryColor}
        _hover={{ bg: "#f36868" }}
        color="white"
        size={{ base: "sm" }}
      >
        Editar
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Modificar {entityName} <b>{entity.name}</b>
            </AlertDialogHeader>
            <AlertDialogBody>
              {Object.keys(properties)
                .filter((property) => property !== "id")
                .map((property) => (
                  <Fragment key={property + entity.id}>
                    <Box mb={2} mt={7} display="flex">
                      <label htmlFor={property}>{property}</label>
                    </Box>
                    {property.toString().includes("Id") ? (
                      <Select
                        id={property}
                        size={{ base: "md", md: "lg" }}
                        value={properties[property] ?? ""}
                        onChange={(e) =>
                          setProperties({
                            ...properties,
                            [property]: e.target.value,
                          })
                        }
                      >
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
                  </Fragment>
                ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                ml={3}
                bg={primaryColor}
                _hover={{ bg: "#f36868" }}
                color="white"
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

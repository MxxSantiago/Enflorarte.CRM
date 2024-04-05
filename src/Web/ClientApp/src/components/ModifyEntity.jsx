import { useRef, useState, Fragment } from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import { updateEntity } from "../helpers/selectClient.ts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function ModifyEntity({ entityName, entity }) {
  const [properties, setProperties] = useState({ ...entity });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleUpdate = async () => await updateEntity(entityName, properties);

  return (
    <>
      <Button
        onClick={onOpen}
        bg="#FC8181"
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
              Modificar {entityName} '{entity.name}'
            </AlertDialogHeader>
            <AlertDialogBody>
              {Object.keys(properties)
                .filter((property) => property !== "id")
                .map((property) => (
                  <Fragment key={property + entity.id}>
                    <Box mb={2} mt={7} display="flex">
                      <label htmlFor={property}>{property}</label>
                    </Box>
                    <Input
                      id={property}
                      size={{ base: "md", md: "lg" }}
                      width={{ base: "100%", md: "400px" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          [property]: e.target.value,
                        })
                      }
                    />
                  </Fragment>
                ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                ml={3}
                bg="#FC8181"
                _hover={{ bg: "#f36868" }}
                color="white"
                onClick={handleUpdate}
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

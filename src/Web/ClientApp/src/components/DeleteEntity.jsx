import { Button } from "@chakra-ui/react";
import { deleteEntity } from "../helpers/selectClient.ts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

function DeleteEntity({ entityName, entity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async () => await deleteEntity(entityName, entity.id);

  return (
    <>
      <Button
        bg="#9B2C2C"
        _hover={{ bg: "#822727" }}
        color="white"
        onClick={onOpen}
        size={{ base: "sm" }}
      >
        Eliminar
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar {entityName} '{entity.name}'
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que quieres eliminar esta entidad? Esta acción no
              se puede deshacer.
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
                onClick={handleDelete}
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

export default DeleteEntity;

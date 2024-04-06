import { Button } from "@chakra-ui/react";
import { deleteEntity } from "../helpers/web-api-client.helper.ts";
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
import { useRef } from "react";
import { primaryColor, secondaryColor } from "../constants.ts";
import { LANG } from "../helpers/es.ts";

function DeleteEntity({ entityName, entity, refreshView }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async () => {
    try {
      await deleteEntity(entityName, entity.id);
      toast({
        title: `${LANG(entityName)} '${entity.name}' eliminado correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: `
          La ${LANG(entityName)}
          '${
            entity.name
          }' no se pudo eliminar ya que hay recurso(s) asociado(s).
        `,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
    refreshView();
  };

  return (
    <>
      <Button
        bg={secondaryColor}
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
              Eliminar {LANG(entityName)} <b>{entity.name}</b>
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
                bg={primaryColor}
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

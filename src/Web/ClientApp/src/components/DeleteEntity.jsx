import { deleteEntity } from "../core/helpers/web-api-client.helper.ts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { LANG } from "../core/helpers/translations.helper.ts";
import { MdDeleteOutline } from "react-icons/md";

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
      <IconButton
        icon={<MdDeleteOutline />}
        colorScheme="red"
        onClick={onOpen}
        size={{ base: "sm" }}
      >
        Eliminar
      </IconButton>
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
              <Button ml={3} colorScheme="red" onClick={handleDelete}>
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

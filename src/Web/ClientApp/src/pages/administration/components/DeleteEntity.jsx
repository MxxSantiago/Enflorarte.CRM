import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteQuery } from "../../../core/hooks/useApiClientHooks.jsx";

function DeleteEntity({ entityName, entity, _deleteEntity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { isSuccess, deleteEntity } = useDeleteQuery(entityName, entity.id);

  useEffect(() => {
    if (isSuccess) {
      _deleteEntity(entity.id);
    }
  }, [isSuccess]);

  const handleDelete = () => {
    deleteEntity(entityName, entity.id);
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
              Eliminar {LANG(entityName)} <b>{entity?.name}</b>
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

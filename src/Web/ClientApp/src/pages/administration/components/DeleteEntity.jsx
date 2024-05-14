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
import { cancelChangesText, deleteText } from "../../../core/constants.ts";

function DeleteEntity({ entityName, entity, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { isSuccess, deleteEntity, isLoading } = useDeleteQuery(
    entityName,
    entity.id
  );

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess]);

  return (
    <>
      <IconButton
        icon={<MdDeleteOutline />}
        colorScheme="red"
        onClick={onOpen}
        size={{ base: "sm" }}
      >
        {deleteText}
      </IconButton>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <b>
                Eliminar {LANG(entityName)} '{entity?.name}'
              </b>
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que quieres eliminar esta entidad? Esta acción no
              se puede deshacer.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
                {cancelChangesText}
              </Button>
              <Button
                ml={3}
                isLoading={isLoading}
                colorScheme="red"
                onClick={deleteEntity}
              >
                {deleteText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteEntity;

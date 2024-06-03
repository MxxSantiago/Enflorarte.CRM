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
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteUser } from "../hooks/useDeleteUser.tsx";
import { cancelChangesText, deleteText } from "../../../core/constants.ts";

function DeleteUser({ user, refetch}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const { isError, isSuccess, execute, isLoading} = useDeleteUser();

    useEffect(() => {
        if (isSuccess) refetch();
    }, [isSuccess]);

    const handleSubmit = async () => {
        await execute(user.id);
        if (isSuccess) {
            refetch();
            onClose();
        }
    };

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
                            Eliminar Usuario '{user.userName}'
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            ¿Estás seguro de que quieres eliminar este usuario? Esta acción no
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
                                onClick={handleSubmit}
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

export default DeleteUser;
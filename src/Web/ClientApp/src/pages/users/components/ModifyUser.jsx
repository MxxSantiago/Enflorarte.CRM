import React, {useEffect, useRef, useState} from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    useToast,
    Button,
    IconButton,
    Input,
    useDisclosure
} from "@chakra-ui/react";
import {FaRegEdit} from "react-icons/fa";
import {AutocompleteMultiSelect, AutocompleteSelect} from "../../../components/shared/AutocompleteSelect.jsx";
import {cancelChangesText, modifierColorScheme, saveChangesText, saveColorScheme,} from "../../../core/constants.ts";
import {useUpdateUser} from "../hooks/useUpdateUser.tsx";

function ModifyUsers({user, refetch, roles}) {
    const [properties, setProperties] = useState({ ...user });
    const toast = useToast();
    const [selectedItems, setSelectedItems] = useState({ roles: [], });
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef();
    const {isLoading, isError, isSuccess, execute} = useUpdateUser();

    useEffect(() => {
        setProperties({ ...user });
        setSelectedItems(user.roles || []);
    }, [user]);

    const handleSelectedItemChange = (propertySelectedItems, property) => {
        if (propertySelectedItems.length) {
            setSelectedItems({
                ...selectedItems,
                [property]: propertySelectedItems,
            });
            setProperties({
                ...properties,
                [property]: propertySelectedItems.map((item) => item.value),
            });
        } else {
            setSelectedItems({
                ...selectedItems,
                [property]: [],
            });
            setProperties({
                ...properties,
                [property]: [],
            });
        }
    };

    const isDisabled = () =>
        Object.values(properties).some(value => value == null || value.toString().trim() === "");

    const handleSubmit = async () => {
        try {
            await execute(properties);
            refetch();
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: `Error al modificar el usuario: ${error.message}`,
                position: "bottom-right",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <IconButton
                icon={<FaRegEdit/>}
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
                            Modificar Usuario '{user.userName}'
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Box width="100%">
                                <Box mb={2} mt={7} display="flex">
                                    <label htmlFor="name">Nombre</label>
                                </Box>
                                <Input
                                    id="name"
                                    size={{base: "md", md: "lg"}}
                                    width={{base: "100%", md: "400px"}}
                                    value={properties.userName ?? ""}
                                    onChange={(e) =>
                                        setProperties({
                                            ...properties,
                                            userName: e.target.value,
                                        })
                                    }
                                />
                            </Box>
                            <Box width="100%">
                                <Box mb={2} mt={7} display="flex">
                                    <label htmlFor="name">Nuevo email</label>
                                </Box>
                                <Input
                                    id="name"
                                    size={{base: "md", md: "lg"}}
                                    width={{base: "100%", md: "400px"}}
                                    value={properties.email ?? ""}
                                    onChange={(e) =>
                                        setProperties({
                                            ...properties,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Box>
                            <Box width="100%">
                                <Box mb={2} mt={7} display="flex">
                                    <label htmlFor="name">Nueva contraseña</label>
                                </Box>
                                <Input
                                    id="name"
                                    size={{base: "md", md: "lg"}}
                                    type={"password"}
                                    width={{base: "100%", md: "400px"}}
                                    value={properties.password ?? ""}
                                    onChange={(e) =>
                                        setProperties({
                                            ...properties,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </Box>
                            <Box width="100%">
                                <Box mb={2} mt={7} display="flex">
                                    <label htmlFor="roles">Roles</label>
                                </Box>
                                <AutocompleteMultiSelect
                                    items={roles.map(role => ({value: role.name, label: role.name}))}
                                    _selectedItems={selectedItems.roles}
                                    onSelectedItemsChange={(change) =>
                                        handleSelectedItemChange(
                                            change.selectedItems,
                                            "roles"
                                        )
                                    }
                                />
                            </Box>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
                                {cancelChangesText}
                            </Button>
                            <Button
                                isLoading={isLoading}
                                ml={3}
                                colorScheme={saveColorScheme}
                                onClick={handleSubmit}
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

export default ModifyUsers;
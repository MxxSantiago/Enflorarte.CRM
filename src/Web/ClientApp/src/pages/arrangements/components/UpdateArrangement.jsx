import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Input,
  Text,
  Textarea,
  Checkbox,
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Arrangment from "../Assest/ArregloPlantilla.jpeg";
import { deleteEntity } from "../../../core/helpers/web-api-client.helper.ts";

function UpdateArrangement({ isOpenUpdate, onCloseUpdate, item }) {
  const toast = useToast();
  const [edit, setEdit] = useState(true);
  const [buttonText, setButtonText] = useState("Editar");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleEdit = () => {
    setEdit(false);
    setButtonText(edit ? "Guardar" : "Editar");
  };

  const handleSave = () => {
    setEdit(true);
    setButtonText("Editar");
  };

  const handleDelete = async () => {
    try {
      await deleteEntity("arrangement", item.id);
      toast({
        title: "Arreglo Eliminado",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "El arreglo no se pudo eliminar",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        size={{
          base: "full",
          md: "4xl",
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {console.log(item)}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
              <GridItem
                maxW={{ base: "100%", md: "400px" }}
                display="flex"
                alignItems="center"
              >
                <Image src={Arrangment} objectFit="cover" borderRadius="10px" />
              </GridItem>
              <GridItem w={{ base: "100%", md: "400px" }}>
                <Box p="10px" overflow="auto" h={{ md: "420px" }}>
                  <Box display="flex">
                    {item.tags.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        colorScheme="pink"
                        fontSize="1em"
                        m={1}
                      >
                        {item}
                      </Badge>
                    ))}
                  </Box>

                  <Box mt={5}>
                    <Text>Nombre</Text>
                    <Input value={item.name} disabled={edit} />
                  </Box>
                  <Box mt={5}>
                    <Text>Tipo de Arreglo</Text>
                    {item.arrangementTypes.map((item, index) => (
                      <Input
                        key={index}
                        value={item.name}
                        disabled={edit}
                        mb={1}
                      />
                    ))}
                  </Box>
                  <Box mt={5}>
                    <Text>Variante de Envoltura</Text>
                    {item.wrapperVariants.map((item, index) => (
                      <Input key={index} value={item.name} disabled={edit} />
                    ))}
                  </Box>
                  <Box mt={5}>
                    <Text>Variante de Flor</Text>
                    {item.flowerVariants.map((item, index) => (
                      <Input key={index} value={item.name} disabled={edit} />
                    ))}
                  </Box>

                  <Box display="flex" alignItems="center" mt={5}>
                    <Text margin={0} marginRight={3}>
                      Disponible
                    </Text>
                    <Checkbox isChecked={item.isAvailable} disabled={edit} />
                  </Box>
                  <Text marginTop={5} disabled={edit}>
                    Extra
                  </Text>
                  <Textarea disabled={edit} />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={onOpen}
              display="flex"
              marginRight="auto"
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
                    Eliminar
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    ¿Estás seguro de que quieres eliminar este arreglo? Esta
                    acción no se puede deshacer.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete} ml={3}>
                      Eliminar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>

            <Box display="flex">
              <Button mr={3} onClick={onCloseUpdate}>
                Cerrar
              </Button>
              {edit ? (
                <Button colorScheme="pink" onClick={handleEdit}>
                  {buttonText}
                </Button>
              ) : (
                <Button colorScheme="pink" onClick={handleSave}>
                  {buttonText}
                </Button>
              )}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateArrangement;

import React, {useState} from "react";
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
  useToast,
  Image,
  Text,
} from "@chakra-ui/react";
import Arrangment from "../Assest/ArregloPlantilla.jpeg";
import Form from "./Form";
import {
    createEntity,
    createEntityPayload
} from "../../../../core/helpers/web-api-client.helper.ts";
import {LANG} from "../../../../core/helpers/translations.helper.ts";

function CreateArrangmentTemplate({ isOpen, onClose }) {
    const toast = useToast();
    const [entity, setEntity] = useState({});
    const [properties, setProperties] = useState({ ...entity });


    const handleCreate = async (event) => {
        event.preventDefault();

        try {
            await createEntity("arrangement", createEntityPayload(properties));
            toast({
                title: `${LANG("arrangement")} creado correctamente`,
                status: "success",
                isClosable: true,
                position: "bottom-right",
            });
            setProperties({ ...entity });
        } catch (error) {
            toast({
                title: error.message,
                status: "error",
                isClosable: true,
                position: "bottom-right",
            });
        }
    };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" height="600px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              <GridItem
                w={{ base: "100%", md: "400px" }}
                display="flex"
                alignItems="center"
              >
                <Image
                  src={Arrangment}
                  boxSize={{ base: "100%", md: "400px" }}
                  objectFit="cover"
                  borderRadius="10px"
                />
              </GridItem>
              <GridItem w={{ base: "100%", md: "400px" }}>
                <Grid h="100%" gridTemplateRows="1fr 5fr" gap={4}>
                  <GridItem
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl" as="b">
                      Nombre Arreglo
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Form onSubmit={handleCreate}/>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="pink" onClick={handleCreate}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateArrangmentTemplate;

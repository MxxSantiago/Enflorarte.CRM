import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  CardHeader,
  Heading,
  Textarea,
  Checkbox,
  Box,
  Image,
  Text,
  Input,
  Grid,
  GridItem,
  Card,
  Select,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import Imagen from "./Assets/spiderman.jpg";
import { AutocompleteMultiSelect } from "../../../../components/shared/AutocompleteSelect";
import TagForm from "./Tags/TagForm";

const CreateOrder = ({ isOpen, onClose }) => {
  const disclosure = useDisclosure();
  const {
    isOpen: isOpenTag,
    onOpen: onOpenTag,
    onClose: onCloseTag,
  } = disclosure;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
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
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
              <GridItem
                maxW={{ base: "100%", md: "400px" }}
                display="flex"
                alignItems="center"
              >
                <Image
                  src={Imagen}
                  objectFit="cover"
                  borderRadius="10px"
                  boxSize="500px"
                  width={{ base: "100%", md: "500px" }}
                  fallbackSrc="https://via.placeholder.com/500"
                  alt="a"
                />
              </GridItem>
              <GridItem
                height="500px"
                overflow="auto"
                w={{ base: "100%", md: "400px" }}
              >
                <Box p="10px">
                  <Card p={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Fechas
                      </Heading>
                    </CardHeader>
                    <Text>Fecha de Orden</Text>
                    <Input type="Date" />
                    <Text marginY={2} marginTop={8}>
                      Fecha de Entrega
                    </Text>
                    <Input type="Date" />
                    <Text marginY={2} marginTop={8}>
                      Entrega Desde
                    </Text>
                    <Input type="Date" />
                    <Text marginY={2} marginTop={8}>
                      Entrega Hasta
                    </Text>
                    <Input type="Date" />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Cliente
                      </Heading>
                    </CardHeader>
                    <Text>Responsable</Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Dirección
                    </Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Forma de Comunicación
                    </Text>
                    <Select></Select>
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Pedido
                      </Heading>
                    </CardHeader>
                    <Text>Arreglo</Text>
                    <Select></Select>
                    <Box mt={3}>
                      <Flex>
                        <Button marginLeft="auto" colorScheme="gray" size="sm">
                          Crear Arreglo
                        </Button>
                      </Flex>
                    </Box>
                    <Text marginY={2} marginTop={5}>
                      Descripción
                    </Text>
                    <Textarea />
                    <Text marginY={2} marginTop={8}>
                      Imagen de Referencia
                    </Text>
                    <Input />
                    <Text marginY={2} marginTop={8}>
                      Imagen de Resultado
                    </Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Tipo de Entrega
                    </Text>
                    <Select></Select>
                    <Text marginY={2} marginTop={8}>
                      Estado del Pedido
                    </Text>
                    <Select></Select>
                    <Text marginY={2} marginTop={8}>
                      Entregado
                    </Text>
                    <Checkbox />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Precios y Pagos
                      </Heading>
                    </CardHeader>
                    <Text>Precio del Pedido</Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Precio de Realización
                    </Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Precio de Envio
                    </Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Dinero Abonado
                    </Text>
                    <Input variant="outline" />
                    <Text marginY={2} marginTop={8}>
                      Pagado
                    </Text>
                    <Checkbox />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Etiquetas del Pedido
                      </Heading>
                    </CardHeader>
                    <Text>Etiquetas</Text>
                    <Select></Select>
                    <Box mt={3}>
                      <Flex>
                        <Button
                          marginLeft="auto"
                          colorScheme="gray"
                          size="sm"
                          onClick={onOpenTag}
                        >
                          Crear Etiqueta
                        </Button>
                      </Flex>
                    </Box>
                  </Card>

                  <Modal isOpen={isOpenTag} onClose={onCloseTag} isCentered size={{base: "sm", md: "md"}}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Crear Etiqueta</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <TagForm/>
                      </ModalBody>

                      <ModalFooter>
                      <Button colorScheme="gray" mr={3} onClick={onCloseTag}>
                          Cerrar
                        </Button>
                        <Button colorScheme="pink" mr={3}>
                          Guardar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Sucursal
                      </Heading>
                    </CardHeader>
                    <Text>Sucursal Encargada</Text>
                    <Select></Select>
                  </Card>
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Box display="flex">
              <Button mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <Button colorScheme="pink">Guardar</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateOrder;

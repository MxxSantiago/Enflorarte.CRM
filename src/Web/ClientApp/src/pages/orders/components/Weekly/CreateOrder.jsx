import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Imagen from "./Assets/spiderman.jpg";
import { AutocompleteMultiSelect } from "../../../../components/shared/AutocompleteSelect";
import TagForm from "./Tags/TagForm";
import React, { useEffect, useState } from "react";
import { Order } from "../../../../web-api-client.ts";
import { usePostQuery } from "../../../../core/hooks/useApiClientHooks";
import { createLookupEntityPayload } from "../../../../core/helpers/web-api-client.helper.ts";
import {
  saveChangesText,
  saveColorScheme,
} from "../../../../core/constants.ts";

const OrderEntity = new Order().toJSON();

const CreateOrder = ({
  isOpen,
  onClose,
  arrangementData,
  deliveryTypeData,
  responsibleData,
  branchData,
  refetch,
  communicationTypeData,
}) => {
  const disclosure = useDisclosure();
  const {
    isOpen: isOpenTag,
    onOpen: onOpenTag,
    onClose: onCloseTag,
  } = disclosure;

  const [selectedItems, setSelectedItems] = useState({
    responsible: [],
    communicationType: [],
    branch: [],
    arrangement: [],
    deliveryType: [],
  });

  const [properties, setProperties] = useState({
    ...OrderEntity,
    responsible: [],
    communicationType: [],
    branch: [],
    arrangement: [],
    deliveryType: [],
    isPaid: false,
    wasDelivered: false,
  });

  const { isSuccess, postEntity } = usePostQuery(
    "order",
    createLookupEntityPayload(properties)
  );

  useEffect(() => {
    if (isSuccess) refetch();
    setProperties({
      ...OrderEntity,
      responsible: [],
      communicationType: [],
      branch: [],
      arrangement: [],
      deliveryType: [],
      isPaid: false,
      wasDelivered: false,
    });
    onClose();
  }, [isSuccess]);

  const handleCreate = (event) => {
    event.preventDefault();
    console.log(properties);
    postEntity();
  };

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
                  alt="ImagenPedido"
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
                    <Input
                      size={{ base: "md", md: "lg" }}
                      type={"date"}
                      value={properties.orderDate ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          orderDate: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Fecha de Entrega
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      type={"date"}
                      value={properties.deliveryDate ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          deliveryDate: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Entrega Desde
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      type={"date"}
                      value={properties.deliveryFrom ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          deliveryFrom: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Entrega Hasta
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      type={"date"}
                      value={properties.deliveryUntil ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          deliveryUntil: e.target.value,
                        })
                      }
                    />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Cliente
                      </Heading>
                    </CardHeader>
                    <Text>Nombre del Responsable</Text>
                    <AutocompleteMultiSelect
                      items={responsibleData.map((item) => ({
                        value: item,
                        label: item.name,
                      }))}
                      _selectedItems={selectedItems.responsible}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemChange(
                          changes.selectedItems,
                          "responsible"
                        )
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Dirección
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.address ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          address: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Forma de Comunicación
                    </Text>
                    <AutocompleteMultiSelect
                      items={communicationTypeData.map((item) => ({
                        value: item,
                        label: item.name,
                      }))}
                      _selectedItems={selectedItems.communicationType}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemChange(
                          changes.selectedItems,
                          "communicationType"
                        )
                      }
                    />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Receptor
                      </Heading>
                    </CardHeader>
                    <Text>Nombre del Receptor</Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.recipientName ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          recipientName: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Número Telefónico
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.recipientPhoneNumber ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          recipientPhoneNumber: e.target.value,
                        })
                      }
                    />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Pedido
                      </Heading>
                    </CardHeader>
                    <Text>Arreglo</Text>
                    <AutocompleteMultiSelect
                      items={arrangementData.map((item) => ({
                        value: item,
                        label: item.name,
                      }))}
                      _selectedItems={selectedItems.arrangement}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemChange(
                          changes.selectedItems,
                          "arrangement"
                        )
                      }
                    />
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
                    <Textarea
                      value={properties.description ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          description: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Imagen de Referencia
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.referenceImage ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          referenceImage: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Imagen de Resultado
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.resultImage ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          resultImage: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Tipo de Entrega
                    </Text>
                    <AutocompleteMultiSelect
                      items={deliveryTypeData.map((item) => ({
                        value: item,
                        label: item.name,
                      }))}
                      _selectedItems={selectedItems.deliveryType}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemChange(
                          changes.selectedItems,
                          "deliveryType"
                        )
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Estado del Pedido
                    </Text>
                    <Select></Select>
                    <Text marginY={2} marginTop={8}>
                      Entregado
                    </Text>
                    <Checkbox
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          wasDelivered: e.target.checked,
                        })
                      }
                    />
                  </Card>

                  <Card p={4} mt={4}>
                    <CardHeader>
                      <Heading size="md" display="flex" justifyContent="center">
                        Precios y Pagos
                      </Heading>
                    </CardHeader>
                    <Text>Precio del Pedido</Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.orderPrice ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          orderPrice: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Precio de Realización
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.realizationPrice ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          realizationPrice: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Precio de Envio
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.shippingPrice ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          shippingPrice: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Dinero Abonado
                    </Text>
                    <Input
                      size={{ base: "md", md: "lg" }}
                      value={properties.moneyPaid ?? ""}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          moneyPaid: e.target.value,
                        })
                      }
                    />
                    <Text marginY={2} marginTop={8}>
                      Pagado
                    </Text>
                    <Checkbox
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          isPaid: e.target.checked,
                        })
                      }
                    />
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

                  <Modal
                    isOpen={isOpenTag}
                    onClose={onCloseTag}
                    isCentered
                    size={{ base: "sm", md: "md" }}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Crear Etiqueta</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <TagForm />
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
                    <AutocompleteMultiSelect
                      items={branchData.map((item) => ({
                        value: item,
                        label: item.name,
                      }))}
                      _selectedItems={selectedItems.branch}
                      onSelectedItemsChange={(changes) =>
                        handleSelectedItemChange(
                          changes.selectedItems,
                          "branch"
                        )
                      }
                    />
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
              <Button colorScheme={saveColorScheme} onClick={handleCreate}>
                {saveChangesText}
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateOrder;

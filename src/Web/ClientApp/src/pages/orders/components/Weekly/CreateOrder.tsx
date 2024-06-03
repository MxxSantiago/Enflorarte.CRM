import {
  Box,
  Button,
  Card,
  CardHeader,
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
  Skeleton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AutocompleteMultiSelect } from "../../../../components/shared/AutocompleteSelect.jsx";
import React, { useEffect, useState } from "react";
import {
  Order,
  OrderStatus,
  PaymentStatus,
} from "../../../../web-api-client.ts";
import { usePostQuery } from "../../../../core/hooks/useApiClientHooks.tsx";
import { createLookupEntityPayload } from "../../../../core/helpers/web-api-client.helper.ts";
import {
  cancelChangesText,
  saveChangesText,
  saveColorScheme,
} from "../../../../core/constants.ts";
import { toLocalISOString } from "../../../../core/helpers/dates.helper.ts";
import { LANG } from "../../../../core/helpers/translations.helper.ts";


const OrderEntity = new Order().toJSON();

const CreateOrder = ({
  isOpen,
  date,
  onClose,
  arrangementData,
  deliveryTypeData,
  responsibleData,
  branchData,
  refetch,
  communicationTypeData,
  tagData,
  cacheKey,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any[] }>({
    responsible: [],
    communicationType: [],
    branch: [],
    arrangement: [],
    deliveryType: [],
    tag: [],
  });

  const [properties, setProperties] = useState({
    ...OrderEntity,
  });

  const initializeMockProperties = () => {
    const picture = `https://picsum.photos/1000?random=${Math.random()}`;
    setProperties({
      ...OrderEntity,
      responsible: [responsibleData[0]],
      communicationType: [communicationTypeData[0]],
      branch: [branchData[0]],
      arrangement: [arrangementData[0]],
      deliveryType: [deliveryTypeData[0]],
      tags: [tagData[0]],
      orderStatus: OrderStatus.Pending,
      referenceImage: picture,
      orderDate: toLocalISOString(date),
      deliveryDate: toLocalISOString(date),
      address: "Mexicali",
      recipientName: "Juan",
      recipientCellphoneNumber: "6861234567",
      description: "Arreglo de flores",
      resultImage: picture,
      orderPrice: 100,
      paymentStatus: PaymentStatus.Pending,
    });

    setSelectedItems({
      responsible: [
        {
          value: responsibleData[0],
          label: responsibleData[0].name,
        },
      ],
      communicationType: [
        {
          value: communicationTypeData[0],
          label: communicationTypeData[0].name,
        },
      ],
      branch: [
        {
          value: branchData[0],
          label: branchData[0].name,
        },
      ],
      arrangement: [
        {
          value: arrangementData[0],
          label: arrangementData[0].name,
        },
      ],
      deliveryType: [
        {
          value: deliveryTypeData[0],
          label: deliveryTypeData[0].name,
        },
      ],
      tag: [
        {
          value: tagData[0],
          label: tagData[0].name,
        },
      ],
    });
  };

  useEffect(() => {
    setImageLoading(true);
  }, [isOpen]);

  const { isSuccess, execute, isLoading } = usePostQuery(
    "order",
    createLookupEntityPayload(properties),
    cacheKey
  );

  useEffect(() => {
    if (isSuccess) {
      onClose();
      refetch();
    }
  }, [isSuccess]);

  const handleCreate = (event) => {
    event.preventDefault();
    execute();
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
              <Skeleton
                isLoaded={!imageLoading}
                borderRadius="10px"
                boxSize="500px"
                width={{ base: "100%", md: "500px" }}
              >
                <Image
                  src={properties.referenceImage}
                  objectFit="cover"
                  borderRadius="10px"
                  boxSize="500px"
                  width={{ base: "100%", md: "500px" }}
                  fallbackSrc="https://via.placeholder.com/500"
                  alt="ImagenPedido"
                  onLoad={() => setImageLoading(false)}
                />
              </Skeleton>
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
                  <Text marginY={2}>Fecha de Orden</Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    type="datetime-local"
                    value={properties.orderDate}
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
                    type="datetime-local"
                    value={properties.deliveryDate}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        deliveryDate: e.target.value,
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
                  <Text marginY={2}>Nombre del Responsable</Text>
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
                  <Text marginY={2}>Nombre</Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    value={properties.recipientName}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        recipientName: e.target.value,
                      })
                    }
                  />
                  <Text marginY={2} marginTop={8}>
                    Dirección
                  </Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    value={properties.address}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        address: e.target.value,
                      })
                    }
                  />
                  <Text marginY={2} marginTop={8}>
                    Número Telefónico
                  </Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    value={properties.recipientCellphoneNumber}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        recipientCellphoneNumber: e.target.value,
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
                  <Text marginY={2}>Estado del pedido</Text>
                  <Select
                      value={properties.orderStatus as OrderStatus}
                      onChange={(e) => {
                        setProperties({
                          ...properties,
                          orderStatus: e.target.value as unknown as OrderStatus,
                        });
                      }}
                    >
                      {Object.entries(OrderStatus).map(([key]) => {
                        if (isNaN(Number(key))) {
                          return (
                            <option
                              key={key}
                              value={
                                OrderStatus[key as keyof typeof OrderStatus]
                              }
                            >
                              {LANG(key)}
                            </option>
                          );
                        }
                      })}
                    </Select>
                  <Text marginY={2} marginTop={8}>
                    Arreglo
                  </Text>
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
                  <Text marginY={2} marginTop={8}>
                    Descripción
                  </Text>
                  <Textarea
                    value={properties.description}
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
                    value={properties.referenceImage}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        referenceImage: e.target.value,
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
                </Card>

                <Card p={4} mt={4}>
                  <CardHeader>
                    <Heading size="md" display="flex" justifyContent="center">
                      Precios y Pagos
                    </Heading>
                  </CardHeader>
                  <Text marginY={2}>Precio del Pedido</Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    value={properties.orderPrice}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        orderPrice: e.target.value,
                      })
                    }
                  />
                  <Text marginY={2} marginTop={8}>
                    Estado de pago
                  </Text>
                  <Select
                      value={properties.paymentStatus as PaymentStatus}
                      onChange={(e) => {
                        setProperties({
                          ...properties,
                          paymentStatus: e.target
                            .value as unknown as PaymentStatus,
                        });
                      }}
                    >
                      {Object.entries(PaymentStatus).map(([key]) => {
                        if (isNaN(Number(key))) {
                          return (
                            <option
                              key={key}
                              value={
                                PaymentStatus[key as keyof typeof PaymentStatus]
                              }
                            >
                              {LANG(key)}
                            </option>
                          );
                        }
                      })}
                    </Select>
                </Card>

                <Card p={4} mt={4}>
                  <CardHeader>
                    <Heading size="md" display="flex" justifyContent="center">
                      Etiquetas del Pedido
                    </Heading>
                  </CardHeader>
                  <Text marginY={2}>Etiquetas</Text>
                  <AutocompleteMultiSelect
                    items={tagData.map((item) => ({
                      value: item,
                      label: item.name,
                    }))}
                    _selectedItems={selectedItems.tag}
                    onSelectedItemsChange={(changes) =>
                      handleSelectedItemChange(changes.selectedItems, "tag")
                    }
                  />
                </Card>

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
                      handleSelectedItemChange(changes.selectedItems, "branch")
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
              {cancelChangesText}
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme={saveColorScheme}
              onClick={handleCreate}
            >
              {saveChangesText}
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrder;

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
  useDisclosure,
} from "@chakra-ui/react";
import { AutocompleteMultiSelect } from "../../../../components/shared/AutocompleteSelect.jsx";
import React, { useEffect, useState } from "react";
import {
  useDeleteQuery,
  usePutQuery,
} from "../../../../core/hooks/useApiClientHooks.tsx";
import {
  cancelChangesText,
  deleteText,
  saveChangesText,
  saveColorScheme,
} from "../../../../core/constants.ts";
import {
  Arrangement,
  Branch,
  CommunicationType,
  DeliveryType,
  Order,
  OrderStatus,
  PaymentStatus,
  Responsible,
  Tag,
} from "../../../../web-api-client.ts";
import { LANG } from "../../../../core/helpers/translations.helper.ts";

interface UpdateOrderProps {
  isOpen: boolean;
  order: Order;
  onClose: () => void;
  arrangementData: Arrangement[];
  deliveryTypeData: DeliveryType[];
  responsibleData: Responsible[];
  branchData: Branch[];
  refetch: (clearCache: boolean) => void;
  communicationTypeData: CommunicationType[];
  tagData: Tag[];
}

const UpdateOrder = ({
  isOpen,
  order,
  onClose,
  arrangementData,
  deliveryTypeData,
  responsibleData,
  branchData,
  refetch,
  communicationTypeData,
  tagData,
}: UpdateOrderProps) => {
  const [deliveryDate, setDeliveryDate] = useState(
    order.deliveryDate?.toISOString().slice(0, 16)
  );
  const [orderDate, setOrderDate] = useState(
    order.orderDate?.toISOString().slice(0, 16)
  );

  const cancelRef = React.useRef();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [imageLoading, setImageLoading] = useState(true);

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any[] }>({
    responsible: order.responsible!.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    communicationType: order.communicationType!.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    branch: order.branch!.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    arrangement: order.arrangement!.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    deliveryType: order.deliveryType!.map((item) => ({
      value: item.id,
      label: item.name,
    })),
    tag: order.tags!.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  });

  const [properties, setProperties] = useState({
    ...order,
  });

  useEffect(() => {
    setImageLoading(true);
  }, [isOpen]);

  const { isSuccess, execute } = usePutQuery("order", {
    ...properties,
    deliveryDate: new Date(deliveryDate as any),
    orderDate: new Date(orderDate as any),
  });

  const { isSuccess: isDeleteSuccess, execute: deleteEntity } = useDeleteQuery(
    "order",
    order.id
  );

  useEffect(() => {
    if (isSuccess) {
      refetch(true);
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetch(true);
    }
    onClose();
  }, [isDeleteSuccess]);

  const handleUpdate = (event) => {
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
      blockScrollOnMount={false}
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
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                  />
                  <Text marginY={2} marginTop={8}>
                    Fecha de Entrega
                  </Text>
                  <Input
                    size={{ base: "md", md: "lg" }}
                    type="datetime-local"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
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
                            value={OrderStatus[key as keyof typeof OrderStatus]}
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
                  <Box mt={3}>
                    <Flex>
                      <Button marginLeft="auto" colorScheme="gray" size="sm">
                        Crear Arreglo
                      </Button>
                    </Flex>
                  </Box>
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
                    type="number"
                    value={properties.orderPrice}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        orderPrice: e.target.value as unknown as number,
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
          <Button
            colorScheme="red"
            onClick={onOpenDelete}
            display="flex"
            marginRight="auto"
          >
            {deleteText}
          </Button>
          <AlertDialog
            isOpen={isOpenDelete}
            leastDestructiveRef={cancelRef as any}
            motionPreset="slideInBottom"
            onClose={onCloseDelete}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Eliminar orden
                </AlertDialogHeader>

                <AlertDialogBody>
                  ¿Estás seguro de que quieres eliminar este arreglo? Esta
                  acción no se puede deshacer.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onCloseDelete}>{cancelChangesText}</Button>
                  <Button colorScheme="red" onClick={deleteEntity} ml={3}>
                    {deleteText}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <Box display="flex">
            <Button mr={3} onClick={onClose}>
              {cancelChangesText}
            </Button>
            <Button colorScheme={saveColorScheme} onClick={handleUpdate}>
              {saveChangesText}
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOrder;

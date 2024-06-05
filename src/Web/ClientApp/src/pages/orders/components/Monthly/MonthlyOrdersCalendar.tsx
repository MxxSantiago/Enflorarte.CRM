import React, { useMemo } from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import OrderCard from "../OrderCard.jsx";
import { OrdersCalendar } from "./OrdersCalendar.jsx";
import useGetOrdersByPeriod from "../../hooks/useGetOrdersByPeriod.tsx";
import { Order } from "../../../../web-api-client.ts";
import { spinnerConfiguration } from "../../../../core/constants.ts";
import CreateOrder from "../Weekly/CreateOrder.tsx";
import { AddIcon } from "@chakra-ui/icons";

const MonthlyOrdersCalendar = ({
  colorMode,
  arrangementData,
  responsibleData,
  communicationTypeData,
  isLoading,
  branchData,
  deliveryTypeData,
  tagData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [queryDate, setQueryDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to midnight, this to avoid timezone issues
    return now;
  });
  const [selectedDay, setSelectedDay] = useState(
    queryDate.toLocaleDateString()
  );

  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch,
    cacheKey,
  } = useGetOrdersByPeriod("Month", queryDate);

  const ordersByDate:
    | {
        [key: string]: Order[];
      }
    | any = useMemo(
    () =>
      orders.reduce((acc, order) => {
        const orderDate = new Date(order.deliveryDate!).toLocaleDateString();
        if (!acc[orderDate]) {
          acc[orderDate] = [];
        }
        acc[orderDate].push(order);
        return acc;
      }, {}),
    [orders, queryDate]
  );

  const [selectedDayOrders, setSelectedDayOrders] = useState<Order[]>([]);

  const handleDayClick = (date: string | number) => {
    const orders = ordersByDate[date] || [];
    setSelectedDayOrders(orders);
  };

  useEffect(() => {
    const orders = ordersByDate[selectedDay] || [];
    setSelectedDayOrders(orders);
  }, [ordersByDate]);

  const isLoadingData =
    isLoading ||
    isOrdersLoading ||
    !arrangementData ||
    !responsibleData ||
    !communicationTypeData ||
    !branchData ||
    !deliveryTypeData ||
    !tagData;

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "auto 1fr" }}
      gap={6}
      paddingX={{
        sm: 0,
        md: "3rem",
      }}
      paddingY="1rem"
      height={{
        base: "auto",
        lg: "calc(100% - 6rem)",
      }}
    >
      <Box overflow="auto">
        <OrdersCalendar
          data={ordersByDate}
          onDayClick={handleDayClick}
          setQueryDate={setQueryDate}
          queryDate={queryDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </Box>
      <Divider marginY="2rem" display={{ base: "block", lg: "none" }} />
      <Box
        paddingX="1rem"
        width="100%"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: colorMode === "dark" ? "gray.700" : "gray.300",
            borderRadius: "24px",
          },
        }}
      >
        <Flex>
          <Text
            fontSize={{
              base: "md",
              md: "lg",
            }}
            fontWeight="bold"
            color={colorMode === "dark" ? "gray.300" : "gray.600"}
          >
            Pedidos
          </Text>
          <IconButton
            isDisabled={isLoadingData}
            marginLeft="auto"
            icon={<AddIcon />}
            onClick={onOpen}
            aria-label="Crear pedido"
          />
        </Flex>
        {!isLoadingData ? (
          selectedDayOrders.length > 0 ? (
            selectedDayOrders.map((order: Order) => (
              <OrderCard
                key={order.id}
                order={order}
                colorMode={colorMode}
                isLoading={isLoading}
                arrangementData={arrangementData}
                responsibleData={responsibleData}
                communicationTypeData={communicationTypeData}
                branchData={branchData}
                deliveryTypeData={deliveryTypeData}
                tagData={tagData}
                refetch={refetch}
                cacheKey={cacheKey}
                index={undefined}
              />
            ))
          ) : (
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              textAlign="center"
              marginY="2rem"
            >
              No hay pedidos
            </Text>
          )
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Spinner {...spinnerConfiguration} />
          </Box>
        )}
        {!isLoadingData && (
          <CreateOrder
            isOpen={isOpen}
            date={new Date(selectedDay as any) || new Date()}
            onClose={onClose}
            arrangementData={arrangementData}
            responsibleData={responsibleData}
            communicationTypeData={communicationTypeData}
            branchData={branchData}
            deliveryTypeData={deliveryTypeData}
            tagData={tagData}
            refetch={refetch}
            cacheKey={cacheKey}
          />
        )}
      </Box>
    </Grid>
  );
};

export default MonthlyOrdersCalendar;

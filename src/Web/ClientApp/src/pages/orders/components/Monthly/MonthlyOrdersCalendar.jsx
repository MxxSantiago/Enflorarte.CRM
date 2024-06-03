import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import OrderCard from "../Weekly/OrderCard";
import { OrdersCalendar } from "./OrdersCalendar";

const MonthlyOrdersCalendar = ({ colorMode, ordersByDate }) => {
    const [selectedDayOrders, setSelectedDayOrders] = useState([]);
  
    const handleDayClick = (date) => {
      const orders = ordersByDate[date] || [];
      setSelectedDayOrders(orders);
    };
  
    useEffect(() => {
      const today = new Date().toDateString();
      const orders = ordersByDate[today] || [];
      setSelectedDayOrders(orders);
    }, [ordersByDate]);
  
    return (
      <Box
        paddingX={{
          sm: 0,
          md: "3rem",
        }}
        paddingY="1rem"
        overflow="auto"
        height="100%"
      >
        <OrdersCalendar data={ordersByDate} onDayClick={handleDayClick} />
        <Divider marginY="2rem" />
        <Box paddingX="1rem">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={colorMode === "dark" ? "gray.300" : "gray.600"}
          >
            Pedidos -&nbsp;
            {selectedDayOrders.length > 0
              ? selectedDayOrders[0].orderDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })
              : "No hay pedidos"}
          </Text>
          {selectedDayOrders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              index={index}
              colorMode={colorMode}
            />
          ))}
        </Box>
      </Box>
    );
  };

  export default MonthlyOrdersCalendar;
import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Th,
  Td,
  Tr,
  Tbody,
  Thead,
  Text,
  Flex,
  IconButton,
  Box,
  Button,
  useColorMode,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const OrdersCalendar = ({
  data,
  onDayClick,
  setQueryDate,
  queryDate,
  selectedDay,
  setSelectedDay,
}) => {
  const [currentMonth, setCurrentMonth] = useState(queryDate);
  const [tabIndex, setTabIndex] = useState(queryDate.getMonth() + 1);
  const { colorMode } = useColorMode();

  const prevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(newMonth);
    const newDate = new Date(queryDate).setMonth(newMonth.getMonth());
    const firstDay = new Date(newDate).setDate(1);
    setQueryDate(new Date(firstDay));
    setSelectedDay(new Date(firstDay).toLocaleDateString());
  };

  const nextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newMonth);
    const newDate = new Date(queryDate).setMonth(newMonth.getMonth());
    const firstDay = new Date(newDate).setDate(1);
    setQueryDate(new Date(firstDay));
    setSelectedDay(new Date(firstDay).toLocaleDateString());
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const startDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    // Table header with day abbreviations
    const weekdays = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
    const header = weekdays.map((weekday) => (
      <Th key={weekday} textAlign={"center"}>
        {weekday}
      </Th>
    ));

    // Table rows with days of the month
    let day = 1;
    const days = Array.from({ length: 6 }, (_, i) => {
      const cells = Array.from({ length: 7 }, (_, j) => {
        if (i === 0 && j < startDayOfMonth) {
          return <Td key={`${i}-${j}`} />;
        } else if (day > daysInMonth) {
          return null;
        } else {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const dateKey = date.toLocaleDateString();
          const orderCount = data[dateKey] ? data[dateKey].length : 0;
          day++;
          return (
            <Td key={`${i}-${j}`} textAlign="center" px={1} py={2}>
              <Button
                fontSize={{ base: "sm", md: "md" }}
                colorScheme={selectedDay === dateKey ? "blue" : "gray"}
                backgroundColor={
                  selectedDay === dateKey ? "blue.400" : "transparent"
                }
                onClick={() => {
                  setSelectedDay(dateKey);
                  onDayClick(dateKey);
                }}
              >
                {day - 1} ({orderCount})
              </Button>
            </Td>
          );
        }
      });
      return <Tr key={i}>{cells}</Tr>;
    }).filter(Boolean);

    return (
      <Table size="sm">
        <Thead>
          <Tr>{header}</Tr>
        </Thead>
        <Tbody>{days}</Tbody>
      </Table>
    );
  };

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <Box
      background={colorMode === "light" ? "white" : "gray.800"}
      borderRadius={{
        md: "md",
      }}
      border="1px"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      height="fit-content"
      minWidth="fit-content"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p=".85rem 1.25rem 1rem 1.25rem"
      >
        <Text fontWeight="bold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <Flex>
          <IconButton
            aria-label="Previous month"
            icon={<ChevronLeftIcon boxSize={8} />}
            onClick={() => {
              if (tabIndex === 0) {
                setTabIndex(11);
              } else if (tabIndex === 11) {
                setTabIndex(0);
              } else {
                setTabIndex(tabIndex - 1);
              }
              prevMonth();
            }}
            variant="ghost"
          />
          <IconButton
            aria-label="Next month"
            icon={<ChevronRightIcon boxSize={8} />}
            onClick={() => {
              if (tabIndex === 11) {
                setTabIndex(0);
              } else {
                setTabIndex(tabIndex + 1);
              }
              nextMonth();
            }}
            variant="ghost"
          />
        </Flex>
      </Flex>
      {renderDays(data)}
    </Box>
  );
};

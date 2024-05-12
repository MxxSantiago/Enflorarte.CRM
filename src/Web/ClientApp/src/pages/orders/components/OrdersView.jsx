import {
  Box,
  Text,
  Grid,
  Card,
  GridItem,
  useColorMode,
  IconButton,
  Tag,
  Flex,
  Divider,
  ButtonGroup,
  Tooltip,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { MdCalendarViewWeek, MdCalendarViewMonth } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const defaultOrder = {
  orderDate: new Date(), // Datetime
  deliveryDate: new Date(), // Datetime
  deliveryFrom: new Date(), // Datetime
  deliveryTo: new Date(), // Datetime
  responsible: {
    name: "John Doe",
  }, // FK (1)
  deliveryType: {
    name: "Uber",
  }, // FK (0-1)
  paymentStatus: "Pending", // Enum (String)
  address: "123 Main Street", // String
  wasOrderGenerated: false, // Bool
  description: "Description of the order", // String
  referenceImage: "url_to_reference_image", // String
  resultImage: "url_to_result_image", // String
  arrangements: [
    {
      name: "Arrangement 1",
      isTemplate: false,
      extras: "Extra information for the arrangement",
      referenceImage: "url_to_reference_image",
      isAvailable: true,
      wrapperVariants: [
        {
          name: "Wrapper Variant 1",
        },
        {
          name: "Wrapper Variant 2",
        },
      ],
      flowerVariants: [
        {
          name: "Flower Variant 1",
        },
        {
          name: "Flower Variant 2",
        },
      ],
      arrangementTypes: [
        {
          name: "Arrangement Type 1",
        },
        {
          name: "Arrangement Type 2",
        },
      ],
    },
  ], // FK (0-N)
  communicationType: {
    name: "WhatsApp",
  }, // FK (0-1)
  tags: [
    // {
    //   name: "San valentin",
    //   color: "blue",
    // },
    // {
    //   name: "Cliente importante",
    //   color: "red",
    // },
    // {
    //   name: "Cumpleaños",
    //   color: "green",
    // },

    {
      name: "Tag 1",
      color: "blue",
    },
    {
      name: "Tag 2",
      color: "red",
    },
    {
      name: "Tag 3",
      color: "green",
    },
  ], // FK (0-N), Max 3 tags per order
  orderPrice: 0.0, // Decimal
  shippingPrice: 0.0, // Decimal
  paidAmount: 0.0, // Decimal
  isPaid: false, // Bool
  wasDelivered: false, // Bool
  branch: "Headquarters", // FK (1)
  recipientName: "John Doe", // String
  recipientPhoneNumber: "123-456-7890", // String
};

const defaultOrderArray = Array.from({ length: 35 }, (_, index) => {
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() + Math.floor(index / 5));
  return {
    ...defaultOrder,
    orderDate,
  };
});

const ordersByDate = defaultOrderArray.reduce((acc, order) => {
  const date = new Date(order.orderDate).toDateString();
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(order);
  return acc;
}, {});

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

export const OrdersCalendar = ({ data, onDayClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const today = new Date().toDateString();
    setSelectedDay(today);
  }, []);

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

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
          const dateKey = date.toDateString();
          const orderCount = data[dateKey] ? data[dateKey].length : 0;
          day++;
          return (
            <Td key={`${i}-${j}`} textAlign="center" px={1} py={2}>
              <Button
                fontSize={{ base: "sm", lg: "lg" }}
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
            : ""}
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

const OrderCard = ({ order, index, colorMode, ...props }) => {
  return (
    <Card
      borderRadius="xl"
      height="250px"
      marginTop={index > 0 ? "1.5rem" : "0"}
      cursor={"pointer"}
      backgroundColor={colorMode === "dark" ? "gray.600" : "#fff"}
      transition="all 0.30s ease-in .15s"
      _hover={{
        shadow: colorMode === "dark" ? "xl" : "lg",
      }}
      {...props}
    >
      <Flex marginTop="auto" padding={5} paddingBottom={2} direction="column">
        <Divider />
        <Flex
          gap={3}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: colorMode === "dark" ? "#2D3748" : "#EDF2F7",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colorMode === "dark" ? "#4A5568" : "#CBD5E0",
            },
          }}
          padding="0 0 .5rem 0"
        >
          {order.tags.map((tag, index) => (
            <Tag
              display="inline-flex"
              key={index}
              size="sm"
              minW="fit-content"
              width="auto"
              variant="outline"
              borderRadius="2xl"
              colorScheme={tag.color}
              padding=".5rem 0.85rem"
              whiteSpace="nowrap"
            >
              {tag.name}
            </Tag>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

const GridColumn = ({ date, orders, isDragging, colorMode }) => {
  const backColor = colorMode === "dark" ? "gray.700" : "gray.100";
  const borderColor = colorMode === "dark" ? "gray.600" : "gray.200";

  return (
    <GridItem
      colSpan={1}
      border="1px solid white"
      height="100%"
      position="relative"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      borderRadius="xl"
      backgroundColor={backColor}
      borderColor={borderColor}
    >
      <Box
        display="flex"
        position="sticky"
        textAlign="center"
        alignItems="center"
        top={0}
        zIndex={1}
        padding="1rem 1.1rem 1rem 1.25rem"
        height={14}
        backgroundColor={backColor}
      >
        <Text fontSize="xl" margin={0}>
          {date.toLocaleDateString("es-ES", { weekday: "long" }).toUpperCase()}
        </Text>
        <Tag
          size="lg"
          variant="outline"
          marginLeft={5}
          borderRadius="2xl"
          colorScheme="blue"
        >
          &nbsp;{orders.length}&nbsp;
        </Tag>
        <IconButton marginLeft="auto" icon={<AddIcon />} />
      </Box>

      <Box padding={5} paddingTop={0}>
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            order={order}
            index={index}
            colorMode={colorMode}
            cursor={isDragging ? "grabbing" : "pointer"}
          />
        ))}
      </Box>
    </GridItem>
  );
};

const WeeklyOrdersKanban = ({ colorMode, ordersByDate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const gridRef = useRef();

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - gridRef.current.offsetLeft);
    setScrollLeft(gridRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    gridRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Grid
      paddingBottom="2rem"
      templateColumns="repeat(7, 300px)"
      gap="3rem"
      height="100%"
      overflowX="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      paddingX="3rem"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      cursor={isDragging ? "grabbing" : "grab"}
      ref={gridRef}
    >
      {Object.keys(ordersByDate).map((date, index) => (
        <GridColumn
          key={index}
          date={new Date(date)}
          orders={ordersByDate[date]}
          isDragging={isDragging}
          colorMode={colorMode}
        />
      ))}
    </Grid>
  );
};

const OrdersViewBody = ({ colorMode, mode }) => {
  // API calls, high state management, etc.

  return (
    <>
      {
        {
          week: (
            <WeeklyOrdersKanban
              colorMode={colorMode}
              ordersByDate={ordersByDate}
            />
          ),
          month: (
            <MonthlyOrdersCalendar
              colorMode={colorMode}
              ordersByDate={ordersByDate}
            />
          ),
        }[mode]
      }
    </>
  );
};

const OrdersViewHeader = ({ colorMode, mode }) => {
  const navigate = useNavigate();

  return (
    <Flex
      paddingTop="1rem"
      paddingX="3rem"
      marginBottom="1rem"
      width="100%"
      alignItems="center"
    >
      <Flex alignItems="center">
        <Text
          fontSize={{
            base: "xl",
            sm: "2xl",
            md: "3xl",
          }}
          fontWeight="bold"
          color={colorMode === "dark" ? "gray.300" : "gray.600"}
          width="fit-content"
          margin={0}
        >
          Pedidos
        </Text>
        <Text
          fontSize={{
            base: "md",
            sm: "lg",
            md: "xl",
          }}
          color={colorMode === "dark" ? "gray.300" : "gray.600"}
          margin={0}
          marginLeft=".75rem"
          marginTop={".25rem"}
        >
          {"(Entregas de " +
            {
              week: "la semana",
              month: "el mes",
            }[mode] +
            ")"}
        </Text>
      </Flex>
      <ButtonGroup isAttached variant="outline" marginLeft="auto">
        <Tooltip
          label="Pedidos por semana"
          fontSize="md"
          placement="bottom-start"
        >
          <IconButton
            icon={<MdCalendarViewWeek />}
            variant={mode === "week" ? "solid" : "outline"}
            onClick={() => navigate("/week")}
            color={
              mode === "week"
                ? colorMode === "dark"
                  ? "gray.200"
                  : "gray.500"
                : colorMode === "dark"
                ? "gray.300"
                : "gray.600"
            }
            colorScheme="gray"
          />
        </Tooltip>
        <Tooltip label="Pedidos por Mes" fontSize="md" placement="bottom-start">
          <IconButton
            title="Pedidos por mes"
            icon={<MdCalendarViewMonth />}
            variant={mode === "month" ? "solid" : "outline"}
            onClick={() => navigate("/month")}
            color={
              mode === "week"
                ? colorMode === "dark"
                  ? "gray.200"
                  : "gray.500"
                : colorMode === "dark"
                ? "gray.300"
                : "gray.600"
            }
            colorScheme="gray"
          />
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
};

const OrdersView = ({ mode = "week" }) => {
  const { colorMode } = useColorMode();

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      <OrdersViewHeader colorMode={colorMode} mode={mode} />
      <OrdersViewBody colorMode={colorMode} mode={mode} />
    </Box>
  );
};

export default OrdersView;

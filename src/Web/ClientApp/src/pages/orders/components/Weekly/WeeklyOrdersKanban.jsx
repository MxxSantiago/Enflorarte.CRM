import GridColumn from "./GridColumn";
import { Grid } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const WeekHandler = ({ orders, children }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const incrementWeek = () => setCurrentWeek(currentWeek + 1);
  const decrementWeek = () => setCurrentWeek(currentWeek - 1);

  const startOfWeek = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + currentWeek * 7);
    return date;
  }, [currentWeek]);

  const weekDates = useMemo(() => {
    return new Array(7).fill(null).map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + index);
      return date;
    });
  }, [startOfWeek]);

  const ordersByDay = useMemo(() => {
    return new Array(7).fill(null).map((_, index) => {
      return orders.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        return deliveryDate.getDay() === index + 1;
      });
    });
  }, [orders, currentWeek]);

  return children({
    currentWeek,
    incrementWeek,
    decrementWeek,
    ordersByDay,
    startOfWeek,
    weekDates,
  });
};

const DragHandler = ({ children }) => {
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
    const walk = x - startX;
    gridRef.current.scrollLeft = scrollLeft - walk;
  };

  return children({
    isDragging,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    gridRef,
  });
};

const WeeklyOrdersKanban = ({
  colorMode,
  orders,
  isLoading,
  arrangementData,
  responsibleData,
  communicationTypeData,
  branchData,
  deliveryTypeData,
}) => {
  return (
    <WeekHandler orders={orders}>
      {({ weekDates, ordersByDay }) => (
        <DragHandler>
          {({
            isDragging,
            onMouseDown,
            onMouseLeave,
            onMouseUp,
            onMouseMove,
            gridRef,
          }) => (
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
              {ordersByDay.map((ordersForDay, index) => {
                const dateLabel = `${daysOfWeek[index]} ${
                  weekDates[index].getDate() + 1
                }/${weekDates[index].getMonth() + 1}`;

                return (
                  <GridColumn
                    key={index}
                    date={dateLabel}
                    orders={ordersForDay}
                    colorMode={colorMode}
                    isLoading={isLoading}
                    arrangementData={arrangementData}
                    responsibleData={responsibleData}
                    communicationTypeData={communicationTypeData}
                    branchData={branchData}
                    deliveryTypeData={deliveryTypeData}
                  />
                );
              })}
            </Grid>
          )}
        </DragHandler>
      )}
    </WeekHandler>
  );
};

export default WeeklyOrdersKanban;

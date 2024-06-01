import GridColumn from "./GridColumn";
import { Grid } from "@chakra-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";
import useGetOrdersByPeriod from "../../hooks/useGetOrdersByPeriod.tsx";

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
    date.setDate(date.getDate() + currentWeek * 7);
    return date;
  }, [orders, currentWeek]);

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
        deliveryDate.setHours(0, 0, 0, 0);

        const startOfWeekMidnight = new Date(startOfWeek);
        startOfWeekMidnight.setHours(0, 0, 0, 0);

        const diffInDays = Math.floor(
          (deliveryDate - startOfWeekMidnight) / (1000 * 60 * 60 * 24)
        );
        return diffInDays === index;
      });
    });
  }, [startOfWeek]);

  const currentDayIndex = startOfWeek.getDay() - 1;
  const adjustedDaysOfWeek = [
    ...daysOfWeek.slice(currentDayIndex),
    ...daysOfWeek.slice(0, currentDayIndex),
  ];

  return children({
    currentWeek,
    incrementWeek,
    decrementWeek,
    ordersByDay,
    startOfWeek,
    weekDates,
    daysOfWeek: adjustedDaysOfWeek,
  });
};

const DragHandler = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const gridRef = useRef();

  const onMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - gridRef.current.offsetLeft);
    setScrollLeft(gridRef.current.scrollLeft);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - gridRef.current.offsetLeft;
      const walk = x - startX;
      gridRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

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
  arrangementData,
  responsibleData,
  communicationTypeData,
  isLoading,
  branchData,
  deliveryTypeData,
  tagData,
}) => {
  const {
    data,
    isLoading: isOrdersLoading,
    refetch,
  } = useGetOrdersByPeriod("Week");

  return (
    <WeekHandler orders={data}>
      {({ weekDates, ordersByDay, daysOfWeek }) => (
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
                const dateLabel = `${daysOfWeek[index]} ${weekDates[
                  index
                ].getDate()}/${weekDates[index].getMonth() + 1}`;

                return (
                  <GridColumn
                    key={index + dateLabel}
                    dateLabel={dateLabel}
                    refetch={refetch}
                    date={weekDates[index - 1]}
                    orders={ordersForDay}
                    colorMode={colorMode}
                    isLoading={isLoading || isOrdersLoading}
                    arrangementData={arrangementData}
                    responsibleData={responsibleData}
                    communicationTypeData={communicationTypeData}
                    branchData={branchData}
                    deliveryTypeData={deliveryTypeData}
                    tagData={tagData}
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

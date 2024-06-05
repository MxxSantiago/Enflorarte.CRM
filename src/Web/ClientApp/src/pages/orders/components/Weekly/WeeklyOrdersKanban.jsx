import GridColumn from "./GridColumn";
import { Grid } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useGetOrdersByPeriod from "../../hooks/useGetOrdersByPeriod.tsx";
import WeeklyOrdersFooter from "../OrderViewFooter.jsx";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const WeekHandler = ({ children, tagData }) => {
  const [queryDate, setQueryDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to midnight, this to avoid timezone issues
    return now;
  });

  const incrementWeek = () => {
    const newDate = new Date(queryDate);
    newDate.setDate(newDate.getDate() + 7);
    setQueryDate(newDate);
  };

  const decrementWeek = () => {
    const newDate = new Date(queryDate);
    newDate.setDate(newDate.getDate() - 7);
    setQueryDate(newDate);
  };

  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch,
    cacheKey,
  } = useGetOrdersByPeriod("Week", queryDate);

  useEffect(() => {
    refetch(true);
  }, [tagData]);

  const weekDates = useMemo(() => {
    return new Array(7).fill(null).map((_, index) => {
      const date = new Date(queryDate);
      date.setDate(date.getDate() + index);
      return date;
    });
  }, [queryDate]);

  const ordersByDay = useMemo(() => {
    return new Array(7).fill(null).map((_, index) => {
      return orders.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        deliveryDate.setHours(0, 0, 0, 0);

        const startOfWeekMidnight = new Date(queryDate);
        startOfWeekMidnight.setHours(0, 0, 0, 0);

        const diffInDays = Math.floor(
          (deliveryDate - startOfWeekMidnight) / (1000 * 60 * 60 * 24)
        );

        return diffInDays === index;
      });
    });
  }, [orders, queryDate]);

  const currentDayIndex = queryDate.getDay() - 1;
  const adjustedDaysOfWeek = [
    ...daysOfWeek.slice(currentDayIndex),
    ...daysOfWeek.slice(0, currentDayIndex),
  ];

  return children({
    currentWeek: queryDate,
    incrementWeek,
    decrementWeek,
    ordersByDay,
    weekDates,
    daysOfWeek: adjustedDaysOfWeek,
    isOrdersLoading,
    refetch,
    cacheKey,
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
  _paddingX,
}) => (
  <WeekHandler tagData={tagData}>
    {({
      weekDates,
      ordersByDay,
      daysOfWeek,
      incrementWeek,
      decrementWeek,
      isOrdersLoading,
      refetch,
      cacheKey,
    }) => (
      <DragHandler>
        {({
          isDragging,
          onMouseDown,
          onMouseLeave,
          onMouseUp,
          onMouseMove,
          gridRef,
        }) => (
          <>
            <Grid
              paddingBottom="1rem"
              paddingX={_paddingX}
              templateColumns="repeat(7, 300px)"
              gap="3rem"
              height={"calc(100% - 130px)"}
              overflowX="auto"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
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
                    date={weekDates[index]}
                    orders={ordersForDay}
                    colorMode={colorMode}
                    isLoading={isLoading || isOrdersLoading}
                    arrangementData={arrangementData}
                    responsibleData={responsibleData}
                    communicationTypeData={communicationTypeData}
                    branchData={branchData}
                    deliveryTypeData={deliveryTypeData}
                    tagData={tagData}
                    cacheKey={cacheKey}
                  />
                );
              })}
            </Grid>
            <WeeklyOrdersFooter
              height="40px"
              paddingX={_paddingX}
              incrementWeek={incrementWeek}
              decrementWeek={decrementWeek}
            />
          </>
        )}
      </DragHandler>
    )}
  </WeekHandler>
);

export default WeeklyOrdersKanban;

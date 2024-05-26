import GridColumn from "./GridColumn";
import { Grid } from "@chakra-ui/react";
import { useRef, useState } from "react";
import moment from "moment";

const WeeklyOrdersKanban = ({ colorMode, orders }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const gridRef = useRef();

  // TODO: Estructura de referencia para llenar todas las columnas, van a tener que modificarla, seria mejor que hagan que la API devuelva los datos directamente con el formato que se usa aqui en lugar de
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const ordersByDate = {};
  daysOfWeek.forEach((day) => {
    ordersByDate[day] = [...orders];
  });

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
      {Object.keys(ordersByDate).map((deliveryDate, id) => (
        <GridColumn
          key={id}
          date={moment(ordersByDate[deliveryDate].deliveryDate).toDate()}
          orders={ordersByDate[deliveryDate]}
          colorMode={colorMode}
        />
      ))}
    </Grid>
  );
};

export default WeeklyOrdersKanban;

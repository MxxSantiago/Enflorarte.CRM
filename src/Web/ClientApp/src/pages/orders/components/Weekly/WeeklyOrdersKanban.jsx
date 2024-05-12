import GridColumn from "./GridColumn";
import { Grid  } from "@chakra-ui/react";
import { useState, useRef } from "react";

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

  export default WeeklyOrdersKanban;
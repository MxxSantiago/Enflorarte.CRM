import GridColumn from "./GridColumn";
import {Grid} from "@chakra-ui/react";
import {useRef, useState} from "react";

const WeeklyOrdersKanban = ({colorMode, orders}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const gridRef = useRef()

    const ordersByDate = {};
    orders.forEach(order => {
        if (order.deliveryDate) {
            const deliveryDate = order.deliveryDate.toISOString().split('T')[0];
            if (!ordersByDate[deliveryDate]) {
                ordersByDate[deliveryDate] = [];
            }
            ordersByDate[deliveryDate].push(order);
        }
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
        const walk = (x - startX);
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
                        date={new Date(deliveryDate)}
                        orders={ordersByDate[deliveryDate]}
                        colorMode={colorMode}
                    />
                ))}
            </Grid>
        );
    };

    export default WeeklyOrdersKanban;
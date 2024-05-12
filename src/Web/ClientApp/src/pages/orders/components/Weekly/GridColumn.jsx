import OrderCard from "./OrderCard";
import { Box, GridItem, Text, Tag, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
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

  export default GridColumn;
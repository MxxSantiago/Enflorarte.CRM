import { Tag, Card, HStack, Box, Image } from "@chakra-ui/react";
import Imagen from "./Assets/spiderman.jpg";

const OrderCard = ({ order, index, colorMode, ...props }) => {
  return (
    <Card
      borderRadius="xl"
      height="260px"
      marginTop={index > 0 ? "1.5rem" : "0"}
      cursor={"pointer"}
      backgroundColor={colorMode === "dark" ? "gray.600" : "#fff"}
      transition="all 0.30s ease-in .15s"
      _hover={{
        shadow: colorMode === "dark" ? "xl" : "lg",
      }}
      {...props}
    >
      <Box h="100%" w="100%" borderRadius="xl">
        <Box h="82%">
          <Image
            src={Imagen}
            h="100%"
            w="100%"
            objectFit="cover"
            borderRadius="xl"
          />
        </Box>
        <HStack spacing={2} h="20%" overflowX="auto" pl={1.5}>
          {order.tags.map((tag, index) => (
            <Box>
              <Tag
                key={index}
                size="sm"
                borderRadius="full"
                variant="solid"
                colorScheme={tag.color}
              >
                {tag.name}
              </Tag>
            </Box>
          ))}
        </HStack>
      </Box>
    </Card>
  );
};

export default OrderCard;

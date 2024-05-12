import {Tag, Card, Flex, Divider} from "@chakra-ui/react";

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

  export default OrderCard;
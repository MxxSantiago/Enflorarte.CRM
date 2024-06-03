import { Tag, Card, HStack, Box, Image, Skeleton } from "@chakra-ui/react";
import { getAppropiateTextColor } from "../../../../core/helpers/adjustColor.helper.ts";

const OrderCard = ({ order, index, colorMode, isLoading, ...props }) => (
  <Skeleton
    isLoaded={!isLoading}
    borderRadius="xl"
    fadeDuration={0.75}
    height="260px"
    width="100%"
    marginTop={index > 0 ? 0 : "1.5rem"}
    backgroundColor={colorMode === "dark" ? "gray.600" : "#fff"}
    transition="all 0.30s ease-in .15s"
    {...props}
  >
    <Card
      borderRadius="xl"
      height="260px"
      width="100%"
      marginTop={index > 0 ? 0 : "1.5rem"}
      backgroundColor={colorMode === "dark" ? "gray.600" : "#fff"}
      transition="all 0.30s ease-in .15s"
      _hover={{
        shadow: colorMode === "dark" ? "xl" : "lg",
      }}
      {...props}
    >
      <Box h="100%" w="100%" borderRadius="xl" overflow="hidden">
        <Box
          h="82%"
          _hover={{
            "> img": {
              filter: "brightness(0.8)",
              transition: "0.3s ease-in-out all",
            },
          }}
          cursor={"pointer"}
        >
          <Image
            src={order?.referenceImage}
            h="100%"
            onDragStart={(e) => e.preventDefault()}
            userSelect="none"
            w="100%"
            objectFit="cover"
          />
        </Box>
        <HStack spacing={2} h="20%" overflowX="auto" pl={1.5}>
          {order?.tags?.map((tag) => (
            <Box key={tag.id}>
              <Tag
                key={tag.id}
                size="md"
                borderRadius="full"
                variant="solid"
                bg={tag.color}
                color={getAppropiateTextColor(tag.color)}
              >
                {tag.name}
              </Tag>
            </Box>
          ))}
        </HStack>
      </Box>
    </Card>
  </Skeleton>
);

export default OrderCard;

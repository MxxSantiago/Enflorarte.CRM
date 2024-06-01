import {
  Tag,
  Card,
  HStack,
  Box,
  Image,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { getAppropiateTextColor } from "../../../../core/helpers/adjustColor.helper.ts";
import UpdateOrder from "./UpdateOrder.tsx";

const OrderCard = ({
  order,
  index,
  colorMode,
  isLoading,
  arrangementData,
  deliveryTypeData,
  responsibleData,
  branchData,
  refetch,
  refetchTags,
  communicationTypeData,
  tagData,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
          onClick={onOpen}
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
      {!isLoading && (
        <UpdateOrder
          order={order}
          isOpen={isOpen}
          onClose={onClose}
          arrangementData={arrangementData}
          responsibleData={responsibleData}
          communicationTypeData={communicationTypeData}
          branchData={branchData}
          deliveryTypeData={deliveryTypeData}
          tagData={tagData}
          refetch={refetch}
          refetchTags={refetchTags}
        />
      )}
    </>
  );
};

export default OrderCard;

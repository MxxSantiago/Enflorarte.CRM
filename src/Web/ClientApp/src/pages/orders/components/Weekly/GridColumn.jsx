import OrderCard from "./OrderCard";
import {
  Box,
  GridItem,
  Text,
  Tag,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateOrder from "./CreateOrder.tsx";
import UpdateOrder from "./UpdateOrder.tsx";
import { useGetQuery } from "../../../../core/hooks/useApiClientHooks.tsx";

const GridColumn = ({
  dateLabel,
  date,
  refetch,
  orders,
  colorMode,
  isLoading,
  arrangementData,
  responsibleData,
  communicationTypeData,
  branchData,
  deliveryTypeData,
  tagData,
}) => {
  const backColor = colorMode === "dark" ? "gray.700" : "gray.100";
  const borderColor = colorMode === "dark" ? "gray.600" : "gray.200";
  const { refetch: refetchTags } = useGetQuery("tag");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  return (
    <>
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
            {dateLabel}
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
          <IconButton
            isDisabled={isLoading}
            marginLeft="auto"
            icon={<AddIcon />}
            onClick={onOpen}
          />
        </Box>
        <Box padding={5} paddingTop={0}>
          {(isLoading
            ? Array.from({ length: 5 }, (_, i) => ({
                id: i,
              }))
            : orders
          ).map((order) => (
            <OrderCard
              isLoading={isLoading}
              onOpenUpdate={onOpenUpdate}
              key={order.id}
              order={order}
              colorMode={colorMode}
              isOpen={isOpenUpdate}
              onClose={onCloseUpdate}
              arrangementData={arrangementData}
              responsibleData={responsibleData}
              communicationTypeData={communicationTypeData}
              branchData={branchData}
              deliveryTypeData={deliveryTypeData}
              tagData={tagData}
              refetch={refetch}
              refetchTags={refetchTags}
            />
          ))}
        </Box>
      </GridItem>
      {isLoading ? null : (
        <CreateOrder
          isOpen={isOpen}
          date={date}
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

export default GridColumn;

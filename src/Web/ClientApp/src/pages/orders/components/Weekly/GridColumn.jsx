import OrderCard from "./OrderCard";
import { Box, GridItem, Text, Tag, IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateOrder from "./CreateOrder";
import UpdateOrder from "./UpdateOrder";
import {useGetQuery} from "../../../../core/hooks/useApiClientHooks";

const GridColumn = ({ date, orders, isDragging, colorMode }) => {
    const backColor = colorMode === "dark" ? "gray.700" : "gray.100";
    const borderColor = colorMode === "dark" ? "gray.600" : "gray.200";
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()

    const {
        data: orderData,
        isLoading: isOrderLoading,
        refetch,
    } = useGetQuery("order");

    const { data: arrangementData, isArrangementLoading } =
        useGetQuery("arrangement");
    const { data: responsibleData, responsibleLoading } =
        useGetQuery("responsible");
    const { data: communicationTypeData, communicationTypeLoading } =
        useGetQuery("communicationType");
    const { data: brancData, branchLoading } =
        useGetQuery("branch");
    const { data: deliveryTypeData, deliveryTypeDataLoading } =
        useGetQuery("deliveryType");

    const isLoading =
        isOrderLoading ||
        isArrangementLoading ||
        responsibleLoading ||
        communicationTypeLoading ||
        branchLoading ||
        deliveryTypeDataLoading;

  
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
          <IconButton marginLeft="auto" icon={<AddIcon />} onClick={onOpen}/>
        </Box>
  
        <Box padding={5} paddingTop={0}>
          {orders.map((order, id) => (
            <OrderCard
              key={id}
              order={order}
              colorMode={colorMode}
              onOpenUpdate={onOpenUpdate}
            />
          ))}
        </Box>
      </GridItem>
          <CreateOrder
              isOpen={isOpen}
              onClose={onClose}
              arrangementData={arrangementData}
              responsibleData={responsibleData}
              communicationTypeData={communicationTypeData}
              branchData={brancData}
              deliveryTypeData={deliveryTypeData}
              refetch={refetch}
          />
          <UpdateOrder isOpen={isOpenUpdate} onClose={onCloseUpdate}/>
      </>
    );
  };

  export default GridColumn;
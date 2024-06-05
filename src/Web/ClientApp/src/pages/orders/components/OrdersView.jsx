import { useGetQuery } from "../../../core/hooks/useApiClientHooks";
import OrdersViewHeader from "./OrdersViewHeader";
import OrdersViewBody from "./OrderViewBody";
import { useColorMode } from "@chakra-ui/react";

const OrdersView = ({ mode = "week" }) => {
  const { colorMode } = useColorMode();
  const {
    data: tagData,
    isLoading: tagLoading,
    refetch: refetchTags,
  } = useGetQuery("tag");

  const _paddingX = {
    base: "1rem",
    sm: "2rem",
    md: "3rem",
  };

  return (
    <>
      <OrdersViewHeader
        colorMode={colorMode}
        mode={mode}
        _paddingX={_paddingX}
        refetchTags={refetchTags}
      />
      <OrdersViewBody
        tagData={tagData}
        tagLoading={tagLoading}
        colorMode={colorMode}
        mode={mode}
        _paddingX={_paddingX}
      />
    </>
  );
};

export default OrdersView;

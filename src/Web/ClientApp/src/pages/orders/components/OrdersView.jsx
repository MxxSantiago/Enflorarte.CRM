import OrdersViewHeader from "./OrdersViewHeader";
import OrdersViewBody from "./OrderViewBody";
import { Box, useColorMode } from "@chakra-ui/react";

const OrdersView = ({ mode = "week" }) => {
  const { colorMode } = useColorMode();

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
      />
      <OrdersViewBody colorMode={colorMode} mode={mode} _paddingX={_paddingX} />
    </>
  );
};

export default OrdersView;

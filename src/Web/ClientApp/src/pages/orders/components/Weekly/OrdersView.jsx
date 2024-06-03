import OrdersViewHeader from "./OrdersViewHeader";
import OrdersViewBody from "./OrderViewBody";
import { useColorMode, Box } from "@chakra-ui/react";

const OrdersView = ({ mode = "week" }) => {
    const { colorMode } = useColorMode();
  
    return (
      <Box display="flex" flexDirection="column" height="100%" width="100%">
        <OrdersViewHeader colorMode={colorMode} mode={mode} />
        <OrdersViewBody colorMode={colorMode} mode={mode} />
      </Box>
    );
  };

  export default OrdersView;
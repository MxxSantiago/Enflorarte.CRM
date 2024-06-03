import Layout from "../../components/layout";
import OrdersRoutes from "./OrdersRoutes";

export const OrdersLayout = () => {
  return <Layout routes={OrdersRoutes} showSidebar={false} />;
};

export default OrdersLayout;
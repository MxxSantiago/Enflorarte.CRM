import Layout from "../../components/layout";
import ordersRoutes from "./ordersRoutes";

export const OrdersLayout = () => {
  return <Layout routes={ordersRoutes} showSidebar={false} />;
};

export default OrdersLayout;

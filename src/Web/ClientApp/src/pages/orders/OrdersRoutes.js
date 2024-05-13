import OrdersView from "./components/Weekly/OrdersView";
import { Navigate } from "react-router-dom";

const ordersRoutes = [
  { path: "/", element: <Navigate to="week" />, ignore: true },
  {
    path: "/week",
    element: <OrdersView mode="week" />,
  },
  /**{
    path: "/month",
    element: <OrdersView mode="month" />,
  },**/
];

export default ordersRoutes;
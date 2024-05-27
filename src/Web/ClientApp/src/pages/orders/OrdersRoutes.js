import OrdersView from "./components/Weekly/OrdersView";
import { Navigate } from "react-router-dom";

const ordersRoutes = [
  { path: "/", element: <Navigate to="semana" />, ignore: true },
  {
    path: "semana",
    element: <OrdersView mode="week" />,
  },
  {
    path: "mes",
    element: <OrdersView mode="month" />,
  },
];

export default ordersRoutes;
import AdministrationLayout from "./pages/administration/AdministrationLayout";
import ArrangementsLayout from "./pages/arrangements/ArrangementsLayout";
import OrdersLayout from "./pages/orders/OrdersLayout";

const mainRoutes = [
  {
    name: "Pedidos",
    path: "/orders/*",
    element: <OrdersLayout />,
  },
  {
    name: "Arreglos",
    path: "/arreglo/*",
    element: <ArrangementsLayout />,
  },
  {
    name: "Administracion",
    path: "/administration/*",
    element: <AdministrationLayout />,
  },
];

export default mainRoutes;

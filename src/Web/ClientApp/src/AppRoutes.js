import AdministrationLayout from "./pages/administration/AdministrationLayout.jsx";
import ArrangementsLayout from "./pages/arrangements/ArrangementsLayout.jsx";
import OrdersLayout from "./pages/orders/OrdersLayout.jsx";
import { Roles } from "./core/constants.ts";

const mainRoutes = [
  {
    name: "Pedidos",
    path: "/ordenes/*",
    element: <OrdersLayout />,
  },
  {
    name: "Arreglos",
    path: "/arreglos/*",
    element: <ArrangementsLayout />,
  },
  {
    name: "Administración",
    path: "/administracion/*",
    element: <AdministrationLayout />,
    roles: [Roles.Administrator],
  },
];

export default mainRoutes;

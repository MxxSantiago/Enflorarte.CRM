import AdministrationLayout from "./pages/administration/AdministrationLayout.jsx";
import ArrangementsLayout from "./pages/arrangements/ArrangementsLayout.jsx";
import OrdersLayout from "./pages/orders/OrdersLayout.jsx";
import { Roles } from "./core/constants.ts";
import UsersLayout from "./pages/users/UsersLayout";

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
  {
    name: "Usuarios",
    path: "/usuarios/",
    element: <UsersLayout />,
    roles: [Roles.Administrator],
  }
];

export default mainRoutes;

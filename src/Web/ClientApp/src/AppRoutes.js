import AdministrationLayout from "./pages/administration/AdministrationLayout";
import ArrangementsLayout from "./pages/administration/arrangements/ArrangementsLayout";

const mainRoutes = [
  {
    name: "Pedidos",
    path: "/orders/*",
    element: <AdministrationLayout />,
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

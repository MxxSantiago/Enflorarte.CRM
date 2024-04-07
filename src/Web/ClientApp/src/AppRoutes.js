import AdministrationLayout from "./pages/administration/AdministrationLayout";

const mainRoutes = [
  {
    name: "Pedidos",
    path: "/orders/*",
    element: <AdministrationLayout />,
  },
  {
    name: "Arreglos",
    path: "/arrangements/*",
    element: <AdministrationLayout />,
  },
  {
    name: "Administracion",
    path: "/administration/*",
    element: <AdministrationLayout />,
  },
];

export default mainRoutes;

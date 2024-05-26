import ArrangementsView from "./components/ArrangementsView";
import { GiFlowerPot } from "react-icons/gi";
import { Navigate } from "react-router-dom";

const arrangementsRoutes = [
  { path: "/", element: <Navigate to="catalogo" />, ignore: true },
  {
    name: "Arreglos",
    path: "catalogo",
    element: <ArrangementsView />,
    icon: <GiFlowerPot />,
  },
];

export default arrangementsRoutes;

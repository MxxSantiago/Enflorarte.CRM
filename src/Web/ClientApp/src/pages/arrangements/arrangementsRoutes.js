import ArrangementsView from "./components/ArrangementsView";
import { GiFlowerPot } from "react-icons/gi";
import { Navigate } from "react-router-dom";

const arrangementsRoutes = [
  { path: "/", element: <Navigate to="catalog" />, ignore: true },
  {
    name: "Arreglos",
    path: "/catalog",
    element: <ArrangementsView />,
    icon: <GiFlowerPot />,
  },
];

export default arrangementsRoutes;

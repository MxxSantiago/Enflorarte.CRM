import ArrangementsView from "./components/ArrangementsView";
import { GiFlowerPot } from "react-icons/gi";

const arrangementsRoutes = [
  {
    name: "Arreglos",
    path: "*",
    element: <ArrangementsView />,
    icon: <GiFlowerPot />,
  },
];

export default arrangementsRoutes;

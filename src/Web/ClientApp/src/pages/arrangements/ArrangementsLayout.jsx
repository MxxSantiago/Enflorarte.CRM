import Layout from "../../components/layout";
import arrangementsRoutes from "./arrangementsRoutes";

export const ArrangementsLayout = () => {
  return <Layout routes={arrangementsRoutes} showSidebar={false} />;
};

export default ArrangementsLayout;

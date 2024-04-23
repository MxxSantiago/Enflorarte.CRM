import Layout from "../../../components/layout/Layout";
import arrangementsRoutes from "./ArrangementsRoutes";

export const ArrangementsLayout = () => {
  return <Layout routes={arrangementsRoutes} showSidebar={false} />;
};

export default ArrangementsLayout;

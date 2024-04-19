import Layout from "../../components/layout";
import administrationRoutes from "./AministrationRoutes";

export const AdministrationLayout = () => {
  return <Layout routes={administrationRoutes} showSidebar={true} />;
};

export default AdministrationLayout;

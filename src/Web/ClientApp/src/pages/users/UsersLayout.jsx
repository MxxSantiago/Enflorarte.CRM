import Layout from "../../components/layout";
import UsersRoutes from "./UsersRoutes";

export const UsersLayout = () => {
    return <Layout routes={UsersRoutes} showSidebar={false} />;
};

export default UsersLayout;

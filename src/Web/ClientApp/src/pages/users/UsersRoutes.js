import { GiMale } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import UsersView from "./components/UsersView";

const usersRoutes = [
  // { path: "/", element: <Navigate to="/" />, ignore: true },
  {
    name: "Usuarios",
    path: "/",
    element: <UsersView />,
    icon: < GiMale />,
  },
];

export default usersRoutes;
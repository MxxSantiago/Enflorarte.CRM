import { Navigate } from "react-router-dom";
import { UserSessionContext } from "../../core/auth/UserSessionContext.jsx";
import { useContext } from "react";

const ProtectedRoute = (roles, element) => {
  const { userHasRole } = useContext(UserSessionContext);
  return userHasRole(roles) ? element : <Navigate to="/ordenes/semana" />;
};

export default ProtectedRoute;

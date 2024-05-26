import { Navigate } from "react-router-dom";
import { userHasRole } from "../../core/helpers/session.ts";

const ProtectedRoute = (roles, element) => {
  return userHasRole(roles) ? element : <Navigate to="/ordenes/semana" />;
};

export default ProtectedRoute;

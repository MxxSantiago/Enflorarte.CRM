import { Navigate } from "react-router-dom";
import { UserSessionContext } from "../../core/auth/UserSessionContext.jsx";
import { useContext } from "react";

/**
 * A component that renders the specified element if the user has the required roles,
 * otherwise it redirects to the specified route.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.roles - The roles required for the user to access the element.
 * @param {ReactElement} props.element - The element to render if the user has the required roles.
 * @returns {ReactElement} - The rendered element or a redirect to the specified route.
 */
const ProtectedRoute = ({ roles, element }) => {
  const { userHasRole } = useContext(UserSessionContext);
  return userHasRole(roles) ? element : <Navigate to="/ordenes/semana" />;
};

export default ProtectedRoute;

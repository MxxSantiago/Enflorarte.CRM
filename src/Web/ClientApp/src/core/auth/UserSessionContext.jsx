import { createContext, useState, useEffect } from "react";
import { apiClient } from "../helpers/web-api-client.helper.ts";
import { sessionStorageKey } from "../constants.ts";

export const UserSessionContext = createContext();

/**
 * Provides the session context for the user.
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The session provider component.
 */
export const SessionProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    /**
     * Fetches the user session from the API and updates the session state.
     * @async
     * @function fetchSession
     */
    const fetchSession = async () => {
      const user = await apiClient.getCurrentUser();
      localStorage.setItem(sessionStorageKey, JSON.stringify(user));
      setSession(user);
    };

    fetchSession()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  /**
   * Retrieves the roles of the current user.
   * @function getUserRoles
   * @returns {string[]} The roles of the current user.
   */
  const getUserRoles = () => {
    return session ? session.roles : [];
  };

  /**
   * Checks if the current user has any of the specified roles.
   * @function userHasRole
   * @param {string[]} roles - The roles to check.
   * @returns {boolean} True if the user has any of the specified roles, false otherwise.
   */
  const userHasRole = (roles) => {
    if (roles == null) return true;
    const userRoles = getUserRoles();
    if (!userRoles) return false;
    return roles?.some((role) => userRoles.includes(role));
  };

  return (
    <UserSessionContext.Provider
      value={{
        session,
        loading,
        userHasRole,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

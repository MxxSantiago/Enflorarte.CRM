import { createContext, useState, useEffect } from "react";
import { apiClient } from "../helpers/web-api-client.helper.ts";
import { sessionStorageKey } from "../constants.ts";

export const UserSessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const user = await apiClient.getCurrentUser();
      localStorage.setItem(sessionStorageKey, JSON.stringify(user));
      setSession(user);
    };

    fetchSession()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const getUserRoles = () => {
    return session ? session.roles : [];
  };

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

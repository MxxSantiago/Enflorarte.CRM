import { Roles } from "../constants";

export const getUserRoles = () => {
  const user = JSON.parse(localStorage.getItem("session") || "{}");
  return user ? (user.roles as Roles[]) : [];
};

export const userHasRole = (roles: Roles[]) => {
  if (roles == null) return true;
  const userRoles = getUserRoles();
  if (!userRoles) return false;
  return roles?.some((role) => userRoles.includes(role));
};

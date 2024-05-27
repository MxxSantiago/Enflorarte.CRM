// View dimensions
const sidebarDesktopWidth = "180px";
const sidebarMobileWidth = "60px";

const headerDesktopHeight = "80px";
const headerMobileHeight = "50px";

// Color schemes
const primaryColorScheme = "gray";

const modifierColorScheme = "green";
const createColorScheme = "blue";
const deleteColorScheme = "red";

const saveColorScheme = "green";

// Spinner configuration
const spinnerConfiguration = {
  thickness: "4px",
  speed: "0.65s",
  emptyColor: "gray.200",
  color: "blue.500",
  size: "xl",
};

// Texts
const saveChangesText = "Guardar";
const deleteText = "Eliminar";
const cancelChangesText = "Cancelar";

// Storage keys
const sessionStorageKey = "session";

enum Roles {
  Administrator = "Administrator",
  Operator = "Operator",
}

export {
  sidebarDesktopWidth,
  sidebarMobileWidth,
  headerDesktopHeight,
  headerMobileHeight,
  primaryColorScheme,
  modifierColorScheme,
  createColorScheme,
  deleteColorScheme,
  saveColorScheme,
  spinnerConfiguration,
  saveChangesText,
  deleteText,
  cancelChangesText,
  sessionStorageKey,
  Roles,
};

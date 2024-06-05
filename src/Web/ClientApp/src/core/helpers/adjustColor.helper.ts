/**
 * Calculates the appropriate text color based on the given background color.
 * @param color - The background color in hexadecimal format (e.g., "#000000").
 * @returns The appropriate text color ("white" or "black").
 */
export const getAppropiateTextColor = (color: string = "#000000") => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? "white" : "black";
};

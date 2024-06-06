/**
 * Converts a date to a local ISO string representation.
 * @param {Date} date - The date to convert.
 * @returns {string} The local ISO string representation of the date.
 */
export function toLocalISOString(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().slice(0, 19);
}

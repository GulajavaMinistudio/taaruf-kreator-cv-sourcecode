/**
 * Date Utilities for ISO 8601 Format
 * Sesuai dengan REQ-DAT-003: Dates MUST be stored in ISO 8601 format
 */

/**
 * Get current date/time as ISO 8601 string
 * @returns {string} ISO 8601 formatted date string (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @example
 * getISODateString() // "2025-12-07T14:30:00.000Z"
 */
export function getISODateString() {
  return new Date().toISOString();
}

/**
 * Get current date in YYYY-MM-DD format (for date input fields)
 * @returns {string} Date in YYYY-MM-DD format
 * @example
 * getISODateOnly() // "2025-12-07"
 */
export function getISODateOnly() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format ISO date string for display in Indonesian format (date only)
 * Single Responsibility: Date formatting without time
 * @param {string} isoDateString - ISO 8601 date string
 * @returns {string|null} Formatted date string (e.g., "07 Des 2025") or null if invalid
 * @example
 * formatDate("2025-12-07T14:30:00.000Z") // "07 Des 2025"
 */
export function formatDate(isoDateString) {
  if (!isoDateString) return null;

  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    return null;
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Format ISO date string for display in Indonesian format (date and time)
 * Single Responsibility: Date and time formatting
 * @param {string} isoDateString - ISO 8601 date string
 * @returns {string|null} Formatted date-time string (e.g., "07 Des 2025, 14:30") or null if invalid
 * @example
 * formatDateTime("2025-12-07T14:30:00.000Z") // "07 Des 2025, 14:30"
 */
export function formatDateTime(isoDateString) {
  if (!isoDateString) return null;

  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    return null;
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

/**
 * Format ISO date string for display in Indonesian format
 * @deprecated Use formatDate() or formatDateTime() instead to follow Single Responsibility Principle
 * @param {string} isoDateString - ISO 8601 date string
 * @param {boolean} includeTime - Whether to include time in output
 * @returns {string|null} Formatted date string or null if invalid
 * @example
 * formatDateDisplay("2025-12-07T14:30:00.000Z") // "07 Des 2025"
 * formatDateDisplay("2025-12-07T14:30:00.000Z", true) // "07 Des 2025, 14:30"
 */
export function formatDateDisplay(isoDateString, includeTime = false) {
  return includeTime
    ? formatDateTime(isoDateString)
    : formatDate(isoDateString);
}

/**
 * Calculate age from birth date (YYYY-MM-DD)
 * @param {string} birthDate - Birth date in YYYY-MM-DD format
 * @returns {number|null} Age in years or null if invalid
 * @example
 * calculateAge("1995-08-17") // 30 (as of 2025)
 * calculateAge(null) // null
 * calculateAge("invalid") // null
 */
export function calculateAge(birthDate) {
  if (!birthDate) return null;

  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return null;

  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Validate if a string is a valid ISO 8601 date
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid ISO 8601 date
 * @example
 * isValidISODate("2025-12-07") // true
 * isValidISODate("2025-12-07T14:30:00.000Z") // true
 * isValidISODate("invalid") // false
 */
export function isValidISODate(dateString) {
  if (!dateString || typeof dateString !== "string") return false;

  const date = new Date(dateString);
  return (
    !isNaN(date.getTime()) &&
    date.toISOString().substring(0, 10) === dateString.substring(0, 10)
  );
}

/**
 * Convert date input value (YYYY-MM-DD) to ISO string for storage
 * @param {string} dateInputValue - Date from HTML date input
 * @returns {string} ISO 8601 date string
 * @example
 * dateInputToISO("2025-12-07") // "2025-12-07"
 */
export function dateInputToISO(dateInputValue) {
  if (!dateInputValue) return "";
  return dateInputValue; // Already in YYYY-MM-DD format
}

/**
 * Convert ISO date string to date input value (YYYY-MM-DD)
 * @param {string} isoDateString - ISO 8601 date string
 * @returns {string|null} Date in YYYY-MM-DD format for input field or null if invalid
 * @example
 * isoToDateInput("2025-12-07T14:30:00.000Z") // "2025-12-07"
 * isoToDateInput(null) // null
 * isoToDateInput("invalid") // null
 */
export function isoToDateInput(isoDateString) {
  if (!isoDateString) return null;

  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

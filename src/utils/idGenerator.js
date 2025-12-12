/**
 * ID Generator Utilities
 * Generate unique IDs for Draft and History objects
 */

// Constants for ID generation
const RANDOM_STRING_BASE = 36;
const RANDOM_STRING_START_INDEX = 2;
const RANDOM_STRING_END_INDEX = 6;
const RANDOM_STRING_LENGTH =
  RANDOM_STRING_END_INDEX - RANDOM_STRING_START_INDEX; // 4 characters

/**
 * Generate UUID v4 (RFC 4122 compliant)
 * @returns {string} UUID v4 string
 * @example
 * generateUUID() // "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateUUID() {
  // Check if crypto.randomUUID is available (modern browsers)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Secure fallback using crypto.getRandomValues for older browsers
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Set version (4) and variant (10) bits per RFC 4122
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10

    // Convert to hex string with proper UUID format
    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
      12,
      16
    )}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // Last resort fallback (should never happen in modern environments)
  throw new Error("Crypto API not available. Cannot generate secure UUID.");
}

/**
 * Generate timestamp-based ID with prefix
 * Format: {prefix}_{timestamp}_{random}
 * @param {string} prefix - Prefix for the ID (e.g., "draft", "cv")
 * @returns {string} Timestamp-based ID
 * @example
 * generateTimestampId("draft") // "draft_1733580000000_a3f9"
 */
export function generateTimestampId(prefix = "id") {
  const timestamp = Date.now();
  const random = Math.random()
    .toString(RANDOM_STRING_BASE)
    .substring(RANDOM_STRING_START_INDEX, RANDOM_STRING_END_INDEX);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Generate Draft ID
 * Uses timestamp-based ID for better readability
 * @returns {string} Draft ID
 * @example
 * generateDraftId() // "draft_1733580000000_a3f9"
 */
export function generateDraftId() {
  return generateTimestampId("draft");
}

/**
 * Generate History/CV ID
 * Uses UUID v4 for maximum uniqueness
 * @returns {string} CV ID with "cv_" prefix
 * @example
 * generateHistoryId() // "cv_550e8400-e29b-41d4-a716-446655440000"
 */
export function generateHistoryId() {
  return `cv_${generateUUID()}`;
}

/**
 * Validate if a string is a valid UUID v4
 * @param {string} uuid - UUID string to validate
 * @returns {boolean} True if valid UUID v4
 * @example
 * isValidUUID("550e8400-e29b-41d4-a716-446655440000") // true
 * isValidUUID("invalid") // false
 */
export function isValidUUID(uuid) {
  if (!uuid || typeof uuid !== "string") return false;

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
}

/**
 * Validate if a string is a valid timestamp ID
 * @param {string} id - ID string to validate
 * @param {string} expectedPrefix - Expected prefix (optional)
 * @returns {boolean} True if valid timestamp ID
 * @example
 * isValidTimestampId("draft_1733580000000_a3f9", "draft") // true
 * isValidTimestampId("invalid") // false
 */
export function isValidTimestampId(id, expectedPrefix = null) {
  if (!id || typeof id !== "string") return false;

  const parts = id.split("_");
  if (parts.length !== 3) return false;

  const [prefix, timestamp, random] = parts;

  // Check prefix if specified
  if (expectedPrefix && prefix !== expectedPrefix) return false;

  // Check timestamp is a valid number
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || ts <= 0) return false;

  // Check random part exists and has expected length
  if (!random || random.length !== RANDOM_STRING_LENGTH) return false;

  return true;
}

/**
 * Extract timestamp from timestamp-based ID
 * @param {string} id - Timestamp-based ID
 * @returns {number|null} Timestamp in milliseconds or null if invalid
 * @example
 * extractTimestamp("draft_1733580000000_a3f9") // 1733580000000
 */
export function extractTimestamp(id) {
  if (!isValidTimestampId(id)) return null;

  const parts = id.split("_");
  return parseInt(parts[1], 10);
}

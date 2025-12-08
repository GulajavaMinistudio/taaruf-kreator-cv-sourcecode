/**
 * LocalStorage Service
 * Handles all localStorage operations with error handling
 * Sesuai dengan spec-data-localstorage-schema.md
 */

import { generateDraftId, generateHistoryId } from "../utils/idGenerator.js";
import { getISODateString, formatDateDisplay } from "../utils/dateUtils.js";

// Storage Keys (REQ-DAT-002: Must use prefix "taaruf_cv_")
const STORAGE_KEYS = {
  DRAFTS: "taaruf_cv_drafts",
  HISTORY: "taaruf_cv_history",
  SETTINGS: "taaruf_cv_settings",
};

// Default Settings
const DEFAULT_SETTINGS = {
  theme: "light",
  version: "1.5",
  lastAccessed: getISODateString(),
};

/**
 * Check if localStorage is available and accessible
 * @returns {boolean} True if localStorage is available
 */
export function isStorageAvailable() {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.error("localStorage is not available:", error);
    return false;
  }
}

/**
 * Private helper: Save data to localStorage with error handling
 * @private
 * @param {string} key - Storage key
 * @param {*} data - Data to save
 * @returns {Object} Result object {success, message, error}
 */
function _save(key, data) {
  try {
    if (!isStorageAvailable()) {
      return {
        success: false,
        message:
          "localStorage tidak tersedia. Pastikan browser Anda tidak dalam mode privat.",
        error: new Error("Storage not available"),
      };
    }

    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);

    return {
      success: true,
      message: "Data berhasil disimpan",
    };
  } catch (error) {
    // Handle QuotaExceededError (CON-DAT-001)
    if (error.name === "QuotaExceededError") {
      return {
        success: false,
        message:
          "Penyimpanan penuh. Hapus draft/history lama untuk melanjutkan.",
        error,
      };
    }

    return {
      success: false,
      message: `Gagal menyimpan data: ${error.message}`,
      error,
    };
  }
}

/**
 * Private helper: Load data from localStorage with error handling
 * @private
 * @param {string} key - Storage key
 * @returns {Object} Result object {success, data, message, error}
 */
function _load(key) {
  try {
    if (!isStorageAvailable()) {
      return {
        success: false,
        data: null,
        message: "localStorage tidak tersedia",
        error: new Error("Storage not available"),
      };
    }

    const jsonString = localStorage.getItem(key);

    if (jsonString === null) {
      return {
        success: true,
        data: null,
        message: "Data tidak ditemukan",
      };
    }

    const data = JSON.parse(jsonString);

    return {
      success: true,
      data,
      message: "Data berhasil dimuat",
    };
  } catch (error) {
    console.error(`Error loading data from ${key}:`, error);

    return {
      success: false,
      data: null,
      message:
        "Data corrupt atau format tidak valid. Pertimbangkan untuk reset data.",
      error,
    };
  }
}

// ============================================================================
// DRAFT OPERATIONS
// ============================================================================

/**
 * Save a new draft or update existing draft
 * @param {Partial<FormData>} formData - Form data (can be incomplete)
 * @param {string} [draftName] - Custom draft name (optional)
 * @param {string} [existingId] - Existing draft ID for update (optional)
 * @returns {Object} Result object with draft ID
 */
export function saveDraft(formData, draftName = null, existingId = null) {
  try {
    const draftsResult = _load(STORAGE_KEYS.DRAFTS);
    const drafts = draftsResult.data || [];

    const now = getISODateString();

    if (existingId) {
      // Update existing draft
      const index = drafts.findIndex((d) => d.id === existingId);

      if (index === -1) {
        return {
          success: false,
          message: "Draft tidak ditemukan",
        };
      }

      drafts[index] = {
        ...drafts[index],
        lastUpdated: now,
        data: formData,
      };

      if (draftName) {
        drafts[index].name = draftName;
      }
    } else {
      // Create new draft
      const id = generateDraftId();
      const name =
        draftName ||
        `Draft - ${formData.namaLengkap || "Tanpa Nama"} - ${formatDateDisplay(
          now
        )}`;

      const newDraft = {
        id,
        name,
        createdAt: now,
        lastUpdated: now,
        data: formData,
      };

      drafts.push(newDraft);
    }

    const saveResult = _save(STORAGE_KEYS.DRAFTS, drafts);

    if (saveResult.success) {
      return {
        ...saveResult,
        data: { id: existingId || drafts[drafts.length - 1].id },
      };
    }

    return saveResult;
  } catch (error) {
    return {
      success: false,
      message: `Error saving draft: ${error.message}`,
      error,
    };
  }
}

/**
 * Get all drafts
 * @returns {Array<DraftObject>} Array of draft objects
 */
export function getDrafts() {
  const result = _load(STORAGE_KEYS.DRAFTS);

  if (result.success) {
    return result.data || [];
  }

  console.error("Error loading drafts:", result.message);
  return [];
}

/**
 * Get a specific draft by ID
 * @param {string} id - Draft ID
 * @returns {DraftObject|null} Draft object or null if not found
 */
export function getDraftById(id) {
  const drafts = getDrafts();
  return drafts.find((draft) => draft.id === id) || null;
}

/**
 * Update an existing draft
 * @param {string} id - Draft ID
 * @param {Partial<FormData>} formData - Updated form data
 * @param {string} [draftName] - Updated draft name (optional)
 * @returns {Object} Result object
 */
export function updateDraft(id, formData, draftName = null) {
  return saveDraft(formData, draftName, id);
}

/**
 * Delete a draft by ID
 * @param {string} id - Draft ID to delete
 * @returns {Object} Result object
 */
export function deleteDraft(id) {
  try {
    const drafts = getDrafts();
    const filteredDrafts = drafts.filter((draft) => draft.id !== id);

    if (drafts.length === filteredDrafts.length) {
      return {
        success: false,
        message: "Draft tidak ditemukan",
      };
    }

    return _save(STORAGE_KEYS.DRAFTS, filteredDrafts);
  } catch (error) {
    return {
      success: false,
      message: `Error deleting draft: ${error.message}`,
      error,
    };
  }
}

// ============================================================================
// HISTORY OPERATIONS
// ============================================================================

/**
 * Save a generated CV to history
 * @param {FormData} formData - Complete validated form data
 * @param {string} cvTextContent - Generated CV text
 * @param {string} [customName] - Custom CV name (optional)
 * @returns {Object} Result object with history ID
 */
export function saveHistory(formData, cvTextContent, customName = null) {
  try {
    const historyResult = _load(STORAGE_KEYS.HISTORY);
    const history = historyResult.data || [];

    const id = generateHistoryId();
    const now = getISODateString();
    const name =
      customName || `${formData.namaLengkap} - ${formatDateDisplay(now)}`;

    const historyItem = {
      id,
      name,
      generatedAt: now,
      cvTextContent,
      sourceData: formData,
    };

    history.push(historyItem);

    const saveResult = _save(STORAGE_KEYS.HISTORY, history);

    if (saveResult.success) {
      return {
        ...saveResult,
        data: { id },
      };
    }

    return saveResult;
  } catch (error) {
    return {
      success: false,
      message: `Error saving history: ${error.message}`,
      error,
    };
  }
}

/**
 * Get all history items
 * @returns {Array<HistoryObject>} Array of history objects
 */
export function getHistory() {
  const result = _load(STORAGE_KEYS.HISTORY);

  if (result.success) {
    return result.data || [];
  }

  console.error("Error loading history:", result.message);
  return [];
}

/**
 * Get a specific history item by ID
 * @param {string} id - History ID
 * @returns {HistoryObject|null} History object or null if not found
 */
export function getHistoryById(id) {
  const history = getHistory();
  return history.find((item) => item.id === id) || null;
}

/**
 * Delete a history item by ID
 * @param {string} id - History ID to delete
 * @returns {Object} Result object
 */
export function deleteHistory(id) {
  try {
    const history = getHistory();
    const filteredHistory = history.filter((item) => item.id !== id);

    if (history.length === filteredHistory.length) {
      return {
        success: false,
        message: "History tidak ditemukan",
      };
    }

    return _save(STORAGE_KEYS.HISTORY, filteredHistory);
  } catch (error) {
    return {
      success: false,
      message: `Error deleting history: ${error.message}`,
      error,
    };
  }
}

// ============================================================================
// SETTINGS OPERATIONS
// ============================================================================

/**
 * Get application settings
 * @returns {SettingsObject} Settings object
 */
export function getSettings() {
  const result = _load(STORAGE_KEYS.SETTINGS);

  if (result.success && result.data) {
    // Update lastAccessed
    const settings = {
      ...DEFAULT_SETTINGS,
      ...result.data,
      lastAccessed: getISODateString(),
    };

    // Save updated lastAccessed (fire and forget)
    _save(STORAGE_KEYS.SETTINGS, settings);

    return settings;
  }

  // Initialize with default settings
  _save(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS };
}

/**
 * Save application settings
 * @param {SettingsObject} settings - Settings to save
 * @returns {Object} Result object
 */
export function saveSettings(settings) {
  try {
    const updatedSettings = {
      ...DEFAULT_SETTINGS,
      ...settings,
      lastAccessed: getISODateString(),
    };

    return _save(STORAGE_KEYS.SETTINGS, updatedSettings);
  } catch (error) {
    return {
      success: false,
      message: `Error saving settings: ${error.message}`,
      error,
    };
  }
}

// ============================================================================
// UTILITY OPERATIONS
// ============================================================================

/**
 * Clear all application data (drafts, history, settings)
 * Used for "Reset Data" feature
 * @returns {Object} Result object
 */
export function clearAllData() {
  try {
    if (!isStorageAvailable()) {
      return {
        success: false,
        message: "localStorage tidak tersedia",
      };
    }

    // Remove all taaruf_cv_* keys
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    return {
      success: true,
      message: "Semua data berhasil dihapus",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error clearing data: ${error.message}`,
      error,
    };
  }
}

/**
 * Get storage usage statistics
 * @returns {Object} Storage stats
 */
export function getStorageStats() {
  try {
    const drafts = getDrafts();
    const history = getHistory();
    const settings = getSettings();

    return {
      draftsCount: drafts.length,
      historyCount: history.length,
      hasSettings: !!settings,
      storageAvailable: isStorageAvailable(),
    };
  } catch (error) {
    console.error("Error getting storage stats:", error);
    return {
      draftsCount: 0,
      historyCount: 0,
      hasSettings: false,
      storageAvailable: false,
    };
  }
}

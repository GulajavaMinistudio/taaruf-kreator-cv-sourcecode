/**
 * @file validationService.js
 * @description Form validation service with rules and error messages
 * @version 1.1
 * @date 2025-01-27
 * @changelog
 * - v1.1 (2025-01-27): Added real-time validation on blur (AC-VAL-001, AC-VAL-002)
 */

/**
 * Error message templates in Bahasa Indonesia
 */
export const ERROR_MESSAGES = {
  REQUIRED: "Kolom ini wajib diisi.",
  MIN_LENGTH: (n) => `Minimal ${n} karakter.`,
  MAX_LENGTH: (n) => `Maksimal ${n} karakter.`,
  EMAIL: "Format email tidak valid.",
  NUMBER: "Harus berupa angka.",
  MIN_VALUE: (n) => `Nilai minimal adalah ${n}.`,
  MAX_VALUE: (n) => `Nilai maksimal adalah ${n}.`,
  DATE_FUTURE: "Tanggal tidak boleh di masa depan.",
  PHONE: "Format nomor telepon tidak valid (10-15 digit).",
  CONDITIONAL: "Kolom ini wajib diisi berdasarkan pilihan sebelumnya.",
  PATTERN: "Format input tidak sesuai.",
};

/**
 * Validation rules for special fields
 */
export const VALIDATION_RULES = {
  namaLengkap: {
    required: true,
    minLength: 3,
  },
  tempatLahir: {
    required: true,
  },
  tanggalLahir: {
    required: true,
    maxDate: "today",
  },
  jenisKelamin: {
    required: true,
  },
  tinggiBadan: {
    required: true,
    min: 100,
    max: 250,
  },
  beratBadan: {
    required: true,
    min: 30,
    max: 200,
  },
  pekerjaan: {
    required: true,
  },
  statusPernikahan: {
    required: true,
  },
  jumlahAnak: {
    conditional: true, // Required if statusPernikahan != 'Lajang'
    min: 0,
    max: 20,
  },
  domisili: {
    required: true,
  },
  statusIzin: {
    required: true,
  },
  pendidikanTerakhir: {
    required: true,
    minLength: 10,
  },
  infoAyah: {
    required: true,
    minLength: 10,
  },
  infoIbu: {
    required: true,
    minLength: 10,
  },
  urutanAnak: {
    required: true,
    pattern: /^\d+\s+dari\s+\d+$/,
  },
  shalatWajib: {
    required: true,
  },
  bacaanQuran: {
    required: true,
  },
  sifatPositif: {
    required: true,
  },
  sifatNegatif: {
    required: true,
  },
  merokok: {
    required: true,
  },
  statusHijab: {
    conditional: true, // Required if jenisKelamin == 'Perempuan'
  },
  statusJenggot: {
    conditional: true, // Required if jenisKelamin == 'Laki-laki'
  },
  visiPernikahan: {
    required: true,
    minLength: 20,
  },
  kriteriaPasangan: {
    required: true,
    minLength: 20,
  },
  kesediaanPoligami: {
    conditional: true, // Required if jenisKelamin == 'Laki-laki'
  },
  kesediaanDipoligami: {
    conditional: true, // Required if jenisKelamin == 'Perempuan'
  },
  noHP: {
    pattern: /^[0-9]{10,15}$/,
  },
  email: {
    type: "email",
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all visible form fields (not in hidden containers)
 * @private
 * @param {HTMLFormElement|HTMLElement} container - Form or container element
 * @returns {Array<HTMLElement>} Array of visible form fields
 */
const getVisibleFields = (container) => {
  const allFields = container.querySelectorAll("input, select, textarea");
  return Array.from(allFields).filter((field) => !field.closest(".d-none"));
};

/**
 * Get feedback element for field (error message container)
 * @private
 * @param {HTMLElement} field - Form field element
 * @returns {HTMLElement|null} Feedback element or null
 */
const getFeedbackElement = (field) => {
  return field.nextElementSibling?.classList.contains("invalid-feedback")
    ? field.nextElementSibling
    : null;
};

/**
 * Check if field is required and value is empty
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {string} value - Field value (trimmed)
 * @returns {boolean} True if validation fails
 */
const validateRequired = (field, value) => {
  if (field.hasAttribute("required") && !value) {
    showFieldError(field, ERROR_MESSAGES.REQUIRED);
    return false;
  }
  return true;
};

/**
 * Validate field length (min and max)
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {string} value - Field value (trimmed)
 * @param {Object} rules - Validation rules
 * @returns {boolean} True if validation passes
 */
const validateLength = (field, value, rules) => {
  if (rules?.minLength && value.length < rules.minLength) {
    showFieldError(field, ERROR_MESSAGES.MIN_LENGTH(rules.minLength));
    return false;
  }
  if (rules?.maxLength && value.length > rules.maxLength) {
    showFieldError(field, ERROR_MESSAGES.MAX_LENGTH(rules.maxLength));
    return false;
  }
  return true;
};

/**
 * Validate numeric range (min and max value)
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {string} value - Field value (trimmed)
 * @param {Object} rules - Validation rules
 * @returns {boolean} True if validation passes
 */
const validateNumericRange = (field, value, rules) => {
  if (field.type !== "number") return true;

  const numValue = parseFloat(value);
  if (rules?.min !== undefined && numValue < rules.min) {
    showFieldError(field, ERROR_MESSAGES.MIN_VALUE(rules.min));
    return false;
  }
  if (rules?.max !== undefined && numValue > rules.max) {
    showFieldError(field, ERROR_MESSAGES.MAX_VALUE(rules.max));
    return false;
  }
  return true;
};

/**
 * Validate date field (max date = today)
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {string} value - Field value (date string)
 * @param {Object} rules - Validation rules
 * @returns {boolean} True if validation passes
 */
const validateDate = (field, value, rules) => {
  if (field.type !== "date" || rules?.maxDate !== "today") return true;

  const inputDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    showFieldError(field, ERROR_MESSAGES.DATE_FUTURE);
    return false;
  }
  return true;
};

/**
 * Validate pattern (regex)
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {string} value - Field value (trimmed)
 * @param {Object} rules - Validation rules
 * @param {string} fieldName - Field name for special handling
 * @returns {boolean} True if validation passes
 */
const validatePattern = (field, value, rules, fieldName) => {
  if (!rules?.pattern || !value) return true;

  if (!rules.pattern.test(value)) {
    const message =
      fieldName === "noHP" ? ERROR_MESSAGES.PHONE : ERROR_MESSAGES.PATTERN;
    showFieldError(field, message);
    return false;
  }
  return true;
};

/**
 * Validate email format
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {string} value - Field value (trimmed)
 * @param {Object} rules - Validation rules
 * @returns {boolean} True if validation passes
 */
const validateEmail = (field, value, rules) => {
  if (rules?.type !== "email" || !value) return true;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    showFieldError(field, ERROR_MESSAGES.EMAIL);
    return false;
  }
  return true;
};

/**
 * Run validation on field event (blur or input)
 * Extracted to avoid code duplication
 * @private
 * @param {HTMLElement} field - Form field element
 * @param {boolean} checkOnlyIfHasState - If true, only validate if field already has validation state
 */
const validateFieldOnEvent = (field, checkOnlyIfHasState = false) => {
  try {
    const isRequired = field.hasAttribute("required");
    const hasValue = field.value.trim() !== "";

    // Skip validation if checking only if has state AND doesn't have state
    if (checkOnlyIfHasState) {
      const hasState =
        field.classList.contains("is-invalid") ||
        field.classList.contains("is-valid");
      if (!hasState) return;
    }

    // Clear validation first
    clearFieldError(field);

    // Only validate if required OR has value
    if (!isRequired && !hasValue) {
      clearFieldError(field);
      return;
    }

    // Use built-in checkValidity
    if (field.checkValidity()) {
      showFieldValid(field);
    } else {
      const feedbackDiv = getFeedbackElement(field);
      const errorMessage = feedbackDiv?.textContent || ERROR_MESSAGES.REQUIRED;
      showFieldError(field, errorMessage);
    }
  } catch (error) {
    console.error("[ValidationService] Error in validateFieldOnEvent:", error);
  }
};

// ============================================================================
// PUBLIC VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a single field
 * @param {HTMLElement} field - Form field element
 * @returns {boolean} - True if valid, false if invalid
 */
export function validateField(field) {
  try {
    if (!field) {
      console.error("[ValidationService] Field is null or undefined");
      return false;
    }

    const fieldName = field.name || field.id;
    const value = field.value.trim();
    const rules = VALIDATION_RULES[fieldName];

    // Clear previous errors
    clearFieldError(field);

    // Skip validation for hidden fields
    if (field.closest(".d-none")) {
      return true;
    }

    // Run validators in sequence - return false on first failure
    if (!validateRequired(field, value)) return false;

    // Skip further validation if value is empty and not required
    if (!value && !field.hasAttribute("required")) {
      return true;
    }

    if (!validateLength(field, value, rules)) return false;
    if (!validateNumericRange(field, value, rules)) return false;
    if (!validateDate(field, value, rules)) return false;
    if (!validatePattern(field, value, rules, fieldName)) return false;
    if (!validateEmail(field, value, rules)) return false;

    // Final check with browser's built-in validation
    if (!field.checkValidity()) {
      showFieldError(field, field.validationMessage || ERROR_MESSAGES.REQUIRED);
      return false;
    }

    // All checks passed
    showFieldValid(field);
    return true;
  } catch (error) {
    console.error("[ValidationService] Error in validateField:", error);
    return false;
  }
}

/**
 * Validate entire form
 * @param {HTMLFormElement} formElement - Form element
 * @returns {Object} - { isValid: boolean, firstInvalidField: HTMLElement|null }
 */
export function validateForm(formElement) {
  try {
    if (!formElement) {
      console.error("[ValidationService] Form element is null or undefined");
      return { isValid: false, firstInvalidField: null };
    }

    const fields = getVisibleFields(formElement);
    const invalidFields = fields.filter((field) => !validateField(field));

    return {
      isValid: invalidFields.length === 0,
      firstInvalidField: invalidFields[0] || null,
    };
  } catch (error) {
    console.error("[ValidationService] Error in validateForm:", error);
    return { isValid: false, firstInvalidField: null };
  }
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message
 */
export function showFieldError(field, message) {
  field.classList.remove("is-valid");
  field.classList.add("is-invalid");

  // Update invalid-feedback div with optional chaining
  const feedbackDiv = getFeedbackElement(field);
  if (feedbackDiv) {
    feedbackDiv.textContent = message;
  }
}

/**
 * Show valid state for a field
 * @param {HTMLElement} field - Form field element
 */
export function showFieldValid(field) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
}

/**
 * Clear validation state for a field
 * @param {HTMLElement} field - Form field element
 */
export function clearFieldError(field) {
  field.classList.remove("is-invalid", "is-valid");
}

/**
 * Clear all validation states in form
 * @param {HTMLFormElement} formElement - Form element
 */
export function clearAllValidation(formElement) {
  const fields = getVisibleFields(formElement);
  fields.forEach((field) => clearFieldError(field));
}

/**
 * Initialize real-time validation for form fields
 * Adds blur event listeners to validate fields on focus out
 * Implements AC-VAL-001 and AC-VAL-002 requirements
 * @param {HTMLFormElement} formElement - Form element
 */
export function initializeRealTimeValidation(formElement) {
  try {
    if (!formElement) {
      console.error("[ValidationService] Form element is null or undefined");
      return;
    }

    const fields = formElement.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      // Blur event: Validate on focus out
      field.addEventListener("blur", () => {
        validateFieldOnEvent(field, false); // Always validate on blur
      });

      // Input event: Validate only if field already has validation state (UX improvement)
      // This removes error as user types
      field.addEventListener("input", () => {
        validateFieldOnEvent(field, true); // Only validate if has state
      });
    });

    console.log(
      "[ValidationService] Real-time validation initialized for",
      fields.length,
      "fields"
    );
  } catch (error) {
    console.error(
      "[ValidationService] Error initializing real-time validation:",
      error
    );
  }
}

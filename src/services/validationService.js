/**
 * @file validationService.js
 * @description Form validation service with rules and error messages
 * @version 1.0
 * @date 2025-12-08
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

/**
 * Validate a single field
 * @param {HTMLElement} field - Form field element
 * @returns {boolean} - True if valid, false if invalid
 */
export function validateField(field) {
  const fieldName = field.name || field.id;
  const value = field.value.trim();
  const rules = VALIDATION_RULES[fieldName];

  // Clear previous errors first
  clearFieldError(field);

  // Check if field is visible (for conditional fields)
  if (field.closest(".d-none")) {
    return true; // Skip validation for hidden fields
  }

  // Check required
  if (field.hasAttribute("required")) {
    if (!value) {
      showFieldError(field, ERROR_MESSAGES.REQUIRED);
      return false;
    }
  }

  // If value is empty and field is not required, skip further validation
  if (!value && !field.hasAttribute("required")) {
    return true;
  }

  // Check min length
  if (rules?.minLength && value.length < rules.minLength) {
    showFieldError(field, ERROR_MESSAGES.MIN_LENGTH(rules.minLength));
    return false;
  }

  // Check max length
  if (rules?.maxLength && value.length > rules.maxLength) {
    showFieldError(field, ERROR_MESSAGES.MAX_LENGTH(rules.maxLength));
    return false;
  }

  // Check min value for number inputs
  if (field.type === "number" && rules?.min !== undefined) {
    const numValue = parseFloat(value);
    if (numValue < rules.min) {
      showFieldError(field, ERROR_MESSAGES.MIN_VALUE(rules.min));
      return false;
    }
  }

  // Check max value for number inputs
  if (field.type === "number" && rules?.max !== undefined) {
    const numValue = parseFloat(value);
    if (numValue > rules.max) {
      showFieldError(field, ERROR_MESSAGES.MAX_VALUE(rules.max));
      return false;
    }
  }

  // Check date validation (max = today)
  if (field.type === "date" && rules?.maxDate === "today") {
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputDate > today) {
      showFieldError(field, ERROR_MESSAGES.DATE_FUTURE);
      return false;
    }
  }

  // Check pattern
  if (rules?.pattern && !rules.pattern.test(value)) {
    if (fieldName === "noHP") {
      showFieldError(field, ERROR_MESSAGES.PHONE);
    } else {
      showFieldError(field, ERROR_MESSAGES.PATTERN);
    }
    return false;
  }

  // Check email format
  if (rules?.type === "email" && value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showFieldError(field, ERROR_MESSAGES.EMAIL);
      return false;
    }
  }

  // Use browser's built-in validation
  if (!field.checkValidity()) {
    showFieldError(field, field.validationMessage || ERROR_MESSAGES.REQUIRED);
    return false;
  }

  // If all checks pass, show valid state
  showFieldValid(field);
  return true;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} formElement - Form element
 * @returns {Object} - { isValid: boolean, firstInvalidField: HTMLElement|null }
 */
export function validateForm(formElement) {
  let isValid = true;
  let firstInvalidField = null;

  // Get all visible form fields
  const fields = formElement.querySelectorAll(
    "input:not(.d-none input), select:not(.d-none select), textarea:not(.d-none textarea)"
  );

  fields.forEach((field) => {
    // Skip hidden conditional fields
    if (field.closest(".d-none")) {
      return;
    }

    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    }
  });

  return { isValid, firstInvalidField };
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message
 */
export function showFieldError(field, message) {
  field.classList.remove("is-valid");
  field.classList.add("is-invalid");

  // Update invalid-feedback div
  const feedbackDiv = field.nextElementSibling;
  if (feedbackDiv && feedbackDiv.classList.contains("invalid-feedback")) {
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
  const fields = formElement.querySelectorAll("input, select, textarea");
  fields.forEach((field) => clearFieldError(field));
}

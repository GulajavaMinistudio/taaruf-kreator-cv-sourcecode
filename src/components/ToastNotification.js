/**
 * @file ToastNotification.js
 * @description Reusable Bootstrap Toast for non-blocking notifications
 * @version 1.2
 * @date 2025-12-12
 * @changelog
 * - v1.2: Extracted magic numbers/strings to constants (Clean Code compliance)
 * - v1.1: Added backward compatibility for string parameter (message, type)
 * - v1.0: Initial release with object parameter
 */

// ===== CONSTANTS =====
const TOAST_CONTAINER_ID = "toast-container";
const TOAST_ID_PREFIX = "toast";
const TOAST_CLASS = "toast";
const TOAST_HEADER_CLASS = "toast-header";
const TOAST_BODY_CLASS = "toast-body";
const RANDOM_ID_START = 2;
const RANDOM_ID_LENGTH = 9;
const DEFAULT_TITLE = "Notifikasi";
const DEFAULT_TYPE = "info";
const DEFAULT_DURATION = 5000;
const ERROR_DURATION = 7000;
const WARNING_DURATION = 6000;

// Toast type configurations
const TOAST_CONFIGS = {
  success: {
    icon: "bi bi-check-circle-fill text-success",
    headerClass: "bg-success bg-opacity-10",
  },
  error: {
    icon: "bi bi-exclamation-circle-fill text-danger",
    headerClass: "bg-danger bg-opacity-10",
  },
  warning: {
    icon: "bi bi-exclamation-triangle-fill text-warning",
    headerClass: "bg-warning bg-opacity-10",
  },
  info: {
    icon: "bi bi-info-circle-fill text-primary",
    headerClass: "bg-primary bg-opacity-10",
  },
  loading: {
    icon: "spinner-border spinner-border-sm text-white",
    headerClass: "bg-danger text-white",
  },
};

/**
 * Show toast notification
 * @param {Object|string} options - Toast configuration object OR message string (for backward compatibility)
 * @param {string} options.title - Toast title
 * @param {string} options.message - Toast message
 * @param {string} [options.type='info'] - Toast type: 'success', 'error', 'warning', 'info'
 * @param {number} [options.duration=5000] - Auto-hide duration in milliseconds (0 = no auto-hide)
 * @param {Function} [options.onClose] - Callback when toast is closed
 * @param {string} [typeParam] - Type parameter (for backward compatibility when first param is string)
 * @returns {void}
 */
const showToast = (options, typeParam) => {
  // Backward compatibility: if first parameter is string, convert to object format
  let config;

  if (typeof options === "string") {
    // Old style: showToast(message, type)
    config = {
      title: DEFAULT_TITLE,
      message: options,
      type: typeParam || DEFAULT_TYPE,
      duration: DEFAULT_DURATION,
    };
  } else if (typeof options === "object" && options !== null) {
    // New style: showToast({ title, message, type, ... })
    config = {
      title: options.title || DEFAULT_TITLE,
      message: options.message || "",
      type: options.type || DEFAULT_TYPE,
      duration:
        options.duration !== undefined ? options.duration : DEFAULT_DURATION,
      onClose: options.onClose,
    };
  } else {
    console.error("[ToastNotification] Invalid options parameter");
    return;
  }

  const { title, message, type, duration, onClose } = config;

  // Generate unique ID for this toast
  const toastId = `${TOAST_ID_PREFIX}-${Date.now()}-${Math.random()
    .toString(36)
    .substr(RANDOM_ID_START, RANDOM_ID_LENGTH)}`;

  // Get toast container
  const container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) {
    console.error("[ToastNotification] Toast container not found");
    return;
  }

  // Determine icon and color based on type
  const toastConfig = getToastConfig(type);

  // Create toast HTML
  const toastHTML = `
    <div id="${toastId}" class="${TOAST_CLASS}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="${TOAST_HEADER_CLASS} ${toastConfig.headerClass}">
        <i class="${toastConfig.icon} me-2"></i>
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      ${message ? `<div class="${TOAST_BODY_CLASS}">${message}</div>` : ""}
    </div>
  `;

  // Insert toast into container
  container.insertAdjacentHTML("beforeend", toastHTML);

  // Get toast element
  const toastElement = document.getElementById(toastId);
  if (!toastElement) {
    console.error("[ToastNotification] Failed to create toast element");
    return;
  }

  // Initialize Bootstrap toast
  const toastInstance = new bootstrap.Toast(toastElement, {
    autohide: duration > 0,
    delay: duration,
  });

  // Add event listener for when toast is hidden
  toastElement.addEventListener("hidden.bs.toast", () => {
    // Remove toast element from DOM
    toastElement.remove();

    // Call onClose callback if provided
    if (typeof onClose === "function") {
      onClose();
    }
  });

  // Show toast
  toastInstance.show();
};

/**
 * Get toast configuration based on type
 * @param {string} type - Toast type
 * @returns {Object} Toast configuration
 */
const getToastConfig = (type) => {
  return TOAST_CONFIGS[type] || TOAST_CONFIGS.info;
};

/**
 * Show success toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=5000] - Auto-hide duration
 */
const showSuccessToast = (title, message, duration = DEFAULT_DURATION) => {
  showToast({ title, message, type: "success", duration });
};

/**
 * Show error toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=7000] - Auto-hide duration
 */
const showErrorToast = (title, message, duration = ERROR_DURATION) => {
  showToast({ title, message, type: "error", duration });
};

/**
 * Show warning toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=6000] - Auto-hide duration
 */
const showWarningToast = (title, message, duration = WARNING_DURATION) => {
  showToast({ title, message, type: "warning", duration });
};

/**
 * Show info toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=5000] - Auto-hide duration
 */
const showInfoToast = (title, message, duration = DEFAULT_DURATION) => {
  showToast({ title, message, type: "info", duration });
};

export {
  showToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
};

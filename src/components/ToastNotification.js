/**
 * @file ToastNotification.js
 * @description Reusable Bootstrap Toast for non-blocking notifications
 * @version 1.0
 * @date 2025-12-08
 */

/**
 * Show toast notification
 * @param {Object} options - Toast configuration
 * @param {string} options.title - Toast title
 * @param {string} options.message - Toast message
 * @param {string} [options.type='info'] - Toast type: 'success', 'error', 'warning', 'info'
 * @param {number} [options.duration=5000] - Auto-hide duration in milliseconds (0 = no auto-hide)
 * @param {Function} [options.onClose] - Callback when toast is closed
 * @returns {void}
 */
function showToast(options) {
  const {
    title = "Notifikasi",
    message = "",
    type = "info",
    duration = 5000,
    onClose,
  } = options;

  // Generate unique ID for this toast
  const toastId = `toast-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Get toast container
  const container = document.getElementById("toast-container");
  if (!container) {
    console.error("[ToastNotification] Toast container not found");
    return;
  }

  // Determine icon and color based on type
  const toastConfig = getToastConfig(type);

  // Create toast HTML
  const toastHTML = `
    <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header ${toastConfig.headerClass}">
        <i class="${toastConfig.icon} me-2"></i>
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      ${message ? `<div class="toast-body">${message}</div>` : ""}
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

  console.log(`[ToastNotification] Showed ${type} toast: ${title}`);
}

/**
 * Get toast configuration based on type
 * @param {string} type - Toast type
 * @returns {Object} Toast configuration
 */
function getToastConfig(type) {
  const configs = {
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
  };

  return configs[type] || configs.info;
}

/**
 * Show success toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=5000] - Auto-hide duration
 */
function showSuccessToast(title, message, duration = 5000) {
  showToast({ title, message, type: "success", duration });
}

/**
 * Show error toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=7000] - Auto-hide duration
 */
function showErrorToast(title, message, duration = 7000) {
  showToast({ title, message, type: "error", duration });
}

/**
 * Show warning toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=6000] - Auto-hide duration
 */
function showWarningToast(title, message, duration = 6000) {
  showToast({ title, message, type: "warning", duration });
}

/**
 * Show info toast (shorthand)
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} [duration=5000] - Auto-hide duration
 */
function showInfoToast(title, message, duration = 5000) {
  showToast({ title, message, type: "info", duration });
}

export {
  showToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
};

/**
 * @file LoadingSpinner.js
 * @description Loading Spinner Component for async operations
 * @version 1.1
 * @date 2025-12-12
 * @changelog
 * - v1.1: Extracted magic strings to constants (Clean Code compliance)
 * - v1.0: Initial release
 */

// ===== CONSTANTS =====
const SPINNER_OVERLAY_ID = "loading-spinner-overlay";
const SPINNER_SIZE_SM = "spinner-border-sm";
const INLINE_SPINNER_CLASS = "inline-spinner";
const DATA_ATTR_ORIGINAL_CONTENT = "originalContent";
const DATA_ATTR_ORIGINAL_DISABLED = "originalDisabled";

/**
 * Show loading spinner overlay
 * @param {string} message - Optional loading message
 */
export function showLoadingSpinner(message = "Memproses...") {
  // Remove existing spinner if any
  hideLoadingSpinner();

  const spinnerHTML = `
    <div id="${SPINNER_OVERLAY_ID}" class="loading-spinner-overlay">
      <div class="loading-spinner-content">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 mb-0 fw-medium">${message}</p>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", spinnerHTML);
}

/**
 * Hide loading spinner overlay
 */
export function hideLoadingSpinner() {
  const spinner = document.getElementById(SPINNER_OVERLAY_ID);
  if (spinner) {
    spinner.remove();
  }
}

/**
 * Show inline loading spinner in a specific element
 * @param {HTMLElement} element - Target element
 * @param {string} size - Size: 'sm', 'md', 'lg' (default: 'md')
 */
export function showInlineSpinner(element, size = "md") {
  if (!element) return;

  const sizeClass = size === "sm" ? SPINNER_SIZE_SM : "";
  const spinnerHTML = `
    <div class="${INLINE_SPINNER_CLASS} text-center py-3">
      <div class="spinner-border text-primary ${sizeClass}" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  element.innerHTML = spinnerHTML;
}

/**
 * Show button loading state
 * @param {HTMLButtonElement} button - Button element
 * @param {string} loadingText - Loading text (default: "Memproses...")
 */
export function setButtonLoading(button, loadingText = "Memproses...") {
  if (!button) return;

  // Store original content
  button.dataset[DATA_ATTR_ORIGINAL_CONTENT] = button.innerHTML;
  button.dataset[DATA_ATTR_ORIGINAL_DISABLED] = button.disabled;

  // Set loading state
  button.disabled = true;
  button.innerHTML = `
    <span class="spinner-border ${SPINNER_SIZE_SM} me-2" role="status" aria-hidden="true"></span>
    ${loadingText}
  `;
}

/**
 * Reset button to normal state
 * @param {HTMLButtonElement} button - Button element
 */
export function resetButtonLoading(button) {
  if (!button) return;

  // Restore original content
  if (button.dataset[DATA_ATTR_ORIGINAL_CONTENT]) {
    button.innerHTML = button.dataset[DATA_ATTR_ORIGINAL_CONTENT];
    delete button.dataset[DATA_ATTR_ORIGINAL_CONTENT];
  }

  // Restore disabled state
  if (button.dataset[DATA_ATTR_ORIGINAL_DISABLED] !== undefined) {
    button.disabled = button.dataset[DATA_ATTR_ORIGINAL_DISABLED] === "true";
    delete button.dataset[DATA_ATTR_ORIGINAL_DISABLED];
  } else {
    button.disabled = false;
  }
}

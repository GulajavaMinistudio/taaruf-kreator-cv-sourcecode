/**
 * @file LoadingSpinner.js
 * @description Loading Spinner Component for async operations
 * @version 1.0
 * @date 2025-01-27
 */

/**
 * Show loading spinner overlay
 * @param {string} message - Optional loading message
 */
export function showLoadingSpinner(message = "Memproses...") {
  // Remove existing spinner if any
  hideLoadingSpinner();

  const spinnerHTML = `
    <div id="loading-spinner-overlay" class="loading-spinner-overlay">
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
  const spinner = document.getElementById("loading-spinner-overlay");
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

  const sizeClass = size === "sm" ? "spinner-border-sm" : "";
  const spinnerHTML = `
    <div class="inline-spinner text-center py-3">
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
  button.dataset.originalContent = button.innerHTML;
  button.dataset.originalDisabled = button.disabled;

  // Set loading state
  button.disabled = true;
  button.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
  if (button.dataset.originalContent) {
    button.innerHTML = button.dataset.originalContent;
    delete button.dataset.originalContent;
  }

  // Restore disabled state
  if (button.dataset.originalDisabled !== undefined) {
    button.disabled = button.dataset.originalDisabled === "true";
    delete button.dataset.originalDisabled;
  } else {
    button.disabled = false;
  }
}

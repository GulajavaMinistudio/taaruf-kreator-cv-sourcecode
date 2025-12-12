/**
 * @file ModalConfirm.js
 * @description Reusable Bootstrap Modal for confirmations
 * @version 1.1
 * @date 2025-12-12
 * @changelog
 * - v1.1: Refactored to use const arrow functions and extracted constants (Clean Code compliance)
 * - v1.0: Initial release
 */

// ===== CONSTANTS =====
const MODAL_ID = "modalConfirm";
const MODAL_CONTAINER_ID = "modal-container";
const CONFIRM_BUTTON_ID = "confirmAction";
const MODAL_TITLE_CLASS = ".modal-title";
const MODAL_BODY_CLASS = ".modal-body";
const MODAL_DISMISS_SELECTOR = '[data-bs-dismiss="modal"]';
const DEFAULT_TITLE = "Konfirmasi";
const DEFAULT_MESSAGE = "Apakah Anda yakin?";
const DEFAULT_CONFIRM_TEXT = "Konfirmasi";
const DEFAULT_CANCEL_TEXT = "Batal";
const DEFAULT_CONFIRM_CLASS = "btn-danger";

/**
 * Show confirmation modal
 * @param {Object} options - Modal configuration
 * @param {string} options.title - Modal title
 * @param {string} options.message - Modal message/body content
 * @param {string} [options.confirmText='Konfirmasi'] - Confirm button text
 * @param {string} [options.cancelText='Batal'] - Cancel button text
 * @param {string} [options.confirmClass='btn-danger'] - Confirm button class
 * @param {Function} options.onConfirm - Callback when confirmed
 * @param {Function} [options.onCancel] - Callback when cancelled
 * @returns {void}
 */
const showModalConfirm = (options) => {
  const {
    title = DEFAULT_TITLE,
    message = DEFAULT_MESSAGE,
    confirmText = DEFAULT_CONFIRM_TEXT,
    cancelText = DEFAULT_CANCEL_TEXT,
    confirmClass = DEFAULT_CONFIRM_CLASS,
    onConfirm,
    onCancel,
  } = options;

  // Check if modal already exists, if not create it
  let modalElement = document.getElementById(MODAL_ID);
  let modalInstance;

  if (!modalElement) {
    createModalElement();
    modalElement = document.getElementById(MODAL_ID);
  }

  // Update modal content
  const modalTitle = modalElement.querySelector(MODAL_TITLE_CLASS);
  const modalBody = modalElement.querySelector(MODAL_BODY_CLASS);
  const confirmButton = modalElement.querySelector(`#${CONFIRM_BUTTON_ID}`);
  const cancelButton = modalElement.querySelector(MODAL_DISMISS_SELECTOR);

  if (modalTitle) modalTitle.textContent = title;
  if (modalBody) modalBody.innerHTML = message;
  if (confirmButton) {
    confirmButton.textContent = confirmText;
    confirmButton.className = `btn ${confirmClass}`;
  }
  if (cancelButton) cancelButton.textContent = cancelText;

  // Remove old event listeners by cloning
  const newConfirmButton = confirmButton.cloneNode(true);
  confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);

  // Add new event listener for confirm
  newConfirmButton.addEventListener("click", () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    // Close modal after action
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Add event listener for cancel
  modalElement.addEventListener(
    "hidden.bs.modal",
    () => {
      if (typeof onCancel === "function") {
        onCancel();
      }
    },
    { once: true }
  );

  // Show modal using Bootstrap 5 API
  modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
};

/**
 * Create modal element and append to modal container
 */
const createModalElement = () => {
  const container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) {
    console.error("[ModalConfirm] Modal container not found");
    return;
  }

  const modalHTML = `
    <div class="modal fade" id="${MODAL_ID}" tabindex="-1" aria-labelledby="${MODAL_ID}Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${MODAL_ID}Label">${DEFAULT_TITLE}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${DEFAULT_MESSAGE}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${DEFAULT_CANCEL_TEXT}</button>
            <button type="button" class="btn ${DEFAULT_CONFIRM_CLASS}" id="${CONFIRM_BUTTON_ID}">${DEFAULT_CONFIRM_TEXT}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", modalHTML);
};

/**
 * Hide modal if visible
 */
const hideModalConfirm = () => {
  const modalElement = document.getElementById(MODAL_ID);
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
};

export { showModalConfirm, hideModalConfirm };

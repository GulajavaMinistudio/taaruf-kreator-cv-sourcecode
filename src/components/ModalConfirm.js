/**
 * @file ModalConfirm.js
 * @description Reusable Bootstrap Modal for confirmations
 * @version 1.0
 * @date 2025-12-08
 */

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
function showModalConfirm(options) {
  const {
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin?',
    confirmText = 'Konfirmasi',
    cancelText = 'Batal',
    confirmClass = 'btn-danger',
    onConfirm,
    onCancel
  } = options;
  
  // Check if modal already exists, if not create it
  let modalElement = document.getElementById('modalConfirm');
  let modalInstance;
  
  if (!modalElement) {
    createModalElement();
    modalElement = document.getElementById('modalConfirm');
  }
  
  // Update modal content
  const modalTitle = modalElement.querySelector('.modal-title');
  const modalBody = modalElement.querySelector('.modal-body');
  const confirmButton = modalElement.querySelector('#confirmAction');
  const cancelButton = modalElement.querySelector('[data-bs-dismiss="modal"]');
  
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
  newConfirmButton.addEventListener('click', () => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
    // Close modal after action
    if (modalInstance) {
      modalInstance.hide();
    }
  });
  
  // Add event listener for cancel
  modalElement.addEventListener('hidden.bs.modal', () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }, { once: true });
  
  // Show modal using Bootstrap 5 API
  modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
}

/**
 * Create modal element and append to modal container
 */
function createModalElement() {
  const container = document.getElementById('modal-container');
  if (!container) {
    console.error('[ModalConfirm] Modal container not found');
    return;
  }
  
  const modalHTML = `
    <div class="modal fade" id="modalConfirm" tabindex="-1" aria-labelledby="modalConfirmLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalConfirmLabel">Konfirmasi</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Apakah Anda yakin?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-danger" id="confirmAction">Konfirmasi</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Hide modal if visible
 */
function hideModalConfirm() {
  const modalElement = document.getElementById('modalConfirm');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}

export { showModalConfirm, hideModalConfirm };

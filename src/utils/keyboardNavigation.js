/**
 * @file keyboardNavigation.js
 * @description Keyboard Navigation and Focus Management
 * @version 1.0
 * @date 2025-01-27
 */

/**
 * Initialize keyboard navigation for the application
 */
export function initKeyboardNavigation() {
  // ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  });

  // Trap focus inside modals
  document.addEventListener("show.bs.modal", (e) => {
    trapFocusInModal(e.target);
  });

  // Restore focus when modal closes
  document.addEventListener("hide.bs.modal", (e) => {
    restoreFocus();
  });

  console.log("[KeyboardNavigation] Initialized");
}

/**
 * Close active Bootstrap modal
 */
function closeActiveModal() {
  const activeModal = document.querySelector(".modal.show");
  if (activeModal) {
    const bsModal = bootstrap.Modal.getInstance(activeModal);
    if (bsModal) {
      bsModal.hide();
    }
  }
}

/**
 * Trap focus inside modal for accessibility
 * @param {HTMLElement} modal - Modal element
 */
function trapFocusInModal(modal) {
  if (!modal) return;

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Store currently focused element
  modal.dataset.previousFocus = document.activeElement?.id || "";

  // Focus first element
  setTimeout(() => {
    if (firstFocusable) firstFocusable.focus();
  }, 100);

  // Handle Tab key
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

/**
 * Restore focus to previously focused element
 */
function restoreFocus() {
  const modal = document.querySelector(".modal");
  if (modal && modal.dataset.previousFocus) {
    const previousElement = document.getElementById(
      modal.dataset.previousFocus
    );
    if (previousElement) {
      previousElement.focus();
    }
  }
}

/**
 * Enable keyboard shortcuts for common actions
 */
export function enableKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + S to save draft (prevent browser save dialog)
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      const saveDraftBtn = document.getElementById("btn-save-draft");
      if (saveDraftBtn && !saveDraftBtn.disabled) {
        saveDraftBtn.click();
      }
    }

    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn && !submitBtn.disabled) {
        submitBtn.click();
      }
    }
  });

  console.log("[KeyboardShortcuts] Enabled");
}

/**
 * @file keyboardNavigation.js
 * @description Keyboard Navigation and Focus Management
 * @version 1.1
 * @date 2025-12-12
 */

import { Modal } from "bootstrap";

// Store event handlers for cleanup
let keydownHandler = null;
let showModalHandler = null;
let hideModalHandler = null;

/**
 * Initialize keyboard navigation for the application
 * @returns {Function} Cleanup function to remove event listeners
 */
export function initKeyboardNavigation() {
  // Clean up existing listeners if any
  cleanupKeyboardNavigation();

  // ESC key closes modals
  keydownHandler = (e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  };

  // Trap focus inside modals
  showModalHandler = (e) => {
    trapFocusInModal(e.target);
  };

  // Restore focus when modal closes
  hideModalHandler = () => {
    restoreFocus();
  };

  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("show.bs.modal", showModalHandler);
  document.addEventListener("hide.bs.modal", hideModalHandler);

  return cleanupKeyboardNavigation;
}

/**
 * Cleanup keyboard navigation event listeners
 */
export function cleanupKeyboardNavigation() {
  if (keydownHandler) {
    document.removeEventListener("keydown", keydownHandler);
    keydownHandler = null;
  }
  if (showModalHandler) {
    document.removeEventListener("show.bs.modal", showModalHandler);
    showModalHandler = null;
  }
  if (hideModalHandler) {
    document.removeEventListener("hide.bs.modal", hideModalHandler);
    hideModalHandler = null;
  }
}

/**
 * Close active Bootstrap modal
 */
function closeActiveModal() {
  const activeModal = document.querySelector(".modal.show");
  if (activeModal) {
    const bsModal = Modal.getInstance(activeModal);
    if (bsModal) {
      bsModal.hide();
    }
  }
}

// Store modal focus trap handlers to prevent duplicates
const modalFocusHandlers = new WeakMap();

/**
 * Trap focus inside modal for accessibility
 * @param {HTMLElement} modal - Modal element
 */
function trapFocusInModal(modal) {
  if (!modal) return;

  // Remove existing handler if any
  if (modalFocusHandlers.has(modal)) {
    const oldHandler = modalFocusHandlers.get(modal);
    modal.removeEventListener("keydown", oldHandler);
  }

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Store currently focused element
  modal.dataset.previousFocus = document.activeElement?.id || "";

  // Focus first element with error handling
  setTimeout(() => {
    if (firstFocusable) {
      try {
        firstFocusable.focus();
      } catch (error) {
        // Silently fail if element cannot be focused
      }
    }
  }, 100);

  // Create and store handler
  const tabHandler = (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          try {
            lastFocusable.focus();
          } catch (error) {
            // Element might not be focusable
          }
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          try {
            firstFocusable.focus();
          } catch (error) {
            // Element might not be focusable
          }
        }
      }
    }
  };

  modalFocusHandlers.set(modal, tabHandler);
  modal.addEventListener("keydown", tabHandler);
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
      // Check if element is focusable before attempting to focus
      const isDisabled = previousElement.hasAttribute("disabled");
      const isHidden = previousElement.offsetParent === null;

      if (!isDisabled && !isHidden) {
        try {
          previousElement.focus();
        } catch (error) {
          // Silently fail if focus fails (element might have been removed)
        }
      }
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
}

/**
 * Taaruf CV Kreator - Main Entry Point
 * Phase 2: UI Skeleton & Routing Implementation
 */

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

// Import custom styles
import "./style.css";

// Import Router
import { initRouter } from "./router/router.js";

// Import Keyboard Navigation
import {
  initKeyboardNavigation,
  enableKeyboardShortcuts,
} from "./utils/keyboardNavigation.js";

// Import All Views (they self-register for viewChanged events)
import "./views/landingView.js";
import "./views/formView.js";
import "./views/previewView.js";
import "./views/resultView.js";
import "./views/draftView.js";
import "./views/historyView.js";
import "./views/doaView.js";
import "./views/settingsView.js";

// Make Bootstrap available globally
window.bootstrap = bootstrap;

/**
 * Application Initialization
 */
function initApp() {
  // Initialize Router (handles view switching and navigation)
  initRouter();

  // Initialize Keyboard Navigation & Accessibility
  initKeyboardNavigation();
  enableKeyboardShortcuts();

  // Set current year in footer
  const yearElement = document.getElementById("year-footer");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Enable Bootstrap Tooltips globally
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  // DOM is already ready
  initApp();
}

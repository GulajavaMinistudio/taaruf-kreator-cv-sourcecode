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
  console.log("[App] Initializing Taaruf CV Kreator...");

  // Initialize Router (handles view switching and navigation)
  initRouter();

  console.log("[App] Router initialized successfully");
  console.log("[App] Phase 2: UI Skeleton & Routing - ACTIVE");
}

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  // DOM is already ready
  initApp();
}

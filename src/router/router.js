/**
 * @file router.js
 * @description Hash-based SPA router for Taaruf CV Kreator
 * @version 1.0
 * @date 2025-12-08
 */

/**
 * Route configuration mapping hash paths to view IDs
 * @type {Object<string, string>}
 */
const routes = {
  "/": "view-landing",
  "/home": "view-landing",
  "/form": "view-form",
  "/preview": "view-preview",
  "/result": "view-result",
  "/draft": "view-draft",
  "/history": "view-history",
  "/doa": "view-doa",
  "/settings": "view-settings",
};

/**
 * Get current hash path from URL
 * @returns {string} Current hash path (e.g., '/form')
 */
function getCurrentPath() {
  const hash = window.location.hash.slice(1); // Remove '#' prefix
  return hash || "/";
}

/**
 * Show specified view and hide all others
 * @param {string} viewId - The DOM ID of the view to show
 */
function showView(viewId) {
  // Get all view sections
  const views = document.querySelectorAll(".view-section");

  // Hide all views
  views.forEach((view) => {
    view.classList.add("d-none");
  });

  // Show target view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.remove("d-none");

    // Scroll to top when view changes
    window.scrollTo(0, 0);

    // Trigger custom event for view lifecycle hooks
    const event = new CustomEvent("viewChanged", {
      detail: { viewId, path: getCurrentPath() },
    });
    window.dispatchEvent(event);
  } else {
    console.error(`View with ID "${viewId}" not found`);
  }
}

/**
 * Update navbar active state based on current route
 * @param {string} path - Current route path
 */
function updateNavbarActiveState(path) {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Remove active class from all links
    link.classList.remove("active");

    // Add active class to matching link
    if (href === `#${path}` || (path === "/" && href === "#/")) {
      link.classList.add("active");
    }
  });
}

/**
 * Handle route change and render appropriate view
 */
function handleRoute() {
  const path = getCurrentPath();
  const viewId = routes[path];

  if (viewId) {
    showView(viewId);
    updateNavbarActiveState(path);
  } else {
    // 404 - Redirect to home
    console.warn(`Route "${path}" not found, redirecting to home`);
    navigateTo("/");
  }
}

/**
 * Programmatically navigate to a specific route
 * @param {string} path - Target path (e.g., '/form', '/doa')
 */
function navigateTo(path) {
  window.location.hash = `#${path}`;
}

/**
 * Initialize router and set up event listeners
 */
function initRouter() {
  // Handle initial page load
  handleRoute();

  // Listen for hash changes
  window.addEventListener("hashchange", handleRoute);

  // Prevent default anchor behavior for hash links
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (link) {
      e.preventDefault();
      const path = link.getAttribute("href").slice(1);
      navigateTo(path);
    }
  });
}

/**
 * Get current active view ID
 * @returns {string|null} Current view ID or null if none active
 */
function getCurrentView() {
  const path = getCurrentPath();
  return routes[path] || null;
}

// Export router functions
export {
  initRouter,
  navigateTo,
  showView,
  getCurrentPath,
  getCurrentView,
  handleRoute,
};

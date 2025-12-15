/**
 * @file doaView.js
 * @description Doa & Hadits Page View - Display Islamic prayers and hadiths
 * @version 1.0
 * @date 2025-12-08
 */

import { doaHaditsData, getByCategory } from "../data/doaHaditsData.js";
import { renderDoaHaditsCards } from "../components/DoaHaditsCard.js";

/**
 * Render Doa & Hadits Page content
 */
function renderDoaView() {
  const container = document.getElementById("view-doa");

  container.innerHTML = `
    <!-- Hero Card with Background Image -->
    <div class="card mb-4 overflow-hidden border-0 shadow">
      <div class="position-relative" style="height: 250px; background: linear-gradient(rgba(161, 29, 51, 0.5), rgba(100, 18, 32, 0.65)), url('./home_page_doa_cover.jpg') center/cover; background-size: cover; background-position: center;">
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-3">
          <h1 class="display-5 fw-bold mb-3">
            <i class="bi bi-book"></i> Doa & Hadits Pernikahan
          </h1>
          <p class="lead mb-0">
            Kumpulan doa dan hadits tentang pernikahan dalam Islam yang dapat 
            menjadi panduan spiritual Anda.
          </p>
        </div>
      </div>
    </div>

    <!-- Category Tabs -->
    <ul class="nav nav-pills mb-4" id="doa-category-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link active" 
          id="tab-doa-jodoh" 
          data-bs-toggle="pill" 
          data-bs-target="#content-doa-jodoh" 
          type="button" 
          role="tab"
        >
          Doa Mencari Jodoh
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="tab-doa-khitbah" 
          data-bs-toggle="pill" 
          data-bs-target="#content-doa-khitbah" 
          type="button" 
          role="tab"
        >
          Doa Saat Khitbah
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="tab-doa-walimah" 
          data-bs-toggle="pill" 
          data-bs-target="#content-doa-walimah" 
          type="button" 
          role="tab"
        >
          Doa Walimah
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="tab-hadits-menikah" 
          data-bs-toggle="pill" 
          data-bs-target="#content-hadits-menikah" 
          type="button" 
          role="tab"
        >
          Hadits Menikah
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="tab-hadits-pasangan" 
          data-bs-toggle="pill" 
          data-bs-target="#content-hadits-pasangan" 
          type="button" 
          role="tab"
        >
          Hadits Kriteria Pasangan
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content" id="doa-tab-content">
      <!-- Doa Mencari Jodoh -->
      <div class="tab-pane fade show active" id="content-doa-jodoh" role="tabpanel">
        <div id="cards-doa-jodoh"></div>
      </div>

      <!-- Doa Saat Khitbah -->
      <div class="tab-pane fade" id="content-doa-khitbah" role="tabpanel">
        <div id="cards-doa-khitbah"></div>
      </div>

      <!-- Doa Walimah -->
      <div class="tab-pane fade" id="content-doa-walimah" role="tabpanel">
        <div id="cards-doa-walimah"></div>
      </div>

      <!-- Hadits Menikah -->
      <div class="tab-pane fade" id="content-hadits-menikah" role="tabpanel">
        <div id="cards-hadits-menikah"></div>
      </div>

      <!-- Hadits Kriteria Pasangan -->
      <div class="tab-pane fade" id="content-hadits-pasangan" role="tabpanel">
        <div id="cards-hadits-pasangan"></div>
      </div>
    </div>
  `;

  // Load and render doa/hadits content
  loadDoaHaditsContent();
}

/**
 * Load and render doa/hadits content by category
 */
function loadDoaHaditsContent() {
  const categories = [
    "doa-jodoh",
    "doa-khitbah",
    "doa-walimah",
    "hadits-menikah",
    "hadits-pasangan",
  ];

  categories.forEach((category) => {
    const containerId = `cards-${category}`;
    const items = getByCategory(category);
    renderDoaHaditsCards(containerId, items);
  });

  // Re-attach copy listeners when tabs change
  attachTabChangeListeners();
}

/**
 * Attach listeners to re-initialize copy buttons when tab changes
 */
function attachTabChangeListeners() {
  const tabs = document.querySelectorAll('[data-bs-toggle="pill"]');

  tabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", (event) => {
      const targetId = event.target.getAttribute("data-bs-target");
      if (targetId) {
        const contentPane = document.querySelector(targetId);
        if (contentPane) {
          const cardsContainer = contentPane.querySelector('[id^="cards-"]');
          if (cardsContainer) {
            // Re-attach copy listeners for this container
            import("../components/DoaHaditsCard.js").then((module) => {
              module.attachCopyListeners(cardsContainer.id);
            });
          }
        }
      }
    });
  });
}

/**
 * Initialize doa view when view is activated
 */
function initDoaView() {
  renderDoaView();
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-doa") {
    initDoaView();
  }
});

export { renderDoaView, initDoaView };

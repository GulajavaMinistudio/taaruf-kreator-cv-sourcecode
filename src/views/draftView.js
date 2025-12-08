/**
 * @file draftView.js
 * @description Draft Page View - Manage saved drafts
 * @version 1.0
 * @date 2025-12-08
 */

import { navigateTo } from "../router/router.js";

/**
 * Render Draft Page content
 */
function renderDraftView() {
  const container = document.getElementById("view-draft");

  container.innerHTML = `
    <!-- Page Header -->
    <div class="mb-4">
      <h2>
        <i class="bi bi-file-earmark-text"></i> Draft Saya
      </h2>
      <p class="text-muted">
        Kelola draft CV yang belum selesai. Anda dapat melanjutkan mengisi 
        atau menghapus draft yang tidak diperlukan.
      </p>
    </div>

    <!-- Draft List Container -->
    <div id="draft-list-container">
      <!-- Draft list will be loaded here dynamically -->
    </div>
  `;

  // Load and render drafts
  loadDrafts();
}

/**
 * Load drafts from localStorage and render list
 */
function loadDrafts() {
  const container = document.getElementById("draft-list-container");

  // TODO: Will be implemented in Phase 5
  // For now, show empty state
  const drafts = []; // getDrafts() from localStorageService

  if (drafts.length === 0) {
    renderEmptyState(container);
  } else {
    renderDraftList(container, drafts);
  }
}

/**
 * Render empty state when no drafts exist
 * @param {HTMLElement} container - Container element
 */
function renderEmptyState(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-body empty-state">
        <i class="bi bi-inbox"></i>
        <h4>Belum Ada Draft Tersimpan</h4>
        <p class="text-muted">
          Draft akan tersimpan otomatis saat Anda klik tombol "Simpan Draft" 
          di halaman formulir.
        </p>
        <button class="btn btn-primary" id="btn-create-new">
          <i class="bi bi-plus-circle"></i> Buat CV Baru
        </button>
      </div>
    </div>
  `;

  // Attach event listener
  const btnCreateNew = document.getElementById("btn-create-new");
  if (btnCreateNew) {
    btnCreateNew.addEventListener("click", () => {
      navigateTo("/form");
    });
  }
}

/**
 * Render list of drafts
 * @param {HTMLElement} container - Container element
 * @param {Array} drafts - Array of draft objects
 */
function renderDraftList(container, drafts) {
  let html = '<div class="list-group">';

  drafts.forEach((draft) => {
    html += `
      <div class="list-group-item draft-card">
        <div class="d-flex w-100 justify-content-between align-items-start">
          <div>
            <h5 class="mb-1">${draft.name || "Draft Tanpa Nama"}</h5>
            <p class="mb-1 text-muted small">
              <i class="bi bi-clock"></i> 
              Terakhir diupdate: ${new Date(draft.lastUpdated).toLocaleString(
                "id-ID"
              )}
            </p>
            ${
              draft.data.namaLengkap
                ? `<p class="mb-1"><strong>Nama:</strong> ${draft.data.namaLengkap}</p>`
                : ""
            }
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-primary btn-load-draft" data-id="${
              draft.id
            }">
              <i class="bi bi-arrow-right-circle"></i> Load
            </button>
            <button class="btn btn-sm btn-danger btn-delete-draft" data-id="${
              draft.id
            }">
              <i class="bi bi-trash"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += "</div>";
  container.innerHTML = html;

  // Attach event listeners
  attachDraftListeners();
}

/**
 * Attach event listeners for draft actions
 */
function attachDraftListeners() {
  // Load draft buttons
  const loadButtons = document.querySelectorAll(".btn-load-draft");
  loadButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const draftId = e.currentTarget.getAttribute("data-id");
      console.log("[DraftView] Load draft:", draftId);
      // TODO: Implement load draft functionality in Phase 5
      alert("Fitur Load Draft akan diimplementasikan di Phase 5");
    });
  });

  // Delete draft buttons
  const deleteButtons = document.querySelectorAll(".btn-delete-draft");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const draftId = e.currentTarget.getAttribute("data-id");
      if (confirm("Apakah Anda yakin ingin menghapus draft ini?")) {
        console.log("[DraftView] Delete draft:", draftId);
        // TODO: Implement delete draft functionality in Phase 5
        alert("Fitur Delete Draft akan diimplementasikan di Phase 5");
      }
    });
  });
}

/**
 * Initialize draft view when view is activated
 */
function initDraftView() {
  renderDraftView();
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-draft") {
    initDraftView();
  }
});

export { renderDraftView, initDraftView };

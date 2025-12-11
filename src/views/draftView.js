/**
 * @file draftView.js
 * @description Draft Page View - Manage saved drafts
 * @version 2.2
 * @date 2025-01-27
 */

import { navigateTo } from "../router/router.js";
import {
  getDrafts,
  getDraftById,
  deleteDraft,
} from "../services/localStorageService.js";
import { showToast } from "../components/ToastNotification.js";
import {
  setButtonLoading,
  resetButtonLoading,
} from "../components/LoadingSpinner.js";

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

  // Get drafts from localStorage
  const drafts = getDrafts();

  // Sort by lastUpdated (newest first)
  const sortedDrafts = drafts.sort(
    (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );

  if (sortedDrafts.length === 0) {
    renderEmptyState(container);
  } else {
    renderDraftList(container, sortedDrafts);
  }

  console.log(`[DraftView] Loaded ${sortedDrafts.length} drafts`);
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
            }" data-bs-toggle="tooltip" data-bs-placement="top" title="Muat draft ini ke formulir">
              <i class="bi bi-arrow-right-circle"></i> Load
            </button>
            <button class="btn btn-sm btn-danger btn-delete-draft" data-id="${
              draft.id
            }" data-bs-toggle="tooltip" data-bs-placement="top" title="Hapus draft ini secara permanen">
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

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    container.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

/**
 * Handle load draft button click
 * @param {string} draftId - Draft ID to load
 */
function handleLoadDraft(draftId, event) {
  const button = event?.target;
  const draft = getDraftById(draftId);

  if (!draft) {
    showToast("Draft tidak ditemukan", "error");
    return;
  }

  // Show loading state
  if (button) setButtonLoading(button, "Memuat...");

  // Simulate async operation
  setTimeout(() => {
    // Store draft data in sessionStorage for form to load
    sessionStorage.setItem(
      "taaruf_cv_draft_to_load",
      JSON.stringify(draft.data)
    );

    // Navigate to form
    navigateTo("/form");

    console.log("[DraftView] Loading draft:", draftId);
    showToast("Memuat draft ke formulir...", "loading");
  }, 300);
}

/**
 * Handle delete draft button click
 * @param {string} draftId - Draft ID to delete
 */
function handleDeleteDraft(draftId) {
  const draft = getDraftById(draftId);

  if (!draft) {
    showToast("Draft tidak ditemukan", "error");
    return;
  }

  // Double confirmation
  const confirmMessage = `Apakah Anda yakin ingin menghapus draft "${draft.name}"?\n\nTindakan ini tidak dapat dibatalkan.`;

  if (!confirm(confirmMessage)) {
    return;
  }

  // Delete draft
  const result = deleteDraft(draftId);

  if (result.success) {
    showToast("Draft berhasil dihapus", "success");
    console.log("[DraftView] Deleted draft:", draftId);

    // Reload draft list
    loadDrafts();
  } else {
    showToast(result.message || "Gagal menghapus draft", "error");
    console.error("[DraftView] Delete failed:", result);
  }
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
      handleLoadDraft(draftId, e);
    });
  });

  // Delete draft buttons
  const deleteButtons = document.querySelectorAll(".btn-delete-draft");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const draftId = e.currentTarget.getAttribute("data-id");
      handleDeleteDraft(draftId);
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

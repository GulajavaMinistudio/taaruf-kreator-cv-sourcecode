/**
 * @file historyView.js
 * @description History Page View - View generated CV history
 * @version 1.0
 * @date 2025-12-08
 */

import { navigateTo } from "../router/router.js";

/**
 * Render History Page content
 */
function renderHistoryView() {
  const container = document.getElementById("view-history");

  container.innerHTML = `
    <!-- Page Header -->
    <div class="mb-4">
      <h2>
        <i class="bi bi-clock-history"></i> Riwayat CV
      </h2>
      <p class="text-muted">
        Lihat dan kelola CV yang sudah pernah Anda buat sebelumnya.
      </p>
    </div>

    <!-- History List Container -->
    <div id="history-list-container">
      <!-- History list will be loaded here dynamically -->
    </div>

    <!-- View Modal -->
    <div class="modal fade" id="modalViewHistory" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-file-earmark-text"></i> CV Ta'aruf
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <pre id="modal-cv-content" class="cv-preview" style="white-space: pre-wrap;"></pre>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            <button type="button" class="btn btn-primary" id="btn-modal-copy">
              <i class="bi bi-clipboard"></i> Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Load and render history
  loadHistory();
}

/**
 * Load history from localStorage and render list
 */
function loadHistory() {
  const container = document.getElementById("history-list-container");

  // TODO: Will be implemented in Phase 5
  // For now, show empty state
  const history = []; // getHistory() from localStorageService

  if (history.length === 0) {
    renderEmptyState(container);
  } else {
    renderHistoryList(container, history);
  }
}

/**
 * Render empty state when no history exists
 * @param {HTMLElement} container - Container element
 */
function renderEmptyState(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-body empty-state">
        <i class="bi bi-hourglass-split"></i>
        <h4>Belum Ada Riwayat CV</h4>
        <p class="text-muted">
          Riwayat CV akan tersimpan otomatis setelah Anda selesai membuat CV 
          dan klik tombol "Simpan ke History".
        </p>
        <button class="btn btn-primary" id="btn-create-new">
          <i class="bi bi-plus-circle"></i> Buat CV Sekarang
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
 * Render list of history items
 * @param {HTMLElement} container - Container element
 * @param {Array} history - Array of history objects
 */
function renderHistoryList(container, history) {
  let html = '<div class="list-group">';

  history.forEach((item) => {
    html += `
      <div class="list-group-item history-card">
        <div class="d-flex w-100 justify-content-between align-items-start">
          <div>
            <h5 class="mb-1">${item.name || "CV Ta'aruf"}</h5>
            <p class="mb-1 text-muted small">
              <i class="bi bi-calendar"></i> 
              Dibuat: ${new Date(item.generatedAt).toLocaleString("id-ID")}
            </p>
            ${
              item.cvData.namaLengkap
                ? `<p class="mb-1"><strong>Nama:</strong> ${item.cvData.namaLengkap}</p>`
                : ""
            }
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-info btn-view-history" data-id="${
              item.id
            }">
              <i class="bi bi-eye"></i> Lihat
            </button>
            <button class="btn btn-sm btn-primary btn-copy-history" data-id="${
              item.id
            }">
              <i class="bi bi-clipboard"></i> Copy
            </button>
            <button class="btn btn-sm btn-danger btn-delete-history" data-id="${
              item.id
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
  attachHistoryListeners();
}

/**
 * Attach event listeners for history actions
 */
function attachHistoryListeners() {
  // View history buttons
  const viewButtons = document.querySelectorAll(".btn-view-history");
  viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const historyId = e.currentTarget.getAttribute("data-id");
      console.log("[HistoryView] View history:", historyId);
      // TODO: Implement view history functionality in Phase 5
      alert("Fitur View History akan diimplementasikan di Phase 5");
    });
  });

  // Copy history buttons
  const copyButtons = document.querySelectorAll(".btn-copy-history");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const historyId = e.currentTarget.getAttribute("data-id");
      console.log("[HistoryView] Copy history:", historyId);
      // TODO: Implement copy history functionality in Phase 5
      alert("Fitur Copy History akan diimplementasikan di Phase 5");
    });
  });

  // Delete history buttons
  const deleteButtons = document.querySelectorAll(".btn-delete-history");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const historyId = e.currentTarget.getAttribute("data-id");
      if (confirm("Apakah Anda yakin ingin menghapus riwayat CV ini?")) {
        console.log("[HistoryView] Delete history:", historyId);
        // TODO: Implement delete history functionality in Phase 5
        alert("Fitur Delete History akan diimplementasikan di Phase 5");
      }
    });
  });
}

/**
 * Initialize history view when view is activated
 */
function initHistoryView() {
  renderHistoryView();
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-history") {
    initHistoryView();
  }
});

export { renderHistoryView, initHistoryView };

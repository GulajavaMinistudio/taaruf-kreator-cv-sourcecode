/**
 * @file historyView.js
 * @description History Page View - View generated CV history
 * @version 2.0
 * @date 2025-01-27
 */

import { navigateTo } from "../router/router.js";
import {
  getHistory,
  getHistoryById,
  deleteHistory,
} from "../services/localStorageService.js";
import { showToast } from "../components/ToastNotification.js";

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

  // Get history from localStorage
  const history = getHistory();

  // Sort by generatedAt (newest first)
  const sortedHistory = history.sort(
    (a, b) => new Date(b.generatedAt) - new Date(a.generatedAt)
  );

  if (sortedHistory.length === 0) {
    renderEmptyState(container);
  } else {
    renderHistoryList(container, sortedHistory);
  }

  console.log(`[HistoryView] Loaded ${sortedHistory.length} history items`);
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
              item.sourceData && item.sourceData.namaLengkap
                ? `<p class="mb-1"><strong>Nama:</strong> ${item.sourceData.namaLengkap}</p>`
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
 * Handle view history button click
 * @param {string} historyId - History ID to view
 */
function handleViewHistory(historyId) {
  const item = getHistoryById(historyId);

  if (!item) {
    showToast("Riwayat tidak ditemukan", "error");
    return;
  }

  // Get modal elements
  const modal = document.getElementById("modalViewHistory");
  const modalContent = document.getElementById("modal-cv-content");

  if (!modal || !modalContent) return;

  // Display CV text in modal
  modalContent.textContent = item.cvTextContent;

  // Store current history ID for copy button
  modal.dataset.currentHistoryId = historyId;

  // Show modal using Bootstrap
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  console.log("[HistoryView] Viewing history:", historyId);
}

/**
 * Handle copy history button click (direct copy without modal)
 * @param {string} historyId - History ID to copy
 */
async function handleCopyHistory(historyId) {
  const item = getHistoryById(historyId);

  if (!item) {
    showToast("Riwayat tidak ditemukan", "error");
    return;
  }

  try {
    // Try Clipboard API
    await navigator.clipboard.writeText(item.cvTextContent);
    showToast("CV berhasil disalin ke clipboard!", "success");
    console.log("[HistoryView] CV copied from history:", historyId);
  } catch (error) {
    // Fallback to execCommand
    console.warn("[HistoryView] Clipboard API failed, trying fallback:", error);

    const textarea = document.createElement("textarea");
    textarea.value = item.cvTextContent;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      showToast("CV berhasil disalin ke clipboard!", "success");
      console.log("[HistoryView] CV copied via execCommand");
    } catch (fallbackError) {
      console.error("[HistoryView] All copy methods failed:", fallbackError);
      showToast(
        "Gagal menyalin. Silakan gunakan tombol View lalu copy manual.",
        "error"
      );
    }

    document.body.removeChild(textarea);
  }
}

/**
 * Handle delete history button click
 * @param {string} historyId - History ID to delete
 */
function handleDeleteHistory(historyId) {
  const item = getHistoryById(historyId);

  if (!item) {
    showToast("Riwayat tidak ditemukan", "error");
    return;
  }

  // Double confirmation
  const confirmMessage = `Apakah Anda yakin ingin menghapus CV "${item.name}"?\n\nTindakan ini tidak dapat dibatalkan.`;

  if (!confirm(confirmMessage)) {
    return;
  }

  // Delete history
  const result = deleteHistory(historyId);

  if (result.success) {
    showToast("Riwayat CV berhasil dihapus", "success");
    console.log("[HistoryView] Deleted history:", historyId);

    // Reload history list
    loadHistory();
  } else {
    showToast(result.message || "Gagal menghapus riwayat", "error");
    console.error("[HistoryView] Delete failed:", result);
  }
}

/**
 * Handle modal copy button click
 */
async function handleModalCopy() {
  const modal = document.getElementById("modalViewHistory");
  const historyId = modal?.dataset.currentHistoryId;

  if (!historyId) {
    showToast("ID riwayat tidak ditemukan", "error");
    return;
  }

  await handleCopyHistory(historyId);
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
      handleViewHistory(historyId);
    });
  });

  // Copy history buttons
  const copyButtons = document.querySelectorAll(".btn-copy-history");
  copyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const historyId = e.currentTarget.getAttribute("data-id");
      handleCopyHistory(historyId);
    });
  });

  // Delete history buttons
  const deleteButtons = document.querySelectorAll(".btn-delete-history");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const historyId = e.currentTarget.getAttribute("data-id");
      handleDeleteHistory(historyId);
    });
  });

  // Modal copy button
  const btnModalCopy = document.getElementById("btn-modal-copy");
  if (btnModalCopy) {
    btnModalCopy.addEventListener("click", handleModalCopy);
  }
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

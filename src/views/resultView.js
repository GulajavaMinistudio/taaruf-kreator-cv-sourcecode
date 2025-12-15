/**
 * @file resultView.js
 * @description Result Page View - Display generated CV
 * @version 2.0
 * @date 2025-12-08
 */

import { navigateTo } from "../router/router.js";
import { showToast } from "../components/ToastNotification.js";
import { saveHistory } from "../services/localStorageService.js";
import { STORAGE_KEYS } from "../types/enums.js";

/**
 * Render Result Page content
 */
function renderResultView() {
  const container = document.getElementById("view-result");

  // Load generated CV text from sessionStorage
  const cvText = sessionStorage.getItem(STORAGE_KEYS.GENERATED_TEXT);

  // If no CV text, redirect to form
  if (!cvText) {
    showToast(
      "Tidak ada CV yang di-generate. Silakan isi formulir terlebih dahulu.",
      "warning"
    );
    navigateTo("/form");
    return;
  }

  // Count characters
  const charCount = cvText.length.toLocaleString("id-ID");

  container.innerHTML = `
    <!-- Success Alert -->
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">
        <i class="bi bi-check-circle"></i> CV Ta'aruf Berhasil Dibuat!
      </h4>
      <p class="mb-0">
        CV Anda telah berhasil di-generate. Anda dapat menyalin teks di bawah 
        atau menyimpannya ke riwayat untuk diakses nanti.
      </p>
    </div>

    <!-- Output Area -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">
          <i class="bi bi-file-earmark-text"></i> CV Ta'aruf Anda
        </h5>
        <span class="badge bg-secondary">${charCount} karakter</span>
      </div>
      <div class="card-body">
        <textarea 
          id="cv-output" 
          class="form-control cv-preview" 
          rows="25" 
          readonly
          style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6;"
        >${cvText}</textarea>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="action-bar">
      <div class="d-flex justify-content-between flex-wrap gap-2">
        <div class="d-flex gap-2 flex-wrap">
          <button type="button" class="btn btn-primary" id="btn-copy-cv">
            <i class="bi bi-clipboard"></i> Copy to Clipboard
          </button>
          <button type="button" class="btn btn-success" id="btn-save-history">
            <i class="bi bi-save"></i> Simpan ke History
          </button>
          <button type="button" class="btn btn-outline-info" id="btn-print-cv">
            <i class="bi bi-printer"></i> Print
          </button>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button type="button" class="btn btn-outline-secondary" id="btn-new-cv">
            <i class="bi bi-plus-circle"></i> Buat CV Baru
          </button>
          <button type="button" class="btn btn-outline-primary" id="btn-back-home">
            <i class="bi bi-house"></i> Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>

    <!-- Spacing for sticky action bar -->
    <div style="height: 80px;"></div>
  `;

  // Attach event listeners
  attachEventListeners();
}

/**
 * Handle copy to clipboard with fallback
 */
async function handleCopyToClipboard() {
  const cvOutput = document.getElementById("cv-output");
  const btnCopy = document.getElementById("btn-copy-cv");

  if (!cvOutput) return;

  try {
    // Try modern Clipboard API first
    await navigator.clipboard.writeText(cvOutput.value);

    // Show success feedback
    showToast("CV berhasil disalin ke clipboard!", "success");

    const originalText = btnCopy.innerHTML;
    btnCopy.innerHTML = '<i class="bi bi-check"></i> Tersalin!';
    btnCopy.classList.add("btn-success");
    btnCopy.classList.remove("btn-primary");

    setTimeout(() => {
      btnCopy.innerHTML = originalText;
      btnCopy.classList.remove("btn-success");
      btnCopy.classList.add("btn-primary");
    }, 2000);
  } catch (err) {
    // Fallback to execCommand for older browsers
    try {
      cvOutput.select();
      document.execCommand("copy");
      showToast("CV berhasil disalin ke clipboard!", "success");
    } catch (fallbackErr) {
      console.error("[ResultView] All copy methods failed:", fallbackErr);
      showToast("Gagal menyalin. Silakan gunakan Ctrl+A dan Ctrl+C.", "error");
    }
  }
}

/**
 * Handle save to history
 */
function handleSaveHistory() {
  const cvText = sessionStorage.getItem(STORAGE_KEYS.GENERATED_TEXT);
  const sourceDataStr = sessionStorage.getItem(STORAGE_KEYS.SOURCE_DATA);

  if (!cvText || !sourceDataStr) {
    showToast(
      "Data CV tidak ditemukan. Tidak dapat menyimpan ke history.",
      "error"
    );
    return;
  }

  try {
    const sourceData = JSON.parse(sourceDataStr);

    // Save to localStorage using proper signature: saveHistory(formData, cvTextContent, customName)
    const result = saveHistory(sourceData, cvText);

    if (result.success) {
      showToast("CV berhasil disimpan ke history!", "success");

      // Disable button after saving
      const btnSave = document.getElementById("btn-save-history");
      if (btnSave) {
        btnSave.disabled = true;
        btnSave.innerHTML = '<i class="bi bi-check-circle"></i> Sudah Disimpan';
      }
    } else {
      showToast(result.message || "Gagal menyimpan ke history", "error");
      console.error("[ResultView] Save history failed:", result);
    }
  } catch (err) {
    console.error("[ResultView] Failed to save history:", err);
    showToast("Gagal menyimpan ke history. Silakan coba lagi.", "error");
  }
}

/**
 * Handle print CV
 */
function handlePrintCV() {
  const cvText = sessionStorage.getItem(STORAGE_KEYS.GENERATED_TEXT);

  if (!cvText) {
    showToast("Tidak ada CV untuk dicetak.", "error");
    return;
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CV Ta'aruf - Print</title>
      <style>
        body {
          font-family: 'Courier New', monospace;
          font-size: 12pt;
          line-height: 1.6;
          margin: 2cm;
          white-space: pre-wrap;
        }
        @media print {
          body { margin: 1cm; }
        }
      </style>
    </head>
    <body>${cvText}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();

  // Wait for content to load, then print
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

/**
 * Handle new CV creation
 */
function handleNewCV() {
  // Clear sessionStorage
  sessionStorage.removeItem(STORAGE_KEYS.TEMP_DATA);
  sessionStorage.removeItem(STORAGE_KEYS.GENERATED_TEXT);
  sessionStorage.removeItem(STORAGE_KEYS.SOURCE_DATA);

  // Navigate to form
  showToast("Membuat CV baru. Silakan isi formulir.", "info");
  navigateTo("/form");
}

/**
 * Attach event listeners for result page interactions
 */
function attachEventListeners() {
  const btnCopy = document.getElementById("btn-copy-cv");
  const btnSaveHistory = document.getElementById("btn-save-history");
  const btnPrint = document.getElementById("btn-print-cv");
  const btnNewCV = document.getElementById("btn-new-cv");
  const btnBackHome = document.getElementById("btn-back-home");

  // Copy to clipboard button
  if (btnCopy) {
    btnCopy.addEventListener("click", handleCopyToClipboard);
  }

  // Save to history button
  if (btnSaveHistory) {
    btnSaveHistory.addEventListener("click", handleSaveHistory);
  }

  // Print button
  if (btnPrint) {
    btnPrint.addEventListener("click", handlePrintCV);
  }

  // New CV button
  if (btnNewCV) {
    btnNewCV.addEventListener("click", handleNewCV);
  }

  // Back to home button
  if (btnBackHome) {
    btnBackHome.addEventListener("click", () => {
      navigateTo("/");
    });
  }
}

/**
 * Initialize result view when view is activated
 */
function initResultView() {
  renderResultView();

  // Clear temporary form data after CV is generated
  // This prevents conflicts when loading drafts later
  sessionStorage.removeItem(STORAGE_KEYS.TEMP_DATA);
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-result") {
    initResultView();
  }
});

export { renderResultView, initResultView };

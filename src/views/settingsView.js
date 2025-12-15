/**
 * @file settingsView.js
 * @description Settings Page View - App settings and information
 * @version 2.1
 * @date 2025-01-27
 */

import { clearAllData } from "../services/localStorageService.js";
import { showToast } from "../components/ToastNotification.js";
import {
  setButtonLoading,
  resetButtonLoading,
} from "../components/LoadingSpinner.js";

/**
 * Render Settings Page content
 */
function renderSettingsView() {
  const container = document.getElementById("view-settings");

  container.innerHTML = `
    <!-- Page Header -->
    <div class="mb-4">
      <h2>
        <i class="bi bi-gear"></i> Pengaturan & Tentang Aplikasi
      </h2>
      <p class="text-muted">
        Informasi tentang aplikasi, pengembang, dan pengaturan data.
      </p>
    </div>

    <!-- Card 1: Tentang Aplikasi -->
    <div class="card mb-3">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-info-circle"></i> Tentang Aplikasi
        </h5>
      </div>
      <div class="card-body">
        <h4 class="card-title">Taaruf CV Kreator</h4>
        <p class="card-text">
          Aplikasi web untuk membuat CV Ta'aruf (perkenalan dalam rangka pernikahan Islami) 
          dengan mudah dan aman. Semua data disimpan lokal di browser Anda, tidak ada 
          transmisi data ke server.
        </p>
        <p class="card-text">
          <strong>Manfaat Aplikasi:</strong>
        </p>
        <ul>
          <li>Memudahkan penyusunan CV Ta'aruf dengan format terstruktur</li>
          <li>Menjaga privasi data pribadi Anda</li>
          <li>Menyediakan template lengkap 49 kolom informasi</li>
          <li>Dilengkapi doa dan hadits tentang pernikahan</li>
        </ul>
      </div>
    </div>

    <!-- Card 2: Informasi Developer -->
    <div class="card mb-3">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-code-slash"></i> Informasi Developer
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          <strong>Dikembangkan oleh:</strong> 
          <a 
            href="https://github.com/GulajavaMinistudio" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-decoration-none"
          >
            Gulajava Ministudio
          </a>
        </p>
        <p class="card-text">
          Aplikasi ini dikembangkan sebagai proyek open-source untuk membantu 
          Muslim dan Muslimah dalam proses ta'aruf.
        </p>
      </div>
    </div>

    <!-- Card 3: Tools & Teknologi -->
    <div class="card mb-3">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-tools"></i> Tools & Teknologi
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text mb-3">Aplikasi ini dibangun menggunakan:</p>
        <div class="d-flex flex-wrap gap-2">
          <span class="badge bg-primary">HTML5</span>
          <span class="badge bg-primary">CSS3</span>
          <span class="badge bg-primary">Vanilla JavaScript</span>
          <span class="badge bg-primary">Bootstrap 5</span>
          <span class="badge bg-primary">Vite</span>
          <span class="badge bg-primary">LocalStorage API</span>
          <span class="badge bg-primary">Visual Studio Code</span>
          <span class="badge bg-primary">GitHub Copilot AI</span>
          <span class="badge bg-primary">Google Antigravity</span>
        </div>
      </div>
    </div>

    <!-- Card 4: Versi Aplikasi -->
    <div class="card mb-3">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-tag"></i> Versi Aplikasi
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          <strong>Versi:</strong> 1.0<br>
          <strong>Tanggal Rilis:</strong> Desember 2025<br>
          <strong>Status:</strong> <span class="badge bg-success">Stable</span>
        </p>
      </div>
    </div>

    <!-- Card 5: Kebijakan Privasi -->
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">
          <i class="bi bi-shield-lock"></i> Kebijakan Privasi
        </h5>
      </div>
      <div class="card-body">
        <h6>Komitmen Privasi Kami</h6>
        <p class="card-text">
          Kami sangat menjaga privasi pengguna. Berikut adalah komitmen kami:
        </p>
        <ul class="mb-3">
          <li><strong>Tidak Ada Pengumpulan Data:</strong> Aplikasi ini tidak mengumpulkan, 
              menyimpan, atau mengirim data Anda ke server manapun.</li>
          <li><strong>Penyimpanan Lokal:</strong> Semua data disimpan di browser Anda 
              menggunakan teknologi LocalStorage.</li>
          <li><strong>Kendali Penuh:</strong> Anda memiliki kendali penuh atas data Anda 
              dan dapat menghapusnya kapan saja.</li>
          <li><strong>Tidak Ada Tracking:</strong> Tidak ada analytics, cookies tracking, 
              atau teknologi pelacakan lainnya.</li>
        </ul>
        <div class="alert alert-info mb-0">
          <i class="bi bi-lightbulb"></i>
          <strong>Catatan:</strong> Data Anda hanya tersimpan di browser ini. Jika Anda 
          membersihkan cache browser atau menggunakan mode incognito, data tidak akan 
          tersimpan permanen.
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="danger-zone">
      <h5>
        <i class="bi bi-exclamation-triangle"></i> Danger Zone
      </h5>
      <p class="text-muted mb-3">
        Tindakan di area ini bersifat permanen dan tidak dapat dibatalkan.
      </p>
      <button type="button" class="btn btn-danger" id="btn-reset-data">
        <i class="bi bi-trash"></i> Reset Semua Data
      </button>
      <p class="text-muted mt-2 mb-0">
        <small>
          Menghapus semua draft, riwayat CV, dan pengaturan. 
          Tindakan ini tidak dapat dibatalkan!
        </small>
      </p>
    </div>
  `;

  // Attach event listeners
  attachEventListeners();
}

/**
 * Attach event listeners for settings page interactions
 */
function attachEventListeners() {
  const btnReset = document.getElementById("btn-reset-data");

  // Reset data button
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      const confirmed = confirm(
        "⚠️ PERINGATAN!\n\n" +
          "Anda akan menghapus SEMUA data termasuk:\n" +
          "- Semua draft CV\n" +
          "- Semua riwayat CV\n" +
          "- Pengaturan aplikasi\n\n" +
          "Tindakan ini TIDAK DAPAT DIBATALKAN!\n\n" +
          "Apakah Anda yakin ingin melanjutkan?"
      );

      if (confirmed) {
        const doubleConfirm = confirm(
          "Konfirmasi terakhir:\n\n" +
            "Apakah Anda BENAR-BENAR YAKIN ingin menghapus semua data?"
        );

        if (doubleConfirm) {
          console.log("[SettingsView] Clearing all data...");

          // Show loading state
          setButtonLoading(btnReset, "Menghapus...");

          // Simulate async operation
          setTimeout(() => {
            const result = clearAllData();

            if (result.success) {
              showToast(
                "Semua data berhasil dihapus. Halaman akan dimuat ulang...",
                "success"
              );

              // Reload page after 1.5 seconds to show toast
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              resetButtonLoading(btnReset);
              showToast(result.message || "Gagal menghapus data", "error");
              console.error("[SettingsView] Clear data failed:", result.error);
            }
          }, 500);
        }
      }
    });
  }
}

/**
 * Initialize settings view when view is activated
 */
function initSettingsView() {
  renderSettingsView();
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-settings") {
    initSettingsView();
  }
});

export { renderSettingsView, initSettingsView };

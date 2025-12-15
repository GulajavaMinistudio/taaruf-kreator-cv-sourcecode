/**
 * @file landingView.js
 * @description Landing Page View - Homepage of Taaruf CV Kreator
 * @version 1.0
 * @date 2025-12-08
 */

import { navigateTo } from "../router/router.js";

/**
 * Render Landing Page content
 */
function renderLandingView() {
  const container = document.getElementById("view-landing");

  container.innerHTML = `
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>
        Taaruf CV Kreator
      </h1>
      <p class="lead">Buat CV Ta'aruf Islami dengan Mudah dan Aman</p>
      <button class="btn btn-light btn-lg mt-3" id="btn-start">
        <i class="bi bi-pencil-square"></i> Buat CV Baru
      </button>
    </div>

    <!-- Privacy Notice -->
    <div class="alert privacy-notice" role="alert">
      <h5 class="alert-heading">
        <i class="bi bi-shield-lock"></i> Privasi Anda Terjamin
      </h5>
      <p class="mb-0">
        Semua data yang Anda masukkan <strong>hanya tersimpan di browser Anda</strong> 
        dan <strong>tidak dikirim ke server manapun</strong>. Data Anda sepenuhnya 
        aman dan terkendali oleh Anda.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="row g-4 mb-5">
      <div class="col-md-6 col-lg-3">
        <div class="card feature-card">
          <div class="card-body">
            <i class="bi bi-pencil-square"></i>
            <h5 class="card-title">Buat CV Baru</h5>
            <p class="card-text">Isi formulir lengkap untuk membuat CV Ta'aruf Anda</p>
            <button class="btn btn-primary btn-feature" data-route="/form">
              Mulai <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card feature-card">
          <div class="card-body">
            <i class="bi bi-file-earmark-text"></i>
            <h5 class="card-title">Draft Saya</h5>
            <p class="card-text">Lanjutkan mengisi CV yang belum selesai</p>
            <button class="btn btn-primary btn-feature" data-route="/draft">
              Lihat Draft <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card feature-card">
          <div class="card-body">
            <i class="bi bi-clock-history"></i>
            <h5 class="card-title">Riwayat CV</h5>
            <p class="card-text">Akses CV yang sudah pernah dibuat sebelumnya</p>
            <button class="btn btn-primary btn-feature" data-route="/history">
              Lihat Riwayat <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card feature-card">
          <div class="card-body">
            <i class="bi bi-book"></i>
            <h5 class="card-title">Doa & Hadits</h5>
            <p class="card-text">Doa dan hadits seputar pernikahan dalam Islam</p>
            <button class="btn btn-primary btn-feature" data-route="/doa">
              Baca <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-body p-4">
            <h3 class="card-title mb-3">
              <img 
                src="./married-couple.png" 
                alt="Married Couple Icon" 
                class="me-2"
                style="height: 40px; width: 40px; object-fit: contain; vertical-align: middle;"
              />
              Tentang CV Ta'aruf
            </h3>
            <p>
              <strong>Ta'aruf</strong> adalah proses perkenalan dalam Islam yang bertujuan 
              untuk menuju pernikahan. CV Ta'aruf berisi informasi pribadi, latar belakang 
              pendidikan, keluarga, praktik ibadah, dan visi pernikahan.
            </p>
            <p>
              Aplikasi <strong>Taaruf CV Kreator</strong> membantu Anda menyusun CV Ta'aruf 
              dengan format yang rapi dan sistematis, sehingga memudahkan proses perkenalan 
              dengan calon pasangan.
            </p>
            <p class="mb-0">
              <i class="bi bi-check-circle text-success"></i> Formulir lengkap 49 kolom<br>
              <i class="bi bi-check-circle text-success"></i> Format output yang rapi<br>
              <i class="bi bi-check-circle text-success"></i> Simpan draft & riwayat<br>
              <i class="bi bi-check-circle text-success"></i> 100% privasi terjaga
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  attachEventListeners();
}

/**
 * Attach event listeners for landing page interactions
 */
function attachEventListeners() {
  // Hero CTA button
  const btnStart = document.getElementById("btn-start");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      navigateTo("/form");
    });
  }

  // Feature card buttons
  const featureButtons = document.querySelectorAll(".btn-feature");
  featureButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const route = e.currentTarget.getAttribute("data-route");
      if (route) {
        navigateTo(route);
      }
    });
  });
}

/**
 * Initialize landing view when view is activated
 */
function initLandingView() {
  renderLandingView();
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-landing") {
    initLandingView();
  }
});

// Initialize on first load if this is the active view
if (
  window.location.hash === "" ||
  window.location.hash === "#/" ||
  window.location.hash === "#/home"
) {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLandingView);
  } else {
    initLandingView();
  }
}

export { renderLandingView, initLandingView };

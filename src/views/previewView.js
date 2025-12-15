/**
 * @file previewView.js
 * @description Preview Page View - Review CV data before generation
 * @version 2.0
 * @date 2025-12-08
 */

import { navigateTo } from "../router/router.js";
import { generateCV } from "../services/cvGeneratorService.js";
import { showToast } from "../components/ToastNotification.js";
import { STORAGE_KEYS } from "../types/enums.js";

/**
 * Render Preview Page content
 */
function renderPreviewView() {
  const container = document.getElementById("view-preview");

  // Load form data from sessionStorage
  const formData = loadFormData();

  // If no data (empty object), redirect to form
  if (Object.keys(formData).length === 0) {
    showToast(
      "Tidak ada data untuk di-preview. Silakan isi formulir terlebih dahulu.",
      "warning"
    );
    navigateTo("/form");
    return;
  }

  // Build preview HTML
  const previewHTML = buildPreviewHTML(formData);

  container.innerHTML = `
    <!-- Preview Header -->
    <div class="mb-4">
      <h2>
        <i class="bi bi-eye"></i> Preview Data CV Ta'aruf
      </h2>
      <p class="text-muted">
        Periksa kembali data Anda sebelum men-generate CV. 
        Pastikan semua informasi sudah benar.
      </p>
    </div>

    <!-- Preview Container -->
    <div class="card mb-4">
      <div class="card-body">
        <div id="preview-content">
          ${previewHTML}
        </div>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="action-bar">
      <div class="d-flex justify-content-between flex-wrap gap-2">
        <button type="button" class="btn btn-outline-secondary" id="btn-back-to-form">
          <i class="bi bi-arrow-left"></i> Kembali ke Edit
        </button>
        <button type="button" class="btn btn-success" id="btn-generate-cv">
          <i class="bi bi-file-earmark-check"></i> Generate CV
        </button>
      </div>
    </div>

    <!-- Spacing for sticky action bar -->
    <div style="height: 80px;"></div>
  `;

  // Attach event listeners
  attachEventListeners();
}

/**
 * Load form data from sessionStorage
 * Returns empty object (Null Object Pattern) instead of null to prevent null checks
 * @returns {Object} Form data or empty object if not found
 */
function loadFormData() {
  try {
    const dataStr = sessionStorage.getItem(STORAGE_KEYS.TEMP_DATA);
    return dataStr ? JSON.parse(dataStr) : {};
  } catch (error) {
    console.error("[PreviewView] Error loading form data:", error);
    return {};
  }
}

/**
 * Build preview HTML from form data
 * @param {Object} data - Form data object
 * @returns {string} HTML string for preview
 */
function buildPreviewHTML(data) {
  let html = "";

  // Helper function to display value or dash
  const display = (value) => value || "-";

  // Section 1: Data Pribadi
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-person"></i> 1. Data Pribadi
      </h5>
      <div class="row g-2">
        <div class="col-md-6"><strong>Nama Lengkap:</strong> ${display(
          data.namaLengkap
        )}</div>
        <div class="col-md-6"><strong>Nama Panggilan:</strong> ${display(
          data.namaPanggilan
        )}</div>
        <div class="col-md-6"><strong>Tempat Lahir:</strong> ${display(
          data.tempatLahir
        )}</div>
        <div class="col-md-6"><strong>Tanggal Lahir:</strong> ${display(
          data.tanggalLahir
        )}</div>
        <div class="col-md-6"><strong>Jenis Kelamin:</strong> ${display(
          data.jenisKelamin
        )}</div>
        <div class="col-md-6"><strong>Tinggi/Berat:</strong> ${display(
          data.tinggiBadan
        )} cm / ${display(data.beratBadan)} kg</div>
        <div class="col-md-6"><strong>Warna Kulit:</strong> ${display(
          data.warnaKulit
        )}</div>
        <div class="col-md-6"><strong>Suku:</strong> ${display(data.suku)}</div>
        <div class="col-md-6"><strong>Domisili:</strong> ${display(
          data.domisili
        )}</div>
        <div class="col-md-6"><strong>Asal Daerah:</strong> ${display(
          data.asalDaerah
        )}</div>
        <div class="col-md-6"><strong>Pekerjaan:</strong> ${display(
          data.pekerjaan
        )}</div>
        <div class="col-md-6"><strong>Penghasilan:</strong> ${display(
          data.penghasilanBulanan
        )}</div>
        <div class="col-md-6"><strong>Status Rumah:</strong> ${display(
          data.statusRumah
        )}</div>
        <div class="col-md-6"><strong>Status Pernikahan:</strong> ${display(
          data.statusPernikahan
        )}</div>
        ${
          data.statusPernikahan === "Duda" || data.statusPernikahan === "Janda"
            ? `<div class="col-md-6"><strong>Jumlah Anak:</strong> ${display(
                data.jumlahAnak
              )}</div>`
            : ""
        }
        <div class="col-md-6"><strong>Pernah Khitbah:</strong> ${display(
          data.pernahKhitbah
        )}</div>
        <div class="col-md-6"><strong>Status Izin Menikah:</strong> ${display(
          data.statusIzin
        )}</div>
      </div>
    </div>
  `;

  // Section 2: Riwayat Pendidikan
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-mortarboard"></i> 2. Riwayat Pendidikan
      </h5>
      <div class="mb-2"><strong>Pendidikan Terakhir:</strong><br>${display(
        data.pendidikanTerakhir
      )}</div>
      <div class="mb-2"><strong>Pendidikan Non-Formal:</strong><br>${display(
        data.pendidikanNonFormal
      )}</div>
      <div class="mb-2"><strong>Prestasi/Keahlian:</strong><br>${display(
        data.prestasi
      )}</div>
    </div>
  `;

  // Section 3: Informasi Keluarga
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-people"></i> 3. Informasi Keluarga
      </h5>
      <div class="mb-2"><strong>Data Ayah:</strong><br>${display(
        data.infoAyah
      )}</div>
      <div class="mb-2"><strong>Data Ibu:</strong><br>${display(
        data.infoIbu
      )}</div>
      <div class="mb-2"><strong>Urutan Anak:</strong> ${display(
        data.urutanAnak
      )}</div>
      <div class="mb-2"><strong>Data Saudara:</strong><br>${display(
        data.infoSaudara
      )}</div>
    </div>
  `;

  // Section 4: Ibadah & Pemahaman Agama
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-moon-stars"></i> 4. Ibadah & Pemahaman Agama
      </h5>
      <div class="mb-2"><strong>Status Muallaf:</strong> ${display(
        data.statusMuallaf
      )}</div>
      <div class="mb-2"><strong>Shalat Wajib:</strong><br>${display(
        data.shalatWajib
      )}</div>
      <div class="mb-2"><strong>Ibadah Sunnah:</strong><br>${display(
        data.ibadahSunnah
      )}</div>
      <div class="mb-2"><strong>Bacaan Al-Qur'an:</strong><br>${display(
        data.bacaanQuran
      )}</div>
      <div class="mb-2"><strong>Kajian Favorit:</strong><br>${display(
        data.kajianFavorit
      )}</div>
      <div class="mb-2"><strong>Organisasi Islam:</strong> ${display(
        data.afiliasiOrganisasi
      )}</div>
    </div>
  `;

  // Section 5: Profil Diri & Kebiasaan
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-card-text"></i> 5. Profil Diri & Kebiasaan
      </h5>
      <div class="mb-2"><strong>Hobi:</strong> ${display(data.hobi)}</div>
      <div class="mb-2"><strong>Merokok:</strong> ${display(data.merokok)}</div>
      ${
        data.jenisKelamin === "Laki-laki"
          ? `<div class="mb-2"><strong>Status Jenggot:</strong> ${display(
              data.statusJenggot
            )}</div>`
          : ""
      }
      ${
        data.jenisKelamin === "Perempuan"
          ? `<div class="mb-2"><strong>Status Hijab:</strong> ${display(
              data.statusHijab
            )}</div>`
          : ""
      }
      <div class="mb-2"><strong>Sifat Positif:</strong><br>${display(
        data.sifatPositif
      )}</div>
      <div class="mb-2"><strong>Sifat Negatif:</strong><br>${display(
        data.sifatNegatif
      )}</div>
      <div class="mb-2"><strong>Riwayat Penyakit:</strong><br>${display(
        data.riwayatPenyakit
      )}</div>
      <div class="mb-2"><strong>Visi Misi Hidup:</strong><br>${display(
        data.visiMisiHidup
      )}</div>
    </div>
  `;

  // Section 6: Visi Pernikahan
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-heart"></i> 6. Visi Pernikahan
      </h5>
      <div class="mb-2"><strong>Visi & Misi Pernikahan:</strong><br>${display(
        data.visiPernikahan
      )}</div>
      <div class="mb-2"><strong>Kriteria Pasangan:</strong><br>${display(
        data.kriteriaPasangan
      )}</div>
      <div class="mb-2"><strong>Pandangan Mahar:</strong><br>${display(
        data.pandanganMahar
      )}</div>
      ${
        data.jenisKelamin === "Laki-laki"
          ? `<div class="mb-2"><strong>Pandangan Poligami:</strong> ${display(
              data.kesediaanPoligami
            )}</div>`
          : ""
      }
      ${
        data.jenisKelamin === "Perempuan"
          ? `<div class="mb-2"><strong>Kesediaan Dipoligami:</strong> ${display(
              data.kesediaanDipoligami
            )}</div>`
          : ""
      }
      <div class="mb-2"><strong>Pandangan Istri Bekerja:</strong> ${display(
        data.pandanganNafkah
      )}</div>
      <div class="mb-2"><strong>Kesediaan Pindah:</strong> ${display(
        data.kesediaanPindah
      )}</div>
      <div class="mb-2"><strong>Target Menikah:</strong> ${display(
        data.targetMenikah
      )}</div>
      <div class="mb-2"><strong>Rencana Setelah Menikah:</strong><br>${display(
        data.rencanaSetelahMenikah
      )}</div>
    </div>
  `;

  // Section 7: Kontak
  html += `
    <div class="preview-section mb-4">
      <h5 class="text-primary mb-3">
        <i class="bi bi-telephone"></i> 7. Informasi Kontak
      </h5>
      <div class="row g-2">
        <div class="col-md-6"><strong>No HP/WhatsApp:</strong> ${display(
          data.noHP
        )}</div>
        <div class="col-md-6"><strong>Email:</strong> ${display(
          data.email
        )}</div>
        <div class="col-md-6"><strong>Akun Sosmed:</strong> ${display(
          data.akunSosmed
        )}</div>
        <div class="col-md-6"><strong>Kontak Wali:</strong> ${display(
          data.kontakWali
        )}</div>
      </div>
    </div>
  `;

  return html;
}

/**
 * Attach event listeners for preview interactions
 */
function attachEventListeners() {
  const btnBack = document.getElementById("btn-back-to-form");
  const btnGenerate = document.getElementById("btn-generate-cv");

  // Back to form button
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      navigateTo("/form");
    });
  }

  // Generate CV button
  if (btnGenerate) {
    btnGenerate.addEventListener("click", handleGenerateCV);
  }
}

/**
 * Handle Generate CV button click
 */
function handleGenerateCV() {
  // Load form data from sessionStorage
  const formData = loadFormData();

  if (!formData) {
    showToast(
      "Data tidak ditemukan. Silakan isi formulir terlebih dahulu.",
      "error"
    );
    navigateTo("/form");
    return;
  }

  // Show loading indicator
  const btnGenerate = document.getElementById("btn-generate-cv");
  const originalText = btnGenerate.innerHTML;
  btnGenerate.disabled = true;
  btnGenerate.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2"></span>Generating...';

  // Simulate async operation (give UI time to update)
  setTimeout(() => {
    try {
      // Generate CV text
      const cvText = generateCV(formData);

      if (!cvText) {
        throw new Error("Failed to generate CV text");
      }

      // Store generated CV to sessionStorage
      sessionStorage.setItem("taaruf_cv_generated_text", cvText);

      // Also store source data for history
      sessionStorage.setItem("taaruf_cv_source_data", JSON.stringify(formData));

      // Navigate to result page
      navigateTo("/result");
    } catch (error) {
      console.error("[PreviewView] Error generating CV:", error);
      showToast("Gagal men-generate CV. Silakan coba lagi.", "error");

      // Restore button state
      btnGenerate.disabled = false;
      btnGenerate.innerHTML = originalText;
    }
  }, 500); // Small delay for better UX
}

/**
 * Initialize preview view when view is activated
 */
function initPreviewView() {
  renderPreviewView();
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-preview") {
    initPreviewView();
  }
});

export { renderPreviewView, initPreviewView };

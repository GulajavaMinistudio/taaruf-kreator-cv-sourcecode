/**
 * @file formView.js
 * @description Form Page View - CV Input Form with Validation
 * @version 2.1
 * @date 2025-01-27
 */

import {
  validateField,
  clearFieldError,
  validateForm,
} from "../services/validationService.js";
import { saveDraft } from "../services/localStorageService.js";
import { showToast } from "../components/ToastNotification.js";
import { navigateTo } from "../router/router.js";
import {
  setButtonLoading,
  resetButtonLoading,
} from "../components/LoadingSpinner.js";

/**
 * Render Form Page content (skeleton structure)
 * Note: Full 49 fields will be implemented in Phase 3
 */
function renderFormView() {
  const container = document.getElementById("view-form");

  container.innerHTML = `
    <!-- Form Header -->
    <div class="mb-4">
      <h2>
        <i class="bi bi-pencil-square"></i> Formulir CV Ta'aruf
      </h2>
      <p class="text-muted">
        Isi formulir dengan lengkap dan jujur. Kolom bertanda 
        <span class="text-danger fw-bold">*</span> wajib diisi.
      </p>
    </div>

    <!-- Form Container -->
    <form id="cv-form" novalidate>
      
      <!-- Section 1: Data Pribadi -->
      <div class="form-section-header">
        <h3><i class="bi bi-person"></i> 1. Data Pribadi</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- Nama Lengkap (Wajib) -->
            <div class="col-md-6">
              <label for="namaLengkap" class="form-label">
                Nama Lengkap <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="namaLengkap"
                name="namaLengkap"
                required
                minlength="3"
                placeholder="Contoh: Ahmad Fauzi bin Abdullah"
              />
              <div class="invalid-feedback">Kolom ini wajib diisi (minimal 3 karakter).</div>
            </div>

            <!-- Nama Panggilan (Opsional) -->
            <div class="col-md-6">
              <label for="namaPanggilan" class="form-label">
                Nama Panggilan
              </label>
              <input
                type="text"
                class="form-control"
                id="namaPanggilan"
                name="namaPanggilan"
                placeholder="Contoh: Ahmad"
              />
            </div>

            <!-- Tempat Lahir (Wajib) -->
            <div class="col-md-6">
              <label for="tempatLahir" class="form-label">
                Tempat Lahir <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="tempatLahir"
                name="tempatLahir"
                required
                placeholder="Contoh: Jakarta"
              />
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Tanggal Lahir (Wajib) -->
            <div class="col-md-6">
              <label for="tanggalLahir" class="form-label">
                Tanggal Lahir <span class="text-danger">*</span>
              </label>
              <input
                type="date"
                class="form-control"
                id="tanggalLahir"
                name="tanggalLahir"
                required
                max=""
              />
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Jenis Kelamin (Wajib) -->
            <div class="col-md-6">
              <label for="jenisKelamin" class="form-label">
                Jenis Kelamin <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="jenisKelamin"
                name="jenisKelamin"
                required
              >
                <option value="">-- Pilih --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Tinggi Badan (Wajib) -->
            <div class="col-md-3">
              <label for="tinggiBadan" class="form-label">
                Tinggi Badan (cm) <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="tinggiBadan"
                name="tinggiBadan"
                required
                min="100"
                max="250"
                placeholder="170"
              />
              <div class="invalid-feedback">Nilai 100-250 cm.</div>
            </div>

            <!-- Berat Badan (Wajib) -->
            <div class="col-md-3">
              <label for="beratBadan" class="form-label">
                Berat Badan (kg) <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="beratBadan"
                name="beratBadan"
                required
                min="30"
                max="200"
                placeholder="65"
              />
              <div class="invalid-feedback">Nilai 30-200 kg.</div>
            </div>

            <!-- Warna Kulit (Opsional) -->
            <div class="col-md-6">
              <label for="warnaKulit" class="form-label">
                Warna Kulit
              </label>
              <input
                type="text"
                class="form-control"
                id="warnaKulit"
                name="warnaKulit"
                placeholder="Contoh: Sawo matang"
              />
            </div>

            <!-- Pekerjaan (Wajib) -->
            <div class="col-md-6">
              <label for="pekerjaan" class="form-label">
                Pekerjaan Saat Ini <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="pekerjaan"
                name="pekerjaan"
                required
                placeholder="Contoh: Software Engineer di PT ABC"
              />
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Status Pernikahan (Wajib) -->
            <div class="col-md-6">
              <label for="statusPernikahan" class="form-label">
                Status Pernikahan <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="statusPernikahan"
                name="statusPernikahan"
                required
              >
                <option value="">-- Pilih --</option>
                <option value="Lajang">Lajang</option>
                <option value="Duda">Duda</option>
                <option value="Janda">Janda</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Jumlah Anak (Kondisional) -->
            <div class="col-md-6 conditional-field d-none" id="wrapper-jumlahAnak">
              <label for="jumlahAnak" class="form-label">
                Jumlah Anak <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="jumlahAnak"
                name="jumlahAnak"
                min="0"
                max="20"
                placeholder="0"
              />
              <div class="invalid-feedback">Nilai 0-20.</div>
            </div>

            <!-- Pernah Khitbah (Opsional) -->
            <div class="col-md-6">
              <label for="pernahKhitbah" class="form-label">
                Pernah Khitbah
              </label>
              <select
                class="form-select"
                id="pernahKhitbah"
                name="pernahKhitbah"
              >
                <option value="">-- Pilih --</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>

            <!-- Suku Bangsa (Opsional) -->
            <div class="col-md-6">
              <label for="suku" class="form-label">
                Suku Bangsa
              </label>
              <input
                type="text"
                class="form-control"
                id="suku"
                name="suku"
                placeholder="Contoh: Jawa"
              />
            </div>

            <!-- Domisili (Wajib) -->
            <div class="col-md-6">
              <label for="domisili" class="form-label">
                Domisili Saat Ini <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="domisili"
                name="domisili"
                required
                placeholder="Contoh: Jakarta Selatan"
              />
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Kota Asal (Opsional) -->
            <div class="col-md-6">
              <label for="asalDaerah" class="form-label">
                Kota Asal
              </label>
              <input
                type="text"
                class="form-control"
                id="asalDaerah"
                name="asalDaerah"
                placeholder="Contoh: Bandung"
              />
            </div>

            <!-- Pengalaman Kerja (Opsional) -->
            <div class="col-12">
              <label for="pengalamanKerja" class="form-label">
                Pengalaman Kerja
              </label>
              <textarea
                class="form-control"
                id="pengalamanKerja"
                name="pengalamanKerja"
                rows="3"
                placeholder="Contoh: Software Engineer di PT XYZ (2020-2023), Junior Developer di CV ABC (2018-2020)"
              ></textarea>
            </div>

            <!-- Penghasilan Bulanan (Opsional) -->
            <div class="col-md-6">
              <label for="penghasilanBulanan" class="form-label">
                Penghasilan Bulanan
              </label>
              <select
                class="form-select"
                id="penghasilanBulanan"
                name="penghasilanBulanan"
              >
                <option value="">-- Pilih --</option>
                <option value="Di bawah 3 juta">Di bawah 3 juta</option>
                <option value="3 - 5 juta">3 - 5 juta</option>
                <option value="5 - 10 juta">5 - 10 juta</option>
                <option value="10 - 20 juta">10 - 20 juta</option>
                <option value="Di atas 20 juta">Di atas 20 juta</option>
                <option value="Tidak tetap">Tidak tetap</option>
              </select>
            </div>

            <!-- Status Tempat Tinggal (Opsional) -->
            <div class="col-md-6">
              <label for="statusRumah" class="form-label">
                Status Tempat Tinggal
              </label>
              <select
                class="form-select"
                id="statusRumah"
                name="statusRumah"
              >
                <option value="">-- Pilih --</option>
                <option value="Milik Sendiri">Milik Sendiri</option>
                <option value="Kontrak/Sewa">Kontrak/Sewa</option>
                <option value="Tinggal dengan Orang Tua">Tinggal dengan Orang Tua</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <!-- Status Izin Menikah (Wajib) -->
            <div class="col-md-6">
              <label for="statusIzin" class="form-label">
                Status Izin Menikah <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="statusIzin"
                name="statusIzin"
                required
              >
                <option value="">-- Pilih --</option>
                <option value="Sudah">Sudah</option>
                <option value="Belum">Belum</option>
                <option value="Proses">Proses</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Riwayat Pendidikan -->
      <div class="form-section-header">
        <h3><i class="bi bi-mortarboard"></i> 2. Riwayat Pendidikan</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- Pendidikan Terakhir (Wajib) -->
            <div class="col-12">
              <label for="pendidikanTerakhir" class="form-label">
                Pendidikan Terakhir <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="pendidikanTerakhir"
                name="pendidikanTerakhir"
                rows="3"
                required
                minlength="10"
                placeholder="Contoh: S1 Teknik Informatika, Universitas Indonesia (2015-2019), IPK 3.75"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi (minimal 10 karakter).</div>
            </div>

            <!-- Pendidikan Non-Formal (Opsional) -->
            <div class="col-12">
              <label for="pendidikanNonFormal" class="form-label">
                Pendidikan Non-Formal
              </label>
              <textarea
                class="form-control"
                id="pendidikanNonFormal"
                name="pendidikanNonFormal"
                rows="3"
                placeholder="Contoh: Kursus Full-Stack Development di Dicoding (2020), Sertifikat AWS Cloud Practitioner (2021)"
              ></textarea>
            </div>

            <!-- Prestasi / Keahlian (Opsional) -->
            <div class="col-12">
              <label for="prestasi" class="form-label">
                Prestasi / Keahlian
              </label>
              <textarea
                class="form-control"
                id="prestasi"
                name="prestasi"
                rows="3"
                placeholder="Contoh: Juara 2 Lomba Karya Tulis Ilmiah Nasional, Mahir JavaScript & Python, Bisa berbahasa Inggris (TOEFL 550)"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Informasi Keluarga -->
      <div class="form-section-header">
        <h3><i class="bi bi-people"></i> 3. Informasi Keluarga</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- Data Ayah (Wajib) -->
            <div class="col-12">
              <label for="infoAyah" class="form-label">
                Data Ayah <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="infoAyah"
                name="infoAyah"
                rows="3"
                required
                minlength="10"
                placeholder="Contoh: Bapak Ahmad bin Abdullah, Pegawai Swasta, Lahir di Bandung 1960"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi (minimal 10 karakter).</div>
            </div>

            <!-- Data Ibu (Wajib) -->
            <div class="col-12">
              <label for="infoIbu" class="form-label">
                Data Ibu <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="infoIbu"
                name="infoIbu"
                rows="3"
                required
                minlength="10"
                placeholder="Contoh: Ibu Fatimah binti Ahmad, Ibu Rumah Tangga, Lahir di Jakarta 1965"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi (minimal 10 karakter).</div>
            </div>

            <!-- Urutan Anak (Wajib) -->
            <div class="col-md-6">
              <label for="urutanAnak" class="form-label">
                Urutan Anak <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="urutanAnak"
                name="urutanAnak"
                required
                pattern="\\d+\\s+dari\\s+\\d+"
                placeholder="Contoh: 1 dari 3"
              />
              <div class="invalid-feedback">Format: "X dari Y" (contoh: 1 dari 3).</div>
            </div>

            <!-- Data Saudara (Opsional) -->
            <div class="col-12">
              <label for="infoSaudara" class="form-label">
                Data Saudara
              </label>
              <textarea
                class="form-control"
                id="infoSaudara"
                name="infoSaudara"
                rows="3"
                placeholder="Contoh: Kakak pertama (L) - Mahasiswa S2, Adik kedua (P) - SMA kelas 2"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 4: Ibadah & Agama -->
      <div class="form-section-header">
        <h3><i class="bi bi-moon-stars"></i> 4. Ibadah & Pemahaman Agama</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- Status Muallaf (Opsional) -->
            <div class="col-md-6">
              <label for="statusMuallaf" class="form-label">
                Status Muallaf
              </label>
              <input
                type="text"
                class="form-control"
                id="statusMuallaf"
                name="statusMuallaf"
                placeholder="Contoh: Muallaf sejak 2015"
              />
            </div>

            <!-- Shalat Wajib (Wajib) -->
            <div class="col-12">
              <label for="shalatWajib" class="form-label">
                Pelaksanaan Shalat Wajib <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="shalatWajib"
                name="shalatWajib"
                rows="2"
                required
                placeholder="Contoh: Alhamdulillah 5 waktu tepat waktu, di masjid untuk shalat Jumat"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Ibadah Sunnah (Opsional) -->
            <div class="col-12">
              <label for="ibadahSunnah" class="form-label">
                Kebiasaan Ibadah Sunnah
              </label>
              <textarea
                class="form-control"
                id="ibadahSunnah"
                name="ibadahSunnah"
                rows="2"
                placeholder="Contoh: Puasa Senin-Kamis, Shalat Tahajud, Qiyamullail"
              ></textarea>
            </div>

            <!-- Bacaan Al-Qur'an (Wajib) -->
            <div class="col-12">
              <label for="bacaanQuran" class="form-label">
                Kemampuan Baca Al-Qur'an <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="bacaanQuran"
                name="bacaanQuran"
                rows="2"
                required
                placeholder="Contoh: Alhamdulillah bisa membaca dengan tartil, sedang mempelajari tajwid"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Kajian Favorit (Opsional) -->
            <div class="col-md-6">
              <label for="kajianFavorit" class="form-label">
                Kajian / Ustadz Favorit
              </label>
              <textarea
                class="form-control"
                id="kajianFavorit"
                name="kajianFavorit"
                rows="2"
                placeholder="Contoh: Ustadz Adi Hidayat, Kajian Fiqih Keluarga"
              ></textarea>
            </div>

            <!-- Afiliasi Organisasi (Opsional) -->
            <div class="col-md-6">
              <label for="afiliasiOrganisasi" class="form-label">
                Organisasi Islam
              </label>
              <input
                type="text"
                class="form-control"
                id="afiliasiOrganisasi"
                name="afiliasiOrganisasi"
                placeholder="Contoh: Pemuda Masjid Al-Ikhlas, Relawan Dakwah"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section 5: Profil Diri & Kebiasaan -->
      <div class="form-section-header">
        <h3><i class="bi bi-card-text"></i> 5. Profil Diri & Kebiasaan</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- Hobi (Opsional) -->
            <div class="col-12">
              <label for="hobi" class="form-label">
                Hobi / Kegemaran
              </label>
              <input
                type="text"
                class="form-control"
                id="hobi"
                name="hobi"
                placeholder="Contoh: Membaca, Olahraga, Traveling, Menulis"
              />
            </div>

            <!-- Sifat Positif (Wajib) -->
            <div class="col-12">
              <label for="sifatPositif" class="form-label">
                Sifat Positif <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="sifatPositif"
                name="sifatPositif"
                rows="2"
                required
                placeholder="Contoh: Disiplin, bertanggung jawab, mudah bergaul, suka menolong"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Sifat Negatif (Wajib) -->
            <div class="col-12">
              <label for="sifatNegatif" class="form-label">
                Sifat Negatif <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="sifatNegatif"
                name="sifatNegatif"
                rows="2"
                required
                placeholder="Contoh: Kadang terlalu perfeksionis, susah tidur jika ada masalah"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Riwayat Penyakit (Opsional) -->
            <div class="col-12">
              <label for="riwayatPenyakit" class="form-label">
                Riwayat Penyakit
              </label>
              <textarea
                class="form-control"
                id="riwayatPenyakit"
                name="riwayatPenyakit"
                rows="2"
                placeholder="Contoh: Tidak ada, atau Pernah asma saat kecil (sudah sembuh)"
              ></textarea>
            </div>

            <!-- Kebiasaan Merokok (Wajib) -->
            <div class="col-md-6">
              <label for="merokok" class="form-label">
                Kebiasaan Merokok <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="merokok"
                name="merokok"
                required
              >
                <option value="">-- Pilih --</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Pernah (sudah berhenti)">Pernah (sudah berhenti)</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Status Hijab - Kondisional Perempuan -->
            <div class="col-md-6 conditional-field d-none" id="wrapper-statusHijab">
              <label for="statusHijab" class="form-label">
                Status Hijab (Akhwat) <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="statusHijab"
                name="statusHijab"
              >
                <option value="">-- Pilih --</option>
                <option value="Syar'i">Syar'i</option>
                <option value="Non-Syar'i">Non-Syar'i</option>
                <option value="Bercadar">Bercadar</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Status Jenggot - Kondisional Laki-laki -->
            <div class="col-md-6 conditional-field d-none" id="wrapper-statusJenggot">
              <label for="statusJenggot" class="form-label">
                Status Jenggot (Ikhwan) <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="statusJenggot"
                name="statusJenggot"
              >
                <option value="">-- Pilih --</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Visi Misi Hidup (Opsional) -->
            <div class="col-12">
              <label for="visiMisiHidup" class="form-label">
                Visi Misi Hidup
              </label>
              <textarea
                class="form-control"
                id="visiMisiHidup"
                name="visiMisiHidup"
                rows="3"
                placeholder="Contoh: Menjadi hamba Allah yang taat, bermanfaat untuk sesama, dan membangun keluarga sakinah"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 6: Visi Pernikahan -->
      <div class="form-section-header">
        <h3><i class="bi bi-heart"></i> 6. Visi Pernikahan</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- Visi & Misi Pernikahan (Wajib) -->
            <div class="col-12">
              <label for="visiPernikahan" class="form-label">
                Visi & Misi Pernikahan <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="visiPernikahan"
                name="visiPernikahan"
                rows="3"
                required
                minlength="20"
                placeholder="Contoh: Membangun keluarga yang sakinah mawaddah warahmah, saling mengingatkan dalam kebaikan, mendidik anak-anak menjadi generasi Rabbani"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi (minimal 20 karakter).</div>
            </div>

            <!-- Kriteria Calon Pasangan (Wajib) -->
            <div class="col-12">
              <label for="kriteriaPasangan" class="form-label">
                Kriteria Calon Pasangan <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                id="kriteriaPasangan"
                name="kriteriaPasangan"
                rows="3"
                required
                minlength="20"
                placeholder="Contoh: Beriman dan bertakwa, menjaga ibadah, memiliki akhlak yang baik, bisa menjadi imam/pemimpin keluarga, saling mendukung dalam mencapai tujuan"
              ></textarea>
              <div class="invalid-feedback">Kolom ini wajib diisi (minimal 20 karakter).</div>
            </div>

            <!-- Pandangan tentang Mahar (Opsional) -->
            <div class="col-12">
              <label for="pandanganMahar" class="form-label">
                Pandangan tentang Mahar
              </label>
              <textarea
                class="form-control"
                id="pandanganMahar"
                name="pandanganMahar"
                rows="2"
                placeholder="Contoh: Mahar sesuai kemampuan, yang penting adalah kesungguhan dan tanggung jawab"
              ></textarea>
            </div>

            <!-- Kesediaan Poligami - Kondisional Laki-laki -->
            <div class="col-md-6 conditional-field d-none" id="wrapper-kesediaanPoligami">
              <label for="kesediaanPoligami" class="form-label">
                Pandangan Poligami (Ikhwan) <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="kesediaanPoligami"
                name="kesediaanPoligami"
              >
                <option value="">-- Pilih --</option>
                <option value="Bersedia">Bersedia</option>
                <option value="Tidak Bersedia">Tidak Bersedia</option>
                <option value="Kondisional">Kondisional</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Kesediaan Dipoligami - Kondisional Perempuan -->
            <div class="col-md-6 conditional-field d-none" id="wrapper-kesediaanDipoligami">
              <label for="kesediaanDipoligami" class="form-label">
                Kesediaan Dipoligami (Akhwat) <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="kesediaanDipoligami"
                name="kesediaanDipoligami"
              >
                <option value="">-- Pilih --</option>
                <option value="Bersedia">Bersedia</option>
                <option value="Tidak Bersedia">Tidak Bersedia</option>
                <option value="Kondisional">Kondisional</option>
              </select>
              <div class="invalid-feedback">Kolom ini wajib diisi.</div>
            </div>

            <!-- Pandangan Istri Bekerja (Opsional) -->
            <div class="col-md-6">
              <label for="pandanganNafkah" class="form-label">
                Pandangan Istri Bekerja
              </label>
              <select
                class="form-select"
                id="pandanganNafkah"
                name="pandanganNafkah"
              >
                <option value="">-- Pilih --</option>
                <option value="IRT Penuh">IRT Penuh</option>
                <option value="Boleh Bekerja">Boleh Bekerja</option>
                <option value="Kondisional">Kondisional</option>
              </select>
            </div>

            <!-- Kesediaan Pindah Domisili (Opsional) -->
            <div class="col-md-6">
              <label for="kesediaanPindah" class="form-label">
                Kesediaan Pindah Domisili
              </label>
              <select
                class="form-select"
                id="kesediaanPindah"
                name="kesediaanPindah"
              >
                <option value="">-- Pilih --</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Bisa Didiskusikan">Bisa Didiskusikan</option>
              </select>
            </div>

            <!-- Target Waktu Menikah (Opsional) -->
            <div class="col-md-6">
              <label for="targetMenikah" class="form-label">
                Target Waktu Menikah
              </label>
              <input
                type="text"
                class="form-control"
                id="targetMenikah"
                name="targetMenikah"
                placeholder="Contoh: 6 bulan, atau Secepat mungkin jika ada jodoh"
              />
            </div>

            <!-- Rencana Setelah Menikah (Opsional) -->
            <div class="col-12">
              <label for="rencanaSetelahMenikah" class="form-label">
                Rencana Pasca Nikah
              </label>
              <textarea
                class="form-control"
                id="rencanaSetelahMenikah"
                name="rencanaSetelahMenikah"
                rows="3"
                placeholder="Contoh: Tinggal bersama orang tua selama 1 tahun, lalu mencari rumah sendiri, fokus membangun karier dan finansial keluarga"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 7: Informasi Kontak -->
      <div class="form-section-header">
        <h3><i class="bi bi-telephone"></i> 7. Informasi Kontak</h3>
      </div>
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <!-- No WhatsApp (Opsional) -->
            <div class="col-md-6">
              <label for="noHP" class="form-label">
                No WhatsApp Aktif
              </label>
              <input
                type="tel"
                class="form-control"
                id="noHP"
                name="noHP"
                pattern="[0-9]{10,15}"
                placeholder="Contoh: 081234567890"
              />
              <div class="invalid-feedback">Gunakan angka saja (10-15 digit).</div>
            </div>

            <!-- Email (Opsional) -->
            <div class="col-md-6">
              <label for="email" class="form-label">
                Alamat Email
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Contoh: ahmad.fauzi@email.com"
              />
              <div class="invalid-feedback">Format email tidak valid.</div>
            </div>

            <!-- Akun Media Sosial (Opsional) -->
            <div class="col-md-6">
              <label for="akunSosmed" class="form-label">
                Akun Media Sosial
              </label>
              <input
                type="text"
                class="form-control"
                id="akunSosmed"
                name="akunSosmed"
                placeholder="Contoh: @ahmad_fauzi (Instagram)"
              />
            </div>

            <!-- Kontak Wali (Opsional) -->
            <div class="col-md-6">
              <label for="kontakWali" class="form-label">
                Kontak Wali / Mediator
              </label>
              <input
                type="text"
                class="form-control"
                id="kontakWali"
                name="kontakWali"
                placeholder="Contoh: Bapak Abdullah (081234567890)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Bar (Sticky Bottom) -->
      <div class="action-bar">
        <div class="d-flex justify-content-between flex-wrap gap-2">
          <button type="button" class="btn btn-outline-secondary" id="btn-reset-form">
            <i class="bi bi-arrow-clockwise"></i> Reset Form
          </button>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-primary" id="btn-save-draft">
              <i class="bi bi-save"></i> Simpan Draft
            </button>
            <button type="submit" class="btn btn-primary" id="btn-preview">
              <i class="bi bi-eye"></i> Preview CV
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- Spacing for sticky action bar -->
    <div style="height: 80px;"></div>
  `;

  // Set max date for tanggalLahir (today)
  const today = new Date().toISOString().split("T")[0];
  const tanggalLahirInput = document.getElementById("tanggalLahir");
  if (tanggalLahirInput) {
    tanggalLahirInput.setAttribute("max", today);
  }

  // Attach event listeners
  attachEventListeners();
}

/**
 * Attach event listeners for form interactions
 */
function attachEventListeners() {
  const form = document.getElementById("cv-form");
  const btnReset = document.getElementById("btn-reset-form");
  const btnSaveDraft = document.getElementById("btn-save-draft");

  // Conditional logic handlers
  const jenisKelaminSelect = document.getElementById("jenisKelamin");
  const statusPernikahanSelect = document.getElementById("statusPernikahan");

  if (jenisKelaminSelect) {
    jenisKelaminSelect.addEventListener("change", handleGenderChange);
  }

  if (statusPernikahanSelect) {
    statusPernikahanSelect.addEventListener(
      "change",
      handleMaritalStatusChange
    );
  }

  // Attach real-time validation to all form fields
  attachValidationListeners(form);

  // Form submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit();
    });
  }

  // Reset button with confirmation
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      handleResetForm();
    });
  }

  // Save draft button
  if (btnSaveDraft) {
    btnSaveDraft.addEventListener("click", () => {
      handleSaveDraft();
    });
  }
}

/**
 * Handle gender change for conditional fields
 * @param {Event} event - Change event
 */
function handleGenderChange(event) {
  const gender = event.target.value;

  // Ikhwan (Laki-laki) fields
  const wrapperJenggot = document.getElementById("wrapper-statusJenggot");
  const wrapperPoligami = document.getElementById("wrapper-kesediaanPoligami");
  const fieldJenggot = document.getElementById("statusJenggot");
  const fieldPoligami = document.getElementById("kesediaanPoligami");

  // Akhwat (Perempuan) fields
  const wrapperHijab = document.getElementById("wrapper-statusHijab");
  const wrapperDipoligami = document.getElementById(
    "wrapper-kesediaanDipoligami"
  );
  const fieldHijab = document.getElementById("statusHijab");
  const fieldDipoligami = document.getElementById("kesediaanDipoligami");

  if (gender === "Laki-laki") {
    // Show Ikhwan fields
    wrapperJenggot.classList.remove("d-none");
    wrapperPoligami.classList.remove("d-none");
    fieldJenggot.setAttribute("required", "required");
    fieldPoligami.setAttribute("required", "required");

    // Hide Akhwat fields
    wrapperHijab.classList.add("d-none");
    wrapperDipoligami.classList.add("d-none");
    fieldHijab.removeAttribute("required");
    fieldDipoligami.removeAttribute("required");
    fieldHijab.value = "";
    fieldDipoligami.value = "";
  } else if (gender === "Perempuan") {
    // Show Akhwat fields
    wrapperHijab.classList.remove("d-none");
    wrapperDipoligami.classList.remove("d-none");
    fieldHijab.setAttribute("required", "required");
    fieldDipoligami.setAttribute("required", "required");

    // Hide Ikhwan fields
    wrapperJenggot.classList.add("d-none");
    wrapperPoligami.classList.add("d-none");
    fieldJenggot.removeAttribute("required");
    fieldPoligami.removeAttribute("required");
    fieldJenggot.value = "";
    fieldPoligami.value = "";
  } else {
    // Hide all conditional fields if no gender selected
    wrapperJenggot.classList.add("d-none");
    wrapperPoligami.classList.add("d-none");
    wrapperHijab.classList.add("d-none");
    wrapperDipoligami.classList.add("d-none");
    fieldJenggot.removeAttribute("required");
    fieldPoligami.removeAttribute("required");
    fieldHijab.removeAttribute("required");
    fieldDipoligami.removeAttribute("required");
  }
}

/**
 * Handle marital status change for conditional fields
 * @param {Event} event - Change event
 */
function handleMaritalStatusChange(event) {
  const status = event.target.value;
  const wrapperJumlahAnak = document.getElementById("wrapper-jumlahAnak");
  const fieldJumlahAnak = document.getElementById("jumlahAnak");

  if (status === "Duda" || status === "Janda") {
    // Show jumlahAnak field
    wrapperJumlahAnak.classList.remove("d-none");
    fieldJumlahAnak.setAttribute("required", "required");
  } else {
    // Hide jumlahAnak field
    wrapperJumlahAnak.classList.add("d-none");
    fieldJumlahAnak.removeAttribute("required");
    fieldJumlahAnak.value = "";
  }
}

/**
 * Attach real-time validation listeners to all form fields
 * @param {HTMLFormElement} form - Form element
 */
function attachValidationListeners(form) {
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    // Validate on blur (when user leaves the field)
    field.addEventListener("blur", () => {
      validateField(field);
    });

    // Clear error on input (when user starts typing)
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) {
        clearFieldError(field);
      }
    });
  });
}

/**
 * Collect all form data into an object
 * @returns {Object} Form data object
 */
function collectFormData() {
  const form = document.getElementById("cv-form");
  const formData = {};

  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    const name = field.name || field.id;
    const value = field.value.trim();

    // Skip hidden conditional fields or empty values
    if (field.closest(".d-none") || !name) {
      return;
    }

    // Store value (empty string for optional fields)
    formData[name] = value;
  });

  return formData;
}

/**
 * Handle save draft button click
 */
function handleSaveDraft() {
  const btnSave = document.getElementById("btn-save-draft");

  const formData = collectFormData();

  // Check if at least some data is filled
  const hasData = Object.values(formData).some((value) => value !== "");

  if (!hasData) {
    showToast("Tidak ada data untuk disimpan", "warning");
    return;
  }

  // Show loading state
  setButtonLoading(btnSave, "Menyimpan...");

  // Simulate async operation with setTimeout
  setTimeout(() => {
    // Save to localStorage
    const result = saveDraft(formData);

    // Reset button state
    resetButtonLoading(btnSave);

    if (result.success) {
      showToast(
        "Draft berhasil disimpan! Anda dapat melanjutkan nanti.",
        "success"
      );
      console.log("[FormView] Draft saved with ID:", result.data?.id);
    } else {
      showToast(result.message || "Gagal menyimpan draft", "error");
      console.error("[FormView] Save draft failed:", result);
    }
  }, 500);
}

/**
 * Load draft data into form
 * @param {Object} draftData - Draft data object
 */
export function loadDraftToForm(draftData) {
  const form = document.getElementById("cv-form");
  if (!form || !draftData) return;

  // Populate each field
  Object.keys(draftData).forEach((key) => {
    const field = form.querySelector(`[name="${key}"], #${key}`);
    if (field && draftData[key]) {
      field.value = draftData[key];

      // Trigger change event for conditional fields
      if (key === "jenisKelamin" || key === "statusPernikahan") {
        field.dispatchEvent(new Event("change"));
      }
    }
  });

  console.log("[FormView] Draft loaded successfully");
  showToast("Draft berhasil dimuat", "success");
}

/**
 * Handle form submission (Preview CV)
 */
function handleFormSubmit() {
  const form = document.getElementById("cv-form");

  // Run full form validation
  const validationResult = validateForm(form);

  if (!validationResult.isValid) {
    // Show error toast
    showToast(
      "Form belum lengkap. Periksa field yang ditandai merah.",
      "error"
    );

    // Scroll to first invalid field
    if (validationResult.firstInvalidField) {
      validationResult.firstInvalidField.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      validationResult.firstInvalidField.focus();
    }

    return;
  }

  // Collect form data
  const formData = collectFormData();

  // Save to sessionStorage for preview page
  try {
    sessionStorage.setItem("taaruf_cv_temp_data", JSON.stringify(formData));
    console.log("[FormView] Form data saved to sessionStorage");

    // Navigate to preview page
    navigateTo("/preview");
  } catch (error) {
    console.error("[FormView] Error saving to sessionStorage:", error);
    showToast("Gagal menyimpan data. Silakan coba lagi.", "error");
  }
}

/**
 * Handle reset form with confirmation
 */
function handleResetForm() {
  // Use browser confirm for simplicity (can use ModalConfirm in Phase 5)
  if (confirm("Apakah Anda yakin ingin mereset semua isian form?")) {
    const form = document.getElementById("cv-form");
    form.reset();

    // Reset conditional fields
    handleGenderChange({ target: { value: "" } });
    handleMaritalStatusChange({ target: { value: "Lajang" } });

    // Clear all validation states
    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach((field) => clearFieldError(field));

    console.log("[FormView] Form reset");
    showToast("Form berhasil direset", "info");
  }
}

/**
 * Initialize Form View
 */
function initFormView() {
  renderFormView();

  // Check if there's a draft to load from sessionStorage
  const draftToLoad = sessionStorage.getItem("taaruf_cv_draft_to_load");
  if (draftToLoad) {
    try {
      const draftData = JSON.parse(draftToLoad);

      // Wait for form to be fully rendered before loading
      setTimeout(() => {
        loadDraftToForm(draftData);
        // Clear sessionStorage after loading
        sessionStorage.removeItem("taaruf_cv_draft_to_load");
      }, 100);
    } catch (error) {
      console.error("[FormView] Error loading draft:", error);
      showToast("Gagal memuat draft", "error");
    }
  }

  console.log("[FormView] Form view initialized");
}

// Listen for view change event
window.addEventListener("viewChanged", (e) => {
  if (e.detail.viewId === "view-form") {
    initFormView();
  }
});

export { renderFormView, initFormView };

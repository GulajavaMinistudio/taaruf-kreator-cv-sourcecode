/**
 * @file cvGeneratorService.js
 * @description CV Text Generator Service - Transform form data to formatted plain text CV
 * @version 1.0
 * @date 2025-12-08
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Indonesian month names for date formatting
 */
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format tanggal dari YYYY-MM-DD ke format Indonesia "DD MMMM YYYY"
 * @param {string} dateString - Tanggal dalam format ISO (YYYY-MM-DD)
 * @returns {string} - Tanggal dalam format "DD MMMM YYYY" atau "-" jika invalid
 * @example
 * formatDate('1995-08-17') // returns "17 Agustus 1995"
 * formatDate('') // returns "-"
 * formatDate(null) // returns "-"
 */
export function formatDate(dateString) {
  // Handle empty values
  if (!dateString || dateString === "") {
    return "-";
  }

  try {
    // Split date string
    const parts = dateString.split("-");

    // Validate format
    if (parts.length !== 3) {
      return "-";
    }

    const [year, month, day] = parts;

    // Parse and validate
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    // Validate ranges
    if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
      return "-";
    }

    if (monthNum < 1 || monthNum > 12) {
      return "-";
    }

    if (dayNum < 1 || dayNum > 31) {
      return "-";
    }

    // Format and return
    return `${dayNum} ${MONTH_NAMES[monthNum - 1]} ${yearNum}`;
  } catch (error) {
    console.error("[cvGeneratorService] Error formatting date:", error);
    return "-";
  }
}

/**
 * Return value atau "-" jika kosong (null, undefined, empty string)
 * @param {any} value - Nilai yang akan diformat
 * @returns {string} - Nilai atau "-"
 * @example
 * formatEmpty('John') // returns "John"
 * formatEmpty('') // returns "-"
 * formatEmpty(null) // returns "-"
 * formatEmpty(undefined) // returns "-"
 */
export function formatEmpty(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  return String(value).trim();
}

/**
 * Get current date in Indonesian format "DD MMMM YYYY"
 * @returns {string} - Tanggal saat ini dalam format Indonesia
 * @example
 * getCurrentDate() // returns "8 Desember 2025"
 */
export function getCurrentDate() {
  const now = new Date();
  const day = now.getDate();
  const month = MONTH_NAMES[now.getMonth()];
  const year = now.getFullYear();

  return `${day} ${month} ${year}`;
}

// ============================================================================
// MAIN GENERATOR FUNCTION
// ============================================================================

/**
 * Generate formatted CV text from form data
 * @param {Object} data - Form data object with 49 fields
 * @returns {string} - Formatted CV text ready for copy-paste
 */
export function generateCV(data) {
  // Validate input
  if (!data || typeof data !== "object") {
    console.error("[cvGeneratorService] Invalid data object provided");
    return "";
  }

  // Setup conditional flags
  const isLakiLaki = data.jenisKelamin === "Laki-laki";
  const isPerempuan = data.jenisKelamin === "Perempuan";
  const isDudaJanda =
    data.statusPernikahan === "Duda" || data.statusPernikahan === "Janda";

  // Format tanggal lahir
  const tanggalLahirFormatted = formatDate(data.tanggalLahir);

  // Get current date for header
  const currentDate = getCurrentDate();

  // Build CV text using template literals
  let cvText = "";

  // ========================================================================
  // HEADER
  // ========================================================================
  cvText +=
    "================================================================\n";
  cvText += "                    CURRICULUM VITAE TA'ARUF\n";
  cvText +=
    "================================================================\n";
  cvText += `Tanggal Pembuatan: ${currentDate}\n\n`;

  // ========================================================================
  // SECTION I: DATA PRIBADI
  // ========================================================================
  cvText += "I. DATA PRIBADI\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += `Nama Lengkap        : ${formatEmpty(data.namaLengkap)}\n`;
  cvText += `Nama Panggilan      : ${formatEmpty(data.namaPanggilan)}\n`;
  cvText += `Tempat, Tgl Lahir   : ${formatEmpty(
    data.tempatLahir
  )}, ${tanggalLahirFormatted}\n`;
  cvText += `Jenis Kelamin       : ${formatEmpty(data.jenisKelamin)}\n`;
  cvText += `Tinggi / Berat      : ${formatEmpty(
    data.tinggiBadan
  )} cm / ${formatEmpty(data.beratBadan)} kg\n`;
  cvText += `Warna Kulit         : ${formatEmpty(data.warnaKulit)}\n`;
  cvText += `Suku Bangsa         : ${formatEmpty(data.suku)}\n`;
  cvText += `Domisili Saat Ini   : ${formatEmpty(data.domisili)}\n`;
  cvText += `Asal Daerah         : ${formatEmpty(data.asalDaerah)}\n`;
  cvText += `Pekerjaan           : ${formatEmpty(data.pekerjaan)}\n`;
  cvText += `Pengalaman Kerja    : ${formatEmpty(data.pengalamanKerja)}\n`;
  cvText += `Penghasilan Bulanan : ${formatEmpty(data.penghasilanBulanan)}\n`;
  cvText += `Status Tempat Tinggal: ${formatEmpty(data.statusRumah)}\n`;
  cvText += `Status Pernikahan   : ${formatEmpty(data.statusPernikahan)}\n`;

  // Conditional: Jumlah Anak (only if Duda/Janda)
  if (isDudaJanda) {
    cvText += `Jumlah Anak         : ${formatEmpty(data.jumlahAnak)}\n`;
  }

  cvText += `Pernah Khitbah      : ${formatEmpty(data.pernahKhitbah)}\n`;
  cvText += `Status Izin Wali    : ${formatEmpty(data.statusIzin)}\n\n`;

  // ========================================================================
  // SECTION II: RIWAYAT PENDIDIKAN
  // ========================================================================
  cvText += "II. RIWAYAT PENDIDIKAN\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += "Pendidikan Terakhir:\n";
  cvText += `${formatEmpty(data.pendidikanTerakhir)}\n\n`;
  cvText += "Pendidikan Non-Formal:\n";
  cvText += `${formatEmpty(data.pendidikanNonFormal)}\n\n`;
  cvText += "Prestasi / Keahlian Khusus:\n";
  cvText += `${formatEmpty(data.prestasi)}\n\n`;

  // ========================================================================
  // SECTION III: INFORMASI KELUARGA
  // ========================================================================
  cvText += "III. INFORMASI KELUARGA\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += "Data Ayah:\n";
  cvText += `${formatEmpty(data.infoAyah)}\n\n`;
  cvText += "Data Ibu:\n";
  cvText += `${formatEmpty(data.infoIbu)}\n\n`;
  cvText += `Anak ke: ${formatEmpty(data.urutanAnak)}\n\n`;
  cvText += "Data Saudara:\n";
  cvText += `${formatEmpty(data.infoSaudara)}\n\n`;

  // ========================================================================
  // SECTION IV: IBADAH & PEMAHAMAN AGAMA
  // ========================================================================
  cvText += "IV. IBADAH & PEMAHAMAN AGAMA\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += `Status Muallaf      : ${formatEmpty(data.statusMuallaf)}\n\n`;
  cvText += "Pelaksanaan Shalat Wajib:\n";
  cvText += `${formatEmpty(data.shalatWajib)}\n\n`;
  cvText += "Kebiasaan Ibadah Sunnah:\n";
  cvText += `${formatEmpty(data.ibadahSunnah)}\n\n`;
  cvText += "Kemampuan Baca Al-Qur'an & Hafalan:\n";
  cvText += `${formatEmpty(data.bacaanQuran)}\n\n`;
  cvText += "Kajian / Ustadz Favorit:\n";
  cvText += `${formatEmpty(data.kajianFavorit)}\n\n`;
  cvText += "Organisasi / Komunitas Islam:\n";
  cvText += `${formatEmpty(data.afiliasiOrganisasi)}\n\n`;

  // ========================================================================
  // SECTION V: PROFIL DIRI & KEBIASAAN
  // ========================================================================
  cvText += "V. PROFIL DIRI & KEBIASAAN\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += `Hobi / Kegemaran    : ${formatEmpty(data.hobi)}\n`;
  cvText += `Merokok             : ${formatEmpty(data.merokok)}\n`;

  // Conditional: Status Jenggot (only if Laki-laki)
  if (isLakiLaki) {
    cvText += `Status Jenggot      : ${formatEmpty(data.statusJenggot)}\n`;
  }

  // Conditional: Status Hijab (only if Perempuan)
  if (isPerempuan) {
    cvText += `Status Hijab        : ${formatEmpty(data.statusHijab)}\n`;
  }

  cvText += "\n";
  cvText += "Sifat Positif (Kelebihan):\n";
  cvText += `${formatEmpty(data.sifatPositif)}\n\n`;
  cvText += "Sifat Negatif (Kekurangan):\n";
  cvText += `${formatEmpty(data.sifatNegatif)}\n\n`;
  cvText += "Riwayat Penyakit:\n";
  cvText += `${formatEmpty(data.riwayatPenyakit)}\n\n`;
  cvText += "Visi Misi Hidup:\n";
  cvText += `${formatEmpty(data.visiMisiHidup)}\n\n`;

  // ========================================================================
  // SECTION VI: VISI PERNIKAHAN
  // ========================================================================
  cvText += "VI. VISI PERNIKAHAN\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += "Visi & Misi Pernikahan:\n";
  cvText += `${formatEmpty(data.visiPernikahan)}\n\n`;
  cvText += "Kriteria Calon Pasangan:\n";
  cvText += `${formatEmpty(data.kriteriaPasangan)}\n\n`;
  cvText += "Pandangan tentang Mahar:\n";
  cvText += `${formatEmpty(data.pandanganMahar)}\n\n`;

  // Conditional: Pandangan Poligami (only if Laki-laki)
  if (isLakiLaki) {
    cvText += `Pandangan tentang Poligami: ${formatEmpty(
      data.kesediaanPoligami
    )}\n`;
  }

  // Conditional: Kesediaan Dipoligami (only if Perempuan)
  if (isPerempuan) {
    cvText += `Kesediaan Dipoligami: ${formatEmpty(
      data.kesediaanDipoligami
    )}\n`;
  }

  cvText += `Pandangan Istri Bekerja: ${formatEmpty(data.pandanganNafkah)}\n`;
  cvText += `Kesediaan Pindah Domisili: ${formatEmpty(data.kesediaanPindah)}\n`;
  cvText += `Target Waktu Menikah: ${formatEmpty(data.targetMenikah)}\n\n`;
  cvText += "Rencana Setelah Menikah:\n";
  cvText += `${formatEmpty(data.rencanaSetelahMenikah)}\n\n`;

  // ========================================================================
  // SECTION VII: KONTAK
  // ========================================================================
  cvText += "VII. KONTAK (Untuk Keperluan Mediator)\n";
  cvText +=
    "----------------------------------------------------------------\n";
  cvText += `No HP/WhatsApp  : ${formatEmpty(data.noHP)}\n`;
  cvText += `Email           : ${formatEmpty(data.email)}\n`;
  cvText += `Akun Sosmed     : ${formatEmpty(data.akunSosmed)}\n`;
  cvText += `Kontak Wali     : ${formatEmpty(data.kontakWali)}\n\n`;

  // ========================================================================
  // FOOTER
  // ========================================================================
  cvText +=
    "================================================================\n";
  cvText += "*Data ini diisi dengan sebenar-benarnya dan dapat\n";
  cvText += "dipertanggungjawabkan.*\n";
  cvText +=
    "================================================================\n";

  return cvText;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  generateCV,
  formatDate,
  formatEmpty,
  getCurrentDate,
};

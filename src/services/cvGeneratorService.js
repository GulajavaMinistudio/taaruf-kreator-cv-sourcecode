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
export const formatDate = (dateString) => {
  if (!dateString || dateString === "") return "-";

  try {
    const parts = dateString.split("-");
    if (parts.length !== 3) return "-";

    const [year, month, day] = parts;
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) return "-";
    if (monthNum < 1 || monthNum > 12) return "-";
    if (dayNum < 1 || dayNum > 31) return "-";

    return `${dayNum} ${MONTH_NAMES[monthNum - 1]} ${yearNum}`;
  } catch (error) {
    console.error("[cvGeneratorService] Error formatting date:", error);
    return "-";
  }
};

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
export const formatEmpty = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  return String(value).trim();
};

/**
 * Get current date in Indonesian format "DD MMMM YYYY"
 * @returns {string} - Tanggal saat ini dalam format Indonesia
 * @example
 * getCurrentDate() // returns "8 Desember 2025"
 */
export const getCurrentDate = () => {
  const now = new Date();
  const day = now.getDate();
  const month = MONTH_NAMES[now.getMonth()];
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Build section header with title and separator
 * @private
 * @param {string} title - Section title
 * @returns {string} - Formatted section header
 */
const buildSectionHeader = (title) => {
  return `${title}\n${"-".repeat(64)}\n`;
};

/**
 * Build field line with label and value (label padded to 20 chars)
 * @private
 * @param {string} label - Field label
 * @param {string} value - Field value
 * @returns {string} - Formatted field line
 */
const buildFieldLine = (label, value) => {
  return `${label.padEnd(20)}: ${value}\n`;
};

/**
 * Build multiline field (e.g., textarea content)
 * @private
 * @param {string} label - Field label
 * @param {string} value - Field value (multiline)
 * @returns {string} - Formatted multiline field
 */
const buildMultilineField = (label, value) => {
  return `${label}:\n${value}\n\n`;
};

/**
 * Build CV header with title and date
 * @private
 * @param {string} currentDate - Current date formatted
 * @returns {string} - Formatted header
 */
const buildHeader = (currentDate) => {
  const divider = "=".repeat(64);
  return [
    divider,
    "                    CURRICULUM VITAE TA'ARUF",
    divider,
    `Tanggal Pembuatan: ${currentDate}`,
    "",
  ].join("\n");
};

/**
 * Build personal data section (Section I)
 * @private
 * @param {Object} data - Form data
 * @param {string} tanggalLahirFormatted - Formatted birth date
 * @returns {string} - Formatted section
 */
const buildPersonalDataSection = (data, tanggalLahirFormatted) => {
  const lines = [
    buildSectionHeader("I. DATA PRIBADI"),
    buildFieldLine("Nama Lengkap", formatEmpty(data.namaLengkap)),
    buildFieldLine("Nama Panggilan", formatEmpty(data.namaPanggilan)),
    buildFieldLine(
      "Tempat, Tgl Lahir",
      `${formatEmpty(data.tempatLahir)}, ${tanggalLahirFormatted}`
    ),
    buildFieldLine("Jenis Kelamin", formatEmpty(data.jenisKelamin)),
    buildFieldLine(
      "Tinggi / Berat",
      `${formatEmpty(data.tinggiBadan)} cm / ${formatEmpty(data.beratBadan)} kg`
    ),
    buildFieldLine("Warna Kulit", formatEmpty(data.warnaKulit)),
    buildFieldLine("Suku Bangsa", formatEmpty(data.suku)),
    buildFieldLine("Domisili Saat Ini", formatEmpty(data.domisili)),
    buildFieldLine("Asal Daerah", formatEmpty(data.asalDaerah)),
    buildFieldLine("Pekerjaan", formatEmpty(data.pekerjaan)),
    buildFieldLine("Pengalaman Kerja", formatEmpty(data.pengalamanKerja)),
    buildFieldLine("Penghasilan Bulanan", formatEmpty(data.penghasilanBulanan)),
    buildFieldLine("Status Tempat Tinggal", formatEmpty(data.statusRumah)),
    buildFieldLine("Status Pernikahan", formatEmpty(data.statusPernikahan)),
  ];

  // Conditional: Jumlah Anak
  if (data.statusPernikahan === "Duda" || data.statusPernikahan === "Janda") {
    lines.push(buildFieldLine("Jumlah Anak", formatEmpty(data.jumlahAnak)));
  }

  lines.push(
    buildFieldLine("Pernah Khitbah", formatEmpty(data.pernahKhitbah)),
    buildFieldLine("Status Izin Wali", formatEmpty(data.statusIzin)),
    "\n"
  );

  return lines.join("");
};

/**
 * Build education section (Section II)
 * @private
 * @param {Object} data - Form data
 * @returns {string} - Formatted section
 */
const buildEducationSection = (data) => {
  return [
    buildSectionHeader("II. RIWAYAT PENDIDIKAN"),
    buildMultilineField(
      "Pendidikan Terakhir",
      formatEmpty(data.pendidikanTerakhir)
    ),
    buildMultilineField(
      "Pendidikan Non-Formal",
      formatEmpty(data.pendidikanNonFormal)
    ),
    buildMultilineField(
      "Prestasi / Keahlian Khusus",
      formatEmpty(data.prestasi)
    ),
  ].join("");
};

/**
 * Build family information section (Section III)
 * @private
 * @param {Object} data - Form data
 * @returns {string} - Formatted section
 */
const buildFamilySection = (data) => {
  return [
    buildSectionHeader("III. INFORMASI KELUARGA"),
    buildMultilineField("Data Ayah", formatEmpty(data.infoAyah)),
    buildMultilineField("Data Ibu", formatEmpty(data.infoIbu)),
    `Anak ke: ${formatEmpty(data.urutanAnak)}\n\n`,
    buildMultilineField("Data Saudara", formatEmpty(data.infoSaudara)),
  ].join("");
};

/**
 * Build religion & worship section (Section IV)
 * @private
 * @param {Object} data - Form data
 * @returns {string} - Formatted section
 */
const buildReligionSection = (data) => {
  return [
    buildSectionHeader("IV. IBADAH & PEMAHAMAN AGAMA"),
    buildFieldLine("Status Muallaf", formatEmpty(data.statusMuallaf)),
    "\n",
    buildMultilineField(
      "Pelaksanaan Shalat Wajib",
      formatEmpty(data.shalatWajib)
    ),
    buildMultilineField(
      "Kebiasaan Ibadah Sunnah",
      formatEmpty(data.ibadahSunnah)
    ),
    buildMultilineField(
      "Kemampuan Baca Al-Qur'an & Hafalan",
      formatEmpty(data.bacaanQuran)
    ),
    buildMultilineField(
      "Kajian / Ustadz Favorit",
      formatEmpty(data.kajianFavorit)
    ),
    buildMultilineField(
      "Organisasi / Komunitas Islam",
      formatEmpty(data.afiliasiOrganisasi)
    ),
  ].join("");
};

/**
 * Build profile & habits section (Section V)
 * @private
 * @param {Object} data - Form data
 * @returns {string} - Formatted section
 */
const buildProfileSection = (data) => {
  const lines = [
    buildSectionHeader("V. PROFIL DIRI & KEBIASAAN"),
    buildFieldLine("Hobi / Kegemaran", formatEmpty(data.hobi)),
    buildFieldLine("Merokok", formatEmpty(data.merokok)),
  ];

  // Conditional gender-specific fields
  if (data.jenisKelamin === "Laki-laki") {
    lines.push(
      buildFieldLine("Status Jenggot", formatEmpty(data.statusJenggot))
    );
  }

  if (data.jenisKelamin === "Perempuan") {
    lines.push(buildFieldLine("Status Hijab", formatEmpty(data.statusHijab)));
  }

  lines.push(
    "\n",
    buildMultilineField(
      "Sifat Positif (Kelebihan)",
      formatEmpty(data.sifatPositif)
    ),
    buildMultilineField(
      "Sifat Negatif (Kekurangan)",
      formatEmpty(data.sifatNegatif)
    ),
    buildMultilineField("Riwayat Penyakit", formatEmpty(data.riwayatPenyakit)),
    buildMultilineField("Visi Misi Hidup", formatEmpty(data.visiMisiHidup))
  );

  return lines.join("");
};

/**
 * Build marriage vision section (Section VI)
 * @private
 * @param {Object} data - Form data
 * @returns {string} - Formatted section
 */
const buildMarriageVisionSection = (data) => {
  const lines = [
    buildSectionHeader("VI. VISI PERNIKAHAN"),
    buildMultilineField(
      "Visi & Misi Pernikahan",
      formatEmpty(data.visiPernikahan)
    ),
    buildMultilineField(
      "Kriteria Calon Pasangan",
      formatEmpty(data.kriteriaPasangan)
    ),
    buildMultilineField(
      "Pandangan tentang Mahar",
      formatEmpty(data.pandanganMahar)
    ),
  ];

  // Conditional gender-specific polygamy fields
  if (data.jenisKelamin === "Laki-laki") {
    lines.push(
      buildFieldLine(
        "Pandangan tentang Poligami",
        formatEmpty(data.kesediaanPoligami)
      )
    );
  }

  if (data.jenisKelamin === "Perempuan") {
    lines.push(
      buildFieldLine(
        "Kesediaan Dipoligami",
        formatEmpty(data.kesediaanDipoligami)
      )
    );
  }

  lines.push(
    buildFieldLine(
      "Pandangan Istri Bekerja",
      formatEmpty(data.pandanganNafkah)
    ),
    buildFieldLine(
      "Kesediaan Pindah Domisili",
      formatEmpty(data.kesediaanPindah)
    ),
    buildFieldLine("Target Waktu Menikah", formatEmpty(data.targetMenikah)),
    "\n",
    buildMultilineField(
      "Rencana Setelah Menikah",
      formatEmpty(data.rencanaSetelahMenikah)
    )
  );

  return lines.join("");
};

/**
 * Build contact section (Section VII)
 * @private
 * @param {Object} data - Form data
 * @returns {string} - Formatted section
 */
const buildContactSection = (data) => {
  return [
    buildSectionHeader("VII. KONTAK (Untuk Keperluan Mediator)"),
    buildFieldLine("No HP/WhatsApp", formatEmpty(data.noHP)),
    buildFieldLine("Email", formatEmpty(data.email)),
    buildFieldLine("Akun Sosmed", formatEmpty(data.akunSosmed)),
    buildFieldLine("Kontak Wali", formatEmpty(data.kontakWali)),
    "\n",
  ].join("");
};

/**
 * Build CV footer with disclaimer
 * @private
 * @returns {string} - Formatted footer
 */
const buildFooter = () => {
  const divider = "=".repeat(64);
  return [
    divider,
    "*Data ini diisi dengan sebenar-benarnya dan dapat",
    "dipertanggungjawabkan.*",
    divider,
  ].join("\n");
};

// ============================================================================
// MAIN GENERATOR FUNCTION
// ============================================================================

/**
 * Generate formatted CV text from form data
 * @param {Object} data - Form data object with 49 fields
 * @returns {string} - Formatted CV text ready for copy-paste
 */
export const generateCV = (data) => {
  try {
    // Validate input
    if (!data || typeof data !== "object") {
      throw new Error("[cvGeneratorService] Data must be a non-null object");
    }

    // Prepare formatted data
    const currentDate = getCurrentDate();
    const tanggalLahirFormatted = formatDate(data.tanggalLahir);

    // Build CV sections using functional composition
    const sections = [
      buildHeader(currentDate),
      buildPersonalDataSection(data, tanggalLahirFormatted),
      buildEducationSection(data),
      buildFamilySection(data),
      buildReligionSection(data),
      buildProfileSection(data),
      buildMarriageVisionSection(data),
      buildContactSection(data),
      buildFooter(),
    ];

    // Join all sections with newlines
    return sections.join("\n");
  } catch (error) {
    console.error("[cvGeneratorService] Error generating CV:", error);
    throw error;
  }
};

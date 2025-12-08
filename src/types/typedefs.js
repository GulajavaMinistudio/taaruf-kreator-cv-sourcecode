/**
 * Type Definitions using JSDoc
 * Sesuai dengan spec-data-localstorage-schema.md Section 6
 */

/**
 * @typedef {Object} FormData
 * @description Complete form data structure (49 fields)
 *
 * @property {string} namaLengkap - Nama lengkap (Required)
 * @property {string} [namaPanggilan] - Nama panggilan (Optional)
 * @property {string} tempatLahir - Tempat lahir (Required)
 * @property {string} tanggalLahir - Tanggal lahir, format: YYYY-MM-DD (Required)
 * @property {string} jenisKelamin - Jenis kelamin: "Laki-laki" | "Perempuan" (Required)
 * @property {number} tinggiBadan - Tinggi badan dalam cm (Required)
 * @property {number} beratBadan - Berat badan dalam kg (Required)
 * @property {string} [warnaKulit] - Warna kulit (Optional)
 * @property {string} pekerjaan - Pekerjaan saat ini (Required)
 * @property {string} statusPernikahan - Status: "Lajang" | "Duda" | "Janda" (Required)
 * @property {number} [jumlahAnak] - Jumlah anak (Conditional: if statusPernikahan != "Lajang")
 * @property {string} [pernahKhitbah] - Pernah khitbah: "Ya" | "Tidak" (Optional)
 * @property {string} [suku] - Suku bangsa (Optional)
 * @property {string} domisili - Domisili saat ini (Required)
 * @property {string} [asalDaerah] - Kota asal (Optional)
 * @property {string} [pengalamanKerja] - Pengalaman kerja (Optional)
 * @property {string} [penghasilanBulanan] - Range penghasilan bulanan (Optional)
 * @property {string} [statusRumah] - Status tempat tinggal (Optional)
 * @property {string} statusIzin - Status izin menikah: "Sudah" | "Belum" | "Proses" (Required)
 *
 * @property {string} pendidikanTerakhir - Pendidikan terakhir (Required)
 * @property {string} [pendidikanNonFormal] - Pendidikan non-formal (Optional)
 * @property {string} [prestasi] - Prestasi/keahlian (Optional)
 *
 * @property {string} infoAyah - Data ayah (Required)
 * @property {string} infoIbu - Data ibu (Required)
 * @property {string} urutanAnak - Urutan anak, format: "X dari Y" (Required)
 * @property {string} [infoSaudara] - Data saudara kandung (Optional)
 *
 * @property {string} [statusMuallaf] - Status muallaf (Optional)
 * @property {string} shalatWajib - Pelaksanaan shalat wajib (Required)
 * @property {string} [ibadahSunnah] - Kebiasaan ibadah sunnah (Optional)
 * @property {string} bacaanQuran - Kemampuan baca Al-Qur'an (Required)
 * @property {string} [kajianFavorit] - Kajian favorit (Optional)
 * @property {string} [afiliasiOrganisasi] - Afiliasi organisasi (Optional)
 *
 * @property {string} [hobi] - Hobi (Optional)
 * @property {string} sifatPositif - Sifat positif (Required)
 * @property {string} sifatNegatif - Sifat negatif (Required)
 * @property {string} [riwayatPenyakit] - Riwayat penyakit (Optional)
 * @property {string} merokok - Kebiasaan merokok (Required)
 * @property {string} [statusHijab] - Status hijab (Conditional: if jenisKelamin == "Perempuan")
 * @property {string} [statusJenggot] - Status jenggot (Conditional: if jenisKelamin == "Laki-laki")
 * @property {string} [visiMisiHidup] - Visi misi hidup (Optional)
 *
 * @property {string} visiPernikahan - Visi pernikahan (Required)
 * @property {string} kriteriaPasangan - Kriteria pasangan (Required)
 * @property {string} [pandanganMahar] - Pandangan tentang mahar (Optional)
 * @property {string} [kesediaanPoligami] - Kesediaan poligami (Conditional: if jenisKelamin == "Laki-laki")
 * @property {string} [kesediaanDipoligami] - Kesediaan dipoligami (Conditional: if jenisKelamin == "Perempuan")
 * @property {string} [pandanganNafkah] - Pandangan tentang nafkah (Optional)
 * @property {string} [kesediaanPindah] - Kesediaan pindah domisili (Optional)
 * @property {string} [targetMenikah] - Target menikah (Optional)
 * @property {string} [rencanaSetelahMenikah] - Rencana setelah menikah (Optional)
 *
 * @property {string} [noHP] - Nomor HP (Optional)
 * @property {string} [email] - Email (Optional)
 * @property {string} [akunSosmed] - Akun sosial media (Optional)
 * @property {string} [kontakWali] - Kontak wali (Optional)
 */

/**
 * @typedef {Object} DraftObject
 * @description Draft object for saved form data (can be incomplete)
 *
 * @property {string} id - Unique identifier (UUID v4 or Timestamp-based)
 * @property {string} name - Draft name (custom or auto-generated)
 * @property {string} createdAt - ISO Date when draft was first created
 * @property {string} lastUpdated - ISO Date when draft was last updated
 * @property {Partial<FormData>} data - Form data (can be incomplete)
 */

/**
 * @typedef {Object} HistoryObject
 * @description History object for generated CVs
 *
 * @property {string} id - Unique identifier (UUID v4)
 * @property {string} name - CV name (auto: "{namaLengkap} - {tanggal}")
 * @property {string} generatedAt - ISO Date when CV was generated
 * @property {string} cvTextContent - Final CV text (plain text)
 * @property {FormData} sourceData - Complete snapshot of form data used
 */

/**
 * @typedef {Object} SettingsObject
 * @description Settings object for application preferences
 *
 * @property {'light'|'dark'} theme - Theme preference (future feature)
 * @property {string} version - Application version (e.g., "1.5")
 * @property {string} lastAccessed - ISO Date of last access
 */

/**
 * @typedef {Object} StorageResult
 * @description Result object for storage operations
 *
 * @property {boolean} success - Operation success status
 * @property {string} [message] - Success or error message
 * @property {*} [data] - Result data (if applicable)
 * @property {Error} [error] - Error object (if failed)
 */

export {};

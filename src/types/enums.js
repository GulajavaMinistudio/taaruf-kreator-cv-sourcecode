/**
 * Enum Values for Select Options
 * Sesuai dengan spec-data-localstorage-schema.md Section 5
 */

/**
 * Jenis Kelamin Options
 * @readonly
 * @enum {string}
 */
export const JenisKelamin = {
  LAKI_LAKI: "Laki-laki",
  PEREMPUAN: "Perempuan",
};

/**
 * Status Pernikahan Options
 * @readonly
 * @enum {string}
 */
export const StatusPernikahan = {
  LAJANG: "Lajang",
  DUDA: "Duda",
  JANDA: "Janda",
};

/**
 * Pernah Khitbah Options
 * @readonly
 * @enum {string}
 */
export const PernahKhitbah = {
  YA: "Ya",
  TIDAK: "Tidak",
};

/**
 * Penghasilan Bulanan Options
 * @readonly
 * @enum {string}
 */
export const PenghasilanBulanan = {
  DI_BAWAH_3_JUTA: "Di bawah 3 juta",
  TIGA_SAMPAI_LIMA_JUTA: "3 - 5 juta",
  LIMA_SAMPAI_SEPULUH_JUTA: "5 - 10 juta",
  SEPULUH_SAMPAI_DUA_PULUH_JUTA: "10 - 20 juta",
  DI_ATAS_DUA_PULUH_JUTA: "Di atas 20 juta",
  TIDAK_TETAP: "Tidak tetap",
};

/**
 * Status Rumah Options
 * @readonly
 * @enum {string}
 */
export const StatusRumah = {
  MILIK_SENDIRI: "Milik Sendiri",
  KONTRAK_SEWA: "Kontrak/Sewa",
  TINGGAL_DENGAN_ORANG_TUA: "Tinggal dengan Orang Tua",
  LAINNYA: "Lainnya",
};

/**
 * Status Izin Menikah Options
 * @readonly
 * @enum {string}
 */
export const StatusIzin = {
  SUDAH: "Sudah",
  BELUM: "Belum",
  PROSES: "Proses",
};

/**
 * Kebiasaan Merokok Options
 * @readonly
 * @enum {string}
 */
export const Merokok = {
  YA: "Ya",
  TIDAK: "Tidak",
  PERNAH_SUDAH_BERHENTI: "Pernah (sudah berhenti)",
};

/**
 * Status Hijab (Akhwat) Options
 * @readonly
 * @enum {string}
 */
export const StatusHijab = {
  SYARI: "Syar'i",
  NON_SYARI: "Non-Syar'i",
  BERCADAR: "Bercadar",
};

/**
 * Status Jenggot (Ikhwan) Options
 * @readonly
 * @enum {string}
 */
export const StatusJenggot = {
  YA: "Ya",
  TIDAK: "Tidak",
};

/**
 * Kesediaan Poligami (Ikhwan) Options
 * @readonly
 * @enum {string}
 */
export const KesediaanPoligami = {
  BERSEDIA: "Bersedia",
  TIDAK_BERSEDIA: "Tidak Bersedia",
  KONDISIONAL: "Kondisional",
};

/**
 * Kesediaan Dipoligami (Akhwat) Options
 * @readonly
 * @enum {string}
 */
export const KesediaanDipoligami = {
  BERSEDIA: "Bersedia",
  TIDAK_BERSEDIA: "Tidak Bersedia",
  KONDISIONAL: "Kondisional",
};

/**
 * Pandangan Nafkah (Istri Bekerja) Options
 * @readonly
 * @enum {string}
 */
export const PandanganNafkah = {
  IRT_PENUH: "IRT Penuh",
  BOLEH_BEKERJA: "Boleh Bekerja",
  KONDISIONAL: "Kondisional",
};

/**
 * Kesediaan Pindah Domisili Options
 * @readonly
 * @enum {string}
 */
export const KesediaanPindah = {
  YA: "Ya",
  TIDAK: "Tidak",
  BISA_DIDISKUSIKAN: "Bisa Didiskusikan",
};

/**
 * Get all enum values as an array
 * @param {Object} enumObject - The enum object
 * @returns {Array<string>} Array of enum values
 */
export function getEnumValues(enumObject) {
  return Object.values(enumObject);
}

/**
 * Check if a value is valid for a given enum
 * @param {Object} enumObject - The enum object
 * @param {string} value - The value to check
 * @returns {boolean} True if valid
 */
export function isValidEnumValue(enumObject, value) {
  return Object.values(enumObject).includes(value);
}

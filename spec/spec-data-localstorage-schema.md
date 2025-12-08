---
title: Data Schema & LocalStorage Specification
version: 1.1
date_created: 2025-12-07
last_updated: 2025-12-07
tags: [data, schema, localstorage]
---

## Introduction

Dokumen ini mendefinisikan schema data dan strategi penyimpanan untuk aplikasi
Taaruf CV Kreator. Karena aplikasi bersifat client-side only, semua persistensi
data ditangani melalui `localStorage` browser.

## 1. Purpose & Scope

Tujuan spesifikasi ini adalah memastikan konsistensi data, integritas, dan type
safety di seluruh state management dan persistence layer aplikasi. Dokumen ini
mencakup:

- Konvensi penamaan key untuk localStorage.
- JSON schemas untuk Drafts, History, dan Settings.
- Data types untuk semua form fields (49 kolom).
- Enum values untuk field-field bertipe Select.

**Target Audience:** Developer yang akan mengimplementasikan data layer aplikasi.

## 2. Definitions

| Term                  | Definition                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **LocalStorage**      | Web storage API yang memungkinkan penyimpanan key/value pairs di browser tanpa expiration date |
| **Draft**             | Set data form (partial atau complete) yang disimpan pengguna untuk diedit nanti                |
| **History**           | Snapshot dari CV yang sudah di-generate, termasuk teks output final dan source data            |
| **FormData**          | Object yang merepresentasikan seluruh data input form (49 kolom)                               |
| **Conditional Field** | Kolom yang visibility-nya bergantung pada nilai kolom lain                                     |

## 3. Requirements, Constraints & Guidelines

### Requirements

- **REQ-DAT-001**: Semua data HARUS disimpan di `localStorage`.
- **REQ-DAT-002**: Key HARUS diawali prefix `taaruf_cv_` untuk menghindari
  collision dengan aplikasi lain.
- **REQ-DAT-003**: Tanggal HARUS disimpan dalam format ISO 8601 (`YYYY-MM-DD`
  atau `YYYY-MM-DDTHH:mm:ss.sssZ`).
- **REQ-DAT-004**: Data Draft dapat disimpan meskipun kolom wajib belum lengkap
  (partial data).
- **REQ-DAT-005**: Data History HARUS lengkap dan sudah tervalidasi sebelum
  disimpan.

### Constraints

- **CON-DAT-001**: LocalStorage memiliki batas kapasitas (umumnya 5MB). Aplikasi
  HARUS menangani `QuotaExceededError`.
- **CON-DAT-002**: Data hanya tersimpan di browser/device yang sama, tidak ada
  sinkronisasi antar device.

### Guidelines

- **GUD-DAT-001**: Data harus di-serialize ke JSON string sebelum disimpan dan
  di-parse saat diambil.
- **GUD-DAT-002**: Gunakan `try-catch` saat operasi localStorage untuk menangani
  error.

## 4. LocalStorage Keys

| Key Name             | Description                | Type                   |
| :------------------- | :------------------------- | :--------------------- |
| `taaruf_cv_drafts`   | Daftar draft yang disimpan | `Array<DraftObject>`   |
| `taaruf_cv_history`  | Daftar CV yang di-generate | `Array<HistoryObject>` |
| `taaruf_cv_settings` | Pengaturan aplikasi        | `SettingsObject`       |

## 5. Enum Values (Select Options)

Berikut adalah nilai-nilai yang valid untuk field bertipe Select, sesuai PRD
Lampiran A:

```typescript
// Jenis Kelamin
type JenisKelamin = 'Laki-laki' | 'Perempuan';

// Status Pernikahan
type StatusPernikahan = 'Lajang' | 'Duda' | 'Janda';

// Pernah Khitbah
type PernahKhitbah = 'Ya' | 'Tidak';

// Penghasilan Bulanan
type PenghasilanBulanan = 
  | 'Di bawah 3 juta'
  | '3 - 5 juta'
  | '5 - 10 juta'
  | '10 - 20 juta'
  | 'Di atas 20 juta'
  | 'Tidak tetap';

// Status Rumah
type StatusRumah = 'Milik Sendiri' | 'Kontrak/Sewa' | 'Tinggal dengan Orang Tua' | 'Lainnya';

// Status Izin Menikah
type StatusIzin = 'Sudah' | 'Belum' | 'Proses';

// Kebiasaan Merokok
type Merokok = 'Ya' | 'Tidak' | 'Pernah (sudah berhenti)';

// Status Hijab (Akhwat)
type StatusHijab = 'Syar\'i' | 'Non-Syar\'i' | 'Bercadar';

// Status Jenggot (Ikhwan)
type StatusJenggot = 'Ya' | 'Tidak';

// Kesediaan Poligami (Ikhwan)
type KesediaanPoligami = 'Bersedia' | 'Tidak Bersedia' | 'Kondisional';

// Kesediaan Dipoligami (Akhwat)
type KesediaanDipoligami = 'Bersedia' | 'Tidak Bersedia' | 'Kondisional';

// Pandangan Nafkah (Istri Bekerja)
type PandanganNafkah = 'IRT Penuh' | 'Boleh Bekerja' | 'Kondisional';

// Kesediaan Pindah Domisili
type KesediaanPindah = 'Ya' | 'Tidak' | 'Bisa Didiskusikan';
```

## 6. Data Schemas

### 6.1 Form Data Object (`FormData`)

Object ini merepresentasikan struktur data utama yang digunakan di form, draft, dan
history. Total 49 kolom sesuai PRD.

```typescript
interface FormData {
  // 1. Data Pribadi (19 kolom)
  namaLengkap: string;                              // Wajib
  namaPanggilan?: string;                           // Opsional
  tempatLahir: string;                              // Wajib
  tanggalLahir: string;                             // Wajib, format: YYYY-MM-DD
  jenisKelamin: JenisKelamin;                       // Wajib
  tinggiBadan: number;                              // Wajib, dalam cm
  beratBadan: number;                               // Wajib, dalam kg
  warnaKulit?: string;                              // Opsional
  pekerjaan: string;                                // Wajib
  statusPernikahan: StatusPernikahan;               // Wajib
  jumlahAnak?: number;                              // Kondisional: wajib jika statusPernikahan != 'Lajang'
  pernahKhitbah?: PernahKhitbah;                    // Opsional
  suku?: string;                                    // Opsional
  domisili: string;                                 // Wajib
  asalDaerah?: string;                              // Opsional
  pengalamanKerja?: string;                         // Opsional
  penghasilanBulanan?: PenghasilanBulanan;          // Opsional
  statusRumah?: StatusRumah;                        // Opsional
  statusIzin: StatusIzin;                           // Wajib

  // 2. Riwayat Pendidikan (3 kolom)
  pendidikanTerakhir: string;                       // Wajib
  pendidikanNonFormal?: string;                     // Opsional
  prestasi?: string;                                // Opsional

  // 3. Informasi Keluarga (4 kolom)
  infoAyah: string;                                 // Wajib
  infoIbu: string;                                  // Wajib
  urutanAnak: string;                               // Wajib, format: "X dari Y"
  infoSaudara?: string;                             // Opsional

  // 4. Ibadah & Pemahaman Agama (6 kolom)
  statusMuallaf?: string;                           // Opsional
  shalatWajib: string;                              // Wajib
  ibadahSunnah?: string;                            // Opsional
  bacaanQuran: string;                              // Wajib
  kajianFavorit?: string;                           // Opsional
  afiliasiOrganisasi?: string;                      // Opsional

  // 5. Profil Diri & Kebiasaan (8 kolom)
  hobi?: string;                                    // Opsional
  sifatPositif: string;                             // Wajib
  sifatNegatif: string;                             // Wajib
  riwayatPenyakit?: string;                         // Opsional
  merokok: Merokok;                                 // Wajib
  statusHijab?: StatusHijab;                        // Kondisional: wajib jika jenisKelamin == 'Perempuan'
  statusJenggot?: StatusJenggot;                    // Kondisional: wajib jika jenisKelamin == 'Laki-laki'
  visiMisiHidup?: string;                           // Opsional

  // 6. Visi Pernikahan (9 kolom)
  visiPernikahan: string;                           // Wajib
  kriteriaPasangan: string;                         // Wajib
  pandanganMahar?: string;                          // Opsional
  kesediaanPoligami?: KesediaanPoligami;            // Kondisional: wajib jika jenisKelamin == 'Laki-laki'
  kesediaanDipoligami?: KesediaanDipoligami;        // Kondisional: wajib jika jenisKelamin == 'Perempuan'
  pandanganNafkah?: PandanganNafkah;                // Opsional
  kesediaanPindah?: KesediaanPindah;                // Opsional
  targetMenikah?: string;                           // Opsional
  rencanaSetelahMenikah?: string;                   // Opsional

  // 7. Kontak & Admin (4 kolom)
  noHP?: string;                                    // Opsional
  email?: string;                                   // Opsional
  akunSosmed?: string;                              // Opsional
  kontakWali?: string;                              // Opsional
}
```

**Ringkasan Kolom:**

| Kategori           | Total  | Wajib  | Opsional | Kondisional |
| ------------------ | ------ | ------ | -------- | ----------- |
| Data Pribadi       | 19     | 10     | 8        | 1           |
| Riwayat Pendidikan | 3      | 1      | 2        | 0           |
| Informasi Keluarga | 4      | 3      | 1        | 0           |
| Ibadah & Agama     | 6      | 2      | 4        | 0           |
| Profil Diri        | 8      | 3      | 3        | 2           |
| Visi Pernikahan    | 9      | 2      | 5        | 2           |
| Kontak & Admin     | 4      | 0      | 4        | 0           |
| **Total**          | **49** | **21** | **23**   | **5**       |

### 6.2 Draft Object (`DraftObject`)

Digunakan di `taaruf_cv_drafts`. Draft dapat menyimpan data yang belum lengkap.

```typescript
interface DraftObject {
  id: string;              // UUID v4 atau Timestamp-based ID
  name: string;            // Nama custom atau auto-generated "Draft - {namaLengkap} - {tanggal}"
  createdAt: string;       // ISO Date saat draft pertama dibuat
  lastUpdated: string;     // ISO Date saat draft terakhir diupdate
  data: Partial<FormData>; // Data form (bisa incomplete)
}
```

### 6.3 History Object (`HistoryObject`)

Digunakan di `taaruf_cv_history`. History menyimpan CV yang sudah di-generate
dengan lengkap.

```typescript
interface HistoryObject {
  id: string;              // UUID v4
  name: string;            // Nama CV (auto: "{namaLengkap} - {tanggal}")
  generatedAt: string;     // ISO Date saat CV di-generate
  cvTextContent: string;   // Teks CV final yang sudah di-generate (plain text)
  sourceData: FormData;    // Snapshot lengkap data yang digunakan untuk generate
}
```

### 6.4 Settings Object (`SettingsObject`)

Digunakan di `taaruf_cv_settings`. Menyimpan preferensi aplikasi.

```typescript
interface SettingsObject {
  theme: 'light' | 'dark';  // Future feature: tema tampilan
  version: string;          // Versi aplikasi, e.g., "1.5"
  lastAccessed: string;     // ISO Date terakhir akses
}
```

## 7. Acceptance Criteria

- **AC-DAT-001**: Given data form yang lengkap, When pengguna klik "Simpan ke
  History", Then data tersimpan di localStorage dengan key `taaruf_cv_history`.
- **AC-DAT-002**: Given data form yang belum lengkap, When pengguna klik "Simpan
  Draft", Then data tetap tersimpan di localStorage dengan key `taaruf_cv_drafts`.
- **AC-DAT-003**: Given localStorage penuh, When pengguna mencoba menyimpan data,
  Then aplikasi menampilkan pesan error yang informatif.
- **AC-DAT-004**: Given draft tersimpan, When pengguna memuat draft tersebut, Then
  semua field form terisi sesuai data draft.

## 8. Validation Criteria

- **VAL-DAT-001**: `FormData` HARUS divalidasi sesuai rules di
  `spec-design-form-validation.md` sebelum disimpan ke History (tidak wajib
  untuk Draft).
- **VAL-DAT-002**: Field `id` HARUS unik di dalam array masing-masing
  (drafts/history).
- **VAL-DAT-003**: Tanggal HARUS dalam format ISO 8601 yang valid.

## 9. Examples & Edge Cases

### 9.1 Contoh Draft Object

```json
{
  "id": "draft_1733580000000",
  "name": "Draft - Ahmad - 07 Des 2025",
  "createdAt": "2025-12-07T10:00:00.000Z",
  "lastUpdated": "2025-12-07T12:30:00.000Z",
  "data": {
    "namaLengkap": "Ahmad Fauzi",
    "jenisKelamin": "Laki-laki",
    "tempatLahir": "Jakarta",
    "tanggalLahir": "1995-08-17"
  }
}
```

### 9.2 Contoh History Object

```json
{
  "id": "cv_550e8400-e29b-41d4-a716-446655440000",
  "name": "Ahmad Fauzi - 07 Des 2025",
  "generatedAt": "2025-12-07T14:00:00.000Z",
  "cvTextContent": "================================================================\n                    CURRICULUM VITAE TA'ARUF\n================================================================\n...",
  "sourceData": {
    "namaLengkap": "Ahmad Fauzi",
    "...": "..."
  }
}
```

### 9.3 Edge Cases

| Skenario                           | Handling                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| localStorage penuh                 | Tampilkan alert "Penyimpanan penuh. Hapus draft/history lama untuk melanjutkan." |
| Browser tidak support localStorage | Tampilkan warning bahwa fitur draft/history tidak tersedia                       |
| Data corrupt/invalid JSON          | Tampilkan error dan tawarkan reset data                                          |
| Draft dengan nama duplikat         | Tambahkan suffix angka: "Draft - Ahmad (2)"                                      |

## 10. Related Specifications

- `spec-design-form-validation.md` - Aturan validasi form
- `spec-design-cv-generator.md` - Logika generator CV

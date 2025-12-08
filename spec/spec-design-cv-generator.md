---
title: CV Generator & Template Specification
version: 1.1
date_created: 2025-12-07
last_updated: 2025-12-07
tags: [design, generator, template]
---

## Introduction

Dokumen ini menspesifikasikan logika dan struktur template untuk menghasilkan
CV Ta'aruf dalam format plain text. Generator menerima objek `FormData` dan
mentransformasikannya menjadi string terformat yang siap di-copy-paste.

## 1. Purpose & Scope

Spesifikasi ini mencakup:

- Layout dan formatting teks CV yang tepat.
- Penanganan field kosong/opsional.
- Logika mapping dari data fields ke section template.
- Logika kondisional berdasarkan gender dan status pernikahan.

**Target Audience:** Developer yang akan mengimplementasikan CV generator.

## 2. Definitions

| Term            | Definition                                                                          |
| --------------- | ----------------------------------------------------------------------------------- |
| **Template**    | String format CV dengan placeholder untuk data                                      |
| **Placeholder** | Marker dalam template yang akan diganti dengan nilai data (format: `{{fieldName}}`) |
| **Formatter**   | Fungsi untuk memformat nilai data (tanggal, empty value, dll)                       |

## 3. Generator Logic

### 3.1 Input

- **Source**: Objek `FormData` dari `spec-data-localstorage-schema.md` (49 kolom).

### 3.2 Processing Rules

- **Empty Fields**:
  - Field single-line: Tampilkan "-" (dash) jika kosong.
  - Field multi-line (textarea): Tampilkan "-" jika kosong.
- **Date Formatting**: Konversi `YYYY-MM-DD` ke format Indonesia `DD MMMM YYYY`
  (e.g., "17 Agustus 1995").
- **Line Breaks**: 1 baris kosong antar section.
- **Separators**: Header separator `================================================================`,
  sub-header separator `----------------------------------------------------------------`.
- **Alignment**: Key-value pairs dengan titik dua dan spasi sejajar.

### 3.3 Output

- **Format**: Plain Text (`text/plain`).
- **Destination**: `<textarea readonly>` di Result Page.
- **Compatibility**: Output kompatibel untuk paste ke Microsoft Word, Google Docs,
  dan Notepad.

## 4. Template Structure

Template berikut menggunakan placeholder `{{key}}`. Semua 49 field dari PRD
tercakup dalam template ini.

```text
================================================================
                    CURRICULUM VITAE TA'ARUF
================================================================
Tanggal Pembuatan: {{currentDate}}

I. DATA PRIBADI
----------------------------------------------------------------
Nama Lengkap        : {{namaLengkap}}
Nama Panggilan      : {{namaPanggilan}}
Tempat, Tgl Lahir   : {{tempatLahir}}, {{tanggalLahirFormatted}}
Jenis Kelamin       : {{jenisKelamin}}
Tinggi / Berat      : {{tinggiBadan}} cm / {{beratBadan}} kg
Warna Kulit         : {{warnaKulit}}
Suku Bangsa         : {{suku}}
Domisili Saat Ini   : {{domisili}}
Asal Daerah         : {{asalDaerah}}
Pekerjaan           : {{pekerjaan}}
Pengalaman Kerja    : {{pengalamanKerja}}
Penghasilan Bulanan : {{penghasilanBulanan}}
Status Tempat Tinggal: {{statusRumah}}
Status Pernikahan   : {{statusPernikahan}}
{{#if isDudaJanda}}
Jumlah Anak         : {{jumlahAnak}}
{{/if}}
Pernah Khitbah      : {{pernahKhitbah}}
Status Izin Wali    : {{statusIzin}}

II. RIWAYAT PENDIDIKAN
----------------------------------------------------------------
Pendidikan Terakhir:
{{pendidikanTerakhir}}

Pendidikan Non-Formal:
{{pendidikanNonFormal}}

Prestasi / Keahlian Khusus:
{{prestasi}}

III. INFORMASI KELUARGA
----------------------------------------------------------------
Data Ayah:
{{infoAyah}}

Data Ibu:
{{infoIbu}}

Anak ke: {{urutanAnak}}

Data Saudara:
{{infoSaudara}}

IV. IBADAH & PEMAHAMAN AGAMA
----------------------------------------------------------------
Status Muallaf      : {{statusMuallaf}}

Pelaksanaan Shalat Wajib:
{{shalatWajib}}

Kebiasaan Ibadah Sunnah:
{{ibadahSunnah}}

Kemampuan Baca Al-Qur'an & Hafalan:
{{bacaanQuran}}

Kajian / Ustadz Favorit:
{{kajianFavorit}}

Organisasi / Komunitas Islam:
{{afiliasiOrganisasi}}

V. PROFIL DIRI & KEBIASAAN
----------------------------------------------------------------
Hobi / Kegemaran    : {{hobi}}
Merokok             : {{merokok}}
{{#if isLakiLaki}}
Status Jenggot      : {{statusJenggot}}
{{/if}}
{{#if isPerempuan}}
Status Hijab        : {{statusHijab}}
{{/if}}

Sifat Positif (Kelebihan):
{{sifatPositif}}

Sifat Negatif (Kekurangan):
{{sifatNegatif}}

Riwayat Penyakit:
{{riwayatPenyakit}}

Visi Misi Hidup:
{{visiMisiHidup}}

VI. VISI PERNIKAHAN
----------------------------------------------------------------
Visi & Misi Pernikahan:
{{visiPernikahan}}

Kriteria Calon Pasangan:
{{kriteriaPasangan}}

Pandangan tentang Mahar:
{{pandanganMahar}}

{{#if isLakiLaki}}
Pandangan tentang Poligami: {{kesediaanPoligami}}
{{/if}}
{{#if isPerempuan}}
Kesediaan Dipoligami: {{kesediaanDipoligami}}
{{/if}}

Pandangan Istri Bekerja: {{pandanganNafkah}}
Kesediaan Pindah Domisili: {{kesediaanPindah}}
Target Waktu Menikah: {{targetMenikah}}

Rencana Setelah Menikah:
{{rencanaSetelahMenikah}}

VII. KONTAK (Untuk Keperluan Mediator)
----------------------------------------------------------------
No HP/WhatsApp  : {{noHP}}
Email           : {{email}}
Akun Sosmed     : {{akunSosmed}}
Kontak Wali     : {{kontakWali}}

================================================================
*Data ini diisi dengan sebenar-benarnya dan dapat
dipertanggungjawabkan.*
================================================================
```

## 5. Conditional Logic in Template

### 5.1 Gender Specific Fields

| Kondisi                       | Field yang Ditampilkan | Section             |
| ----------------------------- | ---------------------- | ------------------- |
| `jenisKelamin` == 'Laki-laki' | `statusJenggot`        | V. Profil Diri      |
| `jenisKelamin` == 'Laki-laki' | `kesediaanPoligami`    | VI. Visi Pernikahan |
| `jenisKelamin` == 'Perempuan' | `statusHijab`          | V. Profil Diri      |
| `jenisKelamin` == 'Perempuan' | `kesediaanDipoligami`  | VI. Visi Pernikahan |

### 5.2 Marital Status Fields

| Kondisi                                   | Field yang Ditampilkan               | Section         |
| ----------------------------------------- | ------------------------------------ | --------------- |
| `statusPernikahan` == 'Duda' atau 'Janda' | `jumlahAnak`                         | I. Data Pribadi |
| `statusPernikahan` == 'Lajang'            | Field `jumlahAnak` tidak ditampilkan | -               |

## 6. Helper Functions

### 6.1 Date Formatter

```javascript
/**
 * Format tanggal dari YYYY-MM-DD ke format Indonesia
 * @param {string} dateString - Tanggal dalam format ISO (YYYY-MM-DD)
 * @returns {string} - Tanggal dalam format "DD MMMM YYYY"
 */
function formatDate(dateString) {
  if (!dateString) return '-';
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const [year, month, day] = dateString.split('-');
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}
```

### 6.2 Empty Value Formatter

```javascript
/**
 * Return value atau "-" jika kosong
 * @param {any} value - Nilai yang akan diformat
 * @returns {string} - Nilai atau "-"
 */
function formatEmpty(value) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
}
```

### 6.3 Current Date Formatter

```javascript
/**
 * Mendapatkan tanggal saat ini dalam format Indonesia
 * @returns {string} - Tanggal dalam format "DD MMMM YYYY"
 */
function getCurrentDate() {
  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];
  return formatDate(isoDate);
}
```

## 7. Generator Function

```javascript
/**
 * Generate CV text dari FormData
 * @param {FormData} data - Object data form
 * @returns {string} - CV dalam format plain text
 */
function generateCV(data) {
  // Determine conditional flags
  const isLakiLaki = data.jenisKelamin === 'Laki-laki';
  const isPerempuan = data.jenisKelamin === 'Perempuan';
  const isDudaJanda = data.statusPernikahan === 'Duda' || data.statusPernikahan === 'Janda';
  
  // Build CV text using template literals
  let cv = `================================================================
                    CURRICULUM VITAE TA'ARUF
================================================================
Tanggal Pembuatan: ${getCurrentDate()}

I. DATA PRIBADI
----------------------------------------------------------------
Nama Lengkap        : ${formatEmpty(data.namaLengkap)}
Nama Panggilan      : ${formatEmpty(data.namaPanggilan)}
Tempat, Tgl Lahir   : ${formatEmpty(data.tempatLahir)}, ${formatDate(data.tanggalLahir)}
...
`;
  
  // Continue building all sections...
  return cv;
}
```

## 8. Field Mapping Reference

Mapping lengkap 49 field dari `FormData` ke placeholder template:

| FormData Field          | Template Placeholder        | Section | Format                  |
| ----------------------- | --------------------------- | ------- | ----------------------- |
| `namaLengkap`           | `{{namaLengkap}}`           | I       | as-is                   |
| `namaPanggilan`         | `{{namaPanggilan}}`         | I       | formatEmpty             |
| `tempatLahir`           | `{{tempatLahir}}`           | I       | as-is                   |
| `tanggalLahir`          | `{{tanggalLahirFormatted}}` | I       | formatDate              |
| `jenisKelamin`          | `{{jenisKelamin}}`          | I       | as-is                   |
| `tinggiBadan`           | `{{tinggiBadan}}`           | I       | as-is + " cm"           |
| `beratBadan`            | `{{beratBadan}}`            | I       | as-is + " kg"           |
| `warnaKulit`            | `{{warnaKulit}}`            | I       | formatEmpty             |
| `pekerjaan`             | `{{pekerjaan}}`             | I       | as-is                   |
| `statusPernikahan`      | `{{statusPernikahan}}`      | I       | as-is                   |
| `jumlahAnak`            | `{{jumlahAnak}}`            | I       | conditional             |
| `pernahKhitbah`         | `{{pernahKhitbah}}`         | I       | formatEmpty             |
| `suku`                  | `{{suku}}`                  | I       | formatEmpty             |
| `domisili`              | `{{domisili}}`              | I       | as-is                   |
| `asalDaerah`            | `{{asalDaerah}}`            | I       | formatEmpty             |
| `pengalamanKerja`       | `{{pengalamanKerja}}`       | I       | formatEmpty             |
| `penghasilanBulanan`    | `{{penghasilanBulanan}}`    | I       | formatEmpty             |
| `statusRumah`           | `{{statusRumah}}`           | I       | formatEmpty             |
| `statusIzin`            | `{{statusIzin}}`            | I       | as-is                   |
| `pendidikanTerakhir`    | `{{pendidikanTerakhir}}`    | II      | as-is                   |
| `pendidikanNonFormal`   | `{{pendidikanNonFormal}}`   | II      | formatEmpty             |
| `prestasi`              | `{{prestasi}}`              | II      | formatEmpty             |
| `infoAyah`              | `{{infoAyah}}`              | III     | as-is                   |
| `infoIbu`               | `{{infoIbu}}`               | III     | as-is                   |
| `urutanAnak`            | `{{urutanAnak}}`            | III     | as-is                   |
| `infoSaudara`           | `{{infoSaudara}}`           | III     | formatEmpty             |
| `statusMuallaf`         | `{{statusMuallaf}}`         | IV      | formatEmpty             |
| `shalatWajib`           | `{{shalatWajib}}`           | IV      | as-is                   |
| `ibadahSunnah`          | `{{ibadahSunnah}}`          | IV      | formatEmpty             |
| `bacaanQuran`           | `{{bacaanQuran}}`           | IV      | as-is                   |
| `kajianFavorit`         | `{{kajianFavorit}}`         | IV      | formatEmpty             |
| `afiliasiOrganisasi`    | `{{afiliasiOrganisasi}}`    | IV      | formatEmpty             |
| `hobi`                  | `{{hobi}}`                  | V       | formatEmpty             |
| `sifatPositif`          | `{{sifatPositif}}`          | V       | as-is                   |
| `sifatNegatif`          | `{{sifatNegatif}}`          | V       | as-is                   |
| `riwayatPenyakit`       | `{{riwayatPenyakit}}`       | V       | formatEmpty             |
| `merokok`               | `{{merokok}}`               | V       | as-is                   |
| `statusHijab`           | `{{statusHijab}}`           | V       | conditional (Perempuan) |
| `statusJenggot`         | `{{statusJenggot}}`         | V       | conditional (Laki-laki) |
| `visiMisiHidup`         | `{{visiMisiHidup}}`         | V       | formatEmpty             |
| `visiPernikahan`        | `{{visiPernikahan}}`        | VI      | as-is                   |
| `kriteriaPasangan`      | `{{kriteriaPasangan}}`      | VI      | as-is                   |
| `pandanganMahar`        | `{{pandanganMahar}}`        | VI      | formatEmpty             |
| `kesediaanPoligami`     | `{{kesediaanPoligami}}`     | VI      | conditional (Laki-laki) |
| `kesediaanDipoligami`   | `{{kesediaanDipoligami}}`   | VI      | conditional (Perempuan) |
| `pandanganNafkah`       | `{{pandanganNafkah}}`       | VI      | formatEmpty             |
| `kesediaanPindah`       | `{{kesediaanPindah}}`       | VI      | formatEmpty             |
| `targetMenikah`         | `{{targetMenikah}}`         | VI      | formatEmpty             |
| `rencanaSetelahMenikah` | `{{rencanaSetelahMenikah}}` | VI      | formatEmpty             |
| `noHP`                  | `{{noHP}}`                  | VII     | formatEmpty             |
| `email`                 | `{{email}}`                 | VII     | formatEmpty             |
| `akunSosmed`            | `{{akunSosmed}}`            | VII     | formatEmpty             |
| `kontakWali`            | `{{kontakWali}}`            | VII     | formatEmpty             |

## 9. Acceptance Criteria

- **AC-GEN-001**: Given data form lengkap, When CV di-generate, Then semua 49
  field termapping dengan benar.
- **AC-GEN-002**: Given field opsional kosong, When CV di-generate, Then field
  tersebut menampilkan "-".
- **AC-GEN-003**: Given `tanggalLahir` = "1995-08-17", When CV di-generate, Then
  ditampilkan "17 Agustus 1995".
- **AC-GEN-004**: Given `jenisKelamin` = "Laki-laki", When CV di-generate, Then
  `statusJenggot` dan `kesediaanPoligami` ditampilkan.
- **AC-GEN-005**: Given `jenisKelamin` = "Perempuan", When CV di-generate, Then
  `statusHijab` dan `kesediaanDipoligami` ditampilkan.
- **AC-GEN-006**: Given `statusPernikahan` = "Lajang", When CV di-generate, Then
  `jumlahAnak` tidak ditampilkan.
- **AC-GEN-007**: Given CV di-copy dan paste ke Microsoft Word, When dilihat,
  Then format teks tetap rapi.

## 10. Related Specifications

- `spec-data-localstorage-schema.md` - Schema FormData yang menjadi input
- `spec-design-form-validation.md` - Validasi data sebelum generate

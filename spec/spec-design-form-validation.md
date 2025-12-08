---
title: Form Validation Rules
version: 1.1
date_created: 2025-12-07
last_updated: 2025-12-07
tags: [design, validation, logic]
---

## Introduction

Dokumen ini mendefinisikan aturan validasi untuk 49 input fields di aplikasi
Taaruf CV Kreator. Validasi memastikan integritas dan kelengkapan data sebelum
CV di-generate.

## 1. Purpose & Scope

Spesifikasi ini mencakup:

- Field wajib vs opsional (21 wajib, 23 opsional, 5 kondisional).
- Logika kondisional untuk visibility dan requirement field.
- Constraint tipe data (length, format, range).
- Template pesan error.
- Options untuk field bertipe Select.

**Target Audience:** Developer yang akan mengimplementasikan form validation.

## 2. Definitions

| Term                      | Definition                                                     |
| ------------------------- | -------------------------------------------------------------- |
| **Required Field**        | Kolom yang HARUS diisi sebelum dapat melanjutkan ke preview    |
| **Optional Field**        | Kolom yang boleh dikosongkan                                   |
| **Conditional Field**     | Kolom yang menjadi wajib jika kondisi tertentu terpenuhi       |
| **Real-time Validation**  | Validasi yang berjalan saat user mengetik atau blur dari field |
| **Submission Validation** | Validasi yang berjalan saat tombol Preview/Submit diklik       |

## 3. Validation Strategy

### 3.1 Real-time Validation

- Visual feedback (border hijau/merah) saat user mengetik atau pindah focus
  (`blur` event).
- Gunakan Bootstrap validation classes: `is-valid`, `is-invalid`.
- Tampilkan pesan error di `<div class="invalid-feedback">`.

### 3.2 Submission Validation

- Periksa semua field wajib (visible) saat tombol "Preview CV" diklik.
- Jika ada field invalid, prevent navigation dan scroll ke field pertama yang error.
- Tombol "Preview CV" disabled jika form invalid (menggunakan `:invalid` CSS pseudo-class).

## 4. Field Validation Rules

### 4.1 Data Pribadi (19 Fields)

| ID                   | Label                 | Required      | Type     | Options / Constraints                                                                            | Conditional Logic                                                                    |
| :------------------- | :-------------------- | :------------ | :------- | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `namaLengkap`        | Nama Lengkap          | ✅ Wajib       | Text     | Min 3 chars                                                                                      | -                                                                                    |
| `namaPanggilan`      | Nama Panggilan        | ⚪ Opsional    | Text     | -                                                                                                | -                                                                                    |
| `tempatLahir`        | Tempat Lahir          | ✅ Wajib       | Text     | -                                                                                                | -                                                                                    |
| `tanggalLahir`       | Tanggal Lahir         | ✅ Wajib       | Date     | Max: Today, Min: 100 tahun lalu                                                                  | -                                                                                    |
| `jenisKelamin`       | Jenis Kelamin         | ✅ Wajib       | Select   | `Laki-laki`, `Perempuan`                                                                         | Controls: `statusHijab`, `statusJenggot`, `kesediaanPoligami`, `kesediaanDipoligami` |
| `tinggiBadan`        | Tinggi Badan (cm)     | ✅ Wajib       | Number   | Min: 100, Max: 250                                                                               | -                                                                                    |
| `beratBadan`         | Berat Badan (kg)      | ✅ Wajib       | Number   | Min: 30, Max: 200                                                                                | -                                                                                    |
| `warnaKulit`         | Warna Kulit           | ⚪ Opsional    | Text     | -                                                                                                | -                                                                                    |
| `pekerjaan`          | Pekerjaan Saat Ini    | ✅ Wajib       | Text     | -                                                                                                | -                                                                                    |
| `statusPernikahan`   | Status Pernikahan     | ✅ Wajib       | Select   | `Lajang`, `Duda`, `Janda`                                                                        | Controls: `jumlahAnak`                                                               |
| `jumlahAnak`         | Jumlah Anak           | 🔄 Kondisional | Number   | Min: 0, Max: 20                                                                                  | Wajib jika `statusPernikahan` != 'Lajang'                                            |
| `pernahKhitbah`      | Pernah Khitbah        | ⚪ Opsional    | Select   | `Ya`, `Tidak`                                                                                    | -                                                                                    |
| `suku`               | Suku Bangsa           | ⚪ Opsional    | Text     | -                                                                                                | -                                                                                    |
| `domisili`           | Domisili Saat Ini     | ✅ Wajib       | Text     | -                                                                                                | -                                                                                    |
| `asalDaerah`         | Kota Asal             | ⚪ Opsional    | Text     | -                                                                                                | -                                                                                    |
| `pengalamanKerja`    | Pengalaman Kerja      | ⚪ Opsional    | Textarea | -                                                                                                | -                                                                                    |
| `penghasilanBulanan` | Penghasilan Bulanan   | ⚪ Opsional    | Select   | `Di bawah 3 juta`, `3 - 5 juta`, `5 - 10 juta`, `10 - 20 juta`, `Di atas 20 juta`, `Tidak tetap` | -                                                                                    |
| `statusRumah`        | Status Tempat Tinggal | ⚪ Opsional    | Select   | `Milik Sendiri`, `Kontrak/Sewa`, `Tinggal dengan Orang Tua`, `Lainnya`                           | -                                                                                    |
| `statusIzin`         | Status Izin Menikah   | ✅ Wajib       | Select   | `Sudah`, `Belum`, `Proses`                                                                       | -                                                                                    |

### 4.2 Riwayat Pendidikan (3 Fields)

| ID                    | Label                 | Required   | Type     | Options / Constraints |
| :-------------------- | :-------------------- | :--------- | :------- | :-------------------- |
| `pendidikanTerakhir`  | Pendidikan Terakhir   | ✅ Wajib    | Textarea | Min 10 chars          |
| `pendidikanNonFormal` | Pendidikan Non-Formal | ⚪ Opsional | Textarea | -                     |
| `prestasi`            | Prestasi / Keahlian   | ⚪ Opsional | Textarea | -                     |

### 4.3 Informasi Keluarga (4 Fields)

| ID            | Label        | Required   | Type     | Options / Constraints                 |
| :------------ | :----------- | :--------- | :------- | :------------------------------------ |
| `infoAyah`    | Data Ayah    | ✅ Wajib    | Textarea | Min 10 chars                          |
| `infoIbu`     | Data Ibu     | ✅ Wajib    | Textarea | Min 10 chars                          |
| `urutanAnak`  | Urutan Anak  | ✅ Wajib    | Text     | Pattern: "X dari Y" (e.g. "1 dari 3") |
| `infoSaudara` | Data Saudara | ⚪ Opsional | Textarea | -                                     |

### 4.4 Ibadah & Pemahaman Agama (6 Fields)

| ID                   | Label                    | Required   | Type     | Options / Constraints |
| :------------------- | :----------------------- | :--------- | :------- | :-------------------- |
| `statusMuallaf`      | Status Muallaf           | ⚪ Opsional | Text     | -                     |
| `shalatWajib`        | Pelaksanaan Shalat Wajib | ✅ Wajib    | Textarea | -                     |
| `ibadahSunnah`       | Kebiasaan Ibadah Sunnah  | ⚪ Opsional | Textarea | -                     |
| `bacaanQuran`        | Kemampuan Baca Al-Qur'an | ✅ Wajib    | Textarea | -                     |
| `kajianFavorit`      | Kajian / Ustadz Favorit  | ⚪ Opsional | Textarea | -                     |
| `afiliasiOrganisasi` | Organisasi Islam         | ⚪ Opsional | Text     | -                     |

### 4.5 Profil Diri & Kebiasaan (8 Fields)

| ID                | Label                   | Required      | Type     | Options / Constraints                    | Conditional Logic                        |
| :---------------- | :---------------------- | :------------ | :------- | :--------------------------------------- | :--------------------------------------- |
| `hobi`            | Hobi / Kegemaran        | ⚪ Opsional    | Text     | -                                        | -                                        |
| `sifatPositif`    | Sifat Positif           | ✅ Wajib       | Textarea | -                                        | -                                        |
| `sifatNegatif`    | Sifat Negatif           | ✅ Wajib       | Textarea | -                                        | -                                        |
| `riwayatPenyakit` | Riwayat Penyakit        | ⚪ Opsional    | Textarea | -                                        | -                                        |
| `merokok`         | Kebiasaan Merokok       | ✅ Wajib       | Select   | `Ya`, `Tidak`, `Pernah (sudah berhenti)` | -                                        |
| `statusHijab`     | Status Hijab (Akhwat)   | 🔄 Kondisional | Select   | `Syar'i`, `Non-Syar'i`, `Bercadar`       | Wajib jika `jenisKelamin` == 'Perempuan' |
| `statusJenggot`   | Status Jenggot (Ikhwan) | 🔄 Kondisional | Select   | `Ya`, `Tidak`                            | Wajib jika `jenisKelamin` == 'Laki-laki' |
| `visiMisiHidup`   | Visi Misi Hidup         | ⚪ Opsional    | Textarea | -                                        | -                                        |

### 4.6 Visi Pernikahan (9 Fields)

| ID                      | Label                         | Required      | Type     | Options / Constraints                       | Conditional Logic                        |
| :---------------------- | :---------------------------- | :------------ | :------- | :------------------------------------------ | :--------------------------------------- |
| `visiPernikahan`        | Visi & Misi Pernikahan        | ✅ Wajib       | Textarea | Min 20 chars                                | -                                        |
| `kriteriaPasangan`      | Kriteria Calon Pasangan       | ✅ Wajib       | Textarea | Min 20 chars                                | -                                        |
| `pandanganMahar`        | Pandangan tentang Mahar       | ⚪ Opsional    | Textarea | -                                           | -                                        |
| `kesediaanPoligami`     | Pandangan Poligami (Ikhwan)   | 🔄 Kondisional | Select   | `Bersedia`, `Tidak Bersedia`, `Kondisional` | Wajib jika `jenisKelamin` == 'Laki-laki' |
| `kesediaanDipoligami`   | Kesediaan Dipoligami (Akhwat) | 🔄 Kondisional | Select   | `Bersedia`, `Tidak Bersedia`, `Kondisional` | Wajib jika `jenisKelamin` == 'Perempuan' |
| `pandanganNafkah`       | Pandangan Istri Bekerja       | ⚪ Opsional    | Select   | `IRT Penuh`, `Boleh Bekerja`, `Kondisional` | -                                        |
| `kesediaanPindah`       | Kesediaan Pindah Domisili     | ⚪ Opsional    | Select   | `Ya`, `Tidak`, `Bisa Didiskusikan`          | -                                        |
| `targetMenikah`         | Target Waktu Menikah          | ⚪ Opsional    | Text     | -                                           | -                                        |
| `rencanaSetelahMenikah` | Rencana Pasca Nikah           | ⚪ Opsional    | Textarea | -                                           | -                                        |

### 4.7 Kontak & Admin (4 Fields)

| ID           | Label                  | Required   | Type  | Options / Constraints              |
| :----------- | :--------------------- | :--------- | :---- | :--------------------------------- |
| `noHP`       | No WhatsApp Aktif      | ⚪ Opsional | Tel   | Pattern: digits only, min 10 chars |
| `email`      | Alamat Email           | ⚪ Opsional | Email | Valid email format                 |
| `akunSosmed` | Akun Media Sosial      | ⚪ Opsional | Text  | -                                  |
| `kontakWali` | Kontak Wali / Mediator | ⚪ Opsional | Text  | -                                  |

## 5. Ringkasan Statistik Field

| Kategori           | Total  | Wajib  | Opsional | Kondisional |
| :----------------- | :----: | :----: | :------: | :---------: |
| Data Pribadi       |   19   |   10   |    8     |      1      |
| Riwayat Pendidikan |   3    |   1    |    2     |      0      |
| Informasi Keluarga |   4    |   3    |    1     |      0      |
| Ibadah & Agama     |   6    |   2    |    4     |      0      |
| Profil Diri        |   8    |   3    |    3     |      2      |
| Visi Pernikahan    |   9    |   2    |    5     |      2      |
| Kontak & Admin     |   4    |   0    |    4     |      0      |
| **Total**          | **49** | **21** |  **23**  |    **5**    |

## 6. Conditional Field Logic

Diagram logika untuk 5 field kondisional:

```text
┌─────────────────────┐
│   jenisKelamin      │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    ▼           ▼
┌────────┐  ┌────────┐
│Laki-laki│  │Perempuan│
└────┬───┘  └────┬───┘
     │           │
     ▼           ▼
┌──────────────┐ ┌──────────────┐
│statusJenggot │ │statusHijab   │
│(Wajib)       │ │(Wajib)       │
├──────────────┤ ├──────────────┤
│kesediaan     │ │kesediaan     │
│Poligami      │ │Dipoligami    │
│(Wajib)       │ │(Wajib)       │
└──────────────┘ └──────────────┘

┌─────────────────────┐
│  statusPernikahan   │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    ▼           ▼
┌────────┐  ┌────────────┐
│ Lajang │  │Duda / Janda│
└────────┘  └──────┬─────┘
                   │
                   ▼
             ┌──────────┐
             │jumlahAnak│
             │(Wajib)   │
             └──────────┘
```

## 7. Error Messages

| Kode              | Kondisi                 | Pesan Error (Bahasa Indonesia)                          |
| ----------------- | ----------------------- | ------------------------------------------------------- |
| `ERR_REQUIRED`    | Field wajib kosong      | "Kolom ini wajib diisi."                                |
| `ERR_MIN_LENGTH`  | Kurang dari min chars   | "Minimal {n} karakter."                                 |
| `ERR_MAX_LENGTH`  | Lebih dari max chars    | "Maksimal {n} karakter."                                |
| `ERR_EMAIL`       | Format email salah      | "Format email tidak valid."                             |
| `ERR_NUMBER`      | Bukan angka             | "Harus berupa angka."                                   |
| `ERR_MIN_VALUE`   | Di bawah min value      | "Nilai minimal adalah {n}."                             |
| `ERR_MAX_VALUE`   | Di atas max value       | "Nilai maksimal adalah {n}."                            |
| `ERR_DATE_FUTURE` | Tanggal di masa depan   | "Tanggal tidak boleh di masa depan."                    |
| `ERR_PHONE`       | Format telepon salah    | "Format nomor telepon tidak valid."                     |
| `ERR_CONDITIONAL` | Kondisional tapi kosong | "Kolom ini wajib diisi berdasarkan pilihan sebelumnya." |

## 8. Implementation Logic

### 8.1 Event Listeners

```javascript
// Attach validation listeners to all form fields
document.querySelectorAll('#cv-form input, #cv-form select, #cv-form textarea')
  .forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearFieldError(field));
  });

// Conditional field handlers
document.getElementById('jenisKelamin').addEventListener('change', handleGenderChange);
document.getElementById('statusPernikahan').addEventListener('change', handleMaritalStatusChange);
```

### 8.2 Conditional Handler Functions

```javascript
function handleGenderChange(event) {
  const gender = event.target.value;
  
  // Toggle visibility and required status
  const ikhwanFields = ['statusJenggot', 'kesediaanPoligami'];
  const akhwatFields = ['statusHijab', 'kesediaanDipoligami'];
  
  ikhwanFields.forEach(id => {
    const wrapper = document.getElementById(id).closest('.conditional-field');
    wrapper.classList.toggle('d-none', gender !== 'Laki-laki');
    document.getElementById(id).required = (gender === 'Laki-laki');
  });
  
  akhwatFields.forEach(id => {
    const wrapper = document.getElementById(id).closest('.conditional-field');
    wrapper.classList.toggle('d-none', gender !== 'Perempuan');
    document.getElementById(id).required = (gender === 'Perempuan');
  });
}

function handleMaritalStatusChange(event) {
  const status = event.target.value;
  const jumlahAnakWrapper = document.getElementById('jumlahAnak').closest('.conditional-field');
  const isNotSingle = (status === 'Duda' || status === 'Janda');
  
  jumlahAnakWrapper.classList.toggle('d-none', !isNotSingle);
  document.getElementById('jumlahAnak').required = isNotSingle;
}
```

### 8.3 Validation Function

```javascript
function validateForm() {
  const form = document.getElementById('cv-form');
  let isValid = true;
  let firstInvalidField = null;
  
  // Check all visible required fields
  form.querySelectorAll('input:required, select:required, textarea:required')
    .forEach(field => {
      if (!field.closest('.d-none') && !field.checkValidity()) {
        isValid = false;
        showFieldError(field);
        if (!firstInvalidField) firstInvalidField = field;
      }
    });
  
  if (!isValid && firstInvalidField) {
    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstInvalidField.focus();
  }
  
  return isValid;
}
```

## 9. Acceptance Criteria

- **AC-VAL-001**: Given field wajib kosong, When user blur dari field, Then
  tampilkan border merah dan pesan error.
- **AC-VAL-002**: Given field wajib terisi valid, When user blur dari field,
  Then tampilkan border hijau.
- **AC-VAL-003**: Given `jenisKelamin` == 'Laki-laki', When form divalidasi,
  Then `statusJenggot` dan `kesediaanPoligami` wajib diisi.
- **AC-VAL-004**: Given `jenisKelamin` == 'Perempuan', When form divalidasi,
  Then `statusHijab` dan `kesediaanDipoligami` wajib diisi.
- **AC-VAL-005**: Given `statusPernikahan` != 'Lajang', When form divalidasi,
  Then `jumlahAnak` wajib diisi.
- **AC-VAL-006**: Given form memiliki field invalid, When user klik "Preview CV",
  Then navigasi dicegah dan scroll ke field error pertama.

## 10. Related Specifications

- `spec-data-localstorage-schema.md` - Schema data yang harus divalidasi
- `spec-design-component-architecture.md` - Struktur komponen form

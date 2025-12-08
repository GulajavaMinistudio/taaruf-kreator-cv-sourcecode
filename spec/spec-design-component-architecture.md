---
title: Component Architecture & UI/UX Design Specification
version: 1.1
date_created: 2025-12-07
last_updated: 2025-12-07
tags: [design, architecture, component]
---

## Introduction

Dokumen ini menguraikan arsitektur komponen untuk aplikasi Taaruf CV Kreator.
Sebagai aplikasi Vanilla JS dengan Bootstrap, "komponen" merujuk pada unit
logis dari struktur HTML/DOM dan JavaScript controllers/renderers terkait.

## 1. Purpose & Scope

Mendefinisikan struktur user interface untuk memastikan:

- Modularitas dan reusability komponen.
- Separation of concerns antara view (HTML) dan logic (JS).
- Konsistensi desain di seluruh 8 halaman aplikasi.

**Target Audience:** Developer yang akan mengimplementasikan UI aplikasi.

## 2. Definitions

| Term           | Definition                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------ |
| **View**       | Container halaman penuh yang merepresentasikan satu screen (e.g., Landing Page, Form Page) |
| **Component**  | Elemen UI yang dapat digunakan ulang (e.g., Navbar, Card, Modal)                           |
| **Controller** | Modul JavaScript yang menangani user events dan mengupdate View                            |
| **Route**      | Hash-based URL yang menentukan View mana yang aktif                                        |

## 3. Requirements, Constraints & Guidelines

### Requirements

- **REQ-UI-001**: Aplikasi HARUS berupa Single Page Application (SPA).
- **REQ-UI-002**: Navigasi TIDAK BOLEH memicu full page reload.
- **REQ-UI-003**: Semua komponen UI HARUS responsif menggunakan Bootstrap 5 grid
  system.
- **REQ-UI-004**: Navbar HARUS menampilkan link ke Settings (icon gear).
- **REQ-UI-005**: Semua halaman HARUS dapat diakses via navigasi atau direct URL
  hash.

### Constraints

- **CON-UI-001**: Tidak boleh menggunakan frontend framework (React, Vue, dll).
  Gunakan Vanilla JS DOM manipulation.
- **CON-UI-002**: Styling HARUS menggunakan Bootstrap 5 classes, minimal custom
  CSS.

### Guidelines

- **GUD-UI-001**: Gunakan Bootstrap utility classes untuk spacing dan layout.
- **GUD-UI-002**: Semua interactive elements harus memiliki visual feedback
  (hover, active states).

## 4. High-Level Architecture

Aplikasi mengikuti pola sederhana mirip MVC:

- **Model**: Data disimpan di `localStorage` (dikelola oleh Data Services).
- **View**: HTML Templates yang di-hide/show berdasarkan route saat ini.
- **Controller**: Logic JS yang memetakan routes ke views dan menangani events.

### 4.1 Routing Strategy

Aplikasi menggunakan hash-based routing untuk navigasi tanpa reload.

| Route              | View ID         | Description          |
| ------------------ | --------------- | -------------------- |
| `#/` atau `#/home` | `view-landing`  | Landing Page         |
| `#/form`           | `view-form`     | Halaman Form Input   |
| `#/preview`        | `view-preview`  | Halaman Preview      |
| `#/result`         | `view-result`   | Halaman Hasil CV     |
| `#/draft`          | `view-draft`    | Halaman Draft        |
| `#/history`        | `view-history`  | Halaman History      |
| `#/doa`            | `view-doa`      | Halaman Doa & Hadits |
| `#/settings`       | `view-settings` | Halaman Pengaturan   |

### 4.2 Layout Structure

```html
<body>
  <!-- Navigation Bar (Fixed Top) -->
  <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#/">Taaruf CV Kreator</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="#/">Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="#/form">Buat CV</a></li>
          <li class="nav-item"><a class="nav-link" href="#/draft">Draft</a></li>
          <li class="nav-item"><a class="nav-link" href="#/history">Riwayat</a></li>
          <li class="nav-item"><a class="nav-link" href="#/doa">Doa & Hadits</a></li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#/settings" title="Pengaturan">
              <i class="bi bi-gear"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Main Content Container (with top padding for fixed navbar) -->
  <main id="app-container" class="container py-4" style="margin-top: 70px;">
    <!-- Views are toggled here using d-none class -->
    <div id="view-landing" class="view-section">...</div>
    <div id="view-form" class="view-section d-none">...</div>
    <div id="view-preview" class="view-section d-none">...</div>
    <div id="view-result" class="view-section d-none">...</div>
    <div id="view-draft" class="view-section d-none">...</div>
    <div id="view-history" class="view-section d-none">...</div>
    <div id="view-doa" class="view-section d-none">...</div>
    <div id="view-settings" class="view-section d-none">...</div>
  </main>

  <!-- Footer -->
  <footer id="main-footer" class="footer mt-auto py-3 bg-light">
    <div class="container text-center">
      <span class="text-muted">© 2025 Gulajava Ministudio | Taaruf CV Kreator v1.5</span>
    </div>
  </footer>
</body>
```

## 5. View Specifications

### 5.1 Landing Page (`view-landing`)

Halaman utama yang menjelaskan tentang aplikasi dan menyediakan navigasi ke
fitur-fitur utama.

**Komponen:**

- **Hero Section**:
  - Judul: "Taaruf CV Kreator"
  - Subtitle: "Buat CV Ta'aruf Islami dengan Mudah dan Aman"
  - Tombol CTA: "Buat CV Baru" → navigasi ke `#/form`
  
- **Privacy Notice Card** (Sesuai US-001):
  - Icon: 🔒
  - Teks: "Data Anda aman. Semua data hanya tersimpan di browser Anda dan tidak
    dikirim ke server manapun."
  
- **Features Grid** (4 cards):
  - Card 1: "Buat CV Baru" → `#/form`
  - Card 2: "Draft Saya" → `#/draft`
  - Card 3: "Riwayat CV" → `#/history`
  - Card 4: "Doa & Hadits" → `#/doa`
  
- **About Section**:
  - Penjelasan singkat tentang Ta'aruf
  - Kegunaan aplikasi ini

### 5.2 Form Page (`view-form`)

Halaman formulir input data CV Ta'aruf dengan 49 kolom dalam 7 kategori.

**Komponen:**

- **Progress Indicator** (Optional): Sticky header menunjukkan section aktif.
- **Form Container**: `<form id="cv-form">`
  - **Section 1: Data Pribadi** (19 kolom): Personal info, status, pekerjaan
  - **Section 2: Riwayat Pendidikan** (3 kolom): Pendidikan formal & non-formal
  - **Section 3: Informasi Keluarga** (4 kolom): Data orang tua & saudara
  - **Section 4: Ibadah & Agama** (6 kolom): Praktik ibadah & rujukan
  - **Section 5: Profil Diri** (8 kolom): Kepribadian & kebiasaan
  - **Section 6: Visi Pernikahan** (9 kolom): Tujuan & kriteria
  - **Section 7: Kontak** (4 kolom): Info kontak opsional
- **Action Bar** (Sticky Bottom):
  - Tombol "Reset Form" (Secondary, dengan konfirmasi)
  - Tombol "Simpan Draft" (Outline Primary)
  - Tombol "Preview CV" (Primary, disabled jika form invalid)

### 5.3 Preview Page (`view-preview`)

Halaman untuk mereview data sebelum generate CV.

**Komponen:**

- **Preview Header**: "Preview Data CV Ta'aruf"
- **Preview Container**: Display read-only semua data dalam format terstruktur
  mirip output final (HTML styled)
- **Empty Field Indicator**: Kolom kosong ditampilkan dengan "-" atau "Tidak diisi"
- **Action Bar**:
  - Tombol "Kembali ke Edit" (Secondary) → `#/form`
  - Tombol "Generate CV" (Primary, Success) → proses generate lalu ke `#/result`

### 5.4 Result Page (`view-result`)

Halaman yang menampilkan CV final yang sudah di-generate.

**Komponen:**

- **Success Alert**: Bootstrap alert success "CV Ta'aruf Berhasil Dibuat!"
- **Output Area**: `<textarea readonly rows="20">` berisi teks CV plain text
- **Action Bar**:
  - Tombol "Copy to Clipboard" (Primary) - dengan feedback "Tersalin!"
  - Tombol "Simpan ke History" (Success)
  - Tombol "Buat CV Baru" (Secondary) → `#/form`
  - Tombol "Kembali ke Beranda" (Link) → `#/`

### 5.5 Draft Page (`view-draft`)

Halaman untuk mengelola draft CV yang tersimpan.

**Komponen:**

- **Page Header**: "Draft Saya"
- **Draft List**: Bootstrap List Group atau Table:
  - Nama Draft
  - Tanggal Terakhir Diupdate
  - Preview singkat (nama lengkap jika ada)
  - Actions: Tombol "Load" (Primary), "Hapus" (Danger, dengan konfirmasi)
- **Empty State**: Card dengan pesan "Belum ada draft tersimpan" dan tombol
  "Buat CV Baru"

### 5.6 History Page (`view-history`)

Halaman untuk melihat riwayat CV yang sudah di-generate.

**Komponen:**

- **Page Header**: "Riwayat CV"
- **History List**: Bootstrap List Group atau Table:
  - Nama CV
  - Tanggal Pembuatan
  - Actions: "Lihat" (Info), "Copy" (Primary), "Hapus" (Danger, dengan konfirmasi)
- **View Modal**: Bootstrap Modal untuk menampilkan CV text content lengkap
- **Empty State**: Card dengan pesan "Belum ada riwayat CV"

### 5.7 Doa & Hadits Page (`view-doa`)

Halaman kumpulan doa dan hadits pernikahan sesuai PRD Lampiran B.

**Komponen:**

- **Page Header**: "Doa & Hadits Pernikahan"
- **Category Tabs**: Bootstrap Nav Pills untuk 5 kategori:
  1. "Doa Mencari Jodoh" (3 doa: DJ-01, DJ-02, DJ-03)
  2. "Doa Saat Khitbah" (1 doa: DK-01)
  3. "Doa Malam Pertama & Walimah" (3 doa: DW-01, DW-02, DW-03)
  4. "Hadits Keutamaan Menikah" (3 hadits: HK-01, HK-02, HK-03)
  5. "Hadits Kriteria Pasangan" (3 hadits: HP-01, HP-02, HP-03)
- **Content Cards**: Untuk setiap doa/hadits:
  - Judul
  - Teks Arab (font besar, Arabic font family)
  - Terjemahan bahasa Indonesia
  - Sumber referensi (kitab hadits, nomor)
  - Tombol "Copy" untuk menyalin ke clipboard

### 5.8 Settings Page (`view-settings`)

Halaman pengaturan dan informasi aplikasi sesuai US-011.

**Komponen:**

- **Page Header**: "Pengaturan & Tentang Aplikasi"

- **Card 1: Tentang Aplikasi**
  - Judul aplikasi: "Taaruf CV Kreator"
  - Deskripsi: Penjelasan singkat tentang aplikasi dan tujuannya
  - Manfaat aplikasi

- **Card 2: Informasi Developer**
  - Nama: "Gulajava Ministudio"
  - Kontak: Email/Website (jika ada)
  - Media Sosial: Link ke sosmed (jika ada)

- **Card 3: Tools & Teknologi**
  - Daftar dengan badge/icon:
    - HTML5
    - Bootstrap 5
    - Vanilla JavaScript
    - Vite

- **Card 4: Versi Aplikasi**
  - Versi: "1.5"
  - Tanggal Rilis

- **Card 5: Kebijakan Privasi**
  - Penjelasan bahwa data tidak disimpan di server
  - Informasi bahwa data hanya di localStorage browser

- **Danger Zone Card** (border merah):
  - Tombol "Reset Semua Data" (Danger)
  - Konfirmasi modal sebelum eksekusi
  - Menghapus semua data di localStorage

## 6. Shared Components

### 6.1 `InputGroup`

Wrapper standar untuk form inputs dengan label, validation states, dan error messages.

```html
<!-- Text Input -->
<div class="mb-3">
  <label for="{id}" class="form-label">{label} <span class="text-danger">*</span></label>
  <input type="{type}" class="form-control" id="{id}" name="{id}" required>
  <div class="invalid-feedback">{errorMessage}</div>
</div>

<!-- Select Input -->
<div class="mb-3">
  <label for="{id}" class="form-label">{label} <span class="text-danger">*</span></label>
  <select class="form-select" id="{id}" name="{id}" required>
    <option value="">-- Pilih --</option>
    <option value="{value}">{label}</option>
  </select>
  <div class="invalid-feedback">{errorMessage}</div>
</div>

<!-- Textarea -->
<div class="mb-3">
  <label for="{id}" class="form-label">{label}</label>
  <textarea class="form-control" id="{id}" name="{id}" rows="3"></textarea>
</div>

<!-- Conditional Field (hidden by default) -->
<div class="mb-3 conditional-field d-none" data-condition="{fieldId}:{value}">
  ...
</div>
```

### 6.2 `ModalConfirm`

Bootstrap modal generik untuk konfirmasi aksi destruktif.

```html
<div class="modal fade" id="modalConfirm" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">{message}</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-danger" id="confirmAction">{confirmText}</button>
      </div>
    </div>
  </div>
</div>
```

### 6.3 `ToastNotification`

Bootstrap Toast untuk notifikasi non-blocking.

```html
<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="toast" class="toast" role="alert">
    <div class="toast-header">
      <strong class="me-auto">{title}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">{message}</div>
  </div>
</div>
```

### 6.4 `DoaHaditsCard`

Card untuk menampilkan doa atau hadits.

```html
<div class="card mb-3">
  <div class="card-header">
    <h5 class="card-title mb-0">{judul}</h5>
  </div>
  <div class="card-body">
    <p class="card-text arabic-text text-end fs-4" dir="rtl">{teksArab}</p>
    <hr>
    <p class="card-text"><em>"{terjemahan}"</em></p>
    <small class="text-muted">Sumber: {sumber}</small>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary btn-sm btn-copy" data-content="{fullContent}">
      <i class="bi bi-clipboard"></i> Copy
    </button>
  </div>
</div>
```

## 7. Acceptance Criteria

- **AC-UI-001**: Given pengguna mengakses aplikasi, When halaman dimuat, Then
  Landing Page ditampilkan dengan semua komponen sesuai spesifikasi.
- **AC-UI-002**: Given pengguna di halaman manapun, When pengguna klik link
  navigasi, Then halaman berpindah tanpa reload dan URL hash berubah.
- **AC-UI-003**: Given pengguna di mobile device, When aplikasi dibuka, Then
  semua komponen responsif dan mudah digunakan.
- **AC-UI-004**: Given pengguna klik tombol yang membutuhkan konfirmasi, When
  modal muncul, Then aksi hanya dieksekusi jika pengguna konfirmasi.

## 8. Related Specifications

- `spec-data-localstorage-schema.md` - Schema data yang digunakan
- `spec-design-form-validation.md` - Aturan validasi form
- `spec-design-cv-generator.md` - Logika generator CV

# Product Requirements Document (PRD) Final

## Aplikasi Taaruf CV Kreator

| Info                  | Detail                                      |
| --------------------- | ------------------------------------------- |
| **Tanggal Pembuatan** | 5 Desember 2025                             |
| **Tanggal Revisi**    | 7 Desember 2025                             |
| **Versi**             | 1.5                                         |
| **Pemilik Produk**    | Gulajava Ministudio                         |
| **Status**            | Disetujui dan Siap Masuk Tahap Pengembangan |

---

## 1. Tujuan Produk (Goal)

Tujuan utama dari produk ini adalah menyediakan alat yang mudah digunakan, aman, dan terstruktur bagi pengguna Muslim/Muslimah untuk menghasilkan draf Curriculum Vitae (CV) Ta'aruf dalam format teks formal yang siap disalin (copy-paste) ke dokumen pengolah kata.

---

## 2. Target Pengguna

- Individu Muslim/Muslimah (Ikhwan/Akhwat) yang sedang menjalani proses Ta'aruf.
- Pengguna yang membutuhkan format CV Ta'aruf yang baku dan mencakup aspek agama serta visi misi pernikahan.
- Pengguna yang mengutamakan kerahasiaan data (privasi).

---

## 3. Fitur Fungsional (Functional Requirements)

### 3.1 Antarmuka Input Formulir (Form Input Interface)

**Desain:** Antarmuka harus sederhana, bersih, dan menggunakan styling Bootstrap untuk responsivitas dan pengelompokan input yang rapi (mengacu pada Lampiran A).

**Validasi Form:** Sistem harus memvalidasi kolom-kolom wajib sebelum pengguna dapat melanjutkan ke halaman preview.

### 3.2 Fitur Preview

- **Halaman Preview:** Setelah mengisi form, pengguna diarahkan ke halaman preview untuk melihat hasil isian sebelum generate CV final.
- **Navigasi:** Pengguna dapat kembali ke halaman form jika masih ada data yang perlu diperbaiki.
- **Konfirmasi:** Pengguna harus mengkonfirmasi bahwa data sudah benar sebelum generate CV.

### 3.3 Proses Generator Teks

- **Mekanisme Pembangkitan:** Data yang diisi pengguna di-merge ke dalam Template Teks Formal yang telah ditentukan di dalam kode JavaScript.
- **Tipe Output:** Hasil berupa teks murni (plain text) dalam format yang sangat rapi dan terstruktur (menggunakan spasi, titik dua, dan garis pemisah/border teks).
- **Mode Output:** Output ditampilkan dalam kotak isian teks (`<textarea>`) dengan atribut read-only.
- **Template:** Template formal standar yang siap di-copy paste ke dokumen pengolah kata seperti Microsoft Word.

### 3.4 Fitur Draft (localStorage)

- **Simpan Draft:** Pengguna dapat menyimpan isian form sebagai draft ke localStorage browser.
- **Halaman Draft:** Tersedia halaman khusus untuk menampilkan daftar draft yang tersimpan.
- **Load Draft:** Pengguna dapat memuat kembali draft yang tersimpan untuk melanjutkan pengisian.
- **Hapus Draft:** Pengguna dapat menghapus draft yang tidak diperlukan.

### 3.5 Fitur History CV

- **Riwayat CV:** Menyimpan daftar CV yang sudah di-generate dan disetujui oleh pengguna ke localStorage.
- **Halaman History:** Tersedia halaman khusus untuk menampilkan daftar CV yang sudah dibuat.
- **Lihat Ulang:** Pengguna dapat melihat kembali CV yang sudah dibuat sebelumnya.
- **Hapus History:** Pengguna dapat menghapus riwayat CV yang tidak diperlukan.

### 3.6 Fitur Doa & Hadits Pernikahan

- **Konten Statis:** Halaman berisi kumpulan doa dan hadits seputar pernikahan yang sudah ditentukan sebelumnya.
- **Kategori Konten:**
  - Doa mencari jodoh (sebelum menikah)
  - Doa saat khitbah/meminang
  - Doa malam pertama/walimah
  - Hadits keutamaan menikah
  - Hadits kriteria memilih pasangan
- **Teks Arab & Terjemahan:** Setiap doa/hadits ditampilkan dalam teks Arab beserta terjemahan bahasa Indonesia.
- **Sumber Referensi:** Setiap hadits mencantumkan sumber (kitab hadits, nomor hadits).
- **Fitur Copy:** Pengguna dapat menyalin doa/hadits ke clipboard.
- **Fitur Audio (Future):** Fitur audio bacaan dapat dipertimbangkan untuk pengembangan selanjutnya setelah semua fitur utama selesai.

### 3.7 Fitur Pengaturan & Tentang Aplikasi

- **Halaman Pengaturan:** Halaman khusus berisi informasi dan setelan aplikasi.
- **Konten Halaman:**
  - **Tentang Aplikasi:** Penjelasan singkat tentang Taaruf CV Kreator dan tujuannya
  - **Informasi Developer:** Nama developer/studio, kontak, dan media sosial
  - **Tools & Teknologi:** Daftar teknologi yang digunakan dalam pembuatan aplikasi (HTML, Bootstrap, Vanilla JS, Vite)
  - **Versi Aplikasi:** Nomor versi aplikasi yang sedang berjalan
  - **Kebijakan Privasi:** Penjelasan bahwa data tidak disimpan di server
- **Setelan Aplikasi (Opsional untuk Future):**
  - Tema tampilan (Light/Dark Mode) - dapat dipertimbangkan untuk pengembangan selanjutnya
  - Reset semua data localStorage

### 3.8 Utilitas Pengguna (User Utilities)

| Tombol                | Fungsi                                                      |
| --------------------- | ----------------------------------------------------------- |
| **Preview CV**        | Menampilkan halaman preview sebelum generate                |
| **Generate CV**       | Memicu proses merge data ke template (dari halaman preview) |
| **Copy to Clipboard** | Menyalin seluruh teks hasil CV ke clipboard pengguna        |
| **Save Draft**        | Menyimpan isian form ke localStorage sebagai draft          |
| **Reset Form**        | Menghapus semua isian di formulir                           |

---

## 4. Persyaratan Non-Fungsional (Non-Functional Requirements)

### 4.1 Persyaratan Privasi & Keamanan (Krusial)

> [!IMPORTANT]
> **Client-Side Only:** Aplikasi harus dirancang untuk memproses data sepenuhnya di browser pengguna (JavaScript/DOM).
> [!CAUTION]
> **Tidak Ada Penyimpanan Server:** Aplikasi **TIDAK BOLEH** menyimpan data input pengguna ke database, server, atau log apa pun.

### 4.2 Persyaratan Teknis

| Persyaratan           | Detail                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **Teknologi Utama**   | HTML, Bootstrap (versi terbaru) untuk styling dan responsivitas, dan Vanilla JavaScript        |
| **Bundler & Tooling** | Menggunakan Vite untuk development yang efisien dan proses bundling modern                     |
| **Performa**          | Pemuatan cepat dan proses generating harus instan                                              |
| **Arsitektur Kode**   | Proyek diinisiasi menggunakan Vite, dengan fokus pada struktur file HTML, JS, dan CSS terpisah |

### 4.3 Persyaratan Output

- **Format Teks Formal:** Output harus menggunakan bahasa yang baku dan memiliki format yang jelas (menggunakan header dan garis pemisah).
- **Kesiapan Salin:** Output harus kompatibel untuk disalin dan ditempel ke Notepad, Microsoft Word, atau Google Docs.

### 4.4 Persyaratan Penyimpanan Lokal

- **localStorage:** Data draft dan history CV disimpan di localStorage browser pengguna.
- **Kapasitas:** Pengguna diberi peringatan jika kapasitas localStorage hampir penuh.
- **Tidak Ada Sinkronisasi:** Data hanya tersimpan di browser/device yang sama, tidak ada sinkronisasi antar device.

---

## 5. User Stories & Acceptance Criteria

### 5.1 Alur Utama Pengguna

```text
[Landing Page] → [Halaman Form] → [Halaman Preview] → [Halaman Hasil CV]
      ↓                ↓                                      ↓
      ├──────→ [Halaman Draft]                    [Save to History]
      │                                                       ↓
      ├──────→ [Halaman History] ←────────────────────────────┘
      │
      ├──────→ [Halaman Doa & Hadits]
      │
      └──────→ [Halaman Pengaturan]
```

### 5.2 Struktur Halaman Aplikasi

| Halaman                  | Deskripsi                                                                  |
| ------------------------ | -------------------------------------------------------------------------- |
| **Landing Page**         | Halaman depan dengan penjelasan singkat tentang Ta'aruf dan navigasi utama |
| **Halaman Form**         | Formulir input data CV Ta'aruf                                             |
| **Halaman Preview**      | Preview data sebelum generate CV                                           |
| **Halaman Hasil CV**     | Menampilkan CV final yang siap di-copy                                     |
| **Halaman Draft**        | Daftar draft CV yang tersimpan                                             |
| **Halaman History**      | Daftar CV yang sudah di-generate                                           |
| **Halaman Doa & Hadits** | Kumpulan doa dan hadits seputar pernikahan dalam Islam                     |
| **Halaman Pengaturan**   | Informasi aplikasi, developer, tools, dan setelan                          |

### 5.3 User Stories

#### US-001: Melihat Landing Page

- **Sebagai** pengunjung baru
- **Saya ingin** melihat halaman depan yang menjelaskan tentang aplikasi dan Ta'aruf
- **Agar** saya memahami tujuan aplikasi sebelum membuat CV

**Acceptance Criteria:**

- [ ] Landing page menampilkan judul aplikasi "Taaruf CV Kreator"
- [ ] Terdapat penjelasan singkat tentang apa itu Ta'aruf
- [ ] Terdapat penjelasan singkat tentang kegunaan aplikasi
- [ ] Terdapat informasi bahwa data tidak disimpan di server (privasi)
- [ ] Tombol navigasi "Buat CV Baru" mengarah ke halaman form
- [ ] Tombol navigasi "Draft Saya" mengarah ke halaman draft
- [ ] Tombol navigasi "Riwayat CV" mengarah ke halaman history
- [ ] Tombol navigasi "Doa & Hadits" mengarah ke halaman doa dan hadits pernikahan
- [ ] Tombol/Icon "Pengaturan" mengarah ke halaman pengaturan (bisa di navbar/footer)
- [ ] Desain responsif dan terlihat baik di mobile maupun desktop

#### US-002: Mengisi Form CV Ta'aruf

- **Sebagai** pengguna Muslim/Muslimah
- **Saya ingin** mengisi formulir biodata Ta'aruf dengan lengkap
- **Agar** saya dapat membuat CV Ta'aruf yang terstruktur

**Acceptance Criteria:**

- [ ] Form menampilkan semua kolom input sesuai kategori
- [ ] Kolom wajib ditandai dengan asterisk (*) dan warna merah
- [ ] Kolom kondisional muncul/hilang sesuai pilihan pengguna
- [ ] Validasi real-time menampilkan pesan error jika kolom wajib kosong
- [ ] Tombol "Preview CV" tidak aktif jika kolom wajib belum terisi

#### US-003: Preview CV Sebelum Generate

- **Sebagai** pengguna
- **Saya ingin** melihat preview CV sebelum di-generate
- **Agar** saya dapat memastikan data yang diisi sudah benar

**Acceptance Criteria:**

- [ ] Halaman preview menampilkan semua data yang sudah diisi
- [ ] Data ditampilkan dalam format yang mirip dengan output final
- [ ] Tombol "Kembali" untuk kembali ke halaman form
- [ ] Tombol "Generate CV" untuk membuat CV final
- [ ] Kolom yang kosong ditampilkan dengan tanda "-" atau "Tidak diisi"

#### US-004: Generate dan Copy CV

- **Sebagai** pengguna
- **Saya ingin** men-generate CV dalam format teks formal
- **Agar** saya dapat menyalin dan menempelkan ke dokumen Word

**Acceptance Criteria:**

- [ ] CV di-generate dalam format plain text yang rapi
- [ ] Output ditampilkan di textarea read-only
- [ ] Tombol "Copy to Clipboard" berfungsi dengan baik
- [ ] Notifikasi sukses muncul setelah copy berhasil
- [ ] Format output kompatibel dengan Microsoft Word dan Google Docs

#### US-005: Menyimpan Draft

- **Sebagai** pengguna
- **Saya ingin** menyimpan isian form sebagai draft
- **Agar** saya dapat melanjutkan pengisian di lain waktu

**Acceptance Criteria:**

- [ ] Tombol "Save Draft" menyimpan data ke localStorage
- [ ] Draft diberi nama otomatis (nama + tanggal) atau nama custom
- [ ] Notifikasi sukses muncul setelah draft tersimpan
- [ ] Draft tersimpan meskipun kolom wajib belum lengkap

#### US-006: Mengelola Draft

- **Sebagai** pengguna
- **Saya ingin** melihat dan mengelola draft yang tersimpan
- **Agar** saya dapat melanjutkan atau menghapus draft

**Acceptance Criteria:**

- [ ] Halaman Draft menampilkan daftar semua draft tersimpan
- [ ] Setiap draft menampilkan nama, tanggal simpan, dan preview singkat
- [ ] Tombol "Load" untuk memuat draft ke form
- [ ] Tombol "Hapus" untuk menghapus draft dengan konfirmasi
- [ ] Pesan kosong jika tidak ada draft tersimpan

#### US-007: Menyimpan CV ke History

- **Sebagai** pengguna
- **Saya ingin** menyimpan CV yang sudah di-generate ke riwayat
- **Agar** saya dapat melihat kembali CV yang sudah dibuat

**Acceptance Criteria:**

- [ ] Setelah generate CV, pengguna dapat memilih "Simpan ke History"
- [ ] History menyimpan CV final beserta tanggal pembuatan
- [ ] History tersimpan di localStorage

#### US-008: Mengelola History CV

- **Sebagai** pengguna
- **Saya ingin** melihat dan mengelola riwayat CV yang sudah dibuat
- **Agar** saya dapat melihat ulang atau menghapus CV lama

**Acceptance Criteria:**

- [ ] Halaman History menampilkan daftar CV yang sudah dibuat
- [ ] Setiap item menampilkan nama, tanggal pembuatan
- [ ] Tombol "Lihat" untuk melihat CV lengkap
- [ ] Tombol "Copy" untuk menyalin CV ke clipboard
- [ ] Tombol "Hapus" untuk menghapus dari history dengan konfirmasi

#### US-009: Reset Form

- **Sebagai** pengguna
- **Saya ingin** mengosongkan semua isian form
- **Agar** saya dapat memulai pengisian dari awal

**Acceptance Criteria:**

- [ ] Tombol "Reset Form" mengosongkan semua input
- [ ] Konfirmasi dialog muncul sebelum reset
- [ ] Kolom kondisional kembali ke state awal (tersembunyi)

#### US-010: Melihat Doa & Hadits Pernikahan

- **Sebagai** pengguna Muslim/Muslimah
- **Saya ingin** melihat kumpulan doa dan hadits tentang pernikahan
- **Agar** saya dapat mempelajari dan mengamalkan doa-doa serta memahami anjuran Islam tentang pernikahan

**Acceptance Criteria:**

- [ ] Halaman menampilkan daftar doa dan hadits yang dikategorikan
- [ ] Setiap doa/hadits menampilkan teks Arab dengan font yang jelas dan mudah dibaca
- [ ] Setiap doa/hadits menampilkan terjemahan bahasa Indonesia
- [ ] Setiap hadits mencantumkan sumber referensi (kitab, nomor hadits)
- [ ] Tombol "Copy" untuk menyalin doa/hadits ke clipboard
- [ ] Notifikasi sukses muncul setelah copy berhasil
- [ ] Kategori konten mencakup:
  - Doa mencari jodoh
  - Doa saat khitbah/meminang
  - Doa malam pertama/walimah
  - Hadits keutamaan menikah
  - Hadits kriteria memilih pasangan
- [ ] Navigasi kategori memudahkan pengguna untuk berpindah antar kategori
- [ ] Desain responsif dan terlihat baik di mobile maupun desktop

#### US-011: Melihat Halaman Pengaturan & Tentang

- **Sebagai** pengguna
- **Saya ingin** melihat informasi tentang aplikasi, developer, dan teknologi yang digunakan
- **Agar** saya dapat mengetahui lebih lanjut tentang aplikasi dan menghubungi developer jika diperlukan

**Acceptance Criteria:**

- [ ] Halaman menampilkan judul "Pengaturan" atau "Tentang Aplikasi"
- [ ] Terdapat bagian **Tentang Aplikasi**:
  - Penjelasan singkat tentang Taaruf CV Kreator
  - Tujuan dan manfaat aplikasi
- [ ] Terdapat bagian **Informasi Developer**:
  - Nama developer/studio (Gulajava Ministudio)
  - Kontak (email/website)
  - Link media sosial (jika ada)
- [ ] Terdapat bagian **Tools & Teknologi**:
  - Daftar teknologi yang digunakan (HTML, Bootstrap, Vanilla JavaScript, Vite)
  - Badge/icon untuk setiap teknologi
- [ ] Terdapat informasi **Versi Aplikasi** yang sedang berjalan
- [ ] Terdapat bagian **Kebijakan Privasi**:
  - Penjelasan bahwa data tidak disimpan di server
  - Informasi bahwa data hanya tersimpan di localStorage browser pengguna
- [ ] Tombol "Reset Semua Data" untuk menghapus semua data di localStorage (dengan konfirmasi)
- [ ] Navigasi kembali ke halaman utama (Landing Page)
- [ ] Desain responsif dan terlihat baik di mobile maupun desktop

---

## 6. Lampiran A: Daftar Kolom Input (Revisi Lengkap)

Berdasarkan riset mendalam mengenai standar CV Taaruf yang umum digunakan, berikut adalah daftar kolom yang direkomendasikan untuk mencakup seluruh aspek penting (Pribadi, Agama, Keluarga, dan Visi).

**Keterangan Status:**

- ✅ **Wajib** = Harus diisi sebelum dapat melanjutkan ke preview
- ⚪ **Opsional** = Boleh dikosongkan
- 🔄 **Kondisional** = Wajib jika kondisi tertentu terpenuhi

### 6.1 Data Pribadi (Personal Information)

| ID HTML              | Label / Keterangan                                 | Tipe Input                  | Status        |
| -------------------- | -------------------------------------------------- | --------------------------- | ------------- |
| `namaLengkap`        | Nama Lengkap (sesuai KTP)                          | Text                        | ✅ Wajib       |
| `namaPanggilan`      | Nama Panggilan                                     | Text                        | ⚪ Opsional    |
| `tempatLahir`        | Tempat Lahir                                       | Text                        | ✅ Wajib       |
| `tanggalLahir`       | Tanggal Lahir                                      | Date                        | ✅ Wajib       |
| `jenisKelamin`       | Jenis Kelamin (Laki-laki/Perempuan)                | Select                      | ✅ Wajib       |
| `tinggiBadan`        | Tinggi Badan (cm)                                  | Number                      | ✅ Wajib       |
| `beratBadan`         | Berat Badan (kg)                                   | Number                      | ✅ Wajib       |
| `warnaKulit`         | Warna Kulit (misal: Sawo Matang, Putih, dll)       | Text                        | ⚪ Opsional    |
| `pekerjaan`          | Pekerjaan Saat Ini                                 | Text                        | ✅ Wajib       |
| `statusPernikahan`   | Status (Lajang/Duda/Janda)                         | Select                      | ✅ Wajib       |
| `jumlahAnak`         | Jumlah Anak (jika Duda/Janda)                      | Number                      | 🔄 Kondisional |
| `pernahKhitbah`      | Pernah Khitbah/Tunangan Sebelumnya (Ya/Tidak)      | Select                      | ⚪ Opsional    |
| `suku`               | Suku Bangsa (misal: Jawa, Sunda, Minang)           | Text                        | ⚪ Opsional    |
| `domisili`           | Alamat Domisili Saat Ini (Kota/Kabupaten)          | Text                        | ✅ Wajib       |
| `asalDaerah`         | Kota Asal (Kampung Halaman)                        | Text                        | ⚪ Opsional    |
| `pengalamanKerja`    | Pengalaman Kerja (Singkat)                         | Textarea                    | ⚪ Opsional    |
| `penghasilanBulanan` | Range Penghasilan Bulanan                          | Select                      | ⚪ Opsional    |
| `statusRumah`        | Status Tempat Tinggal (Milik Sendiri/Kontrak/Ortu) | Select                      | ⚪ Opsional    |
| `statusIzin`         | Status Izin Menikah dari Orang Tua/Wali            | Select (Sudah/Belum/Proses) | ✅ Wajib       |

### 6.2 Riwayat Pendidikan (Education History)

| ID HTML               | Label / Keterangan                                             | Tipe Input | Status     |
| --------------------- | -------------------------------------------------------------- | ---------- | ---------- |
| `pendidikanTerakhir`  | Pendidikan Terakhir (Jenjang, Jurusan, Institusi, Tahun Lulus) | Textarea   | ✅ Wajib    |
| `pendidikanNonFormal` | Pendidikan Non-Formal (Pesantren, Kursus, Bootcamp, dll)       | Textarea   | ⚪ Opsional |
| `prestasi`            | Prestasi / Keahlian Khusus                                     | Textarea   | ⚪ Opsional |

### 6.3 Informasi Keluarga (Family Information)

| ID HTML       | Label / Keterangan                                      | Tipe Input | Status     |
| ------------- | ------------------------------------------------------- | ---------- | ---------- |
| `infoAyah`    | Data Ayah (Nama, Usia, Pekerjaan, Agama, Status Hidup)  | Textarea   | ✅ Wajib    |
| `infoIbu`     | Data Ibu (Nama, Usia, Pekerjaan, Agama, Status Hidup)   | Textarea   | ✅ Wajib    |
| `urutanAnak`  | Anak ke-X dari Y bersaudara                             | Text       | ✅ Wajib    |
| `infoSaudara` | Data Saudara Kandung (Kakak/Adik, Status Menikah/Belum) | Textarea   | ⚪ Opsional |

### 6.4 Ibadah & Pemahaman Agama (Religious Practice)

| ID HTML              | Label / Keterangan                                               | Tipe Input | Status     |
| -------------------- | ---------------------------------------------------------------- | ---------- | ---------- |
| `statusMuallaf`      | Status Muallaf (Ya/Tidak, jika Ya sebutkan tahun)                | Text       | ⚪ Opsional |
| `shalatWajib`        | Pelaksanaan Shalat Wajib (misal: Rutin berjamaah di masjid)      | Textarea   | ✅ Wajib    |
| `ibadahSunnah`       | Kebiasaan Ibadah Sunnah (Dhuha, Tahajud, Puasa Sunnah)           | Textarea   | ⚪ Opsional |
| `bacaanQuran`        | Kemampuan Baca Al-Qur'an & Hafalan (misal: Lancar, Hafal Juz 30) | Textarea   | ✅ Wajib    |
| `kajianFavorit`      | Kajian / Ustadz yang sering disimak (Rujukan Ilmu)               | Textarea   | ⚪ Opsional |
| `afiliasiOrganisasi` | Organisasi / Komunitas Islam yang diikuti (jika ada)             | Text       | ⚪ Opsional |

### 6.5 Profil Diri & Kebiasaan (Personal Profile)

| ID HTML           | Label / Keterangan                                   | Tipe Input | Status        |
| ----------------- | ---------------------------------------------------- | ---------- | ------------- |
| `hobi`            | Hobi / Kegemaran                                     | Text       | ⚪ Opsional    |
| `sifatPositif`    | Sifat Positif (Kelebihan diri)                       | Textarea   | ✅ Wajib       |
| `sifatNegatif`    | Sifat Negatif (Kekurangan diri yang perlu dimaklumi) | Textarea   | ✅ Wajib       |
| `riwayatPenyakit` | Riwayat Penyakit (Fisik/Psikis)                      | Textarea   | ⚪ Opsional    |
| `merokok`         | Kebiasaan Merokok (Ya/Tidak/Pernah)                  | Select     | ✅ Wajib       |
| `statusHijab`     | Status Hijab - Akhwat (Syar'i/Non-Syar'i/Bercadar)   | Select     | 🔄 Kondisional |
| `statusJenggot`   | Memelihara Jenggot - Ikhwan (Ya/Tidak)               | Select     | 🔄 Kondisional |
| `visiMisiHidup`   | Motto / Visi Misi Hidup Pribadi                      | Textarea   | ⚪ Opsional    |

### 6.6 Visi Pernikahan (Marriage Vision)

| ID HTML                 | Label / Keterangan                                               | Tipe Input | Status        |
| ----------------------- | ---------------------------------------------------------------- | ---------- | ------------- |
| `visiPernikahan`        | Visi & Misi Pernikahan (Tujuan menikah)                          | Textarea   | ✅ Wajib       |
| `kriteriaPasangan`      | Kriteria Calon Pasangan (Fisik, Sifat, Pendidikan, dll)          | Textarea   | ✅ Wajib       |
| `pandanganMahar`        | Pandangan tentang Mahar (Ekspektasi/Fleksibel)                   | Textarea   | ⚪ Opsional    |
| `kesediaanPoligami`     | Pandangan tentang Poligami - Ikhwan (Bersedia/Tidak/Kondisional) | Select     | 🔄 Kondisional |
| `kesediaanDipoligami`   | Kesediaan Dipoligami - Akhwat (Bersedia/Tidak/Kondisional)       | Select     | 🔄 Kondisional |
| `pandanganNafkah`       | Pandangan Istri Bekerja (IRT Penuh/Boleh Bekerja/Kondisional)    | Select     | ⚪ Opsional    |
| `kesediaanPindah`       | Kesediaan Pindah Domisili Setelah Menikah (Ya/Tidak/Diskusi)     | Select     | ⚪ Opsional    |
| `targetMenikah`         | Target Waktu Menikah (misal: 6 bulan, 1 tahun)                   | Text       | ⚪ Opsional    |
| `rencanaSetelahMenikah` | Rencana Pasca Nikah (Domisili, Karir, Keturunan, dll)            | Textarea   | ⚪ Opsional    |

### 6.7 Kontak & Admin (Contact & Admin)

*Bagian ini biasanya untuk keperluan mediator/admin dan tidak selalu ditampilkan di CV publik, namun penting untuk database.*

| ID HTML      | Label / Keterangan                                         | Tipe Input | Status     |
| ------------ | ---------------------------------------------------------- | ---------- | ---------- |
| `noHP`       | Nomor WhatsApp Aktif                                       | Tel        | ⚪ Opsional |
| `email`      | Alamat Email                                               | Email      | ⚪ Opsional |
| `akunSosmed` | Akun Media Sosial (Instagram/Facebook/LinkedIn) - Opsional | Text       | ⚪ Opsional |
| `kontakWali` | Kontak Wali / Mediator (Nama & No HP)                      | Text       | ⚪ Opsional |

---

## 7. Catatan Kolom Kondisional

Beberapa kolom input bersifat **kondisional** dan hanya ditampilkan berdasarkan input pengguna sebelumnya:

| Kolom                 | Kondisi Tampil                                    |
| --------------------- | ------------------------------------------------- |
| `jumlahAnak`          | Hanya muncul jika `statusPernikahan` = Duda/Janda |
| `statusHijab`         | Hanya muncul jika `jenisKelamin` = Perempuan      |
| `statusJenggot`       | Hanya muncul jika `jenisKelamin` = Laki-laki      |
| `kesediaanPoligami`   | Hanya muncul jika `jenisKelamin` = Laki-laki      |
| `kesediaanDipoligami` | Hanya muncul jika `jenisKelamin` = Perempuan      |

---

## 8. Lampiran B: Daftar Doa & Hadits Pernikahan

Berikut adalah daftar doa dan hadits yang akan ditampilkan di halaman Doa & Hadits Pernikahan. Konten bersifat statis dan telah dikurasi dari sumber-sumber yang shahih.

### 8.1 Doa Mencari Jodoh (Sebelum Menikah)

| ID    | Judul                          | Teks Arab                                                        | Terjemahan                                                                                                                                                       | Sumber               |
| ----- | ------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| DJ-01 | Doa Nabi Musa AS Mencari Jodoh | رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ                                 | "Ya Tuhanku, sesungguhnya aku sangat memerlukan kebaikan apapun yang Engkau turunkan kepadaku."                                                                  | QS. Al-Qashash: 24   |
| DJ-02 | Doa Memohon Pasangan Shalih    | رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا   | "Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan yang menjadi penyejuk mata kami, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa." | QS. Al-Furqan: 74    |
| DJ-03 | Doa Istikharah                 | اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ... | "Ya Allah, aku memohon pilihan yang terbaik kepada-Mu dengan ilmu-Mu, aku memohon kekuatan dengan kekuasaan-Mu, dan aku memohon karunia-Mu yang agung..."        | HR. Bukhari no. 1162 |

### 8.2 Doa Saat Khitbah/Meminang

| ID    | Judul                             | Teks Arab                                                                     | Terjemahan                                                                                                                                                                                      | Sumber                 |
| ----- | --------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| DK-01 | Doa Ketika Melihat Calon Pasangan | اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ | "Ya Allah, aku memohon kepada-Mu kebaikannya dan kebaikan yang Engkau ciptakan dalam dirinya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan yang Engkau ciptakan dalam dirinya." | HR. Abu Dawud no. 2160 |

### 8.3 Doa Malam Pertama & Walimah

| ID    | Judul                               | Teks Arab                                                                     | Terjemahan                                                                                                                                                                          | Sumber                 |
| ----- | ----------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| DW-01 | Doa Pengantin untuk Pasangan        | بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ                                    | "Semoga Allah memberkahimu dan memberkahi atasmu, serta mengumpulkan kalian berdua dalam kebaikan."                                                                                 | HR. Abu Dawud no. 2130 |
| DW-02 | Doa Malam Pertama                   | اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ | "Ya Allah, aku memohon kepada-Mu kebaikannya dan kebaikan yang Engkau ciptakan padanya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan yang Engkau ciptakan padanya." | HR. Abu Dawud no. 2160 |
| DW-03 | Doa Sebelum Berhubungan Suami Istri | بِسْمِ اللَّهِ اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا                           | "Dengan nama Allah. Ya Allah, jauhkanlah kami dari setan dan jauhkanlah setan dari apa yang Engkau rezekikan kepada kami."                                                          | HR. Bukhari no. 141    |

### 8.4 Hadits Keutamaan Menikah

| ID    | Judul                       | Teks Arab                                                               | Terjemahan                                                                                                                                                    | Sumber                  |
| ----- | --------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| HK-01 | Menikah Setengah Agama      | إِذَا تَزَوَّجَ الْعَبْدُ فَقَدِ اسْتَكْمَلَ نِصْفَ الدِّينِ فَلْيَتَّقِ اللَّهَ فِي النِّصْفِ الْبَاقِي          | "Jika seorang hamba menikah, maka ia telah menyempurnakan setengah agamanya. Maka bertakwalah kepada Allah pada setengah sisanya."                            | HR. Baihaqi             |
| HK-02 | Anjuran Menikah bagi Pemuda | يَا مَعْشَرَ الشَّبَابِ مَنِ اسْتَطَاعَ مِنْكُمُ الْبَاءَةَ فَلْيَتَزَوَّجْ فَإِنَّهُ أَغَضُّ لِلْبَصَرِ وَأَحْصَنُ لِلْفَرْجِ | "Wahai para pemuda, barangsiapa di antara kalian yang mampu menikah, maka menikahlah. Karena menikah lebih menundukkan pandangan dan lebih menjaga kemaluan." | HR. Bukhari no. 5066    |
| HK-03 | Menikah adalah Sunnahku     | النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي                               | "Menikah adalah sunnahku. Barangsiapa yang tidak mengamalkan sunnahku, maka ia bukan dari golonganku."                                                        | HR. Ibnu Majah no. 1846 |

### 8.5 Hadits Kriteria Memilih Pasangan

| ID    | Judul                                 | Teks Arab                                                                        | Terjemahan                                                                                                                                                                  | Sumber                |
| ----- | ------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| HP-01 | Empat Kriteria Memilih Wanita         | تُنْكَحُ الْمَرْأَةُ لِأَرْبَعٍ لِمَالِهَا وَلِحَسَبِهَا وَجَمَالِهَا وَلِدِينِهَا فَاظْفَرْ بِذَاتِ الدِّينِ تَرِبَتْ يَدَاكَ      | "Wanita dinikahi karena empat hal: hartanya, keturunannya, kecantikannya, dan agamanya. Pilihlah yang beragama, niscaya kamu beruntung."                                    | HR. Bukhari no. 5090  |
| HP-02 | Kriteria Memilih Pria                 | إِذَا خَطَبَ إِلَيْكُمْ مَنْ تَرْضَوْنَ دِينَهُ وَخُلُقَهُ فَزَوِّجُوهُ إِلَّا تَفْعَلُوا تَكُنْ فِتْنَةٌ فِي الْأَرْضِ وَفَسَادٌ عَرِيضٌ | "Jika datang kepada kalian seorang lelaki yang agama dan akhlaknya kalian ridhai, maka nikahkanlah. Jika tidak, akan terjadi fitnah di muka bumi dan kerusakan yang besar." | HR. Tirmidzi no. 1084 |
| HP-03 | Wanita Shalihah Sebaik-baik Perhiasan | الدُّنْيَا مَتَاعٌ وَخَيْرُ مَتَاعِ الدُّنْيَا الْمَرْأَةُ الصَّالِحَةُ                                      | "Dunia adalah perhiasan, dan sebaik-baik perhiasan dunia adalah wanita yang shalihah."                                                                                      | HR. Muslim no. 1467   |

---

## 9. Riwayat Revisi Dokumen

| Versi | Tanggal         | Deskripsi Perubahan                                           |
| ----- | --------------- | ------------------------------------------------------------- |
| 1.0   | 5 Desember 2025 | Dokumen PRD awal dibuat                                       |
| 1.1   | 6 Desember 2025 | Penambahan kolom input berdasarkan riset lanjutan             |
| 1.2   | 6 Desember 2025 | Penambahan User Stories, fitur Preview, Draft, dan History CV |
| 1.3   | 7 Desember 2025 | Penambahan Landing Page dan struktur halaman aplikasi         |
| 1.4   | 7 Desember 2025 | Penambahan halaman Doa & Hadits Pernikahan                    |
| 1.5   | 7 Desember 2025 | Penambahan halaman Pengaturan & Tentang Aplikasi              |

### Detail Perubahan Versi 1.5

**Fitur Baru yang Ditambahkan:**

1. **Halaman Pengaturan & Tentang Aplikasi:**
   - Halaman baru berisi informasi tentang aplikasi
   - Konten meliputi:
     - Tentang Aplikasi (penjelasan dan tujuan)
     - Informasi Developer (nama, kontak, media sosial)
     - Tools & Teknologi yang digunakan
     - Versi Aplikasi
     - Kebijakan Privasi
   - Tombol "Reset Semua Data" untuk menghapus localStorage

2. **Update Landing Page:**
   - Penambahan tombol/icon navigasi "Pengaturan" di landing page

3. **Update Flowchart Navigasi:**
   - Penambahan jalur navigasi ke Halaman Pengaturan dari Landing Page

4. **User Stories:**
   - Total 11 User Stories (US-001 s/d US-011)
   - US-011: Melihat Halaman Pengaturan & Tentang (baru ditambahkan)

5. **Fitur Future (Dipertimbangkan):**
   - Tema tampilan (Light/Dark Mode)

### Detail Perubahan Versi 1.4

**Fitur Baru yang Ditambahkan:**

1. **Halaman Doa & Hadits Pernikahan:**
   - Halaman baru berisi kumpulan doa dan hadits seputar pernikahan
   - Konten statis dengan 5 kategori:
     - Doa mencari jodoh (3 doa)
     - Doa saat khitbah/meminang (1 doa)
     - Doa malam pertama & walimah (3 doa)
     - Hadits keutamaan menikah (3 hadits)
     - Hadits kriteria memilih pasangan (3 hadits)
   - Setiap doa/hadits mencakup teks Arab, terjemahan, dan sumber referensi
   - Fitur copy doa/hadits ke clipboard
   - Navigasi kategori untuk kemudahan akses

2. **Update Landing Page:**
   - Penambahan tombol navigasi "Doa & Hadits" di landing page

3. **User Stories:**
   - Total 10 User Stories (US-001 s/d US-010)
   - US-010: Melihat Doa & Hadits Pernikahan (baru ditambahkan)

4. **Lampiran B:**
   - Penambahan Lampiran B: Daftar Doa & Hadits Pernikahan
   - Total 13 doa dan hadits dengan sumber referensi shahih

5. **Fitur Future (Dipertimbangkan):**
   - Fitur audio bacaan doa/hadits untuk pengembangan selanjutnya

### Detail Perubahan Versi 1.3

**Fitur Baru yang Ditambahkan:**

1. **Landing Page:**
   - Halaman utama sebagai pintu masuk aplikasi
   - Penjelasan singkat tentang aplikasi dan cara penggunaan
   - Quick action buttons (Buat CV, Lihat Draft, Lihat History)
   - Footer dengan informasi pengembang

2. **Struktur Halaman Aplikasi:**
   - Definisi 5 halaman utama (Landing, Form, Preview, Draft, History)
   - Navigasi antar halaman yang jelas

3. **User Stories:**
   - Total 9 User Stories (US-001 s/d US-009)
   - US-001: Landing Page (baru ditambahkan)
   - Penomoran ulang User Stories sebelumnya

### Detail Perubahan Versi 1.2

**Fitur Baru yang Ditambahkan:**

1. **Fitur Preview:**
   - Halaman preview sebelum generate CV
   - Navigasi kembali ke form untuk perbaikan

2. **Fitur Draft (localStorage):**
   - Simpan draft ke localStorage
   - Halaman khusus untuk mengelola draft
   - Load dan hapus draft

3. **Fitur History CV:**
   - Simpan CV yang sudah di-generate ke history
   - Halaman khusus untuk melihat riwayat CV
   - Lihat ulang dan hapus CV dari history

4. **Validasi Form:**
   - Penambahan status Wajib/Opsional untuk setiap kolom
   - Validasi kolom wajib sebelum preview

5. **User Stories:**
   - 9 User Stories dengan Acceptance Criteria
   - Alur utama pengguna (flowchart)
   - Struktur halaman aplikasi (Landing Page ditambahkan)

### Detail Perubahan Versi 1.1

**Kolom Baru yang Ditambahkan:**

1. **Data Pribadi (5 kolom baru):**
   - `jumlahAnak` - Jumlah anak jika status Duda/Janda
   - `pernahKhitbah` - Riwayat pernah khitbah/tunangan sebelumnya
   - `pengalamanKerja` - Pengalaman kerja singkat
   - `penghasilanBulanan` - Range penghasilan bulanan
   - `statusRumah` - Status tempat tinggal saat ini

2. **Ibadah & Pemahaman Agama (1 kolom baru):**
   - `statusMuallaf` - Status muallaf dan tahun masuk Islam

3. **Profil Diri & Kebiasaan (2 kolom baru):**
   - `statusHijab` - Status hijab untuk Akhwat
   - `statusJenggot` - Status memelihara jenggot untuk Ikhwan

4. **Visi Pernikahan (6 kolom baru):**
   - `pandanganMahar` - Ekspektasi/pandangan tentang mahar
   - `kesediaanPoligami` - Pandangan tentang poligami (Ikhwan)
   - `kesediaanDipoligami` - Kesediaan dipoligami (Akhwat)
   - `pandanganNafkah` - Pandangan istri bekerja
   - `kesediaanPindah` - Kesediaan pindah domisili
   - `targetMenikah` - Target waktu menikah

# Taaruf CV Kreator

![Logo Taaruf CV Kreator](public/wedding-rings.png)

## Buat CV Taaruf Syar'i dengan Privasi Terjaga

Platform pembuatan CV Taaruf yang aman, privat, dan mudah digunakan.

---

**Taaruf CV Kreator** adalah aplikasi web modern yang didedikasikan untuk
membantu Muslim dan Muslimah menyusun Curriculum Vitae (CV) taaruf yang rapi,
terstruktur, dan sesuai syariat.

## Privasi Adalah Prioritas Kami

Kami memahami bahwa data taaruf adalah privasi yang sangat sensitif. Aplikasi
ini dibangun dengan pendekatan **Privacy-First**: seluruh data Anda diproses
dan disimpan secara lokal di browser perangkat Anda. **Tidak ada data yang
dikirim ke server kami.**

## Fitur Unggulan

- 🔒 **Privasi Mutlak (Client-Side Only)** -
  Arsitektur aplikasi menjamin data Anda tetap berada di perangkat Anda.
  Menggunakan teknologi LocalStorage untuk penyimpanan data.

- 📄 **Format Standar Taaruf** -
  Template CV yang telah disesuaikan dengan standar umum proses taaruf,
  mencakup data diri, kriteria pasangan, visi misi pernikahan,
  hingga riwayat pendidikan.

- 💾 **Simpan & Lanjut Nanti** -
  Fitur *Auto-Save* dan *Draft* memungkinkan Anda mengisi formulir panjang
  secara bertahap tanpa takut kehilangan data.

- 🎨 **Tampilan Modern & Responsif** -
  Antarmuka yang bersih dengan tema *Burgundy & Amber* yang elegan,
  nyaman diakses baik melalui Desktop, Tablet, maupun Smartphone.

- 📚 **Suplemen Ibadah** -
  Dilengkapi dengan fitur Doa & Hadits pilihan seputar pernikahan
  sebagai bekal spiritual dalam proses taaruf.

- 📤 **Ekspor Mudah** -
  Generate CV Anda ke format yang siap dibagikan kepada perantara
  (murabbi/ustadz) dengan satu klik.

## Teknologi

Project ini dikembangkan dengan standar *Clean Code* dan *Clean Architecture*
untuk memastikan performa dan kemudahan pengembangan:

- **Core:** Vanilla JavaScript (ES6+)
- **UI Framework:** Bootstrap 5
- **Build Tool:** Vite
- **Architecture:** MVC (Model-View-Controller)
- **Storage:** Browser LocalStorage API

## Panduan Memulai

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal
Anda.

### Prasyarat

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- npm (Node Package Manager)

### Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/username/taaruf-cv-kreator.git
   cd taaruf-cv-kreator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan mode pengembangan**

   ```bash
   npm run dev
   ```

   Aplikasi akan dapat diakses di `http://localhost:5173`.

4. **Build untuk production**

   ```bash
   npm run build
   ```

## Struktur Project

Gambaran singkat struktur direktori project:

```text
taaruf-cv-kreator/
├── docs/               # Dokumentasi lengkap & laporan fase
├── plan/               # Rencana pengembangan fitur
├── spec/               # Spesifikasi teknis & desain sistem
├── src/
│   ├── components/     # Komponen UI (Modal, Toast, Cards)
│   ├── data/           # Data statis (Doa, Hadits)
│   ├── router/         # Sistem routing aplikasi
│   ├── services/       # Logika bisnis (Storage, Generator, Validasi)
│   ├── utils/          # Fungsi utilitas (Date, ID, Formatting)
│   ├── views/          # Halaman/View aplikasi
│   └── main.js         # Entry point
└── index.html          # File utama HTML
```

## Status Pengembangan

Saat ini project telah menyelesaikan **Fase 5** (Feature Integration & Testing).

| Fase       | Deskripsi                        | Status    |
| :--------- | :------------------------------- | :-------- |
| **Fase 1** | Data Layer & Storage Service     | ✅ Selesai |
| **Fase 2** | UI Skeleton & Routing            | ✅ Selesai |
| **Fase 3** | Form Implementation & Validation | ✅ Selesai |
| **Fase 4** | CV Generator Logic               | ✅ Selesai |
| **Fase 5** | Integration, Polishing & Testing | ✅ Selesai |
| **Fase 6** | Performance & Deployment         | ⏳ Pending |

## Catatan Pengujian

Aplikasi ini telah melalui pengujian *Cross-Browser* dan *Responsive Design*
untuk memastikan kompatibilitas yang luas.

## Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

---

Dibuat dengan ❤️ oleh **Gulajava Ministudio**

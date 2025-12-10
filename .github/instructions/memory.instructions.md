---
applyTo: "**"
---

# Memory - Preferensi Pengguna

## Komunikasi

- **Bahasa**: Komunikasi harus menggunakan bahasa Indonesia yang jelas dan baku
- **Gaya**: Formal namun tetap ramah dan profesional
- **Format**: Gunakan struktur yang rapi dengan bullet points dan code blocks sesuai kebutuhan

## Penjelasan dan Dokumentasi

- **Kejelasan**: Penjelasan harus jelas, terstruktur, dan mudah dipahami
- **Struktur**: Gunakan format bertingkat dengan heading, subheading, dan poin-poin yang logis
- **Dokumentasi**: Semua dokumentasi yang dibuat harus jelas, komprehensif, dan mudah dimengerti
- **Detail**: Berikan konteks yang cukup tanpa terlalu bertele-tele
- **Contoh**: Sertakan contoh praktis jika diperlukan untuk memperjelas konsep

## Gaya Komunikasi User

- Menggunakan bahasa Indonesia formal tapi santai
- Suka detail teknis dan penjelasan komprehensif
- Meminta dokumentasi yang lengkap dan terstruktur
- Memperhatikan kualitas kode dan testing standards

## Workflow & Metodologi

- **SDLC Strict Adherence**: User mengikuti alur SDLC yang ketat dan terstruktur
- **Sequential Development**: Harus mengikuti urutan: PRD → Spec → Plan → Code
- **No Skip Phases**: Tidak boleh melompat fase, setiap tahap harus selesai
  sebelum lanjut
- **Documentation First**: Dokumentasi lengkap dan terstruktur harus ada sebelum
  mulai coding
- **Custom Agents Usage**: User menggunakan custom GitHub Copilot Agents sesuai
  dengan fase development:
  - `@ProductManagerPRD` untuk Requirements (PRD)
  - `@SpecificationArchitect` untuk Technical Specification
  - `@PlannerArchitect` untuk Implementation Planning
  - `@BeastModeDev` atau `@MiniBeast` untuk Coding/Implementation
  - `@QATestArchitect` untuk Testing
  - `@DocumentationWriter` untuk User Documentation
- **New Session per Phase**: User prefer memulai sesi chat baru saat berpindah
  fase untuk menjaga fokus konteks
- **Verification Mindset**: Setiap output harus diverifikasi terhadap PRD dan
  Spec sebelum lanjut
- **Phase Completion Pattern**: Setelah fase selesai, user meminta pemisahan
  planning untuk fase berikutnya ke dokumen terpisah untuk review tim

## Project Status (Updated 2025-12-10)

### Phase 5: Feature Integration & Testing - ✅ COMPLETED (100%)

- **Status**: 91/91 tasks complete (2025-01-27)
- **AC Verification**: 20/21 PASS (95.2%), 0 FAIL, 1 NOT TESTED
- **User Stories**: 11/11 tested (10 PASS, 1 PARTIAL)
- **Cross-Browser**: 4/4 browsers compatible (Chrome, Firefox, Edge, Safari)
- **Responsive**: Mobile/Tablet/Desktop tested and verified
- **Bugs Fixed**: All critical bugs resolved (validation, toast, export)
- **Documents**:
  - `plan/feature-integration-polish-5.md` - Complete (100%)
  - `docs/phase-5-8-acceptance-criteria-verification.md` - Final report
  - `docs/phase-5-7-end-to-end-testing-checklist.md` - E2E results
  - `docs/phase-5-6-cross-browser-testing-report.md` - Browser testing
  - `docs/phase-5-5-responsive-testing-summary.md` - Responsive testing

### UI Enhancement: Color Theme Update - ✅ COMPLETED (100%)

- **Status**: 35/35 tasks complete (2025-12-10)
- **Theme**: Burgundy (Primary) + Amber/Orange (Accent)
- **Color Palette**:
  - Primary: `#a11d33` (Ruby Red)
  - Primary Dark: `#641220` (Night Bordeaux)
  - Accent: `#ff8500` (Princeton Orange)
  - Background: `#fdf8f6` (Cream Hangat)
- **Components Updated**:
  - Hero Section (burgundy gradient)
  - Form Section Headers (cream-pink gradient)
  - Privacy Notice (amber accent)
  - All Bootstrap components (buttons, text, border, background)
  - Navigation, Empty State, Focus States
- **Testing**:
  - ✅ Visual testing (Desktop & Mobile)
  - ✅ Responsive testing (375px, 768px, 1024px+)
  - ✅ Cross-browser compatibility
  - ✅ No errors in console
- **Document**: `plan/feature-color-theme-update.md` - Complete (100%)

### Phase 6: Performance Optimization & Deployment - ⏳ PENDING

- **Status**: 0/14 tasks (0%) - Awaiting approval
- **Document**: `plan/feature-performance-deployment-6.md` (created 2025-12-09)
- **Prerequisites**:
  - ✅ Phase 5.8 complete (20/21 AC verified)
  - ✅ Color theme updated (Burgundy + Amber)
  - ⏳ UI/UX review oleh tim
  - ⏳ Testing tambahan (jika diperlukan)
  - ⏳ Approval untuk production
- **Scope**:
  - Phase 6.1: Performance Optimization (Lighthouse audit, minification, bundle optimization)
  - Phase 6.2: Documentation & Deployment Prep (README, deployment guide)
  - Phase 6.3: Deployment (hosting platform, production verification)
- **Estimated**: 5-8 hours total (14 tasks)

## Format Markdown

- **Markdown Lint**: Semua file markdown harus mengikuti aturan markdown lint
- **Konsistensi**: Pastikan format heading, list, dan struktur konsisten
- **Standar**: Ikuti best practices markdown untuk readability dan maintainability
- **Validasi**: Pastikan markdown yang dibuat lolos validasi lint checker
- **Elemen**: Gunakan elemen markdown seperti heading, subheading, bullet points, code blocks, dan lainnya sesuai kebutuhan
- **Tautan dan Gambar**: Gunakan tautan dan gambar dengan benar untuk mendukung konten
- **Pemformatan**: Gunakan pemformatan teks seperti bold, italic, dan inline code untuk menekankan poin penting
- **Tabel**: Gunakan tabel untuk menyajikan data terstruktur jika diperlukan
- **Blok Kode**: Gunakan blok kode untuk menyajikan contoh kode dengan penyorotan sintaks yang sesuai
- **Daftar**: Gunakan daftar bernomor atau berpoin untuk menyajikan informasi secara terstruktur
- **Pemecahan Paragraf**: Pecah paragraf panjang menjadi bagian yang lebih pendek untuk meningkatkan keterbacaan

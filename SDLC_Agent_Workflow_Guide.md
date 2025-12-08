# Panduan Alur Kerja SDLC dengan Custom Agents

## Dokumen Referensi Tim Pengembangan

| Info                  | Detail              |
| --------------------- | ------------------- |
| **Tanggal Pembuatan** | 7 Desember 2025     |
| **Versi**             | 1.0                 |
| **Pemilik Dokumen**   | Gulajava Ministudio |
| **Status**            | Aktif               |

---

## 1. Pendahuluan

Dokumen ini menjelaskan alur kerja pengembangan perangkat lunak (SDLC) menggunakan **Custom GitHub Copilot Agents** yang telah dikonfigurasi di folder `.github/agents/`. Panduan ini bertujuan untuk memberikan pemahaman yang jelas tentang kapan dan bagaimana menggunakan setiap agent dalam proses pengembangan.

### 1.1 Tujuan Dokumen

- Memberikan panduan penggunaan setiap custom agent
- Menjelaskan alur kerja SDLC yang terintegrasi dengan agents
- Menjadi referensi bagi tim dalam memilih agent yang tepat untuk setiap tahap

### 1.2 Daftar Custom Agents

| No  | Agent File                        | Nama Agent                  | Deskripsi Singkat                         |
| --- | --------------------------------- | --------------------------- | ----------------------------------------- |
| 1   | `ProductManagerPRD.agent.md`      | **Product Manager PRD**     | Membuat Product Requirements Document     |
| 2   | `SpecificationArchitect.agent.md` | **Specification Architect** | Membuat Technical Specification           |
| 3   | `PlannerArchitect.agent.md`       | **Planner Architect**       | Membuat Implementation Plan               |
| 4   | `BeastModeDev.agent.md`           | **Beast Mode Dev**          | Development & Coding (Full Power)         |
| 5   | `MiniBeast.agent.md`              | **Mini Beast**              | Development (Optimized untuk model kecil) |
| 6   | `QATestArchitect.agent.md`        | **QA Test Architect**       | Testing & Quality Assurance               |
| 7   | `DocumentationWriter.agent.md`    | **Documentation Writer**    | Membuat dokumentasi teknis                |

---

## 2. Alur Kerja SDLC dengan Custom Agents

### 2.1 Diagram Alur Kerja

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    SDLC WORKFLOW DENGAN CUSTOM AGENTS                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌───────────────────────┐                                                      │
│  │ [1] ProductManagerPRD │                                                      │
│  │     (Requirements)    │                                                      │
│  └───────────┬───────────┘                                                      │
│              │                                                                  │
│              ▼ Output: PRD (Product_Requirement_Document.md)                    │
│              │                                                                  │
│  ┌───────────────────────────┐                                                  │
│  │ [2] SpecificationArchitect │                                                 │
│  │     (Technical Design)     │                                                 │
│  └───────────┬───────────────┘                                                  │
│              │                                                                  │
│              ▼ Output: Technical Spec (/spec/*.md)                              │
│              │                                                                  │
│  ┌─────────────────────┐                                                        │
│  │ [3] PlannerArchitect │                                                       │
│  │     (Planning)       │                                                       │
│  └───────────┬─────────┘                                                        │
│              │                                                                  │
│              ▼ Output: Implementation Plan (/plan/*.md)                         │
│              │                                                                  │
│  ┌─────────────────────────────────┐                                            │
│  │ [4] BeastModeDev / MiniBeast    │                                            │
│  │     (Implementation)            │                                            │
│  └───────────┬─────────────────────┘                                            │
│              │                                                                  │
│              ▼ Output: Source Code (/src/*)                                     │
│              │                                                                  │
│  ┌─────────────────────┐                                                        │
│  │ [5] QATestArchitect  │                                                       │
│  │     (Testing)        │                                                       │
│  └───────────┬─────────┘                                                        │
│              │                                                                  │
│              ▼ Output: Test Plan & Test Code (/test-plans/*, /tests/*)          │
│              │                                                                  │
│  ┌───────────────────────┐                                                      │
│  │ [6] DocumentationWriter│                                                     │
│  │     (Documentation)    │                                                     │
│  └───────────┬───────────┘                                                      │
│              │                                                                  │
│              ▼ Output: Documentation (/docs/*)                                  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Tabel Ringkasan Alur

| Tahap             | Agent                    | Input                | Output              | Lokasi Output             |
| ----------------- | ------------------------ | -------------------- | ------------------- | ------------------------- |
| 1. Requirements   | ProductManagerPRD        | Ide/Kebutuhan bisnis | PRD                 | Root / `/docs/`           |
| 2. Specification  | SpecificationArchitect   | PRD                  | Technical Spec      | `/spec/`                  |
| 3. Planning       | PlannerArchitect         | PRD + Spec           | Implementation Plan | `/plan/`                  |
| 4. Implementation | BeastModeDev / MiniBeast | Plan + Spec          | Source Code         | `/src/`                   |
| 5. Testing        | QATestArchitect          | Source Code          | Test Plan & Tests   | `/test-plans/`, `/tests/` |
| 6. Documentation  | DocumentationWriter      | Source Code          | User/API Docs       | `/docs/`                  |

---

## 3. Detail Setiap Agent

### 3.1 ProductManagerPRD

**File:** `.github/agents/ProductManagerPRD.agent.md`

**Peran:** Senior Product Manager yang bertanggung jawab membuat Product Requirements Document (PRD).

**Fokus Utama:**

- Mendefinisikan **WHY** (Business Goals)
- Mendefinisikan **WHO** (Target Audience)
- Mendefinisikan **WHAT** (Features & Requirements)

**Cara Menggunakan:**

```bash
@ProductManagerPRD Buatkan PRD untuk aplikasi [nama aplikasi] dengan fitur [deskripsi fitur]
```

**Output yang Dihasilkan:**

- File `prd.md` atau nama custom
- Berisi: Product Overview, Goals, User Stories, Acceptance Criteria, Technical Considerations

**Batasan:**

- ❌ Tidak boleh menulis kode
- ❌ Tidak boleh menjalankan command/test
- ✅ Hanya fokus pada definisi produk dan requirements

**Template PRD yang Digunakan:**

1. Product Overview
2. Goals (Business, User, Non-goals)
3. User Stories & Acceptance Criteria
4. Technical Considerations
5. Success Metrics
6. Timeline & Milestones

---

### 3.2 SpecificationArchitect

**File:** `.github/agents/SpecificationArchitect.agent.md`

**Peran:** Specification Architect yang menerjemahkan PRD menjadi Technical Specification.

**Fokus Utama:**

- Mendefinisikan **HOW** secara teknis
- Membuat dokumen yang machine-readable
- Mendefinisikan Requirements, Constraints, dan Interfaces

**Cara Menggunakan:**

```bash
@SpecificationArchitect Buatkan technical specification berdasarkan PRD di file [path/to/prd.md]
```

**Output yang Dihasilkan:**

- File di folder `/spec/`
- Naming convention: `spec-[purpose]-[name].md`
- Purpose prefix: `schema`, `tool`, `data`, `infrastructure`, `process`, `architecture`, `design`

**Contoh Nama File:**

- `spec-design-taaruf-cv-form.md`
- `spec-data-localstorage-schema.md`
- `spec-architecture-navigation.md`

**Batasan:**

- ❌ Tidak boleh mengedit kode aplikasi (`/src`, `/lib`)
- ✅ Hanya boleh membuat/mengedit file di `/spec/`

**Template Specification:**

```markdown
---
title: [Judul Spesifikasi]
version: 1.0
date_created: YYYY-MM-DD
tags: [infrastructure, design, etc]
---

# Introduction
## 1. Purpose & Scope
## 2. Definitions
## 3. Requirements, Constraints & Guidelines
   - REQ-001: Requirement
   - CON-001: Constraint
   - GUD-001: Guideline
## 4. Interfaces & Data Contracts
## 5. Acceptance Criteria
   - AC-001: Given-When-Then
## 6. Test Automation Strategy
## 7. Rationale & Context
## 8. Dependencies
## 9. Examples & Edge Cases
## 10. Validation Criteria
```

---

### 3.3 PlannerArchitect

**File:** `.github/agents/PlannerArchitect.agent.md`

**Peran:** Strategic Architecture & Planning Assistant yang membuat Implementation Plan.

**Fokus Utama:**

- Membuat rencana implementasi yang terstruktur
- Mendefinisikan fase-fase pengembangan
- Membuat task list yang executable

**Cara Menggunakan:**

```bash
@PlannerArchitect Buatkan implementation plan untuk fitur [nama fitur] berdasarkan spec di [path/to/spec.md]
```

**Output yang Dihasilkan:**

- File di folder `/plan/`
- Naming convention: `[purpose]-[component]-[version].md`
- Purpose prefix: `upgrade`, `refactor`, `feature`, `data`, `infrastructure`, `process`, `architecture`, `design`

**Contoh Nama File:**

- `feature-form-input-1.md`
- `feature-cv-generator-1.md`
- `infrastructure-localstorage-1.md`

**Batasan:**

- ❌ Tidak boleh menulis kode
- ✅ Fokus pada analisis dan perencanaan

**Workflow Agent:**

1. **Phase 1: Discussion & Analysis** - Kolaborasi untuk memahami requirements
2. **Phase 2: Plan Generation** - Membuat dokumen formal

**Template Implementation Plan:**

```markdown
---
goal: [Tujuan Plan]
version: 1.0
date_created: YYYY-MM-DD
status: Planned | In progress | Completed
tags: [feature, upgrade, etc]
---

# Introduction
## 1. Requirements & Constraints
   - REQ-001, CON-001
## 2. Implementation Steps
   ### Phase 1: [Goal]
   | Task     | Description | Completed | Date |
   | -------- | ----------- | --------- | ---- |
   | TASK-001 | ...         | ✅         | ...  |
## 3. Alternatives
## 4. Dependencies
## 5. Files (affected files)
## 6. Testing
## 7. Risks & Assumptions
```

---

### 3.4 BeastModeDev

**File:** `.github/agents/BeastModeDev.agent.md`

**Peran:** Senior Expert Software Engineer dengan kemampuan autonomous dan full-power.

**Fokus Utama:**

- Implementasi kode dengan kualitas tinggi
- Clean code, maintainability, scalability
- Testing dan debugging

**Cara Menggunakan:**

```bash
@BeastModeDev Implementasikan fitur [nama fitur] sesuai plan di [path/to/plan.md]
```

**Karakteristik:**

- 🔥 Autonomous - Bekerja mandiri sampai selesai
- 🔥 Persistent - Iterasi sampai semua task selesai
- 🔥 Research-driven - Selalu research dokumentasi terbaru
- 🔥 Test-driven - Selalu menjalankan test

**Workflow:**

1. Baca guidelines (`.github/instructions/`)
2. Fetch URL jika ada
3. Understand problem & investigate codebase
4. Internet research untuk best practices
5. Develop detailed plan (todo list)
6. Implement incrementally
7. Debug & Test frequently
8. Iterate until done
9. Final review

**Kapan Menggunakan:**

- Task kompleks yang memerlukan multiple files
- Implementasi fitur baru
- Refactoring besar
- Bug fixing yang kompleks

---

### 3.5 MiniBeast

**File:** `.github/agents/MiniBeast.agent.md`

**Peran:** Optimized Beast Agent - versi ringan untuk model AI yang lebih kecil.

**Fokus Utama:**

- Sama dengan BeastModeDev tapi lebih efisien
- Minimize conversational fluff
- Prioritize action and accuracy

**Cara Menggunakan:**

```bash
@MiniBeast Implementasikan [task singkat]
```

**Perbedaan dengan BeastModeDev:**

| Aspek          | BeastModeDev      | MiniBeast              |
| -------------- | ----------------- | ---------------------- |
| Verbosity      | Detailed          | Minimal                |
| Model Target   | Claude, GPT-4     | GPT-4.1, GPT-4o, Grok  |
| Response Style | Comprehensive     | Concise (≤3 sentences) |
| Planning       | Displayed in chat | Internal only          |

**Kapan Menggunakan:**

- Task sederhana hingga menengah
- Ketika menggunakan model AI yang lebih kecil
- Ketika butuh response cepat

---

### 3.6 QATestArchitect

**File:** `.github/agents/QATestArchitect.agent.md`

**Peran:** Senior QA Architect yang menangani seluruh testing lifecycle.

**Fokus Utama:**

- Test Planning
- Test Code Generation
- Test Execution
- Documentation & Reporting

**Cara Menggunakan:**

```bash
@QATestArchitect Buatkan test plan untuk aplikasi di URL [url] atau codebase [path]
```

**Workflow Sequential:**

#### Phase 1: Test Planning

- Setup: Collect requirements (URL, Auth, Roles, Scope)
- Exploration: Analyze UI dan API
- Design: Identify user journeys, categorize by risk
- Output: `test-plans/TESTPLAN.md`

#### Phase 2: Test Code Generation & Execution

- Generate test code berdasarkan plan
- Execute tests
- Fix failing tests

#### Phase 3: Documentation & Reporting

- Generate test report
- Document coverage

**Requirements untuk E2E Testing:**

- Web App URL (mandatory)
- API Base URL (jika ada)
- Environment (dev/stage/prod)
- Auth credentials
- User roles to cover

---

### 3.7 DocumentationWriter

**File:** `.github/agents/DocumentationWriter.agent.md`

**Peran:** Diátaxis Documentation Architect - Expert technical writer.

**Fokus Utama:**

- Membuat dokumentasi berkualitas tinggi
- Mengikuti Diátaxis Framework
- Memastikan setiap dokumen memiliki satu purpose

**Cara Menggunakan:**

```bash
@DocumentationWriter Buatkan [tutorial/how-to/reference/explanation] untuk fitur [nama fitur]
```

**4 Quadrant Diátaxis Framework:**

| Quadrant          | Orientasi     | Tujuan                        | Style                        |
| ----------------- | ------------- | ----------------------------- | ---------------------------- |
| **🎓 TUTORIALS**   | Learning      | Pemula bisa melakukan sesuatu | Step-by-step, no theory      |
| **🛠️ HOW-TO**      | Task          | Solve specific problem        | Recipe, straight to solution |
| **📖 REFERENCE**   | Information   | Describe machinery            | Technical, dry, facts only   |
| **💡 EXPLANATION** | Understanding | Clarify context & "Why"       | Discursive, background       |

**Workflow:**

1. **Phase 1: Classification** - Tentukan quadrant yang tepat
2. **Phase 2: Outlining** - Buat outline, tunggu approval
3. **Phase 3: Drafting** - Tulis content, save file

**Output Location:**

- Tutorials: `docs/tutorials/`
- How-to: `docs/how-to/`
- Reference: `docs/api/` atau `docs/reference/`
- Explanation: `docs/explanation/`

---

## 4. Best Practices Penggunaan Agent

### 4.1 Tips Umum

1. **Selalu berikan konteks yang jelas**
   - Sertakan path file yang relevan
   - Jelaskan goal yang ingin dicapai

2. **Gunakan agent sesuai tahapnya**
   - Jangan skip tahap (PRD → Spec → Plan → Code)
   - Setiap agent memiliki output yang menjadi input agent berikutnya

3. **Review output setiap agent**
   - Konfirmasi hasil sebelum lanjut ke tahap berikutnya
   - Minta revisi jika ada yang kurang

### 4.2 Kapan Menggunakan Agent Mana?

| Situasi                             | Agent yang Tepat       |
| ----------------------------------- | ---------------------- |
| Memulai project baru                | ProductManagerPRD      |
| Sudah ada PRD, butuh detail teknis  | SpecificationArchitect |
| Sudah ada spec, butuh rencana kerja | PlannerArchitect       |
| Siap coding, task kompleks          | BeastModeDev           |
| Siap coding, task simple            | MiniBeast              |
| Sudah ada code, butuh testing       | QATestArchitect        |
| Sudah ada code, butuh dokumentasi   | DocumentationWriter    |

### 4.3 Kombinasi Agent untuk Workflow Cepat

**Full SDLC (Recommended):**

```text
ProductManagerPRD → SpecificationArchitect → PlannerArchitect → BeastModeDev → QATestArchitect → DocumentationWriter
```

**Quick Development (Skip beberapa tahap):**

```text
ProductManagerPRD → PlannerArchitect → BeastModeDev → QATestArchitect
```

**Hotfix/Bug Fix:**

```text
BeastModeDev → QATestArchitect
```

**Documentation Only:**

```text
DocumentationWriter
```

---

## 5. Struktur Folder Project

Berdasarkan output setiap agent, berikut struktur folder yang direkomendasikan:

```text
project-root/
├── .github/
│   ├── agents/                    # Custom agent definitions
│   │   ├── ProductManagerPRD.agent.md
│   │   ├── SpecificationArchitect.agent.md
│   │   ├── PlannerArchitect.agent.md
│   │   ├── BeastModeDev.agent.md
│   │   ├── MiniBeast.agent.md
│   │   ├── QATestArchitect.agent.md
│   │   └── DocumentationWriter.agent.md
│   └── instructions/              # Coding guidelines
│
├── docs/                          # Documentation (DocumentationWriter)
│   ├── tutorials/
│   ├── how-to/
│   ├── reference/
│   └── explanation/
│
├── spec/                          # Technical Specifications (SpecificationArchitect)
│   ├── spec-design-*.md
│   ├── spec-data-*.md
│   └── spec-architecture-*.md
│
├── plan/                          # Implementation Plans (PlannerArchitect)
│   ├── feature-*.md
│   ├── upgrade-*.md
│   └── refactor-*.md
│
├── test-plans/                    # Test Plans (QATestArchitect)
│   └── TESTPLAN.md
│
├── tests/                         # Test Code (QATestArchitect)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── src/                           # Source Code (BeastModeDev/MiniBeast)
│   ├── js/
│   ├── css/
│   └── assets/
│
├── Product_Requirement_Document.md # PRD (ProductManagerPRD)
└── SDLC_Agent_Workflow_Guide.md   # Dokumen ini
```

---

## 6. Contoh Penggunaan untuk Project Taaruf CV Kreator

### 6.1 Status Saat Ini

| Tahap             | Status    | Output                                   |
| ----------------- | --------- | ---------------------------------------- |
| 1. PRD            | ✅ Selesai | `Product_Requirement_Document.md` (v1.5) |
| 2. Specification  | ⏳ Belum   | -                                        |
| 3. Planning       | ⏳ Belum   | -                                        |
| 4. Implementation | ⏳ Belum   | -                                        |
| 5. Testing        | ⏳ Belum   | -                                        |
| 6. Documentation  | ⏳ Belum   | -                                        |

### 6.2 Langkah Selanjutnya

#### Tahap 2: Technical Specification

```bash
@SpecificationArchitect Buatkan technical specification untuk aplikasi Taaruf CV Kreator 
berdasarkan PRD di file Product_Requirement_Document.md. 
Fokus pada:
1. Data schema untuk localStorage (Draft, History)
2. Component architecture untuk setiap halaman
3. Interface definitions untuk CV Generator
```

#### Tahap 3: Implementation Plan

```bash
@PlannerArchitect Buatkan implementation plan untuk Taaruf CV Kreator 
berdasarkan PRD dan spec yang sudah dibuat.
Bagi menjadi fase-fase yang manageable.
```

#### Tahap 4: Development

```bash
@BeastModeDev Implementasikan Phase 1 dari implementation plan 
untuk Taaruf CV Kreator menggunakan Vite + Bootstrap + Vanilla JS.
```

---

## 7. Riwayat Revisi Dokumen

| Versi | Tanggal         | Perubahan           |
| ----- | --------------- | ------------------- |
| 1.0   | 7 Desember 2025 | Dokumen awal dibuat |

---

## 8. Referensi

- [Diátaxis Framework](https://diataxis.fr/) - Framework untuk dokumentasi
- [GitHub Copilot Custom Agents](https://docs.github.com/en/copilot) - Dokumentasi Copilot
- Folder `.github/agents/` - Definisi agent dalam project ini

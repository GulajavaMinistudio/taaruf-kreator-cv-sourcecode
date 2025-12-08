# Taaruf CV Kreator

Aplikasi pembuat CV Ta'aruf untuk Muslim dan Muslimah yang mengutamakan privasi data.

## 📋 Status Pengembangan

### ✅ Phase 1: Data Layer - **COMPLETED** (07 Des 2025)

**Checklist:**
- ✅ Project Setup (Vite + Bootstrap 5)
- ✅ Data Types & Enums (13 enums, 4 types)
- ✅ LocalStorage Service (15+ methods)
- ✅ Test Suite (9 test cases)

**Files Created:** 11 files (~1,705 LOC)

### ✅ Phase 2: UI Skeleton & Routing - **COMPLETED** (08 Des 2025)

**Checklist:**
- ✅ Hash-based Router (8 routes)
- ✅ Main Layout & Navbar (responsive)
- ✅ 8 View Implementations (Landing, Form, Preview, Result, Draft, History, Doa, Settings)
- ✅ 3 Shared Components (Modal, Toast, DoaCard)
- ✅ Doa & Hadits Content (13 items in 5 categories)
- ✅ Testing & Verification (10/10 passed)

**Files Created:** 14 files (~2,400 LOC)  
**Files Modified:** 3 files (index.html, main.js, style.css)

### 🔄 Phase 3: Form Implementation & Validation - **PLANNED**

**Estimated:** 6-8 hours  
**Tasks:** 49 form fields, validation logic, conditional fields, save draft

### 🔄 Phase 4: CV Generator Logic - **PLANNED**

**Estimated:** 4-5 hours  
**Tasks:** Generator service, text template, field mapping

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ dan npm
- Modern browser dengan localStorage support

### Installation

```bash
# Clone repository
git clone [repository-url]
cd taaruf-cv-kreator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

### Phase 2 Testing (Current)

1. Jalankan dev server: `npm run dev`
2. Buka browser ke `http://localhost:5173`
3. Test navigasi antar halaman menggunakan navbar
4. Test direct URL hash (contoh: `http://localhost:5173/#/doa`)
5. Test responsive design (resize browser window)
6. Verifikasi semua konten doa/hadits muncul dengan benar

### Phase 1 Testing

1. Buka browser console (F12)
2. Jalankan: `await runAllTests()`
3. Verifikasi: `✅ Passed: 9/9`

## 📚 Documentation

### Project Structure

```
taaruf-cv-kreator/
├── docs/                                # Documentation
│   ├── implementation-roadmap.md        # Implementation guide
│   ├── phase-1-report.md                # Phase 1 report
│   └── phase-2-report.md                # Phase 2 report
├── plan/                                # Implementation plans
│   ├── feature-data-layer-1.md          # Phase 1 plan
│   └── feature-ui-routing-2.md          # Phase 2 plan
├── spec/                                # Technical specifications
│   ├── spec-data-localstorage-schema.md
│   ├── spec-design-component-architecture.md
│   ├── spec-design-form-validation.md
│   └── spec-design-cv-generator.md
├── src/
│   ├── router/                          # SPA routing system
│   ├── views/                           # Page views (8 views)
│   ├── components/                      # Reusable UI components
│   ├── data/                            # Static data (doa/hadits)
│   ├── services/                        # Business logic services
│   ├── types/                           # Type definitions & enums
│   ├── utils/                           # Utility functions
│   └── assets/                          # Static assets
│   ├── main.js                     # Application entry point
│   └── style.css                   # Custom styles
├── index.html                      # HTML entry
├── vite.config.js                  # Vite configuration
└── package.json                    # Project dependencies
```

### LocalStorage Keys

| Key                  | Description               | Type                   |
| -------------------- | ------------------------- | ---------------------- |
| `taaruf_cv_drafts`   | Draft CV yang disimpan    | `Array<DraftObject>`   |
| `taaruf_cv_history`  | CV yang sudah di-generate | `Array<HistoryObject>` |
| `taaruf_cv_settings` | Pengaturan aplikasi       | `SettingsObject`       |

### API Usage Examples

```javascript
import * as StorageService from './services/localStorageService.js';

// Save a draft
const result = StorageService.saveDraft({
  namaLengkap: 'Ahmad Fauzi',
  jenisKelamin: 'Laki-laki',
  // ... other fields
}, 'My Draft Name');

// Get all drafts
const drafts = StorageService.getDrafts();

// Get a specific draft
const draft = StorageService.getDraftById(draftId);

// Update a draft
StorageService.updateDraft(draftId, updatedData);

// Delete a draft
StorageService.deleteDraft(draftId);

// Save to history
StorageService.saveHistory(formData, cvTextContent, 'CV Name');

// Clear all data
StorageService.clearAllData();
```

## 🔒 Privacy & Security

- ✅ **100% Client-Side**: Semua data diproses di browser
- ✅ **No Server Storage**: Tidak ada data yang dikirim ke server
- ✅ **LocalStorage Only**: Data tersimpan di browser pengguna
- ✅ **No Analytics**: Tidak ada tracking atau analytics

## 🛠️ Tech Stack

- **Build Tool**: Vite v7.2.6
- **Framework**: Vanilla JavaScript (ES6+)
- **CSS Framework**: Bootstrap 5
- **Storage**: Browser LocalStorage API
- **Module System**: ES Modules

## 📄 License

Proprietary - Gulajava Ministudio © 2025

## 👨‍💻 Developer

**Gulajava Ministudio**

---

**Version**: 1.5  
**Last Updated**: 07 Desember 2025

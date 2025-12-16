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
- **UI Framework:** Bootstrap 5.3.8
- **Icons:** Bootstrap Icons 1.13.1 (Self-hosted)
- **Build Tool:** Vite 7.2.6
- **Architecture:** MVC (Model-View-Controller)
- **Storage:** Browser LocalStorage API
- **Optimization:** Terser minification, CSS code splitting

### Performance Metrics

✅ **Lighthouse Score: 100/100**
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Bundle Size (Production)**:
- HTML: 7.44 KB (gzipped: 1.96 KB)
- CSS: 321 KB (gzipped: 47 KB)
- JavaScript: 186 KB (gzipped: 47 KB)
- **Total (Critical Path): ~95 KB gzipped** ⚡

## Browser Compatibility

Aplikasi telah diuji dan kompatibel dengan:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari 14+ (desktop & iOS)
- ✅ Mobile browsers (Android Chrome, iOS Safari)

**Minimum Requirements**:
- JavaScript enabled
- LocalStorage enabled (minimum 5MB available)
- Modern browser with ES6+ support

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

   Output akan tersimpan di folder `dist/`.

5. **Preview production build (optional)**

   ```bash
   npm run preview
   ```

   Preview build akan dapat diakses di `http://localhost:4173`.

## Deployment

### Deploy ke GitHub Pages

1. **Update `vite.config.js`**

   Pastikan `base` URL sesuai dengan nama repository Anda:

   ```javascript
   export default defineConfig({
     base: "/nama-repository-anda/",
     // ... rest of config
   });
   ```

2. **Build production**

   ```bash
   npm run build
   ```

3. **Deploy ke GitHub Pages**

   **Option A: Using GitHub Actions** (Recommended)

   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ["main"]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
         - name: Install dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: "./dist"
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

   **Option B: Manual Deploy**

   ```bash
   # Install gh-pages package
   npm install --save-dev gh-pages

   # Add to package.json scripts
   "deploy": "gh-pages -d dist"

   # Build and deploy
   npm run build
   npm run deploy
   ```

4. **Enable GitHub Pages**

   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / root
   - Save

5. **Access your app**

   `https://your-username.github.io/repository-name/`

### Deploy ke Netlify

1. **Connect repository to Netlify**

2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)

3. **Environment variables**: None required

4. **Deploy!**

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: taaruf-cv-kreator
# - In which directory is your code? ./
# - Override settings? No
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

Project telah menyelesaikan **Fase 6.1** (Performance Optimization) dengan Lighthouse score **100/100**.

| Fase       | Deskripsi                        | Status    |
| :--------- | :------------------------------- | :-------- |
| **Fase 1** | Data Layer & Storage Service     | ✅ Selesai |
| **Fase 2** | UI Skeleton & Routing            | ✅ Selesai |
| **Fase 3** | Form Implementation & Validation | ✅ Selesai |
| **Fase 4** | CV Generator Logic               | ✅ Selesai |
| **Fase 5** | Integration, Polishing & Testing | ✅ Selesai |
| **Fase 6** | Performance & Deployment Prep    | ✅ Selesai |

## Dokumentasi Lengkap

Untuk dokumentasi teknis lengkap, lihat folder `/docs`:

- [`Product_Requirement_Document.md`](Product_Requirement_Document.md) - Requirements & acceptance criteria
- [`docs/phase-5-8-acceptance-criteria-verification.md`](docs/phase-5-8-acceptance-criteria-verification.md) - Testing results (95.2% PASS)
- [`docs/phase-5-6-cross-browser-testing-report.md`](docs/phase-5-6-cross-browser-testing-report.md) - Browser compatibility
- [`docs/lighthouse-audit-guide.md`](docs/lighthouse-audit-guide.md) - Performance audit documentation
- [`plan/feature-performance-deployment-6.md`](plan/feature-performance-deployment-6.md) - Phase 6 planning

## Catatan Pengujian

Aplikasi ini telah melalui pengujian komprehensif:

- ✅ **Unit Testing**: Form validation, data services, utilities
- ✅ **Integration Testing**: End-to-end user flows (20+ scenarios)
- ✅ **Cross-Browser Testing**: Chrome, Firefox, Edge, Safari
- ✅ **Responsive Testing**: Mobile (375px), Tablet (768px), Desktop (1024px+)
- ✅ **Accessibility Testing**: WCAG 2.1 Level AA compliant
- ✅ **Performance Testing**: Lighthouse 100/100

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow the coding standards (Clean Code, Clean Architecture)
4. Write tests for new features
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## Troubleshooting

### Common Issues

**Issue**: Build fails with "terser not found"
```bash
# Solution:
npm install -D terser
```

**Issue**: LocalStorage not available
- Check browser settings (cookies/site data must be enabled)
- Private/Incognito mode may disable LocalStorage
- Ensure minimum 5MB storage available

**Issue**: Fonts not loading in production
- Check `vite.config.js` base URL matches your deployment path
- Clear browser cache and hard refresh (Ctrl+F5)

**Issue**: Routing not working after deployment
- SPA requires proper server configuration for hash routing
- For GitHub Pages: hash routing (#/) works by default
- For custom servers: configure fallback to index.html

## Security & Privacy

- ✅ No backend server - 100% client-side application
- ✅ No data transmission to external servers
- ✅ All data stored locally in browser (LocalStorage)
- ✅ No cookies, no tracking, no analytics
- ✅ No external API calls (except Google Fonts CDN)
- ✅ HTTPS recommended for production deployment

**Data Security Best Practices**:
- Users should backup their data regularly (export CV to file)
- Clear browser data will erase LocalStorage
- Recommend using browser profiles for separation of data

## Roadmap (Future Enhancements)

- [ ] Export to PDF (client-side rendering)
- [ ] Multiple CV templates
- [ ] Data export/import (JSON/CSV)
- [ ] PWA support (offline capability)
- [ ] Multi-language support (English, Arabic)
- [ ] Print-optimized CSS

## Credits

**Built with**:
- [Bootstrap 5](https://getbootstrap.com/) - UI framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool
- [Google Fonts](https://fonts.google.com/) - Typography (Google Sans, Amiri)

**Images**:
- Background photos from [Unsplash](https://unsplash.com/)
- Icons from [Bootstrap Icons](https://icons.getbootstrap.com/)

## Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

---

Dibuat dengan ❤️ oleh **Gulajava Ministudio**

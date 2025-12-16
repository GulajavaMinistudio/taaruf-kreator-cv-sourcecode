# Lighthouse Audit Guide - Phase 6.1

**Date**: 2025-12-15  
**Status**: Ready for Audit  
**Target**: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90

## Overview

Lighthouse adalah automated tool dari Google untuk mengaudit web app quality. Audit ini akan mengukur:

- **Performance**: Page load speed, responsiveness
- **Accessibility**: WCAG compliance, screen reader support
- **Best Practices**: Security, modern web standards
- **SEO**: Search engine optimization
- **PWA** (Optional): Progressive Web App capabilities

## Prerequisites

Sebelum menjalankan audit, pastikan:

- ✅ Production build sudah di-generate (`npm run build`)
- ✅ Preview server berjalan (`npm run preview`)
- ✅ CSS & JS optimization sudah complete (TASK-604, TASK-605, TASK-607)
- ⏳ Image optimization (TASK-603) - optional, bisa di-audit dulu untuk baseline

## How to Run Lighthouse Audit

### Method 1: Chrome DevTools (Recommended)

1. **Open Production Build**:
   ```bash
   npm run preview
   ```
   Aplikasi akan berjalan di: `http://localhost:4173/pembuat-cv-taaruf-islam/`

2. **Open Chrome DevTools**:
   - Buka Chrome browser
   - Navigate ke `http://localhost:4173/pembuat-cv-taaruf-islam/`
   - Press `F12` atau `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

3. **Run Lighthouse**:
   - Click tab **"Lighthouse"** di DevTools
   - Select categories:
     - ✅ Performance
     - ✅ Accessibility
     - ✅ Best Practices
     - ✅ SEO
     - ⬜ Progressive Web App (optional, skip untuk sekarang)
   - Device: **Desktop** (untuk audit pertama)
   - Click **"Analyze page load"**

4. **Wait for Results** (30-60 seconds)

5. **Document Scores**:
   - Screenshot hasil audit
   - Catat scores untuk keempat kategori
   - Catat metrics (FCP, LCP, TTI, etc.)

### Method 2: Lighthouse CI (Command Line)

```bash
# Install Lighthouse globally (optional)
npm install -g lighthouse

# Run audit (pastikan preview server sudah jalan)
lighthouse http://localhost:4173/pembuat-cv-taaruf-islam/ --output=html --output-path=./lighthouse-report.html --view
```

Report akan otomatis terbuka di browser.

### Method 3: PageSpeed Insights (After Deployment)

Setelah deploy ke production:

1. Go to https://pagespeed.web.dev/
2. Enter production URL
3. Click "Analyze"

## What to Audit

### Pages to Test

| Page         | Route                    | Priority | Why                                    |
| :----------- | :----------------------- | :------- | :------------------------------------- |
| Landing Page | `#/`                     | 🔥 HIGH   | First impression, main entry point     |
| Form Page    | `#/form`                 | 🔥 HIGH   | Core functionality, heaviest page      |
| Preview Page | `#/preview` (w/ data)    | 🟡 MED    | CV preview, requires session data      |
| Doa Page     | `#/doa`                  | 🟢 LOW    | Content page, background image testing |
| Draft List   | `#/draft` (w/ drafts)    | 🟢 LOW    | CRUD operations, localStorage testing  |
| History List | `#/history` (w/ history) | 🟢 LOW    | Similar to draft, less critical        |

**Recommendation**: Audit **Landing Page** dan **Form Page** terlebih dahulu (prioritas tinggi).

## Expected Baseline Scores (Before Image Optimization)

Based on current optimization (CSS/JS minification, Bootstrap selective import):

| Category           | Expected Score | Notes                                    |
| :----------------- | :------------- | :--------------------------------------- |
| **Performance**    | 75-85          | Will improve after image optimization    |
| **Accessibility**  | 90-95          | Already good (ARIA labels, keyboard nav) |
| **Best Practices** | 85-90          | May have minor warnings                  |
| **SEO**            | 85-90          | Meta tags present, may need improvements |

## Key Metrics to Watch

### Performance Metrics

| Metric                             | Target | Current (Expected) | Priority |
| :--------------------------------- | :----- | :----------------- | :------- |
| **FCP** (First Contentful Paint)   | <1.8s  | ~1.5-2.0s          | 🔥 HIGH   |
| **LCP** (Largest Contentful Paint) | <2.5s  | ~2.0-3.0s          | 🔥 HIGH   |
| **TBT** (Total Blocking Time)      | <200ms | ~100-200ms         | 🟡 MED    |
| **CLS** (Cumulative Layout Shift)  | <0.1   | ~0-0.05            | 🟢 LOW    |
| **Speed Index**                    | <3.4s  | ~2.0-3.0s          | 🟡 MED    |
| **TTI** (Time to Interactive)      | <3.8s  | ~2.5-3.5s          | 🔥 HIGH   |

### Bundle Size Metrics

| Asset Type    | Current Size (gzipped) | Target      | Status               |
| :------------ | :--------------------- | :---------- | :------------------- |
| HTML          | ~2 KB                  | <5 KB       | ✅ Good               |
| CSS           | ~34 KB                 | <40 KB      | ✅ Good               |
| Bootstrap JS  | ~23 KB                 | <30 KB      | ✅ Good               |
| Custom JS     | ~24 KB                 | <30 KB      | ✅ Good               |
| Images (JPEG) | ~674 KB                | <300 KB     | ⏳ Pending (TASK-603) |
| **Total**     | ~757 KB                | **<400 KB** | ⏳ Pending            |

## Common Issues & Fixes

### Performance Issues

| Issue                     | Lighthouse Warning                         | Fix                                | Priority |
| :------------------------ | :----------------------------------------- | :--------------------------------- | :------- |
| Large images              | "Properly size images"                     | Compress, convert to WebP          | 🔥 HIGH   |
| Render-blocking resources | "Eliminate render-blocking resources"      | Inline critical CSS, defer JS      | 🟡 MED    |
| Unused CSS                | "Remove unused CSS"                        | PurgeCSS or manual cleanup         | 🟢 LOW    |
| No caching policy         | "Serve static assets with efficient cache" | Add cache headers (hosting config) | 🟢 LOW    |

### Accessibility Issues

| Issue               | Lighthouse Warning                                                 | Fix                                 | Status  |
| :------------------ | :----------------------------------------------------------------- | :---------------------------------- | :------ |
| Missing alt text    | "Image elements do not have [alt] attributes"                      | Already fixed (all images have alt) | ✅ OK    |
| Low color contrast  | "Background and foreground colors do not have sufficient contrast" | Check burgundy theme contrast       | ⏳ Check |
| Missing form labels | "Form elements do not have associated labels"                      | Already fixed (all inputs labeled)  | ✅ OK    |

### SEO Issues

| Issue                         | Lighthouse Warning                           | Fix                               | Status  |
| :---------------------------- | :------------------------------------------- | :-------------------------------- | :------ |
| Missing meta description      | "Document does not have a meta description"  | Already added to index.html       | ✅ OK    |
| Document doesn't have a title | "Document does not have a `<title>` element" | Already present                   | ✅ OK    |
| Links are not crawlable       | "Links do not have descriptive text"         | Check SPA hash routing (may warn) | ⏳ Check |

## Documentation Template

After running Lighthouse, document results using this template:

```markdown
## Lighthouse Audit Results - [Date]

### Landing Page (`#/`)

- **Performance**: [score]/100
  - FCP: [value]s
  - LCP: [value]s
  - TBT: [value]ms
  - CLS: [value]
  - Speed Index: [value]s
  - TTI: [value]s

- **Accessibility**: [score]/100
  - Issues: [list issues]

- **Best Practices**: [score]/100
  - Issues: [list issues]

- **SEO**: [score]/100
  - Issues: [list issues]

### Form Page (`#/form`)

[Same structure as above]

### Issues Identified

| Category    | Issue                | Severity   | Action Required                       |
| :---------- | :------------------- | :--------- | :------------------------------------ |
| Performance | Large images (674KB) | 🔥 HIGH     | Compress & convert to WebP (TASK-603) |
| [category]  | [issue]              | [severity] | [action]                              |

### Next Steps

1. [Action item 1]
2. [Action item 2]
```

## Next Actions (After Audit)

1. **Document Baseline Scores**:
   - Save Lighthouse reports (HTML files)
   - Screenshot scores untuk dokumentasi
   - Update Phase 6 planning dengan baseline scores

2. **Prioritize Fixes**:
   - Focus on 🔥 HIGH priority issues first
   - Image optimization (TASK-603) akan paling besar impact

3. **Optimize Images**:
   - Follow guide di [`docs/image-optimization-guide.md`](docs/image-optimization-guide.md)
   - Compress & convert to WebP
   - Re-run Lighthouse untuk verify improvement

4. **Re-Audit After Optimization**:
   - Compare before/after scores
   - Verify Performance score ≥90
   - Document improvements

## Success Criteria

Phase 6.1 (Performance Optimization) selesai jika:

- ✅ Lighthouse Performance: ≥90
- ✅ Lighthouse Accessibility: ≥90
- ✅ Lighthouse Best Practices: ≥90
- ✅ Lighthouse SEO: ≥90
- ✅ FCP: <1.8s
- ✅ LCP: <2.5s
- ✅ TTI: <3.8s
- ✅ Total bundle size: <500KB (gzipped)

## Resources

- **Lighthouse Documentation**: https://developer.chrome.com/docs/lighthouse
- **Web Vitals**: https://web.dev/vitals/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Squoosh (Image Optimization)**: https://squoosh.app

---

**Ready to Audit?** Run `npm run preview`, buka Chrome DevTools → Lighthouse, dan click "Analyze page load". Document hasilnya di Phase 6 planning!

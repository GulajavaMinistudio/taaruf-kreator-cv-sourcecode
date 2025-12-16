# Image Optimization Guide - Phase 6.1

**Date**: 2025-12-15  
**Status**: Action Required

## Current Image Audit

| Filename                  | Format | Size (KB) | Size (MB) | Priority | Status        |
| :------------------------ | :----- | --------: | --------: | :------- | :------------ |
| `home_page_cover.jpg`     | JPEG   |    294.48 |      0.29 | 🔥 HIGH   | Need Optimize |
| `home_page_doa_cover.jpg` | JPEG   |    379.83 |      0.37 | 🔥 HIGH   | Need Optimize |
| `married-couple.png`      | PNG    |     67.89 |      0.07 | 🟢 LOW    | ✅ Acceptable  |
| `wedding-rings.png`       | PNG    |     45.00 |      0.04 | 🟢 LOW    | ✅ Acceptable  |
| `favicon.png`             | PNG    |     45.00 |      0.04 | 🟢 LOW    | ✅ Acceptable  |

**Total Current Size**: ~832 KB  
**Target After Optimization**: <400 KB (50% reduction)

## Optimization Strategy

### Phase 1: Compress JPEG Images (Priority HIGH)

**Target Files**:

- `home_page_cover.jpg` (294 KB → Target: <150 KB)
- `home_page_doa_cover.jpg` (380 KB → Target: <150 KB)

**Recommended Tools**:

1. **Squoosh.app** (https://squoosh.app)
   - Free, web-based tool dari Google Chrome team
   - Support WebP, JPEG optimization, dan resize
   - Visual quality comparison
   - **Recommended Settings**:
     - Format: WebP
     - Quality: 80-85%
     - Resize jika diperlukan (max-width: 1920px untuk background)

2. **TinyPNG/TinyJPG** (https://tinypng.com)
   - Compression quality tinggi
   - Support batch upload (free tier: 20 images/session)
   - Smart lossy compression

3. **ImageOptim** (Mac) atau **FileOptimizer** (Windows)
   - Desktop tool untuk batch compression
   - Lossless & lossy options

### Phase 2: Convert to WebP Format

**Why WebP?**

- ~25-35% smaller file size vs JPEG (same quality)
- Native browser support: Chrome, Firefox, Edge, Safari 14+
- Fallback to JPEG untuk older browsers

**Conversion Steps**:

```bash
# Using online tool (Recommended for simplicity)
1. Go to https://squoosh.app
2. Upload home_page_cover.jpg
3. Select WebP format
4. Set quality: 80-85
5. Download as: home_page_cover.webp

# Or using npm package (if want to automate)
npm install -g webp-converter
webp-converter home_page_cover.jpg -o home_page_cover.webp -q 80
```

### Phase 3: Update Code for WebP Support

**CSS Update** ([`src/style.css`](src/style.css)):

```css
/* Hero Section - WebP with JPEG fallback */
.hero-section {
  /* Modern browsers (WebP) */
  background-image: url("/home_page_cover.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Fallback for older browsers (JPEG) */
.no-webp .hero-section {
  background-image: url("/home_page_cover.jpg");
}

/* Doa Section - WebP with JPEG fallback */
#doa-page .hero-section {
  background-image: url("/home_page_doa_cover.webp");
}

.no-webp #doa-page .hero-section {
  background-image: url("/home_page_doa_cover.jpg");
}
```

**JavaScript WebP Detection** (Add to [`src/main.js`](src/main.js)):

```javascript
/**
 * Detect WebP support and add class to <html>
 */
function detectWebPSupport() {
  const webpTest = new Image();
  webpTest.onload = webpTest.onerror = function () {
    if (webpTest.height === 2) {
      document.documentElement.classList.add("webp");
    } else {
      document.documentElement.classList.add("no-webp");
    }
  };
  webpTest.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

// Call in initApp()
detectWebPSupport();
```

**Alternative: Using `<picture>` element** (More explicit, better for images):

```html
<picture>
  <source srcset="home_page_cover.webp" type="image/webp" />
  <source srcset="home_page_cover.jpg" type="image/jpeg" />
  <img src="home_page_cover.jpg" alt="Background" />
</picture>
```

### Phase 4: Lazy Loading (Optional for Hero Images)

Hero images biasanya **TIDAK** perlu lazy loading karena above-the-fold. Tapi untuk images di content area (jika ada), gunakan:

```html
<img src="image.jpg" alt="Description" loading="lazy" />
```

## Implementation Checklist

### Step 1: Compress Images (Manual)

- [ ] Go to https://squoosh.app
- [ ] Upload `home_page_cover.jpg`
  - [ ] Select WebP format
  - [ ] Set quality: 80-85
  - [ ] Download as `home_page_cover.webp`
  - [ ] Also compress original JPEG (quality 80-85) for fallback
- [ ] Upload `home_page_doa_cover.jpg`
  - [ ] Select WebP format
  - [ ] Set quality: 80-85
  - [ ] Download as `home_page_doa_cover.webp`
  - [ ] Also compress original JPEG (quality 80-85) for fallback
- [ ] Place compressed files in `/public` folder

### Step 2: Update Code

- [ ] Add WebP detection function to [`src/main.js`](src/main.js)
- [ ] Update CSS in [`src/style.css`](src/style.css) untuk WebP fallback
- [ ] Test di browser (Chrome, Firefox, Safari)

### Step 3: Verify Results

- [ ] Check file sizes di `/public` folder
- [ ] Verify images load correctly (both WebP dan JPEG fallback)
- [ ] Test di browser yang tidak support WebP (IE11, Safari <14)
- [ ] Run Lighthouse audit untuk verify improvement

## Expected Results

### Before Optimization

- Total Images: ~832 KB
- `home_page_cover.jpg`: 294 KB
- `home_page_doa_cover.jpg`: 380 KB

### After Optimization (Target)

- Total Images: <400 KB (50% reduction)
- `home_page_cover.webp`: ~100-120 KB (60% reduction)
- `home_page_cover.jpg`: ~150 KB (compressed fallback, 50% reduction)
- `home_page_doa_cover.webp`: ~100-120 KB (68% reduction)
- `home_page_doa_cover.jpg`: ~150 KB (compressed fallback, 60% reduction)

### Lighthouse Impact

**Expected Improvements**:

- **Performance Score**: +5-10 points
- **LCP (Largest Contentful Paint)**: -0.5s to -1.0s improvement
- **Total Bundle Size**: Reduction dari ~900KB ke ~500KB

## Tools Reference

1. **Squoosh** (Recommended): https://squoosh.app
   - Free, no signup required
   - Visual quality comparison
   - Support WebP, AVIF, JPEG XL

2. **TinyPNG/TinyJPG**: https://tinypng.com
   - Free tier: 20 images/session
   - Smart lossy compression
   - Batch upload

3. **ImageOptim** (Mac): https://imageoptim.com
   - Desktop app
   - Lossless & lossy compression
   - Batch processing

4. **ShortPixel** (Online): https://shortpixel.com
   - Free tier: 100 images/month
   - API available untuk automation
   - Support WebP conversion

## Next Steps

1. **Complete image optimization** using Squoosh or TinyPNG
2. **Update code** untuk WebP support dengan fallback
3. **Test manually** di multiple browsers
4. **Run Lighthouse audit** untuk verify improvements
5. **Document results** di Phase 6 planning

---

**Note**: Karena ini manual step menggunakan online tools, implementasi harus dilakukan oleh developer. Setelah selesai, lanjutkan ke TASK-601 (Lighthouse Audit).

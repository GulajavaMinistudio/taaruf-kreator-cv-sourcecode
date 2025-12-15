/**
 * @file DoaHaditsCard.js
 * @description Reusable card component for displaying doa and hadits
 * @version 1.1
 * @date 2025-12-12
 * @changelog
 * - v1.1: Refactored to use const arrow functions and extracted constants (Clean Code compliance)
 * - v1.0: Initial release
 */

// ===== CONSTANTS =====
const CARD_CLASS = "doa-card";
const COPY_BUTTON_CLASS = "btn-copy-doa-card";
const COPY_SUCCESS_DURATION = 2000;
const CARD_CATEGORY_ATTR = "data-category";
const CARD_ID_ATTR = "data-id";
const BUTTON_CONTENT_ATTR = "data-content";

/**
 * Create doa/hadits card HTML
 * @param {Object} data - Doa/hadits data object
 * @param {string} data.id - Unique identifier
 * @param {string} data.title - Title/judul
 * @param {string} data.arabic - Arabic text
 * @param {string} data.translation - Indonesian translation
 * @param {string} data.source - Source reference
 * @param {string} [data.category] - Category
 * @returns {string} HTML string for the card
 */
const createDoaHaditsCard = (data) => {
  const { id, title, arabic, translation, source, category = "" } = data;

  // Escape HTML to prevent XSS
  const safeTitle = escapeHtml(title);
  const safeArabic = escapeHtml(arabic);
  const safeTranslation = escapeHtml(translation);
  const safeSource = escapeHtml(source);

  // Prepare full content for copy
  const fullContent = `${arabic}\n\n"${translation}"\n\nSumber: ${source}`;
  const safeFullContent = escapeHtml(fullContent);

  return `
    <div class="card ${CARD_CLASS}" ${CARD_ID_ATTR}="${id}" ${CARD_CATEGORY_ATTR}="${category}">
      <div class="card-header">
        <h5 class="card-title mb-0">${safeTitle}</h5>
      </div>
      <div class="card-body">
        <p class="card-text arabic-text text-end fs-4" dir="rtl">
          ${safeArabic}
        </p>
        <hr>
        <p class="card-text"><em>"${safeTranslation}"</em></p>
        <small class="text-muted">
          <i class="bi bi-book"></i> Sumber: ${safeSource}
        </small>
      </div>
      <div class="card-footer">
        <button 
          class="btn btn-outline-primary btn-sm ${COPY_BUTTON_CLASS}" 
          ${BUTTON_CONTENT_ATTR}="${safeFullContent}"
          ${CARD_ID_ATTR}="${id}"
        >
          <i class="bi bi-clipboard"></i> Copy
        </button>
      </div>
    </div>
  `;
};

/**
 * Render multiple doa/hadits cards to a container
 * @param {string} containerId - Container element ID
 * @param {Array<Object>} items - Array of doa/hadits objects
 * @returns {void}
 */
const renderDoaHaditsCards = (containerId, items) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[DoaHaditsCard] Container #${containerId} not found`);
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info">
        <i class="bi bi-info-circle"></i>
        Tidak ada konten untuk kategori ini.
      </div>
    `;
    return;
  }

  // Generate cards HTML
  const cardsHTML = items.map((item) => createDoaHaditsCard(item)).join("");
  container.innerHTML = cardsHTML;

  // Attach copy event listeners
  attachCopyListeners(containerId);
};

/**
 * Attach copy button event listeners
 * @param {string} containerId - Container element ID
 */
const attachCopyListeners = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const copyButtons = container.querySelectorAll(`.${COPY_BUTTON_CLASS}`);
  copyButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      // Save button reference BEFORE async operation
      const button = e.currentTarget;
      const content = button.getAttribute("data-content");
      const id = button.getAttribute("data-id");
      const originalHTML = button.innerHTML;

      try {
        // Decode HTML entities
        const decodedContent = decodeHtml(content);
        await navigator.clipboard.writeText(decodedContent);

        // Show success feedback
        button.innerHTML = '<i class="bi bi-check"></i> Tersalin!';
        button.classList.add("btn-success");
        button.classList.remove("btn-outline-primary");

        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove("btn-success");
          button.classList.add("btn-outline-primary");
        }, COPY_SUCCESS_DURATION);
      } catch (err) {
        console.error("[DoaHaditsCard] Failed to copy:", err);
        alert("Gagal menyalin teks. Silakan copy manual.");
      }
    });
  });
};

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Decode HTML entities
 * @param {string} html - HTML string with entities
 * @returns {string} Decoded text
 */
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export { createDoaHaditsCard, renderDoaHaditsCards, attachCopyListeners };

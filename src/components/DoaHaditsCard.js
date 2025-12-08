/**
 * @file DoaHaditsCard.js
 * @description Reusable card component for displaying doa and hadits
 * @version 1.0
 * @date 2025-12-08
 */

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
function createDoaHaditsCard(data) {
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
    <div class="card doa-card" data-id="${id}" data-category="${category}">
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
          class="btn btn-outline-primary btn-sm btn-copy-doa-card" 
          data-content="${safeFullContent}"
          data-id="${id}"
        >
          <i class="bi bi-clipboard"></i> Copy
        </button>
      </div>
    </div>
  `;
}

/**
 * Render multiple doa/hadits cards to a container
 * @param {string} containerId - Container element ID
 * @param {Array<Object>} items - Array of doa/hadits objects
 * @returns {void}
 */
function renderDoaHaditsCards(containerId, items) {
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
}

/**
 * Attach copy button event listeners
 * @param {string} containerId - Container element ID
 */
function attachCopyListeners(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const copyButtons = container.querySelectorAll(".btn-copy-doa-card");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const content = e.currentTarget.getAttribute("data-content");
      const id = e.currentTarget.getAttribute("data-id");

      try {
        // Decode HTML entities
        const decodedContent = decodeHtml(content);
        await navigator.clipboard.writeText(decodedContent);

        // Show success feedback
        const originalHTML = e.currentTarget.innerHTML;
        e.currentTarget.innerHTML = '<i class="bi bi-check"></i> Tersalin!';
        e.currentTarget.classList.add("btn-success");
        e.currentTarget.classList.remove("btn-outline-primary");

        setTimeout(() => {
          e.currentTarget.innerHTML = originalHTML;
          e.currentTarget.classList.remove("btn-success");
          e.currentTarget.classList.add("btn-outline-primary");
        }, 2000);

        console.log(`[DoaHaditsCard] Content copied for ID: ${id}`);
      } catch (err) {
        console.error("[DoaHaditsCard] Failed to copy:", err);
        alert("Gagal menyalin teks. Silakan copy manual.");
      }
    });
  });
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Decode HTML entities
 * @param {string} html - HTML string with entities
 * @returns {string} Decoded text
 */
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export { createDoaHaditsCard, renderDoaHaditsCards, attachCopyListeners };

/* ============================================================
   modal.js — a single reusable modal, used by the Bookmarks and
   Notes popups so navigating between them doesn't lose the
   current lesson underneath.
   ============================================================ */

let overlayEl = null;

function ensureOverlay() {
  if (overlayEl) return overlayEl;
  overlayEl = document.createElement('div');
  overlayEl.className = 'modal-overlay';
  overlayEl.id = 'feaModalOverlay';
  document.body.appendChild(overlayEl);
  return overlayEl;
}

export function openModal({ title, mount }) {
  const overlay = ensureOverlay();
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" data-modal-close aria-label="Close">&#10005;</button>
      </div>
      <div class="modal-body" data-modal-body></div>
    </div>`;

  overlay.classList.add('show');
  document.body.classList.add('modal-open');

  function close() {
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeydown);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  overlay.querySelector('[data-modal-close]').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKeydown);

  const body = overlay.querySelector('[data-modal-body]');
  if (typeof mount === 'function') mount(body, close);

  return close;
}

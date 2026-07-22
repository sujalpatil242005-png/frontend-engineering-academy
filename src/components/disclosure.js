/* ============================================================
   disclosure.js — one toggle behavior for collapsible content.
   Works on any container holding elements shaped like:
     <div class="qa-item"><div class="qa-q">...</div><div class="qa-a">...</div></div>
   Native <details>/<summary> (used for "common mistakes" asides,
   see components.css .disclosure) needs no JS at all — the browser
   handles that for free. This file only covers the qa-item pattern,
   which HTML Academy's interview section and CSS Academy's future
   interview section both need identically.
   ============================================================ */

export function initQAToggles(root) {
  root.querySelectorAll('.qa-item').forEach((item) => {
    const q = item.querySelector('.qa-q');
    if (!q || q.dataset.wired) return;
    q.dataset.wired = 'true';
    q.addEventListener('click', () => item.classList.toggle('open'));
  });
}

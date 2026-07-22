/* ============================================================
   search.js — wires one search box (in the topbar, present on
   every view) to the shared index. Replaces HTML Academy's
   DOM-scraped search and CSS Academy's nav-only filter with a
   single implementation both modules (and future ones) share.
   ============================================================ */

import { buildSearchIndex, searchIndex } from '../core/search-index.js';
import { navigate } from '../core/router.js';

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function initGlobalSearch({ inputEl, resultsEl }) {
  let index = buildSearchIndex();
  let activeIndex = -1;
  let currentResults = [];

  function render(results) {
    currentResults = results;
    activeIndex = -1;
    if (!results.length) {
      resultsEl.innerHTML = inputEl.value.trim()
        ? `<div class="no-results">No matches for "${escapeHtml(inputEl.value.trim())}"</div>`
        : '';
      resultsEl.classList.toggle('show', !!inputEl.value.trim());
      return;
    }
    resultsEl.innerHTML = results.map((r, i) => `
      <div class="res-item" data-index="${i}">
        <div class="res-kind">${escapeHtml(r.moduleLabel)} &middot; ${escapeHtml(r.group)}</div>
        <div class="res-title">${escapeHtml(r.title)}</div>
      </div>`).join('');
    resultsEl.classList.add('show');
  }

  function highlight(i) {
    resultsEl.querySelectorAll('.res-item').forEach((el) => el.classList.remove('active'));
    const el = resultsEl.querySelector(`.res-item[data-index="${i}"]`);
    if (el) {
      el.classList.add('active');
      el.scrollIntoView({ block: 'nearest' });
    }
  }

  function openResult(i) {
    const r = currentResults[i];
    if (!r) return;
    navigate(`${r.moduleId}/${r.lessonId}`);
    inputEl.value = '';
    resultsEl.classList.remove('show');
  }

  inputEl.addEventListener('input', () => {
    render(searchIndex(inputEl.value, index));
  });

  inputEl.addEventListener('keydown', (e) => {
    if (!currentResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
      highlight(activeIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      highlight(activeIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      openResult(activeIndex >= 0 ? activeIndex : 0);
    } else if (e.key === 'Escape') {
      resultsEl.classList.remove('show');
    }
  });

  resultsEl.addEventListener('click', (e) => {
    const item = e.target.closest('.res-item');
    if (item) openResult(Number(item.dataset.index));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) resultsEl.classList.remove('show');
  });

  /* Curricula don't change at runtime today, but re-building the index
     on demand keeps this correct once modules can be added dynamically. */
  return {
    refresh() { index = buildSearchIndex(); },
  };
}

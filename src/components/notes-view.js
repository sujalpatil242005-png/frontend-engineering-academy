/* ============================================================
   notes-view.js — the real "Notes" screen the sidebar link has
   pointed to since Phase 2. Reads the same per-lesson notes the
   textarea in lesson-chrome.js writes to.
   ============================================================ */

import { MODULES, findLessonTitle, flatLessons } from '../core/registry.js';
import { listNotes, setNote } from '../core/store.js';
import { navigate } from '../core/router.js';

function groupLabelFor(moduleId, lessonId) {
  const found = flatLessons(moduleId).find((l) => l.id === lessonId);
  return found ? found.group : '';
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

export function renderNotesView(container) {
  const notes = listNotes();

  if (!notes.length) {
    container.innerHTML = `
      <h2>Notes</h2>
      <div class="empty-state" style="margin-top:16px;">
        <h4>No notes yet</h4>
        <p>Open the "Add note" button on any lesson to jot something down — it'll show up here.</p>
      </div>`;
    return;
  }

  const byModule = {};
  notes.forEach((n) => {
    byModule[n.moduleId] = byModule[n.moduleId] || [];
    byModule[n.moduleId].push(n);
  });

  const sections = Object.keys(byModule).map((moduleId) => {
    const mod = MODULES.find((m) => m.id === moduleId);
    const items = byModule[moduleId];
    return `
      <div class="dash-section">
        <div class="dash-section-title">${mod ? mod.label : moduleId}</div>
        <div class="bookmark-list">
          ${items.map((n) => `
            <div class="bl-item note-item" data-open-lesson="${n.moduleId}:${n.lessonId}">
              <span>
                <span class="bl-mod">${groupLabelFor(n.moduleId, n.lessonId)}</span>
                <b>${findLessonTitle(n.moduleId, n.lessonId)}</b>
                <span class="note-preview">${escapeHtml(n.text.slice(0, 90))}${n.text.length > 90 ? '&hellip;' : ''}</span>
              </span>
              <button class="btn ghost sm" data-remove-note="${n.moduleId}:${n.lessonId}" aria-label="Delete note">&#10005;</button>
            </div>
          `).join('')}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <h2>Notes</h2>
    <p class="lede">${notes.length} note${notes.length === 1 ? '' : 's'} across your lessons.</p>
    ${sections}
  `;

  container.querySelectorAll('[data-open-lesson]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-remove-note]')) return;
      const [moduleId, lessonId] = el.dataset.openLesson.split(':');
      navigate(`${moduleId}/${lessonId}`);
    });
  });

  container.querySelectorAll('[data-remove-note]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const [moduleId, lessonId] = btn.dataset.removeNote.split(':');
      setNote(moduleId, lessonId, '');
      renderNotesView(container);
    });
  });
}

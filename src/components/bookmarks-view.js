/* ============================================================
   bookmarks-view.js — the real "Bookmarks" screen the sidebar
   link has pointed to since Phase 2 (it showed a placeholder
   until now). Reads/writes the same store bookmarks used by the
   star icon on every lesson and the dashboard's bookmark widget.
   ============================================================ */

import { MODULES, findLessonTitle, flatLessons } from '../core/registry.js';
import { listBookmarks, toggleBookmark } from '../core/store.js';
import { navigate } from '../core/router.js';

function groupLabelFor(moduleId, lessonId) {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return '';
  const found = flatLessons(moduleId).find((l) => l.id === lessonId);
  return found ? found.group : '';
}

export function renderBookmarksView(container) {
  const marks = listBookmarks();

  if (!marks.length) {
    container.innerHTML = `
      <h2>Bookmarks</h2>
      <div class="empty-state" style="margin-top:16px;">
        <h4>No bookmarks yet</h4>
        <p>Click the &#9733; star on any lesson to save it here for quick access.</p>
      </div>`;
    return;
  }

  const byModule = {};
  marks.forEach((b) => {
    byModule[b.moduleId] = byModule[b.moduleId] || [];
    byModule[b.moduleId].push(b);
  });

  const sections = Object.keys(byModule).map((moduleId) => {
    const mod = MODULES.find((m) => m.id === moduleId);
    const items = byModule[moduleId];
    return `
      <div class="dash-section">
        <div class="dash-section-title">${mod ? mod.label : moduleId}</div>
        <div class="bookmark-list">
          ${items.map((b) => `
            <div class="bl-item" data-open-lesson="${b.moduleId}:${b.lessonId}">
              <span>
                <span class="bl-mod">${groupLabelFor(b.moduleId, b.lessonId)}</span>
                ${findLessonTitle(b.moduleId, b.lessonId)}
              </span>
              <button class="btn ghost sm" data-remove-bookmark="${b.moduleId}:${b.lessonId}" aria-label="Remove bookmark">&#10005;</button>
            </div>
          `).join('')}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <h2>Bookmarks</h2>
    <p class="lede">${marks.length} lesson${marks.length === 1 ? '' : 's'} saved for quick access.</p>
    ${sections}
  `;

  container.querySelectorAll('[data-open-lesson]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-remove-bookmark]')) return;
      const [moduleId, lessonId] = el.dataset.openLesson.split(':');
      navigate(`${moduleId}/${lessonId}`);
    });
  });

  container.querySelectorAll('[data-remove-bookmark]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const [moduleId, lessonId] = btn.dataset.removeBookmark.split(':');
      toggleBookmark(moduleId, lessonId);
      renderBookmarksView(container);
    });
  });
}

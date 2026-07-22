/* ============================================================
   lesson-chrome.js — the header every lesson page gets, regardless
   of module. HTML Academy and CSS Academy each hand-rolled their
   own "mark complete" button and bookmark star with separate
   localStorage calls; this is the one version both plug into.

   Usage (from a module's renderer, in Phase 4/5):
     import { renderLessonChrome, wireLessonChrome } from '.../lesson-chrome.js';
     container.innerHTML = renderLessonChrome({ moduleLabel, groupLabel, title, moduleId, lessonId })
                          + '<div class="lesson-body">...actual content...</div>';
     wireLessonChrome(container, { moduleId, lessonId });
   ============================================================ */

import { isLessonComplete, toggleLessonComplete, isBookmarked, toggleBookmark, getNote, setNote } from '../core/store.js';

function escapeHtml(str) {
  return str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

export function renderLessonChrome({ moduleLabel, groupLabel, title, moduleId, lessonId }) {
  const done = isLessonComplete(moduleId, lessonId);
  const marked = isBookmarked(moduleId, lessonId);
  const note = getNote(moduleId, lessonId);

  return `
    <div class="topic-header">
      <div>
        <div class="crumb">${moduleLabel} / ${groupLabel} / <b>${title}</b></div>
        <h2 style="margin-top:6px;">
          ${title}
          <button class="bookmark-btn${marked ? ' on' : ''}" data-bookmark-btn aria-label="Bookmark this lesson">&#9733;</button>
        </h2>
      </div>
      <div class="topic-header-actions">
        <button class="btn${note ? ' primary' : ''}" data-notes-btn aria-expanded="false">
          <span>&#128221;</span> <span data-notes-label>${note ? 'Notes' : 'Add note'}</span>
        </button>
        <button class="btn${done ? ' primary' : ''}" data-complete-btn>
          <span data-complete-icon>${done ? '&#10003;' : '&#9675;'}</span>
          <span data-complete-label>${done ? 'Completed' : 'Mark complete'}</span>
        </button>
      </div>
    </div>
    <div class="notes-panel" data-notes-panel hidden>
      <label class="notes-panel-label" for="notesArea-${moduleId}-${lessonId}">Your notes on this lesson</label>
      <textarea class="notes-textarea" id="notesArea-${moduleId}-${lessonId}" data-notes-textarea placeholder="Type anything you want to remember about this lesson&hellip;">${escapeHtml(note)}</textarea>
      <div class="notes-save-hint" data-notes-hint>Saved automatically</div>
    </div>`;
}

export function wireLessonChrome(root, { moduleId, lessonId }) {
  const bookmarkBtn = root.querySelector('[data-bookmark-btn]');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      toggleBookmark(moduleId, lessonId);
      bookmarkBtn.classList.toggle('on', isBookmarked(moduleId, lessonId));
    });
  }

  const completeBtn = root.querySelector('[data-complete-btn]');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      toggleLessonComplete(moduleId, lessonId);
      const done = isLessonComplete(moduleId, lessonId);
      completeBtn.classList.toggle('primary', done);
      root.querySelector('[data-complete-icon]').innerHTML = done ? '&#10003;' : '&#9675;';
      root.querySelector('[data-complete-label]').textContent = done ? 'Completed' : 'Mark complete';
    });
  }

  const notesBtn = root.querySelector('[data-notes-btn]');
  const notesPanel = root.querySelector('[data-notes-panel]');
  if (notesBtn && notesPanel) {
    notesBtn.addEventListener('click', () => {
      const nowOpen = notesPanel.hidden;
      notesPanel.hidden = !nowOpen;
      notesBtn.setAttribute('aria-expanded', String(nowOpen));
      if (nowOpen) root.querySelector('[data-notes-textarea]').focus();
    });

    const textarea = root.querySelector('[data-notes-textarea]');
    const hint = root.querySelector('[data-notes-hint]');
    let saveTimer = null;
    textarea.addEventListener('input', () => {
      hint.textContent = 'Saving&hellip;';
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        setNote(moduleId, lessonId, textarea.value);
        notesBtn.classList.toggle('primary', textarea.value.trim().length > 0);
        notesBtn.querySelector('[data-notes-label]').textContent = textarea.value.trim() ? 'Notes' : 'Add note';
        hint.textContent = 'Saved automatically';
      }, 400);
    });
  }
}

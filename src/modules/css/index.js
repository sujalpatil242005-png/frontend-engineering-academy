/* ============================================================
   modules/css/index.js — the CSS module's render entry point.
   Mirrors modules/html/index.js. All 61 topics' interactive labs
   (box model, flexbox, grid, selector matching, etc.) live in
   legacy-engine.js's POST_RENDER functions and run unmodified.
   ============================================================ */

import { RENDERERS, POST_RENDER } from './legacy-engine.js';
import { renderLessonChrome, wireLessonChrome } from '../../components/lesson-chrome.js';
import { renderFooterNav, wireFooterNav } from '../../components/footer-nav.js';
import { renderUnifiedPlaygroundHTML, initUnifiedPlayground } from '../../components/playground.js';

const FREE_PLAYGROUND_DEFAULT_HTML = `<div class="card">
  <h2>Hello, CSS!</h2>
  <p>Edit the HTML and CSS tabs, then check Preview.</p>
  <button>Click me</button>
</div>`;

const FREE_PLAYGROUND_DEFAULT_CSS = `body{ font-family: sans-serif; padding: 24px; background:#0f1419; color:#dde3ea; }
.card{ max-width:420px; margin:0 auto; padding:24px; border-radius:12px; background:#161c24; border:1px solid #232b36; }
.card h2{ color:#4fd1c5; margin-top:0; }
.card button{
  margin-top:10px; padding:8px 16px; border-radius:8px; border:none;
  background:#4fd1c5; color:#0a0e13; font-weight:700; cursor:pointer;
}`;

export function renderCssLesson(container, { lessonId, moduleLabel, groupLabel, title }) {
  if (lessonId === 'playground') {
    container.innerHTML = `
      ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'css', lessonId })}
      <div class="lesson-body">
        <p class="lede">A CodePen-style HTML + CSS editor with a live, sandboxed preview. Nothing here touches a server — it all runs in your browser, and your code is saved automatically.</p>
        ${renderUnifiedPlaygroundHTML({
          storageKey: 'fea_css_free_playground',
          defaultHtml: FREE_PLAYGROUND_DEFAULT_HTML,
          defaultCss: FREE_PLAYGROUND_DEFAULT_CSS,
        })}
      </div>
      ${renderFooterNav('css', lessonId)}
    `;
    wireLessonChrome(container, { moduleId: 'css', lessonId });
    wireFooterNav(container, 'css', lessonId);
    initUnifiedPlayground(container);
    return;
  }

  const contentFn = RENDERERS[lessonId];

  if (!contentFn) {
    container.innerHTML = `<div class="empty-state"><p>Unknown CSS lesson: ${lessonId}</p></div>`;
    return;
  }

  container.innerHTML = `
    ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'css', lessonId })}
    <div class="lesson-body">${contentFn()}</div>
    ${renderFooterNav('css', lessonId)}
  `;

  wireLessonChrome(container, { moduleId: 'css', lessonId });
  wireFooterNav(container, 'css', lessonId);

  const postRenderFn = POST_RENDER[lessonId];
  if (postRenderFn) postRenderFn();
}

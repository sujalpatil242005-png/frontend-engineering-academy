/* ============================================================
   modules/javascript/index.js — the JavaScript module's render
   entry point. Mirrors modules/css/index.js. The "Free Playground"
   lesson gets its own lightweight JS-console runner here (the
   shared components/playground.js unified editor is HTML/CSS only
   for now — JS_ENABLED is still false there), so it renders inline
   instead of going through renderUnifiedPlaygroundHTML.
   ============================================================ */

import { RENDERERS, POST_RENDER } from './renderers.js';
import { renderLessonChrome, wireLessonChrome } from '../../components/lesson-chrome.js';
import { renderFooterNav, wireFooterNav } from '../../components/footer-nav.js';

const JS_PLAYGROUND_DEFAULT = `// Write JavaScript here and hit Run.
// console.log() output shows up below.

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));

const nums = [1, 2, 3, 4, 5];
console.log(nums.map(n => n * n));`;

export function renderJsPlaygroundHTML() {
  return `
    <div class="playground unified" data-js-pg>
      <div class="pg-toolbar">
        <div class="pg-tabs">
          <button class="pg-tab active" data-tab="code">JS</button>
          <button class="pg-tab" data-tab="console">Console</button>
        </div>
        <div class="pg-actions">
          <button class="pg-btn" data-act="run">&#9654; Run</button>
          <button class="pg-btn" data-act="reset">&#8635; Reset</button>
          <button class="pg-btn" data-act="copy">&#8865; Copy</button>
          <button class="pg-btn" data-act="download">&#8681; Download</button>
          <button class="pg-btn" data-act="fullscreen">&#9974; Fullscreen</button>
        </div>
      </div>
      <div class="pg-panes">
        <div class="pg-pane-editor" data-pane="code"><textarea class="pg-code" data-lang="js" spellcheck="false"></textarea></div>
        <div class="pg-pane-editor" data-pane="console" hidden><div class="code-out" data-js-console style="min-height:220px; white-space:pre-wrap;"></div></div>
      </div>
      <iframe data-js-sandbox style="display:none;"></iframe>
    </div>`;
}

export function initJsPlayground(root) {
  const pg = root.querySelector('[data-js-pg]');
  if (!pg || pg.dataset.wired) return;
  pg.dataset.wired = 'true';

  const storageKey = 'fea_js_free_playground';
  const codeEl = pg.querySelector('[data-lang="js"]');
  const consoleEl = pg.querySelector('[data-js-console]');
  const iframe = pg.querySelector('[data-js-sandbox]');

  codeEl.value = localStorage.getItem(storageKey) || JS_PLAYGROUND_DEFAULT;

  function persist() {
    localStorage.setItem(storageKey, codeEl.value);
  }

  function showConsoleTab() {
    pg.querySelectorAll('.pg-tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === 'console'));
    pg.querySelectorAll('.pg-pane-editor').forEach((p) => { p.hidden = p.dataset.pane !== 'console'; });
  }

  function run() {
    consoleEl.textContent = '';
    const lines = [];
    const stringify = (v) => {
      if (typeof v === 'string') return v;
      try { return JSON.stringify(v, null, 2); } catch { return String(v); }
    };
    window.__feaJsConsoleLog = (...args) => lines.push(args.map(stringify).join(' '));
    window.__feaJsConsoleError = (...args) => lines.push('Error: ' + args.map(stringify).join(' '));

    const doc = `<script>
      window.onerror = function(msg){ parent.__feaJsConsoleError(msg); };
      const console = { log: (...a) => parent.__feaJsConsoleLog(...a), error: (...a) => parent.__feaJsConsoleError(...a), warn: (...a) => parent.__feaJsConsoleLog('[warn]', ...a) };
      try {
        ${codeEl.value}
      } catch (e) {
        parent.__feaJsConsoleError(e.message);
      }
    <\/script>`;
    iframe.srcdoc = doc;

    setTimeout(() => {
      consoleEl.textContent = lines.length ? lines.join('\n') : '(no output — try console.log(...) something)';
      showConsoleTab();
    }, 50);
  }

  codeEl.addEventListener('input', persist);
  codeEl.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEl.selectionStart;
      const end = codeEl.selectionEnd;
      codeEl.value = codeEl.value.slice(0, start) + '  ' + codeEl.value.slice(end);
      codeEl.selectionStart = codeEl.selectionEnd = start + 2;
      persist();
    }
  });

  pg.querySelectorAll('.pg-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      pg.querySelectorAll('.pg-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      pg.querySelectorAll('.pg-pane-editor').forEach((pane) => {
        pane.hidden = pane.dataset.pane !== tab.dataset.tab;
      });
    });
  });

  pg.querySelectorAll('.pg-actions .pg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.act;
      if (act === 'run') {
        run();
      } else if (act === 'reset') {
        codeEl.value = JS_PLAYGROUND_DEFAULT;
        persist();
        consoleEl.textContent = '';
      } else if (act === 'copy') {
        navigator.clipboard.writeText(codeEl.value).then(() => {
          const old = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = old; }, 1200);
        });
      } else if (act === 'download') {
        const blob = new Blob([codeEl.value], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.js';
        a.click();
        URL.revokeObjectURL(url);
      } else if (act === 'fullscreen') {
        pg.classList.toggle('fullscreen');
      }
    });
  });

  run();
}

export function renderJavascriptLesson(container, { lessonId, moduleLabel, groupLabel, title }) {
  if (lessonId === 'playground') {
    container.innerHTML = `
      ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'javascript', lessonId })}
      <div class="lesson-body">
        <p class="lede">A live JavaScript console — write code, hit Run, and see console.log() output. Runs in a sandboxed iframe; nothing touches a server, and your code is saved automatically.</p>
        ${renderJsPlaygroundHTML()}
      </div>
      ${renderFooterNav('javascript', lessonId)}
    `;
    wireLessonChrome(container, { moduleId: 'javascript', lessonId });
    wireFooterNav(container, 'javascript', lessonId);
    initJsPlayground(container);
    return;
  }

  const contentFn = RENDERERS[lessonId];

  if (!contentFn) {
    container.innerHTML = `<div class="empty-state"><p>Unknown JavaScript lesson: ${lessonId}</p></div>`;
    return;
  }

  container.innerHTML = `
    ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'javascript', lessonId })}
    <div class="lesson-body">${contentFn()}</div>
    ${renderFooterNav('javascript', lessonId)}
  `;

  wireLessonChrome(container, { moduleId: 'javascript', lessonId });
  wireFooterNav(container, 'javascript', lessonId);

  const postRenderFn = POST_RENDER[lessonId];
  if (postRenderFn) postRenderFn();
}
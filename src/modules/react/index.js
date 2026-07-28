/* ============================================================
   modules/react/index.js — the React module's render entry point.
   Mirrors modules/css/index.js and modules/javascript/index.js.
   Live demos and the Playground need React + Babel (JSX transform)
   loaded globally via CDN <script> tags in index.html — see
   window.React / window.ReactDOM / window.Babel checks below.
   ============================================================ */

import { RENDERERS, POST_RENDER } from './renderers.js';
import { renderLessonChrome, wireLessonChrome } from '../../components/lesson-chrome.js';
import { renderFooterNav, wireFooterNav } from '../../components/footer-nav.js';

const REACT_MISSING_MSG =
  '<div class="empty-state"><p>React failed to load from the CDN. Check your internet connection and reload — this module needs React, ReactDOM, and Babel Standalone (see index.html).</p></div>';

/* ------------------------------------------------------------
   Shared JSX runner. `code` is a string of JSX/JS that defines
   one or more components and ends with a call to render(<X />).
   We expose `render`, plus React/useState/useEffect/etc, as
   locals inside the transformed function so lesson snippets can
   write JSX directly without their own import lines.
   ------------------------------------------------------------ */
function renderLiveJsx(rootId, code) {
  const rootEl = document.getElementById(rootId);
  if (!rootEl) return;

  if (!window.React || !window.ReactDOM || !window.Babel) {
    rootEl.innerHTML = REACT_MISSING_MSG;
    return;
  }

  try {
    const transformed = window.Babel.transform(code, {
      presets: [['react', { runtime: 'classic' }]],
    }).code;
    const root = window.ReactDOM.createRoot(rootEl);
    const runner = new Function(
      'React', 'ReactDOM', 'useState', 'useEffect', 'useRef', 'useContext', 'createContext', 'root',
      `${transformed}
       function render(element) { root.render(element); }
       return render;`
    );
    runner(
      window.React, window.ReactDOM,
      window.React.useState, window.React.useEffect, window.React.useRef,
      window.React.useContext, window.React.createContext,
      root
    );
  } catch (err) {
    rootEl.innerHTML = `<div class="empty-state"><p>Demo failed to run: ${String(err.message || err)}</p></div>`;
  }
}

// Exposed globally so renderers.js POST_RENDER functions (plain JS,
// no bundler-driven imports) can call it after their HTML is inserted.
window.__feaRenderLiveJsx = renderLiveJsx;

const JS_PLAYGROUND_DEFAULT = `function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button className="btn primary" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button className="btn" onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>
    </div>
  );
}

render(<App />);`;

export function renderReactPlaygroundHTML() {
  return `
    <div class="playground unified" data-react-pg>
      <div class="pg-toolbar">
        <div class="pg-tabs">
          <button class="pg-tab active" data-tab="code">JSX</button>
          <button class="pg-tab" data-tab="preview">Preview</button>
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
        <div class="pg-pane-editor" data-pane="code"><textarea class="pg-code" data-lang="jsx" spellcheck="false"></textarea></div>
        <div class="pg-pane-editor" data-pane="preview" hidden><div id="react-pg-root" style="min-height:220px; padding:16px;"></div></div>
      </div>
    </div>`;
}

export function initReactPlayground(root) {
  const pg = root.querySelector('[data-react-pg]');
  if (!pg || pg.dataset.wired) return;
  pg.dataset.wired = 'true';

  const storageKey = 'fea_react_free_playground';
  const codeEl = pg.querySelector('[data-lang="jsx"]');

  codeEl.value = localStorage.getItem(storageKey) || JS_PLAYGROUND_DEFAULT;

  function persist() {
    localStorage.setItem(storageKey, codeEl.value);
  }

  function showPreviewTab() {
    pg.querySelectorAll('.pg-tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === 'preview'));
    pg.querySelectorAll('.pg-pane-editor').forEach((p) => { p.hidden = p.dataset.pane !== 'preview'; });
  }

  function run() {
    renderLiveJsx('react-pg-root', codeEl.value);
    showPreviewTab();
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
      if (tab.dataset.tab === 'preview') run();
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
      } else if (act === 'copy') {
        navigator.clipboard.writeText(codeEl.value).then(() => {
          const old = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = old; }, 1200);
        });
      } else if (act === 'download') {
        const blob = new Blob([codeEl.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.jsx';
        a.click();
        URL.revokeObjectURL(url);
      } else if (act === 'fullscreen') {
        pg.classList.toggle('fullscreen');
      }
    });
  });

  run();
}

export function renderReactLesson(container, { lessonId, moduleLabel, groupLabel, title }) {
  if (lessonId === 'playground') {
    container.innerHTML = `
      ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'react', lessonId })}
      <div class="lesson-body">
        <p class="lede">A live JSX editor — write a component, hit Run, and see it rendered with real React. Runs entirely in your browser via Babel Standalone; nothing touches a server, and your code is saved automatically.</p>
        ${renderReactPlaygroundHTML()}
      </div>
      ${renderFooterNav('react', lessonId)}
    `;
    wireLessonChrome(container, { moduleId: 'react', lessonId });
    wireFooterNav(container, 'react', lessonId);
    initReactPlayground(container);
    return;
  }

  const contentFn = RENDERERS[lessonId];

  if (!contentFn) {
    container.innerHTML = `<div class="empty-state"><p>Unknown React lesson: ${lessonId}</p></div>`;
    return;
  }

  container.innerHTML = `
    ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'react', lessonId })}
    <div class="lesson-body">${contentFn()}</div>
    ${renderFooterNav('react', lessonId)}
  `;

  wireLessonChrome(container, { moduleId: 'react', lessonId });
  wireFooterNav(container, 'react', lessonId);

  const postRenderFn = POST_RENDER[lessonId];
  if (postRenderFn) postRenderFn();
}
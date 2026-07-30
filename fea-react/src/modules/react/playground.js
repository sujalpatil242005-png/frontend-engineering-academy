/* ============================================================
   modules/react/playground.js — the live JSX runner, adapted from
   the vanilla build's modules/react/index.js. The vanilla version
   loaded React/ReactDOM/Babel from a CDN into window globals
   because there was no bundler. Now that this is a real Vite+React
   app, we use the app's own bundled React/ReactDOM instance (no
   duplicate copy, no CDN) and @babel/standalone from npm purely
   for its in-browser JSX-to-JS transform.

   window.__feaRenderLiveJsx stays as a global bridge because
   modules/react/renderers.js (unchanged from the vanilla build)
   calls it directly from plain functions — those lesson-content
   files aren't React components themselves, they return HTML
   strings, so they reach back into React the same way the old
   app did: through this one documented global.
   ============================================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Babel from '@babel/standalone';

const REACT_MISSING_MSG =
  '<div class="empty-state"><p>The live demo failed to load. Reload the page and try again.</p></div>';

function renderLiveJsx(rootId, code) {
  const rootEl = document.getElementById(rootId);
  if (!rootEl) return;

  try {
    const transformed = Babel.transform(code, {
      presets: [['react', { runtime: 'classic' }]],
    }).code;

    if (!rootEl.__feaReactRoot) {
      rootEl.__feaReactRoot = ReactDOM.createRoot(rootEl);
    }
    const root = rootEl.__feaReactRoot;

    const runner = new Function(
      'React', 'ReactDOM', 'useState', 'useEffect', 'useRef', 'useContext', 'createContext', 'root',
      `${transformed}
       function render(element) { root.render(element); }
       return render;`
    );
    runner(
      React, ReactDOM,
      React.useState, React.useEffect, React.useRef,
      React.useContext, React.createContext,
      root
    );
  } catch (err) {
    rootEl.innerHTML = `<div class="empty-state"><p>Demo failed to run: ${String(err.message || err)}</p></div>`;
  }
}

window.__feaRenderLiveJsx = renderLiveJsx;

const REACT_PLAYGROUND_DEFAULT = `function App() {
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

  codeEl.value = localStorage.getItem(storageKey) || REACT_PLAYGROUND_DEFAULT;

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
        codeEl.value = REACT_PLAYGROUND_DEFAULT;
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

/* ============================================================
   playground.js — the ONE playground engine.
   Ported from HTML Academy's original initPlayground(), scoped so
   it can run against any container instead of the whole document.
   This is the single-pane HTML version; Phase 6 upgrades it to the
   tabbed HTML/CSS/Preview version the spec calls for, building on
   this same run/reset/copy/download/fullscreen behavior rather than
   replacing it.
   ============================================================ */

function updateGutter(textarea, gutter) {
  const lineCount = textarea.value.split('\n').length;
  gutter.innerHTML = Array.from({ length: lineCount }, (_, i) => i + 1).join('<br>');
}

function setupOne(pg) {
  if (pg.dataset.wired) return;
  pg.dataset.wired = 'true';

  const textarea = pg.querySelector('.pg-code');
  const gutter = pg.querySelector('.line-numbers');
  const iframe = pg.querySelector('.pg-frame') || pg.querySelector('iframe');
  if (!textarea || !iframe) return;

  const original = textarea.value;

  function run() {
    iframe.srcdoc = textarea.value;
  }

  if (gutter) updateGutter(textarea, gutter);
  run();

  textarea.addEventListener('input', () => {
    if (gutter) updateGutter(textarea, gutter);
  });
  textarea.addEventListener('scroll', () => {
    if (gutter) gutter.scrollTop = textarea.scrollTop;
  });
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.slice(0, start) + '  ' + textarea.value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      if (gutter) updateGutter(textarea, gutter);
    }
  });

  pg.querySelectorAll('.pg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.act;
      if (act === 'run') {
        run();
      } else if (act === 'reset') {
        textarea.value = original;
        if (gutter) updateGutter(textarea, gutter);
        run();
      } else if (act === 'copy') {
        navigator.clipboard.writeText(textarea.value).then(() => {
          const old = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = old; }, 1200);
        });
      } else if (act === 'download') {
        const blob = new Blob([textarea.value], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (pg.dataset.pg || 'playground') + '.html';
        a.click();
        URL.revokeObjectURL(url);
      } else if (act === 'fullscreen') {
        pg.classList.toggle('fullscreen');
      }
    });
  });
}

export function initPlaygrounds(root) {
  root.querySelectorAll('.playground[data-pg]').forEach(setupOne);
}

/* ============================================================
   Unified playground — HTML / CSS / Preview tabs, the "ONE
   playground" the original spec called for. Built on the same
   run/reset/copy/download/fullscreen actions as the single-pane
   engine above, just with tabbed panes and a preview that
   combines both languages. JavaScript is a fourth tab away
   whenever that module is built (see JS_ENABLED below).
   ============================================================ */

const JS_ENABLED = false; // flip on once JavaScript Academy exists

export function renderUnifiedPlaygroundHTML({ storageKey, defaultHtml, defaultCss }) {
  return `
    <div class="playground unified" data-pg-unified data-storage-key="${storageKey}"
         data-default-html="${encodeURIComponent(defaultHtml)}" data-default-css="${encodeURIComponent(defaultCss)}">
      <div class="pg-toolbar">
        <div class="pg-tabs">
          <button class="pg-tab active" data-tab="html">HTML</button>
          <button class="pg-tab" data-tab="css">CSS</button>
          ${JS_ENABLED ? '<button class="pg-tab" data-tab="js">JS</button>' : ''}
          <button class="pg-tab" data-tab="preview">Preview</button>
        </div>
        <div class="pg-actions">
          <button class="pg-btn" data-act="reset">&#8635; Reset</button>
          <button class="pg-btn" data-act="copy">&#8865; Copy</button>
          <button class="pg-btn" data-act="download">&#8681; Download</button>
          <button class="pg-btn" data-act="fullscreen">&#9974; Fullscreen</button>
        </div>
      </div>
      <div class="pg-panes">
        <div class="pg-pane-editor" data-pane="html"><textarea class="pg-code" data-lang="html" spellcheck="false"></textarea></div>
        <div class="pg-pane-editor" data-pane="css" hidden><textarea class="pg-code" data-lang="css" spellcheck="false"></textarea></div>
        <div class="pg-pane-editor" data-pane="preview" hidden><iframe class="pg-frame" title="Live preview"></iframe></div>
      </div>
    </div>`;
}

export function initUnifiedPlayground(root) {
  const pg = root.querySelector('[data-pg-unified]');
  if (!pg || pg.dataset.wired) return;
  pg.dataset.wired = 'true';

  const storageKey = pg.dataset.storageKey;
  const defaultHtml = decodeURIComponent(pg.dataset.defaultHtml || '');
  const defaultCss = decodeURIComponent(pg.dataset.defaultCss || '');

  const htmlEl = pg.querySelector('[data-lang="html"]');
  const cssEl = pg.querySelector('[data-lang="css"]');
  const iframe = pg.querySelector('.pg-frame');

  htmlEl.value = localStorage.getItem(storageKey + ':html') || defaultHtml;
  cssEl.value = localStorage.getItem(storageKey + ':css') || defaultCss;

  function run() {
    iframe.srcdoc = `<style>${cssEl.value}</style>\n${htmlEl.value}`;
  }

  function persist() {
    localStorage.setItem(storageKey + ':html', htmlEl.value);
    localStorage.setItem(storageKey + ':css', cssEl.value);
  }

  run();

  [htmlEl, cssEl].forEach((el) => {
    el.addEventListener('input', () => { persist(); run(); });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = el.selectionStart;
        const end = el.selectionEnd;
        el.value = el.value.slice(0, start) + '  ' + el.value.slice(end);
        el.selectionStart = el.selectionEnd = start + 2;
        persist();
        run();
      }
    });
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
      if (act === 'reset') {
        htmlEl.value = defaultHtml;
        cssEl.value = defaultCss;
        persist();
        run();
      } else if (act === 'copy') {
        const active = pg.querySelector('.pg-tab.active').dataset.tab;
        const text = active === 'css' ? cssEl.value : htmlEl.value;
        navigator.clipboard.writeText(text).then(() => {
          const old = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = old; }, 1200);
        });
      } else if (act === 'download') {
        const blob = new Blob([`<!DOCTYPE html>\n<html><head><style>${cssEl.value}</style></head><body>${htmlEl.value}</body></html>`], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.html';
        a.click();
        URL.revokeObjectURL(url);
      } else if (act === 'fullscreen') {
        pg.classList.toggle('fullscreen');
      }
    });
  });
}

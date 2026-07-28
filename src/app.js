import { getState, setTheme, subscribe, recordOpened, isSidebarCollapsed, setSidebarCollapsed } from './core/store.js';
import { onRouteChange } from './core/router.js';
import { getModule, findLessonTitle, MODULES } from './core/registry.js';
import { renderSidebar } from './components/sidebar.js';
import { renderDashboard } from './components/dashboard.js';
import { initGlobalSearch } from './components/search.js';
import { renderLessonChrome, wireLessonChrome } from './components/lesson-chrome.js';
import { renderFooterNav, wireFooterNav } from './components/footer-nav.js';
import { renderHtmlLesson } from './modules/html/index.js';
import { renderCssLesson } from './modules/css/index.js';
import { renderJavascriptLesson, renderJsPlaygroundHTML, initJsPlayground } from './modules/javascript/index.js';
import { renderReactLesson, renderReactPlaygroundHTML, initReactPlayground } from './modules/react/index.js';
import { renderUnifiedPlaygroundHTML, initUnifiedPlayground } from './components/playground.js';
import { renderBookmarksView } from './components/bookmarks-view.js';
import { renderNotesView } from './components/notes-view.js';

const shellEl = document.querySelector('.shell');
const sidebarEl = document.getElementById('sidebar');
const mainEl = document.getElementById('mainContent');
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const themeButtons = document.querySelectorAll('[data-theme-btn]');

initGlobalSearch({
  inputEl: document.getElementById('globalSearch'),
  resultsEl: document.getElementById('searchResults'),
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.themeBtn === theme));
}

themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => setTheme(btn.dataset.themeBtn));
});

function isDesktop() {
  return window.innerWidth > 900;
}

let sidebarVisible = isDesktop() ? !isSidebarCollapsed() : false;

function applySidebarVisibility() {
  shellEl.classList.toggle('sidebar-visible', sidebarVisible);
  if (menuToggle) {
    menuToggle.classList.toggle('open', sidebarVisible);
    menuToggle.setAttribute('aria-expanded', String(sidebarVisible));
  }
}

function setSidebarVisible(visible) {
  sidebarVisible = visible;
  if (isDesktop()) setSidebarCollapsed(!visible);
  applySidebarVisibility();
}

applySidebarVisibility();

if (menuToggle) {
  menuToggle.addEventListener('click', () => setSidebarVisible(!sidebarVisible));
}
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => setSidebarVisible(false));
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebarVisible && !isDesktop()) setSidebarVisible(false);
});

const readingProgressEl = document.getElementById('readingProgress');
let trackingReadingProgress = false;

function updateReadingProgress() {
  if (!trackingReadingProgress) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const pct = scrollable > 0 ? Math.min(100, Math.round((doc.scrollTop / scrollable) * 100)) : 0;
  readingProgressEl.style.width = pct + '%';
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });

function renderLessonPlaceholder(moduleId, lessonId) {
  const mod = getModule(moduleId);
  const title = mod ? findLessonTitle(moduleId, lessonId) : lessonId;
  const group = (mod ? mod.curriculum : []).find((g) => g.items.some((i) => i.id === lessonId));

  if (moduleId === 'html') {
    renderHtmlLesson(mainEl, {
      lessonId,
      moduleLabel: mod.label,
      groupLabel: group ? group.group : '',
      title,
    });
    return;
  }

  if (moduleId === 'css') {
    renderCssLesson(mainEl, {
      lessonId,
      moduleLabel: mod.label,
      groupLabel: group ? group.group : '',
      title,
    });
    return;
  }

  if (moduleId === 'javascript') {
    renderJavascriptLesson(mainEl, {
      lessonId,
      moduleLabel: mod.label,
      groupLabel: group ? group.group : '',
      title,
    });
    return;
  }

  if (moduleId === 'react') {
    renderReactLesson(mainEl, {
      lessonId,
      moduleLabel: mod.label,
      groupLabel: group ? group.group : '',
      title,
    });
    return;
  }

  mainEl.innerHTML = `
    ${renderLessonChrome({
      moduleLabel: mod ? mod.label : moduleId,
      groupLabel: group ? group.group : '',
      title,
      moduleId,
      lessonId,
    })}
    <div class="lesson-body">
      <div class="empty-state">
        <p>${mod ? mod.label : moduleId} lesson content lands in a later build phase &mdash; but the header above
        (breadcrumb, bookmark star, mark-complete) and the footer nav below are the real shared components, already wired to the store.</p>
      </div>
    </div>
    ${renderFooterNav(moduleId, lessonId)}
  `;

  wireLessonChrome(mainEl, { moduleId, lessonId });
  wireFooterNav(mainEl, moduleId, lessonId);
}

function renderUtilityPlaceholder(viewId) {
  if (viewId === 'bookmarks') {
    renderBookmarksView(mainEl);
    return;
  }

  if (viewId === 'notes') {
    renderNotesView(mainEl);
    return;
  }

  if (viewId === 'playground') {
    renderPracticePlayground(mainEl);
    return;
  }

  mainEl.innerHTML = `
    <div class="empty-state" style="margin-top:60px;">
      <h4>${viewId.replace(/-/g, ' ')}</h4>
      <p>This shared view is planned for a later build phase.</p>
    </div>`;
}

let practicePlaygroundMode = 'html';

function renderPracticePlayground(mainEl) {
  const modes = [
    { id: 'html', label: 'HTML + CSS' },
    { id: 'js', label: 'JavaScript' },
    { id: 'react', label: 'React' },
  ];

  const tabsHTML = modes.map((m) => `
    <button class="btn${practicePlaygroundMode === m.id ? ' primary' : ''}" data-pgmode="${m.id}">${m.label}</button>
  `).join('');

  let body = '';
  if (practicePlaygroundMode === 'html') {
    body = renderUnifiedPlaygroundHTML({
      storageKey: 'fea_scratch_playground',
      defaultHtml: '<h1>Hello, world</h1>\n<p>Start typing to experiment.</p>',
      defaultCss: 'body{ font-family: sans-serif; padding: 24px; }',
    });
  } else if (practicePlaygroundMode === 'js') {
    body = renderJsPlaygroundHTML();
  } else if (practicePlaygroundMode === 'react') {
    body = renderReactPlaygroundHTML();
  }

  mainEl.innerHTML = `
    <h2>Playground</h2>
    <p class="lede">A scratch space for any HTML+CSS, JavaScript, or React experiment, separate from the lesson playgrounds. Autosaves as you type.</p>
    <div class="tag-row" style="margin-bottom:16px;">${tabsHTML}</div>
    ${body}
  `;

  mainEl.querySelectorAll('[data-pgmode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      practicePlaygroundMode = btn.dataset.pgmode;
      renderPracticePlayground(mainEl);
    });
  });

  if (practicePlaygroundMode === 'html') initUnifiedPlayground(mainEl);
  else if (practicePlaygroundMode === 'js') initJsPlayground(mainEl);
  else if (practicePlaygroundMode === 'react') initReactPlayground(mainEl);
}

function render(route) {
  renderSidebar(sidebarEl);
  if (!isDesktop()) setSidebarVisible(false);

  trackingReadingProgress = route.view === 'lesson';
  readingProgressEl.style.width = '0%';
  window.scrollTo(0, 0);

  if (route.view === 'dashboard') {
    renderDashboard(mainEl);
    return;
  }
  if (route.view === 'lesson') {
    recordOpened(route.moduleId, route.lessonId, findLessonTitle(route.moduleId, route.lessonId));
    renderLessonPlaceholder(route.moduleId, route.lessonId);
    updateReadingProgress();
    return;
  }
  renderUtilityPlaceholder(route.view);
}

subscribe((state) => {
  applyTheme(state.theme);
});

applyTheme(getState().theme);
onRouteChange(render);
import { MODULES, flatLessons } from '../core/registry.js';
import { completedCount, completedCountInGroup, isLessonComplete, isGroupExpanded, setGroupExpanded } from '../core/store.js';
import { navigate, parseHash } from '../core/router.js';
import { openModal } from './modal.js';
import { renderBookmarksView } from './bookmarks-view.js';
import { renderNotesView } from './notes-view.js';

const POPUP_VIEWS = {
  bookmarks: { title: 'Bookmarks', render: renderBookmarksView },
  notes: { title: 'Notes', render: renderNotesView },
};

const UTILITY_LINKS = [
  { id: 'playground', label: 'Playground' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'projects', label: 'Projects' },
  { id: 'interview-prep', label: 'Interview Prep' },
  { id: 'bookmarks', label: 'Bookmarks' },
  { id: 'notes', label: 'Notes' },
  { id: 'settings', label: 'Settings' },
];

function lessonRowHTML(mod, item, currentLessonId) {
  const done = isLessonComplete(mod.id, item.id);
  const isCurrent = item.id === currentLessonId;
  let icon = '○';
  if (done) icon = '&#10003;';
  return `
    <a class="nav-link lesson-link${isCurrent ? ' active' : ''}${done ? ' done' : ''}" data-open-lesson="${mod.id}:${item.id}">
      <span class="lesson-icon">${icon}</span>
      <span class="lesson-label">${item.label}</span>
    </a>`;
}

function courseTreeHTML(mod, currentLessonId) {
  const groups = mod.curriculum;
  return groups.map((group) => {
    const containsCurrent = group.items.some((i) => i.id === currentLessonId);
    const expanded = isGroupExpanded(mod.id, group.group, containsCurrent);
    const groupDone = completedCountInGroup(mod.id, group.items.map((i) => i.id));
    return `
      <details class="sidebar-group" data-module="${mod.id}" data-group="${group.group}"${expanded ? ' open' : ''}>
        <summary class="sidebar-group-summary">
          <span class="disclosure-arrow">&#9656;</span>
          <span class="sidebar-group-name">${group.group}</span>
          <span class="sidebar-group-count">${groupDone}/${group.items.length}</span>
        </summary>
        <div class="sidebar-group-body">
          ${group.items.map((item) => lessonRowHTML(mod, item, currentLessonId)).join('')}
        </div>
      </details>`;
  }).join('');
}

function courseSummaryRowHTML(mod, isActive) {
  const total = flatLessons(mod.id).length;
  const done = completedCount(mod.id);

  if (mod.status === 'locked') {
    return `
      <a class="nav-link" data-nav="${mod.id}" aria-disabled="true">
        <span>${mod.label}</span>
        <span class="lock">soon</span>
      </a>`;
  }

  return `
    <a class="nav-link${isActive ? ' active' : ''}" data-nav="${mod.id}">
      <span>${mod.label}</span>
      <span class="pct">${done}/${total}</span>
    </a>`;
}

export function renderSidebar(container) {
  const route = parseHash();
  const onLessonPage = route.view === 'lesson';
  const activeModuleId = onLessonPage ? route.moduleId : null;
  const activeModule = activeModuleId ? MODULES.find((m) => m.id === activeModuleId) : null;

  let moduleSections;
  if (onLessonPage && activeModule) {
    // Inside a specific course: show only that course's own tree, not every other course.
    if (activeModule.status === 'active') {
      const wholeCourseExpanded = isGroupExpanded(activeModule.id, '__course__', true);
      moduleSections = `
        <details class="sidebar-group sidebar-course-toggle" data-module="${activeModule.id}" data-group="__course__"${wholeCourseExpanded ? ' open' : ''}>
          <summary class="sidebar-group-summary sidebar-course-summary">
            <span class="disclosure-arrow">&#9656;</span>
            <span class="sidebar-group-name">${activeModule.label}</span>
          </summary>
          <div class="sidebar-group-body">
            ${courseTreeHTML(activeModule, route.lessonId)}
          </div>
        </details>`;
    } else {
      moduleSections = courseSummaryRowHTML(activeModule, true);
    }
  } else {
    // Dashboard (or any other view): show every course as before.
    moduleSections = MODULES.map((mod) => courseSummaryRowHTML(mod, false)).join('');
  }

  const utilityLinks = UTILITY_LINKS.map((link) => {
    const isActive = route.view === link.id;
    return `<a class="nav-link${isActive ? ' active' : ''}" data-nav="${link.id}">${link.label}</a>`;
  }).join('');

  container.innerHTML = `
    <button class="back-to-dashboard" data-nav="dashboard">
      <span>&#8592;</span> <span>Back to Dashboard</span>
    </button>
    <div class="nav-group">
      <div class="nav-group-title">${onLessonPage ? 'This course' : 'Learning paths'}</div>
      ${moduleSections}
    </div>
    <div class="nav-group">
      <div class="nav-group-title">Practice</div>
      ${utilityLinks}
    </div>
  `;

  container.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.dataset.nav;

      if (POPUP_VIEWS[target]) {
        openModal({
          title: POPUP_VIEWS[target].title,
          mount: (body) => POPUP_VIEWS[target].render(body),
        });
        return;
      }

      const mod = MODULES.find((m) => m.id === target);
      if (mod && mod.status === 'locked') return;
      if (mod) {
        const lessons = flatLessons(mod.id);
        if (lessons[0]) navigate(`${mod.id}/${lessons[0].id}`);
        return;
      }
      navigate(target);
    });
  });

  container.querySelectorAll('[data-open-lesson]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const [moduleId, lessonId] = el.dataset.openLesson.split(':');
      navigate(`${moduleId}/${lessonId}`);
    });
  });

  container.querySelectorAll('.sidebar-group').forEach((details) => {
    details.addEventListener('toggle', () => {
      setGroupExpanded(details.dataset.module, details.dataset.group, details.open);
    });
  });
}

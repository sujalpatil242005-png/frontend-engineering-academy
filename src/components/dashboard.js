import { MODULES, flatLessons, allFlatLessons, firstIncompleteLesson, findLessonTitle } from '../core/registry.js';
import { getState, isLessonComplete, completedCount, listBookmarks, resetProgress } from '../core/store.js';
import { navigate } from '../core/router.js';
import { renderCourseFilters, filterAndSortModules } from './course-filters.js';

function thumbnailHTML(mod) {
  return `<div class="course-thumb course-thumb-${mod.id}"><span class="course-thumb-glyph">${mod.label.slice(0, 2).toUpperCase()}</span></div>`;
}

function formatDuration(totalLessons, minutesPerLesson) {
  const mins = totalLessons * (minutesPerLesson || 8);
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs === 0) return `${mins}m`;
  return rem ? `${hrs}h ${rem}m` : `${hrs}h`;
}

function moduleCardHTML(mod) {
  const total = flatLessons(mod.id).length;

  if (mod.status === 'locked') {
    return `
      <div class="module-card locked" data-category="${mod.category || ''}" data-difficulty="${mod.difficulty || ''}">
        ${thumbnailHTML(mod)}
        <div class="mc-body">
          <div class="mc-badges"><span class="badge def">${mod.difficulty || ''}</span></div>
          <h4>${mod.label}</h4>
          <p class="mc-desc">${mod.description || mod.tagline}</p>
          <div class="mc-footer"><span class="soon-tag">Coming soon</span></div>
        </div>
      </div>`;
  }

  const done = completedCount(mod.id);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return `
    <div class="module-card" data-open-module="${mod.id}" data-category="${mod.category || ''}" data-difficulty="${mod.difficulty || ''}">
      ${thumbnailHTML(mod)}
      <div class="mc-body">
        <div class="mc-badges"><span class="badge def">${mod.difficulty || ''}</span></div>
        <h4>${mod.label}</h4>
        <p class="mc-desc">${mod.description || mod.tagline}</p>
        <div class="mc-meta-row">
          <span>${total} lessons</span>
          <span>&middot;</span>
          <span>${formatDuration(total, mod.minutesPerLesson)}</span>
        </div>
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <div class="mc-stats">
          <span>${pct}% complete</span>
          <span>Remaining <b>${total - done}</b></span>
        </div>
        <div class="mc-footer"><button class="btn primary sm" data-continue-module="${mod.id}">Continue Learning</button></div>
      </div>
    </div>`;
}

function continueLearningHTML(state) {
  const activeModules = MODULES.filter((m) => m.status === 'active');
  const target = state.lastOpened
    ? { moduleId: state.lastOpened.moduleId, lessonId: state.lastOpened.lessonId, title: state.lastOpened.title }
    : (() => {
        const mod = activeModules[0];
        const lesson = firstIncompleteLesson(mod.id, isLessonComplete);
        return lesson ? { moduleId: mod.id, lessonId: lesson.id, title: lesson.label } : null;
      })();

  if (!target) {
    return `<div class="empty-state"><h4>Nothing started yet</h4><p>Pick a learning path below to begin.</p></div>`;
  }

  const modLabel = (MODULES.find((m) => m.id === target.moduleId) || {}).label || target.moduleId;

  return `
    <div class="continue-card" data-open-lesson="${target.moduleId}:${target.lessonId}">
      <div class="cc-meta">
        <div class="cc-eyebrow">${modLabel}</div>
        <h3>${target.title}</h3>
        <p>Pick up right where you left off.</p>
      </div>
      <button class="btn primary">Resume lesson</button>
    </div>`;
}

function overallProgressHTML() {
  const all = allFlatLessons();
  const done = all.filter((l) => isLessonComplete(l.moduleId, l.id)).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;

  return `
    <div class="stat-card">
      <div class="progress-ring">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle class="ring-track" cx="32" cy="32" r="26"></circle>
          <circle class="ring-fill" cx="32" cy="32" r="26"
            stroke-dasharray="${2 * Math.PI * 26}"
            stroke-dashoffset="${2 * Math.PI * 26 * (1 - pct / 100)}"></circle>
        </svg>
        <div class="ring-label">${pct}%</div>
      </div>
      <div>
        <div class="stat-value">${done}/${all.length}</div>
        <div class="stat-label">topics completed overall</div>
        ${done > 0 ? `<button class="btn ghost sm" data-reset-progress style="margin-top:8px;">Reset progress</button>` : ''}
      </div>
    </div>`;
}

function streakChipHTML(state) {
  return `<div class="streak-chip">${state.streak.count} day${state.streak.count === 1 ? '' : 's'} streak</div>`;
}

function bookmarksHTML() {
  const marks = listBookmarks();
  if (!marks.length) {
    return `<div class="empty-state"><p>No bookmarks yet. Star a lesson to save it here.</p></div>`;
  }
  return `<div class="bookmark-list">${marks.slice(0, 6).map((b) => {
    const mod = MODULES.find((m) => m.id === b.moduleId);
    return `
      <div class="bl-item" data-open-lesson="${b.moduleId}:${b.lessonId}">
        <span><span class="bl-mod">${mod ? mod.label : b.moduleId}</span>${findLessonTitle(b.moduleId, b.lessonId)}</span>
        <span>&rarr;</span>
      </div>`;
  }).join('')}</div>`;
}

function recentLessonsHTML(state) {
  if (!state.history.length) {
    return `<div class="empty-state"><p>Lessons you open will show up here.</p></div>`;
  }
  return `<div class="recent-list">${state.history.slice(0, 5).map((h) => {
    const mod = MODULES.find((m) => m.id === h.moduleId);
    return `
      <div class="rl-item" data-open-lesson="${h.moduleId}:${h.lessonId}">
        <span><span class="rl-mod">${mod ? mod.label : h.moduleId}</span>${h.title}</span>
        <span>&rarr;</span>
      </div>`;
  }).join('')}</div>`;
}

function todaysGoalHTML() {
  const activeModules = MODULES.filter((m) => m.status === 'active');
  const picks = activeModules
    .map((m) => firstIncompleteLesson(m.id, isLessonComplete))
    .filter(Boolean)
    .slice(0, 2)
    .map((lesson, i) => `
      <div class="goal-item">
        <span class="chk"></span>
        <span>${lesson.label}</span>
      </div>`);

  if (!picks.length) {
    return `<div class="empty-state"><p>You're all caught up. Nice work.</p></div>`;
  }
  return `<div class="today-goal-card">${picks.join('')}</div>`;
}

function renderModuleGrid(gridEl, modules) {
  if (!modules.length) {
    gridEl.innerHTML = `<div class="empty-state"><h4>No courses match</h4><p>Try a different search term or clear your filters.</p></div>`;
    return;
  }

  gridEl.innerHTML = modules.map(moduleCardHTML).join('');

  gridEl.querySelectorAll('[data-continue-module]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const moduleId = btn.dataset.continueModule;
      const lesson = firstIncompleteLesson(moduleId, isLessonComplete);
      if (lesson) navigate(`${moduleId}/${lesson.id}`);
    });
  });

  gridEl.querySelectorAll('[data-open-module]').forEach((card) => {
    card.addEventListener('click', () => {
      const moduleId = card.dataset.openModule;
      const lesson = firstIncompleteLesson(moduleId, isLessonComplete);
      if (lesson) navigate(`${moduleId}/${lesson.id}`);
    });
  });
}

export function renderDashboard(container) {
  const state = getState();

  container.innerHTML = `
    <div class="dash-header">
      <div>
        <h1>Welcome back</h1>
        <p>Here's where you left off across Frontend Engineering Academy.</p>
      </div>
      ${streakChipHTML(state)}
    </div>

    <div class="dash-section">
      <div class="dash-section-title">Continue learning</div>
      ${continueLearningHTML(state)}
    </div>

    <div class="dash-section">
      <div class="dash-section-title">Learning paths</div>
      <div id="courseFiltersMount"></div>
      <div class="grid-4" id="moduleGrid"></div>
    </div>

    <div class="dash-section">
      <div class="grid-3">
        <div>
          <div class="dash-section-title">Overall progress</div>
          ${overallProgressHTML()}
        </div>
        <div>
          <div class="dash-section-title">Today's goal</div>
          ${todaysGoalHTML()}
        </div>
        <div>
          <div class="dash-section-title">Bookmarks</div>
          ${bookmarksHTML()}
        </div>
      </div>
    </div>

    <div class="dash-section">
      <div class="dash-section-title">Recent lessons</div>
      ${recentLessonsHTML(state)}
    </div>
  `;

  const gridEl = container.querySelector('#moduleGrid');
  renderModuleGrid(gridEl, MODULES);
  renderCourseFilters(container.querySelector('#courseFiltersMount'), (filters) => {
    renderModuleGrid(gridEl, filterAndSortModules(filters));
  });

  container.querySelectorAll('[data-open-lesson]').forEach((el) => {
    el.addEventListener('click', () => {
      const [moduleId, lessonId] = el.dataset.openLesson.split(':');
      navigate(`${moduleId}/${lessonId}`);
    });
  });

  const resetBtn = container.querySelector('[data-reset-progress]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (window.confirm('Reset all lesson progress? This does not affect bookmarks or notes.')) {
        resetProgress();
        renderDashboard(container);
      }
    });
  }
}

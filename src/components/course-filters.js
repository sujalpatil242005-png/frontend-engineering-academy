/* ============================================================
   course-filters.js — search / category / difficulty / sort bar
   for the dashboard's course grid. Pure client-side filtering of
   the existing MODULES array; doesn't touch routing, store, or
   any other module.
   ============================================================ */

import { MODULES } from '../core/registry.js';

export function filterAndSortModules({ q = '', category = 'All', difficulty = 'All', sort = 'default' } = {}) {
  let list = MODULES.filter((mod) => {
    const matchesQuery = !q || mod.label.toLowerCase().includes(q) || (mod.description || '').toLowerCase().includes(q);
    const matchesCategory = category === 'All' || mod.category === category;
    const matchesDifficulty = difficulty === 'All' || mod.difficulty === difficulty;
    return matchesQuery && matchesCategory && matchesDifficulty;
  });

  if (sort === 'az') {
    list = [...list].sort((a, b) => a.label.localeCompare(b.label));
  } else if (sort === 'difficulty') {
    const order = { Beginner: 0, Intermediate: 1, Advanced: 2 };
    list = [...list].sort((a, b) => (order[a.difficulty] ?? 9) - (order[b.difficulty] ?? 9));
  }

  return list;
}

export function renderCourseFilters(container, onChange) {
  const categories = ['All', ...new Set(MODULES.map((m) => m.category).filter(Boolean))];
  const difficulties = ['All', ...new Set(MODULES.map((m) => m.difficulty).filter(Boolean))];

  container.innerHTML = `
    <div class="course-filters">
      <div class="course-search-wrap">
        <span class="search-icon">&#128269;</span>
        <input type="text" id="courseSearch" class="course-search-input" placeholder="Search courses&hellip;" autocomplete="off">
      </div>
      <select id="courseCategory" aria-label="Filter by category">
        ${categories.map((c) => `<option value="${c}">${c === 'All' ? 'All categories' : c}</option>`).join('')}
      </select>
      <select id="courseDifficulty" aria-label="Filter by difficulty">
        ${difficulties.map((d) => `<option value="${d}">${d === 'All' ? 'All difficulties' : d}</option>`).join('')}
      </select>
      <select id="courseSort" aria-label="Sort courses">
        <option value="default">Sort: Default</option>
        <option value="az">Sort: A&ndash;Z</option>
        <option value="difficulty">Sort: Difficulty</option>
      </select>
    </div>`;

  function readAndApply() {
    onChange({
      q: container.querySelector('#courseSearch').value.trim().toLowerCase(),
      category: container.querySelector('#courseCategory').value,
      difficulty: container.querySelector('#courseDifficulty').value,
      sort: container.querySelector('#courseSort').value,
    });
  }

  container.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', readAndApply);
  });
}

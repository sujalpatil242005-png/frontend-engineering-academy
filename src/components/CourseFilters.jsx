import { useState, useMemo } from 'react';
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

export default function CourseFilters({ onChange }) {
  const categories = useMemo(() => ['All', ...new Set(MODULES.map((m) => m.category).filter(Boolean))], []);
  const difficulties = useMemo(() => ['All', ...new Set(MODULES.map((m) => m.difficulty).filter(Boolean))], []);

  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sort, setSort] = useState('default');

  function apply(next) {
    onChange(next);
  }

  return (
    <div className="course-filters">
      <div className="course-search-wrap">
        <span className="search-icon">&#128269;</span>
        <input
          type="text"
          className="course-search-input"
          placeholder="Search courses&hellip;"
          autoComplete="off"
          value={q}
          onChange={(e) => {
            const value = e.target.value;
            setQ(value);
            apply({ q: value.trim().toLowerCase(), category, difficulty, sort });
          }}
        />
      </div>
      <select
        aria-label="Filter by category"
        value={category}
        onChange={(e) => { setCategory(e.target.value); apply({ q, category: e.target.value, difficulty, sort }); }}
      >
        {categories.map((c) => <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>)}
      </select>
      <select
        aria-label="Filter by difficulty"
        value={difficulty}
        onChange={(e) => { setDifficulty(e.target.value); apply({ q, category, difficulty: e.target.value, sort }); }}
      >
        {difficulties.map((d) => <option key={d} value={d}>{d === 'All' ? 'All difficulties' : d}</option>)}
      </select>
      <select
        aria-label="Sort courses"
        value={sort}
        onChange={(e) => { setSort(e.target.value); apply({ q, category, difficulty, sort: e.target.value }); }}
      >
        <option value="default">Sort: Default</option>
        <option value="az">Sort: A&ndash;Z</option>
        <option value="difficulty">Sort: Difficulty</option>
      </select>
    </div>
  );
}

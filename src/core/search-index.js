/* ============================================================
   search-index.js — builds the single search index every module
   feeds into. A lesson entry already covers "HTML topics, CSS
   topics, interview questions, cheat sheets, projects" because
   those all live as ordinary curriculum items (see each module's
   curriculum.js) — there is no separate index to maintain per feature.
   ============================================================ */

import { MODULES, allFlatLessons } from './registry.js';

export function buildSearchIndex() {
  return allFlatLessons().map((lesson) => {
    const mod = MODULES.find((m) => m.id === lesson.moduleId);
    return {
      title: lesson.label,
      group: lesson.group,
      moduleId: lesson.moduleId,
      moduleLabel: mod ? mod.label : lesson.moduleId,
      lessonId: lesson.id,
    };
  });
}

export function searchIndex(query, index) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((entry) =>
    entry.title.toLowerCase().includes(q) ||
    entry.group.toLowerCase().includes(q) ||
    entry.moduleLabel.toLowerCase().includes(q)
  ).slice(0, 40);
}

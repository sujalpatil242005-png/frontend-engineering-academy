/* ============================================================
   footer-nav.js — prev/next navigation at the bottom of every
   lesson, computed from the module's curriculum order. One
   implementation instead of each module hand-wiring its own.
   ============================================================ */

import { flatLessons } from '../core/registry.js';
import { navigate } from '../core/router.js';

export function renderFooterNav(moduleId, lessonId) {
  const lessons = flatLessons(moduleId);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return `
    <div class="footer-nav">
      <button class="btn" data-footer-prev ${prev ? '' : 'disabled'}>${prev ? '&larr; ' + prev.label : '&larr; Start of module'}</button>
      <button class="btn" data-footer-next ${next ? '' : 'disabled'}>${next ? next.label + ' &rarr;' : 'End of module &rarr;'}</button>
    </div>`;
}

export function wireFooterNav(root, moduleId, lessonId) {
  const lessons = flatLessons(moduleId);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const prevBtn = root.querySelector('[data-footer-prev]');
  const nextBtn = root.querySelector('[data-footer-next]');
  if (prevBtn && prev) prevBtn.addEventListener('click', () => navigate(`${moduleId}/${prev.id}`));
  if (nextBtn && next) nextBtn.addEventListener('click', () => navigate(`${moduleId}/${next.id}`));
}

/* ============================================================
   modules/html/index.js — the HTML module's render entry point.
   app.js calls renderHtmlLesson() for any #/html/{lessonId} route;
   everything module-specific (content, the interview quiz, the
   tagref/cheatsheet filters) lives in this folder, nothing in
   core/ or components/ knows HTML exists specifically.
   ============================================================ */

import { HTML_CONTENT } from './content.js';
import { INTERVIEW_QUIZ } from './interview-quiz-data.js';
import { renderLessonChrome, wireLessonChrome } from '../../components/lesson-chrome.js';
import { renderFooterNav, wireFooterNav } from '../../components/footer-nav.js';
import { initPlaygrounds } from '../../components/playground.js';
import { initQAToggles } from '../../components/disclosure.js';
import { initCheatFilter, initTagrefFilter } from '../../components/filter-list.js';
import { renderQuiz } from '../../components/quiz.js';

export function renderHtmlLesson(container, { lessonId, moduleLabel, groupLabel, title }) {
  const contentFn = HTML_CONTENT[lessonId];

  if (!contentFn) {
    container.innerHTML = `<div class="empty-state"><p>Unknown HTML lesson: ${lessonId}</p></div>`;
    return;
  }

  container.innerHTML = `
    ${renderLessonChrome({ moduleLabel, groupLabel, title, moduleId: 'html', lessonId })}
    <div class="lesson-body">${contentFn()}</div>
    ${renderFooterNav('html', lessonId)}
  `;

  wireLessonChrome(container, { moduleId: 'html', lessonId });
  wireFooterNav(container, 'html', lessonId);

  initPlaygrounds(container);
  initQAToggles(container);

  if (lessonId === 'tagref') initTagrefFilter(container);
  if (lessonId === 'cheatsheet') initCheatFilter(container);
  if (lessonId === 'interview') {
    const mount = container.querySelector('[data-quiz-mount]');
    if (mount) renderQuiz(mount, INTERVIEW_QUIZ);
  }
}

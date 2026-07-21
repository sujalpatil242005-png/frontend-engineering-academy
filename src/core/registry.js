/* ============================================================
   registry.js — merges every module's curriculum into one place.
   Adding JavaScript/React/Git for real later means: build a
   /modules/{id}/curriculum.js like the two below, add one line
   here. Nothing else in core/ or components/ changes.
   ============================================================ */

import { HTML_CURRICULUM } from '../modules/html/curriculum.js';
import { CSS_CURRICULUM } from '../modules/css/curriculum.js';
import { JAVASCRIPT_CURRICULUM } from '../modules/javascript/curriculum.js';
import { REACT_CURRICULUM } from '../modules/react/curriculum.js';

export const MODULES = [
  {
    id: 'html', label: 'HTML', tagline: 'Beginner → internship-ready', status: 'active', curriculum: HTML_CURRICULUM,
    description: 'Structure, semantics, forms, accessibility, and the tags that show up in every frontend interview.',
    difficulty: 'Beginner', category: 'Markup', minutesPerLesson: 9,
  },
  {
    id: 'css', label: 'CSS', tagline: 'Beginner → internship-ready', status: 'active', curriculum: CSS_CURRICULUM,
    description: 'Layout systems, the box model, Flexbox and Grid labs, modern CSS, and architecture patterns.',
    difficulty: 'Intermediate', category: 'Styling', minutesPerLesson: 10,
  },
  {
    id: 'javascript', label: 'JavaScript', tagline: 'Coming soon', status: 'locked', curriculum: JAVASCRIPT_CURRICULUM,
    description: 'Core language, the DOM, async patterns, and the interview questions that come up most.',
    difficulty: 'Intermediate', category: 'Programming', minutesPerLesson: 10,
  },
  {
    id: 'react', label: 'React', tagline: 'Coming soon', status: 'locked', curriculum: REACT_CURRICULUM,
    description: 'Components, hooks, state management, and building real interfaces on top of the DOM.',
    difficulty: 'Advanced', category: 'Frameworks', minutesPerLesson: 12,
  },
];

export function getModule(moduleId) {
  return MODULES.find((m) => m.id === moduleId) || null;
}

export function flatLessons(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) return [];
  return mod.curriculum.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.group, moduleId }))
  );
}

export function allFlatLessons() {
  return MODULES.filter((m) => m.status === 'active').flatMap((m) => flatLessons(m.id));
}

export function firstIncompleteLesson(moduleId, isCompleteFn) {
  const lessons = flatLessons(moduleId);
  return lessons.find((l) => !isCompleteFn(moduleId, l.id)) || lessons[0] || null;
}

export function findLessonTitle(moduleId, lessonId) {
  const lesson = flatLessons(moduleId).find((l) => l.id === lessonId);
  return lesson ? lesson.label : lessonId;
}

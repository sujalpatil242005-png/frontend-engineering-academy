/* ============================================================
   store.js — the ONE state container for the whole app.
   Replaces the four separate localStorage-keyed stores that
   HTML Academy and CSS Academy each maintained independently.
   ============================================================ */

const STORAGE_KEY = 'fea_state_v1';

function defaultState() {
  return {
    theme: 'dark',
    progress: {},     // { [moduleId]: { [lessonId]: true } }
    bookmarks: {},    // { "moduleId:lessonId": true }
    notes: {},        // { "moduleId:lessonId": "free text" }
    lastOpened: null,  // { moduleId, lessonId, title, at }
    history: [],      // [{ moduleId, lessonId, title, at }] most recent first, capped at 10
    streak: { count: 0, lastVisit: null },
    sidebarGroups: {}, // { [moduleId]: { [groupName]: true/false } } — remembers expand/collapse per group
    sidebarCollapsed: false, // desktop-only preference, remembered across sessions
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    }
  } catch (err) {
    console.warn('[store] failed to read saved state, starting fresh', err);
  }
  return defaultState();
}

let state = loadState();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('[store] failed to persist state', err);
  }
}

function notify() {
  listeners.forEach((fn) => fn(state));
}

function commit() {
  persist();
  notify();
}

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ---------- theme ---------- */
export function setTheme(theme) {
  state.theme = theme;
  commit();
}

/* ---------- progress ---------- */
export function isLessonComplete(moduleId, lessonId) {
  return !!(state.progress[moduleId] && state.progress[moduleId][lessonId]);
}

export function toggleLessonComplete(moduleId, lessonId) {
  state.progress[moduleId] = state.progress[moduleId] || {};
  if (state.progress[moduleId][lessonId]) {
    delete state.progress[moduleId][lessonId];
  } else {
    state.progress[moduleId][lessonId] = true;
  }
  commit();
}

export function completedCount(moduleId) {
  return state.progress[moduleId] ? Object.keys(state.progress[moduleId]).length : 0;
}

export function completedCountInGroup(moduleId, itemIds) {
  const done = state.progress[moduleId] || {};
  return itemIds.filter((id) => done[id]).length;
}

export function resetProgress(moduleId) {
  if (moduleId) {
    state.progress[moduleId] = {};
  } else {
    state.progress = {};
  }
  commit();
}

/* ---------- bookmarks ---------- */
function bmKey(moduleId, lessonId) {
  return moduleId + ':' + lessonId;
}

export function isBookmarked(moduleId, lessonId) {
  return !!state.bookmarks[bmKey(moduleId, lessonId)];
}

export function toggleBookmark(moduleId, lessonId) {
  const key = bmKey(moduleId, lessonId);
  if (state.bookmarks[key]) {
    delete state.bookmarks[key];
  } else {
    state.bookmarks[key] = true;
  }
  commit();
}

export function listBookmarks() {
  return Object.keys(state.bookmarks).map((key) => {
    const [moduleId, lessonId] = key.split(':');
    return { moduleId, lessonId };
  });
}

/* ---------- sidebar group expand/collapse ---------- */
export function isGroupExpanded(moduleId, groupName, fallback) {
  const forModule = state.sidebarGroups[moduleId];
  if (!forModule || !(groupName in forModule)) return fallback;
  return !!forModule[groupName];
}

export function setGroupExpanded(moduleId, groupName, expanded) {
  state.sidebarGroups[moduleId] = state.sidebarGroups[moduleId] || {};
  state.sidebarGroups[moduleId][groupName] = expanded;
  commit();
}

export function isSidebarCollapsed() {
  return !!state.sidebarCollapsed;
}

export function setSidebarCollapsed(collapsed) {
  state.sidebarCollapsed = collapsed;
  commit();
}

/* ---------- notes ---------- */
export function getNote(moduleId, lessonId) {
  return state.notes[bmKey(moduleId, lessonId)] || '';
}

export function setNote(moduleId, lessonId, text) {
  state.notes[bmKey(moduleId, lessonId)] = text;
  commit();
}

export function listNotes() {
  return Object.keys(state.notes)
    .filter((key) => state.notes[key] && state.notes[key].trim().length > 0)
    .map((key) => {
      const [moduleId, lessonId] = key.split(':');
      return { moduleId, lessonId, text: state.notes[key] };
    });
}

/* ---------- last opened / history ---------- */
export function recordOpened(moduleId, lessonId, title) {
  const entry = { moduleId, lessonId, title, at: Date.now() };
  state.lastOpened = entry;
  state.history = [entry, ...state.history.filter((h) => !(h.moduleId === moduleId && h.lessonId === lessonId))].slice(0, 10);
  touchStreak();
  commit();
}

/* ---------- streak ---------- */
function touchStreak() {
  const today = new Date().toDateString();
  if (state.streak.lastVisit === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  state.streak.count = state.streak.lastVisit === yesterday ? state.streak.count + 1 : 1;
  state.streak.lastVisit = today;
}

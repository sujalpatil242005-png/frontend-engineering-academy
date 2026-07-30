/* ============================================================
   store.js — the ONE state container for the whole app.
   Replaces the four separate localStorage-keyed stores that
   HTML Academy and CSS Academy each maintained independently.

   Now also synced with the backend once a user is logged in:
   localStorage stays as an instant local echo (so the UI never
   waits on a network round trip), while every commit() also
   fires a debounced PUT to /api/state. On login, loadRemoteState()
   overwrites local state with whatever the server has for that
   user — the same object shape either way, so every action below
   (toggleLessonComplete, toggleBookmark, setNote, etc.) needed
   zero changes.
   ============================================================ */

const STORAGE_KEY = 'fea_state_v1';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function defaultState() {
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
let authToken = null;
let remotePersistTimer = null;

function persistLocal() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('[store] failed to persist state locally', err);
  }
}

async function persistRemote() {
  if (!authToken) return;
  try {
    await fetch(`${API_BASE}/api/state`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(state),
    });
  } catch (err) {
    console.warn('[store] failed to sync state to server', err);
  }
}

function notify() {
  listeners.forEach((fn) => fn(state));
}

function commit() {
  persistLocal();
  notify();
  clearTimeout(remotePersistTimer);
  remotePersistTimer = setTimeout(persistRemote, 500);
}

/* ---------- auth integration ---------- */

// Called by AuthContext right after login/signup succeed, and on
// app boot if a saved token is still valid. Clearing (null) stops
// further remote syncs — used on logout.
export function setAuthToken(token) {
  authToken = token;
}

// Called by AuthContext right after login — replaces local state
// with whatever the server has for this user.
export async function loadRemoteState() {
  if (!authToken) return;
  try {
    const res = await fetch(`${API_BASE}/api/state`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!res.ok) return;
    state = await res.json();
    persistLocal();
    notify();
  } catch (err) {
    console.warn('[store] failed to load state from server', err);
  }
}

// Called by AuthContext on logout — wipes in-memory + local state
// back to a clean slate so the next person to use this browser
// doesn't see the previous account's progress.
export function resetToDefault() {
  state = defaultState();
  persistLocal();
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

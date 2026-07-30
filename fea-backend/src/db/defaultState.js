/* ============================================================
   defaultState.js — exact same shape store.js used for its
   localStorage state, now the shape returned by / persisted to
   the backend instead. Keeping this identical is what makes the
   frontend migration mechanical rather than a rewrite.
   ============================================================ */

export function defaultState() {
  return {
    theme: 'dark',
    progress: {},
    bookmarks: {},
    notes: {},
    lastOpened: null,
    history: [],
    streak: { count: 0, lastVisit: null },
    sidebarGroups: {},
    sidebarCollapsed: false,
  };
}

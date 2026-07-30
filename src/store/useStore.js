/* ============================================================
   useStore.js — bridges the framework-agnostic store.js (still
   the ONE state container, unchanged) into React via
   useSyncExternalStore. Every component that needs live state
   (theme, progress, bookmarks, notes, streak, sidebar groups)
   calls useStore() and re-renders automatically on any commit()
   inside store.js — no prop drilling, no duplicated state.

   store.js mutates one state object in place rather than ever
   reassigning it, so getState() always returns the exact same
   object reference — forever. useSyncExternalStore relies on
   Object.is to detect a change, so comparing references (even a
   shallow copy keyed off that reference) can never see a change.
   Instead we track a version counter that bumps on every commit
   and only take a fresh shallow-copy snapshot when the version
   has moved, which gives React a genuinely new reference to
   compare against each time the store actually changes.
   ============================================================ */

import { useSyncExternalStore } from 'react';
import { getState, subscribe } from './store.js';

let version = 0;
let cachedSnapshot = null;
let cachedVersion = -1;

function subscribeWithVersion(callback) {
  return subscribe(() => {
    version += 1;
    callback();
  });
}

function getSnapshot() {
  if (cachedVersion !== version) {
    cachedSnapshot = { ...getState() };
    cachedVersion = version;
  }
  return cachedSnapshot;
}

export function useStore() {
  return useSyncExternalStore(subscribeWithVersion, getSnapshot);
}

// Re-export every store action so components only need one import.
export * from './store.js';
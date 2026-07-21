/* ============================================================
   router.js — tiny hash router. Every module's lessons resolve
   to #/{moduleId}/{lessonId}. Utility views (playground, notes,
   bookmarks, settings, etc.) resolve to #/{viewId}.
   ============================================================ */

const KNOWN_MODULE_IDS = ['html', 'css', 'javascript', 'react'];

export function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  if (!raw || raw === 'dashboard') return { view: 'dashboard' };

  const parts = raw.split('/').filter(Boolean);
  if (parts.length >= 2 && KNOWN_MODULE_IDS.includes(parts[0])) {
    return { view: 'lesson', moduleId: parts[0], lessonId: parts[1] };
  }
  return { view: parts[0] };
}

export function navigate(path) {
  location.hash = path.startsWith('#') ? path : '#/' + path;
}

export function onRouteChange(handler) {
  window.addEventListener('hashchange', () => handler(parseHash()));
  handler(parseHash());
}

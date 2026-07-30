/* ============================================================
   router.js — thin compatibility shim. The app itself now routes
   via react-router-dom's <HashRouter>, but legacy-engine.js (CSS
   module content, unchanged from the vanilla build) still calls
   navigate() directly from inside a raw HTML string's inline
   onclick handler (window.goTo) to cross-link to another lesson.
   Setting location.hash here is enough — HashRouter listens for
   hashchange and updates the route exactly like it would for a
   normal link click.
   ============================================================ */

export function navigate(path) {
  location.hash = path.startsWith('#') ? path : '#/' + path;
}

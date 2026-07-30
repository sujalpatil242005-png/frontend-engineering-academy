/* ============================================================
   filter-list.js — generic filter behaviors, ported from HTML
   Academy's cheat-sheet and tag-reference filters, scoped to a
   container instead of the whole document so any module can use
   them (CSS's cheatsheet/property-reference lessons reuse these
   directly in Phase 5).
   ============================================================ */

export function initCheatFilter(root) {
  const search = root.querySelector('[data-cheat-search]') || root.querySelector('#cheatSearch');
  if (!search || search.dataset.wired) return;
  search.dataset.wired = 'true';

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    root.querySelectorAll('.cheat-card').forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

export function initTagrefFilter(root) {
  const filters = root.querySelector('[data-tagref-filters]') || root.querySelector('#tagrefFilters');
  const search = root.querySelector('[data-tagref-search]') || root.querySelector('#tagrefSearch');
  const table = root.querySelector('[data-tagref-table]') || root.querySelector('#tagrefTable');
  if (!table || table.dataset.wired) return;
  table.dataset.wired = 'true';

  let activeCat = 'all';

  function apply() {
    const q = (search ? search.value : '').trim().toLowerCase();
    table.querySelectorAll('tr[data-cat]').forEach((row) => {
      const cat = row.dataset.cat;
      const text = row.textContent.toLowerCase();
      const catOk = activeCat === 'all' || cat === activeCat;
      const textOk = !q || text.includes(q);
      row.style.display = (catOk && textOk) ? '' : 'none';
    });
  }

  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      filters.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.filter;
      apply();
    });
  }
  if (search) search.addEventListener('input', apply);
}

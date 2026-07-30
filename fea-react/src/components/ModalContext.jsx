/* ============================================================
   ModalContext.jsx — the one reusable modal, now a real React
   portal instead of a manually-managed overlay element. Bookmarks
   and Notes open here from the sidebar so navigating between them
   doesn't lose the lesson underneath.
   ============================================================ */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalCtx = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null); // { title, content }

  const openModal = useCallback((title, content) => setModal({ title, content }), []);
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    if (!modal) return;
    document.body.classList.add('modal-open');
    function onKeydown(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeydown);
    };
  }, [modal, closeModal]);

  return (
    <ModalCtx.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && createPortal(
        <div className={`modal-overlay show`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-box" role="dialog" aria-modal="true" aria-label={modal.title}>
            <div className="modal-header">
              <h3>{modal.title}</h3>
              <button className="modal-close" aria-label="Close" onClick={closeModal}>&#10005;</button>
            </div>
            <div className="modal-body">{modal.content}</div>
          </div>
        </div>,
        document.body
      )}
    </ModalCtx.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}

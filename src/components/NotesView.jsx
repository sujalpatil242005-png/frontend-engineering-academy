import { useNavigate } from 'react-router-dom';
import { MODULES, findLessonTitle, flatLessons } from '../core/registry.js';
import { useStore, listNotes, setNote } from '../store/useStore.js';
import { useModal } from './ModalContext.jsx';

function groupLabelFor(moduleId, lessonId) {
  const found = flatLessons(moduleId).find((l) => l.id === lessonId);
  return found ? found.group : '';
}

export default function NotesView() {
  useStore();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const notes = listNotes();

  if (!notes.length) {
    return (
      <div className="empty-state" style={{ marginTop: 16 }}>
        <h4>No notes yet</h4>
        <p>Open the "Add note" button on any lesson to jot something down — it'll show up here.</p>
      </div>
    );
  }

  const byModule = {};
  notes.forEach((n) => {
    byModule[n.moduleId] = byModule[n.moduleId] || [];
    byModule[n.moduleId].push(n);
  });

  function open(moduleId, lessonId) {
    navigate(`/${moduleId}/${lessonId}`);
    closeModal();
  }

  return (
    <>
      <p className="lede">{notes.length} note{notes.length === 1 ? '' : 's'} across your lessons.</p>
      {Object.keys(byModule).map((moduleId) => {
        const mod = MODULES.find((m) => m.id === moduleId);
        return (
          <div className="dash-section" key={moduleId}>
            <div className="dash-section-title">{mod ? mod.label : moduleId}</div>
            <div className="bookmark-list">
              {byModule[moduleId].map((n) => (
                <div key={n.lessonId} className="bl-item note-item" onClick={() => open(n.moduleId, n.lessonId)}>
                  <span>
                    <span className="bl-mod">{groupLabelFor(n.moduleId, n.lessonId)}</span>
                    <b>{findLessonTitle(n.moduleId, n.lessonId)}</b>
                    <span className="note-preview">{n.text.slice(0, 90)}{n.text.length > 90 ? '\u2026' : ''}</span>
                  </span>
                  <button
                    className="btn ghost sm"
                    aria-label="Delete note"
                    onClick={(e) => { e.stopPropagation(); setNote(n.moduleId, n.lessonId, ''); }}
                  >&#10005;</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

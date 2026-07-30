import { useNavigate } from 'react-router-dom';
import { MODULES, findLessonTitle, flatLessons } from '../core/registry.js';
import { useStore, listBookmarks, toggleBookmark } from '../store/useStore.js';
import { useModal } from './ModalContext.jsx';

function groupLabelFor(moduleId, lessonId) {
  const found = flatLessons(moduleId).find((l) => l.id === lessonId);
  return found ? found.group : '';
}

export default function BookmarksView() {
  useStore();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const marks = listBookmarks();

  if (!marks.length) {
    return (
      <div className="empty-state" style={{ marginTop: 16 }}>
        <h4>No bookmarks yet</h4>
        <p>Click the &#9733; star on any lesson to save it here for quick access.</p>
      </div>
    );
  }

  const byModule = {};
  marks.forEach((b) => {
    byModule[b.moduleId] = byModule[b.moduleId] || [];
    byModule[b.moduleId].push(b);
  });

  function open(moduleId, lessonId) {
    navigate(`/${moduleId}/${lessonId}`);
    closeModal();
  }

  return (
    <>
      <p className="lede">{marks.length} lesson{marks.length === 1 ? '' : 's'} saved for quick access.</p>
      {Object.keys(byModule).map((moduleId) => {
        const mod = MODULES.find((m) => m.id === moduleId);
        return (
          <div className="dash-section" key={moduleId}>
            <div className="dash-section-title">{mod ? mod.label : moduleId}</div>
            <div className="bookmark-list">
              {byModule[moduleId].map((b) => (
                <div key={b.lessonId} className="bl-item" onClick={() => open(b.moduleId, b.lessonId)}>
                  <span>
                    <span className="bl-mod">{groupLabelFor(b.moduleId, b.lessonId)}</span>
                    {findLessonTitle(b.moduleId, b.lessonId)}
                  </span>
                  <button
                    className="btn ghost sm"
                    aria-label="Remove bookmark"
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(b.moduleId, b.lessonId); }}
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

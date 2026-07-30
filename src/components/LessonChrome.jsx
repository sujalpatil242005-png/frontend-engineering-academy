import { useState, useRef } from 'react';
import {
  isLessonComplete, toggleLessonComplete, isBookmarked, toggleBookmark,
  getNote, setNote, useStore,
} from '../store/useStore.js';

export default function LessonChrome({ moduleLabel, groupLabel, title, moduleId, lessonId }) {
  useStore(); // re-render on any store commit (completion, bookmark, notes elsewhere)
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState(getNote(moduleId, lessonId));
  const [saveHint, setSaveHint] = useState('Saved automatically');
  const saveTimer = useRef(null);

  const done = isLessonComplete(moduleId, lessonId);
  const marked = isBookmarked(moduleId, lessonId);

  function handleNoteChange(e) {
    const value = e.target.value;
    setNoteText(value);
    setSaveHint('Saving\u2026');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setNote(moduleId, lessonId, value);
      setSaveHint('Saved automatically');
    }, 400);
  }

  return (
    <>
      <div className="topic-header">
        <div>
          <div className="crumb">{moduleLabel} / {groupLabel} / <b>{title}</b></div>
          <h2 style={{ marginTop: 6 }}>
            {title}
            <button
              className={`bookmark-btn${marked ? ' on' : ''}`}
              aria-label="Bookmark this lesson"
              onClick={() => toggleBookmark(moduleId, lessonId)}
            >&#9733;</button>
          </h2>
        </div>
        <div className="topic-header-actions">
          <button
            className={`btn${noteText ? ' primary' : ''}`}
            aria-expanded={notesOpen}
            onClick={() => setNotesOpen((v) => !v)}
          >
            <span>&#128221;</span> <span>{noteText ? 'Notes' : 'Add note'}</span>
          </button>
          <button
            className={`btn${done ? ' primary' : ''}`}
            onClick={() => toggleLessonComplete(moduleId, lessonId)}
          >
            <span dangerouslySetInnerHTML={{ __html: done ? '&#10003;' : '&#9675;' }} />
            <span>{done ? 'Completed' : 'Mark complete'}</span>
          </button>
        </div>
      </div>
      {notesOpen && (
        <div className="notes-panel">
          <label className="notes-panel-label" htmlFor={`notesArea-${moduleId}-${lessonId}`}>Your notes on this lesson</label>
          <textarea
            className="notes-textarea"
            id={`notesArea-${moduleId}-${lessonId}`}
            placeholder="Type anything you want to remember about this lesson&hellip;"
            value={noteText}
            onChange={handleNoteChange}
            autoFocus
          />
          <div className="notes-save-hint">{saveHint}</div>
        </div>
      )}
    </>
  );
}

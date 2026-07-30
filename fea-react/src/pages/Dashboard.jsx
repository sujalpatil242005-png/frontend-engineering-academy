import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODULES, flatLessons, allFlatLessons, firstIncompleteLesson, findLessonTitle } from '../core/registry.js';
import {
  useStore, isLessonComplete, completedCount, listBookmarks, resetProgress,
} from '../store/useStore.js';
import CourseFilters, { filterAndSortModules } from '../components/CourseFilters.jsx';

function formatDuration(totalLessons, minutesPerLesson) {
  const mins = totalLessons * (minutesPerLesson || 8);
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs === 0) return `${mins}m`;
  return rem ? `${hrs}h ${rem}m` : `${hrs}h`;
}

function ModuleCard({ mod }) {
  const navigate = useNavigate();
  useStore();
  const total = flatLessons(mod.id).length;

  function openModule() {
    const lesson = firstIncompleteLesson(mod.id, isLessonComplete);
    if (lesson) navigate(`/${mod.id}/${lesson.id}`);
  }

  const thumb = (
    <div className={`course-thumb course-thumb-${mod.id}`}>
      <span className="course-thumb-glyph">{mod.label.slice(0, 2).toUpperCase()}</span>
    </div>
  );

  if (mod.status === 'locked') {
    return (
      <div className="module-card locked" data-category={mod.category || ''} data-difficulty={mod.difficulty || ''}>
        {thumb}
        <div className="mc-body">
          <div className="mc-badges"><span className="badge def">{mod.difficulty || ''}</span></div>
          <h4>{mod.label}</h4>
          <p className="mc-desc">{mod.description || mod.tagline}</p>
          <div className="mc-footer"><span className="soon-tag">Coming soon</span></div>
        </div>
      </div>
    );
  }

  const done = completedCount(mod.id);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="module-card" onClick={openModule} data-category={mod.category || ''} data-difficulty={mod.difficulty || ''}>
      {thumb}
      <div className="mc-body">
        <div className="mc-badges"><span className="badge def">{mod.difficulty || ''}</span></div>
        <h4>{mod.label}</h4>
        <p className="mc-desc">{mod.description || mod.tagline}</p>
        <div className="mc-meta-row">
          <span>{total} lessons</span>
          <span>&middot;</span>
          <span>{formatDuration(total, mod.minutesPerLesson)}</span>
        </div>
        <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${pct}%` }} /></div>
        <div className="mc-stats">
          <span>{pct}% complete</span>
          <span>Remaining <b>{total - done}</b></span>
        </div>
        <div className="mc-footer">
          <button className="btn primary sm" onClick={(e) => { e.stopPropagation(); openModule(); }}>Continue Learning</button>
        </div>
      </div>
    </div>
  );
}

function ContinueLearning({ state }) {
  const navigate = useNavigate();
  const activeModules = MODULES.filter((m) => m.status === 'active');
  const target = state.lastOpened
    ? { moduleId: state.lastOpened.moduleId, lessonId: state.lastOpened.lessonId, title: state.lastOpened.title }
    : (() => {
        const mod = activeModules[0];
        if (!mod) return null;
        const lesson = firstIncompleteLesson(mod.id, isLessonComplete);
        return lesson ? { moduleId: mod.id, lessonId: lesson.id, title: lesson.label } : null;
      })();

  if (!target) {
    return <div className="empty-state"><h4>Nothing started yet</h4><p>Pick a learning path below to begin.</p></div>;
  }

  const modLabel = (MODULES.find((m) => m.id === target.moduleId) || {}).label || target.moduleId;

  return (
    <div className="continue-card" onClick={() => navigate(`/${target.moduleId}/${target.lessonId}`)}>
      <div className="cc-meta">
        <div className="cc-eyebrow">{modLabel}</div>
        <h3>{target.title}</h3>
        <p>Pick up right where you left off.</p>
      </div>
      <button className="btn primary">Resume lesson</button>
    </div>
  );
}

function OverallProgress({ onReset }) {
  const all = allFlatLessons();
  const done = all.filter((l) => isLessonComplete(l.moduleId, l.id)).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;
  const circumference = 2 * Math.PI * 26;

  return (
    <div className="stat-card">
      <div className="progress-ring">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle className="ring-track" cx="32" cy="32" r="26" />
          <circle
            className="ring-fill" cx="32" cy="32" r="26"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
          />
        </svg>
        <div className="ring-label">{pct}%</div>
      </div>
      <div>
        <div className="stat-value">{done}/{all.length}</div>
        <div className="stat-label">topics completed overall</div>
        {done > 0 && (
          <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={onReset}>Reset progress</button>
        )}
      </div>
    </div>
  );
}

function TodaysGoal() {
  const activeModules = MODULES.filter((m) => m.status === 'active');
  const picks = activeModules
    .map((m) => firstIncompleteLesson(m.id, isLessonComplete))
    .filter(Boolean)
    .slice(0, 2);

  if (!picks.length) {
    return <div className="empty-state"><p>You're all caught up. Nice work.</p></div>;
  }

  return (
    <div className="today-goal-card">
      {picks.map((lesson) => (
        <div className="goal-item" key={lesson.id}>
          <span className="chk" />
          <span>{lesson.label}</span>
        </div>
      ))}
    </div>
  );
}

function BookmarksWidget() {
  const navigate = useNavigate();
  const marks = listBookmarks();
  if (!marks.length) {
    return <div className="empty-state"><p>No bookmarks yet. Star a lesson to save it here.</p></div>;
  }
  return (
    <div className="bookmark-list">
      {marks.slice(0, 6).map((b) => {
        const mod = MODULES.find((m) => m.id === b.moduleId);
        return (
          <div key={`${b.moduleId}:${b.lessonId}`} className="bl-item" onClick={() => navigate(`/${b.moduleId}/${b.lessonId}`)}>
            <span><span className="bl-mod">{mod ? mod.label : b.moduleId}</span>{findLessonTitle(b.moduleId, b.lessonId)}</span>
            <span>&rarr;</span>
          </div>
        );
      })}
    </div>
  );
}

function RecentLessons({ state }) {
  const navigate = useNavigate();
  if (!state.history.length) {
    return <div className="empty-state"><p>Lessons you open will show up here.</p></div>;
  }
  return (
    <div className="recent-list">
      {state.history.slice(0, 5).map((h) => {
        const mod = MODULES.find((m) => m.id === h.moduleId);
        return (
          <div key={`${h.moduleId}:${h.lessonId}`} className="rl-item" onClick={() => navigate(`/${h.moduleId}/${h.lessonId}`)}>
            <span><span className="rl-mod">{mod ? mod.label : h.moduleId}</span>{h.title}</span>
            <span>&rarr;</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const state = useStore();
  const [filters, setFilters] = useState({ q: '', category: 'All', difficulty: 'All', sort: 'default' });
  const modules = filterAndSortModules(filters);

  function handleReset() {
    if (window.confirm('Reset all lesson progress? This does not affect bookmarks or notes.')) {
      resetProgress();
    }
  }

  return (
    <>
      <div className="dash-header">
        <div>
          <h1>Welcome back</h1>
          <p>Here's where you left off across Frontend Engineering Academy.</p>
        </div>
        <div className="streak-chip">{state.streak.count} day{state.streak.count === 1 ? '' : 's'} streak</div>
      </div>

      <div className="dash-section">
        <div className="dash-section-title">Continue learning</div>
        <ContinueLearning state={state} />
      </div>

      <div className="dash-section">
        <div className="dash-section-title">Learning paths</div>
        <CourseFilters onChange={setFilters} />
        <div className="grid-4">
          {modules.length === 0 ? (
            <div className="empty-state"><h4>No courses match</h4><p>Try a different search term or clear your filters.</p></div>
          ) : (
            modules.map((mod) => <ModuleCard key={mod.id} mod={mod} />)
          )}
        </div>
      </div>

      <div className="dash-section">
        <div className="grid-3">
          <div>
            <div className="dash-section-title">Overall progress</div>
            <OverallProgress onReset={handleReset} />
          </div>
          <div>
            <div className="dash-section-title">Today's goal</div>
            <TodaysGoal />
          </div>
          <div>
            <div className="dash-section-title">Bookmarks</div>
            <BookmarksWidget />
          </div>
        </div>
      </div>

      <div className="dash-section">
        <div className="dash-section-title">Recent lessons</div>
        <RecentLessons state={state} />
      </div>
    </>
  );
}

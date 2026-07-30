import { useLocation, useNavigate } from 'react-router-dom';
import { MODULES, flatLessons } from '../core/registry.js';
import {
  useStore, completedCount, completedCountInGroup, isLessonComplete,
  isGroupExpanded, setGroupExpanded,
} from '../store/useStore.js';
import { useModal } from './ModalContext.jsx';
import BookmarksView from './BookmarksView.jsx';
import NotesView from './NotesView.jsx';

const UTILITY_LINKS = [
  { id: 'playground', label: 'Playground' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'projects', label: 'Projects' },
  { id: 'interview-prep', label: 'Interview Prep' },
  { id: 'bookmarks', label: 'Bookmarks' },
  { id: 'notes', label: 'Notes' },
  { id: 'settings', label: 'Settings' },
];

const POPUP_VIEWS = {
  bookmarks: { title: 'Bookmarks', render: () => <BookmarksView /> },
  notes: { title: 'Notes', render: () => <NotesView /> },
};

function parseRoute(pathname) {
  const parts = pathname.replace(/^\/+/, '').split('/').filter(Boolean);
  if (!parts.length || parts[0] === 'dashboard') return { view: 'dashboard' };
  const KNOWN_MODULE_IDS = ['html', 'css', 'javascript', 'react'];
  if (parts.length >= 2 && KNOWN_MODULE_IDS.includes(parts[0])) {
    return { view: 'lesson', moduleId: parts[0], lessonId: parts[1] };
  }
  return { view: parts[0] };
}

function LessonRow({ mod, item, currentLessonId }) {
  const navigate = useNavigate();
  useStore(); // subscribe so completion ticks update live
  const done = isLessonComplete(mod.id, item.id);
  const isCurrent = item.id === currentLessonId;
  return (
    <a
      className={`nav-link lesson-link${isCurrent ? ' active' : ''}${done ? ' done' : ''}`}
      onClick={(e) => { e.preventDefault(); navigate(`/${mod.id}/${item.id}`); }}
      href={`/${mod.id}/${item.id}`}
    >
      <span className="lesson-icon" dangerouslySetInnerHTML={{ __html: done ? '&#10003;' : '○' }} />
      <span className="lesson-label">{item.label}</span>
    </a>
  );
}

function CourseTree({ mod, currentLessonId }) {
  return mod.curriculum.map((group) => {
    const containsCurrent = group.items.some((i) => i.id === currentLessonId);
    const expanded = isGroupExpanded(mod.id, group.group, containsCurrent);
    const groupDone = completedCountInGroup(mod.id, group.items.map((i) => i.id));
    return (
      <details
        key={group.group}
        className="sidebar-group"
        open={expanded}
        onToggle={(e) => setGroupExpanded(mod.id, group.group, e.currentTarget.open)}
      >
        <summary className="sidebar-group-summary">
          <span className="disclosure-arrow">&#9656;</span>
          <span className="sidebar-group-name">{group.group}</span>
          <span className="sidebar-group-count">{groupDone}/{group.items.length}</span>
        </summary>
        <div className="sidebar-group-body">
          {group.items.map((item) => (
            <LessonRow key={item.id} mod={mod} item={item} currentLessonId={currentLessonId} />
          ))}
        </div>
      </details>
    );
  });
}

function CourseSummaryRow({ mod, isActive }) {
  const navigate = useNavigate();
  useStore();
  const total = flatLessons(mod.id).length;
  const done = completedCount(mod.id);

  if (mod.status === 'locked') {
    return (
      <a className="nav-link" aria-disabled="true">
        <span>{mod.label}</span>
        <span className="lock">soon</span>
      </a>
    );
  }

  return (
    <a
      className={`nav-link${isActive ? ' active' : ''}`}
      onClick={() => {
        const lessons = flatLessons(mod.id);
        if (lessons[0]) navigate(`/${mod.id}/${lessons[0].id}`);
      }}
    >
      <span>{mod.label}</span>
      <span className="pct">{done}/{total}</span>
    </a>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const route = parseRoute(location.pathname);
  const onLessonPage = route.view === 'lesson';
  const onDashboard = route.view === 'dashboard';
  const activeModule = onLessonPage ? MODULES.find((m) => m.id === route.moduleId) : null;

  function handleUtilityClick(id) {
    if (POPUP_VIEWS[id]) {
      openModal(POPUP_VIEWS[id].title, POPUP_VIEWS[id].render());
      return;
    }
    navigate(`/${id}`);
  }

  return (
    <>
      {!onDashboard && (
        <button className="back-to-dashboard" onClick={() => navigate('/')}>
          <span>&#8592;</span> <span>Back to Dashboard</span>
        </button>
      )}

      <div className="nav-group">
        <div className="nav-group-title">{onLessonPage ? 'This course' : 'Learning paths'}</div>
        {onLessonPage && activeModule ? (
          activeModule.status === 'active' ? (
            <CourseWholeToggle mod={activeModule} currentLessonId={route.lessonId} />
          ) : (
            <CourseSummaryRow mod={activeModule} isActive />
          )
        ) : (
          MODULES.map((mod) => (
            <CourseSummaryRow key={mod.id} mod={mod} isActive={false} />
          ))
        )}
      </div>

      <div className="nav-group">
        <div className="nav-group-title">Practice</div>
        {UTILITY_LINKS.map((link) => (
          <a
            key={link.id}
            className={`nav-link${route.view === link.id ? ' active' : ''}`}
            onClick={() => handleUtilityClick(link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

function CourseWholeToggle({ mod, currentLessonId }) {
  const wholeCourseExpanded = isGroupExpanded(mod.id, '__course__', true);
  return (
    <details
      className="sidebar-group sidebar-course-toggle"
      open={wholeCourseExpanded}
      onToggle={(e) => setGroupExpanded(mod.id, '__course__', e.currentTarget.open)}
    >
      <summary className="sidebar-group-summary sidebar-course-summary">
        <span className="disclosure-arrow">&#9656;</span>
        <span className="sidebar-group-name">{mod.label}</span>
      </summary>
      <div className="sidebar-group-body">
        <CourseTree mod={mod} currentLessonId={currentLessonId} />
      </div>
    </details>
  );
}

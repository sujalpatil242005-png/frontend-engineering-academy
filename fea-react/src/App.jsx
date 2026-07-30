import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStore, isSidebarCollapsed, setSidebarCollapsed } from './store/useStore.js';
import { ModalProvider } from './components/ModalContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import TopBar from './components/TopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LessonPage from './pages/LessonPage.jsx';
import PracticePlayground from './pages/PracticePlayground.jsx';
import Challenges from './pages/Challenges.jsx';
import Projects from './pages/Projects.jsx';
import InterviewPrep from './pages/InterviewPrep.jsx';
import Settings from './pages/Settings.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AuthCallbackPage from './pages/AuthCallbackPage.jsx';

function isDesktop() {
  return window.innerWidth > 900;
}

function AppShell() {
  const location = useLocation();
  const state = useStore();
  const [sidebarVisible, setSidebarVisibleState] = useState(() => (isDesktop() ? !isSidebarCollapsed() : false));
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const isLessonRoute = /^\/[a-z]+\/[a-z0-9-]+$/.test(location.pathname) &&
    !['/playground', '/challenges', '/projects', '/interview-prep', '/settings'].includes(location.pathname);

  const setSidebarVisible = useCallback((visible) => {
    setSidebarVisibleState(visible);
    if (isDesktop()) setSidebarCollapsed(!visible);
  }, []);

  // Close the sidebar on mobile whenever the route changes.
  useEffect(() => {
    if (!isDesktop()) setSidebarVisible(false);
    window.scrollTo(0, 0);
    setReadingProgress(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    function onKeydown(e) {
      if (e.key === 'Escape' && sidebarVisible && !isDesktop()) setSidebarVisible(false);
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [sidebarVisible, setSidebarVisible]);

  useEffect(() => {
    if (!isLessonRoute) return;
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.round((doc.scrollTop / scrollable) * 100)) : 0;
      setReadingProgress(pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLessonRoute]);

  return (
    <>
      <TopBar onToggleMenu={() => setSidebarVisible(!sidebarVisible)} />
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />

      <div className={`shell${sidebarVisible ? ' sidebar-visible' : ''}`}>
        <nav className="sidebar">
          <Sidebar />
        </nav>
        <div className="sidebar-overlay" onClick={() => setSidebarVisible(false)} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/playground" element={<PracticePlayground />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:moduleId/:lessonId" element={<LessonPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <ModalProvider>
              <AppShell />
            </ModalProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

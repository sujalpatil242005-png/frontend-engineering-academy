import { useStore, setTheme } from '../store/useStore.js';
import { useAuth } from '../auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Search from './Search.jsx';

export default function TopBar({ onToggleMenu }) {
  const state = useStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="topbar">
      <button id="menuToggle" className="icon-btn" aria-label="Toggle menu" onClick={onToggleMenu}>
        <span className="hbar hbar-open">&#9776;</span>
      </button>
      <div className="brand"><span className="bracket">&lt;</span>Frontend Engineering Academy<span className="bracket">/&gt;</span></div>
      <Search />
      <div className="topbar-actions">
        {['dark', 'light', 'glass'].map((t) => (
          <button
            key={t}
            className={`icon-btn${state.theme === t ? ' active' : ''}`}
            onClick={() => setTheme(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
        {user && (
          <>
            <span style={{ color: 'var(--text-dim)', fontSize: 13, marginLeft: 4 }}>{user.name || user.email}</span>
            <button className="icon-btn" onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
    </header>
  );
}

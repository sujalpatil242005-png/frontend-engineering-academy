import { useRef } from 'react';
import { useStore, setTheme, resetProgress, getState } from '../store/useStore.js';

const STORAGE_KEY = 'fea_state_v1';

export default function Settings() {
  const state = useStore();
  const fileInputRef = useRef(null);

  function handleExport() {
    const blob = new Blob([JSON.stringify(getState(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fea-progress-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        window.location.reload();
      } catch {
        window.alert('That file doesn\u2019t look like a valid backup.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleResetAll() {
    if (window.confirm('Reset ALL data — progress, bookmarks, and notes? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  }

  function handleResetProgressOnly() {
    if (window.confirm('Reset all lesson progress? This does not affect bookmarks or notes.')) {
      resetProgress();
    }
  }

  return (
    <>
      <h2>Settings</h2>

      <div className="dash-section">
        <div className="dash-section-title">Appearance</div>
        <div className="tag-row">
          {['dark', 'light', 'glass'].map((t) => (
            <button
              key={t}
              className={`btn${state.theme === t ? ' primary' : ''}`}
              onClick={() => setTheme(t)}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-section">
        <div className="dash-section-title">Your data</div>
        <p className="lede">Everything (progress, bookmarks, notes) is stored only in this browser via localStorage — nothing is sent to a server.</p>
        <div className="tag-row">
          <button className="btn" onClick={handleExport}>Export backup (.json)</button>
          <button className="btn" onClick={() => fileInputRef.current?.click()}>Import backup</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            onChange={handleImportFile}
          />
        </div>
      </div>

      <div className="dash-section">
        <div className="dash-section-title">Reset</div>
        <div className="tag-row">
          <button className="btn ghost" onClick={handleResetProgressOnly}>Reset progress only</button>
          <button className="btn ghost" onClick={handleResetAll}>Reset everything</button>
        </div>
      </div>
    </>
  );
}

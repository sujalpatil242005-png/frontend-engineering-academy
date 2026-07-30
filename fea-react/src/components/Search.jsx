import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildSearchIndex, searchIndex } from '../core/search-index.js';

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [show, setShow] = useState(false);
  const wrapRef = useRef(null);
  const indexRef = useRef(buildSearchIndex());

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setShow(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function runSearch(value) {
    setQuery(value);
    const r = searchIndex(value, indexRef.current);
    setResults(r);
    setActiveIndex(-1);
    setShow(!!value.trim());
  }

  function openResult(i) {
    const r = results[i];
    if (!r) return;
    navigate(`/${r.moduleId}/${r.lessonId}`);
    setQuery('');
    setResults([]);
    setShow(false);
  }

  function onKeyDown(e) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      openResult(activeIndex >= 0 ? activeIndex : 0);
    } else if (e.key === 'Escape') {
      setShow(false);
    }
  }

  return (
    <div className="search-wrap" ref={wrapRef}>
      <span className="search-icon">&#128269;</span>
      <input
        id="globalSearch"
        type="text"
        placeholder="Search topics, examples, interview questions, projects&hellip;"
        autoComplete="off"
        value={query}
        onChange={(e) => runSearch(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div id="searchResults" className={show ? 'show' : ''}>
        {results.length === 0 && query.trim() && (
          <div className="no-results">No matches for "{query.trim()}"</div>
        )}
        {results.map((r, i) => (
          <div
            key={`${r.moduleId}:${r.lessonId}`}
            className={`res-item${i === activeIndex ? ' active' : ''}`}
            onClick={() => openResult(i)}
          >
            <div className="res-kind">{r.moduleLabel} &middot; {r.group}</div>
            <div className="res-title">{r.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

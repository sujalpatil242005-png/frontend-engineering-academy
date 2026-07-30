import { useNavigate } from 'react-router-dom';
import { flatLessons } from '../core/registry.js';

export default function FooterNav({ moduleId, lessonId }) {
  const navigate = useNavigate();
  const lessons = flatLessons(moduleId);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <div className="footer-nav">
      <button className="btn" disabled={!prev} onClick={() => prev && navigate(`/${moduleId}/${prev.id}`)}>
        {prev ? <>&larr; {prev.label}</> : <>&larr; Start of module</>}
      </button>
      <button className="btn" disabled={!next} onClick={() => next && navigate(`/${moduleId}/${next.id}`)}>
        {next ? <>{next.label} &rarr;</> : <>End of module &rarr;</>}
      </button>
    </div>
  );
}

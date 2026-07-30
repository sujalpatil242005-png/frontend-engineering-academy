import { useState, useEffect, useRef } from 'react';
import { HTML_CONTENT } from '../modules/html/content.js';
import { INTERVIEW_QUIZ } from '../modules/html/interview-quiz-data.js';
import { RENDERERS as CSS_RENDERERS } from '../modules/css/legacy-engine.js';
import { RENDERERS as JS_RENDERERS } from '../modules/javascript/renderers.js';
import { RENDERERS as REACT_RENDERERS } from '../modules/react/renderers.js';
import { renderQuiz } from '../components/quiz.js';

const TABS = [
  { id: 'html', label: 'HTML', getHTML: () => HTML_CONTENT.interview?.() },
  { id: 'css', label: 'CSS', getHTML: () => CSS_RENDERERS['interview-questions']?.() },
  { id: 'javascript', label: 'JavaScript', getHTML: () => JS_RENDERERS['interview-questions']?.() },
  { id: 'react', label: 'React', getHTML: () => REACT_RENDERERS['interview-questions']?.() },
];

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('html');
  const bodyRef = useRef(null);
  const tab = TABS.find((t) => t.id === activeTab);
  const html = tab.getHTML() || '<div class="empty-state"><p>No content yet for this course.</p></div>';

  useEffect(() => {
    if (activeTab === 'html' && bodyRef.current) {
      const mount = bodyRef.current.querySelector('[data-quiz-mount]');
      if (mount) renderQuiz(mount, INTERVIEW_QUIZ);
    }
  }, [activeTab]);

  return (
    <>
      <h2>Interview Prep</h2>
      <p className="lede">The questions that come up again and again, pulled from every course in one place.</p>
      <div className="tag-row" style={{ marginBottom: 16 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`btn${activeTab === t.id ? ' primary' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={activeTab} ref={bodyRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

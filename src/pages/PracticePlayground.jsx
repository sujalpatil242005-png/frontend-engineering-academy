import { useState, useEffect, useRef } from 'react';
import { renderUnifiedPlaygroundHTML, initUnifiedPlayground } from '../components/playground.js';
import { renderJsPlaygroundHTML, initJsPlayground } from '../modules/javascript/playground.js';
import { renderReactPlaygroundHTML, initReactPlayground } from '../modules/react/playground.js';

const MODES = [
  { id: 'html', label: 'HTML + CSS' },
  { id: 'js', label: 'JavaScript' },
  { id: 'react', label: 'React' },
];

export default function PracticePlayground() {
  const [mode, setMode] = useState('html');
  const bodyRef = useRef(null);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    if (mode === 'html') {
      initUnifiedPlayground(root);
    } else if (mode === 'js') {
      initJsPlayground(root);
    } else if (mode === 'react') {
      initReactPlayground(root);
    }
  }, [mode]);

  let markup = '';
  if (mode === 'html') {
    markup = renderUnifiedPlaygroundHTML({
      storageKey: 'fea_scratch_playground',
      defaultHtml: '<h1>Hello, world</h1>\n<p>Start typing to experiment.</p>',
      defaultCss: 'body{ font-family: sans-serif; padding: 24px; }',
    });
  } else if (mode === 'js') {
    markup = renderJsPlaygroundHTML();
  } else if (mode === 'react') {
    markup = renderReactPlaygroundHTML();
  }

  return (
    <>
      <h2>Playground</h2>
      <p className="lede">A scratch space for any HTML+CSS, JavaScript, or React experiment, separate from the lesson playgrounds. Autosaves as you type.</p>
      <div className="tag-row" style={{ marginBottom: 16 }}>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`btn${mode === m.id ? ' primary' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div key={mode} ref={bodyRef} dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}

/* ============================================================
   LessonPage.jsx — one route for every module's lessons
   (#/html/*, #/css/*, #/javascript/*, #/react/*), replacing the
   four renderXLesson() functions app.js used to dispatch between.
   Content bodies (HTML_CONTENT, legacy-engine RENDERERS, the JS/
   React RENDERERS) are unchanged HTML-string-returning functions
   from the vanilla build — mounted here via dangerouslySetInnerHTML
   and wired up in useEffect, exactly like the old POST_RENDER step.
   ============================================================ */

import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getModule, findLessonTitle } from '../core/registry.js';
import { recordOpened } from '../store/useStore.js';
import LessonChrome from '../components/LessonChrome.jsx';
import FooterNav from '../components/FooterNav.jsx';

import { HTML_CONTENT } from '../modules/html/content.js';
import { INTERVIEW_QUIZ } from '../modules/html/interview-quiz-data.js';
import { RENDERERS as CSS_RENDERERS, POST_RENDER as CSS_POST_RENDER } from '../modules/css/legacy-engine.js';
import { RENDERERS as JS_RENDERERS, POST_RENDER as JS_POST_RENDER } from '../modules/javascript/renderers.js';
import { RENDERERS as REACT_RENDERERS, POST_RENDER as REACT_POST_RENDER } from '../modules/react/renderers.js';

import { renderUnifiedPlaygroundHTML, initUnifiedPlayground, initPlaygrounds } from '../components/playground.js';
import { initQAToggles } from '../components/disclosure.js';
import { initCheatFilter, initTagrefFilter } from '../components/filter-list.js';
import { renderQuiz } from '../components/quiz.js';
import { renderJsPlaygroundHTML, initJsPlayground } from '../modules/javascript/playground.js';
import { renderReactPlaygroundHTML, initReactPlayground } from '../modules/react/playground.js';

const CSS_FREE_PLAYGROUND_HTML = `<div class="card">
  <h2>Hello, CSS!</h2>
  <p>Edit the HTML and CSS tabs, then check Preview.</p>
  <button>Click me</button>
</div>`;

const CSS_FREE_PLAYGROUND_CSS = `body{ font-family: sans-serif; padding: 24px; background:#0f1419; color:#dde3ea; }
.card{ max-width:420px; margin:0 auto; padding:24px; border-radius:12px; background:#161c24; border:1px solid #232b36; }
.card h2{ color:#4fd1c5; margin-top:0; }
.card button{
  margin-top:10px; padding:8px 16px; border-radius:8px; border:none;
  background:#4fd1c5; color:#0a0e13; font-weight:700; cursor:pointer;
}`;

function getContentHTML(moduleId, lessonId) {
  if (moduleId === 'html') {
    const fn = HTML_CONTENT[lessonId];
    return fn ? fn() : null;
  }
  if (moduleId === 'css') {
    const fn = CSS_RENDERERS[lessonId];
    return fn ? fn() : null;
  }
  if (moduleId === 'javascript') {
    const fn = JS_RENDERERS[lessonId];
    return fn ? fn() : null;
  }
  if (moduleId === 'react') {
    const fn = REACT_RENDERERS[lessonId];
    return fn ? fn() : null;
  }
  return null;
}

function wireContent(moduleId, lessonId, bodyEl) {
  if (moduleId === 'html') {
    initPlaygrounds(bodyEl);
    initQAToggles(bodyEl);
    if (lessonId === 'tagref') initTagrefFilter(bodyEl);
    if (lessonId === 'cheatsheet') initCheatFilter(bodyEl);
    if (lessonId === 'interview') {
      const mount = bodyEl.querySelector('[data-quiz-mount]');
      if (mount) renderQuiz(mount, INTERVIEW_QUIZ);
    }
    return;
  }
  if (moduleId === 'css') {
    const postRenderFn = CSS_POST_RENDER[lessonId];
    if (postRenderFn) postRenderFn();
    return;
  }
  if (moduleId === 'javascript') {
    const postRenderFn = JS_POST_RENDER[lessonId];
    if (postRenderFn) postRenderFn();
    return;
  }
  if (moduleId === 'react') {
    const postRenderFn = REACT_POST_RENDER[lessonId];
    if (postRenderFn) postRenderFn();
    return;
  }
}

function PlaygroundLesson({ moduleId }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    if (moduleId === 'css') initUnifiedPlayground(root);
    else if (moduleId === 'javascript') initJsPlayground(root);
    else if (moduleId === 'react') initReactPlayground(root);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  let intro = '';
  let markup = '';
  if (moduleId === 'css') {
    intro = 'A CodePen-style HTML + CSS editor with a live, sandboxed preview. Nothing here touches a server — it all runs in your browser, and your code is saved automatically.';
    markup = renderUnifiedPlaygroundHTML({
      storageKey: 'fea_css_free_playground',
      defaultHtml: CSS_FREE_PLAYGROUND_HTML,
      defaultCss: CSS_FREE_PLAYGROUND_CSS,
    });
  } else if (moduleId === 'javascript') {
    intro = 'A live JavaScript console — write code, hit Run, and see console.log() output. Runs in a sandboxed iframe; nothing touches a server, and your code is saved automatically.';
    markup = renderJsPlaygroundHTML();
  } else if (moduleId === 'react') {
    intro = 'A live JSX editor — write a component, hit Run, and see it rendered with real React. Runs entirely in your browser via Babel Standalone; nothing touches a server, and your code is saved automatically.';
    markup = renderReactPlaygroundHTML();
  }

  return (
    <div className="lesson-body" ref={bodyRef}>
      <p className="lede">{intro}</p>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
}

function ContentLesson({ moduleId, lessonId, html }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) wireContent(moduleId, lessonId, bodyRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, lessonId]);

  return <div className="lesson-body" ref={bodyRef} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const mod = getModule(moduleId);

  useEffect(() => {
    if (!mod) return;
    recordOpened(moduleId, lessonId, findLessonTitle(moduleId, lessonId));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, lessonId]);

  if (!mod) {
    return (
      <div className="empty-state" style={{ marginTop: 60 }}>
        <h4>Unknown course</h4>
        <p>Head back to the dashboard and pick a course from there.</p>
      </div>
    );
  }

  const title = findLessonTitle(moduleId, lessonId);
  const group = mod.curriculum.find((g) => g.items.some((i) => i.id === lessonId));
  const groupLabel = group ? group.group : '';

  const isPlaygroundLesson = lessonId === 'playground' && ['css', 'javascript', 'react'].includes(moduleId);
  const html = isPlaygroundLesson ? null : getContentHTML(moduleId, lessonId);

  if (!isPlaygroundLesson && html === null) {
    return (
      <div key={`${moduleId}:${lessonId}`}>
        <LessonChrome moduleLabel={mod.label} groupLabel={groupLabel} title={title} moduleId={moduleId} lessonId={lessonId} />
        <div className="lesson-body">
          <div className="empty-state"><p>Unknown lesson: {lessonId}</p></div>
        </div>
        <FooterNav moduleId={moduleId} lessonId={lessonId} />
      </div>
    );
  }

  return (
    <div key={`${moduleId}:${lessonId}`}>
      <LessonChrome moduleLabel={mod.label} groupLabel={groupLabel} title={title} moduleId={moduleId} lessonId={lessonId} />
      {isPlaygroundLesson ? (
        <PlaygroundLesson moduleId={moduleId} />
      ) : (
        <ContentLesson moduleId={moduleId} lessonId={lessonId} html={html} />
      )}
      <FooterNav moduleId={moduleId} lessonId={lessonId} />
    </div>
  );
}

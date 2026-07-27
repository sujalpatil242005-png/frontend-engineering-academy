/* ============================================================
   modules/react/renderers.js
   One RENDERERS[lessonId] function per lesson (returns an HTML
   string), same pattern as javascript/renderers.js. POST_RENDER[id]
   runs after the HTML is inserted, for quizzes & live JSX demos.
   Live demos use window.React / window.ReactDOM / Babel, loaded
   globally via CDN <script> tags in index.html — see renderLiveJsx()
   in index.js for how a demo string of JSX gets mounted.
   ============================================================ */

import { renderQuiz as renderQuizShared } from '../../components/quiz.js';

export const RENDERERS = {};
export const POST_RENDER = {};

function renderQuiz(containerId, questions) {
  const el = document.getElementById(containerId);
  if (el) renderQuizShared(el, questions);
}

/* ---------- INTRODUCTION ---------- */
RENDERERS.introduction = () => `
  <p class="lede">React is a JavaScript library for building user interfaces out of small, reusable pieces called <b style="color:var(--text)">components</b>. It's the most in-demand frontend skill in job postings today.</p>

  <h2>Why React exists</h2>
  <p>Before React, keeping the DOM in sync with changing data meant a lot of manual <code>document.querySelector</code> + mutation code. React flips that: you describe <b style="color:var(--text)">what the UI should look like</b> for a given state, and React figures out the minimal DOM changes needed.</p>

  <div class="tag-row">
    <span class="tag teal">Declarative UI</span>
    <span class="tag teal">Component-based</span>
    <span class="tag teal">Virtual DOM diffing</span>
    <span class="tag teal">One-way data flow</span>
  </div>

  <h2>A tiny component</h2>
  <div class="code-out">function Welcome() {
  return &lt;h1&gt;Hello, React!&lt;/h1&gt;;
}</div>
  <p>That looks like HTML inside JavaScript — it's <b style="color:var(--text)">JSX</b>, covered in the next lesson. Under the hood it compiles down to plain JS function calls.</p>

  <div class="callout tip"><b>This module runs entirely in-browser.</b> Every live demo and the Playground use Babel to transform JSX on the fly, so you can experiment without installing anything.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-introduction"></div>
`;
POST_RENDER.introduction = () => renderQuiz('quiz-introduction', [
  { q: 'React is best described as:', opts: ['A CSS framework', 'A database', 'A JS library for building UI out of components', 'A web server'], correct: 2 },
  { q: 'React\u2019s model is:', opts: ['You manually update the DOM', 'You describe what the UI should look like, React updates the DOM', 'It only works with static HTML', 'It replaces JavaScript entirely'], correct: 1 },
]);

/* ---------- JSX ---------- */
RENDERERS.jsx = () => `
  <p class="lede">JSX lets you write HTML-like markup directly inside JavaScript. It's not a string — it compiles into regular <code>React.createElement()</code> calls.</p>

  <h2>Basic syntax</h2>
  <div class="code-out">const element = &lt;h1&gt;Hello, world!&lt;/h1&gt;;

// compiles roughly to:
const element = React.createElement("h1", null, "Hello, world!");</div>

  <h2>Embedding JavaScript expressions</h2>
  <div class="code-out">const name = "Ana";
const el = &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
const el2 = &lt;p&gt;{2 + 2} apples&lt;/p&gt;;</div>
  <p>Anything inside <code>{ }</code> is evaluated as a plain JS expression.</p>

  <h2>JSX rules that trip people up</h2>
  <div class="tag-row">
    <span class="tag amber">class → className</span>
    <span class="tag amber">for → htmlFor</span>
    <span class="tag amber">Must return ONE root element</span>
    <span class="tag amber">Self-close empty tags: &lt;img /&gt;</span>
  </div>
  <div class="code-out">// ❌ two siblings at top level — error
return (&lt;h1&gt;Title&lt;/h1&gt;&lt;p&gt;Text&lt;/p&gt;);

// ✅ wrap in a fragment or a div
return (
  &lt;&gt;
    &lt;h1&gt;Title&lt;/h1&gt;
    &lt;p&gt;Text&lt;/p&gt;
  &lt;/&gt;
);</div>
  <p><code>&lt;&gt;...&lt;/&gt;</code> is a <b style="color:var(--text)">Fragment</b> — groups elements without adding an extra DOM node.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div id="jsx-demo-root"></div>
  </div>

  <div class="callout warn"><b>class</b> is a reserved JS word, which is why JSX uses <code>className</code> instead — a very common early mistake.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-jsx"></div>
`;
POST_RENDER.jsx = () => {
  window.__feaRenderLiveJsx && window.__feaRenderLiveJsx('jsx-demo-root', `
    function Demo() {
      const name = "React learner";
      return (
        <div>
          <h3 style={{ color: 'var(--accent)' }}>Hello, {name}!</h3>
          <p>2 + 2 = {2 + 2}</p>
        </div>
      );
    }
    render(<Demo />);
  `);
  renderQuiz('quiz-jsx', [
    { q: 'The HTML attribute "class" becomes what in JSX?', opts: ['class', 'className', 'cssClass', 'styleClass'], correct: 1 },
    { q: 'A component must return:', opts: ['Multiple root elements', 'One root element (or a Fragment)', 'Only text', 'Nothing'], correct: 1 },
  ]);
};

/* ---------- COMPONENTS ---------- */
RENDERERS.components = () => `
  <p class="lede">Components are reusable, self-contained pieces of UI — functions that return JSX. Modern React almost exclusively uses function components.</p>

  <h2>Defining and using a component</h2>
  <div class="code-out">function Greeting() {
  return &lt;p&gt;Hello there!&lt;/p&gt;;
}

function App() {
  return (
    &lt;div&gt;
      &lt;Greeting /&gt;
      &lt;Greeting /&gt;
    &lt;/div&gt;
  );
}</div>
  <p>Component names must start with a <b style="color:var(--text)">capital letter</b> — <code>&lt;greeting /&gt;</code> (lowercase) would be treated as an HTML tag, not your component.</p>

  <h2>Composing components</h2>
  <p>Real UIs are trees of components: a <code>Page</code> renders a <code>Header</code>, a <code>Sidebar</code>, and a list of <code>Card</code>s — each independently simple, together building something complex.</p>

  <div class="callout tip"><b>Rule of thumb:</b> if a piece of UI repeats, or a chunk of JSX is getting hard to read, pull it into its own component.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-components"></div>
`;
POST_RENDER.components = () => renderQuiz('quiz-components', [
  { q: 'Component names must:', opts: ['Be lowercase', 'Start with a capital letter', 'Contain no numbers', 'Match the file name exactly'], correct: 1 },
  { q: '<greeting /> (lowercase) in JSX is treated as:', opts: ['Your component', 'An HTML tag', 'A syntax error always', 'A comment'], correct: 1 },
]);

/* ---------- PROPS ---------- */
RENDERERS.props = () => `
  <p class="lede">Props ("properties") pass data from a parent component into a child — React's version of function arguments.</p>

  <h2>Passing and receiving props</h2>
  <div class="code-out">function Greeting({ name }) {
  return &lt;p&gt;Hello, {name}!&lt;/p&gt;;
}

function App() {
  return &lt;Greeting name="Ana" /&gt;;
}
// renders: Hello, Ana!</div>
  <p>Props arrive as a single object; destructuring them in the parameter list (<code>{'{'}name{'}'}</code>) is the standard style.</p>

  <h2>Props are read-only</h2>
  <div class="code-out">function Greeting({ name }) {
  name = "Someone else"; // ❌ don't mutate props
  return &lt;p&gt;Hello, {name}!&lt;/p&gt;;
}</div>
  <div class="callout warn">A component must never modify its own props. If a value needs to change over time, it belongs in <b style="color:var(--text)">state</b> (next lesson), not props.</div>

  <h2>children prop</h2>
  <div class="code-out">function Card({ children }) {
  return &lt;div className="card"&gt;{children}&lt;/div&gt;;
}

&lt;Card&gt;
  &lt;p&gt;Anything nested here becomes "children"&lt;/p&gt;
&lt;/Card&gt;</div>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div id="props-demo-root"></div>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-props"></div>
`;
POST_RENDER.props = () => {
  window.__feaRenderLiveJsx && window.__feaRenderLiveJsx('props-demo-root', `
    function UserCard({ name, role }) {
      return (
        <div className="card">
          <h4 style={{ margin: 0 }}>{name}</h4>
          <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>{role}</p>
        </div>
      );
    }
    function Demo() {
      return (
        <div>
          <UserCard name="Ana" role="Frontend Engineer" />
          <UserCard name="Beto" role="Backend Engineer" />
        </div>
      );
    }
    render(<Demo />);
  `);
  renderQuiz('quiz-props', [
    { q: 'Props are:', opts: ['Mutable by the child', 'Read-only from the child\u2019s perspective', 'Only strings', 'The same as state'], correct: 1 },
    { q: 'Content nested between a component\u2019s tags is available via:', opts: ['props.content', 'props.children', 'props.inner', 'It\u2019s not accessible'], correct: 1 },
  ]);
};

/* ---------- STATE ---------- */
RENDERERS.state = () => `
  <p class="lede">State is data that belongs to a component and can change over time — when it changes, React re-renders that component automatically.</p>

  <h2>State vs props</h2>
  <table style="width:100%; border-collapse:collapse; margin:16px 0;">
    <tr style="border-bottom:1px solid var(--panel-border);"><th style="text-align:left; padding:8px;"></th><th style="text-align:left; padding:8px;">Props</th><th style="text-align:left; padding:8px;">State</th></tr>
    <tr style="border-bottom:1px solid var(--panel-border);"><td style="padding:8px;">Owned by</td><td style="padding:8px;">Parent</td><td style="padding:8px;">The component itself</td></tr>
    <tr style="border-bottom:1px solid var(--panel-border);"><td style="padding:8px;">Can change?</td><td style="padding:8px;">No (read-only)</td><td style="padding:8px;">Yes, via a setter</td></tr>
    <tr><td style="padding:8px;">Triggers re-render?</td><td style="padding:8px;">When parent re-renders</td><td style="padding:8px;">Whenever it's updated</td></tr>
  </table>

  <h2>Declaring state with useState</h2>
  <div class="code-out">import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    &lt;button onClick={() => setCount(count + 1)}&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}</div>
  <p><code>useState(0)</code> returns a pair: the current value and a function to update it. Calling the setter schedules a re-render with the new value — full detail in the useState lesson.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div id="state-demo-root"></div>
  </div>

  <div class="callout warn"><b>Never mutate state directly</b> (e.g. <code>count++</code>) — always call the setter function. React relies on that call to know it needs to re-render.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-state"></div>
`;
POST_RENDER.state = () => {
  window.__feaRenderLiveJsx && window.__feaRenderLiveJsx('state-demo-root', `
    function Counter() {
      const [count, setCount] = React.useState(0);
      return (
        <button className="btn" onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </button>
      );
    }
    render(<Counter />);
  `);
  renderQuiz('quiz-state', [
    { q: 'Who owns a component\u2019s state?', opts: ['Its parent', 'The component itself', 'The DOM', 'The browser'], correct: 1 },
    { q: 'How should you update state?', opts: ['Mutate the variable directly', 'Always through the setter function useState gives you', 'Reload the page', 'You can\u2019t update state'], correct: 1 },
  ]);
};

/* ---------- EVENTS ---------- */
RENDERERS.events = () => `
  <p class="lede">React wraps native DOM events in its own system (SyntheticEvent) with consistent camelCase names.</p>

  <h2>Basic syntax</h2>
  <div class="code-out">function Button() {
  function handleClick() {
    alert("Clicked!");
  }
  return &lt;button onClick={handleClick}&gt;Click me&lt;/button&gt;;
}</div>
  <div class="callout warn"><b>Pass the function, don't call it:</b> <code>onClick={'{'}handleClick{'}'}</code> is correct. <code>onClick={'{'}handleClick(){'}'}</code> calls it immediately during render — a very common beginner bug.</div>

  <h2>Common event props</h2>
  <div class="tag-row">
    <span class="tag teal">onClick</span><span class="tag teal">onChange</span><span class="tag teal">onSubmit</span>
    <span class="tag teal">onMouseEnter</span><span class="tag teal">onKeyDown</span><span class="tag teal">onFocus / onBlur</span>
  </div>

  <h2>Passing arguments to a handler</h2>
  <div class="code-out">&lt;button onClick={() => handleDelete(item.id)}&gt;Delete&lt;/button&gt;</div>
  <p>Wrap it in an inline arrow function when the handler needs an argument the event itself doesn't provide.</p>

  <h2>The event object</h2>
  <div class="code-out">function Input() {
  function handleChange(e) {
    console.log(e.target.value);
  }
  return &lt;input onChange={handleChange} /&gt;;
}</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-events"></div>
`;
POST_RENDER.events = () => renderQuiz('quiz-events', [
  { q: 'onClick={handleClick()} (with parens) is a bug because:', opts: ['It\u2019s a typo, nothing happens', 'It calls handleClick immediately during render instead of on click', 'React doesn\u2019t support parens', 'It only works with arrow functions'], correct: 1 },
  { q: 'To pass an argument to a click handler, you typically:', opts: ['You can\u2019t', 'Wrap the call in an inline arrow function: onClick={() => fn(arg)}', 'Use a global variable', 'Use onClickWithArgs'], correct: 1 },
]);

/* ---------- useState ---------- */
RENDERERS['use-state'] = () => `
  <p class="lede">useState is the hook that gives a function component its own local, persistent state.</p>

  <h2>Anatomy</h2>
  <div class="code-out">const [value, setValue] = useState(initialValue);</div>
  <div class="tag-row">
    <span class="tag teal">value — current state</span>
    <span class="tag teal">setValue — updater function</span>
    <span class="tag teal">initialValue — used only on first render</span>
  </div>

  <h2>Functional updates</h2>
  <div class="code-out">// ❌ can read stale "count" if called multiple times quickly
setCount(count + 1);

// ✅ always operates on the latest value
setCount(prev => prev + 1);</div>
  <p>Using the function form is safer whenever the new value depends on the previous one — especially inside loops, timers, or rapid handlers.</p>

  <h2>Multiple state variables</h2>
  <div class="code-out">function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  // each useState call is independent
}</div>
  <div class="callout tip">Prefer several simple <code>useState</code> calls over one giant state object, unless the values are always updated together.</div>

  <h2>State updates don't merge (unlike class components)</h2>
  <div class="code-out">const [user, setUser] = useState({ name: "Ana", age: 28 });
setUser({ age: 29 }); // ❌ this REPLACES the whole object — name is now gone!
setUser(prev => ({ ...prev, age: 29 })); // ✅ spread to preserve other keys</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-use-state"></div>
`;
POST_RENDER['use-state'] = () => renderQuiz('quiz-use-state', [
  { q: 'setUser({ age: 29 }) on an object state:', opts: ['Merges age into the existing object', 'Replaces the entire state object', 'Throws an error', 'Does nothing'], correct: 1 },
  { q: 'Why use setCount(prev => prev + 1) instead of setCount(count + 1)?', opts: ['It\u2019s shorter', 'It always operates on the latest value, avoiding stale reads', 'They\u2019re identical', 'It\u2019s required syntax'], correct: 1 },
]);

/* ---------- useEffect ---------- */
RENDERERS['use-effect'] = () => `
  <p class="lede">useEffect lets a component run code in response to rendering — fetching data, subscribing to something, or syncing with anything outside React.</p>

  <h2>Basic syntax</h2>
  <div class="code-out">import { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // re-runs only when count changes

  return &lt;button onClick={() => setCount(count + 1)}&gt;{count}&lt;/button&gt;;
}</div>

  <h2>The dependency array controls when it runs</h2>
  <table style="width:100%; border-collapse:collapse; margin:16px 0;">
    <tr style="border-bottom:1px solid var(--panel-border);"><th style="text-align:left; padding:8px;">Dependency array</th><th style="text-align:left; padding:8px;">Runs</th></tr>
    <tr style="border-bottom:1px solid var(--panel-border);"><td style="padding:8px;">Omitted</td><td style="padding:8px;">After every render</td></tr>
    <tr style="border-bottom:1px solid var(--panel-border);"><td style="padding:8px;"><code>[]</code></td><td style="padding:8px;">Once, after the first render only</td></tr>
    <tr><td style="padding:8px;"><code>[count]</code></td><td style="padding:8px;">After renders where count changed</td></tr>
  </table>

  <h2>Cleanup function</h2>
  <div class="code-out">useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // runs before the next effect, and on unmount
}, []);</div>
  <div class="callout warn">Forgetting cleanup for subscriptions/timers/listeners is one of the most common React bugs — it causes memory leaks and "why is this firing twice" mysteries.</div>

  <h2>Data fetching example</h2>
  <div class="code-out">useEffect(() => {
  let cancelled = false;
  fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(data => { if (!cancelled) setUser(data); });
  return () => { cancelled = true; };
}, [id]);</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-use-effect"></div>
`;
POST_RENDER['use-effect'] = () => renderQuiz('quiz-use-effect', [
  { q: 'useEffect(fn, []) runs:', opts: ['On every render', 'Once, after the first render', 'Never', 'Only on unmount'], correct: 1 },
  { q: 'What does the function returned from an effect do?', opts: ['Nothing, it\u2019s ignored', 'Acts as cleanup, run before the next effect or on unmount', 'Replaces the effect', 'Runs before the effect'], correct: 1 },
]);

/* ---------- useRef ---------- */
RENDERERS['use-ref'] = () => `
  <p class="lede">useRef gives you a mutable value that persists across renders WITHOUT triggering a re-render when it changes — most often used to reach directly into the DOM.</p>

  <h2>Accessing a DOM node</h2>
  <div class="code-out">function TextInput() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    &lt;&gt;
      &lt;input ref={inputRef} /&gt;
      &lt;button onClick={focusInput}&gt;Focus the input&lt;/button&gt;
    &lt;/&gt;
  );
}</div>
  <p>React sets <code>ref.current</code> to the actual DOM element once it's mounted.</p>

  <h2>ref vs state</h2>
  <div class="callout"><b>Use state</b> when a value's change should be reflected in the UI. <b>Use a ref</b> for values you need to keep track of but that shouldn't cause (or need) a re-render — like a timer ID, a previous value, or a DOM node reference.</div>

  <h2>Storing a mutable value across renders</h2>
  <div class="code-out">function Timer() {
  const renderCount = useRef(0);
  renderCount.current++; // mutating a ref does NOT trigger a re-render
  return &lt;p&gt;Rendered {renderCount.current} times&lt;/p&gt;;
}</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-use-ref"></div>
`;
POST_RENDER['use-ref'] = () => renderQuiz('quiz-use-ref', [
  { q: 'Changing a ref\u2019s .current value:', opts: ['Triggers a re-render like state', 'Does NOT trigger a re-render', 'Throws an error', 'Only works in class components'], correct: 1 },
  { q: 'A common use case for useRef is:', opts: ['Storing data that must appear in the UI immediately', 'Directly accessing a DOM node (e.g. to call .focus())', 'Replacing useState entirely', 'Fetching data'], correct: 1 },
]);

/* ---------- CUSTOM HOOKS ---------- */
RENDERERS['custom-hooks'] = () => `
  <p class="lede">A custom hook is just a JavaScript function whose name starts with "use" that calls other hooks inside it — the standard way to reuse stateful logic between components.</p>

  <h2>Extracting repeated logic</h2>
  <div class="code-out">function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() { setWidth(window.innerWidth); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function App() {
  const width = useWindowWidth(); // any component can reuse this
  return &lt;p&gt;Window is {width}px wide&lt;/p&gt;;
}</div>
  <p>Without this, the resize-listening logic would have to be copy-pasted (or duplicated with useEffect) into every component that needs it.</p>

  <h2>Rules of hooks (apply to custom hooks too)</h2>
  <div class="tag-row">
    <span class="tag amber">Only call hooks at the top level</span>
    <span class="tag amber">Never inside loops, conditions, or nested functions</span>
    <span class="tag amber">Only call hooks from React functions or other hooks</span>
  </div>
  <div class="callout warn">These rules exist because React tracks hooks by <b style="color:var(--text)">call order</b> between renders — a hook inside an <code>if</code> can shift that order and silently corrupt state.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-custom-hooks"></div>
`;
POST_RENDER['custom-hooks'] = () => renderQuiz('quiz-custom-hooks', [
  { q: 'A custom hook is:', opts: ['A React component', 'A function starting with "use" that can call other hooks', 'A CSS class', 'A built-in browser API'], correct: 1 },
  { q: 'Why can\u2019t hooks be called inside an if statement?', opts: ['Syntax error', 'React relies on consistent call order between renders to track hook state', 'Hooks are async', 'They can, this is a myth'], correct: 1 },
]);

/* ---------- LISTS & KEYS (LAB) ---------- */
RENDERERS['lists-keys'] = () => `
  <p class="lede">Rendering arrays of data as UI is one of the most common React tasks — and it comes with one rule that's easy to get wrong: keys.</p>

  <h2>Rendering a list with map</h2>
  <div class="code-out">const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    &lt;ul&gt;
      {fruits.map(fruit => &lt;li key={fruit}&gt;{fruit}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</div>

  <h2>Why keys matter</h2>
  <p>Keys tell React <b style="color:var(--text)">which item is which</b> across re-renders, so it can correctly reuse, reorder, or remove DOM nodes instead of rebuilding the whole list. Without a stable key, React falls back to matching by position — which breaks badly when items are inserted, removed, or reordered.</p>
  <div class="callout warn"><b>Don't use array index as a key</b> if the list can be reordered, filtered, or have items inserted/removed — use a stable, unique id from your data instead.</div>

  <h2>Try it live — add/remove/shuffle</h2>
  <div class="viz-panel">
    <div id="lists-demo-root"></div>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-lists-keys"></div>
`;
POST_RENDER['lists-keys'] = () => {
  window.__feaRenderLiveJsx && window.__feaRenderLiveJsx('lists-demo-root', `
    function Demo() {
      const [items, setItems] = React.useState([
        { id: 1, text: 'Learn JSX' },
        { id: 2, text: 'Learn Hooks' },
        { id: 3, text: 'Build a project' },
      ]);
      function addItem() {
        const id = Date.now();
        setItems(prev => [...prev, { id, text: 'New item ' + id.toString().slice(-4) }]);
      }
      function removeItem(id) {
        setItems(prev => prev.filter(i => i.id !== id));
      }
      function shuffle() {
        setItems(prev => [...prev].sort(() => Math.random() - 0.5));
      }
      return (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id} style={{ marginBottom: 6 }}>
                {item.text}{' '}
                <button className="btn" onClick={() => removeItem(item.id)}>remove</button>
              </li>
            ))}
          </ul>
          <button className="btn" onClick={addItem}>Add item</button>{' '}
          <button className="btn" onClick={shuffle}>Shuffle</button>
        </div>
      );
    }
    render(<Demo />);
  `);
  renderQuiz('quiz-lists-keys', [
    { q: 'Why does React need a key for each list item?', opts: ['Purely cosmetic', 'To track which item is which across re-renders for correct updates', 'Keys are optional and never matter', 'To sort the list automatically'], correct: 1 },
    { q: 'Using array index as key is risky when:', opts: ['The list never changes', 'The list can be reordered, filtered, or spliced', 'The list has fewer than 10 items', 'It\u2019s never risky'], correct: 1 },
  ]);
};

/* ---------- CONDITIONAL RENDERING ---------- */
RENDERERS['conditional-rendering'] = () => `
  <p class="lede">Since JSX is just JavaScript, you use ordinary JS logic to decide what to render — no special template syntax needed.</p>

  <h2>if / else (outside JSX)</h2>
  <div class="code-out">function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return &lt;p&gt;Welcome back!&lt;/p&gt;;
  }
  return &lt;p&gt;Please sign in.&lt;/p&gt;;
}</div>

  <h2>Ternary (inline, one condition)</h2>
  <div class="code-out">&lt;p&gt;{isLoggedIn ? "Welcome back!" : "Please sign in."}&lt;/p&gt;</div>

  <h2>&& for "render this or nothing"</h2>
  <div class="code-out">&lt;div&gt;
  {unreadCount &gt; 0 && &lt;span className="badge"&gt;{unreadCount}&lt;/span&gt;}
&lt;/div&gt;</div>
  <div class="callout warn"><b>Watch out for 0:</b> <code>{'{'}count && &lt;Badge /&gt;{'}'}</code> renders the literal number <code>0</code> to the page when count is 0, since <code>0 && ...</code> evaluates to <code>0</code>. Use <code>count &gt; 0 && ...</code> or a ternary instead.</div>

  <h2>Rendering nothing</h2>
  <div class="code-out">function Modal({ isOpen }) {
  if (!isOpen) return null; // renders nothing at all
  return &lt;div className="modal"&gt;...&lt;/div&gt;;
}</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-conditional-rendering"></div>
`;
POST_RENDER['conditional-rendering'] = () => renderQuiz('quiz-conditional-rendering', [
  { q: '{count && <Badge/>} when count is 0 renders:', opts: ['Nothing', 'The literal 0 on the page', '<Badge/>', 'An error'], correct: 1 },
  { q: 'Returning null from a component:', opts: ['Throws an error', 'Renders nothing', 'Renders "null" as text', 'Crashes React'], correct: 1 },
]);

/* ---------- FORMS (LAB) ---------- */
RENDERERS.forms = () => `
  <p class="lede">React forms are typically "controlled" — the input's value lives in state, and React drives what's displayed, instead of the DOM managing it independently.</p>

  <h2>A controlled input</h2>
  <div class="code-out">function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Submitted: " + name);
  }

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input value={name} onChange={e => setName(e.target.value)} /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</div>
  <p>Because <code>value</code> is set from state, the input can never drift out of sync with your component's data — every keystroke updates state, which re-renders the input with the new value.</p>

  <div class="callout warn">Don't forget <code>e.preventDefault()</code> in <code>onSubmit</code> — otherwise the browser does its native full-page-reload form submission.</div>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div id="forms-demo-root"></div>
  </div>

  <h2>Multiple fields</h2>
  <div class="code-out">const [form, setForm] = useState({ name: "", email: "" });

function handleChange(e) {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
}
// &lt;input name="name" value={form.name} onChange={handleChange} /&gt;
// &lt;input name="email" value={form.email} onChange={handleChange} /&gt;</div>
  <p>Using the input's <code>name</code> attribute as a computed key lets one handler manage every field in the form.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-forms"></div>
`;
POST_RENDER.forms = () => {
  window.__feaRenderLiveJsx && window.__feaRenderLiveJsx('forms-demo-root', `
    function Demo() {
      const [name, setName] = React.useState('');
      const [submitted, setSubmitted] = React.useState(null);
      function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(name);
      }
      return (
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Type your name"
            style={{ padding: '8px 10px', marginRight: 8 }}
          />
          <button className="btn primary" type="submit">Submit</button>
          {submitted && <p style={{ marginTop: 10 }}>Submitted: <b>{submitted}</b></p>}
        </form>
      );
    }
    render(<Demo />);
  `);
  renderQuiz('quiz-forms', [
    { q: 'In a controlled input, the source of truth for its value is:', opts: ['The DOM', 'React state', 'A cookie', 'The URL'], correct: 1 },
    { q: 'Why call e.preventDefault() in a submit handler?', opts: ['It\u2019s optional styling', 'Stops the browser\u2019s default page reload/navigation on submit', 'It clears the form', 'It validates input'], correct: 1 },
  ]);
};

/* ---------- LIFTING STATE UP ---------- */
RENDERERS['lifting-state-up'] = () => `
  <p class="lede">When two components need to share and stay in sync with the same data, move that state up to their closest common parent — this is "lifting state up."</p>

  <h2>The problem</h2>
  <div class="code-out">// ❌ each has its own state — they can't see each other's value
function TemperatureInputC() { const [c, setC] = useState(0); ... }
function TemperatureInputF() { const [f, setF] = useState(32); ... }</div>

  <h2>The fix — one source of truth in the parent</h2>
  <div class="code-out">function Converter() {
  const [celsius, setCelsius] = useState(0);

  return (
    &lt;&gt;
      &lt;TemperatureInputC value={celsius} onChange={setCelsius} /&gt;
      &lt;TemperatureInputF value={celsius * 9/5 + 32} onChange={f => setCelsius((f - 32) * 5/9)} /&gt;
    &lt;/&gt;
  );
}</div>
  <p>Now there's exactly one piece of truth (<code>celsius</code>), and both inputs derive from or update it — they can never disagree with each other.</p>

  <div class="callout tip"><b>General rule:</b> state should live in the lowest common ancestor of every component that needs to read or change it. Too high, and unrelated components re-render unnecessarily; too low, and siblings can't share it.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-lifting-state-up"></div>
`;
POST_RENDER['lifting-state-up'] = () => renderQuiz('quiz-lifting-state-up', [
  { q: '"Lifting state up" means:', opts: ['Deleting unused state', 'Moving shared state to the closest common parent component', 'Using useRef instead of useState', 'Passing state to a global variable'], correct: 1 },
  { q: 'Where should state generally live?', opts: ['As high as possible always', 'In the lowest common ancestor of components that need it', 'In every component that touches it', 'It doesn\u2019t matter'], correct: 1 },
]);

/* ---------- COMPOSITION ---------- */
RENDERERS.composition = () => `
  <p class="lede">React favors composition over inheritance — building complex components by combining simpler ones, often via the special "children" prop.</p>

  <h2>The children pattern</h2>
  <div class="code-out">function Panel({ title, children }) {
  return (
    &lt;div className="card"&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      {children}
    &lt;/div&gt;
  );
}

&lt;Panel title="Settings"&gt;
  &lt;p&gt;Any JSX goes here — Panel doesn't need to know what.&lt;/p&gt;
&lt;/Panel&gt;</div>
  <p><code>Panel</code> handles the "wrapper" concerns (styling, title) while staying completely agnostic about what it wraps.</p>

  <h2>Passing components as props (slots)</h2>
  <div class="code-out">function Layout({ sidebar, main }) {
  return (
    &lt;div className="layout"&gt;
      &lt;aside&gt;{sidebar}&lt;/aside&gt;
      &lt;main&gt;{main}&lt;/main&gt;
    &lt;/div&gt;
  );
}

&lt;Layout sidebar={&lt;Nav /&gt;} main={&lt;Dashboard /&gt;} /&gt;</div>

  <div class="callout">React has no built-in class-style inheritance between components — composition (nesting, children, prop slots) covers essentially every case class inheritance would handle in other UI frameworks.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-composition"></div>
`;
POST_RENDER.composition = () => renderQuiz('quiz-composition', [
  { q: 'React encourages building complex UIs primarily through:', opts: ['Class inheritance', 'Composition (combining simpler components)', 'Global variables', 'CSS only'], correct: 1 },
  { q: 'The children prop contains:', opts: ['A component\u2019s internal state', 'Whatever JSX was nested between a component\u2019s opening and closing tags', 'A list of prop names', 'CSS classes'], correct: 1 },
]);

/* ---------- CONTEXT ---------- */
RENDERERS.context = () => `
  <p class="lede">Context lets you share a value across a whole tree of components without manually passing props down through every level ("prop drilling").</p>

  <h2>The problem it solves</h2>
  <div class="code-out">// ❌ prop drilling — theme passes through components that don't even use it
&lt;App theme={theme}&gt;
  &lt;Layout theme={theme}&gt;
    &lt;Sidebar theme={theme}&gt;
      &lt;Button theme={theme} /&gt;</div>

  <h2>Creating and using context</h2>
  <div class="code-out">const ThemeContext = createContext("light");

function App() {
  return (
    &lt;ThemeContext.Provider value="dark"&gt;
      &lt;Toolbar /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}

function Button() {
  const theme = useContext(ThemeContext); // reads it directly, no props needed
  return &lt;button className={theme}&gt;Click&lt;/button&gt;;
}</div>
  <p>Any component inside the <code>Provider</code>, no matter how deeply nested, can call <code>useContext(ThemeContext)</code> and read the current value directly.</p>

  <div class="callout warn"><b>Don't overuse context</b> for state that changes frequently or is only needed by one or two nearby components — it re-renders every consumer on change, and for local sharing, prop passing or lifting state up is simpler to trace.</div>

  <h2>Common real-world uses</h2>
  <div class="tag-row">
    <span class="tag teal">Theme (light/dark)</span>
    <span class="tag teal">Current logged-in user</span>
    <span class="tag teal">Locale / language</span>
    <span class="tag teal">Global app settings</span>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-context"></div>
`;
POST_RENDER.context = () => renderQuiz('quiz-context', [
  { q: 'Context is mainly used to avoid:', opts: ['Writing CSS', 'Prop drilling through many intermediate components', 'Using useState', 'Writing components'], correct: 1 },
  { q: 'A component reads context via:', opts: ['props.context', 'useContext(SomeContext)', 'this.context only', 'window.context'], correct: 1 },
]);

/* ---------- INTERVIEW QUESTIONS ---------- */
RENDERERS['interview-questions'] = () => `
  <p class="lede">The React questions that come up again and again in frontend interviews.</p>

  <div class="card"><h3>What's the Virtual DOM and why does it matter?</h3><p>React keeps an in-memory representation of the UI (the virtual DOM). On a state change, it computes a new virtual DOM tree, diffs it against the previous one, and applies only the minimal real DOM updates needed — avoiding expensive full re-renders.</p></div>

  <div class="card"><h3>Difference between state and props?</h3><p>Props are passed in from a parent and are read-only to the child. State is owned and managed internally by a component and can change over its lifetime.</p></div>

  <div class="card"><h3>Why are keys important in lists?</h3><p>They give React a stable identity for each item across renders, so it can correctly reuse/reorder/remove DOM nodes instead of guessing by position — critical for correctness when lists change.</p></div>

  <div class="card"><h3>What does the useEffect dependency array control?</h3><p>Whether the effect re-runs: omitted runs after every render, <code>[]</code> runs once after mount, and <code>[dep]</code> re-runs whenever any listed dependency changes between renders.</p></div>

  <div class="card"><h3>What are controlled vs uncontrolled components?</h3><p>Controlled: the form element's value is driven by React state (<code>value</code> + <code>onChange</code>). Uncontrolled: the DOM manages its own value internally, and you read it on demand (e.g. via a ref) rather than on every keystroke.</p></div>

  <div class="card"><h3>What problem does Context solve?</h3><p>It avoids "prop drilling" — passing a value down through many intermediate components that don't need it themselves, just to reach a deeply nested consumer.</p></div>

  <div class="card"><h3>What are the rules of hooks?</h3><p>Only call hooks at the top level of a function component or custom hook (never in loops/conditions/nested functions), and only call them from React functions — this preserves consistent call order between renders.</p></div>

  <div class="card"><h3>Why shouldn't you mutate state directly?</h3><p>React detects changes by comparing references; mutating in place doesn't create a new reference, so React may not notice and won't re-render. Always use the setter with a new value or object.</p></div>

  <div class="card"><h3>What's "lifting state up"?</h3><p>Moving shared state to the closest common ancestor of the components that need it, so they stay in sync through one source of truth instead of drifting out of sync with separate local state.</p></div>

  <div class="card"><h3>useRef vs useState — when do you use each?</h3><p>useState for any value whose change should be reflected in the rendered UI. useRef for values you need to persist across renders without causing a re-render — like a DOM node reference, a timer ID, or a previous value.</p></div>
`;

/* ---------- CHEATSHEET ---------- */
RENDERERS.cheatsheet = () => `
  <p class="lede">A fast reference for syntax you'll use daily.</p>

  <h2>Component & JSX</h2>
  <div class="code-out">function Greeting({ name }) { return &lt;p&gt;Hi, {name}&lt;/p&gt;; }
&lt;&gt;...&lt;/&gt;  // Fragment
className="x"  // not "class"</div>

  <h2>State</h2>
  <div class="code-out">const [value, setValue] = useState(initial);
setValue(prev => prev + 1); // functional update
setObj(prev => ({ ...prev, key: val })); // preserve other keys</div>

  <h2>Effects</h2>
  <div class="code-out">useEffect(() => { ... }, []);          // once, on mount
useEffect(() => { ... }, [dep]);       // when dep changes
useEffect(() => { return () => cleanup(); }, []); // cleanup on unmount</div>

  <h2>Refs</h2>
  <div class="code-out">const ref = useRef(null);
&lt;input ref={ref} /&gt;
ref.current.focus();</div>

  <h2>Lists</h2>
  <div class="code-out">{items.map(item => &lt;li key={item.id}&gt;{item.text}&lt;/li&gt;)}</div>

  <h2>Conditionals</h2>
  <div class="code-out">{isOpen ? &lt;Modal /&gt; : null}
{count &gt; 0 && &lt;Badge count={count} /&gt;}</div>

  <h2>Forms</h2>
  <div class="code-out">&lt;input value={name} onChange={e =&gt; setName(e.target.value)} /&gt;
&lt;form onSubmit={e =&gt; { e.preventDefault(); ... }}&gt;</div>

  <h2>Context</h2>
  <div class="code-out">const Ctx = createContext(defaultVal);
&lt;Ctx.Provider value={val}&gt;...&lt;/Ctx.Provider&gt;
const val = useContext(Ctx);</div>
`;

/* ---------- FREE PLAYGROUND ---------- */
RENDERERS.playground = () => '';
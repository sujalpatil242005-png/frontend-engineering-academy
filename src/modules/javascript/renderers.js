/* ============================================================
   modules/javascript/renderers.js
   One RENDERERS[lessonId] function per lesson (returns an HTML
   string), same pattern as css/legacy-engine.js. POST_RENDER[id]
   runs after the HTML is inserted, for quizzes & live demos.
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
  <p class="lede">JavaScript is the programming language of the web. It's what makes pages interactive — validating a form, animating a menu, fetching data without reloading, or powering an entire app like this one.</p>

  <h2>Where JavaScript runs</h2>
  <p>Originally built to run only inside browsers, JavaScript now runs almost everywhere:</p>
  <div class="tag-row">
    <span class="tag teal">Browsers</span>
    <span class="tag">Node.js (servers)</span>
    <span class="tag">Mobile apps (React Native)</span>
    <span class="tag">Desktop apps (Electron)</span>
  </div>

  <h2>Your first script</h2>
  <div class="code-out">console.log("Hello, JavaScript!");</div>
  <p><code>console.log()</code> prints to the browser's DevTools console (F12 or Cmd+Opt+J) — it's the tool you'll use constantly to inspect what your code is doing.</p>

  <div class="callout tip"><b>Try it:</b> open your browser's console right now and type <code>2 + 2</code>, then hit Enter. That console is a live JavaScript environment.</div>

  <h2>What you'll learn in this module</h2>
  <p>We'll go from the absolute basics (variables, types) through control flow and functions, into the object/array patterns you use daily, modern ES6+ syntax, asynchronous code (promises, async/await), and finally the DOM — how JS actually touches the page.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-introduction"></div>
`;
POST_RENDER.introduction = () => renderQuiz('quiz-introduction', [
  { q: 'Where can JavaScript run today?', opts: ['Only in browsers', 'Only on servers', 'Browsers, servers, mobile, and desktop apps', 'Only in Chrome'], correct: 2 },
  { q: 'What does console.log() do?', opts: ['Deletes a variable', 'Prints output to the DevTools console', 'Sends data to a server', 'Creates a new HTML element'], correct: 1 },
]);

/* ---------- HOW JS WORKS ---------- */
RENDERERS['how-js-works'] = () => `
  <p class="lede">JavaScript is <b style="color:var(--text)">single-threaded</b> — it can only do one thing at a time — yet it handles things like network requests without freezing the page. Here's the mental model.</p>

  <h2>The engine</h2>
  <p>Browsers run JS through an engine (Chrome/Node use <b style="color:var(--text)">V8</b>). The engine parses your code, compiles it, and executes it line by line inside something called the <b style="color:var(--text)">call stack</b>.</p>

  <div class="viz-panel">
    <div class="tag-row">
      <span class="tag teal">Call Stack</span>
      <span class="tag">→ runs synchronous code, one frame at a time</span>
    </div>
    <div class="tag-row">
      <span class="tag amber">Web APIs</span>
      <span class="tag">→ setTimeout, fetch, DOM events — handled outside the stack</span>
    </div>
    <div class="tag-row">
      <span class="tag teal">Task / Microtask Queue</span>
      <span class="tag">→ finished async work waits here to re-enter the stack</span>
    </div>
    <div class="tag-row">
      <span class="tag">Event Loop</span>
      <span class="tag">→ constantly checks: is the stack empty? if so, pull from the queue</span>
    </div>
  </div>

  <h2>Why this matters</h2>
  <div class="code-out">console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// logs: 1, 3, 2 — even with a 0ms delay</div>
  <p><code>setTimeout</code> always defers to the Web APIs and queue — it never runs before the current synchronous code finishes, no matter how small the delay.</p>

  <div class="callout"><b>Note:</b> this is why a long-running loop can "freeze" a page — it never gives the stack back, so the event loop never gets a turn to process clicks, renders, or queued callbacks.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-how-js-works"></div>
`;
POST_RENDER['how-js-works'] = () => renderQuiz('quiz-how-js-works', [
  { q: 'JavaScript is:', opts: ['Multi-threaded', 'Single-threaded with an event loop', 'Only asynchronous', 'Compiled ahead of time like C'], correct: 1 },
  { q: 'What logs last in the setTimeout example above?', opts: ["'1'", "'3'", "'2'", 'Nothing logs'], correct: 2 },
]);

/* ---------- VARIABLES ---------- */
RENDERERS.variables = () => `
  <p class="lede">Variables are named containers for values. Modern JS gives you three ways to declare one, and picking the right one matters.</p>

  <h2>let, const, and var</h2>
  <div class="code-out">let age = 25;       // can be reassigned
const name = "Ana"; // cannot be reassigned
var legacy = true;  // old syntax, avoid in new code</div>

  <table style="width:100%; border-collapse:collapse; margin:16px 0;">
    <tr style="border-bottom:1px solid var(--panel-border);"><th style="text-align:left; padding:8px;">Keyword</th><th style="text-align:left; padding:8px;">Reassignable</th><th style="text-align:left; padding:8px;">Scope</th></tr>
    <tr style="border-bottom:1px solid var(--panel-border);"><td style="padding:8px;"><code>let</code></td><td style="padding:8px;">Yes</td><td style="padding:8px;">Block</td></tr>
    <tr style="border-bottom:1px solid var(--panel-border);"><td style="padding:8px;"><code>const</code></td><td style="padding:8px;">No</td><td style="padding:8px;">Block</td></tr>
    <tr><td style="padding:8px;"><code>var</code></td><td style="padding:8px;">Yes</td><td style="padding:8px;">Function (not block!)</td></tr>
  </table>

  <div class="callout tip"><b>Default to const.</b> Only switch to <code>let</code> when you know the variable needs to be reassigned. This makes code easier to reason about — you can trust a <code>const</code> never changes.</div>

  <h2>const doesn't mean "frozen"</h2>
  <div class="code-out">const user = { name: "Ana" };
user.name = "Beto"; // ✅ allowed — the object's contents can change
user = {};          // ❌ TypeError — can't reassign the variable itself</div>
  <p><code>const</code> locks the binding (the variable name → value link), not the value's internal contents.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-variables"></div>
`;
POST_RENDER.variables = () => renderQuiz('quiz-variables', [
  { q: 'Which keyword should you default to?', opts: ['var', 'let', 'const', 'It never matters'], correct: 2 },
  { q: 'What happens with: const arr = []; arr.push(1);', opts: ['TypeError', 'Works fine, arr becomes [1]', 'Silently does nothing', 'SyntaxError'], correct: 1 },
  { q: 'var is scoped to the:', opts: ['Block', 'Function', 'Module', 'Line'], correct: 1 },
]);

/* ---------- DATA TYPES ---------- */
RENDERERS['data-types'] = () => `
  <p class="lede">JavaScript has 7 primitive types and one non-primitive type (Object). Everything else — arrays, functions, dates — is a specialized object.</p>

  <div class="tag-row">
    <span class="tag teal">string</span><span class="tag teal">number</span><span class="tag teal">boolean</span>
    <span class="tag teal">undefined</span><span class="tag teal">null</span><span class="tag teal">bigint</span><span class="tag teal">symbol</span>
    <span class="tag amber">object (non-primitive)</span>
  </div>

  <h2>Checking a type</h2>
  <div class="code-out">typeof "hi"        // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  ← famous historical bug, null is NOT an object
typeof {}          // "object"
typeof []          // "object"  ← arrays are objects too
typeof function(){} // "function"</div>

  <h2>undefined vs null</h2>
  <div class="callout"><b>undefined</b> — a variable was declared but never given a value (JS assigns this automatically). <b>null</b> — you deliberately set "no value here" yourself. Treat <code>null</code> as an intentional signal, <code>undefined</code> as an absence.</div>

  <h2>Numbers are always floating point</h2>
  <div class="code-out">0.1 + 0.2          // 0.30000000000000004
Number.isInteger(4) // true</div>
  <p>JS has only one number type (64-bit float), which is why floating point rounding quirks like the one above show up — a common interview gotcha.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-data-types"></div>
`;
POST_RENDER['data-types'] = () => renderQuiz('quiz-data-types', [
  { q: 'typeof null returns:', opts: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2 },
  { q: 'How many primitive types does JS have?', opts: ['5', '6', '7', '8'], correct: 2 },
  { q: 'Arrays are technically:', opts: ['A primitive type', 'A special kind of object', 'Not related to objects', 'Functions'], correct: 1 },
]);

/* ---------- OPERATORS ---------- */
RENDERERS.operators = () => `
  <p class="lede">Operators combine values into new values. Beyond the arithmetic basics, a few JS-specific ones come up constantly.</p>

  <h2>Comparison: == vs ===</h2>
  <div class="code-out">1 == "1"   // true  — loose equality, coerces types first
1 === "1"  // false — strict equality, no coercion
null == undefined   // true
null === undefined  // false</div>
  <div class="callout warn"><b>Always use === and !==.</b> Loose equality's coercion rules are inconsistent enough that they cause real bugs. There's essentially no good reason to reach for <code>==</code> in modern code.</div>

  <h2>Logical operators, short-circuiting</h2>
  <div class="code-out">true && "yes"      // "yes" — && returns the last truthy value if all are truthy
false || "default" // "default" — || returns the first truthy value
null ?? "fallback"  // "fallback" — ?? only falls back on null/undefined, not 0 or ""</div>
  <p><code>??</code> (nullish coalescing) fixes a common <code>||</code> bug: <code>0 || 'default'</code> gives <code>'default'</code> even when 0 is a valid value, but <code>0 ?? 'default'</code> correctly gives <code>0</code>.</p>

  <h2>Optional chaining</h2>
  <div class="code-out">const city = user?.address?.city;
// returns undefined instead of throwing if user or address is null/undefined</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-operators"></div>
`;
POST_RENDER.operators = () => renderQuiz('quiz-operators', [
  { q: 'What does 1 === "1" return?', opts: ['true', 'false', 'undefined', 'TypeError'], correct: 1 },
  { q: 'Why prefer ?? over || for defaults?', opts: ["?? is faster", "?? doesn't fall back on valid falsy values like 0 or ''", 'They are identical', '?? works in older browsers'], correct: 1 },
]);

/* ---------- TYPE COERCION ---------- */
RENDERERS['type-coercion'] = () => `
  <p class="lede">JavaScript will often convert types automatically to make an operation "work." Understanding the rules turns confusing bugs into predictable behavior.</p>

  <h2>String coercion with +</h2>
  <div class="code-out">1 + "1"    // "11" — number coerced to string
1 + 1      // 2
"5" - 1    // 4  — minus only works numerically, so "5" is coerced to 5
"5" + 1    // "51"</div>
  <div class="callout"><b>Rule of thumb:</b> <code>+</code> prefers strings (concatenates if either side is a string). Every other arithmetic operator (<code>-</code> <code>*</code> <code>/</code>) prefers numbers and will try to convert strings to numbers.</div>

  <h2>Truthy and falsy</h2>
  <p>Every value is truthy except these <b style="color:var(--text)">falsy</b> values:</p>
  <div class="tag-row">
    <span class="tag amber">false</span><span class="tag amber">0</span><span class="tag amber">-0</span><span class="tag amber">""</span>
    <span class="tag amber">null</span><span class="tag amber">undefined</span><span class="tag amber">NaN</span>
  </div>
  <p>Everything else — including <code>"0"</code>, <code>"false"</code>, <code>[]</code>, and <code>{}</code> — is truthy.</p>

  <h2>Explicit conversion (safer)</h2>
  <div class="code-out">Number("42")     // 42
String(42)       // "42"
Boolean(0)       // false
!!"hello"        // true — double-bang is a common truthy-check idiom</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-type-coercion"></div>
`;
POST_RENDER['type-coercion'] = () => renderQuiz('quiz-type-coercion', [
  { q: 'What does "5" - 1 evaluate to?', opts: ['"51"', '4', 'NaN', 'TypeError'], correct: 1 },
  { q: 'Which of these is falsy?', opts: ['"0"', '[]', '{}', '0'], correct: 3 },
  { q: 'What does 1 + "1" evaluate to?', opts: ['2', '"11"', '11', 'NaN'], correct: 1 },
]);

/* ---------- CONDITIONALS ---------- */
RENDERERS.conditionals = () => `
  <p class="lede">Conditionals let code branch based on a condition.</p>

  <h2>if / else if / else</h2>
  <div class="code-out">const age = 20;
if (age < 13) {
  console.log("child");
} else if (age < 20) {
  console.log("teen");
} else {
  console.log("adult");
}</div>

  <h2>Ternary operator</h2>
  <div class="code-out">const label = age >= 18 ? "adult" : "minor";</div>
  <p>Great for simple either/or assignments; avoid nesting ternaries, they get unreadable fast.</p>

  <h2>switch</h2>
  <div class="code-out">switch (fruit) {
  case "apple":
    console.log("red or green");
    break;
  case "banana":
    console.log("yellow");
    break;
  default:
    console.log("unknown fruit");
}</div>
  <div class="callout warn"><b>Don't forget break.</b> Without it, execution "falls through" into the next case — sometimes intentional, usually a bug.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-conditionals"></div>
`;
POST_RENDER.conditionals = () => renderQuiz('quiz-conditionals', [
  { q: 'What happens if you omit break in a switch case?', opts: ['SyntaxError', 'Execution falls through to the next case', 'Nothing runs', 'It auto-adds one'], correct: 1 },
  { q: 'const x = 5 > 3 ? "yes" : "no"; — x equals:', opts: ['"yes"', '"no"', 'true', 'undefined'], correct: 0 },
]);

/* ---------- LOOPS ---------- */
RENDERERS.loops = () => `
  <p class="lede">Loops repeat code. Picking the right loop makes intent clear.</p>

  <h2>for</h2>
  <div class="code-out">for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}</div>

  <h2>while / do...while</h2>
  <div class="code-out">let i = 0;
while (i < 5) { console.log(i); i++; }

do { console.log(i); i++; } while (i < 10); // runs body at least once</div>

  <h2>for...of vs for...in</h2>
  <div class="code-out">const arr = ["a", "b", "c"];
for (const val of arr) console.log(val);      // "a" "b" "c" — values

const obj = { x: 1, y: 2 };
for (const key in obj) console.log(key);      // "x" "y" — keys</div>
  <div class="callout"><b>for...of</b> iterates values (arrays, strings, Maps, Sets). <b>for...in</b> iterates enumerable keys (objects). Using for...in on an array works but is discouraged — it iterates keys as strings and can pick up inherited properties.</div>

  <h2>Array iteration methods</h2>
  <div class="code-out">arr.forEach((val, i) => console.log(i, val));</div>
  <p><code>forEach</code>, <code>map</code>, and <code>filter</code> (covered in Array Methods) are usually preferred over manual loops for arrays — they're more declarative.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-loops"></div>
`;
POST_RENDER.loops = () => renderQuiz('quiz-loops', [
  { q: 'for...of iterates:', opts: ['Object keys', 'Values of an iterable', 'Only numbers', 'Function names'], correct: 1 },
  { q: 'Which loop guarantees the body runs at least once?', opts: ['for', 'while', 'do...while', 'for...in'], correct: 2 },
]);

/* ---------- FUNCTIONS ---------- */
RENDERERS.functions = () => `
  <p class="lede">Functions are reusable blocks of code. JS has several ways to define them, each with slightly different behavior.</p>

  <h2>Function declaration</h2>
  <div class="code-out">function greet(name) {
  return "Hello, " + name;
}
greet("Ana"); // "Hello, Ana"</div>
  <p>Declarations are <b style="color:var(--text)">hoisted</b> — you can call them before their definition appears in the file.</p>

  <h2>Function expression</h2>
  <div class="code-out">const greet = function(name) {
  return "Hello, " + name;
};</div>
  <p>Not hoisted the same way — the variable exists, but calling it before this line throws.</p>

  <h2>Default & rest parameters</h2>
  <div class="code-out">function greet(name = "friend") { return "Hi, " + name; }
greet(); // "Hi, friend"

function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
sum(1, 2, 3); // 6</div>

  <h2>Return</h2>
  <div class="callout">A function without an explicit <code>return</code> returns <code>undefined</code>. Code after a <code>return</code> never runs — it exits the function immediately.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-functions"></div>
`;
POST_RENDER.functions = () => renderQuiz('quiz-functions', [
  { q: 'Function declarations are:', opts: ['Never hoisted', 'Hoisted — callable before their definition', 'Only usable once', 'Always anonymous'], correct: 1 },
  { q: 'A function with no return statement returns:', opts: ['null', '0', 'undefined', 'An error'], correct: 2 },
]);

/* ---------- SCOPE ---------- */
RENDERERS.scope = () => `
  <p class="lede">Scope determines where a variable is accessible. Getting this right avoids naming collisions and "why is this undefined" bugs.</p>

  <h2>Global, function, and block scope</h2>
  <div class="code-out">let g = "global";

function outer() {
  let f = "function-scoped";
  if (true) {
    let b = "block-scoped";
    console.log(g, f, b); // all visible here
  }
  console.log(b); // ❌ ReferenceError — b doesn't exist out here
}</div>

  <h2>let/const vs var scoping</h2>
  <div class="code-out">if (true) {
  var x = 1;
  let y = 2;
}
console.log(x); // 1 — var leaked out of the block
console.log(y); // ❌ ReferenceError — let stayed in the block</div>
  <div class="callout warn">This "leaking" is a major reason <code>var</code> is avoided in modern code — it doesn't respect block boundaries (if, for, while), only function boundaries.</div>

  <h2>The scope chain</h2>
  <p>When JS looks up a variable, it checks the current scope, then walks outward through each enclosing scope until it finds it (or throws a ReferenceError). This outward lookup is exactly what makes closures possible — see the next lesson.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-scope"></div>
`;
POST_RENDER.scope = () => renderQuiz('quiz-scope', [
  { q: 'A variable declared with var inside an if block is accessible:', opts: ['Only inside that block', 'Throughout the enclosing function', 'Nowhere else', 'Only in the global scope'], correct: 1 },
  { q: 'When a variable isn\u2019t found in the current scope, JS:', opts: ['Throws immediately', 'Creates it globally', 'Looks in the next outer scope', 'Returns null'], correct: 2 },
]);

/* ---------- CLOSURES ---------- */
RENDERERS.closures = () => `
  <p class="lede">A closure is a function that "remembers" the variables from where it was created, even after that outer function has finished running. This is one of the most-asked interview topics in JavaScript.</p>

  <h2>A minimal example</h2>
  <div class="code-out">function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3</div>
  <p>Even though <code>makeCounter()</code> already returned, the inner function still has access to <code>count</code> — it "closed over" that variable. Each call to <code>makeCounter()</code> creates a fresh, independent <code>count</code>.</p>

  <h2>Live demo</h2>
  <div class="viz-panel">
    <button class="btn" onclick="window.closureDemo()">Click me</button>
    <div class="code-out" id="closure-out">count: 0</div>
  </div>

  <h2>Why closures matter</h2>
  <div class="tag-row">
    <span class="tag teal">Private state</span>
    <span class="tag teal">Event handler data</span>
    <span class="tag teal">Function factories</span>
    <span class="tag teal">Memoization / caching</span>
  </div>

  <div class="callout warn"><b>Classic gotcha:</b> a closure inside a <code>for (var i...)</code> loop captures the same <code>i</code> for every iteration, so all callbacks see the final value. Using <code>let</code> instead fixes it, because each iteration gets its own block-scoped <code>i</code>.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-closures"></div>
`;
POST_RENDER.closures = () => {
  let count = 0;
  window.closureDemo = () => {
    count++;
    const out = document.getElementById('closure-out');
    if (out) out.textContent = 'count: ' + count;
  };
  renderQuiz('quiz-closures', [
    { q: 'A closure is:', opts: ['A syntax error', 'A function that remembers variables from its creation scope', 'A type of loop', 'A CSS property'], correct: 1 },
    { q: 'Why does using let (instead of var) in a for-loop fix the "same value in every callback" bug?', opts: ['let is faster', 'Each loop iteration gets its own block-scoped binding', 'let disables closures', 'It doesn\u2019t actually fix it'], correct: 1 },
  ]);
};

/* ---------- THIS KEYWORD ---------- */
RENDERERS['this-keyword'] = () => `
  <p class="lede"><code>this</code> refers to whatever object is "calling" the function — and that depends entirely on <b style="color:var(--text)">how</b> the function is called, not where it's written.</p>

  <h2>Method call</h2>
  <div class="code-out">const user = {
  name: "Ana",
  greet() { return "Hi, I'm " + this.name; }
};
user.greet(); // "Hi, I'm Ana" — this = user</div>

  <h2>Plain function call</h2>
  <div class="code-out">function show() { console.log(this); }
show(); // undefined in strict mode / modules, or the global object otherwise</div>

  <h2>Arrow functions don't have their own this</h2>
  <div class="code-out">const user = {
  name: "Ana",
  greetLater() {
    setTimeout(() => {
      console.log(this.name); // "Ana" — arrow keeps outer this
    }, 100);
  }
};</div>
  <p>Had that callback been a regular <code>function () {}</code>, <code>this</code> inside it would NOT be <code>user</code> — it's one of the most common real-world <code>this</code> bugs, and exactly why arrow functions are preferred for callbacks that need the outer context.</p>

  <h2>call, apply, bind</h2>
  <div class="code-out">function greet() { return "Hi " + this.name; }
greet.call({ name: "Beto" });   // "Hi Beto" — invoke now with this set
greet.apply({ name: "Beto" });  // same, but args as an array
const bound = greet.bind({ name: "Beto" }); // returns a new function, this locked in</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-this-keyword"></div>
`;
POST_RENDER['this-keyword'] = () => renderQuiz('quiz-this-keyword', [
  { q: 'this is determined by:', opts: ['Where the function is defined', 'How the function is called', 'The variable name', 'The file name'], correct: 1 },
  { q: 'Arrow functions:', opts: ['Create their own this', 'Inherit this from the enclosing scope', 'Always set this to undefined', 'Cannot be used as callbacks'], correct: 1 },
]);

/* ---------- OBJECTS ---------- */
RENDERERS.objects = () => `
  <p class="lede">Objects group related data and behavior together as key-value pairs. They're the backbone of most JS programs.</p>

  <h2>Creating & accessing</h2>
  <div class="code-out">const user = {
  name: "Ana",
  age: 28,
  greet() { return "Hi, " + this.name; }
};

user.name;        // dot notation
user["age"];       // bracket notation — needed for dynamic/variable keys
user.greet();</div>

  <h2>Adding, updating, deleting</h2>
  <div class="code-out">user.email = "ana@mail.com"; // add
user.age = 29;                // update
delete user.email;            // remove</div>

  <h2>Useful Object methods</h2>
  <div class="code-out">Object.keys(user);    // ["name", "age", "greet"]
Object.values(user);  // ["Ana", 29, f]
Object.entries(user);  // [["name","Ana"], ["age",29], ...]
Object.assign({}, user, { age: 30 }); // shallow merge into a new object</div>

  <h2>Checking a key exists</h2>
  <div class="code-out">"name" in user;              // true
user.hasOwnProperty("name"); // true
user.missing;                 // undefined, not an error</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-objects"></div>
`;
POST_RENDER.objects = () => renderQuiz('quiz-objects', [
  { q: 'When must you use bracket notation instead of dot notation?', opts: ['Never, they\u2019re identical', 'When the key is stored in a variable or has special characters', 'Only for arrays', 'Only for numbers'], correct: 1 },
  { q: 'Accessing a missing property (user.missing) returns:', opts: ['null', 'undefined', 'An error', '0'], correct: 1 },
]);

/* ---------- ARRAYS ---------- */
RENDERERS.arrays = () => `
  <p class="lede">Arrays are ordered lists. Unlike some languages, JS arrays can hold mixed types and resize freely.</p>

  <h2>Basics</h2>
  <div class="code-out">const nums = [1, 2, 3];
nums.length;      // 3
nums[0];          // 1
nums[nums.length - 1]; // 3 — last item

nums.push(4);     // add to end   → [1,2,3,4]
nums.pop();       // remove from end → [1,2,3]
nums.unshift(0);  // add to start → [0,1,2,3]
nums.shift();     // remove from start → [1,2,3]</div>

  <h2>Checking & finding</h2>
  <div class="code-out">Array.isArray(nums);          // true
nums.includes(2);              // true
nums.indexOf(2);                // 1 (or -1 if not found)</div>

  <h2>Slicing vs splicing</h2>
  <div class="code-out">nums.slice(1, 3);    // returns a new array, original untouched
nums.splice(1, 1);   // MUTATES original: removes 1 item at index 1</div>
  <div class="callout warn"><b>slice</b> is non-destructive (returns a copy). <b>splice</b> mutates the original array in place — mixing these up is a common source of bugs.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-arrays"></div>
`;
POST_RENDER.arrays = () => renderQuiz('quiz-arrays', [
  { q: 'Which method removes and returns the last element?', opts: ['shift()', 'pop()', 'slice()', 'splice(0,1)'], correct: 1 },
  { q: 'Which method does NOT mutate the original array?', opts: ['push', 'splice', 'slice', 'unshift'], correct: 2 },
]);

/* ---------- ARRAY METHODS (LAB) ---------- */
RENDERERS['array-methods'] = () => `
  <p class="lede">map, filter, and reduce are the three array methods that show up in nearly every JS codebase and interview. This lab lets you run them live.</p>

  <h2>map — transform every item</h2>
  <div class="code-out">[1, 2, 3].map(n => n * 2); // [2, 4, 6] — same length, new array</div>

  <h2>filter — keep only matching items</h2>
  <div class="code-out">[1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]</div>

  <h2>reduce — collapse to a single value</h2>
  <div class="code-out">[1, 2, 3, 4].reduce((total, n) => total + n, 0); // 10</div>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="ctrl" style="margin-bottom:10px;">
      <label>array (comma-separated numbers)</label>
      <input type="text" id="am-input" value="1,2,3,4,5,6" style="font-size:14px; padding:9px 10px; width:100%;">
    </div>
    <div class="tag-row">
      <button class="btn" data-am="map">.map(n => n * 2)</button>
      <button class="btn" data-am="filter">.filter(n => n % 2 === 0)</button>
      <button class="btn" data-am="reduce">.reduce((a,b) => a+b, 0)</button>
      <button class="btn" data-am="find">.find(n => n > 3)</button>
      <button class="btn" data-am="sort">.sort((a,b) => b - a)</button>
    </div>
    <div class="code-out" id="am-output">Pick a method above.</div>
  </div>

  <div class="callout"><b>find</b> returns the first matching item (not an array). <b>sort</b> mutates the original array in place and compares by string by default — always pass a compare function for numbers.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-array-methods"></div>
`;
POST_RENDER['array-methods'] = () => {
  const input = document.getElementById('am-input');
  const output = document.getElementById('am-output');
  function parse() {
    return (input.value || '').split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n));
  }
  document.querySelectorAll('[data-am]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const arr = parse();
      let result;
      if (btn.dataset.am === 'map') result = arr.map((n) => n * 2);
      else if (btn.dataset.am === 'filter') result = arr.filter((n) => n % 2 === 0);
      else if (btn.dataset.am === 'reduce') result = arr.reduce((a, b) => a + b, 0);
      else if (btn.dataset.am === 'find') result = arr.find((n) => n > 3);
      else if (btn.dataset.am === 'sort') result = [...arr].sort((a, b) => b - a);
      output.textContent = JSON.stringify(result);
    });
  });
  renderQuiz('quiz-array-methods', [
    { q: 'Which method always returns an array the same length as the input?', opts: ['filter', 'find', 'map', 'reduce'], correct: 2 },
    { q: 'reduce is best used for:', opts: ['Removing duplicates', 'Collapsing an array to a single value (sum, total, object, etc.)', 'Sorting strings', 'Checking types'], correct: 1 },
  ]);
};

/* ---------- DESTRUCTURING ---------- */
RENDERERS.destructuring = () => `
  <p class="lede">Destructuring unpacks values from arrays or objects into individual variables in one line — extremely common in modern JS and React.</p>

  <h2>Array destructuring</h2>
  <div class="code-out">const [first, second] = [10, 20];
// first = 10, second = 20

const [a, , c] = [1, 2, 3]; // skip with an empty slot → a=1, c=3

function minMax() { return [0, 100]; }
const [min, max] = minMax();</div>

  <h2>Object destructuring</h2>
  <div class="code-out">const user = { name: "Ana", age: 28, city: "Lima" };
const { name, age } = user; // pulls by KEY NAME, order doesn't matter

const { name: userName } = user; // rename while destructuring
const { country = "Peru" } = user; // default if key is missing</div>

  <h2>In function parameters</h2>
  <div class="code-out">function printUser({ name, age }) {
  console.log(name, age);
}
printUser(user);</div>
  <p>This is everywhere in real codebases — especially destructuring <code>props</code> in React components.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-destructuring"></div>
`;
POST_RENDER.destructuring = () => renderQuiz('quiz-destructuring', [
  { q: 'Object destructuring pulls values by:', opts: ['Position/order', 'Key name', 'Type', 'Value'], correct: 1 },
  { q: 'const [a, , c] = [1,2,3]; — what is c?', opts: ['2', '3', 'undefined', 'Error'], correct: 1 },
]);

/* ---------- ARROW FUNCTIONS ---------- */
RENDERERS['arrow-functions'] = () => `
  <p class="lede">Arrow functions (ES6) offer shorter syntax and, crucially, don't bind their own <code>this</code>.</p>

  <h2>Syntax variations</h2>
  <div class="code-out">const add = (a, b) => a + b;          // implicit return, single expression
const square = n => n * n;             // one param — parens optional
const log = () => { console.log("hi"); }; // no params, block body needs { } and explicit return
const makeObj = () => ({ name: "Ana" }); // returning an object literal needs ( ) around it</div>

  <h2>What arrow functions can't do</h2>
  <div class="tag-row">
    <span class="tag amber">No own "this"</span>
    <span class="tag amber">Can't be used as constructors (new)</span>
    <span class="tag amber">No "arguments" object</span>
    <span class="tag amber">Can't be generator functions</span>
  </div>
  <div class="callout warn"><b>Don't use arrow functions as object methods</b> when you need <code>this</code> to refer to the object — since arrows inherit <code>this</code> from the surrounding scope (often the global scope), not the object calling them.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-arrow-functions"></div>
`;
POST_RENDER['arrow-functions'] = () => renderQuiz('quiz-arrow-functions', [
  { q: 'const square = n => n * n; — this is valid because:', opts: ['Arrow functions require braces', 'A single expression can be an implicit return with no braces', 'It\u2019s actually invalid', 'n is optional'], correct: 1 },
  { q: 'Why avoid arrow functions as object methods needing this?', opts: ['They\u2019re slower', 'They don\u2019t bind their own this — they inherit it from the enclosing scope', 'They can\u2019t take arguments', 'Syntax error'], correct: 1 },
]);

/* ---------- TEMPLATE LITERALS ---------- */
RENDERERS['template-literals'] = () => `
  <p class="lede">Template literals (backtick strings) allow embedded expressions and multi-line strings without clunky concatenation.</p>

  <h2>Interpolation</h2>
  <div class="code-out">const name = "Ana";
const age = 28;
const msg = \`\${name} is \${age} years old\`;
// "Ana is 28 years old" — any expression works inside \${ }
const total = \`Total: \${2 + 2}\`; // "Total: 4"</div>

  <h2>Multi-line strings</h2>
  <div class="code-out">const html = \`
  <div>
    <p>Hello</p>
  </div>
\`;</div>
  <p>Before template literals this required awkward <code>"\\n"</code> concatenation. Now line breaks in the source are preserved as-is.</p>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-template-literals"></div>
`;
POST_RENDER['template-literals'] = () => renderQuiz('quiz-template-literals', [
  { q: 'Template literals use which character to open/close?', opts: ['Single quotes', 'Double quotes', 'Backticks', 'Parentheses'], correct: 2 },
  { q: 'Inside ${ } you can put:', opts: ['Only variable names', 'Any valid JS expression', 'Only strings', 'Nothing, it\u2019s just a placeholder'], correct: 1 },
]);

/* ---------- SPREAD & REST ---------- */
RENDERERS['spread-rest'] = () => `
  <p class="lede">The <code>...</code> syntax means two different things depending on where it's used: spreading values out, or gathering them into an array.</p>

  <h2>Spread — expand an iterable</h2>
  <div class="code-out">const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5] — copies + extends, non-mutating

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a:1, b:2, c:3 }

Math.max(...[1, 5, 3]); // 5 — spread into function arguments</div>
  <p>Spread is the standard way to copy arrays/objects and merge them without mutating the originals — critical in React state updates.</p>

  <h2>Rest — gather remaining args</h2>
  <div class="code-out">function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10 — nums = [1,2,3,4]

const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]</div>

  <div class="callout"><b>Tell them apart by position:</b> on the right side of <code>=</code> or inside a call, <code>...</code> spreads. In a function parameter list or destructuring target, it rests (collects).</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-spread-rest"></div>
`;
POST_RENDER['spread-rest'] = () => renderQuiz('quiz-spread-rest', [
  { q: 'const obj2 = {...obj1, c: 3} does what?', opts: ['Mutates obj1', 'Creates a new object with obj1\u2019s keys plus c', 'Deletes obj1', 'Throws an error'], correct: 1 },
  { q: 'function f(...args) collects arguments into:', opts: ['An object', 'A string', 'An array', 'A Set'], correct: 2 },
]);

/* ---------- MODULES ---------- */
RENDERERS.modules = () => `
  <p class="lede">Modules let you split code across files and explicitly control what's shared between them — this entire app is built from ES modules.</p>

  <h2>Named exports/imports</h2>
  <div class="code-out">// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;

// main.js
import { add, PI } from './math.js';</div>

  <h2>Default export</h2>
  <div class="code-out">// user.js
export default function User(name) { this.name = name; }

// main.js
import User from './user.js'; // no curly braces, any name works</div>

  <h2>Using modules in the browser</h2>
  <div class="code-out">&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</div>
  <div class="callout"><b>Note:</b> modules are automatically deferred (they wait for the HTML to parse) and run in strict mode by default — no need for <code>"use strict"</code>.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-modules"></div>
`;
POST_RENDER.modules = () => renderQuiz('quiz-modules', [
  { q: 'A file can have how many default exports?', opts: ['0', '1', '2', 'Unlimited'], correct: 1 },
  { q: 'To load an ES module in the browser, the script tag needs:', opts: ['type="module"', 'async', 'defer', 'Nothing special'], correct: 0 },
]);

/* ---------- CALLBACKS ---------- */
RENDERERS.callbacks = () => `
  <p class="lede">A callback is simply a function passed into another function, to be called later. It's the original pattern for handling asynchronous work in JS.</p>

  <h2>Synchronous callback</h2>
  <div class="code-out">[1, 2, 3].forEach(function (n) {
  console.log(n); // this callback runs synchronously, immediately
});</div>

  <h2>Asynchronous callback</h2>
  <div class="code-out">setTimeout(function () {
  console.log("This runs later");
}, 1000);
console.log("This runs first");</div>

  <h2>Callback hell</h2>
  <div class="code-out">getUser(id, function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      // deeply nested, hard to read or handle errors in
    });
  });
});</div>
  <div class="callout warn">Chaining many async operations with callbacks produces deeply nested, hard-to-read "callback hell" — this exact problem is what Promises (next lesson) were designed to solve.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-callbacks"></div>
`;
POST_RENDER.callbacks = () => renderQuiz('quiz-callbacks', [
  { q: 'A callback is:', opts: ['A special keyword', 'A function passed into another function to be called later', 'Only used for errors', 'A CSS animation'], correct: 1 },
  { q: 'What problem do Promises mainly solve?', opts: ['Slow networks', 'Deeply nested "callback hell"', 'Syntax errors', 'Memory leaks'], correct: 1 },
]);

/* ---------- PROMISES ---------- */
RENDERERS.promises = () => `
  <p class="lede">A Promise represents a value that isn't ready yet, but will be — eventually resolved (success) or rejected (failure).</p>

  <h2>The three states</h2>
  <div class="tag-row">
    <span class="tag">pending</span>
    <span class="tag teal">fulfilled</span>
    <span class="tag amber">rejected</span>
  </div>

  <h2>Creating & consuming</h2>
  <div class="code-out">const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

promise
  .then(result => console.log(result))   // "Done!"
  .catch(error => console.error(error))
  .finally(() => console.log("cleanup"));</div>

  <h2>Chaining</h2>
  <div class="code-out">fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error("Something failed:", err));</div>
  <p>Each <code>.then()</code> returns a new promise, which is why chains stay flat instead of nesting — solving callback hell.</p>

  <h2>Promise.all</h2>
  <div class="code-out">Promise.all([fetchUser(1), fetchUser(2)])
  .then(([user1, user2]) => console.log(user1, user2));
// runs both in parallel, resolves when ALL finish (or rejects if any fails)</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-promises"></div>
`;
POST_RENDER.promises = () => renderQuiz('quiz-promises', [
  { q: 'A promise can be in which states?', opts: ['on/off', 'pending, fulfilled, rejected', 'true/false', 'start/end'], correct: 1 },
  { q: 'Promise.all resolves when:', opts: ['The first promise resolves', 'All promises resolve (or rejects if any fails)', 'Never', 'Only if there\u2019s exactly one promise'], correct: 1 },
]);

/* ---------- ASYNC/AWAIT ---------- */
RENDERERS['async-await'] = () => `
  <p class="lede">async/await is syntax sugar over Promises that lets asynchronous code read like ordinary synchronous code.</p>

  <h2>Basic syntax</h2>
  <div class="code-out">async function getUser() {
  return "Ana"; // automatically wrapped in a resolved Promise
}

async function main() {
  const name = await getUser(); // pauses here until the promise resolves
  console.log(name); // "Ana"
}</div>
  <p><code>await</code> can only be used inside an <code>async</code> function (or, in modules, at the top level). It doesn't block the whole program — it just pauses that function, letting the rest of the event loop keep working.</p>

  <h2>Error handling with try/catch</h2>
  <div class="code-out">async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (err) {
    console.error("Failed to load user:", err);
  }
}</div>

  <h2>Sequential vs parallel</h2>
  <div class="code-out">// sequential — slower, each waits for the previous
const a = await fetchA();
const b = await fetchB();

// parallel — faster, both start immediately
const [a, b] = await Promise.all([fetchA(), fetchB()]);</div>
  <div class="callout warn"><b>Common mistake:</b> awaiting independent requests one after another when they could run in parallel with <code>Promise.all</code> — this silently doubles your load time.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-async-await"></div>
`;
POST_RENDER['async-await'] = () => renderQuiz('quiz-async-await', [
  { q: 'await can be used:', opts: ['Anywhere in any function', 'Only inside async functions (or top-level in modules)', 'Only inside loops', 'Only with fetch'], correct: 1 },
  { q: 'How do you catch errors from an awaited call?', opts: ['.catch() only', 'try/catch', 'if/else', 'You can\u2019t'], correct: 1 },
]);

/* ---------- DOM BASICS (LAB) ---------- */
RENDERERS['dom-basics'] = () => `
  <p class="lede">The DOM (Document Object Model) is the browser's live, in-memory representation of your HTML. JavaScript reads and changes the page through it.</p>

  <h2>Selecting elements</h2>
  <div class="code-out">document.getElementById("title");
document.querySelector(".card");       // first match
document.querySelectorAll(".card");    // all matches (a NodeList)</div>

  <h2>Reading & changing content</h2>
  <div class="code-out">el.textContent = "New text";     // safe, treats content as plain text
el.innerHTML = "&lt;b&gt;Bold&lt;/b&gt;"; // parses as HTML — be careful with user input!
el.style.color = "teal";
el.classList.add("active");
el.classList.toggle("hidden");</div>
  <div class="callout warn"><b>Never</b> put untrusted user input into <code>innerHTML</code> directly — it's a classic XSS vulnerability. Use <code>textContent</code> for plain text.</div>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div id="dom-target" style="padding:16px; border:1px solid var(--panel-border); border-radius:8px; margin-bottom:12px;">Original text</div>
    <div class="tag-row">
      <button class="btn" data-dom="text">Change text</button>
      <button class="btn" data-dom="color">Change color</button>
      <button class="btn" data-dom="class">Toggle highlight</button>
      <button class="btn" data-dom="reset">Reset</button>
    </div>
  </div>

  <h2>Creating & inserting elements</h2>
  <div class="code-out">const li = document.createElement("li");
li.textContent = "New item";
list.appendChild(li);
list.removeChild(li);</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-dom-basics"></div>
`;
POST_RENDER['dom-basics'] = () => {
  const target = document.getElementById('dom-target');
  document.querySelectorAll('[data-dom]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.dom;
      if (act === 'text') target.textContent = 'Text changed at ' + new Date().toLocaleTimeString();
      else if (act === 'color') target.style.color = target.style.color === 'var(--accent)' ? '' : 'var(--accent)';
      else if (act === 'class') target.classList.toggle('quiz-opt');
      else if (act === 'reset') { target.textContent = 'Original text'; target.style.color = ''; target.classList.remove('quiz-opt'); }
    });
  });
  renderQuiz('quiz-dom-basics', [
    { q: 'What\u2019s the safer way to insert plain text (vs. HTML injection risk)?', opts: ['innerHTML', 'textContent', 'outerHTML', 'They\u2019re equally safe'], correct: 1 },
    { q: 'querySelectorAll returns:', opts: ['A single element', 'A NodeList of all matches', 'A string', 'undefined if no matches'], correct: 1 },
  ]);
};

/* ---------- EVENTS ---------- */
RENDERERS.events = () => `
  <p class="lede">Events let your code react to what the user (or browser) does — clicks, typing, page load, and more.</p>

  <h2>Listening for events</h2>
  <div class="code-out">button.addEventListener("click", function (event) {
  console.log("Clicked!", event.target);
});</div>

  <h2>The event object</h2>
  <div class="code-out">input.addEventListener("input", (e) => {
  console.log(e.target.value); // current value as the user types
});</div>

  <h2>Event bubbling & delegation</h2>
  <div class="code-out">// instead of adding a listener to every <li>, delegate to the parent:
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked item:", e.target.textContent);
  }
});</div>
  <p>Events "bubble" upward from the target element through its ancestors by default. Delegation exploits this — one listener on a parent handles clicks on any current or future child, which is much more efficient than binding one listener per item.</p>

  <h2>preventDefault</h2>
  <div class="code-out">form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the browser's default page-reload submit
  // ...handle the form with JS instead
});</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-events"></div>
`;
POST_RENDER.events = () => renderQuiz('quiz-events', [
  { q: 'Event delegation means:', opts: ['Adding a listener to every child element', 'Using one listener on a parent to handle events from its children', 'Disabling events', 'A type of animation'], correct: 1 },
  { q: 'e.preventDefault() on a form submit does what?', opts: ['Deletes the form', 'Stops the browser\u2019s default page reload/navigation', 'Cancels all JS on the page', 'Nothing, it\u2019s deprecated'], correct: 1 },
]);

/* ---------- INTERVIEW QUESTIONS ---------- */
RENDERERS['interview-questions'] = () => `
  <p class="lede">The JavaScript questions that come up again and again in frontend interviews.</p>

  <div class="card"><h3>What's the difference between let, const, and var?</h3><p><code>var</code> is function-scoped and hoisted with an <code>undefined</code> initial value; <code>let</code>/<code>const</code> are block-scoped and live in a "temporal dead zone" until their declaration line. <code>const</code> additionally disallows reassignment.</p></div>

  <div class="card"><h3>Explain event loop / how JS handles async with a single thread.</h3><p>Synchronous code runs on the call stack. Async work (timers, network, DOM events) is handed to Web APIs; when finished, callbacks queue up and the event loop pushes them back onto the stack only once it's empty.</p></div>

  <div class="card"><h3>What is a closure? Give a real use case.</h3><p>A function that retains access to variables from its enclosing scope after that scope has exited. Common use: creating private counters/state, or capturing a loop variable for each generated event handler.</p></div>

  <div class="card"><h3>== vs ===?</h3><p><code>==</code> coerces types before comparing; <code>===</code> compares value and type with no coercion. Always prefer <code>===</code>.</p></div>

  <div class="card"><h3>What does "this" refer to inside a regular function vs an arrow function?</h3><p>Regular functions get <code>this</code> based on how they're called (the calling object, or undefined/global otherwise). Arrow functions never bind their own <code>this</code> — they inherit it lexically from the surrounding scope.</p></div>

  <div class="card"><h3>Difference between null and undefined?</h3><p><code>undefined</code> means a variable was declared but never assigned; <code>null</code> is an explicit, deliberate "no value."</p></div>

  <div class="card"><h3>What does Promise.all do if one promise rejects?</h3><p>The whole <code>Promise.all</code> immediately rejects with that error, even if other promises are still pending — use <code>Promise.allSettled</code> if you need every result regardless of failures.</p></div>

  <div class="card"><h3>What's the difference between map and forEach?</h3><p><code>map</code> returns a new array of transformed values; <code>forEach</code> returns <code>undefined</code> and is used purely for side effects.</p></div>

  <div class="card"><h3>How does event delegation improve performance?</h3><p>Instead of one listener per child element, a single listener on a shared ancestor catches bubbled events from any child — including ones added after the listener was attached — using far less memory and setup time.</p></div>

  <div class="card"><h3>What is hoisting?</h3><p>JS moves variable/function declarations to the top of their scope during compilation. <code>function</code> declarations are hoisted with their full body; <code>var</code> is hoisted as <code>undefined</code>; <code>let</code>/<code>const</code> are hoisted but stay uninitialized (temporal dead zone) until their line runs.</p></div>
`;

/* ---------- CHEATSHEET ---------- */
RENDERERS.cheatsheet = () => `
  <p class="lede">A fast reference for syntax you'll use daily.</p>

  <h2>Variables & types</h2>
  <div class="code-out">const x = 1; let y = 2;
typeof x; Array.isArray(arr); Number.isInteger(n);</div>

  <h2>Strings</h2>
  <div class="code-out">\`Hello \${name}\`
str.split(","); str.trim(); str.toUpperCase(); str.includes("x"); str.slice(0,3);</div>

  <h2>Arrays</h2>
  <div class="code-out">arr.map(); arr.filter(); arr.reduce(); arr.find(); arr.includes();
arr.push(); arr.pop(); arr.slice(); arr.splice(); arr.sort(); [...arr];</div>

  <h2>Objects</h2>
  <div class="code-out">Object.keys(obj); Object.values(obj); Object.entries(obj);
{ ...obj, key: val }; const { a, b } = obj;</div>

  <h2>Functions</h2>
  <div class="code-out">const f = (a, b) => a + b;
function g(a, b = 1, ...rest) {}</div>

  <h2>Async</h2>
  <div class="code-out">promise.then().catch().finally();
async function f() { const x = await g(); }
Promise.all([...]); Promise.allSettled([...]);</div>

  <h2>DOM</h2>
  <div class="code-out">document.querySelector(".x");
el.addEventListener("click", fn);
el.classList.add/remove/toggle("x");</div>
`;

/* ---------- FREE PLAYGROUND ---------- */
RENDERERS.playground = () => '';
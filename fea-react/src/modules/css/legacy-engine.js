/* ============================================================
   modules/css/legacy-engine.js
   CSS Academy's original RENDERERS/POST_RENDER objects, all 61
   topics and their interactive labs (box model, flexbox, grid,
   selector demos, etc.), migrated with minimal surgery:
     - the per-topic <h1>/eyebrow header is stripped (the shared
       lesson chrome from Phase 3 already renders the title)
     - the per-topic footer-nav is stripped (replaced by the
       shared, curriculum-order-computed footer nav)
     - the old duplicate quiz engine is replaced by a shim that
       delegates to the ONE shared quiz component from Phase 3
     - the free-form HTML+CSS+Preview playground topic is
       deferred to Phase 6 (Shared Playground), which is exactly
       the feature it was
   Every interactive lab's own logic (box model sliders, the
   selector-matching demo, flex/grid controls, etc.) is untouched.
   ============================================================ */

import { renderQuiz as renderQuizShared } from '../../components/quiz.js';
import { navigate } from '../../core/router.js';

/* Compatibility shim: every POST_RENDER function below calls
   renderQuiz('quiz-xxx', XXX_QUIZ) exactly as CSS Academy always
   did. Only the implementation underneath changed. */
function renderQuiz(containerId, questions) {
  const el = document.getElementById(containerId);
  if (el) renderQuizShared(el, questions);
}

/* A handful of lessons still cross-link to other topics inline
   (e.g. the introduction's "Start here" tags). goTo() is kept as
   a global so that inline onclick="goTo('id')" markup keeps
   working without hand-editing every occurrence. */
if (typeof window !== 'undefined') {
  window.goTo = (id) => navigate(`css/${id}`);
}

export const RENDERERS = {};
export const POST_RENDER = {};

/* ---------- INTRODUCTION ---------- */
RENDERERS.introduction = () => `
  <p class="lede">One offline app that takes you from CSS fundamentals to the layout and architecture depth expected in frontend internship interviews — with live playgrounds instead of static notes.</p>

  <div class="grid-2">
    <div class="card">
      <h4>How this app works</h4>
      <p style="font-size:13px;margin:0;">Every <b style="color:var(--text)">Lab</b> chapter in the sidebar is fully interactive: drag sliders, flip properties, and watch real CSS update live — not screenshots. Chapters marked <b style="color:var(--text)">soon</b> are on the curriculum map and can be starred to prioritize.</p>
    </div>
    <div class="card">
      <h4>Built for placement prep</h4>
      <p style="font-size:13px;margin:0;">Structured to go from fundamentals to interview-ready layout systems (Flexbox, Grid, box model) first — the topics that show up most in frontend screening rounds — before architecture and polish topics.</p>
    </div>
  </div>

  <h2>Start here</h2>
  <p>Three labs are fully built right now:</p>
  <div class="tag-row">
    <span class="tag teal" onclick="goTo('box-model')" style="cursor:pointer">Box Model</span>
    <span class="tag teal" onclick="goTo('flexbox')" style="cursor:pointer">Flexbox</span>
    <span class="tag teal" onclick="goTo('grid')" style="cursor:pointer">Grid</span>
    <span class="tag amber" onclick="goTo('playground')" style="cursor:pointer">Free Playground</span>
  </div>

  <div class="callout tip"><b>Tip:</b> Use the search box in the sidebar to jump straight to any of the 60+ mapped topics. Your progress and theme choice are saved to this browser via localStorage — nothing leaves your machine.</div>

  <h2>What's next</h2>
  <p>This is an intentionally honest first build: a real, working app shell plus deep, complete coverage of the three highest-leverage layout topics — rather than 60 shallow, half-written chapters. Star any topic in the sidebar and it'll be prioritized in the next content pass.</p>
`;

/* ---------- SELECTORS ---------- */
RENDERERS.selectors = () => `
  <p class="lede">A selector is the part of a CSS rule that decides <i>which</i> elements get styled. Everything else in CSS — the cascade, specificity, inheritance — exists to resolve what happens when more than one selector matches the same element.</p>

  <h2>Try selectors live</h2>
  <p>Type a selector and see which elements in the sample markup it matches, highlighted instantly.</p>
  <div class="viz-panel">
    <div class="ctrl" style="margin-bottom:14px;">
      <label>selector</label>
      <input type="text" id="sel-input" value="li:nth-child(odd)" oninput="window.selUpdate()" style="font-size:14px; padding:9px 10px;">
    </div>
    <div class="viz-stage" id="sel-stage" style="justify-content:flex-start; align-items:flex-start; flex-direction:column; font-family:var(--font-code); font-size:13px;">
      <div id="sel-sample" style="width:100%;"></div>
    </div>
    <div class="code-out" id="sel-status">/* matches */</div>
  </div>

  <h2>The selector families</h2>
  <div class="grid-2">
    <div class="card"><h4>Basic</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">* &nbsp; div &nbsp; .class &nbsp; #id</p>
    </div>
    <div class="card"><h4>Attribute</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">[type] [type="text"] [class^="btn-"] [href$=".pdf"] [title*="css"]</p>
    </div>
    <div class="card"><h4>Combinators</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">A B (descendant) &nbsp; A > B (child) &nbsp; A + B (adjacent sibling) &nbsp; A ~ B (general sibling)</p>
    </div>
    <div class="card"><h4>Pseudo-classes</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">:hover :focus :active :visited :checked :disabled :first-child :nth-child(n) :not() :is() :where() :has()</p>
    </div>
    <div class="card"><h4>Pseudo-elements</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">::before ::after ::first-line ::first-letter ::placeholder ::selection</p>
    </div>
    <div class="card"><h4>Grouping</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">h1, h2, h3 { } — comma-separated, applies the same rule to all</p>
    </div>
  </div>

  <h2>Combinators in detail</h2>
  <table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:13px;">
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">div p</td><td style="padding:8px 6px;color:var(--text-muted);">Any &lt;p&gt; anywhere inside a &lt;div&gt;, at any depth</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">div > p</td><td style="padding:8px 6px;color:var(--text-muted);">Only &lt;p&gt; that are <b>direct children</b> of a &lt;div&gt;</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">h2 + p</td><td style="padding:8px 6px;color:var(--text-muted);">The &lt;p&gt; immediately after an &lt;h2&gt;, same parent</td></tr>
    <tr><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">h2 ~ p</td><td style="padding:8px 6px;color:var(--text-muted);">Every &lt;p&gt; sibling that comes after an &lt;h2&gt;, same parent</td></tr>
  </table>

  <div class="callout tip"><b>:is() and :where():</b> both let you group selectors compactly — <code>:is(header, main, footer) p</code> instead of three separate rules. The only difference: <code>:where()</code> always has zero specificity, <code>:is()</code> takes the specificity of its most specific argument.</div>

  <div class="callout warn"><b>Common mistake:</b> confusing <code>.a.b</code> (one element with both classes) with <code>.a .b</code> (a <code>.b</code> descendant inside an <code>.a</code>) — the space changes the meaning completely.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-selectors"></div>
`;
const SEL_SAMPLE_ITEMS = [
  {tag:'ul', html:'<ul id="fruit-list" class="list">', close:false, attrs:{id:'fruit-list', class:'list'}},
];
POST_RENDER.selectors = () => {
  const sample = [
    {tag:'div', cls:'wrap', id:null, text:'div.wrap', children:[
      {tag:'h2', cls:null, id:'title', text:'h2#title'},
      {tag:'ul', cls:'list', id:null, text:'ul.list', children:[
        {tag:'li', cls:null, id:null, text:'li (1)'},
        {tag:'li', cls:'featured', id:null, text:'li.featured (2)'},
        {tag:'li', cls:null, id:null, text:'li (3)'},
        {tag:'li', cls:null, id:null, text:'li (4)', attr:'data-new'},
      ]},
      {tag:'p', cls:null, id:null, text:'p'},
    ]},
  ];
  function build(node){
    const el = document.createElement(node.tag);
    if(node.cls) el.className = node.cls;
    if(node.id) el.id = node.id;
    if(node.attr) el.setAttribute(node.attr,'');
    el.style.cssText = 'border:1px solid var(--border);border-radius:6px;padding:6px 8px;margin:4px 0 4px 16px;color:var(--text-muted);';
    const label = document.createElement('span');
    label.textContent = node.text;
    el.appendChild(label);
    if(node.children) node.children.forEach(c=>el.appendChild(build(c)));
    return el;
  }
  const stage = document.getElementById('sel-sample');
  stage.innerHTML='';
  sample.forEach(n=>stage.appendChild(build(n)));
  window.selUpdate = function(){
    const val = document.getElementById('sel-input').value;
    stage.querySelectorAll('*').forEach(el=>el.style.outline='none');
    let matches = [];
    try{
      matches = [...stage.querySelectorAll(val)];
      matches.forEach(el=>{ el.style.outline='2px solid var(--teal)'; el.style.color='var(--teal)'; });
      stage.querySelectorAll('*').forEach(el=>{ if(!matches.includes(el)) el.style.color='var(--text-muted)'; });
      document.getElementById('sel-status').textContent = `✓ ${matches.length} match(es) — ${val}`;
    }catch(e){
      document.getElementById('sel-status').textContent = `✗ invalid selector`;
    }
  };
  window.selUpdate();
  renderQuiz('quiz-selectors', SELECTORS_QUIZ);
};

/* ---------- SPECIFICITY ---------- */
RENDERERS.specificity = () => `
  <p class="lede">When two rules target the same element with conflicting declarations, specificity decides which one wins. It's calculated as a triplet — <b style="color:var(--text)">(IDs, classes/attres/pseudo-classes, type selectors)</b> — compared left to right.</p>

  <h2>Specificity calculator</h2>
  <p>Type a selector, see its specificity score broken down live.</p>
  <div class="viz-panel">
    <div class="ctrl" style="margin-bottom:14px;">
      <label>selector</label>
      <input type="text" id="spec-input" value="#nav ul.menu li a:hover" oninput="window.specUpdate()" style="font-size:14px; padding:9px 10px;">
    </div>
    <div class="viz-stage" style="flex-direction:column; align-items:stretch; gap:14px;">
      <div style="display:flex; gap:10px; justify-content:center;">
        <div class="card" style="text-align:center; flex:1;"><h4 style="color:var(--rose)">IDs</h4><div id="spec-id" style="font-family:var(--font-code); font-size:26px;">0</div></div>
        <div class="card" style="text-align:center; flex:1;"><h4 style="color:var(--teal)">Classes / Attrs / :pseudo</h4><div id="spec-class" style="font-family:var(--font-code); font-size:26px;">0</div></div>
        <div class="card" style="text-align:center; flex:1;"><h4 style="color:var(--amber)">Elements</h4><div id="spec-tag" style="font-family:var(--font-code); font-size:26px;">0</div></div>
      </div>
    </div>
    <div class="code-out" id="spec-code">/* specificity */</div>
  </div>

  <h2>How ties are broken</h2>
  <p>Order of precedence, highest first:</p>
  <div class="tag-row">
    <span class="tag" style="color:var(--rose);border-color:var(--rose-dim);">!important</span>
    <span class="tag">inline style="..."</span>
    <span class="tag">ID selectors</span>
    <span class="tag">classes, attributes, pseudo-classes</span>
    <span class="tag">element & pseudo-element selectors</span>
    <span class="tag">universal selector *</span>
  </div>
  <p>If two selectors have <b style="color:var(--text)">equal</b> specificity, the one that appears <b style="color:var(--text)">later in the stylesheet</b> wins — this is source order, and it's the tiebreaker interviewers love to test.</p>

  <div class="callout warn"><b>!important is not a specificity boost</b> — it overrides the entire cascade regardless of specificity, which is exactly why it's discouraged: it makes future overrides need <i>another</i> !important, escalating fast. Prefer fixing the underlying specificity instead.</div>

  <div class="callout"><b>Note:</b> <code>:not()</code>, <code>:is()</code>, and <code>:has()</code> don't add their own specificity — they take the specificity of their most specific argument. <code>:where()</code> always contributes zero.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-specificity"></div>
`;
POST_RENDER.specificity = () => {
  window.specUpdate = function(){
    const val = document.getElementById('spec-input').value;
    // strip pseudo-elements first (don't count toward specificity, but exclude from other counts)
    let s = val;
    let ids = (s.match(/#[\w-]+/g)||[]).length;
    let classesAttrsPseudo = (s.match(/\.[\w-]+/g)||[]).length
      + (s.match(/\[[^\]]+\]/g)||[]).length
      + (s.match(/:[a-zA-Z-]+(\([^)]*\))?/g)||[]).filter(p=>!p.startsWith('::')).length;
    let elements = (s.replace(/#[\w-]+/g,'').replace(/\.[\w-]+/g,'').replace(/\[[^\]]+\]/g,'').replace(/:[a-zA-Z-]+(\([^)]*\))?/g,'').match(/[a-zA-Z][a-zA-Z0-9]*/g)||[]).length;
    document.getElementById('spec-id').textContent = ids;
    document.getElementById('spec-class').textContent = classesAttrsPseudo;
    document.getElementById('spec-tag').textContent = elements;
    document.getElementById('spec-code').textContent = `specificity(${val || '—'}) = (${ids}, ${classesAttrsPseudo}, ${elements})`;
  };
  window.specUpdate();
  renderQuiz('quiz-specificity', SPECIFICITY_QUIZ);
};

/* ---------- CASCADE ---------- */
RENDERERS.cascade = () => `
  <p class="lede">"Cascading" is where CSS gets its name. When multiple declarations target the same property on the same element, the cascade decides the winner by working through these stages, in order:</p>

  <div class="viz-panel">
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${[
        ['1. Origin & importance','Browser default → user styles → author styles → author !important → user !important. Author styles usually win unless !important is involved.'],
        ['2. Specificity','Among rules of equal origin/importance, the higher-specificity selector wins (see the Specificity lab).'],
        ['3. Source order','If origin and specificity are tied, whichever rule appears later in the CSS (or later linked stylesheet) wins.'],
      ].map(([t,d])=>`<div class="card"><h4>${t}</h4><p style="font-size:13px;margin:0;">${d}</p></div>`).join('')}
    </div>
  </div>

  <h2>Live example</h2>
  <p>Both rules below target the same box. Toggle which one comes later in source order and watch the winner change — this is the cascade acting with equal specificity.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>which rule is declared LAST</label>
        <select id="casc-order" onchange="window.cascUpdate()">
          <option value="teal">.box { background: teal }</option>
          <option value="amber">.box { background: amber }</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div id="casc-box" style="width:120px;height:80px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--font-code);color:#04211D;font-weight:700;"></div>
    </div>
    <div class="code-out" id="casc-code">/* CSS */</div>
  </div>

  <div class="callout tip"><b>Rule of thumb for debugging "why isn't my CSS applying":</b> open devtools, check for a strikethrough declaration — that tells you the cascade picked a competing rule. Work through origin → specificity → source order in that order to find why.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-cascade"></div>
`;
POST_RENDER.cascade = () => {
  window.cascUpdate = function(){
    const last = document.getElementById('casc-order').value;
    const box = document.getElementById('casc-box');
    const teal = getComputedStyle(document.body).getPropertyValue('--teal').trim() || '#5EEAD4';
    const amber = getComputedStyle(document.body).getPropertyValue('--amber').trim() || '#F5A623';
    box.style.background = last === 'teal' ? teal : amber;
    box.textContent = last === 'teal' ? 'teal wins' : 'amber wins';
    const first = last === 'teal' ? 'amber' : 'teal';
    document.getElementById('casc-code').innerHTML = `.box { background: ${first}; } /* declared first */
.box { background: ${last}; } /* declared last → wins (same specificity) */`;
  };
  window.cascUpdate();
  renderQuiz('quiz-cascade', CASCADE_QUIZ);
};

/* ---------- INHERITANCE ---------- */
RENDERERS.inheritance = () => `
  <p class="lede">Some CSS properties automatically pass from parent to child unless overridden; others don't. Getting this distinction right saves you from writing redundant CSS — and from being surprised when a border doesn't "inherit" onto children.</p>

  <div class="grid-2">
    <div class="card">
      <h4 style="color:var(--teal)">Typically inherited</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">color, font-family, font-size, font-weight, line-height, letter-spacing, text-align, visibility, cursor, white-space, list-style</p>
    </div>
    <div class="card">
      <h4 style="color:var(--rose)">Not inherited</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">margin, padding, border, width, height, background, display, position, box-shadow, flex, grid-*</p>
    </div>
  </div>
  <p style="font-size:13px;">The pattern: <b style="color:var(--text)">text-related</b> properties tend to inherit (so a whole document can share a base font without repeating it everywhere); <b style="color:var(--text)">box-related</b> properties don't (so every box doesn't accidentally take on its parent's border or spacing).</p>

  <h2>The four inheritance keywords</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>child's color value</label>
        <select id="inh-value" onchange="window.inhUpdate()">
          <option value="inherit">inherit</option>
          <option value="initial">initial</option>
          <option value="unset">unset</option>
          <option value="revert">revert</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" style="flex-direction:column; align-items:flex-start; gap:8px;">
      <div style="color:var(--amber); font-family:var(--font-code); font-size:13px;">.parent { color: amber; }
        <div id="inh-child" style="margin-top:8px; padding:12px; border:1px dashed var(--border); font-family:var(--font-code); font-size:13px;">.child text sample</div>
      </div>
    </div>
    <div class="code-out" id="inh-desc">description</div>
  </div>

  <table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:13px;">
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">inherit</td><td style="padding:8px 6px;color:var(--text-muted);">Force this property to take its parent's computed value, even if it doesn't inherit by default.</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">initial</td><td style="padding:8px 6px;color:var(--text-muted);">Reset to the property's spec-defined default value, ignoring both parent and stylesheet.</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">unset</td><td style="padding:8px 6px;color:var(--text-muted);">Acts like <code>inherit</code> if the property naturally inherits, otherwise like <code>initial</code>.</td></tr>
    <tr><td style="padding:8px 6px;font-family:var(--font-code);color:var(--teal);">revert</td><td style="padding:8px 6px;color:var(--text-muted);">Rolls back to the browser's built-in default style for that element (e.g. a &lt;button&gt;'s native look).</td></tr>
  </table>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-inheritance"></div>
`;
POST_RENDER.inheritance = () => {
  window.inhUpdate = function(){
    const val = document.getElementById('inh-value').value;
    const child = document.getElementById('inh-child');
    const amber = getComputedStyle(document.body).getPropertyValue('--amber').trim() || '#F5A623';
    const text = getComputedStyle(document.body).getPropertyValue('--text').trim() || '#E7E9EE';
    let color, desc;
    if(val==='inherit'){ color = amber; desc = "Takes the parent's color (amber) explicitly, even though color already inherits by default."; }
    else if(val==='initial'){ color = '#000000'; desc = "Resets to color's spec default: black — ignores the amber parent entirely."; }
    else if(val==='unset'){ color = amber; desc = 'color naturally inherits, so unset behaves like inherit here → amber.'; }
    else { color = text; desc = 'Reverts to the browser default text color for a div, ignoring both parent and author styles.'; }
    child.style.color = color;
    document.getElementById('inh-desc').textContent = `color: ${val};  /* ${desc} */`;
  };
  window.inhUpdate();
  renderQuiz('quiz-inheritance', INHERITANCE_QUIZ);
};

/* ---------- UNITS ---------- */
RENDERERS.units = () => `
  <p class="lede">CSS units fall into two camps: <b style="color:var(--text)">absolute</b> (fixed physical size, mainly <code>px</code>) and <b style="color:var(--text)">relative</b> (scale against something else — a parent, the root, or the viewport).</p>

  <h2>Compare units live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>root font-size <span id="un-root-val">16</span>px</label><input type="range" id="un-root" min="10" max="28" value="16" oninput="window.unUpdate()"></div>
      <div class="ctrl"><label>parent font-size <span id="un-parent-val">20</span>px</label><input type="range" id="un-parent" min="10" max="40" value="20" oninput="window.unUpdate()"></div>
      <div class="ctrl"><label>value <span id="un-num-val">1.5</span></label><input type="range" id="un-num" min="0.5" max="4" step="0.1" value="1.5" oninput="window.unUpdate()"></div>
    </div>
    <div class="viz-stage" style="flex-direction:column; align-items:flex-start; gap:4px; font-family:var(--font-code); font-size:13px;">
      <div>1.5rem = <span id="un-rem" style="color:var(--teal)"></span>px <span style="color:var(--text-dim)">(always × root font-size)</span></div>
      <div>1.5em (inside this parent) = <span id="un-em" style="color:var(--amber)"></span>px <span style="color:var(--text-dim)">(× parent font-size — compounds if nested)</span></div>
      <div>50vw = <span id="un-vw" style="color:var(--rose)"></span>px <span style="color:var(--text-dim)">(assuming 1280px viewport width)</span></div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>rem</h4><p style="font-size:13px;margin:0;">Relative to the root (<code>&lt;html&gt;</code>) font-size only. Predictable — never compounds. The default choice for spacing and font-size in modern CSS.</p></div>
    <div class="card"><h4>em</h4><p style="font-size:13px;margin:0;">Relative to the <b style="color:var(--text)">current element's</b> font-size. Compounds when nested — useful for component-local scaling, risky for global spacing.</p></div>
    <div class="card"><h4>% </h4><p style="font-size:13px;margin:0;">Relative to the parent's corresponding property (usually width, sometimes height needs an explicit parent height to resolve).</p></div>
    <div class="card"><h4>vw / vh</h4><p style="font-size:13px;margin:0;">1% of the viewport's width / height. Great for full-bleed sections; risky for font-size alone since it ignores zoom/accessibility settings — pair with <code>clamp()</code>.</p></div>
    <div class="card"><h4>ch / ex</h4><p style="font-size:13px;margin:0;"><code>ch</code> ≈ width of the "0" character in the current font — ideal for capping paragraph line-length (e.g. <code>max-width: 65ch</code>).</p></div>
    <div class="card"><h4>fr</h4><p style="font-size:13px;margin:0;">Grid-only "fraction" unit — divides remaining free space in a grid track proportionally. Not usable outside <code>grid-template-*</code>.</p></div>
  </div>

  <div class="callout tip"><b>Modern default:</b> most production codebases use <code>rem</code> for font-size and spacing (predictable, respects user zoom), <code>%</code> or <code>fr</code> for layout widths, and reach for <code>clamp()</code> when a value needs to scale fluidly with the viewport.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-units"></div>
`;
POST_RENDER.units = () => {
  window.unUpdate = function(){
    const root = +document.getElementById('un-root').value;
    const parent = +document.getElementById('un-parent').value;
    const num = +document.getElementById('un-num').value;
    document.getElementById('un-root-val').textContent = root;
    document.getElementById('un-parent-val').textContent = parent;
    document.getElementById('un-num-val').textContent = num;
    document.getElementById('un-rem').textContent = (num*root).toFixed(1);
    document.getElementById('un-em').textContent = (num*parent).toFixed(1);
    document.getElementById('un-vw').textContent = (1280*0.5).toFixed(0);
  };
  window.unUpdate();
  renderQuiz('quiz-units', UNITS_QUIZ);
};

/* ---------- COLORS ---------- */
RENDERERS.colors = () => `
  <p class="lede">CSS gives you several ways to express the same color. They're interchangeable in output but differ in how easy they are to read, animate, and adjust.</p>

  <h2>Color converter</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>hue <span id="col-h-val">168</span>°</label><input type="range" id="col-h" min="0" max="360" value="168" oninput="window.colUpdate()"></div>
      <div class="ctrl"><label>saturation <span id="col-s-val">70</span>%</label><input type="range" id="col-s" min="0" max="100" value="70" oninput="window.colUpdate()"></div>
      <div class="ctrl"><label>lightness <span id="col-l-val">62</span>%</label><input type="range" id="col-l" min="0" max="100" value="62" oninput="window.colUpdate()"></div>
      <div class="ctrl"><label>alpha <span id="col-a-val">1.0</span></label><input type="range" id="col-a" min="0" max="1" step="0.05" value="1" oninput="window.colUpdate()"></div>
    </div>
    <div class="viz-stage">
      <div id="col-swatch" style="width:160px;height:100px;border-radius:12px;border:1px solid var(--border);"></div>
    </div>
    <div class="code-out" id="col-code">/* values */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>hex</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">#5EEAD4, #5EEAD4CC (with alpha)</p></div>
    <div class="card"><h4>rgb() / rgba()</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">rgb(94 234 212 / 0.8) — modern syntax merges rgb/rgba into one function</p></div>
    <div class="card"><h4>hsl() / hsla()</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">hsl(168 70% 62%) — easiest to reason about: hue is a color wheel angle, so shifting a palette is one number.</p></div>
    <div class="card"><h4>currentColor</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">Reuses the element's own <code>color</code> value anywhere else a color is needed (e.g. <code>border-color: currentColor</code>).</p></div>
  </div>

  <div class="callout tip"><b>Why teams often prefer HSL over hex for design systems:</b> to make a "hover-darker" variant of a brand color, you only change the lightness number — with hex or RGB you'd have to recompute every channel.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-colors"></div>
`;
POST_RENDER.colors = () => {
  window.colUpdate = function(){
    const h = document.getElementById('col-h').value;
    const s = document.getElementById('col-s').value;
    const l = document.getElementById('col-l').value;
    const a = document.getElementById('col-a').value;
    document.getElementById('col-h-val').textContent = h;
    document.getElementById('col-s-val').textContent = s;
    document.getElementById('col-l-val').textContent = l;
    document.getElementById('col-a-val').textContent = (+a).toFixed(2);
    document.getElementById('col-swatch').style.background = `hsl(${h} ${s}% ${l}% / ${a})`;

    // hsl -> rgb
    const hh = h/360, ss = s/100, ll = l/100;
    function hue2rgb(p,q,t){ if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; }
    let r,g,b;
    if(ss===0){ r=g=b=ll; } else {
      const q = ll<0.5 ? ll*(1+ss) : ll+ss-ll*ss;
      const p = 2*ll-q;
      r = hue2rgb(p,q,hh+1/3); g = hue2rgb(p,q,hh); b = hue2rgb(p,q,hh-1/3);
    }
    const R=Math.round(r*255), G=Math.round(g*255), B=Math.round(b*255);
    const hex = '#'+[R,G,B].map(x=>x.toString(16).padStart(2,'0')).join('');
    document.getElementById('col-code').innerHTML = `hsl(${h} ${s}% ${l}% / ${a})
rgb(${R} ${G} ${B} / ${a})
${hex}`;
  };
  window.colUpdate();
  renderQuiz('quiz-colors', COLORS_QUIZ);
};

/* ---------- HOW CSS WORKS ---------- */
RENDERERS['how-css-works'] = () => `
  <p class="lede">Before diving into properties, it helps to know what the browser actually does with your CSS between "file loads" and "pixels on screen."</p>
  <div class="viz-panel">
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${[
        ['1. Parse HTML → DOM','The browser reads your HTML and builds the DOM — a tree of every element on the page.'],
        ['2. Parse CSS → CSSOM','Every stylesheet (and inline style) is parsed into the CSSOM, a tree of matched rules and computed values.'],
        ['3. Combine → Render Tree','DOM + CSSOM merge into a render tree containing only the visible nodes with their final styles.'],
        ['4. Layout (reflow)','The browser calculates the exact size and position of every box on the page.'],
        ['5. Paint','Pixels are drawn for text, colors, borders, shadows, images — onto separate layers.'],
        ['6. Composite','Layers are combined onto the screen, respecting z-order, transforms, and opacity.'],
      ].map(([t,d])=>`<div class="card"><h4>${t}</h4><p style="font-size:13px;margin:0;">${d}</p></div>`).join('')}
    </div>
  </div>
  <div class="callout tip"><b>Why this matters for performance:</b> changing <code>width</code>/<code>top</code>/<code>margin</code> triggers layout (expensive — recalculates the whole tree). Changing <code>transform</code>/<code>opacity</code> only triggers paint/composite (cheap — handled on the GPU). This is why animation performance guides always say "animate transform, not top/left."</div>
  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-how-css-works"></div>
`;
POST_RENDER['how-css-works'] = () => renderQuiz('quiz-how-css-works', HOW_CSS_WORKS_QUIZ);

/* ---------- BACKGROUNDS ---------- */
RENDERERS.backgrounds = () => `
  <p class="lede">The <code>background</code> shorthand controls color, image, position, size, repeat, and attachment — usually written as separate longhand properties for clarity.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>background-repeat</label><select id="bg-repeat" onchange="window.bgUpdate()"><option>repeat</option><option>no-repeat</option><option>repeat-x</option><option>repeat-y</option></select></div>
      <div class="ctrl"><label>background-size</label><select id="bg-size" onchange="window.bgUpdate()"><option>auto</option><option>cover</option><option>contain</option><option>60px</option></select></div>
      <div class="ctrl"><label>background-position</label><select id="bg-position" onchange="window.bgUpdate()"><option>center</option><option>top left</option><option>bottom right</option></select></div>
    </div>
    <div class="viz-stage"><div id="bg-box" style="width:260px;height:160px;border:1px solid var(--border);border-radius:8px;background-image:repeating-linear-gradient(45deg,var(--teal) 0 10px,var(--panel-raise) 10px 20px);"></div></div>
    <div class="code-out" id="bg-code">/* live CSS */</div>
  </div>
  <div class="grid-2">
    <div class="card"><h4>Multiple backgrounds</h4><p style="font-size:13px;margin:0;">Comma-separate values to layer several images: <code>background-image: url(a.png), url(b.png);</code> — the first listed is on top.</p></div>
    <div class="card"><h4>background-attachment</h4><p style="font-size:13px;margin:0;"><code>fixed</code> pins the background to the viewport (parallax effect); <code>scroll</code> (default) moves it with the page; <code>local</code> moves it with the element's own content.</p></div>
  </div>
  <div class="callout warn"><b>Common mistake:</b> forgetting a fallback <code>background-color</code> when using <code>background-image</code> — if the image fails to load, text can become unreadable against the default background.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-backgrounds"></div>
`;
POST_RENDER.backgrounds = () => {
  window.bgUpdate = function(){
    const repeat = document.getElementById('bg-repeat').value;
    const size = document.getElementById('bg-size').value;
    const position = document.getElementById('bg-position').value;
    const box = document.getElementById('bg-box');
    box.style.backgroundRepeat = repeat;
    box.style.backgroundSize = size;
    box.style.backgroundPosition = position;
    document.getElementById('bg-code').textContent = `background-repeat: ${repeat};\nbackground-size: ${size};\nbackground-position: ${position};`;
  };
  window.bgUpdate();
  renderQuiz('quiz-backgrounds', BACKGROUNDS_QUIZ);
};

/* ---------- BORDERS ---------- */
RENDERERS.borders = () => `
  <p class="lede"><code>border</code> is shorthand for width, style, and color. <code>border-radius</code> is one of the most-used properties in modern UI for rounding corners.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>border-width <span id="bd-w-val">4</span>px</label><input type="range" id="bd-w" min="0" max="12" value="4" oninput="window.bdUpdate()"></div>
      <div class="ctrl"><label>border-style</label><select id="bd-style" onchange="window.bdUpdate()"><option>solid</option><option>dashed</option><option>dotted</option><option>double</option><option>groove</option></select></div>
      <div class="ctrl"><label>border-radius <span id="bd-r-val">12</span>px</label><input type="range" id="bd-r" min="0" max="80" value="12" oninput="window.bdUpdate()"></div>
    </div>
    <div class="viz-stage"><div id="bd-box" style="width:140px;height:100px;border-color:var(--teal);background:var(--panel-raise);"></div></div>
    <div class="code-out" id="bd-code">/* live CSS */</div>
  </div>
  <div class="callout tip"><b>Pill / circle shortcuts:</b> <code>border-radius: 9999px</code> makes any box a pill shape; <code>border-radius: 50%</code> on a square makes a perfect circle.</div>
  <p style="font-size:13px;">Each corner and side can be set individually: <code>border-top-left-radius</code>, <code>border-right</code>, etc. — the shorthand always applies to all four unless overridden.</p>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-borders"></div>
`;
POST_RENDER.borders = () => {
  window.bdUpdate = function(){
    const w = document.getElementById('bd-w').value;
    const style = document.getElementById('bd-style').value;
    const r = document.getElementById('bd-r').value;
    document.getElementById('bd-w-val').textContent = w;
    document.getElementById('bd-r-val').textContent = r;
    const box = document.getElementById('bd-box');
    box.style.borderWidth = w+'px'; box.style.borderStyle = style; box.style.borderRadius = r+'px';
    document.getElementById('bd-code').textContent = `border: ${w}px ${style} teal;\nborder-radius: ${r}px;`;
  };
  window.bdUpdate();
  renderQuiz('quiz-borders', BORDERS_QUIZ);
};

/* ---------- OUTLINE ---------- */
RENDERERS.outline = () => `
  <p class="lede">Outline looks similar to border but behaves very differently: it doesn't take up layout space, can't have per-side values, and is the backbone of accessible keyboard-focus indication.</p>
  <div class="grid-2">
    <div class="card"><h4>border</h4><p style="font-size:13px;margin:0;">Part of the box model — affects layout size (unless border-box). Can be styled per-side.</p></div>
    <div class="card"><h4>outline</h4><p style="font-size:13px;margin:0;">Drawn outside the border box, doesn't affect layout at all, always applies to all four sides equally.</p></div>
  </div>
  <div class="viz-panel">
    <div class="viz-stage"><button id="outline-btn" style="padding:12px 22px;border-radius:8px;border:1px solid var(--border);background:var(--panel-raise);color:var(--text);font-size:14px;">Tab to me, or click</button></div>
    <div class="code-out">button:focus-visible {\n  outline: 3px solid var(--teal);\n  outline-offset: 3px;\n}</div>
  </div>
  <div class="callout warn"><b>Never do this:</b> <code>* { outline: none; }</code> — it silently removes keyboard focus indication for every element on the page, which is a serious accessibility failure. Use <code>:focus-visible</code> to style focus rings for keyboard users without showing them on mouse clicks.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-outline"></div>
`;
POST_RENDER.outline = () => renderQuiz('quiz-outline', OUTLINE_QUIZ);

/* ---------- TYPOGRAPHY ---------- */
RENDERERS.typography = () => `
  <p class="lede">Font choices and spacing carry more of a design's "feel" than almost any other CSS decision.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>font-family</label><select id="tg-family" onchange="window.tgUpdate()"><option value="'Space Grotesk',sans-serif">Space Grotesk (display)</option><option value="'Inter',sans-serif">Inter (body)</option><option value="'JetBrains Mono',monospace">JetBrains Mono (code)</option><option value="Georgia,serif">Georgia (serif)</option></select></div>
      <div class="ctrl"><label>font-weight</label><select id="tg-weight" onchange="window.tgUpdate()"><option>400</option><option>500</option><option>600</option><option>700</option></select></div>
      <div class="ctrl"><label>line-height <span id="tg-lh-val">1.5</span></label><input type="range" id="tg-lh" min="1" max="2.4" step="0.1" value="1.5" oninput="window.tgUpdate()"></div>
      <div class="ctrl"><label>letter-spacing <span id="tg-ls-val">0</span>px</label><input type="range" id="tg-ls" min="-1" max="6" step="0.5" value="0" oninput="window.tgUpdate()"></div>
    </div>
    <div class="viz-stage" style="align-items:flex-start;"><p id="tg-sample" style="margin:0;color:var(--text);font-size:15px;">The quick brown fox jumps over the lazy dog. Good typography makes a page easy to scan and read at any size.</p></div>
    <div class="code-out" id="tg-code">/* live CSS */</div>
  </div>
  <div class="callout tip"><b>Font stacks:</b> always list fallbacks — <code>font-family: 'Inter', -apple-system, Segoe UI, sans-serif;</code> — so the page still looks reasonable before a web font finishes loading, or if it fails.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-typography"></div>
`;
POST_RENDER.typography = () => {
  window.tgUpdate = function(){
    const family = document.getElementById('tg-family').value;
    const weight = document.getElementById('tg-weight').value;
    const lh = document.getElementById('tg-lh').value;
    const ls = document.getElementById('tg-ls').value;
    document.getElementById('tg-lh-val').textContent = lh;
    document.getElementById('tg-ls-val').textContent = ls;
    const sample = document.getElementById('tg-sample');
    sample.style.fontFamily = family; sample.style.fontWeight = weight; sample.style.lineHeight = lh; sample.style.letterSpacing = ls+'px';
    document.getElementById('tg-code').textContent = `font-family: ${family};\nfont-weight: ${weight};\nline-height: ${lh};\nletter-spacing: ${ls}px;`;
  };
  window.tgUpdate();
  renderQuiz('quiz-typography', TYPOGRAPHY_QUIZ);
};

/* ---------- TEXT ---------- */
RENDERERS.text = () => `
  <p class="lede">Text properties control alignment, case, decoration, wrapping, and truncation.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>text-align</label><select id="tx-align" onchange="window.txUpdate()"><option>left</option><option>center</option><option>right</option><option>justify</option></select></div>
      <div class="ctrl"><label>text-transform</label><select id="tx-transform" onchange="window.txUpdate()"><option>none</option><option>uppercase</option><option>lowercase</option><option>capitalize</option></select></div>
      <div class="ctrl"><label>text-decoration</label><select id="tx-decoration" onchange="window.txUpdate()"><option>none</option><option>underline</option><option>line-through</option><option>overline</option></select></div>
    </div>
    <div class="viz-stage" style="align-items:flex-start;"><p id="tx-sample" style="margin:0;color:var(--text);width:100%;">this text demonstrates alignment, case transform, and decoration together.</p></div>
    <div class="code-out" id="tx-code">/* live CSS */</div>
  </div>
  <h2>The ellipsis truncation trio</h2>
  <div class="viz-panel">
    <div class="viz-stage" style="justify-content:flex-start;"><div style="width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:1px solid var(--border);padding:8px 10px;color:var(--text);">This sentence is intentionally far too long to fit</div></div>
    <div class="code-out">white-space: nowrap;\noverflow: hidden;\ntext-overflow: ellipsis;</div>
  </div>
  <div class="callout">All three properties above are required together — leaving out any one of them and the ellipsis truncation won't work.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-text"></div>
`;
POST_RENDER.text = () => {
  window.txUpdate = function(){
    const align = document.getElementById('tx-align').value;
    const transform = document.getElementById('tx-transform').value;
    const decoration = document.getElementById('tx-decoration').value;
    const sample = document.getElementById('tx-sample');
    sample.style.textAlign = align; sample.style.textTransform = transform; sample.style.textDecoration = decoration;
    document.getElementById('tx-code').textContent = `text-align: ${align};\ntext-transform: ${transform};\ntext-decoration: ${decoration};`;
  };
  window.txUpdate();
  renderQuiz('quiz-text', TEXT_QUIZ);
};

/* ---------- SHADOWS ---------- */
RENDERERS.shadows = () => `
  <p class="lede"><code>box-shadow</code> syntax is <code>offset-x | offset-y | blur | spread | color</code> — an inset keyword flips it inward.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>offset-x <span id="sh-x-val">0</span>px</label><input type="range" id="sh-x" min="-30" max="30" value="0" oninput="window.shUpdate()"></div>
      <div class="ctrl"><label>offset-y <span id="sh-y-val">10</span>px</label><input type="range" id="sh-y" min="-30" max="30" value="10" oninput="window.shUpdate()"></div>
      <div class="ctrl"><label>blur <span id="sh-blur-val">25</span>px</label><input type="range" id="sh-blur" min="0" max="60" value="25" oninput="window.shUpdate()"></div>
      <div class="ctrl"><label>spread <span id="sh-spread-val">0</span>px</label><input type="range" id="sh-spread" min="-10" max="20" value="0" oninput="window.shUpdate()"></div>
      <div class="ctrl"><label>inset</label><select id="sh-inset" onchange="window.shUpdate()"><option value="">outer</option><option value="inset">inset</option></select></div>
    </div>
    <div class="viz-stage"><div id="sh-box" style="width:120px;height:80px;border-radius:10px;background:var(--panel-raise);"></div></div>
    <div class="code-out" id="sh-code">/* live CSS */</div>
  </div>
  <div class="callout tip"><b>Layered shadows:</b> comma-separate multiple shadows for realistic depth — e.g. a tight dark shadow plus a soft diffuse one, which is how most design systems build elevation levels.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-shadows"></div>
`;
POST_RENDER.shadows = () => {
  window.shUpdate = function(){
    const x = document.getElementById('sh-x').value, y = document.getElementById('sh-y').value;
    const blur = document.getElementById('sh-blur').value, spread = document.getElementById('sh-spread').value;
    const inset = document.getElementById('sh-inset').value;
    ['sh-x-val','sh-y-val','sh-blur-val','sh-spread-val'].forEach((id,i)=>{
      document.getElementById(id).textContent = [x,y,blur,spread][i];
    });
    const teal = getComputedStyle(document.body).getPropertyValue('--teal').trim() || '#5EEAD4';
    const val = `${inset} ${x}px ${y}px ${blur}px ${spread}px ${teal}88`.trim();
    document.getElementById('sh-box').style.boxShadow = val;
    document.getElementById('sh-code').textContent = `box-shadow: ${val};`;
  };
  window.shUpdate();
  renderQuiz('quiz-shadows', SHADOWS_QUIZ);
};

/* ---------- GRADIENTS ---------- */
RENDERERS.gradients = () => `
  <p class="lede">Gradients are CSS <code>image</code> values — used anywhere a background-image can go. The three main types are linear, radial, and conic.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>type</label><select id="gr-type" onchange="window.grUpdate()"><option>linear-gradient</option><option>radial-gradient</option><option>conic-gradient</option></select></div>
      <div class="ctrl"><label>angle / shape <span id="gr-angle-val">90</span>°</label><input type="range" id="gr-angle" min="0" max="360" value="90" oninput="window.grUpdate()"></div>
    </div>
    <div class="viz-stage"><div id="gr-box" style="width:260px;height:150px;border-radius:12px;"></div></div>
    <div class="code-out" id="gr-code">/* live CSS */</div>
  </div>
  <div class="grid-2">
    <div class="card"><h4>linear-gradient</h4><p style="font-size:13px;margin:0;">Colors blend along a straight line at a given angle — <code>linear-gradient(90deg, teal, amber)</code>.</p></div>
    <div class="card"><h4>radial-gradient</h4><p style="font-size:13px;margin:0;">Colors radiate outward from a center point — good for spotlight/glow effects.</p></div>
    <div class="card"><h4>conic-gradient</h4><p style="font-size:13px;margin:0;">Colors sweep around a center point like a color wheel — used for pie charts and loading spinners.</p></div>
    <div class="card"><h4>Text gradients</h4><p style="font-size:13px;margin:0;"><code>background: linear-gradient(...); background-clip: text; color: transparent;</code> clips a gradient to text shape.</p></div>
  </div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-gradients"></div>
`;
POST_RENDER.gradients = () => {
  window.grUpdate = function(){
    const type = document.getElementById('gr-type').value;
    const angle = document.getElementById('gr-angle').value;
    document.getElementById('gr-angle-val').textContent = angle;
    const teal = getComputedStyle(document.body).getPropertyValue('--teal').trim() || '#5EEAD4';
    const amber = getComputedStyle(document.body).getPropertyValue('--amber').trim() || '#F5A623';
    let css;
    if(type==='linear-gradient') css = `linear-gradient(${angle}deg, ${teal}, ${amber})`;
    else if(type==='radial-gradient') css = `radial-gradient(circle at ${angle/3.6}% 50%, ${teal}, ${amber})`;
    else css = `conic-gradient(from ${angle}deg, ${teal}, ${amber}, ${teal})`;
    document.getElementById('gr-box').style.background = css;
    document.getElementById('gr-code').textContent = `background: ${css};`;
  };
  window.grUpdate();
  renderQuiz('quiz-gradients', GRADIENTS_QUIZ);
};

/* ---------- FILTERS ---------- */
RENDERERS.filters = () => `
  <p class="lede"><code>filter</code> applies graphical effects — blur, brightness, contrast, grayscale, and more — directly to an element and everything inside it.</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>blur <span id="fl-blur-val">0</span>px</label><input type="range" id="fl-blur" min="0" max="10" value="0" oninput="window.flUpdate()"></div>
      <div class="ctrl"><label>brightness <span id="fl-bright-val">100</span>%</label><input type="range" id="fl-bright" min="0" max="200" value="100" oninput="window.flUpdate()"></div>
      <div class="ctrl"><label>grayscale <span id="fl-gray-val">0</span>%</label><input type="range" id="fl-gray" min="0" max="100" value="0" oninput="window.flUpdate()"></div>
      <div class="ctrl"><label>hue-rotate <span id="fl-hue-val">0</span>deg</label><input type="range" id="fl-hue" min="0" max="360" value="0" oninput="window.flUpdate()"></div>
    </div>
    <div class="viz-stage"><div id="fl-box" style="width:160px;height:110px;border-radius:10px;background:linear-gradient(135deg,var(--teal),var(--amber));"></div></div>
    <div class="code-out" id="fl-code">/* live CSS */</div>
  </div>
  <div class="callout tip"><b>filter vs backdrop-filter:</b> <code>filter</code> affects the element itself; <code>backdrop-filter</code> (next chapter) affects whatever is <i>behind</i> a transparent element.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-filters"></div>
`;
POST_RENDER.filters = () => {
  window.flUpdate = function(){
    const blur = document.getElementById('fl-blur').value, bright = document.getElementById('fl-bright').value;
    const gray = document.getElementById('fl-gray').value, hue = document.getElementById('fl-hue').value;
    document.getElementById('fl-blur-val').textContent = blur;
    document.getElementById('fl-bright-val').textContent = bright;
    document.getElementById('fl-gray-val').textContent = gray;
    document.getElementById('fl-hue-val').textContent = hue;
    const val = `blur(${blur}px) brightness(${bright}%) grayscale(${gray}%) hue-rotate(${hue}deg)`;
    document.getElementById('fl-box').style.filter = val;
    document.getElementById('fl-code').textContent = `filter: ${val};`;
  };
  window.flUpdate();
  renderQuiz('quiz-filters', FILTERS_QUIZ);
};

/* ---------- BACKDROP FILTER ---------- */
RENDERERS['backdrop-filter'] = () => `
  <p class="lede"><code>backdrop-filter</code> blurs or adjusts whatever sits <i>behind</i> a semi-transparent element — this is the "frosted glass" effect used throughout modern OS and app UI (glassmorphism).</p>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>backdrop-blur <span id="bdf-val">8</span>px</label><input type="range" id="bdf-blur" min="0" max="24" value="8" oninput="window.bdfUpdate()"></div>
    </div>
    <div class="viz-stage" style="position:relative;background:repeating-linear-gradient(45deg,var(--teal) 0 14px,var(--amber) 14px 28px);border-radius:10px;overflow:hidden;">
      <div id="bdf-glass" style="position:absolute;top:30px;left:40px;right:40px;bottom:30px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-code);">glass panel</div>
    </div>
    <div class="code-out" id="bdf-code">/* live CSS */</div>
  </div>
  <div class="callout warn"><b>Performance note:</b> backdrop-filter is expensive to render — the browser has to recompute the blur every time anything behind it moves or repaints. Use it sparingly (nav bars, modals), not on large scrolling areas.</div>
  <h2>Quick knowledge check</h2><div class="quiz-box" id="quiz-backdrop-filter"></div>
`;
POST_RENDER['backdrop-filter'] = () => {
  window.bdfUpdate = function(){
    const blur = document.getElementById('bdf-blur').value;
    document.getElementById('bdf-val').textContent = blur;
    const el = document.getElementById('bdf-glass');
    el.style.backdropFilter = `blur(${blur}px)`;
    el.style.webkitBackdropFilter = `blur(${blur}px)`;
    document.getElementById('bdf-code').textContent = `backdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px); /* Safari */`;
  };
  window.bdfUpdate();
  renderQuiz('quiz-backdrop-filter', BACKDROP_FILTER_QUIZ);
};

/* ---------- BOX MODEL LAB ---------- */
RENDERERS['box-model'] = () => `
  <p class="lede">Every element in CSS is a rectangular box made of four layers: content, padding, border, and margin. Understanding how they stack — and how <code>box-sizing</code> changes the math — is the single most interview-tested CSS concept.</p>

  <h2>Interactive visualizer</h2>
  <p>Drag the sliders. The diagram below is live CSS, not an image.</p>

  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>content width <span id="bm-w-val">140</span>px</label><input type="range" id="bm-w" min="60" max="220" value="140" oninput="window.bmUpdate()"></div>
      <div class="ctrl"><label>content height <span id="bm-h-val">70</span>px</label><input type="range" id="bm-h" min="40" max="160" value="70" oninput="window.bmUpdate()"></div>
      <div class="ctrl"><label>padding <span id="bm-p-val">20</span>px</label><input type="range" id="bm-p" min="0" max="40" value="20" oninput="window.bmUpdate()"></div>
      <div class="ctrl"><label>border <span id="bm-b-val">6</span>px</label><input type="range" id="bm-b" min="0" max="20" value="6" oninput="window.bmUpdate()"></div>
      <div class="ctrl"><label>margin <span id="bm-m-val">24</span>px</label><input type="range" id="bm-m" min="0" max="50" value="24" oninput="window.bmUpdate()"></div>
      <div class="ctrl"><label>box-sizing</label>
        <select id="bm-sizing" onchange="window.bmUpdate()">
          <option value="content-box">content-box (default)</option>
          <option value="border-box">border-box</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div class="bm-margin" style="--m:24px;">
        <span class="bm-label" style="color:var(--amber)">margin</span>
        <div class="bm-border" style="padding:6px;">
          <span class="bm-label" style="color:var(--rose)">border</span>
          <div class="bm-padding" style="padding:20px;">
            <span class="bm-label" style="color:var(--teal)">padding</span>
            <div class="bm-content" id="bm-content-box" style="width:140px;height:70px;">140 × 70</div>
          </div>
        </div>
      </div>
    </div>
    <div class="code-out" id="bm-code">/* live CSS */</div>
  </div>

  <h2>content-box vs. border-box</h2>
  <p>This is the box model detail that trips people up most in interviews and in real layouts:</p>
  <div class="grid-2">
    <div class="card">
      <h4>content-box <span class="tag" style="margin-left:6px;">default</span></h4>
      <p style="font-size:13px;margin:0;"><code>width</code>/<code>height</code> apply to the <b style="color:var(--text)">content only</b>. Padding and border are added <i>on top</i>, so the rendered box is always bigger than the width you set.</p>
    </div>
    <div class="card">
      <h4>border-box <span class="tag teal" style="margin-left:6px;">recommended</span></h4>
      <p style="font-size:13px;margin:0;"><code>width</code>/<code>height</code> include padding and border. The box you set is the box you get — this is why most CSS resets apply <code>box-sizing: border-box</code> globally.</p>
    </div>
  </div>
  <div class="callout"><b>Global reset most teams use:</b><br><code>* { box-sizing: border-box; }</code></div>

  <h2>Margin collapsing</h2>
  <p>Vertical margins between adjacent block-level siblings <b>collapse</b> — the larger margin wins rather than the two adding together. This only happens to top/bottom margins in normal flow, never to horizontal margins, and it's disabled by padding, borders, flex/grid contexts, or <code>overflow</code> other than <code>visible</code> on the parent.</p>

  <div class="callout warn"><b>Common interview trap:</b> "If box A has <code>margin-bottom: 20px</code> and box B has <code>margin-top: 30px</code>, the gap between them is <b>30px</b>, not 50px" — because the larger of the two collapses into a single margin.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-box-model"></div>
`;
POST_RENDER['box-model'] = () => {
  window.bmUpdate = function(){
    const w = document.getElementById('bm-w').value;
    const h = document.getElementById('bm-h').value;
    const p = document.getElementById('bm-p').value;
    const b = document.getElementById('bm-b').value;
    const m = document.getElementById('bm-m').value;
    const sizing = document.getElementById('bm-sizing').value;
    document.getElementById('bm-w-val').textContent = w;
    document.getElementById('bm-h-val').textContent = h;
    document.getElementById('bm-p-val').textContent = p;
    document.getElementById('bm-b-val').textContent = b;
    document.getElementById('bm-m-val').textContent = m;

    const marginEl = document.querySelector('.bm-margin');
    const borderEl = document.querySelector('.bm-border');
    const paddingEl = document.querySelector('.bm-padding');
    const contentEl = document.getElementById('bm-content-box');

    marginEl.style.setProperty('--m', m+'px');
    marginEl.style.padding = m+'px';
    borderEl.style.borderWidth = b+'px';
    paddingEl.style.padding = p+'px';

    let renderedW, renderedH;
    if(sizing === 'border-box'){
      renderedW = Math.max(0, w - 2*p - 2*b);
      renderedH = Math.max(0, h - 2*p - 2*b);
    } else {
      renderedW = +w; renderedH = +h;
    }
    contentEl.style.width = renderedW+'px';
    contentEl.style.height = renderedH+'px';
    contentEl.textContent = renderedW+' × '+renderedH;

    const totalW = sizing==='border-box' ? +w + 2*m : +w + 2*p + 2*b + 2*m;
    const totalH = sizing==='border-box' ? +h + 2*m : +h + 2*p + 2*b + 2*m;

    document.getElementById('bm-code').innerHTML = `.box {
  width: ${w}px;
  height: ${h}px;
  padding: ${p}px;
  border: ${b}px solid;
  margin: ${m}px;
  box-sizing: ${sizing};
}
/* total rendered footprint: ${totalW}px × ${totalH}px */`;
  };
  window.bmUpdate();
  renderQuiz('quiz-box-model', BOX_MODEL_QUIZ);
};

/* ---------- FLEXBOX LAB ---------- */
RENDERERS.flexbox = () => `
  <p class="lede">Flexbox lays out children along one axis at a time. Change any control below and watch the live container — the generated CSS updates alongside it.</p>

  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>flex-direction</label>
        <select id="fx-direction" onchange="window.fxUpdate()">
          <option>row</option><option>row-reverse</option><option>column</option><option>column-reverse</option>
        </select></div>
      <div class="ctrl"><label>justify-content</label>
        <select id="fx-justify" onchange="window.fxUpdate()">
          <option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option><option>space-evenly</option>
        </select></div>
      <div class="ctrl"><label>align-items</label>
        <select id="fx-align" onchange="window.fxUpdate()">
          <option>stretch</option><option>flex-start</option><option>center</option><option>flex-end</option><option>baseline</option>
        </select></div>
      <div class="ctrl"><label>flex-wrap</label>
        <select id="fx-wrap" onchange="window.fxUpdate()">
          <option>nowrap</option><option>wrap</option><option>wrap-reverse</option>
        </select></div>
      <div class="ctrl"><label>gap <span id="fx-gap-val">12</span>px</label><input type="range" id="fx-gap" min="0" max="40" value="12" oninput="window.fxUpdate()"></div>
      <div class="ctrl"><label>items <span id="fx-count-val">5</span></label><input type="range" id="fx-count" min="2" max="9" value="5" oninput="window.fxUpdate()"></div>
    </div>
    <div class="viz-stage" style="min-height:220px;">
      <div id="fx-stage" style="display:flex; width:100%; height:220px; border:1px dashed var(--border);"></div>
    </div>
    <div class="code-out" id="fx-code">/* live CSS */</div>
  </div>

  <h2>The two axes</h2>
  <p>Flexbox always has a <b style="color:var(--text)">main axis</b> (direction of <code>flex-direction</code>) and a <b style="color:var(--text)">cross axis</b> (perpendicular). <code>justify-content</code> works along the main axis; <code>align-items</code> works along the cross axis. This flips when you switch from <code>row</code> to <code>column</code> — a very common interview gotcha.</p>

  <div class="grid-2">
    <div class="card"><h4>Container properties</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">display, flex-direction, flex-wrap, justify-content, align-items, align-content, gap</p>
    </div>
    <div class="card"><h4>Item properties</h4>
      <p style="font-size:13px;margin:0;font-family:var(--font-code);">order, flex-grow, flex-shrink, flex-basis, flex (shorthand), align-self</p>
    </div>
  </div>

  <div class="callout"><b>flex: 1</b> is shorthand for <code>flex-grow: 1; flex-shrink: 1; flex-basis: 0%</code> — it means "grow to fill available space, ignoring your content's natural size." This is the single most common flex shorthand you'll see in real codebases.</div>
`;
POST_RENDER.flexbox = () => {
  window.fxUpdate = function(){
    const dir = document.getElementById('fx-direction').value;
    const justify = document.getElementById('fx-justify').value;
    const align = document.getElementById('fx-align').value;
    const wrap = document.getElementById('fx-wrap').value;
    const gap = document.getElementById('fx-gap').value;
    const count = +document.getElementById('fx-count').value;
    document.getElementById('fx-gap-val').textContent = gap;
    document.getElementById('fx-count-val').textContent = count;

    const stage = document.getElementById('fx-stage');
    stage.style.flexDirection = dir;
    stage.style.justifyContent = justify;
    stage.style.alignItems = align;
    stage.style.flexWrap = wrap;
    stage.style.gap = gap+'px';
    stage.style.padding = '14px';
    stage.innerHTML = '';
    for(let i=1;i<=count;i++){
      const d = document.createElement('div');
      d.className = 'lab-item';
      const size = 34 + (i%3)*14;
      d.style.width = size+'px'; d.style.height = size+'px';
      d.textContent = i;
      stage.appendChild(d);
    }
    document.getElementById('fx-code').innerHTML = `.container {
  display: flex;
  flex-direction: ${dir};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;
  };
  window.fxUpdate();
};

/* ---------- GRID LAB ---------- */
RENDERERS.grid = () => `
  <p class="lede">Grid lays out children on both axes at once. Try the presets, or type your own <code>grid-template-columns</code> value.</p>

  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>columns preset</label>
        <select id="gd-preset" onchange="window.gdPreset()">
          <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
          <option value="repeat(auto-fit, minmax(100px, 1fr))">auto-fit, minmax(100px, 1fr)</option>
          <option value="repeat(auto-fill, minmax(80px, 1fr))">auto-fill, minmax(80px, 1fr)</option>
          <option value="1fr 2fr 1fr">1fr 2fr 1fr</option>
          <option value="custom">custom…</option>
        </select></div>
      <div class="ctrl"><label>grid-template-columns</label><input type="text" id="gd-cols" value="repeat(3, 1fr)" oninput="window.gdUpdate()"></div>
      <div class="ctrl"><label>gap <span id="gd-gap-val">10</span>px</label><input type="range" id="gd-gap" min="0" max="30" value="10" oninput="window.gdUpdate()"></div>
      <div class="ctrl"><label>place-items</label>
        <select id="gd-place" onchange="window.gdUpdate()">
          <option>stretch</option><option>center</option><option>start</option><option>end</option>
        </select></div>
      <div class="ctrl"><label>items <span id="gd-count-val">8</span></label><input type="range" id="gd-count" min="2" max="14" value="8" oninput="window.gdUpdate()"></div>
    </div>
    <div class="viz-stage" style="min-height:220px;">
      <div id="gd-stage" style="display:grid; width:100%; min-height:200px; border:1px dashed var(--border); padding:14px;"></div>
    </div>
    <div class="code-out" id="gd-code">/* live CSS */</div>
  </div>

  <h2>fr, minmax(), and auto-fit vs auto-fill</h2>
  <p>The <code>fr</code> unit distributes remaining free space proportionally. <code>minmax(100px, 1fr)</code> means "never smaller than 100px, but grow to fill available space." The difference between <code>auto-fit</code> and <code>auto-fill</code> only shows up when there aren't enough items to fill a row: <code>auto-fit</code> collapses the empty tracks so existing items stretch to fill the row; <code>auto-fill</code> keeps the empty tracks reserved.</p>

  <div class="callout tip"><b>Interview one-liner:</b> "Grid is for two-dimensional layout (rows and columns together); Flexbox is for one-dimensional layout (a single row or column that may wrap)."</div>
`;
POST_RENDER.grid = () => {
  window.gdPreset = function(){
    const preset = document.getElementById('gd-preset').value;
    if(preset !== 'custom') document.getElementById('gd-cols').value = preset;
    window.gdUpdate();
  };
  window.gdUpdate = function(){
    const cols = document.getElementById('gd-cols').value;
    const gap = document.getElementById('gd-gap').value;
    const place = document.getElementById('gd-place').value;
    const count = +document.getElementById('gd-count').value;
    document.getElementById('gd-gap-val').textContent = gap;
    document.getElementById('gd-count-val').textContent = count;

    const stage = document.getElementById('gd-stage');
    stage.style.gridTemplateColumns = cols;
    stage.style.gap = gap+'px';
    stage.style.placeItems = place;
    stage.innerHTML = '';
    for(let i=1;i<=count;i++){
      const d = document.createElement('div');
      d.className = 'lab-item';
      d.style.width='100%'; d.style.height = place==='stretch' ? '44px' : '40px';
      d.textContent = i;
      stage.appendChild(d);
    }
    document.getElementById('gd-code').innerHTML = `.container {
  display: grid;
  grid-template-columns: ${cols};
  gap: ${gap}px;
  place-items: ${place};
}`;
  };
  window.gdUpdate();
};

/* ---------- FREE PLAYGROUND ---------- */
RENDERERS.playground = () => `
  <div class="empty-state">
    <h4>Free Playground</h4>
    <p>The full HTML + CSS + Preview sandbox lands in Phase 6 (Shared Playground), built on top of the
    single-pane engine already running every other lesson's live demos.</p>
  </div>
`;
const PG_DEFAULT_HTML = `<div class="card">
  <h2>Hello, CSS</h2>
  <p>Edit the CSS panel — this updates live.</p>
  <button>Click me</button>
</div>`;
const PG_DEFAULT_CSS = `body{
  margin:0; min-height:100vh; display:flex;
  align-items:center; justify-content:center;
  background:#0B0D12; font-family:sans-serif;
}
.card{
  background:#171B24; border:1px solid #262B36; border-radius:14px;
  padding:28px; color:#E7E9EE; max-width:280px; text-align:center;
}
.card h2{ color:#5EEAD4; margin-top:0; }
.card button{
  margin-top:10px; padding:8px 16px; border-radius:8px; border:none;
  background:#5EEAD4; color:#04211D; font-weight:700; cursor:pointer;
}`;
function syncGutter(taId, gutterId){
  const ta = document.getElementById(taId);
  const gutter = document.getElementById(gutterId);
  const lines = ta.value.split('\n').length;
  gutter.innerHTML = Array.from({length:lines},(_,i)=>i+1).join('<br>');
  ta.onscroll = () => gutter.scrollTop = ta.scrollTop;
}
let pgDebounce;
function pgOnInput(which){
  syncGutter(which==='html'?'pgHtml':'pgCss', which==='html'?'pgGutterHtml':'pgGutterCss');
  clearTimeout(pgDebounce);
  pgDebounce = setTimeout(pgRun, 250);
}
function pgRun(){
  const html = document.getElementById('pgHtml').value;
  const css = document.getElementById('pgCss').value;
  localStorage.setItem('css_academy_pg_html', html);
  localStorage.setItem('css_academy_pg_css', css);
  const doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
  document.getElementById('pgFrame').srcdoc = doc;
}
function pgReset(){
  document.getElementById('pgHtml').value = PG_DEFAULT_HTML;
  document.getElementById('pgCss').value = PG_DEFAULT_CSS;
  syncGutter('pgHtml','pgGutterHtml'); syncGutter('pgCss','pgGutterCss');
  pgRun();
}
function pgCopy(){
  navigator.clipboard.writeText(document.getElementById('pgCss').value);
}
function pgDownload(){
  const html = document.getElementById('pgHtml').value;
  const css = document.getElementById('pgCss').value;
  const blob = new Blob([`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`],{type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'playground.html'; a.click();
}
function pgFullscreen(){
  document.querySelector('.content').classList.toggle('fullscreen');
}

/* ============================================================
   QUIZ ENGINE (generic, reusable across chapters)
============================================================ */
const HOW_CSS_WORKS_QUIZ = [
  {q:"What does the browser combine to build the render tree?", opts:["DOM + CSSOM", "HTML + JS", "CSSOM only", "DOM + JS"], correct:0},
  {q:"Which of these triggers a full layout (reflow)?", opts:["opacity", "transform", "width", "filter"], correct:2},
  {q:"Why do performance guides recommend animating transform/opacity?", opts:["They look nicer","They skip layout and are handled cheaply via paint/composite on the GPU","They're the only animatable properties","They work in older browsers"], correct:1},
  {q:"Which stage comes right after Layout?", opts:["Parse HTML","Paint","Parse CSS","Composite"], correct:1},
  {q:"The render tree contains:", opts:["Every DOM node including hidden ones","Only visible nodes with computed styles","Only CSS rules","Only JavaScript-created elements"], correct:1},
];
const SELECTORS_QUIZ = [
  {q:"What does `div > p` select?", opts:["Any <p> inside a <div>, any depth","Only <p> that are direct children of a <div>","The <p> immediately after a <div>","Every <p> sibling after a <div>"], correct:1},
  {q:"What's the difference between `.a.b` and `.a .b`?", opts:["No difference","`.a.b` is one element with both classes; `.a .b` is a `.b` descendant inside `.a`","`.a .b` is invalid CSS","`.a.b` only works with IDs"], correct:1},
  {q:"Which selector always contributes zero specificity?", opts:[":is()", ":where()", ":has()", ":not()"], correct:1},
  {q:"Which selects a <p> immediately following an <h2>, same parent?", opts:["h2 ~ p", "h2 + p", "h2 > p", "h2 p"], correct:1},
  {q:"`[class^=\"btn-\"]` selects elements whose class:", opts:["Contains 'btn-' anywhere", "Starts with 'btn-'", "Ends with 'btn-'", "Equals exactly 'btn-'"], correct:1},
];
const SPECIFICITY_QUIZ = [
  {q:"What is the specificity triplet order?", opts:["(elements, classes, IDs)", "(IDs, classes/attrs/pseudo-classes, elements)", "(classes, IDs, elements)", "Alphabetical"], correct:1},
  {q:"Does !important increase specificity?", opts:["Yes, it's the highest specificity tier","No — it overrides the cascade outside the normal specificity comparison","Only on IDs","Only in inline styles"], correct:1},
  {q:"If two selectors tie exactly on specificity, what decides the winner?", opts:["Alphabetical order","File size","Source order — the later rule wins","The shorter selector"], correct:2},
  {q:"How much specificity does `:where(.a, .b)` contribute?", opts:["The specificity of .a","Zero, always","The specificity of .b","Sum of .a and .b"], correct:1},
  {q:"Which has higher specificity: `#nav a` or `.nav .link.active`?", opts:["#nav a", ".nav .link.active", "They're equal", "Depends on source order"], correct:0},
];
const CASCADE_QUIZ = [
  {q:"What are the three main stages the cascade resolves through, in order?", opts:["Specificity → origin → source order","Origin/importance → specificity → source order","Source order → specificity → origin","Random"], correct:1},
  {q:"Between equal-specificity author rules, which wins?", opts:["The first one declared","The one declared later in the CSS","The shortest selector","Neither applies"], correct:1},
  {q:"Which origin generally has the final say, ignoring !important?", opts:["Browser default styles","User (browser settings) styles","Author (developer) styles","Print stylesheet"], correct:2},
  {q:"An author !important rule beats a user !important rule. True or false?", opts:["True","False — user !important outranks author !important"], correct:1},
  {q:"In devtools, a strikethrough CSS declaration means:", opts:["A syntax error","The cascade picked a competing declaration over this one","The property is deprecated","The file failed to load"], correct:1},
];
const INHERITANCE_QUIZ = [
  {q:"Which of these typically inherits by default?", opts:["margin", "color", "border", "width"], correct:1},
  {q:"Which keyword resets a property to its spec-defined default, ignoring the parent?", opts:["inherit", "initial", "unset", "revert"], correct:1},
  {q:"`unset` behaves like `inherit` when:", opts:["Never","The property naturally inherits by default","The property is a box-model property","Only inside flex containers"], correct:1},
  {q:"Which keyword rolls back to the browser's native default styling for that element?", opts:["initial", "revert", "unset", "inherit"], correct:1},
  {q:"Why don't box-model properties (margin, border) inherit by default?", opts:["Browser bug","So every nested box doesn't accidentally copy its parent's spacing/border","They can't technically inherit","They always equal 0"], correct:1},
];
const UNITS_QUIZ = [
  {q:"`rem` is always relative to:", opts:["The parent element's font-size","The root (<html>) element's font-size","The viewport width","The nearest positioned ancestor"], correct:1},
  {q:"Why can `em` be risky for nested spacing?", opts:["It's not supported in most browsers","It compounds — relative to each nested parent's font-size","It's always equal to px","It only works on text"], correct:1},
  {q:"`50vw` means:", opts:["50px","50% of the parent's width","50% of the viewport's width","50% of the root font-size"], correct:2},
  {q:"Which unit is grid-track-only and can't be used elsewhere?", opts:["ch", "fr", "vh", "rem"], correct:1},
  {q:"`max-width: 65ch` is commonly used to:", opts:["Limit paragraph line length for readability","Set a fixed pixel width","Force full-viewport width","Set image aspect ratio"], correct:0},
];
const COLORS_QUIZ = [
  {q:"In hsl(), the first value (hue) represents:", opts:["Brightness","A position on the color wheel, in degrees","Opacity","Saturation"], correct:1},
  {q:"Why might a team prefer HSL over hex for a design system?", opts:["HSL loads faster","Adjusting lightness alone creates hover/darker variants easily","Hex isn't supported in modern browsers","HSL is required for gradients"], correct:1},
  {q:"What does currentColor do?", opts:["Always resolves to black","Reuses the element's own `color` property value","Picks a random color","Only works with borders"], correct:1},
  {q:"Modern rgb() syntax `rgb(94 234 212 / 0.8)` — what does the `/ 0.8` control?", opts:["Saturation","Alpha (opacity)","Hue rotation","Line height"], correct:1},
  {q:"#5EEAD4CC — what does the trailing CC represent?", opts:["A typo","An 8-digit hex alpha (transparency) channel","A CSS variable reference","Nothing, hex only supports 6 digits"], correct:1},
];
const BACKGROUNDS_QUIZ = [
  {q:"How do you layer multiple background images on one element?", opts:["It's not possible","Comma-separate values in background-image", "Use multiple <img> tags instead","Use z-index"], correct:1},
  {q:"In a comma-separated list of background images, which one renders on top?", opts:["The last one listed","The first one listed","Whichever loads fastest","They're stacked randomly"], correct:1},
  {q:"background-attachment: fixed produces what effect?", opts:["The background scrolls with the page","The background stays pinned to the viewport (parallax-style)","The background is hidden","The background repeats infinitely"], correct:1},
  {q:"Why should you set a fallback background-color alongside background-image?", opts:["It's required by the CSS spec","So text stays readable if the image fails to load","It speeds up image loading","It's purely stylistic, no functional reason"], correct:1},
  {q:"background-size: cover does what?", opts:["Shrinks the image to fit without cropping","Scales the image to fully cover the box, cropping overflow","Tiles the image repeatedly","Centers the image without scaling"], correct:1},
];
const BORDERS_QUIZ = [
  {q:"border is shorthand for which three values?", opts:["top, right, bottom, left","width, style, color","radius, color, style","position, size, color"], correct:1},
  {q:"What border-radius value turns a square box into a perfect circle?", opts:["10px","50%","100px","0"], correct:1},
  {q:"What's a common shortcut for a fully pill-shaped button?", opts:["border-radius: 0","border-radius: 9999px (or any value ≥ half the height)","border: none","border-radius: 1px"], correct:1},
  {q:"Can each side of an element have a different border-radius?", opts:["No, it must be uniform","Yes — e.g. border-top-left-radius can differ from the others","Only in Firefox","Only with JavaScript"], correct:1},
  {q:"Which border-style value creates a dashed line?", opts:["solid","dotted","dashed","double"], correct:2},
];
const OUTLINE_QUIZ = [
  {q:"Does outline take up space in the box model layout, like border does?", opts:["Yes, identically to border","No — outline is drawn outside the box without affecting layout","Only in border-box mode","Only when it has a positive width"], correct:1},
  {q:"Can outline be styled with different values per side (like border-top vs border-left)?", opts:["Yes, exactly like border","No — outline always applies uniformly to all sides","Only in Chrome","Only with outline-side properties"], correct:1},
  {q:"Why is `* { outline: none; }` considered a serious accessibility mistake?", opts:["It slows down rendering","It removes visible keyboard focus indication for every element on the page","It breaks hover effects","It's not actually a mistake"], correct:1},
  {q:"Which pseudo-class lets you show a focus ring for keyboard users without showing it on mouse clicks?", opts:[":focus",":focus-visible",":active",":target"], correct:1},
  {q:"outline-offset controls:", opts:["The outline's color","The gap between the outline and the element's border edge","The outline's thickness","Whether the outline is dashed or solid"], correct:1},
];
const TYPOGRAPHY_QUIZ = [
  {q:"Why should font-family always list fallback fonts?", opts:["It's required syntax with no functional purpose","So the page still looks reasonable before/if the primary web font fails to load","It makes the CSS file smaller","It's only for older browsers"], correct:1},
  {q:"What does line-height primarily control?", opts:["The width of each character","The vertical spacing between lines of text","The font's weight","The color of the text"], correct:1},
  {q:"Increasing letter-spacing does what?", opts:["Adds space between lines","Adds space between individual characters","Changes the font weight","Changes the font family"], correct:1},
  {q:"A font-weight of 700 typically corresponds to:", opts:["Thin","Regular/normal","Bold","Extra light"], correct:2},
  {q:"Why might a design system use multiple font families (e.g. one for headings, one for body)?", opts:["It's required by CSS","To create visual hierarchy and reinforce a brand's personality","Browsers require at least two fonts","It has no real effect"], correct:1},
];
const TEXT_QUIZ = [
  {q:"Which three properties are all required together to truncate text with an ellipsis?", opts:["color, font-size, line-height","white-space: nowrap, overflow: hidden, text-overflow: ellipsis","text-align, text-transform, text-decoration","display: block, width, height"], correct:1},
  {q:"text-transform: capitalize does what?", opts:["Uppercases every letter","Uppercases the first letter of each word","Lowercases everything","Adds an underline"], correct:1},
  {q:"text-align: justify does what?", opts:["Centers text","Stretches each line so both edges align, except the last line","Right-aligns text only","Removes all spacing"], correct:1},
  {q:"Which text-decoration value adds a strikethrough effect?", opts:["underline","overline","line-through","none"], correct:2},
  {q:"If you set only overflow:hidden and text-overflow:ellipsis but forget white-space:nowrap, what happens?", opts:["It still works perfectly","The ellipsis won't appear because the text wraps onto multiple lines instead of overflowing horizontally","The text disappears entirely","Nothing renders at all"], correct:1},
];
const SHADOWS_QUIZ = [
  {q:"What is the correct order of values in box-shadow?", opts:["blur, spread, offset-x, offset-y, color","offset-x, offset-y, blur, spread, color","color, offset-x, offset-y, blur","spread, blur, offset-x, offset-y, color"], correct:1},
  {q:"What does the inset keyword do to a box-shadow?", opts:["Makes it larger","Flips the shadow to render inside the box instead of outside","Removes the blur","Changes its color to black"], correct:1},
  {q:"Why would a design system use multiple comma-separated shadows on one element?", opts:["It's not possible to use more than one","To combine a tight dark shadow with a soft diffuse one for realistic layered depth","To make the box bigger","Only for animation purposes"], correct:1},
  {q:"Which box-shadow value controls how much the shadow expands or shrinks before blurring?", opts:["offset-x","blur","spread","color"], correct:2},
  {q:"A negative offset-y value moves the shadow:", opts:["Downward","Upward","Left","Right"], correct:1},
];
const GRADIENTS_QUIZ = [
  {q:"Which gradient type blends colors along a straight line at a given angle?", opts:["radial-gradient","conic-gradient","linear-gradient","mesh-gradient"], correct:2},
  {q:"Which gradient type radiates outward from a center point, good for glow/spotlight effects?", opts:["linear-gradient","radial-gradient","conic-gradient","none of these"], correct:1},
  {q:"Which gradient type sweeps colors around a center point like a color wheel, used for pie charts?", opts:["linear-gradient","radial-gradient","conic-gradient","diagonal-gradient"], correct:2},
  {q:"How do you clip a gradient to the shape of text?", opts:["text-gradient: true;","background-clip: text; combined with color: transparent;","font-gradient property","It's not possible in CSS"], correct:1},
  {q:"In linear-gradient(90deg, teal, amber), what does 90deg control?", opts:["The blur amount","The direction the gradient flows","The opacity","The border-radius"], correct:1},
];
const FILTERS_QUIZ = [
  {q:"What does the CSS filter property affect?", opts:["Only text content","Graphical effects on the element and everything inside it","Only background images","Only SVG elements"], correct:1},
  {q:"Which filter function converts an element to black and white?", opts:["blur()","grayscale()","invert()","opacity()"], correct:1},
  {q:"What's the key difference between filter and backdrop-filter?", opts:["They're identical","filter affects the element itself; backdrop-filter affects what's behind a transparent element","backdrop-filter is deprecated","filter only works on images"], correct:1},
  {q:"Multiple filter functions in one declaration, like blur(4px) brightness(120%), apply:", opts:["Only the first one","Only the last one","All of them combined","Only in Firefox"], correct:2},
  {q:"hue-rotate(180deg) does what?", opts:["Rotates the element visually","Shifts all colors around the color wheel by 180 degrees","Blurs the element","Removes all color"], correct:1},
];
const BACKDROP_FILTER_QUIZ = [
  {q:"What does backdrop-filter blur, specifically?", opts:["The element's own content","Whatever is visually behind a semi-transparent element","The entire page","Only images"], correct:1},
  {q:"What visual effect is backdrop-filter most associated with?", opts:["Neon glow","Frosted glass / glassmorphism","Pixel art","Drop shadows"], correct:1},
  {q:"Why does the code example include -webkit-backdrop-filter alongside backdrop-filter?", opts:["It's a typo, only one is needed","For Safari compatibility, which requires the prefixed version","It doubles the blur strength","It's required by the CSS spec globally"], correct:1},
  {q:"Why is backdrop-filter called out as expensive performance-wise?", opts:["It isn't expensive at all","The browser must recompute the blur whenever content behind it repaints or moves","It only works with JavaScript","It requires a network request"], correct:1},
  {q:"For backdrop-filter's frosted-glass effect to be visible, the element itself typically needs:", opts:["A fully opaque background","Some transparency (e.g. rgba background) so what's behind it shows through","No background at all","A fixed position only"], correct:1},
];
const BOX_MODEL_QUIZ = [
  {q:"By default, does setting width:200px include padding and border?", opts:["Yes, always","No — that's content-box behavior","Only in Firefox","Only with box-sizing: border-box"], correct:1},
  {q:"Two stacked divs have margin-bottom:10px and margin-top:30px. What's the gap between them?", opts:["40px","10px","30px","20px"], correct:2},
  {q:"Which box-sizing value makes width include padding and border?", opts:["content-box","padding-box","border-box","inherit"], correct:2},
  {q:"Which layer sits directly outside the border in the box model?", opts:["Padding","Margin","Outline","Content"], correct:1},
  {q:"Margin collapsing applies to:", opts:["Horizontal margins only","Vertical margins between block siblings","All margins in flex containers","Margins on inline elements"], correct:1},
];
const DISPLAY_QUIZ = [
  {q:"Which display value takes an element out of the document entirely, generating no box?", opts:["visibility:hidden","display:none","opacity:0","position:absolute"], correct:1},
  {q:"What's the key difference between inline and inline-block?", opts:["No difference","inline-block accepts width/height and vertical margin; inline ignores them","inline-block can't sit next to text","inline is deprecated"], correct:1},
  {q:"display:flex changes the outer display to block and the inner display to:", opts:["grid","flow","flex","table"], correct:2},
  {q:"Which of these is display:block by default?", opts:["span","a","div","strong"], correct:2},
  {q:"display:none removes an element from:", opts:["Only the visual layout","Only the accessibility tree","Both layout and the accessibility tree","Neither, it just fades it"], correct:2},
];
const POSITION_QUIZ = [
  {q:"Which position value has zero effect from top/left/right/bottom?", opts:["relative","absolute","static","sticky"], correct:2},
  {q:"An absolutely positioned element is placed relative to:", opts:["Always the viewport","Its nearest ancestor with position other than static","Its direct parent, always","The <body> element only"], correct:1},
  {q:"Which position value stays in normal flow but shifts visually by an offset?", opts:["absolute","fixed","relative","sticky (before threshold)"], correct:2},
  {q:"What makes position:fixed 'break' and scroll with an ancestor instead of the viewport?", opts:["Nothing can break it","An ancestor with transform, filter, or will-change","Using percentage offsets","Using z-index"], correct:1},
  {q:"position:sticky behaves like which value until it crosses its scroll threshold?", opts:["static","absolute","relative","fixed"], correct:2},
];
const OVERFLOW_QUIZ = [
  {q:"Which overflow value always shows a scrollbar even if content fits?", opts:["auto","scroll","hidden","visible"], correct:1},
  {q:"Which overflow value shows a scrollbar only when content actually overflows?", opts:["scroll","hidden","auto","clip"], correct:2},
  {q:"overflow:hidden with no scroll mechanism means clipped content is:", opts:["Still reachable via keyboard","Inaccessible entirely","Automatically summarized","Shown in a tooltip"], correct:1},
  {q:"Setting overflow to anything but visible also creates a new:", opts:["Stacking context only","Block Formatting Context","Positioning context","Font context"], correct:1},
  {q:"overflow is shorthand for which two properties?", opts:["overflow-top / overflow-bottom","overflow-x / overflow-y","overflow-inline / overflow-block only in old CSS","scroll-x / scroll-y"], correct:1},
];
const FLOAT_QUIZ = [
  {q:"What was float originally designed for?", opts:["Full page grid layout","Wrapping text around an image","Centering elements","Animations"], correct:1},
  {q:"A parent containing only floated children, with no clearfix, will typically:", opts:["Grow to fit them","Collapse to zero height","Center them automatically","Throw a CSS error"], correct:1},
  {q:"Which modern layout tools have mostly replaced float for structural layout?", opts:["Tables","Flexbox and Grid","Position:absolute","Inline-block only"], correct:1},
  {q:"What does the clearfix technique typically use?", opts:["overflow:visible","A ::after pseudo-element with clear:both","z-index:999","display:none"], correct:1},
  {q:"A floated element is:", opts:["Still in normal flow","Taken out of normal flow, letting inline content wrap around it","Always centered","Invisible until hovered"], correct:1},
];
const CLEAR_QUIZ = [
  {q:"clear:both means an element moves below:", opts:["Only left floats","Only right floats","Floats on either side","Nothing, both is invalid"], correct:2},
  {q:"clear is the direct counterpart to which property?", opts:["position","float","display","overflow"], correct:1},
  {q:"The clearfix hack is mainly used to solve which problem?", opts:["Text overflow","A parent collapsing because its children are floated","Slow animations","Broken specificity"], correct:1},
  {q:"clear:left specifically clears:", opts:["Floats on the right only","Floats on the left only","All floats","No floats"], correct:1},
  {q:"In practice, which clear value is used almost all the time?", opts:["left","right","both","none"], correct:2},
];
const SIZING_QUIZ = [
  {q:"If width is 50% but min-width is 300px and the container is only 400px, and 50% < 300px, which wins?", opts:["The 50% value, min-width is ignored","min-width — the box floors at 300px","Whichever is defined last in the file","max-width automatically"], correct:1},
  {q:"max-width:100% on an image is commonly used to:", opts:["Force it to a fixed size","Prevent it from overflowing its container","Crop it","Blur it"], correct:1},
  {q:"If min-width and max-width conflict, which one wins?", opts:["max-width always","min-width always","Neither applies","Whichever was declared first"], correct:1},
  {q:"min-height:100vh is commonly used to:", opts:["Make an element exactly one pixel tall","Ensure a section is at least the full viewport height","Hide overflow","Disable scrolling"], correct:1},
  {q:"width:100%; max-width:640px; achieves what pattern?", opts:["A fixed 640px box always","A fluid box that never exceeds a comfortable reading width","A box that's always exactly 100% wide","An invalid combination"], correct:1},
];
const SPACING_QUIZ = [
  {q:"What is the order of values in the 4-value margin/padding shorthand?", opts:["left, top, right, bottom","top, right, bottom, left","top, left, bottom, right","right, top, left, bottom"], correct:1},
  {q:"margin:0 auto; on a block element with a set width does what?", opts:["Removes all margin","Horizontally centers the element","Vertically centers the element","Adds equal margin on all sides"], correct:1},
  {q:"Which spacing value collapses between adjacent block siblings?", opts:["padding","vertical margin","border","gap"], correct:1},
  {q:"gap is most useful on:", opts:["Any static block element","Flex or Grid containers, to space children directly","Inline text only","Images only"], correct:1},
  {q:"Negative padding is:", opts:["Valid and commonly used","Invalid CSS, silently ignored","Only valid on flex items","The same as negative margin"], correct:1},
];
const ALIGNMENT_QUIZ = [
  {q:"justify-content aligns items along the:", opts:["Cross axis","Main axis","Z-axis","Diagonal axis"], correct:1},
  {q:"Which alignment property is the default value of align-items?", opts:["center","flex-start","stretch","flex-end"], correct:2},
  {q:"To center a single flex item both ways, you use justify-content:center plus:", opts:["align-content:center","align-items:center","align-self:start","text-align:center"], correct:1},
  {q:"align-self overrides align-items for:", opts:["The whole container","One specific child only","Nothing, it doesn't exist","Only the last child"], correct:1},
  {q:"place-items is a shorthand available on which layout type?", opts:["Flexbox only","Grid","Both equally, invented for Flexbox first","Neither"], correct:1},
];
const TRANSFORMS_QUIZ = [
  {q:"Why are transform and opacity considered animation-safe?", opts:["They're the only animatable properties","They can be handled by the compositor without layout/paint","They look nicer","They work in all browsers, unlike other properties"], correct:1},
  {q:"transform: translateX(20px) rotate(10deg) — what order do the operations apply in?", opts:["Rotate first, then translate","Translate first, then rotate, as written","Both simultaneously with no order","Random"], correct:1},
  {q:"Does translate() affect the space an element reserves in normal layout flow?", opts:["Yes, it shifts the reserved space too","No, the original layout space stays reserved","Only for absolutely positioned elements","Only in Grid containers"], correct:1},
  {q:"What does transform-origin control?", opts:["The color of the transform","The pivot point for rotate/scale","The animation duration","Whether the transform is 2D or 3D"], correct:1},
  {q:"A single-number scale() value scales:", opts:["Only the X axis","Only the Y axis","Both axes uniformly","Nothing without units"], correct:2},
];
const TRANSITIONS_QUIZ = [
  {q:"A CSS transition fires when:", opts:["The page loads, always","A property value changes","Every animation frame regardless of change","Only on click events"], correct:1},
  {q:"Which part of transition controls the easing curve?", opts:["duration","delay","timing-function","property"], correct:2},
  {q:"Can transitions loop or run multiple keyframe steps like @keyframes can?", opts:["Yes, identically","No — transitions only go from a start state to an end state","Only with JavaScript triggers","Only in Chrome"], correct:1},
  {q:"transition-delay is used to:", opts:["Speed up the animation","Wait before the transition starts, useful for staggering","Reverse the transition","Disable the transition"], correct:1},
  {q:"Using transition:all is generally considered:", opts:["Best practice always","Wasteful — naming exact properties is cheaper","Required syntax","Faster than naming properties"], correct:1},
];
const ANIMATIONS_QUIZ = [
  {q:"What defines the steps of a CSS animation?", opts:["transition-timing-function","@keyframes",":hover states","JavaScript setInterval"], correct:1},
  {q:"Which value makes an animation loop forever?", opts:["animation-iteration-count: infinite","animation-loop: true","animation-repeat: always","animation-duration: 0"], correct:0},
  {q:"animation-fill-mode: forwards does what?", opts:["Plays the animation backwards","Keeps the last keyframe's styles after the animation ends","Speeds up the animation","Reverses the iteration count"], correct:1},
  {q:"When would you prefer @keyframes over a simple transition?", opts:["Never, transitions do everything","For multi-step sequences, loops, or auto-play on load","Only for color changes","Only on hover"], correct:1},
  {q:"Keyframe percentages like 0%, 50%, 100% represent:", opts:["Opacity values","Points along the animation's timeline","Browser support levels","Frame rate"], correct:1},
];
const PSEUDO_CLASSES_QUIZ = [
  {q:"What does :nth-child(2) select?", opts:["The 2nd element of that specific tag type among siblings","The 2nd child among ALL siblings regardless of tag","Every 2nd element on the page","An invalid selector"], correct:1},
  {q:":nth-of-type(2) differs from :nth-child(2) because it:", opts:["Is identical in every case","Counts position only among siblings of the same tag","Only works on the 2nd page","Requires JavaScript"], correct:1},
  {q:"Which pseudo-class targets a form field currently failing validation?", opts:[":required",":invalid",":disabled",":optional"], correct:1},
  {q:"Which pseudo-class is a 'logical' selector that negates its argument?", opts:[":is()",":not()",":where()",":has()"], correct:1},
  {q:":nth-child(odd) is equivalent to which formula?", opts:["2n","2n+1","3n","n+1"], correct:1},
];
const PSEUDO_ELEMENTS_QUIZ = [
  {q:"Which is required for ::before/::after to render at all?", opts:["A width value","A content property, even if empty","A color property","A z-index value"], correct:1},
  {q:"::first-letter is commonly used for:", opts:["Hiding text","Drop-cap styling","Adding a border to a paragraph","Centering text"], correct:1},
  {q:"Modern CSS convention uses double colons (::) for:", opts:["Pseudo-classes","Pseudo-elements","Media queries","Custom properties"], correct:1},
  {q:"::selection styles:", opts:["The default text color","The highlight when a user selects text","Focused form fields","Hovered links only"], correct:1},
  {q:"Does ::before insert content into the DOM as a real, inspectable HTML node?", opts:["Yes, exactly like a normal element in the source HTML","No — it's a generated box, not present in the DOM/source","Only in Firefox","Only with JavaScript enabled"], correct:1},
];
const VARIABLES_QUIZ = [
  {q:"A custom property defined on :root is:", opts:["Scoped to the root element only, no children","Globally available to all descendants","Only usable in media queries","Deprecated syntax"], correct:1},
  {q:"var(--accent, teal) does what if --accent isn't defined?", opts:["Throws an error","Falls back to teal","Renders as blank/invalid","Falls back to black always"], correct:1},
  {q:"What's a key advantage of CSS custom properties over Sass variables?", opts:["Shorter syntax","They stay live in the browser and can be changed at runtime (JS, media queries)","They're faster to type","Sass variables don't exist"], correct:1},
  {q:"How can JavaScript change a custom property at runtime?", opts:["It can't, they're compile-time only","element.style.setProperty('--name', value)","Only by reloading the page","Only via a build tool"], correct:1},
  {q:"A custom property defined on a specific class (not :root) applies to:", opts:["The whole document regardless","That element and its descendants","No one, it's invalid","Only that exact element, never children"], correct:1},
];
const FUNCTIONS_QUIZ = [
  {q:"Which function mixes different CSS units in one expression?", opts:["var()","calc()","url()","attr()"], correct:1},
  {q:"Which function gives one fluid value with a floor and ceiling?", opts:["min()","clamp()","calc()","rgb()"], correct:1},
  {q:"min() picks:", opts:["The largest of its arguments","The smallest of its arguments","A random argument","Always the first argument"], correct:1},
  {q:"attr() is mainly used to:", opts:["Fetch a remote resource","Pull a value from an HTML attribute into CSS (often in generated content)","Animate a property","Import another stylesheet"], correct:1},
  {q:"color-mix() is used to:", opts:["Convert between color formats only","Blend two colors by a percentage","Detect the user's OS color theme","Generate random colors"], correct:1},
];
const CALC_QUIZ = [
  {q:"What does calc(100% - 40px) let you do that plain values can't?", opts:["Nothing new","Mix percentage and pixel units in one expression","Use negative numbers","Animate width"], correct:1},
  {q:"Which spacing rule is mandatory around + and - inside calc()?", opts:["No spaces allowed at all","Spaces are required on both sides","Only a leading space is needed","Spaces are optional but recommended"], correct:1},
  {q:"calc(var(--gap) * 3) is valid because calc() can reference:", opts:["Only literal numbers","Custom properties too","Only percentages","Only pixel values"], correct:1},
  {q:"calc(100vh - 64px) is a common pattern for:", opts:["Centering text","A full-height layout minus a fixed header","Rounding corners","Setting font-size"], correct:1},
  {q:"Which operators does calc() support?", opts:["+ and - only","* and / only","+ - * /","Only +"], correct:2},
];
const CLAMP_QUIZ = [
  {q:"clamp(16px, 4vw, 48px) — which value drives the scaling behavior?", opts:["16px","4vw","48px","None, it's static"], correct:1},
  {q:"In clamp(min, preferred, max), when does the min value take over?", opts:["Never","When the preferred value would fall below it","When the viewport is very large","Randomly"], correct:1},
  {q:"clamp() is most commonly used for:", opts:["Fixed pixel-only layouts","Fluid typography and spacing that respects bounds","Color blending","Hiding elements"], correct:1},
  {q:"What replaces the need for several font-size media queries?", opts:["calc() alone","clamp() with a vw-based preferred value","!important","min-width alone"], correct:1},
  {q:"clamp(16px, 4vw, 48px) is mathematically equivalent to:", opts:["min(16px, 4vw, 48px)","max(16px, min(4vw, 48px))","calc(16px + 4vw + 48px)","4vw always, ignoring the rest"], correct:1},
];
const MINMAX_QUIZ = [
  {q:"min(90%, 600px) chooses:", opts:["Always 600px","Always 90%","Whichever evaluates smaller","Whichever evaluates larger"], correct:2},
  {q:"max(20px, 5%) chooses:", opts:["Whichever evaluates smaller","Whichever evaluates larger","Always 20px","Always 5%"], correct:1},
  {q:"Are min()/max() evaluated once at load, or live?", opts:["Once, at page load only","Live, re-evaluated as the environment changes","Only during animations","Only in print stylesheets"], correct:1},
  {q:"clamp(MIN, VAL, MAX) is shorthand for which combined expression?", opts:["min(MIN, max(VAL, MAX))","max(MIN, min(VAL, MAX))","MIN + VAL + MAX","calc(MIN - VAL - MAX)"], correct:1},
  {q:"min(90%, 400px) on a 300px-wide container renders at roughly:", opts:["400px, always","270px (90% of 300px), since it's smaller than 400px","300px exactly","0px"], correct:1},
];
const ASPECT_RATIO_QUIZ = [
  {q:"aspect-ratio: 16/9 on an element with only width set will:", opts:["Ignore the width","Compute height automatically to maintain that ratio","Require height to also be set manually","Only work on images"], correct:1},
  {q:"Before aspect-ratio existed, what hack was commonly used?", opts:["JavaScript resize listeners only","A padding-percentage trick on a wrapper element","display:none","z-index tricks"], correct:1},
  {q:"Reserving image space with aspect-ratio helps prevent:", opts:["Slow JavaScript","Cumulative Layout Shift as images load","Color banding","Font loading flashes"], correct:1},
  {q:"aspect-ratio: 1/1 produces:", opts:["A rectangle twice as wide as tall","A perfect square","A circle","An invalid ratio"], correct:1},
  {q:"Does aspect-ratio work on elements other than images and video?", opts:["No, images and video only","Yes, any element that can have a size", "Only on <div> specifically","Only inside Grid containers"], correct:1},
];
const OBJECT_FIT_QUIZ = [
  {q:"Which object-fit value crops to fill the box completely with no distortion?", opts:["contain","cover","fill","none"], correct:1},
  {q:"Which object-fit value fits the whole image inside the box, possibly leaving empty space?", opts:["cover","contain","fill","scale-down"], correct:1},
  {q:"object-fit:fill (the default) can cause:", opts:["Cropping","Distortion if the box ratio differs from the image ratio","Blank space","Nothing, it's always safe"], correct:1},
  {q:"object-fit is the equivalent of which background property, but for replaced elements like <img>?", opts:["background-position","background-size","background-repeat","background-attachment"], correct:1},
  {q:"object-fit:none renders the image at:", opts:["The box's exact size, stretched","Its natural size, cropped by the box","Zero size","Full viewport size"], correct:1},
];
const NESTING_QUIZ = [
  {q:"In native CSS nesting, what does the & symbol represent?", opts:["A comment marker","The parent selector","A wildcard for any element","A CSS variable"], correct:1},
  {q:"Does native CSS nesting require a build tool like Sass?", opts:["Yes, always","No, it's supported natively by modern browsers","Only in Node.js projects","Only with PostCSS"], correct:1},
  {q:"& .title { } inside .card { } compiles conceptually to:", opts:[".title .card", ".card .title",".card.title","title.card"], correct:1},
  {q:"&:hover { } inside .card { } is equivalent to which flattened selector?", opts:[".card :hover",".card:hover","hover.card",":hover.card"], correct:1},
  {q:"A key benefit of nesting is:", opts:["Higher specificity always","Keeping related rules visually grouped in the source","Faster runtime performance","Smaller file size guaranteed"], correct:1},
];
const IS_WHERE_HAS_QUIZ = [
  {q:"What specificity does :where() always contribute?", opts:["The highest of its arguments","Zero, always","The lowest possible non-zero value","Equal to an ID"], correct:1},
  {q:"What specificity does :is() contribute?", opts:["Always zero","The specificity of its most specific argument","Always equal to an element selector","It's invalid CSS"], correct:1},
  {q:":has() is notable because it lets CSS select based on:", opts:["An element's siblings only","An element's own children/descendants — a 'parent selector'","Media features","The user's browser"], correct:1},
  {q:"form:has(:invalid) selects:", opts:["Any invalid form field","A form element only if it contains an invalid field","All forms unconditionally","Nothing, :has() doesn't support pseudo-classes as arguments"], correct:1},
  {q:"Why might a component library prefer :where() for its base styles?", opts:["It renders faster","Its zero specificity makes it trivially easy for consumers to override","It's shorter to type","It's the only one supported everywhere"], correct:1},
];
const LOGICAL_PROPS_QUIZ = [
  {q:"margin-inline-start replaces which physical property (in a left-to-right language)?", opts:["margin-top","margin-left","margin-right","margin-bottom"], correct:1},
  {q:"What determines which physical side 'inline-start' maps to?", opts:["The user's screen size","The document's writing mode/direction","The browser vendor","Font size"], correct:1},
  {q:"padding-block-start corresponds to 'block' direction, which is:", opts:["Always horizontal","The direction content stacks (often vertical, but not always)","Always diagonal","Irrelevant to layout"], correct:1},
  {q:"Why do logical properties matter for internationalization?", opts:["They don't relate to i18n at all","The same CSS automatically adapts for RTL languages like Arabic","They only affect font rendering","They replace the need for translation"], correct:1},
  {q:"inset-inline is the logical equivalent of which pair?", opts:["top / bottom","left / right","width / height","margin / padding"], correct:1},
];
const SCROLL_SNAP_QUIZ = [
  {q:"scroll-snap-type is set on:", opts:["Each child item","The scrolling container","The <body> only","The <html> element only"], correct:1},
  {q:"scroll-snap-align is set on:", opts:["The scrolling container","Each child item that should be a snap point","Neither, it's automatic","Only the first child"], correct:1},
  {q:"mandatory snapping means:", opts:["Snapping is optional","The scroll always settles at the nearest snap point","Snapping only works with a mouse","Snapping requires JavaScript"], correct:1},
  {q:"proximity snapping means:", opts:["Snapping only occurs if the scroll position is already close to a snap point","Snapping never occurs","Snapping is mandatory always","It's identical to mandatory"], correct:0},
  {q:"A key advantage of CSS scroll-snap over a JS carousel library is:", opts:["More configuration needed","Native scroll physics with no added JavaScript weight","Better browser support in older browsers","It requires jQuery"], correct:1},
];
const CONTAINER_QUERIES_QUIZ = [
  {q:"A media query responds to the size of:", opts:["The element's own parent container","The viewport","The nearest button","The document title"], correct:1},
  {q:"A container query responds to the size of:", opts:["The viewport only","The element's containing ancestor (marked with container-type)","The user's screen resolution","The document language"], correct:1},
  {q:"What CSS property must a parent have for @container to query its size?", opts:["display: grid","container-type","overflow: hidden","position: relative"], correct:1},
  {q:"Why are container queries useful for reusable components?", opts:["They make components load faster","The same component can adapt based on its layout slot, not just screen size","They replace the need for CSS entirely","They only work with React"], correct:1},
  {q:"A card that's narrow in a 3-column grid but wide in a single-column layout — which tool lets the card itself respond to that difference regardless of overall screen width?", opts:["Media queries","Container queries","Pseudo-classes","Float"], correct:1},
];
const COLOR_MIX_QUIZ = [
  {q:"color-mix(in srgb, teal, white 30%) produces:", opts:["Pure white","Teal blended with 30% white — a lighter tint","Pure teal, unaffected","An invalid color"], correct:1},
  {q:"Mixing a color with black using color-mix() produces a:", opts:["Tint (lighter)","Shade (darker)","Complementary color","Random hue shift"], correct:1},
  {q:"Before color-mix() existed, how did teams typically generate tint/shade variants?", opts:["They couldn't at all","Precomputed hex values or a build-time Sass function like lighten()","JavaScript canvas rendering only","They didn't need variants"], correct:1},
  {q:"A key advantage of color-mix() over a precomputed Sass function is:", opts:["It's shorter to type","It works live in the browser, even with runtime CSS variable values","It supports more colors","Sass functions don't exist"], correct:1},
  {q:"color-mix(in srgb, teal, transparent 50%) produces a color that is:", opts:["Fully opaque teal","50% as opaque as the original teal","Fully transparent","An error"], correct:1},
];
const MEDIA_QUERIES_QUIZ = [
  {q:"@media (min-width: 768px) applies its styles:", opts:["Only exactly at 768px","At 768px and any width above it","At 768px and any width below it","Never, it's invalid"], correct:1},
  {q:"Which approach to responsive design is min-width associated with?", opts:["Desktop-first","Mobile-first","Print-first","Neither"], correct:1},
  {q:"prefers-color-scheme lets you respond to:", opts:["The user's OS/browser dark or light mode setting","The current time of day","The user's location","Battery level"], correct:0},
  {q:"prefers-reduced-motion is primarily an accessibility feature for:", opts:["Colorblind users","Users sensitive to motion (e.g. vestibular disorders)","Slow internet connections","Screen readers specifically"], correct:1},
  {q:"Modern responsive breakpoints are best chosen based on:", opts:["Specific named devices like 'iPhone 12'","Where your own content starts to look cramped or stretched","Always exactly 768px and 1024px, no exceptions","Random values"], correct:1},
];
const RESPONSIVE_IMAGES_QUIZ = [
  {q:"What does max-width:100%; height:auto; on an img primarily prevent?", opts:["Slow loading","The image overflowing its container while keeping its aspect ratio","Broken alt text","Color shifts"], correct:1},
  {q:"srcset lets the browser choose an image based on:", opts:["The user's favorite color","Screen resolution/width, picking the smallest sufficient file","The image's file name only","Server load"], correct:1},
  {q:"What's the main purpose of the <picture> element over srcset alone?", opts:["It's just a shorter syntax for the same thing","It allows serving a genuinely different/cropped image per breakpoint (art direction)","It only works for video","It replaces CSS entirely"], correct:1},
  {q:"Why does serving one huge image to all devices hurt performance?", opts:["It doesn't, images are always small","Small-screen devices download far more data than they'll ever display","It only affects desktop","It breaks SEO directly"], correct:1},
  {q:"The sizes attribute in srcset tells the browser:", opts:["The file size in KB","How wide the image will actually render at each breakpoint","The image's color palette","Nothing, it's optional and unused"], correct:1},
];
const MOBILE_FIRST_QUIZ = [
  {q:"Mobile-first CSS typically uses which media feature?", opts:["max-width","min-width","orientation only","aspect-ratio only"], correct:1},
  {q:"In a mobile-first approach, the unwrapped base styles represent:", opts:["The full desktop layout","The simplest, smallest-screen layout","A random breakpoint","Print styles"], correct:1},
  {q:"Desktop-first CSS typically uses which media feature?", opts:["min-width","max-width","min-height","aspect-ratio"], correct:1},
  {q:"Why did mobile-first become the more common default?", opts:["Desktop traffic dominates most sites","Most real-world traffic is mobile, so the lean base case benefits the majority","It's required by CSS spec","It's the only valid approach"], correct:1},
  {q:"Mixing min-width and max-width queries freely in one project tends to cause:", opts:["No issues at all","Overlapping, hard-to-predict cascades","Faster performance","Better accessibility"], correct:1},
];
const ACCESSIBILITY_QUIZ = [
  {q:"What's the minimum WCAG AA contrast ratio for normal body text?", opts:["2:1","3:1","4.5:1","7:1 always"], correct:2},
  {q:"Why shouldn't you set * { outline: none; } globally?", opts:["It's slower","It removes visible focus indicators for keyboard users","It breaks hover states","It only affects Safari"], correct:1},
  {q:"What does prefers-reduced-motion let you respect?", opts:["The user's OS-level request to minimize animation","The user's screen resolution","The user's typing speed","The user's browser vendor"], correct:0},
  {q:"display:none and visibility:hidden both do what regarding screen readers?", opts:["Neither hides content from screen readers","Both hide content from screen readers and remove it from the accessibility tree","Only display:none affects screen readers","Only visibility:hidden affects screen readers"], correct:1},
  {q:"To visually hide something but keep it available to screen readers, you should use:", opts:["display:none","visibility:hidden","A dedicated visually-hidden/sr-only class using offscreen clipping","opacity:0 alone"], correct:2},
];
const PERFORMANCE_QUIZ = [
  {q:"Which two properties can typically be animated on the compositor thread alone?", opts:["width and height","transform and opacity","top and left","margin and padding"], correct:1},
  {q:"Animating left/top on every frame is expensive because it triggers:", opts:["Nothing, it's cheap","A layout reflow on every frame","Only a paint, never layout","GPU acceleration automatically"], correct:1},
  {q:"will-change is best used:", opts:["On every element, always","Sparingly, only on elements about to animate","Only on text elements","Never, it's deprecated"], correct:1},
  {q:"Why are deeply nested selectors like .a .b .c .d {} more expensive to match?", opts:["They're not, nesting has no cost","Browsers match selectors right-to-left, so deep chains take more matching work","They use more colors","They require JavaScript"], correct:1},
  {q:"Which rendering stage does changing background-color trigger, skipping layout?", opts:["Only composite","Paint","Only a full page reload","Nothing at all"], correct:1},
];
const CSS_ARCHITECTURE_QUIZ = [
  {q:"What is the fundamental scoping problem CSS architecture tries to solve?", opts:["CSS files are too large","Every CSS rule is global by default and can leak across components","CSS doesn't support variables","Browsers render CSS differently"], correct:1},
  {q:"BEM solves the scoping problem primarily through:", opts:["Build-tool enforced scoping","Naming conventions that simulate component boundaries","Shadow DOM","Inline styles only"], correct:1},
  {q:"CSS Modules and the Shadow DOM solve scoping by:", opts:["Naming convention, same as BEM","Enforcing real scope at the tooling/browser level","Ignoring the problem","Using only IDs"], correct:1},
  {q:"Utility-first frameworks like Tailwind sidestep the naming problem by:", opts:["Auto-generating random class names","Composing small, single-purpose classes directly in markup","Banning classes entirely","Using only inline styles"], correct:1},
  {q:"What are interviewers usually checking for when they ask about CSS structure/architecture?", opts:["Whether you've memorized every methodology's rules exactly","Whether you've hit the global-scope problem in practice and have a deliberate solution","Whether you use Tailwind specifically","Whether you avoid CSS entirely"], correct:1},
];
const BEM_QUIZ = [
  {q:"In BEM, what does the double underscore (__) represent?", opts:["A modifier","An element belonging to a block","A comment","A media query"], correct:1},
  {q:"In BEM, what does the double hyphen (--) represent?", opts:["An element","A modifier (variant or state)","The block itself","A pseudo-class"], correct:1},
  {q:"Which is a correctly-formed BEM element class for a 'card' block's title?", opts:["card-title","card.title","card__title","card:title"], correct:2},
  {q:"Why does BEM keep elements flat instead of mirroring DOM nesting (e.g. avoiding .card__body__title)?", opts:["It's a stylistic preference with no real reason","Every element belongs directly to its block, keeping selectors flat and specificity low","Nested BEM classes are invalid CSS","Deep nesting is faster to type"], correct:1},
  {q:"A key benefit of BEM's flat single-class selectors is:", opts:["Higher specificity for easier overrides","Specificity stays flat and predictable across the codebase","Smaller HTML file size","Automatic dark mode support"], correct:1},
];
const UTILITY_CLASSES_QUIZ = [
  {q:"A utility class like .mt-4 typically does:", opts:["Many unrelated things at once","One specific thing (e.g. set margin-top)","Nothing without JavaScript","Only apply on hover"], correct:1},
  {q:"A common criticism of utility-first CSS is:", opts:["It's slower to render","Markup can accumulate long, less scannable class lists","It can't be responsive","It requires a database"], correct:1},
  {q:"A common advantage of utility-first CSS is:", opts:["You never have to invent class names, and unused utilities are easy to strip","It eliminates the need for HTML","It's the only accessible approach","It requires no learning curve"], correct:0},
  {q:"Are utility classes and BEM-style naming mutually exclusive in real codebases?", opts:["Yes, you must pick exactly one forever","No — many teams mix both: semantic classes for components, utilities for one-off tweaks","Utility classes replace HTML entirely","BEM and utilities are the same thing"], correct:1},
  {q:"Tailwind is an example of which architecture approach?", opts:["BEM","Utility-first","CSS Modules","Inline styles only"], correct:1},
];
const TAILWIND_QUIZ = [
  {q:"Tailwind's flex class maps to which plain CSS?", opts:["float: left","display: flex","position: fixed","flex-direction: row-reverse"], correct:1},
  {q:"In Tailwind, md:flex-row means:", opts:["flex-row applies at all screen sizes","flex-row applies from the 'md' breakpoint and up (mobile-first)","flex-row only applies below 'md'","It's invalid syntax"], correct:1},
  {q:"Tailwind's hover:bg-teal-600 is an example of a:", opts:["Responsive prefix","State variant","Custom property","Media query override only"], correct:1},
  {q:"Does Tailwind invent new CSS behavior the browser doesn't already support?", opts:["Yes, it's a completely new styling engine","No — every class maps to standard CSS properties you'd write by hand","Yes, it requires a custom browser","No, but it only works with React"], correct:1},
  {q:"Tailwind's constrained spacing/color scale (e.g. p-4, not p-17px) primarily helps with:", opts:["Faster JavaScript execution","Design consistency across a codebase","SEO ranking","Reducing HTTP requests"], correct:1},
];
const PRINT_CSS_QUIZ = [
  {q:"Which media query targets printed output?", opts:["@media (max-width: print)","@media print","@print", "@media (type: print)"], correct:1},
  {q:"Why do print stylesheets often hide navigation and buttons?", opts:["They're required to for validation","Interactive controls are useless on paper and waste space/ink","Browsers require it","It's not actually common practice"], correct:1},
  {q:"Why might a print stylesheet expand link text to show the URL?", opts:["To make the page load faster","Because clicking doesn't work on paper, so the destination should be visible as text","It's required by law","To fix broken links"], correct:1},
  {q:"@page is used in print CSS to control:", opts:["JavaScript execution","Page margins and printed page boxes","Font loading","Animation timing"], correct:1},
  {q:"A common real-world use case for print CSS is:", opts:["Video game UIs","Resume/invoice pages that need a clean printed or PDF version","Chat applications","Audio players"], correct:1},
];




/* ---------- DISPLAY ---------- */
RENDERERS.display = () => `
  <p class="lede"><code>display</code> decides two things at once: the <b style="color:var(--text)">outer</b> display type (how the box sits among its siblings — block or inline) and the <b style="color:var(--text)">inner</b> display type (how it lays out its own children — flow, flex, grid…).</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>display</label>
        <select id="disp-val" onchange="window.dispUpdate()">
          <option value="block">block</option>
          <option value="inline">inline</option>
          <option value="inline-block">inline-block</option>
          <option value="flex">flex</option>
          <option value="grid">grid</option>
          <option value="none">none</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" style="flex-direction:column; align-items:flex-start; gap:2px;">
      <div style="font-family:var(--font-code); font-size:12.5px; color:var(--text-dim);">before</div>
      <div id="disp-container" style="border:1px dashed var(--border); padding:10px; width:100%;">
        <span class="lab-item" id="disp-a">A</span><span class="lab-item" id="disp-b">B</span><span class="lab-item" id="disp-c">C</span>
      </div>
    </div>
    <div class="code-out" id="disp-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>block</h4><p style="font-size:13px;margin:0;">Takes the full available width, starts on its own line, and respects <code>width</code>/<code>height</code>. Default for <code>div</code>, <code>p</code>, <code>section</code>.</p></div>
    <div class="card"><h4>inline</h4><p style="font-size:13px;margin:0;">Flows with text, ignores <code>width</code>/<code>height</code>, and only respects horizontal margin/padding visually. Default for <code>span</code>, <code>a</code>, <code>strong</code>.</p></div>
    <div class="card"><h4>inline-block</h4><p style="font-size:13px;margin:0;">Flows inline with siblings but accepts <code>width</code>/<code>height</code> and vertical margin — the classic "button next to text" fix.</p></div>
    <div class="card"><h4>none</h4><p style="font-size:13px;margin:0;">Removes the element from layout entirely — no box is generated at all. Different from <code>visibility: hidden</code>, which keeps the space reserved.</p></div>
    <div class="card"><h4>flex</h4><p style="font-size:13px;margin:0;">Outer display is block; inner display switches every direct child into a flex item along a single axis. See the Flexbox lab.</p></div>
    <div class="card"><h4>grid</h4><p style="font-size:13px;margin:0;">Outer display is block; inner display switches direct children into grid items placed on a two-dimensional track system. See the Grid lab.</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> <code>display: none</code> removes the element from the accessibility tree too — screen readers skip it. <code>visibility: hidden</code> hides it visually but it's still announced as present in some contexts, and still reserves its layout space.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-display"></div>
`;
POST_RENDER.display = () => {
  window.dispUpdate = function(){
    const v = document.getElementById('disp-val').value;
    ['disp-a','disp-b','disp-c'].forEach(id=>{
      document.getElementById(id).style.display = v;
    });
    document.getElementById('disp-code').textContent = `.item { display: ${v}; }`;
  };
  window.dispUpdate();
  renderQuiz('quiz-display', DISPLAY_QUIZ);
};

/* ---------- POSITION ---------- */
RENDERERS.position = () => `
  <p class="lede"><code>position</code> decides how an element is placed relative to normal flow, and which ancestor <code>top</code>/<code>right</code>/<code>bottom</code>/<code>left</code> measure against.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>position</label>
        <select id="pos-val" onchange="window.posUpdate()">
          <option value="static">static</option>
          <option value="relative">relative</option>
          <option value="absolute">absolute</option>
          <option value="fixed">fixed</option>
          <option value="sticky">sticky</option>
        </select>
      </div>
      <div class="ctrl"><label>top <span id="pos-top-val">10</span>px</label><input type="range" id="pos-top" min="-20" max="60" value="10" oninput="window.posUpdate()"></div>
      <div class="ctrl"><label>left <span id="pos-left-val">10</span>px</label><input type="range" id="pos-left" min="-20" max="60" value="10" oninput="window.posUpdate()"></div>
    </div>
    <div class="viz-stage" style="position:relative; height:180px; align-items:flex-start; justify-content:flex-start; overflow:hidden;">
      <div style="position:relative; width:100%; height:100%; border:1px dashed var(--border); border-radius:6px;">
        <span style="position:absolute; top:4px; left:6px; font-family:var(--font-code); font-size:9px; color:var(--text-dim); text-transform:uppercase;">containing block</span>
        <div class="lab-item" id="pos-box" style="position:static;">box</div>
      </div>
    </div>
    <div class="code-out" id="pos-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>static</h4><p style="font-size:13px;margin:0;">The default — normal flow, and <code>top</code>/<code>left</code>/etc. have no effect at all.</p></div>
    <div class="card"><h4>relative</h4><p style="font-size:13px;margin:0;">Stays in normal flow (space is still reserved), then shifts visually by the offset — <b style="color:var(--text)">and becomes the containing block</b> for any absolutely-positioned descendant.</p></div>
    <div class="card"><h4>absolute</h4><p style="font-size:13px;margin:0;">Removed from normal flow entirely; positioned against its nearest ancestor with a <code>position</code> other than <code>static</code> (or the viewport if none exists).</p></div>
    <div class="card"><h4>fixed</h4><p style="font-size:13px;margin:0;">Positioned relative to the viewport and stays put during scroll — unless an ancestor has a <code>transform</code>/<code>filter</code>/<code>will-change</code>, which creates a new containing block and traps it.</p></div>
    <div class="card"><h4>sticky</h4><p style="font-size:13px;margin:0;">Behaves like <code>relative</code> until the scroll position crosses the given offset, then "sticks" like <code>fixed</code> within its parent's bounds.</p></div>
  </div>

  <div class="callout tip"><b>The classic pairing:</b> <code>position: relative</code> on a wrapper + <code>position: absolute</code> on a child is the most common way to place a badge, icon, or overlay precisely inside a component without affecting the rest of the page's flow.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-position"></div>
`;
POST_RENDER.position = () => {
  window.posUpdate = function(){
    const p = document.getElementById('pos-val').value;
    const t = document.getElementById('pos-top').value;
    const l = document.getElementById('pos-left').value;
    document.getElementById('pos-top-val').textContent = t;
    document.getElementById('pos-left-val').textContent = l;
    const box = document.getElementById('pos-box');
    box.style.position = p;
    if(p === 'static'){
      box.style.top = ''; box.style.left = '';
      document.getElementById('pos-code').textContent = `.box { position: static; }\n/* top/left ignored */`;
    } else {
      box.style.top = t+'px'; box.style.left = l+'px';
      document.getElementById('pos-code').textContent = `.box {\n  position: ${p};\n  top: ${t}px;\n  left: ${l}px;\n}`;
    }
  };
  window.posUpdate();
  renderQuiz('quiz-position', POSITION_QUIZ);
};

/* ---------- OVERFLOW ---------- */
RENDERERS.overflow = () => `
  <p class="lede"><code>overflow</code> controls what happens when content is bigger than its box. It's actually a shorthand for <code>overflow-x</code> and <code>overflow-y</code>.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>overflow</label>
        <select id="ov-val" onchange="window.ovUpdate()">
          <option value="visible">visible</option>
          <option value="hidden">hidden</option>
          <option value="scroll">scroll</option>
          <option value="auto" selected>auto</option>
          <option value="clip">clip</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div id="ov-box" style="width:200px; height:100px; border:1px solid var(--border); border-radius:6px; padding:10px; background:var(--panel);">
        <p style="margin:0; color:var(--text-muted); font-size:13px; line-height:1.6;">This box has a fixed height of 100px, but this paragraph is long enough that it will overflow the bottom edge unless the overflow property clips, scrolls, or hides it.</p>
      </div>
    </div>
    <div class="code-out" id="ov-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>visible (default)</h4><p style="font-size:13px;margin:0;">Content spills out past the box's edges, uncontained. Rarely what you want for a fixed-size container.</p></div>
    <div class="card"><h4>hidden</h4><p style="font-size:13px;margin:0;">Clips overflow silently — no scrollbar, content is just cut off and inaccessible by scrolling.</p></div>
    <div class="card"><h4>scroll</h4><p style="font-size:13px;margin:0;">Always shows a scrollbar (even if content fits), letting the user reach clipped content.</p></div>
    <div class="card"><h4>auto</h4><p style="font-size:13px;margin:0;">Shows a scrollbar only when content actually overflows — the safest general-purpose default.</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> setting <code>overflow</code> to anything other than <code>visible</code> also creates a <b>Block Formatting Context</b> — which is why <code>overflow: hidden</code> is a classic (if slightly hacky) fix for float-collapse issues, alongside the dedicated <code>clear</code> property.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-overflow"></div>
`;
POST_RENDER.overflow = () => {
  window.ovUpdate = function(){
    const v = document.getElementById('ov-val').value;
    document.getElementById('ov-box').style.overflow = v;
    document.getElementById('ov-code').textContent = `.box {\n  width: 200px;\n  height: 100px;\n  overflow: ${v};\n}`;
  };
  window.ovUpdate();
  renderQuiz('quiz-overflow', OVERFLOW_QUIZ);
};

/* ---------- FLOAT ---------- */
RENDERERS.float = () => `
  <p class="lede">Originally built for wrapping text around images, <code>float</code> pulls an element to one side of its container and lets inline content flow around it. Modern layout (Flexbox, Grid) has replaced it for structural layout, but it still appears in interview questions and legacy code.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>float</label>
        <select id="fl-val" onchange="window.flUpdate()">
          <option value="none">none</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>
      <div class="ctrl">
        <label>parent has clearfix</label>
        <select id="fl-clear" onchange="window.flUpdate()">
          <option value="no">no</option>
          <option value="yes">yes</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" style="align-items:flex-start; justify-content:flex-start;">
      <div id="fl-parent" style="border:2px dashed var(--rose); border-radius:6px; padding:8px; width:100%;">
        <div id="fl-box" class="lab-item" style="width:70px; height:70px;">float</div>
        <p style="margin:0; color:var(--text-muted); font-size:13px; line-height:1.6;">Sample paragraph text that should wrap around the floated box when float is active, demonstrating the original purpose of the float property in early web layouts.</p>
      </div>
    </div>
    <div class="code-out" id="fl-code">/* css */</div>
  </div>

  <div class="callout warn"><b>The collapse problem:</b> a parent with only floated children has zero height, because floats are taken out of normal flow. The parent's dashed border in the demo will hug the paragraph text only — toggle "clearfix" above to see the classic <code>::after { content:""; display:block; clear:both; }</code> fix restore it.</div>

  <div class="grid-2">
    <div class="card"><h4>Where float still shows up</h4><p style="font-size:13px;margin:0;">Wrapping text around an inline image (<code>float: left</code> on an <code>&lt;img&gt;</code>) is still the simplest correct use — this is one case Flexbox/Grid don't replace directly.</p></div>
    <div class="card"><h4>Where it's obsolete</h4><p style="font-size:13px;margin:0;">Multi-column page layouts, navbars, and card grids — all better served by Flexbox or Grid, which don't have the collapse/clearfix baggage.</p></div>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-float"></div>
`;
POST_RENDER.float = () => {
  window.flUpdate = function(){
    const f = document.getElementById('fl-val').value;
    const c = document.getElementById('fl-clear').value;
    const box = document.getElementById('fl-box');
    const parent = document.getElementById('fl-parent');
    box.style.float = f;
    box.style.marginRight = f==='left' ? '10px' : '0';
    box.style.marginLeft = f==='right' ? '10px' : '0';
    parent.style.overflow = c==='yes' ? 'auto' : 'visible';
    document.getElementById('fl-code').textContent =
      `.box { float: ${f}; }` + (c==='yes' ? `\n.parent { overflow: auto; } /* clearfix trick */` : `\n/* no clearfix — parent may collapse */`);
  };
  window.flUpdate();
  renderQuiz('quiz-float', FLOAT_QUIZ);
};

/* ---------- CLEAR ---------- */
RENDERERS.clear = () => `
  <p class="lede"><code>clear</code> tells an element to move below any floated siblings instead of flowing next to them — it's the direct counterpart to <code>float</code>.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>clear</label>
        <select id="clr-val" onchange="window.clrUpdate()">
          <option value="none">none</option>
          <option value="left">left</option>
          <option value="right">right</option>
          <option value="both">both</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" style="align-items:flex-start; justify-content:flex-start;">
      <div style="width:100%;">
        <div class="lab-item" style="float:left; width:70px; height:50px; margin-right:10px;">L</div>
        <div class="lab-item" style="float:right; width:70px; height:50px;">R</div>
        <div id="clr-box" style="background:var(--panel-raise); border:1px solid var(--border); border-radius:6px; padding:8px; font-family:var(--font-code); font-size:12px; color:var(--text);">This box has clear applied — watch it jump below both floats once "both" is selected.</div>
      </div>
    </div>
    <div class="code-out" id="clr-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>clear: left / right</h4><p style="font-size:13px;margin:0;">Moves below floats on that specific side only.</p></div>
    <div class="card"><h4>clear: both</h4><p style="font-size:13px;margin:0;">Moves below floats on either side — the value used almost every time in practice.</p></div>
  </div>

  <div class="callout tip"><b>Modern equivalent:</b> the <code>clearfix</code> hack (<code>content:""; display:table; clear:both;</code> on a <code>::after</code>) exists purely to make a <b>parent</b> contain its floated children — for clearing a <b>sibling</b> below a float, the plain <code>clear</code> property shown above is what you actually want.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-clear"></div>
`;
POST_RENDER.clear = () => {
  window.clrUpdate = function(){
    const v = document.getElementById('clr-val').value;
    document.getElementById('clr-box').style.clear = v;
    document.getElementById('clr-code').textContent = `.box { clear: ${v}; }`;
  };
  window.clrUpdate();
  renderQuiz('quiz-clear', CLEAR_QUIZ);
};

/* ---------- SIZING ---------- */
RENDERERS.sizing = () => `
  <p class="lede">Beyond plain <code>width</code>/<code>height</code>, CSS gives you <code>min-</code>/<code>max-</code> constraints that cap or floor a size while still letting it flex — essential for responsive components that shouldn't shrink to nothing or grow without bound.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>container width <span id="sz-cw-val">340</span>px</label><input type="range" id="sz-cw" min="120" max="420" value="340" oninput="window.szUpdate()"></div>
      <div class="ctrl"><label>min-width <span id="sz-min-val">120</span>px</label><input type="range" id="sz-min" min="60" max="300" value="120" oninput="window.szUpdate()"></div>
      <div class="ctrl"><label>max-width <span id="sz-max-val">280</span>px</label><input type="range" id="sz-max" min="150" max="400" value="280" oninput="window.szUpdate()"></div>
    </div>
    <div class="viz-stage" style="align-items:flex-start; justify-content:flex-start;">
      <div id="sz-container" style="border:1px dashed var(--border); padding:6px; border-radius:6px;">
        <div id="sz-box" class="lab-item" style="height:50px;">box</div>
      </div>
    </div>
    <div class="code-out" id="sz-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>width: 60%</h4><p style="font-size:13px;margin:0;">A flexible percentage size — but with nothing stopping it from becoming unreadably narrow or absurdly wide.</p></div>
    <div class="card"><h4>min-width / min-height</h4><p style="font-size:13px;margin:0;">A floor: the box will never shrink below this, even if its container does.</p></div>
    <div class="card"><h4>max-width / max-height</h4><p style="font-size:13px;margin:0;">A ceiling: the box will never grow past this, even if its container does. <code>max-width: 100%</code> on images is the classic responsive-image rule.</p></div>
    <div class="card"><h4>Precedence</h4><p style="font-size:13px;margin:0;"><code>min-width</code> always wins over <code>max-width</code> if they conflict, and both override a plain <code>width</code> value that falls outside their range.</p></div>
  </div>

  <div class="callout tip"><b>Common pattern:</b> <code>width: 100%; max-width: 640px;</code> — the box fills its container on small screens but never grows past a comfortable reading width on large ones.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-sizing"></div>
`;
POST_RENDER.sizing = () => {
  window.szUpdate = function(){
    const cw = +document.getElementById('sz-cw').value;
    const min = +document.getElementById('sz-min').value;
    const max = +document.getElementById('sz-max').value;
    document.getElementById('sz-cw-val').textContent = cw;
    document.getElementById('sz-min-val').textContent = min;
    document.getElementById('sz-max-val').textContent = max;
    document.getElementById('sz-container').style.width = cw+'px';
    const box = document.getElementById('sz-box');
    box.style.width = '100%';
    box.style.minWidth = min+'px';
    box.style.maxWidth = max+'px';
    let effective = Math.min(Math.max(cw, min), max);
    document.getElementById('sz-code').textContent = `.box {\n  width: 100%;\n  min-width: ${min}px;\n  max-width: ${max}px;\n}\n/* container: ${cw}px → box renders ~${effective}px */`;
  };
  window.szUpdate();
  renderQuiz('quiz-sizing', SIZING_QUIZ);
};

/* ---------- SPACING ---------- */
RENDERERS.spacing = () => `
  <p class="lede">Margin and padding both add space, but on opposite sides of the border — and only one of them collapses. <code>gap</code> is the modern third option for spacing between flex/grid children directly.</p>

  <h2>Shorthand order</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>top <span id="sp-t-val">10</span>px</label><input type="range" id="sp-t" min="0" max="40" value="10" oninput="window.spUpdate()"></div>
      <div class="ctrl"><label>right <span id="sp-r-val">20</span>px</label><input type="range" id="sp-r" min="0" max="40" value="20" oninput="window.spUpdate()"></div>
      <div class="ctrl"><label>bottom <span id="sp-b-val">10</span>px</label><input type="range" id="sp-b" min="0" max="40" value="10" oninput="window.spUpdate()"></div>
      <div class="ctrl"><label>left <span id="sp-l-val">20</span>px</label><input type="range" id="sp-l" min="0" max="40" value="20" oninput="window.spUpdate()"></div>
    </div>
    <div class="viz-stage">
      <div style="background:var(--amber-dim); border:1px dashed var(--amber); border-radius:6px;" id="sp-outer">
        <div id="sp-box" class="lab-item" style="width:100px; height:60px;">box</div>
      </div>
    </div>
    <div class="code-out" id="sp-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>4-value shorthand order</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">top → right → bottom → left <br><span style="color:var(--text-dim);">(clockwise from the top — mnemonic: "TRouBLe")</span></p></div>
    <div class="card"><h4>margin: auto</h4><p style="font-size:13px;margin:0;">On a block element with a set width, <code>margin: 0 auto;</code> splits remaining horizontal space evenly — the classic way to horizontally center a block.</p></div>
    <div class="card"><h4>padding never collapses</h4><p style="font-size:13px;margin:0;">Unlike vertical margins between siblings, padding always adds fully — there's no shared-space behavior to account for.</p></div>
    <div class="card"><h4>gap</h4><p style="font-size:13px;margin:0;">On a flex/grid container, <code>gap</code> spaces children apart directly without needing margin on each child (and without the last-child-margin cleanup that used to require).</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> negative margins are valid CSS and pull an element (or its siblings) closer/overlapping — but negative padding is invalid and silently ignored by the browser.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-spacing"></div>
`;
POST_RENDER.spacing = () => {
  window.spUpdate = function(){
    const t = document.getElementById('sp-t').value, r = document.getElementById('sp-r').value,
          b = document.getElementById('sp-b').value, l = document.getElementById('sp-l').value;
    document.getElementById('sp-t-val').textContent = t;
    document.getElementById('sp-r-val').textContent = r;
    document.getElementById('sp-b-val').textContent = b;
    document.getElementById('sp-l-val').textContent = l;
    document.getElementById('sp-outer').style.padding = `${t}px ${r}px ${b}px ${l}px`;
    document.getElementById('sp-code').textContent = `.box {\n  margin: ${t}px ${r}px ${b}px ${l}px;\n}`;
  };
  window.spUpdate();
  renderQuiz('quiz-spacing', SPACING_QUIZ);
};

/* ---------- ALIGNMENT ---------- */
RENDERERS.alignment = () => `
  <p class="lede">Flexbox and Grid share the same alignment vocabulary — <code>justify-*</code> works along the main/inline axis, <code>align-*</code> works along the cross/block axis. Learning it once covers both systems.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>justify-content</label>
        <select id="al-jc" onchange="window.alUpdate()">
          <option>flex-start</option><option>center</option><option>flex-end</option>
          <option>space-between</option><option>space-around</option><option>space-evenly</option>
        </select>
      </div>
      <div class="ctrl">
        <label>align-items</label>
        <select id="al-ai" onchange="window.alUpdate()">
          <option>stretch</option><option>flex-start</option><option>center</option><option>flex-end</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" id="al-stage" style="height:160px; align-items:flex-start; justify-content:flex-start; padding:12px;">
      <div class="lab-item">1</div><div class="lab-item" style="height:60px;">2</div><div class="lab-item">3</div>
    </div>
    <div class="code-out" id="al-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>justify-content</h4><p style="font-size:13px;margin:0;">Distributes items along the <b style="color:var(--text)">main axis</b> (row by default in flex; inline axis in grid).</p></div>
    <div class="card"><h4>align-items</h4><p style="font-size:13px;margin:0;">Aligns items along the <b style="color:var(--text)">cross axis</b> for the whole container — the default, <code>stretch</code>, is why flex children often fill the container's height unexpectedly.</p></div>
    <div class="card"><h4>align-self</h4><p style="font-size:13px;margin:0;">Overrides <code>align-items</code> for one specific child only, without touching its siblings.</p></div>
    <div class="card"><h4>place-items</h4><p style="font-size:13px;margin:0;">A Grid-only shorthand for <code>align-items</code> + <code>justify-items</code> in one declaration.</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> centering something both ways is <b>not</b> <code>justify-content: center; align-content: center;</code> for a single item — it's <code>justify-content: center; align-items: center;</code>. <code>align-content</code> only matters once you have multiple wrapped lines.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-alignment"></div>
`;
POST_RENDER.alignment = () => {
  window.alUpdate = function(){
    const jc = document.getElementById('al-jc').value;
    const ai = document.getElementById('al-ai').value;
    const stage = document.getElementById('al-stage');
    stage.style.display = 'flex';
    stage.style.justifyContent = jc;
    stage.style.alignItems = ai;
    document.getElementById('al-code').textContent = `.container {\n  display: flex;\n  justify-content: ${jc};\n  align-items: ${ai};\n}`;
  };
  window.alUpdate();
  renderQuiz('quiz-alignment', ALIGNMENT_QUIZ);
};

/* ---------- TRANSFORMS ---------- */
RENDERERS.transforms = () => `
  <p class="lede"><code>transform</code> moves, rotates, scales, or skews an element visually — without affecting layout or triggering reflow, which is exactly why it's the animation-safe way to move things.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>translateX <span id="tf-x-val">0</span>px</label><input type="range" id="tf-x" min="-80" max="80" value="0" oninput="window.tfUpdate()"></div>
      <div class="ctrl"><label>rotate <span id="tf-r-val">0</span>°</label><input type="range" id="tf-r" min="-180" max="180" value="0" oninput="window.tfUpdate()"></div>
      <div class="ctrl"><label>scale <span id="tf-s-val">1.0</span></label><input type="range" id="tf-s" min="0.5" max="1.8" step="0.05" value="1" oninput="window.tfUpdate()"></div>
    </div>
    <div class="viz-stage">
      <div id="tf-box" class="lab-item" style="width:80px; height:80px;">box</div>
    </div>
    <div class="code-out" id="tf-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>translate()</h4><p style="font-size:13px;margin:0;">Moves the element visually along X/Y — the layout space it originally occupied stays reserved.</p></div>
    <div class="card"><h4>rotate()</h4><p style="font-size:13px;margin:0;">Rotates around a pivot point defined by <code>transform-origin</code> (default: the element's center).</p></div>
    <div class="card"><h4>scale()</h4><p style="font-size:13px;margin:0;">Grows or shrinks the element visually. A single number scales both axes uniformly; two numbers scale X and Y independently.</p></div>
    <div class="card"><h4>Combining</h4><p style="font-size:13px;margin:0;">Multiple functions in one <code>transform</code> apply in the order written: <code>transform: translateX(20px) rotate(10deg);</code> translates first, then rotates around the new position.</p></div>
  </div>

  <div class="callout tip"><b>Why performance guides push this:</b> <code>transform</code> and <code>opacity</code> are the only two properties the browser can animate on the compositor thread alone — skipping layout and paint entirely — which is why they're the animation-safe pair over properties like <code>left</code>/<code>width</code>.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-transforms"></div>
`;
POST_RENDER.transforms = () => {
  window.tfUpdate = function(){
    const x = document.getElementById('tf-x').value;
    const r = document.getElementById('tf-r').value;
    const s = document.getElementById('tf-s').value;
    document.getElementById('tf-x-val').textContent = x;
    document.getElementById('tf-r-val').textContent = r;
    document.getElementById('tf-s-val').textContent = (+s).toFixed(2);
    const box = document.getElementById('tf-box');
    box.style.transform = `translateX(${x}px) rotate(${r}deg) scale(${s})`;
    document.getElementById('tf-code').textContent = `.box {\n  transform: translateX(${x}px) rotate(${r}deg) scale(${s});\n}`;
  };
  window.tfUpdate();
  renderQuiz('quiz-transforms', TRANSFORMS_QUIZ);
};

/* ---------- TRANSITIONS ---------- */
RENDERERS.transitions = () => `
  <p class="lede"><code>transition</code> smoothly animates a property between its old value and its new value whenever that value changes — no keyframes needed, just a start and end state.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>duration <span id="tr-d-val">400</span>ms</label><input type="range" id="tr-d" min="100" max="1500" step="50" value="400" oninput="window.trUpdate()"></div>
      <div class="ctrl">
        <label>timing-function</label>
        <select id="tr-e" onchange="window.trUpdate()">
          <option value="ease">ease</option>
          <option value="linear">linear</option>
          <option value="ease-in">ease-in</option>
          <option value="ease-out">ease-out</option>
          <option value="cubic-bezier(.68,-0.55,.27,1.55)">bounce (cubic-bezier)</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div id="tr-box" class="lab-item" style="width:70px; height:70px; cursor:pointer;" onclick="window.trTrigger()">click me</div>
    </div>
    <div class="code-out" id="tr-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>property</h4><p style="font-size:13px;margin:0;">Which CSS property to animate — <code>all</code> works but is wasteful; naming the exact property (or properties) is cheaper and safer.</p></div>
    <div class="card"><h4>duration</h4><p style="font-size:13px;margin:0;">How long the animation takes, in <code>s</code> or <code>ms</code>.</p></div>
    <div class="card"><h4>timing-function</h4><p style="font-size:13px;margin:0;">The easing curve — how speed changes over the duration. <code>ease</code> (slow-fast-slow) is the CSS default.</p></div>
    <div class="card"><h4>delay</h4><p style="font-size:13px;margin:0;">Optional wait before the transition starts, useful for staggering multiple elements.</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> <code>transition</code> only fires on a value <b>change</b> — it does nothing on page load for an element's initial state, and it can't run on its own like <code>@keyframes</code> can (no looping, no multi-step sequences).</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-transitions"></div>
`;
POST_RENDER.transitions = () => {
  window.trUpdate = function(){
    const d = document.getElementById('tr-d').value;
    const e = document.getElementById('tr-e').value;
    document.getElementById('tr-d-val').textContent = d;
    const box = document.getElementById('tr-box');
    box.style.transition = `transform ${d}ms ${e}, background ${d}ms ${e}`;
    document.getElementById('tr-code').textContent = `.box {\n  transition: transform ${d}ms ${e};\n}\n.box:hover { transform: scale(1.15); }`;
  };
  window.trTrigger = function(){
    const box = document.getElementById('tr-box');
    const active = box.dataset.active === '1';
    box.style.transform = active ? 'scale(1) rotate(0deg)' : 'scale(1.3) rotate(90deg)';
    box.dataset.active = active ? '0' : '1';
  };
  window.trUpdate();
  renderQuiz('quiz-transitions', TRANSITIONS_QUIZ);
};

/* ---------- ANIMATIONS ---------- */
RENDERERS.animations = () => `
  <p class="lede"><code>@keyframes</code> + <code>animation</code> go beyond transitions: multi-step sequences, loops, and animations that can run on page load with no trigger event at all.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>animation</label>
        <select id="an-val" onchange="window.anUpdate()">
          <option value="none">none</option>
          <option value="pulse">pulse</option>
          <option value="bounce">bounce</option>
          <option value="spin">spin</option>
        </select>
      </div>
      <div class="ctrl">
        <label>iteration-count</label>
        <select id="an-iter" onchange="window.anUpdate()">
          <option value="infinite">infinite</option>
          <option value="1">1</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div id="an-box" class="lab-item" style="width:70px; height:70px;">box</div>
    </div>
    <div class="code-out" id="an-code">/* css */</div>
  </div>
  <style>
    @keyframes acadPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.25);}}
    @keyframes acadBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-24px);}}
    @keyframes acadSpin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  </style>

  <div class="grid-2">
    <div class="card"><h4>@keyframes</h4><p style="font-size:13px;margin:0;">Defines the steps as percentages (<code>0%</code>, <code>50%</code>, <code>100%</code>, or <code>from</code>/<code>to</code>) — each a snapshot of property values at that point in the timeline.</p></div>
    <div class="card"><h4>animation-duration</h4><p style="font-size:13px;margin:0;">How long one full cycle through the keyframes takes.</p></div>
    <div class="card"><h4>animation-iteration-count</h4><p style="font-size:13px;margin:0;">How many times it repeats — a number, or <code>infinite</code> to loop forever.</p></div>
    <div class="card"><h4>animation-fill-mode</h4><p style="font-size:13px;margin:0;"><code>forwards</code> keeps the last keyframe's styles applied after the animation ends, instead of snapping back to the element's original CSS.</p></div>
  </div>

  <div class="callout tip"><b>Transition vs. animation:</b> reach for <code>transition</code> for simple two-state changes (hover, focus, open/close). Reach for <code>@keyframes</code>/<code>animation</code> when you need more than two states, a loop, or something that should play automatically without a trigger.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-animations"></div>
`;
POST_RENDER.animations = () => {
  window.anUpdate = function(){
    const v = document.getElementById('an-val').value;
    const iter = document.getElementById('an-iter').value;
    const box = document.getElementById('an-box');
    const map = {pulse:'acadPulse', bounce:'acadBounce', spin:'acadSpin'};
    box.style.animation = v==='none' ? 'none' : `${map[v]} 1s ease-in-out ${iter}`;
    document.getElementById('an-code').textContent = v==='none'
      ? '.box { animation: none; }'
      : `@keyframes ${map[v]} { /* … */ }\n.box {\n  animation: ${map[v]} 1s ease-in-out ${iter};\n}`;
  };
  window.anUpdate();
  renderQuiz('quiz-animations', ANIMATIONS_QUIZ);
};

/* ---------- PSEUDO CLASSES ---------- */
RENDERERS['pseudo-classes'] = () => `
  <p class="lede">A pseudo-class selects an element based on <b style="color:var(--text)">state or position</b> that isn't captured by a class or attribute in the markup — hover state, form validity, or being the 3rd child.</p>

  <h2>Try it live: nth-child</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>selector</label>
        <select id="pc-sel" onchange="window.pcUpdate()">
          <option value="nth-child(2)">:nth-child(2)</option>
          <option value="nth-child(odd)">:nth-child(odd)</option>
          <option value="nth-child(even)">:nth-child(even)</option>
          <option value="nth-child(3n)">:nth-child(3n)</option>
          <option value="first-child">:first-child</option>
          <option value="last-child">:last-child</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" style="flex-wrap:wrap; gap:6px;" id="pc-stage">
      ${Array.from({length:9},(_,i)=>`<div class="lab-item pc-item" data-n="${i+1}">${i+1}</div>`).join('')}
    </div>
    <div class="code-out" id="pc-code">/* matches */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>State</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">:hover &nbsp; :focus &nbsp; :active &nbsp; :visited &nbsp; :disabled &nbsp; :checked</p></div>
    <div class="card"><h4>Structural</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">:first-child &nbsp; :last-child &nbsp; :nth-child() &nbsp; :only-child &nbsp; :empty</p></div>
    <div class="card"><h4>Form validation</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">:valid &nbsp; :invalid &nbsp; :required &nbsp; :optional &nbsp; :in-range</p></div>
    <div class="card"><h4>Logical</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">:not() &nbsp; :is() &nbsp; :where() &nbsp; :has()</p></div>
  </div>

  <div class="callout warn"><b>Common confusion:</b> <code>:nth-child(2)</code> counts position among <b>all</b> siblings regardless of tag; <code>:nth-of-type(2)</code> counts position only among siblings of the <b>same tag</b>. They give different results as soon as sibling types are mixed.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-pseudo-classes"></div>
`;
POST_RENDER['pseudo-classes'] = () => {
  window.pcUpdate = function(){
    const sel = document.getElementById('pc-sel').value;
    document.querySelectorAll('.pc-item').forEach(el=>el.classList.remove('done'));
    document.querySelectorAll('.pc-item').forEach(el=>{ el.style.outline=''; el.style.background=''; });
    const items = [...document.querySelectorAll('.pc-item')];
    let matched = [];
    items.forEach((el,i)=>{
      const n = i+1;
      let match = false;
      if(sel==='nth-child(2)') match = n===2;
      else if(sel==='nth-child(odd)') match = n%2===1;
      else if(sel==='nth-child(even)') match = n%2===0;
      else if(sel==='nth-child(3n)') match = n%3===0;
      else if(sel==='first-child') match = n===1;
      else if(sel==='last-child') match = n===items.length;
      if(match){ el.style.outline='2px solid var(--teal)'; el.style.background='var(--teal-dim)'; matched.push(n); }
    });
    document.getElementById('pc-code').textContent = `li:${sel} { /* highlighted */ }\n/* matches items: ${matched.join(', ')} */`;
  };
  window.pcUpdate();
  renderQuiz('quiz-pseudo-classes', PSEUDO_CLASSES_QUIZ);
};

/* ---------- PSEUDO ELEMENTS ---------- */
RENDERERS['pseudo-elements'] = () => `
  <p class="lede">A pseudo-element targets a <b style="color:var(--text)">sub-part</b> of an element that doesn't exist in the DOM at all — the first line of a paragraph, or a generated box inserted before/after its content.</p>

  <h2>Try it live: ::before</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>content</label>
        <input type="text" id="pe-content" value="★ " oninput="window.peUpdate()">
      </div>
      <div class="ctrl">
        <label>color</label>
        <select id="pe-color" onchange="window.peUpdate()">
          <option value="var(--teal)">teal</option>
          <option value="var(--amber)">amber</option>
          <option value="var(--rose)">rose</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" style="justify-content:flex-start;">
      <p id="pe-demo" style="margin:0; color:var(--text); font-size:15px;">Featured product</p>
    </div>
    <div class="code-out" id="pe-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>::before / ::after</h4><p style="font-size:13px;margin:0;">Insert a generated box just inside the element's content, positioned first or last. Requires a <code>content</code> value (even an empty string) to render at all.</p></div>
    <div class="card"><h4>::first-line / ::first-letter</h4><p style="font-size:13px;margin:0;">Style just the first rendered line, or the first character — classic drop-cap or lede-paragraph styling.</p></div>
    <div class="card"><h4>::selection</h4><p style="font-size:13px;margin:0;">Styles the highlight color when a user selects text with their cursor.</p></div>
    <div class="card"><h4>::placeholder</h4><p style="font-size:13px;margin:0;">Styles an input's placeholder text separately from the typed value.</p></div>
  </div>

  <div class="callout warn"><b>Single vs. double colon:</b> modern CSS uses <code>::before</code> (double colon) for pseudo-elements and <code>:hover</code> (single colon) for pseudo-classes — the distinction exists to separate "a state" from "a generated sub-part." Browsers still accept the old single-colon form for legacy pseudo-elements for compatibility.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-pseudo-elements"></div>
`;
POST_RENDER['pseudo-elements'] = () => {
  window.peUpdate = function(){
    const c = document.getElementById('pe-content').value || '';
    const col = document.getElementById('pe-color').value;
    const demo = document.getElementById('pe-demo');
    demo.innerHTML = `<span style="color:${col}; font-weight:700;">${c.replace(/</g,'&lt;')}</span>Featured product`;
    document.getElementById('pe-code').textContent = `p::before {\n  content: "${c}";\n  color: ${col};\n}`;
  };
  window.peUpdate();
  renderQuiz('quiz-pseudo-elements', PSEUDO_ELEMENTS_QUIZ);
};

/* ---------- VARIABLES ---------- */
RENDERERS.variables = () => `
  <p class="lede">Custom properties (<code>--name</code>) store a value once and reuse it anywhere — and unlike Sass variables, they're live in the browser: change one, and everything referencing it updates instantly, even via JavaScript.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>--brand-hue <span id="vr-h-val">168</span></label><input type="range" id="vr-h" min="0" max="360" value="168" oninput="window.vrUpdate()"></div>
      <div class="ctrl"><label>--radius <span id="vr-r-val">10</span>px</label><input type="range" id="vr-r" min="0" max="30" value="10" oninput="window.vrUpdate()"></div>
    </div>
    <div class="viz-stage">
      <div id="vr-box" class="lab-item" style="width:120px; height:80px; color:#04211D; font-weight:700;">card</div>
    </div>
    <div class="code-out" id="vr-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>Scope</h4><p style="font-size:13px;margin:0;">Defined on <code>:root</code>, a variable is global. Defined on a specific selector, it only applies (cascades) to that element and its descendants — great for per-theme or per-component overrides.</p></div>
    <div class="card"><h4>var() with a fallback</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">color: var(--accent, teal);<br><span style="color:var(--text-dim); font-family:var(--font-body);">uses teal if --accent isn't defined</span></p></div>
    <div class="card"><h4>Live in JS</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">el.style.setProperty('--radius','20px')</p></div>
    <div class="card"><h4>vs. Sass variables</h4><p style="font-size:13px;margin:0;">Sass variables are compiled away at build time — fixed forever in the output CSS. Custom properties stay alive in the browser and can respond to media queries, JS, or user toggles at runtime.</p></div>
  </div>

  <div class="callout tip"><b>This app's theme switcher</b> (Dark / Light / Glass) works exactly this way — it swaps the values of the same set of custom properties on <code>[data-theme]</code>, and every component using <code>var(--bg)</code>, <code>var(--text)</code>, etc. updates instantly.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-variables"></div>
`;
POST_RENDER.variables = () => {
  window.vrUpdate = function(){
    const h = document.getElementById('vr-h').value;
    const r = document.getElementById('vr-r').value;
    document.getElementById('vr-h-val').textContent = h;
    document.getElementById('vr-r-val').textContent = r;
    const box = document.getElementById('vr-box');
    box.style.background = `hsl(${h} 70% 62%)`;
    box.style.borderRadius = r+'px';
    document.getElementById('vr-code').textContent = `:root {\n  --brand-hue: ${h};\n  --radius: ${r}px;\n}\n.card {\n  background: hsl(var(--brand-hue) 70% 62%);\n  border-radius: var(--radius);\n}`;
  };
  window.vrUpdate();
  renderQuiz('quiz-variables', VARIABLES_QUIZ);
};

/* ---------- FUNCTIONS ---------- */
RENDERERS.functions = () => `
  <p class="lede">CSS values aren't limited to literals — functions compute a value: math (<code>calc()</code>), responsive ranges (<code>clamp()</code>), color (<code>hsl()</code>), or picking between candidates (<code>min()</code>/<code>max()</code>).</p>

  <div class="grid-2">
    <div class="card"><h4>calc()</h4><p style="font-size:13px;margin:0;">Mixes units in one expression: <code>width: calc(100% - 40px);</code>. Covered in depth in its own chapter.</p></div>
    <div class="card"><h4>clamp(min, preferred, max)</h4><p style="font-size:13px;margin:0;">One fluid value with a floor and ceiling. Covered in depth in its own chapter.</p></div>
    <div class="card"><h4>min() / max()</h4><p style="font-size:13px;margin:0;">Picks the smallest/largest of a list of values, evaluated live. Covered in depth in its own chapter.</p></div>
    <div class="card"><h4>color-mix()</h4><p style="font-size:13px;margin:0;">Blends two colors by a percentage — no manual hex math. Covered in depth in its own chapter.</p></div>
    <div class="card"><h4>var()</h4><p style="font-size:13px;margin:0;">Reads a custom property, with an optional fallback value.</p></div>
    <div class="card"><h4>url() / attr()</h4><p style="font-size:13px;margin:0;"><code>url()</code> references an external resource (image, font); <code>attr()</code> pulls a value straight from an HTML attribute (mainly used in generated <code>content</code>).</p></div>
  </div>

  <h2>Try it live: a combined expression</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>base spacing <span id="fn-base-val">16</span>px</label><input type="range" id="fn-base" min="4" max="40" value="16" oninput="window.fnUpdate()"></div>
      <div class="ctrl"><label>multiplier <span id="fn-mult-val">2</span></label><input type="range" id="fn-mult" min="1" max="4" value="2" oninput="window.fnUpdate()"></div>
    </div>
    <div class="viz-stage">
      <div id="fn-box" class="lab-item" style="height:60px;">gap × mult</div>
    </div>
    <div class="code-out" id="fn-code">/* css */</div>
  </div>

  <div class="callout tip"><b>Why this matters for placement interviews:</b> being able to explain the difference between <code>calc()</code>, <code>clamp()</code>, and <code>min()</code>/<code>max()</code> — and when to reach for each — is a common frontend screening question, since they solve overlapping but distinct problems.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-functions"></div>
`;
POST_RENDER.functions = () => {
  window.fnUpdate = function(){
    const base = document.getElementById('fn-base').value;
    const mult = document.getElementById('fn-mult').value;
    document.getElementById('fn-base-val').textContent = base;
    document.getElementById('fn-mult-val').textContent = mult;
    document.getElementById('fn-box').style.padding = `calc(${base}px * ${mult})`;
    document.getElementById('fn-code').textContent = `.box {\n  padding: calc(${base}px * ${mult});\n}\n/* = ${base*mult}px */`;
  };
  window.fnUpdate();
  renderQuiz('quiz-functions', FUNCTIONS_QUIZ);
};

/* ---------- CALC ---------- */
RENDERERS.calc = () => `
  <p class="lede"><code>calc()</code> lets you mix units in a single expression — something plain CSS values can never do, like "100% of the container minus a fixed 40px sidebar."</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>subtract <span id="cc-sub-val">60</span>px</label><input type="range" id="cc-sub" min="0" max="200" value="60" oninput="window.ccUpdate()"></div>
    </div>
    <div class="viz-stage" style="align-items:flex-start; justify-content:flex-start; flex-direction:column; gap:8px;">
      <div style="width:100%; border:1px dashed var(--border); padding:8px; border-radius:6px;">
        <div id="cc-box" class="lab-item" style="height:50px;">calc(100% - Npx)</div>
      </div>
    </div>
    <div class="code-out" id="cc-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>Mixed units</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">width: calc(100% - 2rem);</p></div>
    <div class="card"><h4>Nesting variables</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">calc(var(--gap) * 3)</p></div>
    <div class="card"><h4>Sticky footer height</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">min-height: calc(100vh - 64px);</p></div>
    <div class="card"><h4>Operators</h4><p style="font-size:13px;margin:0;">Supports <code>+ - * /</code>. Spaces around <code>+</code>/<code>-</code> are mandatory (<code>calc(100% -20px)</code> is invalid — it reads as one negative value), but optional around <code>*</code>/<code>/</code>.</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> <code>calc(100% -20px)</code> throws a silent parse error because the browser can't tell if that's subtraction or a single negative length. Always write <code>calc(100% - 20px)</code> with spaces on both sides of <code>+</code> and <code>-</code>.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-calc"></div>
`;
POST_RENDER.calc = () => {
  window.ccUpdate = function(){
    const sub = document.getElementById('cc-sub').value;
    document.getElementById('cc-sub-val').textContent = sub;
    document.getElementById('cc-box').style.width = `calc(100% - ${sub}px)`;
    document.getElementById('cc-box').textContent = `calc(100% - ${sub}px)`;
    document.getElementById('cc-code').textContent = `.box {\n  width: calc(100% - ${sub}px);\n}`;
  };
  window.ccUpdate();
  renderQuiz('quiz-calc', CALC_QUIZ);
};

/* ---------- CLAMP ---------- */
RENDERERS.clamp = () => `
  <p class="lede"><code>clamp(min, preferred, max)</code> gives you one fluid value that scales with the viewport but never shrinks below a floor or grows past a ceiling — the modern replacement for a stack of media queries just to resize text.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>min <span id="cl-min-val">16</span>px</label><input type="range" id="cl-min" min="10" max="30" value="16" oninput="window.clUpdate()"></div>
      <div class="ctrl"><label>viewport-relative (vw) <span id="cl-vw-val">4</span></label><input type="range" id="cl-vw" min="1" max="10" step="0.5" value="4" oninput="window.clUpdate()"></div>
      <div class="ctrl"><label>max <span id="cl-max-val">48</span>px</label><input type="range" id="cl-max" min="30" max="80" value="48" oninput="window.clUpdate()"></div>
      <div class="ctrl"><label>simulated viewport <span id="cl-vp-val">800</span>px</label><input type="range" id="cl-vp" min="320" max="1600" value="800" oninput="window.clUpdate()"></div>
    </div>
    <div class="viz-stage" style="justify-content:flex-start;">
      <div id="cl-text" style="font-family:var(--font-display); font-weight:700; color:var(--teal);">Fluid heading</div>
    </div>
    <div class="code-out" id="cl-code">/* css */</div>
  </div>

  <div class="callout tip"><b>Reading it:</b> <code>clamp(16px, 4vw, 48px)</code> means "prefer 4% of viewport width, but never go below 16px and never above 48px." The middle value drives the scaling; min/max only kick in at the extremes.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-clamp"></div>
`;
POST_RENDER.clamp = () => {
  window.clUpdate = function(){
    const min = +document.getElementById('cl-min').value;
    const vw = +document.getElementById('cl-vw').value;
    const max = +document.getElementById('cl-max').value;
    const vp = +document.getElementById('cl-vp').value;
    document.getElementById('cl-min-val').textContent = min;
    document.getElementById('cl-vw-val').textContent = vw;
    document.getElementById('cl-max-val').textContent = max;
    document.getElementById('cl-vp-val').textContent = vp;
    const preferred = vp * (vw/100);
    const size = Math.min(Math.max(preferred, min), max);
    document.getElementById('cl-text').style.fontSize = size+'px';
    document.getElementById('cl-code').textContent = `h1 {\n  font-size: clamp(${min}px, ${vw}vw, ${max}px);\n}\n/* at ${vp}px viewport → renders ${size.toFixed(1)}px */`;
  };
  window.clUpdate();
  renderQuiz('quiz-clamp', CLAMP_QUIZ);
};

/* ---------- MIN/MAX ---------- */
RENDERERS['minmax-fn'] = () => `
  <p class="lede"><code>min()</code> picks the <b style="color:var(--text)">smallest</b> of a comma-separated list of values; <code>max()</code> picks the <b style="color:var(--text)">largest</b> — evaluated live as the page resizes, not just once.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>simulated container <span id="mm-vp-val">500</span>px</label><input type="range" id="mm-vp" min="200" max="900" value="500" oninput="window.mmUpdate()"></div>
    </div>
    <div class="viz-stage" style="align-items:flex-start; justify-content:flex-start;">
      <div id="mm-box" class="lab-item" style="height:60px;">width</div>
    </div>
    <div class="code-out" id="mm-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>min(90%, 600px)</h4><p style="font-size:13px;margin:0;">A container that's fluid on small screens but caps at 600px — whichever is <b>smaller</b> wins, so it never overflows a narrow viewport.</p></div>
    <div class="card"><h4>max(20px, 5%)</h4><p style="font-size:13px;margin:0;">A spacing value that's never smaller than 20px, but grows with the container once 5% exceeds it — whichever is <b>larger</b> wins.</p></div>
  </div>

  <div class="callout tip"><b>Relation to clamp():</b> <code>clamp(MIN, VAL, MAX)</code> is technically shorthand for <code>max(MIN, min(VAL, MAX))</code> — clamp is just the common min+max combo written as one function.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-minmax-fn"></div>
`;
POST_RENDER['minmax-fn'] = () => {
  window.mmUpdate = function(){
    const vp = +document.getElementById('mm-vp').value;
    document.getElementById('mm-vp-val').textContent = vp;
    const ninetyPct = vp * 0.9;
    const w = Math.min(ninetyPct, 400);
    document.getElementById('mm-box').style.width = w+'px';
    document.getElementById('mm-code').textContent = `.box {\n  width: min(90%, 400px);\n}\n/* container ${vp}px → 90% = ${ninetyPct.toFixed(0)}px → renders ${w.toFixed(0)}px */`;
  };
  window.mmUpdate();
  renderQuiz('quiz-minmax-fn', MINMAX_QUIZ);
};

/* ---------- ASPECT RATIO ---------- */
RENDERERS['aspect-ratio'] = () => `
  <p class="lede">The <code>aspect-ratio</code> property locks the relationship between an element's width and height — no more padding-percentage hacks to reserve space for a video or image before it loads.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>ratio</label>
        <select id="ar-val" onchange="window.arUpdate()">
          <option value="16/9">16 / 9</option>
          <option value="4/3">4 / 3</option>
          <option value="1/1">1 / 1</option>
          <option value="21/9">21 / 9</option>
        </select>
      </div>
      <div class="ctrl"><label>width <span id="ar-w-val">240</span>px</label><input type="range" id="ar-w" min="120" max="360" value="240" oninput="window.arUpdate()"></div>
    </div>
    <div class="viz-stage">
      <div id="ar-box" class="lab-item" style="background:linear-gradient(135deg,var(--teal-dim),var(--panel-raise));">frame</div>
    </div>
    <div class="code-out" id="ar-code">/* css */</div>
  </div>

  <div class="callout tip"><b>Why it matters:</b> reserving space for images/video with <code>aspect-ratio</code> before they finish loading prevents layout shift — a real, measured metric (Cumulative Layout Shift) that search engines and Core Web Vitals both score.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-aspect-ratio"></div>
`;
POST_RENDER['aspect-ratio'] = () => {
  window.arUpdate = function(){
    const r = document.getElementById('ar-val').value;
    const w = document.getElementById('ar-w').value;
    document.getElementById('ar-w-val').textContent = w;
    const box = document.getElementById('ar-box');
    box.style.aspectRatio = r;
    box.style.width = w+'px';
    box.style.height = 'auto';
    box.textContent = r.replace('/',':');
    document.getElementById('ar-code').textContent = `.frame {\n  width: ${w}px;\n  aspect-ratio: ${r};\n}`;
  };
  window.arUpdate();
  renderQuiz('quiz-aspect-ratio', ASPECT_RATIO_QUIZ);
};

/* ---------- OBJECT FIT ---------- */
RENDERERS['object-fit'] = () => `
  <p class="lede"><code>object-fit</code> controls how an <code>&lt;img&gt;</code> or <code>&lt;video&gt;</code> fills its box when the box's ratio doesn't match the media's natural ratio — the <code>background-size</code> equivalent for replaced elements.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>object-fit</label>
        <select id="of-val" onchange="window.ofUpdate()">
          <option value="fill">fill</option>
          <option value="contain">contain</option>
          <option value="cover" selected>cover</option>
          <option value="none">none</option>
          <option value="scale-down">scale-down</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div style="width:220px; height:140px; border:1px solid var(--border); border-radius:8px; overflow:hidden;">
        <div id="of-box" style="width:100%; height:100%; background:linear-gradient(135deg,var(--teal),var(--amber)); display:flex; align-items:center; justify-content:center; font-family:var(--font-code); font-size:11px; color:#04211D; font-weight:700;">300×450 image</div>
      </div>
    </div>
    <div class="code-out" id="of-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>fill (default)</h4><p style="font-size:13px;margin:0;">Stretches to fill the box exactly, distorting the aspect ratio if they don't match.</p></div>
    <div class="card"><h4>cover</h4><p style="font-size:13px;margin:0;">Fills the box completely, cropping overflow — no distortion, no gaps. The most common choice for thumbnails.</p></div>
    <div class="card"><h4>contain</h4><p style="font-size:13px;margin:0;">Fits the whole image inside the box, letterboxing with empty space if ratios differ. No cropping, no distortion.</p></div>
    <div class="card"><h4>none</h4><p style="font-size:13px;margin:0;">Ignores the box size entirely and renders at the image's natural size, cropped by the box's overflow.</p></div>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-object-fit"></div>
`;
POST_RENDER['object-fit'] = () => {
  window.ofUpdate = function(){
    const v = document.getElementById('of-val').value;
    const box = document.getElementById('of-box');
    if(v==='fill'){ box.style.width='100%'; box.style.height='100%'; }
    else if(v==='contain'){ box.style.width='60%'; box.style.height='90%'; box.style.margin='auto'; }
    else if(v==='cover'){ box.style.width='140%'; box.style.height='100%'; box.style.marginLeft='-20%'; }
    else if(v==='none'){ box.style.width='300px'; box.style.height='450px'; }
    else { box.style.width='60%'; box.style.height='90%'; box.style.margin='auto'; }
    document.getElementById('of-code').textContent = `img {\n  width: 100%;\n  height: 100%;\n  object-fit: ${v};\n}`;
  };
  window.ofUpdate();
  renderQuiz('quiz-object-fit', OBJECT_FIT_QUIZ);
};

/* ---------- NESTING ---------- */
RENDERERS.nesting = () => `
  <p class="lede">Native CSS nesting lets you write a child selector inside its parent's rule block — no preprocessor required. The <code>&amp;</code> symbol stands in for the parent selector.</p>

  <div class="grid-2">
    <div class="card"><h4>Plain CSS (no preprocessor needed)</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0; white-space:pre-wrap;">.card {
  padding: 16px;
  &:hover { border-color: var(--teal); }
  & .title { font-weight: 700; }
  &.featured { background: var(--teal-dim); }
}</pre></div>
    <div class="card"><h4>Equivalent flattened CSS</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--text-muted); margin:0; white-space:pre-wrap;">.card { padding: 16px; }
.card:hover { border-color: var(--teal); }
.card .title { font-weight: 700; }
.card.featured { background: var(--teal-dim); }</pre></div>
  </div>

  <div class="callout tip"><b>Why teams like it:</b> nesting keeps related rules visually grouped in the source file — the same benefit Sass/Less nesting gave, but now understood natively by the browser with no build step.</div>

  <div class="callout warn"><b>Watch out:</b> without the <code>&amp;</code>, a nested selector starting with a type name (like <code>span { … }</code>) is still valid and means "any descendant span" — but nesting a rule that starts with an identifier that could be misread as a declaration requires care; when in doubt, prefix with <code>&amp;</code>.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-nesting"></div>
`;
POST_RENDER.nesting = () => renderQuiz('quiz-nesting', NESTING_QUIZ);

/* ---------- IS/WHERE/HAS ---------- */
RENDERERS['is-where-has'] = () => `
  <p class="lede">Three relational pseudo-classes that make selectors shorter and, in one case, let CSS finally select based on an element's <b style="color:var(--text)">children</b> — something previously impossible.</p>

  <div class="grid-2">
    <div class="card"><h4>:is()</h4><p style="font-size:13px;margin:0;">Groups a list of selectors into one: <code>:is(h1, h2, h3) { }</code> instead of writing <code>h1, h2, h3</code> repeated with a shared descendant prefix. Takes the specificity of its most specific argument.</p></div>
    <div class="card"><h4>:where()</h4><p style="font-size:13px;margin:0;">Identical grouping behavior to <code>:is()</code>, but always contributes <b>zero specificity</b> — ideal for base/reset styles you want easy to override later.</p></div>
    <div class="card"><h4>:has()</h4><p style="font-size:13px;margin:0;">The long-awaited "parent selector" — <code>.card:has(img)</code> selects a <code>.card</code> only if it contains an <code>img</code> anywhere inside it.</p></div>
    <div class="card"><h4>Real :has() use case</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">form:has(:invalid) { border-color: red; }</p></div>
  </div>

  <div class="callout tip"><b>Why :where() exists at all:</b> component libraries use it for base styles precisely because zero specificity means a consumer's single class selector will always be able to override it — no specificity wars, no <code>!important</code> needed.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-is-where-has"></div>
`;
POST_RENDER['is-where-has'] = () => renderQuiz('quiz-is-where-has', IS_WHERE_HAS_QUIZ);

/* ---------- LOGICAL PROPERTIES ---------- */
RENDERERS['logical-props'] = () => `
  <p class="lede">Logical properties describe direction relative to <b style="color:var(--text)">writing mode</b> (start/end) instead of a fixed physical side (left/right) — so the same CSS automatically adapts for right-to-left languages.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>direction</label>
        <select id="lp-dir" onchange="window.lpUpdate()">
          <option value="ltr">ltr (English, Hindi)</option>
          <option value="rtl">rtl (Arabic, Hebrew)</option>
        </select>
      </div>
    </div>
    <div class="viz-stage" id="lp-stage" style="align-items:flex-start; justify-content:flex-start; padding:16px;">
      <div id="lp-box" style="background:var(--panel-raise); border:1px solid var(--border); border-radius:6px; padding:14px; margin-inline-start:40px; width:160px; font-size:12.5px; color:var(--text);">margin-inline-start: 40px</div>
    </div>
    <div class="code-out" id="lp-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>margin-inline-start / end</h4><p style="font-size:13px;margin:0;">Replaces <code>margin-left</code>/<code>margin-right</code> — "start" flips to the right automatically in RTL layouts.</p></div>
    <div class="card"><h4>padding-block-start / end</h4><p style="font-size:13px;margin:0;">Replaces <code>padding-top</code>/<code>padding-bottom</code> — "block" is the direction text stacks, which can itself change in vertical writing modes.</p></div>
    <div class="card"><h4>inset-inline / inset-block</h4><p style="font-size:13px;margin:0;">Logical equivalents of <code>left</code>/<code>right</code> and <code>top</code>/<code>bottom</code> for positioned elements.</p></div>
    <div class="card"><h4>Why it matters for placement</h4><p style="font-size:13px;margin:0;">Any product with international users needs RTL support eventually — knowing logical properties signals you can build layouts that don't need to be rewritten for Arabic/Hebrew/Urdu.</p></div>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-logical-props"></div>
`;
POST_RENDER['logical-props'] = () => {
  window.lpUpdate = function(){
    const dir = document.getElementById('lp-dir').value;
    document.getElementById('lp-stage').style.direction = dir;
    document.getElementById('lp-code').textContent = `html { direction: ${dir}; }\n.box { margin-inline-start: 40px; }\n/* renders as margin-${dir==='ltr'?'left':'right'} in this direction */`;
  };
  window.lpUpdate();
  renderQuiz('quiz-logical-props', LOGICAL_PROPS_QUIZ);
};

/* ---------- SCROLL SNAP ---------- */
RENDERERS['scroll-snap'] = () => `
  <p class="lede">Scroll snap makes a scroll container settle precisely on child boundaries — the mechanism behind mobile-style image carousels and full-screen section scrolling, with zero JavaScript.</p>

  <h2>Try it live — scroll horizontally</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl">
        <label>scroll-snap-align</label>
        <select id="ss-val" onchange="window.ssUpdate()">
          <option value="start">start</option>
          <option value="center">center</option>
        </select>
      </div>
    </div>
    <div id="ss-stage" style="display:flex; gap:10px; overflow-x:auto; scroll-snap-type:x mandatory; padding:16px; background:var(--panel); border:1px solid var(--border-soft); border-radius:10px;">
      ${[1,2,3,4,5].map(n=>`<div class="lab-item ss-item" style="min-width:140px; height:100px; flex-shrink:0; scroll-snap-align:start;">Slide ${n}</div>`).join('')}
    </div>
    <div class="code-out" id="ss-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>scroll-snap-type (on the container)</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">scroll-snap-type: x mandatory;</p></div>
    <div class="card"><h4>scroll-snap-align (on each child)</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">scroll-snap-align: start;</p></div>
    <div class="card"><h4>mandatory vs. proximity</h4><p style="font-size:13px;margin:0;"><code>mandatory</code> always snaps to the nearest point; <code>proximity</code> only snaps if you're already close, otherwise scrolling stays free.</p></div>
    <div class="card"><h4>No JS required</h4><p style="font-size:13px;margin:0;">Unlike most carousel libraries, this is pure CSS — lighter weight, and it inherits native scroll physics (momentum, keyboard, trackpad) for free.</p></div>
  </div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-scroll-snap"></div>
`;
POST_RENDER['scroll-snap'] = () => {
  window.ssUpdate = function(){
    const v = document.getElementById('ss-val').value;
    document.querySelectorAll('.ss-item').forEach(el=>el.style.scrollSnapAlign = v);
    document.getElementById('ss-code').textContent = `.container {\n  display: flex;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n}\n.slide {\n  scroll-snap-align: ${v};\n}`;
  };
  window.ssUpdate();
  renderQuiz('quiz-scroll-snap', SCROLL_SNAP_QUIZ);
};

/* ---------- CONTAINER QUERIES ---------- */
RENDERERS['container-queries'] = () => `
  <p class="lede">Media queries respond to the <b style="color:var(--text)">viewport</b>. Container queries respond to the size of a component's own <b style="color:var(--text)">parent container</b> — so the same card can adapt whether it's in a wide sidebar or a narrow grid slot, regardless of overall screen size.</p>

  <h2>Try it live — resize the container</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>container width <span id="cq-w-val">380</span>px</label><input type="range" id="cq-w" min="180" max="500" value="380" oninput="window.cqUpdate()"></div>
    </div>
    <div class="viz-stage" style="justify-content:flex-start;">
      <div id="cq-container" style="container-type:inline-size; border:1px dashed var(--border); border-radius:8px; padding:14px;">
        <div id="cq-card" style="display:flex; gap:12px; align-items:center; flex-direction:column;">
          <div style="width:100%; height:60px; background:var(--panel-raise); border-radius:6px; border:1px solid var(--border);"></div>
          <div style="font-family:var(--font-code); font-size:12px; color:var(--text);" id="cq-label">stacked (narrow)</div>
        </div>
      </div>
    </div>
    <div class="code-out" id="cq-code">/* css */</div>
  </div>

  <div class="callout tip"><b>Why this beats media queries for components:</b> a reusable card component might live in a 3-column grid on one page and a full-width hero on another — a media query only knows the screen size, not which layout slot the card landed in. Container queries let the component itself decide.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-container-queries"></div>
`;
POST_RENDER['container-queries'] = () => {
  window.cqUpdate = function(){
    const w = +document.getElementById('cq-w').value;
    document.getElementById('cq-w-val').textContent = w;
    const container = document.getElementById('cq-container');
    const card = document.getElementById('cq-card');
    container.style.width = w+'px';
    const wide = w >= 340;
    card.style.flexDirection = wide ? 'row' : 'column';
    document.getElementById('cq-label').textContent = wide ? 'row layout (wide container)' : 'stacked (narrow container)';
    document.getElementById('cq-code').textContent = `.wrapper { container-type: inline-size; }\n@container (min-width: 340px) {\n  .card { flex-direction: row; }\n}\n/* container is ${w}px → ${wide?'query matches':'query does not match'} */`;
  };
  window.cqUpdate();
  renderQuiz('quiz-container-queries', CONTAINER_QUERIES_QUIZ);
};

/* ---------- COLOR MIX ---------- */
RENDERERS['color-mix'] = () => `
  <p class="lede"><code>color-mix()</code> blends two colors by a percentage directly in CSS — tinting, shading, or fading a brand color without precomputing hex values in a design tool.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>mix with white <span id="cm-pct-val">30</span>%</label><input type="range" id="cm-pct" min="0" max="100" value="30" oninput="window.cmUpdate()"></div>
      <div class="ctrl">
        <label>blend with</label>
        <select id="cm-target" onchange="window.cmUpdate()">
          <option value="white">white (tint)</option>
          <option value="black">black (shade)</option>
          <option value="transparent">transparent (fade)</option>
        </select>
      </div>
    </div>
    <div class="viz-stage">
      <div id="cm-swatch" style="width:160px; height:100px; border-radius:12px; border:1px solid var(--border); background:var(--teal);"></div>
    </div>
    <div class="code-out" id="cm-code">/* css */</div>
  </div>

  <div class="callout tip"><b>Before color-mix():</b> teams either hardcoded pre-computed tint/shade hex values, or reached for a Sass function like <code>lighten()</code> at build time. <code>color-mix()</code> does it live in the browser, so it works even with runtime values like CSS variables.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-color-mix"></div>
`;
POST_RENDER['color-mix'] = () => {
  window.cmUpdate = function(){
    const pct = document.getElementById('cm-pct').value;
    const target = document.getElementById('cm-target').value;
    document.getElementById('cm-pct-val').textContent = pct;
    const swatch = document.getElementById('cm-swatch');
    swatch.style.background = `color-mix(in srgb, var(--teal), ${target} ${pct}%)`;
    document.getElementById('cm-code').textContent = `.swatch {\n  background: color-mix(in srgb, var(--teal), ${target} ${pct}%);\n}`;
  };
  window.cmUpdate();
  renderQuiz('quiz-color-mix', COLOR_MIX_QUIZ);
};

/* ---------- MEDIA QUERIES ---------- */
RENDERERS['media-queries'] = () => `
  <p class="lede"><code>@media</code> applies a block of CSS only when a condition about the environment — viewport width, orientation, color scheme — is true. It's the foundation responsive design was built on before container queries existed.</p>

  <h2>Try it live</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>simulated viewport <span id="mq-w-val">900</span>px</label><input type="range" id="mq-w" min="320" max="1400" value="900" oninput="window.mqUpdate()"></div>
    </div>
    <div class="viz-stage" style="justify-content:flex-start; align-items:flex-start;">
      <div id="mq-grid" style="display:grid; gap:8px; width:100%;">
        ${[1,2,3].map(n=>`<div class="lab-item">Card ${n}</div>`).join('')}
      </div>
    </div>
    <div class="code-out" id="mq-code">/* css */</div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>min-width vs max-width</h4><p style="font-size:13px;margin:0;"><code>min-width</code> applies at that width <b>and above</b> — the basis of mobile-first. <code>max-width</code> applies at that width <b>and below</b> — the basis of desktop-first.</p></div>
    <div class="card"><h4>prefers-color-scheme</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">@media (prefers-color-scheme: dark) { }</p></div>
    <div class="card"><h4>prefers-reduced-motion</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">@media (prefers-reduced-motion: reduce) { }</p></div>
    <div class="card"><h4>Common breakpoints</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">640px · 768px · 1024px · 1280px</p></div>
  </div>

  <div class="callout tip"><b>Real breakpoints aren't device-specific:</b> the modern approach is to resize the browser until <em>your own content</em> starts to look cramped or awkwardly stretched, and put the breakpoint there — not at a fixed "iPhone" or "iPad" width, since device sizes change constantly.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-media-queries"></div>
`;
POST_RENDER['media-queries'] = () => {
  window.mqUpdate = function(){
    const w = +document.getElementById('mq-w').value;
    document.getElementById('mq-w-val').textContent = w;
    const cols = w >= 900 ? 3 : w >= 600 ? 2 : 1;
    document.getElementById('mq-grid').style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    document.getElementById('mq-code').textContent = `.grid { grid-template-columns: 1fr; }\n@media (min-width: 600px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 900px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n/* viewport ${w}px → ${cols} column(s) */`;
  };
  window.mqUpdate();
  renderQuiz('quiz-media-queries', MEDIA_QUERIES_QUIZ);
};

/* ---------- RESPONSIVE IMAGES ---------- */
RENDERERS['responsive-images'] = () => `
  <p class="lede">The single most important responsive-image rule is one line of CSS. Beyond that, HTML itself offers <code>srcset</code> and <code>&lt;picture&gt;</code> to serve genuinely different image files per screen — not just resize one large file.</p>

  <div class="grid-2">
    <div class="card"><h4>The baseline rule</h4><pre style="font-family:var(--font-code); font-size:12.5px; color:var(--teal); margin:0;">img {
  max-width: 100%;
  height: auto;
}</pre><p style="font-size:12.5px; margin:8px 0 0;">Prevents any image from overflowing its container, while <code>height: auto</code> keeps the aspect ratio intact as width shrinks.</p></div>
    <div class="card"><h4>srcset — same image, multiple resolutions</h4><pre style="font-family:var(--font-code); font-size:11px; color:var(--teal); margin:0; white-space:pre-wrap;">&lt;img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1200.jpg 1200w"
  sizes="(min-width:900px) 800px, 100vw"&gt;</pre></div>
    <div class="card"><h4>&lt;picture&gt; — art direction</h4><p style="font-size:13px;margin:0;">Lets you serve a <b>cropped/different</b> image per breakpoint (not just a resized one) — e.g. a tighter portrait crop on mobile vs. a wide landscape on desktop.</p></div>
    <div class="card"><h4>Why it matters for performance</h4><p style="font-size:13px;margin:0;">A phone downloading the same 4000px hero image a 4K desktop monitor needs wastes bandwidth and slows load time — this is one of the most common Lighthouse warnings in real audits.</p></div>
  </div>

  <div class="callout warn"><b>srcset vs. sizes:</b> <code>srcset</code> lists the candidate files and their real widths; <code>sizes</code> tells the browser how wide the image will actually render at each breakpoint, so it can pick the smallest sufficient candidate <em>before</em> downloading anything.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-responsive-images"></div>
`;
POST_RENDER['responsive-images'] = () => renderQuiz('quiz-responsive-images', RESPONSIVE_IMAGES_QUIZ);

/* ---------- MOBILE FIRST ---------- */
RENDERERS['mobile-first'] = () => `
  <p class="lede">Both approaches use the same media queries — they differ only in which layout is the <b style="color:var(--text)">default</b>, unwrapped in any query, and which direction the breakpoints add complexity.</p>

  <div class="grid-2">
    <div class="card"><h4>Mobile-first (min-width)</h4><pre style="font-family:var(--font-code); font-size:11.5px; color:var(--teal); margin:0; white-space:pre-wrap;">.grid { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid { grid-template-columns: 1fr 1fr; }
}</pre><p style="font-size:12.5px; margin:8px 0 0;">Base styles are the simplest, smallest-screen layout; queries progressively <b>add</b> complexity as space allows.</p></div>
    <div class="card"><h4>Desktop-first (max-width)</h4><pre style="font-family:var(--font-code); font-size:11.5px; color:var(--amber); margin:0; white-space:pre-wrap;">.grid { grid-template-columns: 1fr 1fr; }

@media (max-width: 767px) {
  .grid { grid-template-columns: 1fr; }
}</pre><p style="font-size:12.5px; margin:8px 0 0;">Base styles are the full desktop layout; queries progressively <b>strip away</b> complexity as space shrinks.</p></div>
  </div>

  <div class="callout tip"><b>Why mobile-first won:</b> most real-world traffic is mobile, so shipping the lean base case by default (rather than overriding a heavy desktop layout down) means mobile users load less unnecessary CSS. It also forces you to design core content first, decoration second.</div>

  <div class="callout warn"><b>Interview trap:</b> mixing the two approaches in one codebase (some queries using <code>min-width</code>, others <code>max-width</code>) creates overlapping, hard-to-predict cascades. Pick one direction per project and stay consistent.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-mobile-first"></div>
`;
POST_RENDER['mobile-first'] = () => renderQuiz('quiz-mobile-first', MOBILE_FIRST_QUIZ);

/* ---------- ACCESSIBILITY ---------- */
RENDERERS.accessibility = () => `
  <p class="lede">A meaningful slice of accessibility is just CSS decisions: color contrast, focus visibility, motion sensitivity, and respecting content when it's hidden or shown. None of it requires a screen reader to understand.</p>

  <h2>Try it live: contrast checker</h2>
  <div class="viz-panel">
    <div class="viz-controls">
      <div class="ctrl"><label>text lightness <span id="a11y-l-val">55</span>%</label><input type="range" id="a11y-l" min="10" max="90" value="55" oninput="window.a11yUpdate()"></div>
    </div>
    <div class="viz-stage" style="flex-direction:column; gap:10px;">
      <div style="background:#12151C; padding:16px; border-radius:8px; width:100%;">
        <p id="a11y-text" style="margin:0; font-size:15px;">The quick brown fox jumps over the lazy dog.</p>
      </div>
      <div id="a11y-verdict" style="font-family:var(--font-code); font-size:13px;"></div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>Never remove focus outlines outright</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">/* don't: */ *{outline:none;}<br>/* do: */ :focus-visible { outline: 2px solid teal; }</p></div>
    <div class="card"><h4>prefers-reduced-motion</h4><p style="font-size:13px;margin:0;">Wrap non-essential animations so users with vestibular disorders can disable them at the OS level, honored automatically by this media feature.</p></div>
    <div class="card"><h4>Contrast ratio (WCAG AA)</h4><p style="font-size:13px;margin:0;">Minimum 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+ regular) — checked mathematically, not by eye.</p></div>
    <div class="card"><h4>Visually hidden, not display:none</h4><p style="font-size:13px;margin:0;">A "skip to content" link should be hidden visually (clipped, off-screen) but remain in the accessibility tree — <code>display:none</code> removes it from both.</p></div>
  </div>

  <div class="callout warn"><b>Interview trap:</b> <code>visibility: hidden</code> and <code>display: none</code> both hide visually and both remove from the accessibility tree — neither is the right tool for "hide visually, keep for screen readers." That needs a dedicated <code>.sr-only</code> class using clipping/offscreen positioning instead.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-accessibility"></div>
`;
POST_RENDER.accessibility = () => {
  window.a11yUpdate = function(){
    const l = document.getElementById('a11y-l').value;
    document.getElementById('a11y-l-val').textContent = l;
    document.getElementById('a11y-text').style.color = `hsl(0 0% ${l}%)`;
    const verdict = document.getElementById('a11y-verdict');
    const pass = l >= 55;
    verdict.innerHTML = pass
      ? `<span style="color:var(--success)">✓ Roughly sufficient contrast against a dark background</span>`
      : `<span style="color:var(--rose)">✗ Too close to the background — fails WCAG contrast at this lightness</span>`;
  };
  window.a11yUpdate();
  renderQuiz('quiz-accessibility', ACCESSIBILITY_QUIZ);
};

/* ---------- PERFORMANCE ---------- */
RENDERERS.performance = () => `
  <p class="lede">CSS performance mostly comes down to one idea: which properties force the browser to redo expensive work (layout, paint) versus which ones the GPU can handle cheaply (composite).</p>

  <div class="grid-2">
    <div class="card"><h4>Layout (expensive)</h4><p style="font-size:13px;margin:0;">Changing <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, or font size forces the browser to recompute geometry for that element and often its neighbors — a full reflow.</p></div>
    <div class="card"><h4>Paint (moderate)</h4><p style="font-size:13px;margin:0;">Changing <code>background</code>, <code>color</code>, or <code>box-shadow</code> skips layout but still repaints pixels.</p></div>
    <div class="card"><h4>Composite (cheap)</h4><p style="font-size:13px;margin:0;">Changing <code>transform</code> or <code>opacity</code> can often be handled entirely on the GPU compositor thread — no layout, no repaint. This is why they're the animation-safe pair.</p></div>
    <div class="card"><h4>will-change</h4><p style="font-size:13px;margin:0;">Hints to the browser to promote an element to its own compositor layer ahead of time — use sparingly, only on elements about to animate, since it costs memory.</p></div>
  </div>

  <div class="callout warn"><b>Common mistake:</b> animating <code>left</code>/<code>top</code> to move an element repeatedly triggers layout on every frame. The fix is almost always to animate <code>transform: translateX()</code>/<code>translateY()</code> instead — same visual result, none of the layout cost.</div>

  <div class="callout tip"><b>Other CSS performance levers:</b> avoid deeply nested selectors (the browser matches selectors right-to-left, so <code>.a .b .c .d {}</code> is more expensive to match than a single class), minimize the number of stylesheets/critical CSS on first paint, and prefer CSS containment (<code>contain: layout;</code>) for independent widgets.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-performance"></div>
`;
POST_RENDER.performance = () => renderQuiz('quiz-performance', PERFORMANCE_QUIZ);

/* ---------- CSS ARCHITECTURE ---------- */
RENDERERS['css-architecture'] = () => `
  <p class="lede">As a codebase grows, the hard problem stops being "how do I style this" and becomes "how do I stop this style from leaking into something else." Architecture is the set of conventions that keep CSS predictable at scale.</p>

  <div class="grid-2">
    <div class="card"><h4>The core problem: global scope</h4><p style="font-size:13px;margin:0;">Every CSS rule is global by default — a <code>.title</code> class styles <b>every</b> <code>.title</code> on the page, in every component, forever. Architecture methodologies exist to simulate scoping.</p></div>
    <div class="card"><h4>Naming conventions</h4><p style="font-size:13px;margin:0;">BEM, SMACSS, and similar systems use naming patterns to fake component boundaries — covered in the BEM chapter.</p></div>
    <div class="card"><h4>Utility-first</h4><p style="font-size:13px;margin:0;">Tailwind-style atomic classes sidestep naming entirely by composing tiny, single-purpose classes directly in markup — covered in its own chapter.</p></div>
    <div class="card"><h4>True scoping</h4><p style="font-size:13px;margin:0;">CSS Modules, styled-components, and the Shadow DOM actually enforce scope at the tooling/browser level rather than by convention — the direction most modern frameworks default to.</p></div>
  </div>

  <div class="callout tip"><b>What interviewers are really asking:</b> when a frontend interview asks "how do you structure your CSS," they're checking whether you've hit the global-scope problem in a real project and know at least one deliberate way to solve it — not whether you've memorized every methodology's exact rules.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-css-architecture"></div>
`;
POST_RENDER['css-architecture'] = () => renderQuiz('quiz-css-architecture', CSS_ARCHITECTURE_QUIZ);

/* ---------- BEM ---------- */
RENDERERS.bem = () => `
  <p class="lede">BEM (Block, Element, Modifier) is a naming convention that encodes a component's structure directly into the class name — so specificity stays flat and relationships are readable without needing nested selectors.</p>

  <div class="viz-panel">
    <div style="font-family:var(--font-code); font-size:14px; line-height:2.2;">
      <span style="color:var(--teal); font-weight:700;">card</span><span style="color:var(--text-dim);">__</span><span style="color:var(--amber); font-weight:700;">title</span><span style="color:var(--text-dim);">--</span><span style="color:var(--rose); font-weight:700;">large</span>
      <br>
      <span style="color:var(--teal);">↑ Block</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--amber);">↑ Element</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--rose);">↑ Modifier</span>
    </div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>Block</h4><p style="font-size:13px;margin:0;">A standalone, reusable component: <code>.card</code>, <code>.nav</code>, <code>.button</code>. Makes sense on its own.</p></div>
    <div class="card"><h4>Element</h4><p style="font-size:13px;margin:0;">A part of a block that has no meaning outside it: <code>.card__title</code>, <code>.card__image</code>. Written with a double underscore.</p></div>
    <div class="card"><h4>Modifier</h4><p style="font-size:13px;margin:0;">A variant or state of a block/element: <code>.card--featured</code>, <code>.button--disabled</code>. Written with a double hyphen.</p></div>
    <div class="card"><h4>Why it works</h4><p style="font-size:13px;margin:0;">Every class is a single flat selector — <code>.card__title</code> not <code>.card .title</code> — so specificity never climbs and nothing ever accidentally matches a nested element elsewhere on the page.</p></div>
  </div>

  <div class="callout warn"><b>Common mistake:</b> nesting BEM classes to mirror DOM nesting, like <code>.card__body__title</code> — BEM elements are flat by design. Every element belongs directly to the block: <code>.card__title</code>, even if it's visually three levels deep inside <code>.card</code>.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-bem"></div>
`;
POST_RENDER.bem = () => renderQuiz('quiz-bem', BEM_QUIZ);

/* ---------- UTILITY CLASSES ---------- */
RENDERERS['utility-classes'] = () => `
  <p class="lede">A utility class does exactly one thing: <code>.mt-4</code> sets margin-top, <code>.flex</code> sets display:flex. Instead of naming components, you compose many small utilities directly on an element.</p>

  <div class="grid-2">
    <div class="card"><h4>BEM approach</h4><pre style="font-family:var(--font-code); font-size:11.5px; color:var(--teal); margin:0; white-space:pre-wrap;">&lt;div class="card card--row"&gt;

.card { padding: 16px; border-radius: 8px; }
.card--row { display: flex; gap: 12px; }</pre></div>
    <div class="card"><h4>Utility-first approach</h4><pre style="font-family:var(--font-code); font-size:11.5px; color:var(--amber); margin:0; white-space:pre-wrap;">&lt;div class="p-4 rounded-lg flex gap-3"&gt;

/* no custom CSS written at all */</pre></div>
  </div>

  <div class="grid-2">
    <div class="card"><h4>Pro: no naming, no dead CSS</h4><p style="font-size:13px;margin:0;">You never invent a class name, and unused utility classes are trivially removed by build tooling since usage is explicit in the markup.</p></div>
    <div class="card"><h4>Con: verbose markup</h4><p style="font-size:13px;margin:0;">A single element can accumulate a long list of classes, which some teams find harder to scan than a single semantic class name.</p></div>
  </div>

  <div class="callout tip"><b>Not mutually exclusive:</b> many real codebases mix both — small reusable primitives (buttons, cards) get a semantic BEM-style class, while one-off spacing and layout tweaks use utility classes. Tailwind (the most popular utility framework) is covered in the next chapter.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-utility-classes"></div>
`;
POST_RENDER['utility-classes'] = () => renderQuiz('quiz-utility-classes', UTILITY_CLASSES_QUIZ);

/* ---------- TAILWIND CONCEPTS ---------- */
RENDERERS['tailwind-concepts'] = () => `
  <p class="lede">Tailwind is the most widely used utility-first framework — worth understanding conceptually even without using it directly, since so many frontend job listings mention it by name.</p>

  <div class="grid-2">
    <div class="card"><h4>Class → CSS mapping</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">flex → display: flex<br>gap-4 → gap: 1rem<br>text-lg → font-size: 1.125rem<br>rounded-lg → border-radius: 0.5rem</p></div>
    <div class="card"><h4>Responsive prefixes</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">md:flex-row<br><span style="color:var(--text-dim); font-family:var(--font-body);">→ applies flex-row only from the "md" breakpoint up — mobile-first by convention.</span></p></div>
    <div class="card"><h4>State variants</h4><p style="font-size:13px;margin:0;font-family:var(--font-code);">hover:bg-teal-600<br>focus:ring-2<br>disabled:opacity-50</p></div>
    <div class="card"><h4>Design tokens, not magic numbers</h4><p style="font-size:13px;margin:0;">Spacing/color/size classes map to a constrained scale (<code>p-4</code>, not <code>p-17px</code>) — this consistency is a large part of Tailwind's appeal for design systems.</p></div>
  </div>

  <div class="callout tip"><b>What it's built on:</b> Tailwind doesn't invent new CSS behavior — every class it generates maps to plain properties you've already learned in this app (flexbox, grid, spacing, color). Knowing the underlying CSS is what lets you actually debug Tailwind output when something looks wrong.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-tailwind-concepts"></div>
`;
POST_RENDER['tailwind-concepts'] = () => renderQuiz('quiz-tailwind-concepts', TAILWIND_QUIZ);

/* ---------- PRINT CSS ---------- */
RENDERERS['print-css'] = () => `
  <p class="lede">A <code>@media print</code> block lets you ship a completely different stylesheet for when a page is printed or saved as PDF — invisible on screen, but often essential for invoices, resumes, and articles.</p>

  <div class="grid-2">
    <div class="card"><h4>The query</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0; white-space:pre-wrap;">@media print {
  nav, .sidebar, .no-print { display: none; }
  body { color: #000; background: #fff; }
  a::after { content: " (" attr(href) ")"; }
}</pre></div>
    <div class="card"><h4>Common print rules</h4><p style="font-size:13px;margin:0;">Hide navigation and interactive controls, force black text on white background to save ink, expand link URLs since clicks don't work on paper, and set explicit page margins with <code>@page</code>.</p></div>
  </div>

  <div class="callout tip"><b>Where this actually comes up:</b> resume-builder tools, invoice/receipt pages, and article "print this page" buttons all rely on print stylesheets — a small chapter, but a real, practical one for portfolio projects like an ERP or invoicing app.</div>

  <h2>Quick knowledge check</h2>
  <div class="quiz-box" id="quiz-print-css"></div>
`;
POST_RENDER['print-css'] = () => renderQuiz('quiz-print-css', PRINT_CSS_QUIZ);

/* ---------- INTERVIEW QUESTIONS ---------- */
RENDERERS['interview-questions'] = () => `
  <p class="lede">The questions that come up repeatedly in frontend screening rounds — short, conceptual, and designed to check you understand <em>why</em>, not just the syntax.</p>

  <div class="viz-panel">
    <div class="quiz-q"><p>1. What's the difference between <code>margin</code> and <code>padding</code>?</p><p style="font-size:13px; color:var(--text-muted);">Padding is inside the border (part of the element's own background); margin is outside the border (transparent space between elements). Vertical margins between siblings can collapse — padding never does.</p></div>
    <div class="quiz-q"><p>2. Explain the CSS box model.</p><p style="font-size:13px; color:var(--text-muted);">From the inside out: content → padding → border → margin. <code>box-sizing: border-box</code> changes whether width/height include padding+border. See the Box Model lab for a live version of this.</p></div>
    <div class="quiz-q"><p>3. How does specificity get calculated?</p><p style="font-size:13px; color:var(--text-muted);">A (ID, class/attribute/pseudo-class, element) triplet compared left to right — an ID always beats any number of classes, which always beat any number of elements. Equal specificity falls back to source order.</p></div>
    <div class="quiz-q"><p>4. Flexbox vs. Grid — when do you use which?</p><p style="font-size:13px; color:var(--text-muted);">Flexbox for one-dimensional layout (a row or a column of items that should distribute along one axis). Grid for two-dimensional layout (rows and columns together, precise placement).</p></div>
    <div class="quiz-q"><p>5. What causes margin collapsing, and how do you prevent it?</p><p style="font-size:13px; color:var(--text-muted);">Adjacent vertical margins between block siblings (or a parent/first-child with no border/padding between them) merge into the larger value. Prevented by adding padding/border between them, or by using a flex/grid container instead of normal flow.</p></div>
    <div class="quiz-q"><p>6. What's the difference between <code>display:none</code> and <code>visibility:hidden</code>?</p><p style="font-size:13px; color:var(--text-muted);"><code>display:none</code> removes the element from layout entirely (no space reserved) and from the accessibility tree. <code>visibility:hidden</code> keeps its layout space but hides it visually — it can still be targeted with <code>visibility:visible</code> on a descendant to re-show a piece of it.</p></div>
    <div class="quiz-q"><p>7. How would you center a div, in as many ways as you can think of?</p><p style="font-size:13px; color:var(--text-muted);">Flexbox (<code>justify-content:center; align-items:center;</code>), Grid (<code>place-items:center;</code>), absolute positioning + transform (<code>top:50%;left:50%;transform:translate(-50%,-50%);</code>), or <code>margin:0 auto;</code> for horizontal-only centering of a fixed-width block.</p></div>
    <div class="quiz-q"><p>8. What is the cascade, and what determines which rule wins?</p><p style="font-size:13px; color:var(--text-muted);">In order: origin/importance (author vs. user vs. browser, and !important), then specificity, then source order for ties. See the Cascade chapter for the full breakdown.</p></div>
  </div>

  <div class="callout tip"><b>How to use this page:</b> cover the answers and try to explain each out loud in under 30 seconds — that's roughly the time you get in a live screening round before the interviewer moves on.</div>
`;

/* ---------- MINI PROJECTS ---------- */
RENDERERS['mini-projects'] = () => `
  <p class="lede">Short, scoped build prompts that combine multiple chapters from this app into something portfolio-sized — each doable in an afternoon.</p>

  <div class="grid-2">
    <div class="card"><h4>1. Pricing card grid</h4><p style="font-size:13px;margin:0;">Three pricing tiers in a responsive Grid, one column on mobile, three on desktop. Uses: Grid, Media Queries, Shadows, Typography.</p></div>
    <div class="card"><h4>2. Sticky navbar with active-link highlight</h4><p style="font-size:13px;margin:0;">A navbar that stays fixed on scroll and highlights the current section. Uses: Position, Pseudo Classes, Transitions.</p></div>
    <div class="card"><h4>3. Image gallery with hover reveal</h4><p style="font-size:13px;margin:0;">A CSS Grid photo gallery where captions fade in on hover. Uses: Grid, Object Fit, Transitions, Pseudo Elements.</p></div>
    <div class="card"><h4>4. Accessible custom form</h4><p style="font-size:13px;margin:0;">Styled inputs, checkboxes, and a submit button with visible focus states and error styling. Uses: Pseudo Classes, Accessibility, Variables.</p></div>
    <div class="card"><h4>5. Dark/light theme toggle</h4><p style="font-size:13px;margin:0;">A working theme switch using custom properties on <code>[data-theme]</code> — exactly how this app's own theme row works. Uses: Variables, Colors.</p></div>
    <div class="card"><h4>6. Horizontal scroll-snap carousel</h4><p style="font-size:13px;margin:0;">A mobile-style card carousel with zero JavaScript. Uses: Scroll Snap, Flexbox, Sizing.</p></div>
  </div>

  <div class="callout tip"><b>Placement tip:</b> two or three of these, deployed and linked from a GitHub README, do more for an internship application than one large unfinished project — reviewers skim, and small finished things are easy to skim.</div>
`;

/* ---------- CHEATSHEET ---------- */
RENDERERS.cheatsheet = () => `
  <p class="lede">The highest-frequency snippets across this whole curriculum, in one scrollable page.</p>

  <div class="grid-2">
    <div class="card"><h4>Center anything (Flexbox)</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}</pre></div>
    <div class="card"><h4>Center anything (Grid)</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">.parent {
  display: grid;
  place-items: center;
}</pre></div>
    <div class="card"><h4>Full-bleed responsive image</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">img {
  max-width: 100%;
  height: auto;
  display: block;
}</pre></div>
    <div class="card"><h4>Sticky footer layout</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">body { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }</pre></div>
    <div class="card"><h4>Fluid type</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">h1 { font-size: clamp(1.5rem, 4vw, 3rem); }</pre></div>
    <div class="card"><h4>Reset box-sizing globally</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">* { box-sizing: border-box; margin: 0; padding: 0; }</pre></div>
    <div class="card"><h4>Truncate text with ellipsis</h4><pre style="font-family:var(--font-code); font-size:12px; color:var(--teal); margin:0;">.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}</pre></div>
    <div class="card"><h4>Visually-hidden (accessible) text</h4><pre style="font-family:var(--font-code); font-size:11px; color:var(--teal); margin:0; white-space:pre-wrap;">.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}</pre></div>
  </div>
`;

/* ---------- PROPERTY REFERENCE ---------- */
RENDERERS['property-reference'] = () => `
  <p class="lede">A quick lookup table of the properties covered across this app, grouped by what they affect.</p>

  <h2>Box Model</h2>
  <div class="tag-row">
    ${['width','height','min-width','max-width','margin','padding','border','box-sizing','display','position','overflow'].map(t=>`<span class="tag">${t}</span>`).join('')}
  </div>
  <h2>Flexbox & Grid</h2>
  <div class="tag-row">
    ${['display:flex','flex-direction','justify-content','align-items','gap','flex-grow','display:grid','grid-template-columns','grid-template-areas'].map(t=>`<span class="tag teal">${t}</span>`).join('')}
  </div>
  <h2>Typography & Color</h2>
  <div class="tag-row">
    ${['font-family','font-size','font-weight','line-height','letter-spacing','color','background','opacity'].map(t=>`<span class="tag amber">${t}</span>`).join('')}
  </div>
  <h2>Motion</h2>
  <div class="tag-row">
    ${['transform','transition','animation','@keyframes'].map(t=>`<span class="tag">${t}</span>`).join('')}
  </div>
  <h2>Modern CSS</h2>
  <div class="tag-row">
    ${['var()','calc()','clamp()','min()','max()','aspect-ratio','object-fit',':is()',':where()',':has()','@container','color-mix()'].map(t=>`<span class="tag teal">${t}</span>`).join('')}
  </div>

  <div class="callout tip">Use the sidebar search to jump straight from any of these tags to its full chapter with live demos and a quiz.</div>
`;

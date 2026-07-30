/* ============================================================
   HTML module content — migrated from HTML Academy's static
   index.html sections. Each lesson's explanation/examples/
   playgrounds/quiz are preserved; only the delivery mechanism
   changed (data-driven function instead of hard-coded markup).
   ============================================================ */

export const HTML_CONTENT = {
  intro: () => `
<p class="topic-sub">What HTML actually is, why it still matters in 2026, and how to use this course to go from zero to interview-ready.</p>

      <div class="card">
        <h3>What is HTML?</h3>
        <p><strong>HTML (HyperText Markup Language)</strong> is not a programming language — it has no logic, loops, or variables. It is a <em>markup</em> language: a system of tags that describes the <strong>structure and meaning</strong> of content on a page. A browser reads your HTML and builds an in-memory tree called the <span class="tag-chip">DOM</span> (Document Object Model), which it then paints to the screen.</p>
        <div class="diagram">
          <div class="tree">
            <ul>
              <li><span class="node">html</span>
                <ul>
                  <li><span class="node">head</span>
                    <ul><li><span class="node">title</span> <span class="node text">"My Page"</span></li></ul>
                  </li>
                  <li><span class="node">body</span>
                    <ul>
                      <li><span class="node">h1</span> <span class="node text">"Hello"</span></li>
                      <li><span class="node">p</span> <span class="node text">"Welcome to my site"</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <p style="color:var(--text-dim);font-size:.9rem;">Every tag becomes a <strong>node</strong> in this tree. CSS styles the tree, JavaScript manipulates the tree, and accessibility tools (like screen readers) walk the tree to describe the page to users who can't see it. Understanding this one diagram unlocks almost everything else in front-end development.</p>
      </div>

      <div class="grid-3">
        <div class="card"><span class="badge def">Why HTML</span><p style="margin:0;font-size:.9rem;">It's the only language every browser, screen reader, search engine, and crawler can universally parse. No HTML, no web page — even the fanciest React app renders down to plain HTML in the end.</p></div>
        <div class="card"><span class="badge tip">Not a coding language</span><p style="margin:0;font-size:.9rem;">HTML has no conditionals or math. That's CSS (styling) and JavaScript (behavior)'s job. HTML's only job is <strong>meaning and structure</strong>.</p></div>
        <div class="card"><span class="badge seo">First impression for machines</span><p style="margin:0;font-size:.9rem;">Google, screen readers, and social-media link previews all read your raw HTML before any JavaScript runs. Bad HTML = invisible or inaccessible content.</p></div>
      </div>

      <div class="card">
        <h3>How this course is organized</h3>
        <p style="font-size:.92rem;color:var(--text-dim);">Work top-to-bottom through the sidebar. Every topic that involves code has a <strong>live two-pane editor</strong> — type on the left, see the rendered result on the right instantly, no refresh needed. Click the ☆ next to any heading to bookmark it, and use the progress bar in the sidebar to track how much you've completed. When you're done, the <span class="tag-chip">cheatsheet</span> and <span class="tag-chip">tagref</span> sections give you a searchable, exam-ready reference.</p>
      </div>

      <h3>Try it right now</h3>
      <p class="topic-sub">Edit the code below. This is the exact editor you'll use throughout the whole course.</p>
      <div class="playground" data-pg="intro-demo">
        <div class="pg-toolbar">
          <span class="pg-label">index.html</span>
          <button class="pg-btn" data-act="run">▶ Run</button>
          <button class="pg-btn" data-act="format">✎ Format</button>
          <button class="pg-btn" data-act="reset">⟲ Reset</button>
          <button class="pg-btn" data-act="copy">⧉ Copy</button>
          <button class="pg-btn" data-act="download">⬇ Download</button>
          <button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button>
        </div>
        <div class="pg-body">
          <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false" autocapitalize="off">&lt;h1&gt;Hello, world!&lt;/h1&gt;
&lt;p&gt;Change this text and watch the right side update instantly.&lt;/p&gt;
&lt;p&gt;Try adding a &lt;strong&gt;bold&lt;/strong&gt; word or an &lt;em&gt;italic&lt;/em&gt; one.&lt;/p&gt;</textarea></div>
          <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
        </div>
      </div>
`,
  basics: () => `
<p class="topic-sub">Elements, tags, attributes, and nesting — the four ideas that everything else in HTML is built from.</p>

      <div class="card">
        <h3>Tag vs. Element vs. Attribute</h3>
        <table class="ref-table">
          <tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
          <tr><td><strong>Tag</strong></td><td>The literal markup token in angle brackets.</td><td><code>&lt;p&gt;</code> is the opening tag, <code>&lt;/p&gt;</code> the closing tag.</td></tr>
          <tr><td><strong>Element</strong></td><td>The opening tag + its content + closing tag, as a whole unit.</td><td><code>&lt;p&gt;Hello&lt;/p&gt;</code> is one element.</td></tr>
          <tr><td><strong>Attribute</strong></td><td>Extra information placed inside the opening tag as <code>name="value"</code> pairs.</td><td><code>&lt;a href="/about"&gt;</code> — <code>href</code> is the attribute.</td></tr>
          <tr><td><strong>Void element</strong></td><td>An element with no closing tag and no content, because it can't contain anything.</td><td><code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code></td></tr>
        </table>
      </div>

      <div class="grid-2">
        <div class="card">
          <h4>Anatomy of a tag</h4>
          <div class="diagram flow" style="flex-direction:column;align-items:flex-start;">
            <div class="mono" style="font-size:1rem;">
              &lt;<span style="color:var(--accent2)">a</span>&nbsp;<span style="color:var(--ok)">href</span>=<span style="color:var(--danger)">"/about"</span> <span style="color:var(--ok)">target</span>=<span style="color:var(--danger)">"_blank"</span>&gt;<span style="color:var(--text)">About us</span>&lt;/<span style="color:var(--accent2)">a</span>&gt;
            </div>
            <ul style="font-size:.85rem;color:var(--text-dim);margin:10px 0 0;padding-left:18px;">
              <li><span style="color:var(--accent2)">a</span> — the tag name (defines the type of element)</li>
              <li><span style="color:var(--ok)">href / target</span> — attribute names</li>
              <li><span style="color:var(--danger)">"/about" / "_blank"</span> — attribute values, always in quotes</li>
              <li><span style="color:var(--text)">About us</span> — the text content / children of the element</li>
            </ul>
          </div>
        </div>
        <div class="card">
          <h4>Nesting rule</h4>
          <p style="font-size:.9rem;color:var(--text-dim);">Elements must close in the reverse order they opened — like stacking boxes. This is <strong>correct</strong>:</p>
          <pre style="background:var(--bg-inset);padding:10px;border-radius:6px;font-size:.82rem;overflow:auto;">&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;</pre>
          <p style="font-size:.9rem;color:var(--danger);">This is <strong>invalid</strong> (crossed tags):</p>
          <pre style="background:var(--bg-inset);padding:10px;border-radius:6px;font-size:.82rem;overflow:auto;">&lt;p&gt;Hello &lt;strong&gt;world&lt;/p&gt;&lt;/strong&gt;</pre>
        </div>
      </div>

      <div class="card">
        <h3>HTML is (mostly) whitespace-insensitive</h3>
        <p style="font-size:.9rem;color:var(--text-dim);">Browsers collapse multiple spaces, tabs, and line breaks in text content down to a single space. Indentation is for humans reading the source, not for the browser. This is why line breaks need an explicit <span class="tag-chip">br</span> tag or CSS — pressing Enter in your source file does nothing visually.</p>
      </div>

      <h3>Practice</h3>
      <div class="playground" data-pg="basics-practice">
        <div class="pg-toolbar"><span class="pg-label">practice.html</span>
          <button class="pg-btn" data-act="run">▶ Run</button>
          <button class="pg-btn" data-act="reset">⟲ Reset</button>
          <button class="pg-btn" data-act="copy">⧉ Copy</button>
          <button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button>
        </div>
        <div class="pg-body">
          <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;!-- Fix the crossed tags below so the bold word renders correctly --&gt;
&lt;p&gt;This is &lt;strong&gt;important&lt;/p&gt;&lt;/strong&gt;</textarea></div>
          <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
        </div>
      </div>

      <details class="disclosure"><summary>Solution</summary><div class="disclosure-body"><code>&lt;p&gt;This is &lt;strong&gt;important&lt;/strong&gt;&lt;/p&gt;</code> — close <code>&lt;strong&gt;</code> before closing <code>&lt;p&gt;</code>.</div></details>

      <div class="qa-item">
        <div class="qa-q"><span class="qmark">Q.</span> Is HTML a programming language?</div>
        <div class="qa-a">No. It has no variables, loops, or conditionals — it only describes structure and meaning. This is a very common trick interview question; the safe answer is "markup language," not "programming language."</div>
      </div>
      <div class="qa-item">
        <div class="qa-q"><span class="qmark">Q.</span> What is a void (self-closing) element, and can you name five?</div>
        <div class="qa-a">A void element cannot have children and never gets a closing tag: <code>img</code>, <code>br</code>, <code>hr</code>, <code>input</code>, <code>meta</code>, <code>link</code>, <code>source</code>, <code>col</code>, <code>area</code>, <code>base</code> are all void elements.</div>
      </div>
`,
  boilerplate: () => `
<p class="topic-sub">The minimum skeleton every HTML document should start from, and why each line exists.</p>

      <div class="playground" data-pg="boilerplate-demo">
        <div class="pg-toolbar"><span class="pg-label">boilerplate.html</span>
          <button class="pg-btn" data-act="run">▶ Run</button>
          <button class="pg-btn" data-act="reset">⟲ Reset</button>
          <button class="pg-btn" data-act="copy">⧉ Copy</button>
          <button class="pg-btn" data-act="download">⬇ Download</button>
          <button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button>
        </div>
        <div class="pg-body tall pg-body">
          <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;It works!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</textarea></div>
          <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
        </div>
      </div>

      <table class="ref-table">
        <tr><th>Line</th><th>What it does</th><th>What breaks if you skip it</th></tr>
        <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Tells the browser "render this in modern standards mode" (HTML5).</td><td>Browser falls back to <strong>quirks mode</strong>, an old compatibility mode with inconsistent box-sizing and layout bugs.</td></tr>
        <tr><td><code>&lt;html lang="en"&gt;</code></td><td>Root element; <code>lang</code> tells screen readers and translators which language to use.</td><td>Screen readers may mispronounce content; browser translate tools guess wrong.</td></tr>
        <tr><td><code>&lt;meta charset="UTF-8"&gt;</code></td><td>Declares character encoding so special characters (é, 中, emoji) render correctly.</td><td>Special characters can show as garbled "mojibake" text.</td></tr>
        <tr><td><code>&lt;meta name="viewport" ...&gt;</code></td><td>Tells mobile browsers to use the device's actual width instead of faking a desktop-sized page.</td><td>Mobile users see a tiny zoomed-out desktop layout.</td></tr>
        <tr><td><code>&lt;title&gt;</code></td><td>Sets the browser tab text, bookmark name, and the clickable headline in Google search results.</td><td>Tab shows the file path; SEO and bookmarking suffer badly.</td></tr>
      </table>

      <div class="card">
        <h3>Where the DOCTYPE actually came from</h3>
        <p style="font-size:.9rem;color:var(--text-dim);">In HTML 4 the DOCTYPE was a long URL pointing to a formal DTD (Document Type Definition) file, e.g. <code>"-//W3C//DTD HTML 4.01//EN"</code>. HTML5 simplified this to just <code>&lt;!DOCTYPE html&gt;</code> — it no longer points to a real document, it's purely a signal to trigger standards mode.</p>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What happens if you omit the DOCTYPE?</div><div class="qa-a">The browser renders the page in "quirks mode," an emulation of very old browser bugs (box model differences, inconsistent form control sizing). Always include it.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why put <code>&lt;script&gt;</code> tags at the end of <code>&lt;body&gt;</code> (or use <code>defer</code>)?</div><div class="qa-a">HTML parses top to bottom. A <code>&lt;script&gt;</code> in the <code>&lt;head&gt;</code> blocks rendering until it downloads and executes, delaying first paint. Placing scripts at the end of <code>&lt;body&gt;</code>, or using the <code>defer</code> attribute, lets the page render first.</div></div>
`,
  elements: () => `
<p class="topic-sub">The skeleton tags every document is built from: metadata, headings, paragraphs, and generic containers.</p>

      <!-- html/head/body -->
      <div class="card" id="tag-html-head-body">
        <h3><span class="tag-chip">html</span> <span class="tag-chip">head</span> <span class="tag-chip">body</span></h3>
        <span class="badge def">Structural</span><span class="badge tip">Required once each</span>
        <p style="font-size:.92rem;color:var(--text-dim);"><code>html</code> is the root of the document and wraps everything. <code>head</code> holds metadata that is <em>not</em> rendered directly (title, meta tags, links to CSS, scripts). <code>body</code> holds everything that actually renders on screen. Each may appear exactly once.</p>
        <table class="ref-table">
          <tr><th>Element</th><th>Key attribute</th><th>Purpose</th></tr>
          <tr><td><code>html</code></td><td><code>lang</code></td><td>Declares page language for screen readers, translation tools, and spell-check.</td></tr>
          <tr><td><code>head</code></td><td>—</td><td>Container for <code>title</code>, <code>meta</code>, <code>link</code>, <code>style</code>, <code>script</code>.</td></tr>
          <tr><td><code>body</code></td><td>—</td><td>Everything visible: text, images, forms, etc.</td></tr>
        </table>
        <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Can a page have two <code>&lt;body&gt;</code> tags?</div><div class="qa-a">No — the HTML spec (and every browser parser) allows only one <code>html</code>, one <code>head</code>, and one <code>body</code>. A second one is simply merged/ignored by the browser's error-correction algorithm, not an error you'll see, but invalid markup.</div></div>
      </div>

      <!-- title/meta/link/style/script -->
      <div class="card" id="tag-metadata">
        <h3><span class="tag-chip">title</span> <span class="tag-chip">meta</span> <span class="tag-chip">link</span> <span class="tag-chip">style</span> <span class="tag-chip">script</span></h3>
        <span class="badge def">Metadata</span><span class="badge seo">Critical for SEO</span>
        <p style="font-size:.92rem;color:var(--text-dim);">These live in <code>&lt;head&gt;</code> and describe the document rather than displaying content directly (except <code>title</code>, which shows in the browser tab).</p>
        <table class="ref-table">
          <tr><th>Tag</th><th>Example</th><th>Notes</th></tr>
          <tr><td><code>title</code></td><td><code>&lt;title&gt;Pricing – Acme&lt;/title&gt;</code></td><td>Shown in tabs, bookmarks, and as the blue link text in Google results. Keep under ~60 characters.</td></tr>
          <tr><td><code>meta</code></td><td><code>&lt;meta name="description" content="..."&gt;</code></td><td>No visual rendering. Common uses: <code>charset</code>, <code>viewport</code>, <code>description</code>, Open Graph tags (<code>property="og:title"</code>).</td></tr>
          <tr><td><code>link</code></td><td><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></td><td>Void element. Also used for favicons (<code>rel="icon"</code>) and preloading fonts (<code>rel="preload"</code>).</td></tr>
          <tr><td><code>style</code></td><td><code>&lt;style&gt;p{color:red}&lt;/style&gt;</code></td><td>Embeds CSS directly; fine for small demos, avoid for production (prefer external files, cacheable).</td></tr>
          <tr><td><code>script</code></td><td><code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code></td><td><code>defer</code> runs after parsing finishes, in order; <code>async</code> runs as soon as loaded, order not guaranteed.</td></tr>
        </table>
        <div class="playground" data-pg="meta-demo">
          <div class="pg-toolbar"><span class="pg-label">meta.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:220px;">
            <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;style&gt;
  h1 { color: teal; font-family: sans-serif; }
&lt;/style&gt;
&lt;h1&gt;Styled with an embedded &amp;lt;style&amp;gt; tag&lt;/h1&gt;</textarea></div>
            <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
          </div>
        </div>
        <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> <code>async</code> vs <code>defer</code> — what's the real difference?</div><div class="qa-a">Both let the HTML parser continue instead of blocking. <code>async</code> executes the script the moment it finishes downloading — possibly interrupting parsing, and order between multiple async scripts isn't guaranteed. <code>defer</code> waits until the document is fully parsed and runs scripts in source order. Use <code>defer</code> for scripts that depend on the DOM or each other.</div></div>
      </div>

      <!-- headings -->
      <div class="card" id="tag-headings">
        <h3><span class="tag-chip">h1</span>…<span class="tag-chip">h6</span> Headings</h3>
        <span class="badge def">Block</span><span class="badge seo">One h1 per page</span><span class="badge a11y">Screen-reader navigation</span>
        <p style="font-size:.92rem;color:var(--text-dim);">Six levels of section heading, <code>h1</code> the most important down to <code>h6</code>. Screen reader users frequently jump page-to-page using a "list of headings" — skipping levels (h1 → h3) breaks that navigation, even if it visually looks fine.</p>
        <div class="playground" data-pg="heading-demo">
          <div class="pg-toolbar"><span class="pg-label">headings.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:260px;">
            <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;h1&gt;Page Title (only one per page)&lt;/h1&gt;
&lt;h2&gt;Major Section&lt;/h2&gt;
&lt;h3&gt;Sub-section&lt;/h3&gt;
&lt;h4&gt;Minor detail&lt;/h4&gt;
&lt;h5&gt;Rarely used&lt;/h5&gt;
&lt;h6&gt;Rarely used&lt;/h6&gt;</textarea></div>
            <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
          </div>
        </div>
        <div class="grid-2">
          <div><span class="badge warn">Common mistake</span><p style="font-size:.88rem;color:var(--text-dim);">Choosing heading level by how big the text looks, then fixing size with CSS. Heading level = document outline, not font size.</p></div>
          <div><span class="badge tip">Professional tip</span><p style="font-size:.88rem;color:var(--text-dim);">Google explicitly weights <code>h1</code>/<code>h2</code> text as strong relevance signals — put real keywords there, not just "Welcome!".</p></div>
        </div>
        <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Can you have multiple <code>&lt;h1&gt;</code> tags?</div><div class="qa-a">Technically the HTML5 spec allows it (especially one per <code>&lt;section&gt;</code>/<code>&lt;article&gt;</code>), but the near-universal industry and SEO convention is exactly one <code>h1</code> per page representing the main topic. Most interviewers expect "one per page."</div></div>
      </div>

      <!-- p, br, hr -->
      <div class="card" id="tag-p-br-hr">
        <h3><span class="tag-chip">p</span> <span class="tag-chip">br</span> <span class="tag-chip">hr</span></h3>
        <span class="badge def">Block / void</span>
        <p style="font-size:.92rem;color:var(--text-dim);"><code>p</code> is a paragraph of text (block-level, adds margin above/below). <code>br</code> forces a single line break <em>inside</em> flowing text (a void element — never wrap content). <code>hr</code> draws a thematic break — a horizontal rule marking a topic shift, not just a decorative line.</p>
        <div class="playground" data-pg="p-br-hr-demo">
          <div class="pg-toolbar"><span class="pg-label">p-br-hr.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:220px;">
            <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p&gt;First line of an address&lt;br&gt;Second line, same paragraph&lt;/p&gt;
&lt;hr&gt;
&lt;p&gt;A new topic starts after the rule.&lt;/p&gt;</textarea></div>
            <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
          </div>
        </div>
        <span class="badge warn">Common mistake</span><p style="font-size:.88rem;color:var(--text-dim);margin-top:4px;">Stacking multiple <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> tags to create vertical spacing. Use CSS <code>margin</code>/<code>padding</code> instead — <code>br</code> is for line breaks within content (like a mailing address or poem), not layout spacing.</p>
      </div>

      <!-- div/span -->
      <div class="card" id="tag-div-span">
        <h3><span class="tag-chip">div</span> <span class="tag-chip">span</span></h3>
        <span class="badge def">Generic containers</span><span class="badge warn">No inherent meaning</span>
        <p style="font-size:.92rem;color:var(--text-dim);"><code>div</code> is a generic <strong>block-level</strong> container (starts on its own line, fills available width). <code>span</code> is a generic <strong>inline</strong> container (flows within text). Neither carries any semantic meaning — they exist purely as CSS/JS hooks. Prefer a semantic tag (<span class="tag-chip">nav</span>, <span class="tag-chip">article</span>, etc.) whenever one accurately describes the content; reach for <code>div</code>/<code>span</code> only when no semantic tag fits.</p>
        <div class="playground" data-pg="div-span-demo">
          <div class="pg-toolbar"><span class="pg-label">div-span.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:220px;">
            <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;div style="border:2px solid teal; padding:8px;"&gt;
  This whole box is a &amp;lt;div&amp;gt; (block-level).
  Here is a &lt;span style="color:crimson;"&gt;highlighted inline word&lt;/span&gt; inside it.
&lt;/div&gt;</textarea></div>
            <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div>
          </div>
        </div>
        <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> "Divitis" — what does it mean and why is it bad?</div><div class="qa-a">"Divitis" is slang for markup that wraps everything in nested, meaningless <code>&lt;div&gt;</code>s instead of semantic tags. It hurts accessibility (screen readers get no landmarks), SEO, and maintainability. Interviewers use this term to check if you know semantic HTML.</div></div>
      </div>

      <!-- comments -->
      <div class="card">
        <h3>HTML Comments</h3>
        <p style="font-size:.92rem;color:var(--text-dim);">Written as <code>&lt;!-- comment text --&gt;</code>. Never rendered, never sent to accessibility tools, but fully visible to anyone who views page source — never put secrets or API keys in them.</p>
      </div>
`,
  'tags-text': () => `
<p class="topic-sub">Inline tags describe the <em>meaning</em> of a run of text, not just its appearance — this distinction is a favorite interview trap.</p>

      <div class="card" id="tag-a">
        <h3><span class="tag-chip">a</span> — Anchor / Link</h3>
        <span class="badge def">Inline</span><span class="badge seo">Link equity</span>
        <p style="font-size:.92rem;color:var(--text-dim);">Creates a hyperlink. Without <code>href</code> it is not a link at all (no keyboard focus, no navigation) — just a placeholder anchor.</p>
        <table class="ref-table">
          <tr><th>Attribute</th><th>Purpose</th></tr>
          <tr><td><code>href</code></td><td>Destination URL — relative, absolute, <code>#id</code> for in-page, or <code>mailto:</code>/<code>tel:</code>.</td></tr>
          <tr><td><code>target="_blank"</code></td><td>Opens in a new tab. Always pair with <code>rel="noopener noreferrer"</code> for security.</td></tr>
          <tr><td><code>rel</code></td><td>Relationship to target: <code>nofollow</code> (don't pass SEO weight), <code>noopener</code> (blocks the new tab from accessing <code>window.opener</code>).</td></tr>
          <tr><td><code>download</code></td><td>Forces a download instead of navigation; optional value sets the suggested filename.</td></tr>
        </table>
        <div class="playground" data-pg="a-demo">
          <div class="pg-toolbar"><span class="pg-label">anchor.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:200px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer"&gt;
  Open MDN in a new tab
&lt;/a&gt;
&lt;br&gt;
&lt;a href="mailto:hello@example.com"&gt;Email us&lt;/a&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts allow-popups"></iframe></div></div>
        </div>
        <span class="badge warn">Common mistake</span> <span style="font-size:.88rem;color:var(--text-dim);">Using <code>&lt;a href="#"&gt;</code> or a <code>&lt;div onclick&gt;</code> to fake a button. Use a real <span class="tag-chip">button</span> for actions, <code>a</code> only for navigation.</span>
      </div>

      <div class="card" id="tag-emphasis">
        <h3><span class="tag-chip">strong</span> <span class="tag-chip">em</span> vs <span class="tag-chip">b</span> <span class="tag-chip">i</span></h3>
        <span class="badge def">Inline</span><span class="badge a11y">Semantic vs visual</span>
        <p style="font-size:.92rem;color:var(--text-dim);">This is one of the most common interview questions in all of HTML. <code>strong</code> and <code>em</code> carry <strong>meaning</strong> (important / stressed emphasis) — screen readers may change their tone of voice for them. <code>b</code> and <code>i</code> are purely <strong>visual</strong> (bold/italic) with no semantic weight — use them only when there's genuinely no underlying meaning (e.g. a keyword in a recipe, a ship's name).</p>
        <div class="playground" data-pg="strong-em-demo">
          <div class="pg-toolbar"><span class="pg-label">emphasis.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:200px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p&gt;&lt;strong&gt;Warning:&lt;/strong&gt; this action cannot be undone.&lt;/p&gt;
&lt;p&gt;I &lt;em&gt;really&lt;/em&gt; mean it.&lt;/p&gt;
&lt;p&gt;The &lt;b&gt;Titanic&lt;/b&gt; set sail in &lt;i&gt;1912&lt;/i&gt;.&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
        </div>
        <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why not just use CSS <code>font-weight:bold</code> on a <code>span</code> instead of <code>strong</code>?</div><div class="qa-a">Visually identical, but a screen reader gives no semantic signal for a styled <code>span</code>, while <code>strong</code> can be announced with added emphasis. Semantic tags carry meaning independent of how CSS happens to style them that day.</div></div>
      </div>

      <div class="grid-2">
        <div class="card" id="tag-small-mark">
          <h3><span class="tag-chip">small</span> <span class="tag-chip">mark</span></h3>
          <p style="font-size:.9rem;color:var(--text-dim);"><code>small</code> = fine print (legal disclaimers, side comments) — not just "make text smaller," it has semantic meaning. <code>mark</code> = highlighted for reference, like a search-term match.</p>
          <div class="playground" data-pg="small-mark-demo">
            <div class="pg-toolbar"><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
            <div class="pg-body" style="height:170px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p&gt;Search results for "html": we found a &lt;mark&gt;html&lt;/mark&gt; tutorial.&lt;/p&gt;
&lt;p&gt;&lt;small&gt;Terms and conditions apply.&lt;/small&gt;&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
          </div>
        </div>
        <div class="card" id="tag-abbr-cite">
          <h3><span class="tag-chip">abbr</span> <span class="tag-chip">cite</span></h3>
          <p style="font-size:.9rem;color:var(--text-dim);"><code>abbr title="..."</code> gives an abbreviation's full expansion as a native tooltip. <code>cite</code> marks the title of a creative work being referenced.</p>
          <div class="playground" data-pg="abbr-cite-demo">
            <div class="pg-toolbar"><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
            <div class="pg-body" style="height:170px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p&gt;&lt;abbr title="HyperText Markup Language"&gt;HTML&lt;/abbr&gt; powers the web.&lt;/p&gt;
&lt;p&gt;As mentioned in &lt;cite&gt;The Design of Everyday Things&lt;/cite&gt;.&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
          </div>
        </div>
      </div>

      <div class="card" id="tag-code-pre">
        <h3><span class="tag-chip">code</span> <span class="tag-chip">pre</span></h3>
        <span class="badge def">Inline / Block</span>
        <p style="font-size:.92rem;color:var(--text-dim);"><code>code</code> marks inline code text (monospace font, no whitespace preservation on its own). <code>pre</code> preserves whitespace and line breaks exactly as typed — combine them, <code>&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;</code>, for a code block, which is exactly how this course's own snippets are typically marked up.</p>
        <div class="playground" data-pg="code-pre-demo">
          <div class="pg-toolbar"><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:220px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p&gt;Use the &lt;code&gt;fetch()&lt;/code&gt; function to make a request.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;function greet(name) {
  return "Hello, " + name;
}&lt;/code&gt;&lt;/pre&gt;</textarea></div><div class="pg-preview-wrap"><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card" id="tag-blockquote-q">
          <h3><span class="tag-chip">blockquote</span> <span class="tag-chip">q</span></h3>
          <p style="font-size:.9rem;color:var(--text-dim);"><code>blockquote</code> = a long, block-level quotation (browsers indent it by default). <code>q</code> = a short <em>inline</em> quotation (browsers auto-add quote marks). Both support a <code>cite</code> attribute holding the source URL.</p>
          <div class="playground" data-pg="blockquote-demo">
            <div class="pg-toolbar"><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
            <div class="pg-body" style="height:200px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;blockquote cite="https://example.com"&gt;
  The web does not need to be this complicated.
&lt;/blockquote&gt;
&lt;p&gt;She said &lt;q&gt;keep it simple&lt;/q&gt; during the review.&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
          </div>
        </div>
        <div class="card" id="tag-sub-sup-del-ins">
          <h3><span class="tag-chip">sub</span> <span class="tag-chip">sup</span> <span class="tag-chip">del</span> <span class="tag-chip">ins</span></h3>
          <p style="font-size:.9rem;color:var(--text-dim);"><code>sub</code>/<code>sup</code> render subscript/superscript (chemical formulas, footnotes, exponents). <code>del</code>/<code>ins</code> mark deleted/inserted content — browsers show strikethrough / underline by default, useful for tracked-changes style content.</p>
          <div class="playground" data-pg="sub-sup-demo">
            <div class="pg-toolbar"><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
            <div class="pg-body" style="height:170px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p&gt;H&lt;sub&gt;2&lt;/sub&gt;O and E=mc&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;
&lt;p&gt;Price: &lt;del&gt;$40&lt;/del&gt; &lt;ins&gt;$30&lt;/ins&gt;&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
          </div>
        </div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Name the difference between <code>&lt;i&gt;</code> and <code>&lt;em&gt;</code> in one sentence.</div><div class="qa-a"><code>em</code> conveys semantic stress/emphasis (changes meaning if read aloud); <code>i</code> conveys an "alternate voice" purely stylistically (technical terms, foreign phrases) with no emphasis implied.</div></div>
`,
  attributes: () => `
<p class="topic-sub">Global attributes work on almost every element; the rest are scoped to specific tags (forms, links, media). Full form-validation attributes are covered in <a href="#forms">Forms</a>.</p>

      <div class="card">
        <h3>Global attributes</h3>
        <p style="font-size:.9rem;color:var(--text-dim);">These can be placed on virtually any HTML element.</p>
        <table class="ref-table">
          <tr><th>Attribute</th><th>Values / Example</th><th>Notes</th></tr>
          <tr><td><code>id</code></td><td><code>id="main-nav"</code></td><td>Unique identifier per page; used for CSS, JS, and <code>#fragment</code> links. Must be unique — duplicate IDs are invalid and break <code>querySelector</code>/label linking.</td></tr>
          <tr><td><code>class</code></td><td><code>class="card active"</code></td><td>Space-separated list, reusable across many elements. Primary CSS/JS hook.</td></tr>
          <tr><td><code>title</code></td><td><code>title="More info"</code></td><td>Shows a native tooltip on hover. Not reliably accessible or visible on touch devices — don't hide essential info here.</td></tr>
          <tr><td><code>hidden</code></td><td><code>hidden</code></td><td>Boolean; removes element from layout and the accessibility tree entirely (like <code>display:none</code>).</td></tr>
          <tr><td><code>tabindex</code></td><td><code>tabindex="0"</code> / <code>"-1"</code></td><td><code>0</code> makes any element keyboard-focusable in natural order; <code>-1</code> makes it focusable only via script; positive numbers create a custom (and usually confusing) tab order — avoid them.</td></tr>
          <tr><td><code>draggable</code></td><td><code>draggable="true"</code></td><td>Enables the native HTML Drag and Drop API on an element.</td></tr>
          <tr><td><code>contenteditable</code></td><td><code>contenteditable="true"</code></td><td>Turns any element into an editable rich-text region — the basis of many browser-based text editors.</td></tr>
          <tr><td><code>spellcheck</code></td><td><code>spellcheck="false"</code></td><td>Toggles the browser's native red squiggly spellcheck on editable content.</td></tr>
          <tr><td><code>translate</code></td><td><code>translate="no"</code></td><td>Hints to automatic page translators to leave content (like a brand name) untranslated.</td></tr>
          <tr><td><code>dir</code></td><td><code>dir="rtl"</code></td><td>Text direction — <code>ltr</code>, <code>rtl</code>, or <code>auto</code>. Essential for Arabic/Hebrew content.</td></tr>
          <tr><td><code>lang</code></td><td><code>lang="fr"</code></td><td>Overrides the document language for a specific element (e.g. a quoted foreign phrase).</td></tr>
          <tr><td><code>data-*</code></td><td><code>data-user-id="42"</code></td><td>Custom data storage, read via <code>element.dataset.userId</code> in JS. The official way to attach custom data without inventing non-standard attributes.</td></tr>
          <tr><td><code>style</code></td><td><code>style="color:red"</code></td><td>Inline CSS. Highest specificity; use sparingly, prefer classes.</td></tr>
          <tr><td><code>aria-*</code></td><td><code>aria-label="Close"</code></td><td>Accessibility metadata for assistive tech — expanded in the <a href="#accessibility">Accessibility</a> section.</td></tr>
        </table>
      </div>

      <div class="playground" data-pg="attrs-demo">
        <div class="pg-toolbar"><span class="pg-label">global-attrs.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:220px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;p contenteditable="true" style="border:1px dashed gray;padding:6px;"&gt;
  Click me and start typing — I'm editable!
&lt;/p&gt;
&lt;p title="I'm a native tooltip"&gt;Hover over this paragraph.&lt;/p&gt;
&lt;p hidden&gt;You will never see this paragraph.&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="card">
        <h3>Link &amp; resource attributes</h3>
        <table class="ref-table">
          <tr><th>Attribute</th><th>Used on</th><th>Purpose</th></tr>
          <tr><td><code>href</code></td><td><code>a</code>, <code>link</code></td><td>Target URL.</td></tr>
          <tr><td><code>target</code></td><td><code>a</code>, <code>form</code></td><td><code>_blank</code>, <code>_self</code>, <code>_parent</code>, <code>_top</code> — where to open.</td></tr>
          <tr><td><code>rel</code></td><td><code>a</code>, <code>link</code></td><td>Relationship: <code>nofollow</code>, <code>noopener</code>, <code>noreferrer</code>, <code>stylesheet</code>, <code>icon</code>, <code>preload</code>, <code>canonical</code>.</td></tr>
          <tr><td><code>download</code></td><td><code>a</code></td><td>Forces file download rather than navigation.</td></tr>
          <tr><td><code>loading</code></td><td><code>img</code>, <code>iframe</code></td><td><code>lazy</code> defers loading off-screen media until it's about to scroll into view — a free performance win.</td></tr>
          <tr><td><code>srcset</code> / <code>sizes</code></td><td><code>img</code>, <code>source</code></td><td>Serve different image resolutions per device — see <a href="#responsive-images">Responsive Images</a>.</td></tr>
        </table>
      </div>

      <div class="card">
        <h3>Form-related attributes (preview — full detail in Forms)</h3>
        <table class="ref-table">
          <tr><th>Attribute</th><th>Meaning</th></tr>
          <tr><td><code>required</code></td><td>Field must be filled before submission.</td></tr>
          <tr><td><code>readonly</code></td><td>Visible and submitted, but the user cannot edit it.</td></tr>
          <tr><td><code>disabled</code></td><td>Not editable and <em>not</em> submitted with the form.</td></tr>
          <tr><td><code>placeholder</code></td><td>Faint hint text shown when empty — never a substitute for a real <code>label</code>.</td></tr>
          <tr><td><code>autocomplete</code></td><td><code>"on"</code>/<code>"off"</code> or specific tokens like <code>"email"</code>, <code>"new-password"</code>.</td></tr>
          <tr><td><code>pattern</code></td><td>A regex the value must match, e.g. <code>pattern="[0-9]{4}"</code>.</td></tr>
          <tr><td><code>maxlength</code> / <code>minlength</code></td><td>Character count bounds for text inputs.</td></tr>
          <tr><td><code>min</code> / <code>max</code> / <code>step</code></td><td>Numeric or date bounds and increments for <code>number</code>, <code>range</code>, <code>date</code> inputs.</td></tr>
          <tr><td><code>accept</code></td><td>Restricts file picker types, e.g. <code>accept="image/*"</code>.</td></tr>
          <tr><td><code>multiple</code></td><td>Allows more than one value (file inputs, email lists, multi-select).</td></tr>
          <tr><td><code>novalidate</code></td><td>On a <code>form</code>, disables the browser's built-in validation entirely.</td></tr>
          <tr><td><code>form</code></td><td>Associates an input with a <code>&lt;form id="..."&gt;</code> elsewhere in the DOM, even outside it.</td></tr>
        </table>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> <code>disabled</code> vs <code>readonly</code> — what's the practical difference?</div><div class="qa-a"><code>readonly</code> fields are still focusable, still submitted with the form, just not editable. <code>disabled</code> fields are unfocusable, greyed out by default styling, and <strong>excluded entirely</strong> from form submission.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why is <code>data-*</code> preferred over inventing a custom attribute like <code>userid="42"</code>?</div><div class="qa-a">Non-standard attributes are technically invalid HTML and may collide with future spec additions. <code>data-*</code> is explicitly reserved by the spec for custom data and is exposed cleanly through the <code>.dataset</code> JS API.</div></div>
`,
  lists: () => `
<p class="topic-sub">Three list types: unordered, ordered, and description lists — each with a distinct semantic meaning.</p>

      <div class="grid-2">
        <div class="card">
          <h3><span class="tag-chip">ul</span> <span class="tag-chip">ol</span> <span class="tag-chip">li</span></h3>
          <p style="font-size:.9rem;color:var(--text-dim);"><code>ul</code> = unordered (bullet) list — order doesn't matter. <code>ol</code> = ordered (numbered) list — sequence matters (steps, rankings). <code>li</code> is the list item in either.</p>
          <table class="ref-table">
            <tr><th>Attribute</th><th>On</th><th>Effect</th></tr>
            <tr><td><code>start</code></td><td><code>ol</code></td><td>Sets the starting number.</td></tr>
            <tr><td><code>reversed</code></td><td><code>ol</code></td><td>Counts down instead of up.</td></tr>
            <tr><td><code>type</code></td><td><code>ol</code></td><td><code>1</code>, <code>A</code>, <code>a</code>, <code>I</code>, <code>i</code> — numbering style.</td></tr>
            <tr><td><code>value</code></td><td><code>li</code></td><td>Overrides that specific item's number.</td></tr>
          </table>
        </div>
        <div class="card">
          <h3><span class="tag-chip">dl</span> <span class="tag-chip">dt</span> <span class="tag-chip">dd</span></h3>
          <p style="font-size:.9rem;color:var(--text-dim);">A description list — pairs of terms and their descriptions. Perfect for glossaries, FAQs, or key/value metadata, and semantically more correct than a two-column table for that use case.</p>
        </div>
      </div>

      <div class="playground" data-pg="lists-demo">
        <div class="pg-toolbar"><span class="pg-label">lists.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;h4&gt;Shopping list (order doesn't matter)&lt;/h4&gt;
&lt;ul&gt;
  &lt;li&gt;Milk&lt;/li&gt;
  &lt;li&gt;Eggs&lt;/li&gt;
  &lt;li&gt;Bread&lt;/li&gt;
&lt;/ul&gt;

&lt;h4&gt;Recipe steps (order matters)&lt;/h4&gt;
&lt;ol&gt;
  &lt;li&gt;Preheat oven to 200°C&lt;/li&gt;
  &lt;li&gt;Mix ingredients&lt;/li&gt;
  &lt;li&gt;Bake for 25 minutes&lt;/li&gt;
&lt;/ol&gt;

&lt;h4&gt;Glossary&lt;/h4&gt;
&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;HyperText Markup Language&lt;/dd&gt;
  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;Cascading Style Sheets&lt;/dd&gt;
&lt;/dl&gt;

&lt;h4&gt;Nested list&lt;/h4&gt;
&lt;ul&gt;
  &lt;li&gt;Fruits
    &lt;ul&gt;
      &lt;li&gt;Apple&lt;/li&gt;
      &lt;li&gt;Banana&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Can <code>&lt;li&gt;</code> exist outside a <code>ul</code>/<code>ol</code>/<code>menu</code>?</div><div class="qa-a">No — it's invalid outside a list container. Browsers will still try to render it, but it fails HTML validation and confuses screen readers, which announce "list with N items" based on the parent.</div></div>
`,
  tables: () => `
<p class="topic-sub">For real tabular data only — never for page layout. That was a 1998 habit that accessibility and responsive design killed off.</p>

      <table class="ref-table">
        <tr><th>Tag</th><th>Role</th></tr>
        <tr><td><code>table</code></td><td>Wraps the whole table.</td></tr>
        <tr><td><code>caption</code></td><td>Accessible title for the table — announced by screen readers before the data.</td></tr>
        <tr><td><code>thead</code> / <code>tbody</code> / <code>tfoot</code></td><td>Groups header, body, and footer rows — enables sticky headers and print-repeating headers via CSS.</td></tr>
        <tr><td><code>tr</code></td><td>Table row.</td></tr>
        <tr><td><code>th</code></td><td>Header cell — bold and centered by default, and (crucially) exposed to screen readers as a header for its column/row.</td></tr>
        <tr><td><code>td</code></td><td>Standard data cell.</td></tr>
        <tr><td><code>colgroup</code> / <code>col</code></td><td>Defines column-wide styling (e.g. a shared width) without repeating it per cell.</td></tr>
      </table>

      <div class="playground" data-pg="table-demo">
        <div class="pg-toolbar"><span class="pg-label">table.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;table border="1" style="border-collapse:collapse;width:100%;"&gt;
  &lt;caption&gt;Q1 Sales by Region&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th scope="col"&gt;Region&lt;/th&gt;&lt;th scope="col"&gt;Jan&lt;/th&gt;&lt;th scope="col"&gt;Feb&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;th scope="row"&gt;North&lt;/th&gt;&lt;td&gt;$12k&lt;/td&gt;&lt;td&gt;$15k&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;th scope="row"&gt;South&lt;/th&gt;&lt;td&gt;$9k&lt;/td&gt;&lt;td&gt;$11k&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;&lt;th scope="row"&gt;Total&lt;/th&gt;&lt;td&gt;$21k&lt;/td&gt;&lt;td&gt;$26k&lt;/td&gt;&lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="grid-2">
        <div class="card"><span class="badge a11y">Accessibility</span><p style="font-size:.9rem;color:var(--text-dim);">Always use <code>scope="col"</code> / <code>scope="row"</code> on <code>th</code> so screen readers can announce "Region: North, Jan: $12k" instead of just reading raw numbers.</p></div>
        <div class="card"><span class="badge warn">Common mistake</span><p style="font-size:.9rem;color:var(--text-dim);">Using tables purely to position content side-by-side. Modern CSS Grid/Flexbox handles layout; tables are reserved for genuinely tabular data.</p></div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What does <code>colspan</code>/<code>rowspan</code> do?</div><div class="qa-a">They merge a cell across multiple columns or rows — e.g. <code>&lt;td colspan="2"&gt;</code> spans two columns wide. Common in interview whiteboard exercises asking you to reproduce a specific table layout.</div></div>
`,
  forms: () => `
<p class="topic-sub">The single most interview-tested part of HTML — inputs, labels, validation, and accessibility all collide here.</p>

      <div class="card">
        <h3><span class="tag-chip">form</span> and why <span class="tag-chip">label</span> is non-negotiable</h3>
        <p style="font-size:.92rem;color:var(--text-dim);">A <code>form</code> groups controls for submission. Every single input needs an associated <code>label</code> — either wrap the input inside the label, or link them explicitly with <code>label for="id"</code> matching <code>input id="id"</code>. This isn't just nice-to-have: it lets clicking the label focus the input, and it's the <em>only</em> way most screen readers know what an input is for.</p>
        <table class="ref-table">
          <tr><th>Attribute</th><th>On</th><th>Purpose</th></tr>
          <tr><td><code>action</code></td><td><code>form</code></td><td>URL the data is submitted to.</td></tr>
          <tr><td><code>method</code></td><td><code>form</code></td><td><code>get</code> (data in URL, visible/bookmarkable) or <code>post</code> (data in request body, for sensitive/large data).</td></tr>
          <tr><td><code>novalidate</code></td><td><code>form</code></td><td>Disables built-in browser validation, useful when you want fully custom JS validation.</td></tr>
          <tr><td><code>enctype</code></td><td><code>form</code></td><td><code>multipart/form-data</code> required when uploading files.</td></tr>
        </table>
      </div>

      <div class="card">
        <h3><span class="tag-chip">input</span> types</h3>
        <p style="font-size:.9rem;color:var(--text-dim);">The <code>type</code> attribute completely changes an input's behavior, keyboard (on mobile), and built-in validation. Below are the ones interviewers actually expect you to know.</p>
        <table class="ref-table">
          <tr><th>type</th><th>Renders as</th><th>Notes</th></tr>
          <tr><td><code>text</code></td><td>Single-line text box</td><td>The default type if omitted.</td></tr>
          <tr><td><code>email</code></td><td>Text box</td><td>Built-in format validation + email keyboard on mobile.</td></tr>
          <tr><td><code>password</code></td><td>Masked text box</td><td>Characters hidden as dots.</td></tr>
          <tr><td><code>number</code></td><td>Numeric stepper</td><td>Respects <code>min</code>/<code>max</code>/<code>step</code>.</td></tr>
          <tr><td><code>checkbox</code></td><td>Toggle, multi-select</td><td>Multiple can be checked independently.</td></tr>
          <tr><td><code>radio</code></td><td>Toggle, single-select</td><td>Group with a shared <code>name</code> — only one per group can be checked.</td></tr>
          <tr><td><code>date</code> / <code>time</code> / <code>datetime-local</code></td><td>Native picker</td><td>Browser supplies its own calendar/clock UI for free.</td></tr>
          <tr><td><code>range</code></td><td>Slider</td><td>Visual only — pair with a <code>&lt;output&gt;</code> to show the numeric value.</td></tr>
          <tr><td><code>color</code></td><td>Color swatch picker</td><td>Value is always a hex string.</td></tr>
          <tr><td><code>file</code></td><td>File picker</td><td>Use <code>accept</code> to restrict type, <code>multiple</code> for several files.</td></tr>
          <tr><td><code>search</code></td><td>Text box</td><td>Adds a native clear ("×") button in most browsers.</td></tr>
          <tr><td><code>tel</code> / <code>url</code></td><td>Text box</td><td>Correct mobile keyboards; loose/no built-in format check for <code>tel</code>.</td></tr>
          <tr><td><code>hidden</code></td><td>Invisible</td><td>Submitted with the form but never shown or focusable.</td></tr>
          <tr><td><code>submit</code> / <code>reset</code> / <code>button</code></td><td>Buttons</td><td>Prefer a real <code>&lt;button&gt;</code> element for more flexible content/styling.</td></tr>
        </table>
      </div>

      <p class="topic-sub">Live example — a small registration form with real validation, no JavaScript required:</p>
      <div class="playground" data-pg="form-demo">
        <div class="pg-toolbar"><span class="pg-label">registration.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;form&gt;
  &lt;div&gt;
    &lt;label for="name"&gt;Full name&lt;/label&gt;&lt;br&gt;
    &lt;input id="name" name="name" type="text" required minlength="2" placeholder="Jane Doe"&gt;
  &lt;/div&gt;&lt;br&gt;
  &lt;div&gt;
    &lt;label for="email"&gt;Email&lt;/label&gt;&lt;br&gt;
    &lt;input id="email" name="email" type="email" required placeholder="jane@example.com"&gt;
  &lt;/div&gt;&lt;br&gt;
  &lt;div&gt;
    &lt;label for="age"&gt;Age&lt;/label&gt;&lt;br&gt;
    &lt;input id="age" name="age" type="number" min="13" max="120"&gt;
  &lt;/div&gt;&lt;br&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;Preferred plan&lt;/legend&gt;
    &lt;label&gt;&lt;input type="radio" name="plan" value="free" checked&gt; Free&lt;/label&gt;&lt;br&gt;
    &lt;label&gt;&lt;input type="radio" name="plan" value="pro"&gt; Pro&lt;/label&gt;
  &lt;/fieldset&gt;&lt;br&gt;
  &lt;label&gt;&lt;input type="checkbox" required&gt; I agree to the terms&lt;/label&gt;&lt;br&gt;&lt;br&gt;
  &lt;button type="submit"&gt;Create account&lt;/button&gt;
&lt;/form&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts allow-forms"></iframe></div></div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h4><span class="tag-chip">select</span> <span class="tag-chip">option</span> <span class="tag-chip">optgroup</span></h4>
          <p style="font-size:.88rem;color:var(--text-dim);">A dropdown. Group related options visually with <code>optgroup label="..."</code>. Add <code>multiple</code> to allow several selections at once.</p>
        </div>
        <div class="card">
          <h4><span class="tag-chip">textarea</span></h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Multi-line free text. Size with the <code>rows</code>/<code>cols</code> attributes, not just CSS, so it degrades gracefully without styles.</p>
        </div>
        <div class="card">
          <h4><span class="tag-chip">fieldset</span> <span class="tag-chip">legend</span></h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Groups related fields (e.g. a set of radio buttons) with a visible, accessible group caption via <code>legend</code>.</p>
        </div>
        <div class="card">
          <h4><span class="tag-chip">datalist</span> <span class="tag-chip">output</span> <span class="tag-chip">progress</span> <span class="tag-chip">meter</span></h4>
          <p style="font-size:.88rem;color:var(--text-dim);"><code>datalist</code> gives an input free autocomplete suggestions. <code>output</code> displays a calculation result. <code>progress</code> shows task completion; <code>meter</code> shows a value within a known range (e.g. disk usage).</p>
        </div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why is <code>placeholder</code> not a substitute for <code>label</code>?</div><div class="qa-a">Placeholder text disappears the moment the user types, has poor color contrast by browser default, isn't reliably read by every screen reader as a field name, and offers no click-to-focus target. Labels solve all four problems.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> <code>GET</code> vs <code>POST</code> for form submission?</div><div class="qa-a"><code>GET</code> appends form data to the URL as a query string — bookmarkable and cacheable, but visible in the address bar and browser history, and size-limited. <code>POST</code> sends data in the request body — required for file uploads, sensitive data (passwords), or large payloads.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> How would you group a set of radio buttons so only one can be selected?</div><div class="qa-a">Give every radio input in the group the exact same <code>name</code> attribute — the browser then treats them as mutually exclusive automatically, no JavaScript required.</div></div>

      <h3>Exercise</h3>
      <div class="playground" data-pg="forms-exercise">
        <div class="pg-toolbar"><span class="pg-label">exercise.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:220px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;!-- Task: add a label (linked with for/id), make the email
     required, and add a submit button --&gt;
&lt;form&gt;
  &lt;input type="email" id="userEmail"&gt;
&lt;/form&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts allow-forms"></iframe></div></div>
      </div>
      <details class="disclosure"><summary>Solution</summary><div class="disclosure-body">
<code>&lt;form&gt;&lt;label for="userEmail"&gt;Email&lt;/label&gt;&lt;input type="email" id="userEmail" required&gt;&lt;button type="submit"&gt;Send&lt;/button&gt;&lt;/form&gt;</code>
      </div></details>
`,
  semantic: () => `
<p class="topic-sub">Tags that describe what content <em>is</em>, not just how it's boxed — the biggest quality gap between junior and senior HTML.</p>

      <div class="card">
        <h3>A typical semantic page layout</h3>
        <div class="diagram">
          <div class="layout-diagram">
            <div class="ld-box">&lt;header&gt; — site logo, primary nav</div>
            <div class="ld-box">&lt;nav&gt; — usually lives inside header</div>
            <div class="ld-box">&lt;main&gt; — the one unique per-page content region
              <div class="ld-nested">
                <div class="ld-box">&lt;article&gt; — a self-contained post/story
                  <div class="ld-nested"><div class="ld-box">&lt;section&gt; — a thematic grouping within it</div></div>
                </div>
                <div class="ld-box">&lt;aside&gt; — tangential content (related links, ads)</div>
              </div>
            </div>
            <div class="ld-box">&lt;footer&gt; — copyright, sitemap links</div>
          </div>
        </div>
      </div>

      <table class="ref-table">
        <tr><th>Tag</th><th>Meaning</th><th>Rule of thumb</th></tr>
        <tr><td><code>header</code></td><td>Introductory content for a page or a section.</td><td>Can appear multiple times (e.g. once per <code>article</code>).</td></tr>
        <tr><td><code>nav</code></td><td>A block of major navigation links.</td><td>Not for every group of links — only primary navigation blocks.</td></tr>
        <tr><td><code>main</code></td><td>The dominant, unique content of the page.</td><td>Exactly one per page, never nested inside <code>article</code>/<code>aside</code>/<code>header</code>/<code>footer</code>.</td></tr>
        <tr><td><code>article</code></td><td>Self-contained content that would make sense syndicated on its own (a blog post, a forum comment, a product card).</td><td>Ask: "would this make sense in an RSS feed by itself?"</td></tr>
        <tr><td><code>section</code></td><td>A thematic grouping of content, normally with its own heading.</td><td>If you can't give it a heading, it's probably just a <code>div</code>.</td></tr>
        <tr><td><code>aside</code></td><td>Content tangentially related to the main content.</td><td>Sidebars, pull quotes, related-article widgets.</td></tr>
        <tr><td><code>footer</code></td><td>Closing content for a page or section.</td><td>Like <code>header</code>, can repeat per section.</td></tr>
        <tr><td><code>figure</code> / <code>figcaption</code></td><td>Self-contained media (image, chart, code) with an optional caption.</td><td>Great for images that need a caption tied semantically to them.</td></tr>
        <tr><td><code>details</code> / <code>summary</code></td><td>Native, JS-free expand/collapse disclosure widget.</td><td>Used throughout this very course for "Solution" reveals.</td></tr>
        <tr><td><code>dialog</code></td><td>A native modal/popup box.</td><td>Comes with built-in focus trapping and <code>::backdrop</code> styling via <code>showModal()</code>.</td></tr>
        <tr><td><code>template</code></td><td>Inert markup, parsed but never rendered, cloned via JavaScript.</td><td>The standard way to stamp out repeated UI (like list rows) efficiently.</td></tr>
      </table>

      <div class="playground" data-pg="semantic-demo">
        <div class="pg-toolbar"><span class="pg-label">semantic.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;header&gt;
  &lt;h1&gt;My Blog&lt;/h1&gt;
  &lt;nav&gt;&lt;a href="#"&gt;Home&lt;/a&gt; | &lt;a href="#"&gt;About&lt;/a&gt;&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;Why Semantic HTML Matters&lt;/h2&gt;
    &lt;section&gt;
      &lt;h3&gt;Accessibility&lt;/h3&gt;
      &lt;p&gt;Screen readers use these tags as navigation landmarks.&lt;/p&gt;
    &lt;/section&gt;
  &lt;/article&gt;
  &lt;aside&gt;&lt;p&gt;Related: 5 CSS tips for beginners&lt;/p&gt;&lt;/aside&gt;
&lt;/main&gt;
&lt;footer&gt;&lt;p&gt;© 2026 My Blog&lt;/p&gt;&lt;/footer&gt;

&lt;details&gt;
  &lt;summary&gt;Click to expand&lt;/summary&gt;
  &lt;p&gt;No JavaScript needed for this toggle!&lt;/p&gt;
&lt;/details&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> <code>section</code> vs <code>div</code> — how do you decide?</div><div class="qa-a">If the block of content is thematically grouped and could sensibly have its own heading, it's a <code>section</code>. If it's purely a styling/layout wrapper with no independent meaning, it's a <code>div</code>.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Can you nest <code>&lt;article&gt;</code> inside <code>&lt;article&gt;</code>?</div><div class="qa-a">Yes — e.g. a blog post <code>article</code> containing nested comment <code>article</code>s, since each comment is independently syndicate-able content in its own right.</div></div>
`,
  accessibility: () => `
<p class="topic-sub">Writing HTML that works for keyboard users, screen reader users, and everyone else — a frequent, and increasingly weighted, interview topic.</p>

      <div class="card">
        <h3>The accessibility tree</h3>
        <p style="font-size:.92rem;color:var(--text-dim);">Alongside the DOM, browsers build a second tree — the <strong>accessibility tree</strong> — that assistive technology reads. Semantic HTML populates it automatically for free; <code>div</code>-soup leaves it empty, forcing you to hand-build everything back with ARIA.</p>
        <div class="diagram flow">
          <div class="fbox">HTML source</div><span class="farrow">→</span>
          <div class="fbox">DOM tree</div><span class="farrow">→</span>
          <div class="fbox">Accessibility tree</div><span class="farrow">→</span>
          <div class="fbox">Screen reader / switch device</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h4>Core rules</h4>
          <ul style="font-size:.9rem;color:var(--text-dim);padding-left:18px;">
            <li>Every <code>img</code> needs a meaningful <code>alt</code> (or <code>alt=""</code> if purely decorative).</li>
            <li>Every form control needs a linked <code>label</code>.</li>
            <li>Heading levels shouldn't skip (h1→h2→h3, not h1→h4).</li>
            <li>Interactive elements must be reachable and operable by keyboard alone (Tab, Enter, Space).</li>
            <li>Color must never be the <em>only</em> way information is conveyed (e.g. "red = error" also needs text/icon).</li>
          </ul>
        </div>
        <div class="card">
          <h4>ARIA — the first rule of ARIA</h4>
          <p style="font-size:.9rem;color:var(--text-dim);">"No ARIA is better than bad ARIA." Always prefer a native semantic element over adding ARIA to a generic one. Use ARIA to <em>fill gaps</em> native HTML can't cover.</p>
          <table class="ref-table">
            <tr><th>Attribute</th><th>Use</th></tr>
            <tr><td><code>aria-label</code></td><td>Accessible name when no visible text exists (e.g. an icon-only button).</td></tr>
            <tr><td><code>aria-hidden="true"</code></td><td>Hides purely decorative content from assistive tech.</td></tr>
            <tr><td><code>aria-live="polite"</code></td><td>Announces dynamically updated content (toast messages, live scores).</td></tr>
            <tr><td><code>aria-expanded</code></td><td>Tells screen readers whether a disclosure/menu is open or closed.</td></tr>
            <tr><td><code>role</code></td><td>Overrides an element's implied role — use sparingly and only when necessary.</td></tr>
          </table>
        </div>
      </div>

      <div class="playground" data-pg="a11y-demo">
        <div class="pg-toolbar"><span class="pg-label">accessible-button.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:220px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;!-- Icon-only button: needs aria-label since there's no visible text --&gt;
&lt;button aria-label="Close dialog"&gt;✕&lt;/button&gt;

&lt;!-- Decorative image: empty alt tells screen readers to skip it --&gt;
&lt;img src="divider.png" alt=""&gt;

&lt;!-- Meaningful image: alt describes the content --&gt;
&lt;img src="chart.png" alt="Bar chart showing sales rising 20% in Q2"&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> When should <code>alt</code> be left empty (<code>alt=""</code>) rather than omitted?</div><div class="qa-a">Purely decorative images (a divider line, a background flourish) should get <code>alt=""</code> so screen readers skip them silently. Omitting <code>alt</code> entirely is invalid and some screen readers fall back to reading the filename instead, which is worse.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why is a <code>&lt;div onclick&gt;</code> acting like a button an accessibility problem?</div><div class="qa-a">A <code>div</code> isn't in the browser's default tab order and has no <code>button</code> role, so keyboard and screen-reader users can neither reach nor identify it as clickable. You'd need to manually bolt on <code>tabindex="0"</code>, <code>role="button"</code>, and a keydown handler for Enter/Space — all of which a real <code>&lt;button&gt;</code> gives you for free.</div></div>
`,
  seo: () => `
<p class="topic-sub">How raw HTML structure — not just words — directly affects how search engines and social platforms understand a page.</p>

      <table class="ref-table">
        <tr><th>Signal</th><th>Where it lives</th><th>Why it matters</th></tr>
        <tr><td>Page title</td><td><code>&lt;title&gt;</code></td><td>The clickable blue headline in search results; a strong ranking signal.</td></tr>
        <tr><td>Meta description</td><td><code>&lt;meta name="description"&gt;</code></td><td>The gray snippet under the title; doesn't directly boost ranking but strongly affects click-through rate.</td></tr>
        <tr><td>Heading structure</td><td><code>h1</code>–<code>h6</code></td><td>Signals topic hierarchy; keyword-relevant <code>h1</code>/<code>h2</code> carry real weight.</td></tr>
        <tr><td>Link text</td><td><code>&lt;a&gt;</code> content</td><td>"Click here" tells search engines nothing; "HTML forms guide" tells them exactly what the destination is about.</td></tr>
        <tr><td>Image alt text</td><td><code>img alt</code></td><td>The only text Google's image search (and text-only crawlers) can read for an image.</td></tr>
        <tr><td>Canonical URL</td><td><code>&lt;link rel="canonical"&gt;</code></td><td>Tells search engines which URL is the "real" one when the same content is reachable multiple ways.</td></tr>
        <tr><td>Structured data</td><td><code>&lt;script type="application/ld+json"&gt;</code></td><td>Machine-readable metadata (JSON-LD) that powers rich results — star ratings, recipe times, event dates.</td></tr>
        <tr><td>Social preview</td><td>Open Graph <code>&lt;meta property="og:*"&gt;</code></td><td>Controls how a link looks when shared on Slack, X, LinkedIn, etc.</td></tr>
      </table>

      <div class="playground" data-pg="seo-demo">
        <div class="pg-toolbar"><span class="pg-label">seo-head.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:260px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;title&gt;Learn HTML Forms — Free Interactive Guide&lt;/title&gt;
&lt;meta name="description" content="A hands-on guide to HTML forms: inputs, validation, labels and accessibility, with a live code editor."&gt;
&lt;link rel="canonical" href="https://example.com/html-forms"&gt;
&lt;meta property="og:title" content="Learn HTML Forms"&gt;
&lt;meta property="og:image" content="https://example.com/forms-preview.png"&gt;

&lt;h1&gt;This text is invisible in this preview pane —&lt;br&gt;
these tags all live in &amp;lt;head&amp;gt; and have no visual output.&lt;/h1&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Does semantic HTML directly improve Google rankings?</div><div class="qa-a">Google has never confirmed semantic tags as a direct ranking factor by themselves, but they strongly improve how accurately crawlers parse content structure and hierarchy — and they're required for many rich-result features. Treat it as a strong indirect and enabling factor, not a magic ranking switch — an honest, defensible interview answer.</div></div>
`,
  media: () => `
<p class="topic-sub">Images, audio, video, and embedding — with a strong focus on fallbacks and accessibility.</p>

      <div class="card">
        <h3><span class="tag-chip">img</span></h3>
        <table class="ref-table">
          <tr><th>Attribute</th><th>Purpose</th></tr>
          <tr><td><code>src</code></td><td>Image URL — required.</td></tr>
          <tr><td><code>alt</code></td><td>Text alternative — required for accessibility and SEO (empty string if decorative).</td></tr>
          <tr><td><code>width</code> / <code>height</code></td><td>Reserves layout space before the image loads, preventing content "jumping" (a Core Web Vitals metric: CLS).</td></tr>
          <tr><td><code>loading="lazy"</code></td><td>Defers off-screen images — free performance win, use for anything below the fold.</td></tr>
          <tr><td><code>srcset</code> / <code>sizes</code></td><td>Serves the right resolution per device — see <a href="#responsive-images">Responsive Images</a>.</td></tr>
        </table>
        <div class="playground" data-pg="img-demo">
          <div class="pg-toolbar"><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
          <div class="pg-body" style="height:180px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;img src="https://placehold.co/300x150" alt="Placeholder graphic showing 300 by 150" width="300" height="150" loading="lazy"&gt;</textarea></div><div class="pg-preview-wrap"><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h4><span class="tag-chip">audio</span> <span class="tag-chip">video</span> <span class="tag-chip">source</span> <span class="tag-chip">track</span></h4>
          <p style="font-size:.88rem;color:var(--text-dim);"><code>controls</code> shows native play/pause/volume UI. Multiple <code>source</code> children let the browser pick a format it supports. <code>track kind="captions"</code> attaches a subtitle file — essential for accessibility.</p>
        </div>
        <div class="card">
          <h4><span class="tag-chip">iframe</span> <span class="tag-chip">embed</span> <span class="tag-chip">object</span></h4>
          <p style="font-size:.88rem;color:var(--text-dim);"><code>iframe</code> embeds another full HTML document (a map, a video, this course's own live previews use it!). Always set a <code>title</code> for accessibility and a restrictive <code>sandbox</code> attribute when embedding untrusted content.</p>
        </div>
      </div>

      <div class="playground" data-pg="video-demo">
        <div class="pg-toolbar"><span class="pg-label">video.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:200px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;video controls width="280" poster="https://placehold.co/280x160"&gt;
  &lt;source src="movie.mp4" type="video/mp4"&gt;
  &lt;source src="movie.webm" type="video/webm"&gt;
  &lt;track kind="captions" src="captions.vtt" srclang="en" label="English"&gt;
  Your browser doesn't support video playback.
&lt;/video&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What's the fallback content between <code>&lt;video&gt;&lt;/video&gt;</code> for?</div><div class="qa-a">It only renders if the browser can't play <em>any</em> of the provided <code>source</code>s (or doesn't support <code>video</code> at all) — a graceful text fallback, not a caption.</div></div>
`,
  canvas: () => `
<p class="topic-sub">A blank, pixel-based drawing surface controlled entirely by JavaScript — used for games, charts, and image editors.</p>
      <div class="card">
        <p style="font-size:.92rem;color:var(--text-dim);"><code>&lt;canvas&gt;</code> itself is just an empty rectangle in the DOM. All drawing happens via its JS <strong>2D or WebGL context</strong> — nothing is scriptable through HTML attributes beyond <code>width</code>/<code>height</code>. Because it's pixel-based (not DOM elements), individual shapes aren't accessible or selectable — always provide a text alternative for important information.</p>
      </div>
      <div class="playground" data-pg="canvas-demo">
        <div class="pg-toolbar"><span class="pg-label">canvas.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:260px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;canvas id="c" width="300" height="180" style="border:1px solid #999;"&gt;
  Your browser does not support canvas.
&lt;/canvas&gt;
&lt;script&gt;
  const ctx = document.getElementById('c').getContext('2d');
  ctx.fillStyle = 'teal';
  ctx.fillRect(20, 20, 120, 80);
  ctx.beginPath();
  ctx.arc(220, 60, 40, 0, Math.PI * 2);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#333';
  ctx.fillText('Drawn with Canvas API', 20, 140);
&lt;/script&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Canvas vs SVG — when would you pick each?</div><div class="qa-a">Canvas is pixel/raster-based — great for many objects, pixel manipulation, and games, but resizing blurs it and individual shapes aren't in the DOM. SVG is vector/XML-based — each shape is a real DOM node (stylable, animatable, accessible, infinitely scalable), better for icons, charts, and diagrams with a moderate element count.</div></div>
`,
  svg: () => `
<p class="topic-sub">Scalable Vector Graphics — an XML-based image format you can write directly inside HTML.</p>
      <div class="playground" data-pg="svg-demo">
        <div class="pg-toolbar"><span class="pg-label">svg.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:240px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;svg viewBox="0 0 200 120" width="260" xmlns="http://www.w3.org/2000/svg"&gt;
  &lt;rect x="10" y="10" width="80" height="60" fill="#4fd1c5" rx="8"/&gt;
  &lt;circle cx="150" cy="40" r="30" fill="#f6ad55"/&gt;
  &lt;line x1="10" y1="100" x2="190" y2="100" stroke="#333" stroke-width="3"/&gt;
  &lt;text x="10" y="118" font-size="12" fill="#333"&gt;Pure vector graphics&lt;/text&gt;
&lt;/svg&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>
      <div class="card">
        <p style="font-size:.9rem;color:var(--text-dim);"><code>viewBox="minX minY width height"</code> defines the internal coordinate system, letting the graphic scale to any display size without blurring. Because each shape (<code>rect</code>, <code>circle</code>, <code>path</code>, <code>text</code>) is a real DOM node, you can style it with CSS and animate it with JS just like any other element — and screen readers can read an SVG's <code>&lt;title&gt;</code> child for accessibility.</p>
      </div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> How do you make an SVG icon accessible?</div><div class="qa-a">Add a <code>&lt;title&gt;</code> element as the SVG's first child (announced by screen readers), or <code>aria-hidden="true"</code> if it's purely decorative and adjacent text already conveys the meaning.</div></div>
`,
  'responsive-images': () => `
<p class="topic-sub">Serving the right image size to the right device, without JavaScript.</p>
      <div class="card">
        <table class="ref-table">
          <tr><th>Tool</th><th>Solves</th></tr>
          <tr><td><code>srcset</code> + <code>sizes</code> on <code>&lt;img&gt;</code></td><td>Same image, multiple resolutions — browser picks the best one for the screen density/width.</td></tr>
          <tr><td><code>&lt;picture&gt;</code> + <code>&lt;source&gt;</code></td><td>Art direction — genuinely different crops/formats per breakpoint (e.g. a tighter crop on mobile), or serving modern formats like WebP/AVIF with a fallback.</td></tr>
        </table>
      </div>
      <div class="playground" data-pg="responsive-img-demo">
        <div class="pg-toolbar"><span class="pg-label">responsive.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:230px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;picture&gt;
  &lt;source media="(max-width: 500px)" srcset="https://placehold.co/200x120"&gt;
  &lt;source media="(min-width: 501px)" srcset="https://placehold.co/600x200"&gt;
  &lt;img src="https://placehold.co/600x200" alt="A responsive hero banner"&gt;
&lt;/picture&gt;

&lt;p style="font-size:13px;color:#555;"&gt;Resize the preview pane (or your browser window) to see the source swap.&lt;/p&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> <code>srcset</code> vs <code>&lt;picture&gt;</code> — how do you choose?</div><div class="qa-a">If it's the same image at different resolutions, use <code>srcset</code>/<code>sizes</code> on a plain <code>img</code> — simpler, and the browser makes the choice. If you need a genuinely different image, crop, or format per breakpoint, use <code>&lt;picture&gt;</code> — you control the logic explicitly via each <code>source</code>'s <code>media</code> or <code>type</code> attribute.</div></div>
`,
  apis: () => `
<p class="topic-sub">Browser features that HTML exposes directly through markup and small JS hooks — no framework required.</p>

      <div class="grid-2">
        <div class="card">
          <h4>Drag and Drop</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Set <code>draggable="true"</code> on an element, then listen for <code>dragstart</code>, <code>dragover</code>, and <code>drop</code> events.</p>
        </div>
        <div class="card">
          <h4>Geolocation</h4>
          <p style="font-size:.88rem;color:var(--text-dim);"><code>navigator.geolocation.getCurrentPosition()</code> — needs HTTPS and explicit user permission.</p>
        </div>
        <div class="card">
          <h4>Web Storage</h4>
          <p style="font-size:.88rem;color:var(--text-dim);"><code>localStorage</code> (persists) and <code>sessionStorage</code> (clears on tab close) — simple key/value string storage, no server round-trip.</p>
        </div>
        <div class="card">
          <h4>&lt;dialog&gt; API</h4>
          <p style="font-size:.88rem;color:var(--text-dim);"><code>dialogEl.showModal()</code> opens a native, focus-trapped modal; <code>.close()</code> dismisses it — no custom JS modal library needed.</p>
        </div>
      </div>

      <div class="playground" data-pg="dialog-demo">
        <div class="pg-toolbar"><span class="pg-label">dialog.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button></div>
        <div class="pg-body" style="height:220px;"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;button id="openBtn"&gt;Open dialog&lt;/button&gt;
&lt;dialog id="myDialog"&gt;
  &lt;p&gt;This is a native &amp;lt;dialog&amp;gt; — no library needed.&lt;/p&gt;
  &lt;button id="closeBtn"&gt;Close&lt;/button&gt;
&lt;/dialog&gt;
&lt;script&gt;
  openBtn.onclick = () =&gt; myDialog.showModal();
  closeBtn.onclick = () =&gt; myDialog.close();
&lt;/script&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> <code>localStorage</code> vs cookies?</div><div class="qa-a"><code>localStorage</code> holds ~5–10MB, never sent to the server automatically, persists until explicitly cleared. Cookies are tiny (~4KB), sent with <em>every</em> matching HTTP request automatically, and can carry an expiry date — which is why cookies (not localStorage) are used for server-side session/auth tokens.</div></div>
`,
  interview: () => `
<p class="topic-sub">A consolidated bank on top of the questions already embedded in every topic above. Grouped by difficulty.</p>

      <h3>Beginner</h3>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What does HTML stand for?</div><div class="qa-a">HyperText Markup Language.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What's the difference between an HTML element and an HTML tag?</div><div class="qa-a">A tag is the bracketed keyword itself (<code>&lt;p&gt;</code>); an element is the tag plus its content plus its closing tag, treated as one unit.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What is the correct DOCTYPE for HTML5?</div><div class="qa-a"><code>&lt;!DOCTYPE html&gt;</code> — case-insensitive, and it's the only line in the whole document with no closing tag by design.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What's the difference between block-level and inline elements?</div><div class="qa-a">Block-level elements (<code>div</code>, <code>p</code>, <code>h1</code>) start on a new line and take the full available width. Inline elements (<code>span</code>, <code>a</code>, <code>strong</code>) flow within a line of text and only take up as much width as their content.</div></div>

      <h3>Intermediate</h3>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What's the difference between <code>id</code> and <code>class</code>?</div><div class="qa-a"><code>id</code> must be unique per page and is meant for one specific element (also used for in-page anchor links); <code>class</code> can be reused across many elements for shared styling/behavior.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What's the difference between <code>localStorage</code>, <code>sessionStorage</code>, and cookies?</div><div class="qa-a">Covered in detail in <a href="#apis">HTML APIs</a> — in short: size, lifetime, and whether they're auto-sent with HTTP requests all differ.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why is table-based layout considered bad practice today?</div><div class="qa-a">Tables force a rigid grid that doesn't reflow well on small screens, confuse screen readers (which announce "table" and try to read row/column headers for what's actually just a layout box), and mix presentation with structure. CSS Grid/Flexbox replaced this entirely.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What is the DOM?</div><div class="qa-a">The Document Object Model — an in-memory, object-oriented tree representation of the parsed HTML that JavaScript can read and mutate, and that the browser repaints whenever it changes.</div></div>

      <h3>Advanced / Tricky</h3>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Output prediction: what renders from <code>&lt;p&gt;Hello   world&lt;/p&gt;</code> (with 3 spaces)?</div><div class="qa-a">"Hello world" with a single space — HTML collapses consecutive whitespace in text content to one space (see <a href="#basics">HTML Basics</a>). You'd need <code>&amp;nbsp;</code> or CSS <code>white-space:pre</code> to preserve extra spaces.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Scenario: a designer asks for a page with no visible headings at all, but SEO still needs to be strong. What do you do?</div><div class="qa-a">Still include a real <code>&lt;h1&gt;</code> (and a logical heading structure) in the markup, then visually hide it accessibly — e.g. a "visually-hidden" CSS class that removes it from the visual layout while keeping it in the DOM and accessibility tree. Never use <code>display:none</code> for content search engines/screen readers should still perceive, and never fake heading appearance with styled <code>div</code>s — you'd lose both SEO structure and accessibility landmarks.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> Why does the browser still render a page with mismatched/unclosed tags instead of throwing an error?</div><div class="qa-a">HTML parsers are built with a formally specified error-correction algorithm (unlike XML, which is strict). Browsers auto-close tags and repair malformed nesting using well-defined rules — which is exactly why two different malformed pages can render subtly differently; relying on this behavior is fragile, hence "write valid HTML" being a real professional standard, not just pedantry.</div></div>
      <div class="qa-item"><div class="qa-q"><span class="qmark">Q.</span> What is the Critical Rendering Path, and how does HTML structure affect it?</div><div class="qa-a">It's the sequence of steps (parse HTML → build DOM → parse CSS → build CSSOM → combine into a render tree → layout → paint) the browser takes to get pixels on screen. Blocking <code>&lt;script&gt;</code> tags in <code>&lt;head&gt;</code>, render-blocking stylesheets, and unsized images all lengthen this path — which is why <code>defer</code>, <code>width</code>/<code>height</code> on images, and <code>loading="lazy"</code> are performance topics, not just cleanliness.</div></div>

      <h3>Take the quiz</h3>
      <p class="topic-sub">10 questions, instant scoring. Nothing leaves your browser.</p>
      <h3 style="margin-top:0;">Quick check</h3><div data-quiz-mount></div>
        <div class="quiz-score" id="quizScore"></div>
      </div>
`,
  projects: () => `
<p class="topic-sub">Full, working, editable builds — copy, download, or keep tweaking any of them right here.</p>

      <h3>1. Product Card</h3>
      <div class="playground" data-pg="proj-product">
        <div class="pg-toolbar"><span class="pg-label">product-card.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="download">⬇ Download</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;article style="max-width:260px;border:1px solid #ddd;border-radius:12px;overflow:hidden;font-family:sans-serif;box-shadow:0 4px 10px rgba(0,0,0,.08);"&gt;
  &lt;img src="https://placehold.co/260x180" alt="Wireless over-ear headphones in matte black" style="width:100%;display:block;"&gt;
  &lt;div style="padding:14px;"&gt;
    &lt;h3 style="margin:0 0 4px;font-size:1.05rem;"&gt;Aria Wireless Headphones&lt;/h3&gt;
    &lt;p style="margin:0 0 10px;color:#666;font-size:.85rem;"&gt;30-hour battery · Active noise cancelling&lt;/p&gt;
    &lt;div style="display:flex;align-items:center;justify-content:space-between;"&gt;
      &lt;strong style="font-size:1.2rem;"&gt;$89.99&lt;/strong&gt;
      &lt;button style="background:#111;color:#fff;border:none;padding:8px 14px;border-radius:8px;cursor:pointer;"&gt;Add to cart&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/article&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <h3>2. Pricing Card</h3>
      <div class="playground" data-pg="proj-pricing">
        <div class="pg-toolbar"><span class="pg-label">pricing-card.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="download">⬇ Download</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;section style="max-width:260px;border:2px solid #4fd1c5;border-radius:14px;padding:22px;font-family:sans-serif;text-align:center;"&gt;
  &lt;p style="margin:0;letter-spacing:.08em;font-size:.75rem;color:#0e9488;font-weight:700;"&gt;PRO PLAN&lt;/p&gt;
  &lt;p style="margin:8px 0;font-size:2.2rem;font-weight:800;"&gt;$19&lt;span style="font-size:.9rem;color:#777;"&gt;/mo&lt;/span&gt;&lt;/p&gt;
  &lt;ul style="list-style:none;padding:0;margin:16px 0;text-align:left;font-size:.9rem;color:#444;"&gt;
    &lt;li style="padding:6px 0;"&gt;✓ Unlimited projects&lt;/li&gt;
    &lt;li style="padding:6px 0;"&gt;✓ Priority support&lt;/li&gt;
    &lt;li style="padding:6px 0;"&gt;✓ Custom domain&lt;/li&gt;
  &lt;/ul&gt;
  &lt;button style="width:100%;padding:10px;background:#4fd1c5;border:none;border-radius:8px;font-weight:700;cursor:pointer;"&gt;Choose Pro&lt;/button&gt;
&lt;/section&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <h3>3. Resume / Tribute Page</h3>
      <div class="playground" data-pg="proj-resume">
        <div class="pg-toolbar"><span class="pg-label">resume.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="download">⬇ Download</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;div style="font-family:sans-serif;max-width:480px;"&gt;
  &lt;header style="border-bottom:3px solid #222;padding-bottom:10px;margin-bottom:14px;"&gt;
    &lt;h1 style="margin:0;font-size:1.6rem;"&gt;Alex Rivera&lt;/h1&gt;
    &lt;p style="margin:2px 0 0;color:#555;"&gt;Frontend Developer · alex@example.com&lt;/p&gt;
  &lt;/header&gt;
  &lt;section&gt;
    &lt;h2 style="font-size:1rem;text-transform:uppercase;letter-spacing:.05em;color:#4fd1c5;"&gt;Experience&lt;/h2&gt;
    &lt;article style="margin-bottom:10px;"&gt;
      &lt;h3 style="margin:0;font-size:.95rem;"&gt;Frontend Engineer — Acme Inc.&lt;/h3&gt;
      &lt;p style="margin:2px 0;color:#777;font-size:.82rem;"&gt;2023 – Present&lt;/p&gt;
      &lt;p style="margin:0;font-size:.88rem;"&gt;Built and maintained the customer dashboard used by 40k+ monthly users.&lt;/p&gt;
    &lt;/article&gt;
  &lt;/section&gt;
  &lt;section&gt;
    &lt;h2 style="font-size:1rem;text-transform:uppercase;letter-spacing:.05em;color:#4fd1c5;"&gt;Skills&lt;/h2&gt;
    &lt;ul style="display:flex;gap:8px;list-style:none;padding:0;flex-wrap:wrap;"&gt;
      &lt;li style="background:#eee;padding:4px 10px;border-radius:20px;font-size:.8rem;"&gt;HTML5&lt;/li&gt;
      &lt;li style="background:#eee;padding:4px 10px;border-radius:20px;font-size:.8rem;"&gt;CSS3&lt;/li&gt;
      &lt;li style="background:#eee;padding:4px 10px;border-radius:20px;font-size:.8rem;"&gt;Accessibility&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/section&gt;
&lt;/div&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts"></iframe></div></div>
      </div>

      <h3>4. Restaurant Landing Page</h3>
      <div class="playground" data-pg="proj-restaurant">
        <div class="pg-toolbar"><span class="pg-label">restaurant.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="download">⬇ Download</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;div style="font-family:sans-serif;"&gt;
  &lt;header style="background:#1a1a1a;color:#fff;padding:40px 20px;text-align:center;"&gt;
    &lt;h1 style="margin:0;font-size:2rem;letter-spacing:.05em;"&gt;Osteria Bella&lt;/h1&gt;
    &lt;p style="color:#f6ad55;margin:8px 0 20px;"&gt;Wood-fired Italian, since 1998&lt;/p&gt;
    &lt;nav&gt;
      &lt;a href="#menu" style="color:#fff;margin:0 10px;text-decoration:none;"&gt;Menu&lt;/a&gt;
      &lt;a href="#hours" style="color:#fff;margin:0 10px;text-decoration:none;"&gt;Hours&lt;/a&gt;
      &lt;a href="#book" style="color:#fff;margin:0 10px;text-decoration:none;"&gt;Reserve&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  &lt;main style="padding:20px;max-width:500px;margin:0 auto;"&gt;
    &lt;section id="menu"&gt;
      &lt;h2&gt;Today's Menu&lt;/h2&gt;
      &lt;ul&gt;
        &lt;li&gt;Margherita Pizza — $14&lt;/li&gt;
        &lt;li&gt;Tagliatelle al Ragù — $18&lt;/li&gt;
        &lt;li&gt;Tiramisu — $8&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/section&gt;
    &lt;section id="hours"&gt;
      &lt;h2&gt;Hours&lt;/h2&gt;
      &lt;p&gt;Tue–Sun, 5pm–11pm. Closed Mondays.&lt;/p&gt;
    &lt;/section&gt;
    &lt;section id="book"&gt;
      &lt;h2&gt;Reserve a Table&lt;/h2&gt;
      &lt;form&gt;
        &lt;label for="rname"&gt;Name&lt;/label&gt;&lt;br&gt;
        &lt;input id="rname" type="text" required&gt;&lt;br&gt;&lt;br&gt;
        &lt;label for="rdate"&gt;Date&lt;/label&gt;&lt;br&gt;
        &lt;input id="rdate" type="date" required&gt;&lt;br&gt;&lt;br&gt;
        &lt;button type="submit"&gt;Book now&lt;/button&gt;
      &lt;/form&gt;
    &lt;/section&gt;
  &lt;/main&gt;
  &lt;footer style="background:#1a1a1a;color:#aaa;text-align:center;padding:14px;font-size:.85rem;"&gt;© 2026 Osteria Bella&lt;/footer&gt;
&lt;/div&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts allow-forms"></iframe></div></div>
      </div>

      <h3>5. Survey Form</h3>
      <div class="playground" data-pg="proj-survey">
        <div class="pg-toolbar"><span class="pg-label">survey.html</span><button class="pg-btn" data-act="run">▶ Run</button><button class="pg-btn" data-act="reset">⟲ Reset</button><button class="pg-btn" data-act="download">⬇ Download</button><button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button></div>
        <div class="pg-body tall"><div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;form style="font-family:sans-serif;max-width:420px;"&gt;
  &lt;h2&gt;Course Feedback Survey&lt;/h2&gt;
  &lt;label for="s-name"&gt;Name&lt;/label&gt;&lt;br&gt;
  &lt;input id="s-name" type="text" required&gt;&lt;br&gt;&lt;br&gt;

  &lt;label for="s-rating"&gt;Overall rating&lt;/label&gt;&lt;br&gt;
  &lt;input id="s-rating" type="range" min="1" max="10" value="8" oninput="ratingOut.value=this.value"&gt;
  &lt;output id="ratingOut"&gt;8&lt;/output&gt;&lt;br&gt;&lt;br&gt;

  &lt;fieldset&gt;
    &lt;legend&gt;How did you hear about us?&lt;/legend&gt;
    &lt;label&gt;&lt;input type="checkbox" name="src" value="friend"&gt; Friend&lt;/label&gt;&lt;br&gt;
    &lt;label&gt;&lt;input type="checkbox" name="src" value="social"&gt; Social media&lt;/label&gt;&lt;br&gt;
    &lt;label&gt;&lt;input type="checkbox" name="src" value="search"&gt; Search engine&lt;/label&gt;
  &lt;/fieldset&gt;&lt;br&gt;

  &lt;label for="s-comments"&gt;Comments&lt;/label&gt;&lt;br&gt;
  &lt;textarea id="s-comments" rows="3" style="width:100%;"&gt;&lt;/textarea&gt;&lt;br&gt;&lt;br&gt;
  &lt;button type="submit"&gt;Submit feedback&lt;/button&gt;
&lt;/form&gt;</textarea></div><div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts allow-forms"></iframe></div></div>
      </div>

      <div class="card">
        <h3>Build these yourself next</h3>
        <p style="font-size:.9rem;color:var(--text-dim);">Using only what you've learned so far, try building: a <strong>Personal Portfolio</strong> (header + about + projects grid + contact form), a <strong>Coffee Shop</strong> one-pager, a <strong>Blog</strong> post layout with <span class="tag-chip">article</span>/<span class="tag-chip">aside</span>, a <strong>News Website</strong> homepage, a <strong>Dashboard Layout</strong> using semantic regions, and an <strong>E-commerce Home</strong> page with a product grid. Use the <a href="#playground">Practice Playground</a> below as your canvas.</p>
      </div>
`,
  assignments: () => `
<p class="topic-sub">Structured practice, ordered by difficulty. Build each one in the <a href="#playground">Practice Playground</a>, then compare against your own judgement — there's no single correct markup, only more/less semantic ones.</p>

      <div class="grid-3">
        <div class="card">
          <span class="badge def">Easy</span>
          <h4>1. Recipe Card</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Build a recipe with a heading, an ordered list of steps, an unordered list of ingredients, and an image with proper <code>alt</code> text.</p>
        </div>
        <div class="card">
          <span class="badge def">Easy</span>
          <h4>2. Bio Page</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">A one-page bio using <code>header</code>, <code>main</code>, <code>footer</code>, at least one <code>h1</code>–<code>h3</code> hierarchy, and a <code>mailto:</code> link.</p>
        </div>
        <div class="card">
          <span class="badge def">Easy</span>
          <h4>3. FAQ List</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Build 5 FAQs using native <code>details</code>/<code>summary</code> — no JavaScript allowed.</p>
        </div>
        <div class="card">
          <span class="badge tip">Medium</span>
          <h4>4. Signup Form</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Name, email, password (with <code>minlength</code>), a plan <code>select</code>, and a terms checkbox — every field properly labeled.</p>
        </div>
        <div class="card">
          <span class="badge tip">Medium</span>
          <h4>5. Pricing Table</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Three pricing tiers laid out with a real <code>table</code>, correct <code>scope</code> attributes, and a <code>caption</code>.</p>
        </div>
        <div class="card">
          <span class="badge tip">Medium</span>
          <h4>6. Article with Sidebar</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">An <code>article</code> with 2+ <code>section</code>s, an <code>aside</code> for related links, and a <code>figure</code>/<code>figcaption</code> image.</p>
        </div>
        <div class="card">
          <span class="badge warn">Hard</span>
          <h4>7. Full Semantic Landing Page</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Combine header/nav, hero, feature grid, testimonial, pricing, FAQ, and footer, all with correct heading hierarchy and zero <code>div</code>-only sections where a semantic tag would fit.</p>
        </div>
        <div class="card">
          <span class="badge warn">Hard</span>
          <h4>8. Accessible Modal</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">Build a modal using native <code>&lt;dialog&gt;</code>, triggered by a real <code>button</code>, with a visible focus state and an <code>aria-label</code> on the close control.</p>
        </div>
        <div class="card">
          <span class="badge warn">Hard</span>
          <h4>9. Multi-step Form</h4>
          <p style="font-size:.88rem;color:var(--text-dim);">A 3-section registration form using <code>fieldset</code>/<code>legend</code> per step, full validation attributes, and a <code>progress</code> element showing completion.</p>
        </div>
      </div>
`,
  cheatsheet: () => `
<p class="topic-sub">Quick-reference cards for the things you'll forget mid-interview. Type in the box to filter every card below.</p>
      <input id="cheatSearch" type="text" placeholder="Search the cheat sheet (e.g. 'lazy', 'radio', 'viewport')…">

      <div class="grid-2" id="cheatCards">
        <div class="card cheat-card"><h4>Boilerplate</h4><pre style="background:var(--bg-inset);padding:10px;border-radius:6px;font-size:.78rem;overflow:auto;">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;title&gt;Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;&lt;/body&gt;
&lt;/html&gt;</pre></div>

        <div class="card cheat-card"><h4>Void elements (no closing tag)</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>area, base, br, col, embed, hr, img, input, link, meta, param, source, track, wbr</code></p></div>

        <div class="card cheat-card"><h4>Input types</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>text, email, password, number, tel, url, search, date, time, datetime-local, month, week, color, range, checkbox, radio, file, hidden, submit, reset, button</code></p></div>

        <div class="card cheat-card"><h4>Global attributes</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>id, class, style, title, hidden, tabindex, draggable, contenteditable, spellcheck, translate, dir, lang, data-*, aria-*</code></p></div>

        <div class="card cheat-card"><h4>Form validation attributes</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>required, readonly, disabled, placeholder, autocomplete, pattern, maxlength, minlength, min, max, step, accept, multiple, novalidate, form</code></p></div>

        <div class="card cheat-card"><h4>Semantic layout tags</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>header, nav, main, section, article, aside, footer, figure, figcaption, details, summary, dialog, template</code></p></div>

        <div class="card cheat-card"><h4>Link rel values</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>stylesheet, icon, canonical, preload, prefetch, nofollow, noopener, noreferrer, author, alternate</code></p></div>

        <div class="card cheat-card"><h4>Image / performance attributes</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>src, alt, width, height, loading="lazy", srcset, sizes, decoding="async"</code></p></div>

        <div class="card cheat-card"><h4>Meta tags worth memorizing</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>charset, viewport, description, robots, og:title, og:image, theme-color</code></p></div>

        <div class="card cheat-card"><h4>Script loading</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>&lt;script src="a.js" defer&gt;</code> — waits, runs in order. <code>&lt;script src="a.js" async&gt;</code> — runs ASAP, order not guaranteed.</p></div>

        <div class="card cheat-card"><h4>Table skeleton</h4><pre style="background:var(--bg-inset);padding:10px;border-radius:6px;font-size:.78rem;overflow:auto;">&lt;table&gt;
&lt;caption&gt;...&lt;/caption&gt;
&lt;thead&gt;&lt;tr&gt;&lt;th scope="col"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;
&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;
&lt;/table&gt;</pre></div>

        <div class="card cheat-card"><h4>ARIA quick reference</h4><p style="font-size:.85rem;color:var(--text-dim);"><code>aria-label, aria-labelledby, aria-hidden, aria-live, aria-expanded, aria-disabled, role</code></p></div>
      </div>
`,
  tagref: () => `
<p class="topic-sub">All 111 standard HTML5 tags in one filterable, searchable table.</p>

      <div class="cheat-filter" id="tagrefFilters">
        <button class="active" data-filter="all">All</button><button data-filter="Embedded">Embedded</button><button data-filter="Forms">Forms</button><button data-filter="Graphics">Graphics</button><button data-filter="Interactive">Interactive</button><button data-filter="Media">Media</button><button data-filter="Metadata">Metadata</button><button data-filter="Scripting">Scripting</button><button data-filter="Sectioning">Sectioning</button><button data-filter="Structure">Structure</button><button data-filter="Table">Table</button><button data-filter="Text content">Text content</button><button data-filter="Web components">Web components</button>
      </div>
      <input id="tagrefSearch" type="text" placeholder="Filter by tag name or description…">
      <table class="ref-table" id="tagrefTable">
        <tr><th>Tag</th><th>Category</th><th>Description</th></tr>
        <tr data-cat="Text content"><td><code>&lt;a&gt;</code></td><td>Text content</td><td>Hyperlink to another page or resource</td></tr><tr data-cat="Text content"><td><code>&lt;abbr&gt;</code></td><td>Text content</td><td>Abbreviation, expandable via the title attribute</td></tr><tr data-cat="Text content"><td><code>&lt;address&gt;</code></td><td>Text content</td><td>Contact information for the page/article author</td></tr><tr data-cat="Media"><td><code>&lt;area&gt;</code></td><td>Media</td><td>A clickable region inside an image map</td></tr><tr data-cat="Sectioning"><td><code>&lt;article&gt;</code></td><td>Sectioning</td><td>Self-contained, independently distributable content</td></tr><tr data-cat="Sectioning"><td><code>&lt;aside&gt;</code></td><td>Sectioning</td><td>Content tangentially related to the main content</td></tr><tr data-cat="Media"><td><code>&lt;audio&gt;</code></td><td>Media</td><td>Embeds sound content with playback controls</td></tr><tr data-cat="Text content"><td><code>&lt;b&gt;</code></td><td>Text content</td><td>Bold text with no extra semantic importance</td></tr><tr data-cat="Metadata"><td><code>&lt;base&gt;</code></td><td>Metadata</td><td>Sets the base URL for all relative links on the page</td></tr><tr data-cat="Text content"><td><code>&lt;bdi&gt;</code></td><td>Text content</td><td>Isolates text that might be a different text direction</td></tr><tr data-cat="Text content"><td><code>&lt;bdo&gt;</code></td><td>Text content</td><td>Explicitly overrides the current text direction</td></tr><tr data-cat="Text content"><td><code>&lt;blockquote&gt;</code></td><td>Text content</td><td>A block-level, long quotation</td></tr><tr data-cat="Structure"><td><code>&lt;body&gt;</code></td><td>Structure</td><td>Contains all visible page content</td></tr><tr data-cat="Text content"><td><code>&lt;br&gt;</code></td><td>Text content</td><td>A single line break</td></tr><tr data-cat="Forms"><td><code>&lt;button&gt;</code></td><td>Forms</td><td>A clickable control, defaults to submit inside a form</td></tr><tr data-cat="Graphics"><td><code>&lt;canvas&gt;</code></td><td>Graphics</td><td>A pixel-based drawing surface controlled via JavaScript</td></tr><tr data-cat="Table"><td><code>&lt;caption&gt;</code></td><td>Table</td><td>Title/caption for a table</td></tr><tr data-cat="Text content"><td><code>&lt;cite&gt;</code></td><td>Text content</td><td>Title of a referenced creative work</td></tr><tr data-cat="Text content"><td><code>&lt;code&gt;</code></td><td>Text content</td><td>A short fragment of computer code</td></tr><tr data-cat="Table"><td><code>&lt;col&gt;</code></td><td>Table</td><td>Defines properties for a table column</td></tr><tr data-cat="Table"><td><code>&lt;colgroup&gt;</code></td><td>Table</td><td>Groups one or more &lt;col&gt; elements</td></tr><tr data-cat="Text content"><td><code>&lt;data&gt;</code></td><td>Text content</td><td>Links content with a machine-readable value</td></tr><tr data-cat="Forms"><td><code>&lt;datalist&gt;</code></td><td>Forms</td><td>A list of autocomplete options for an input</td></tr><tr data-cat="Text content"><td><code>&lt;dd&gt;</code></td><td>Text content</td><td>Description/value in a description list</td></tr><tr data-cat="Text content"><td><code>&lt;del&gt;</code></td><td>Text content</td><td>Text that has been deleted from a document</td></tr><tr data-cat="Interactive"><td><code>&lt;details&gt;</code></td><td>Interactive</td><td>Native, JS-free expand/collapse widget</td></tr><tr data-cat="Text content"><td><code>&lt;dfn&gt;</code></td><td>Text content</td><td>Marks the defining instance of a term</td></tr><tr data-cat="Interactive"><td><code>&lt;dialog&gt;</code></td><td>Interactive</td><td>A native modal or non-modal dialog box</td></tr><tr data-cat="Structure"><td><code>&lt;div&gt;</code></td><td>Structure</td><td>Generic block-level container with no semantic meaning</td></tr><tr data-cat="Text content"><td><code>&lt;dl&gt;</code></td><td>Text content</td><td>A description list container</td></tr><tr data-cat="Text content"><td><code>&lt;dt&gt;</code></td><td>Text content</td><td>Term in a description list</td></tr><tr data-cat="Text content"><td><code>&lt;em&gt;</code></td><td>Text content</td><td>Stress emphasis that changes sentence meaning</td></tr><tr data-cat="Media"><td><code>&lt;embed&gt;</code></td><td>Media</td><td>Embeds external, often plugin-based, content</td></tr><tr data-cat="Forms"><td><code>&lt;fieldset&gt;</code></td><td>Forms</td><td>Groups related form controls together</td></tr><tr data-cat="Text content"><td><code>&lt;figcaption&gt;</code></td><td>Text content</td><td>Caption for a &lt;figure&gt;</td></tr><tr data-cat="Sectioning"><td><code>&lt;figure&gt;</code></td><td>Sectioning</td><td>Self-contained media, optionally with a caption</td></tr><tr data-cat="Sectioning"><td><code>&lt;footer&gt;</code></td><td>Sectioning</td><td>Closing content for a page or section</td></tr><tr data-cat="Forms"><td><code>&lt;form&gt;</code></td><td>Forms</td><td>Container for interactive controls to submit data</td></tr><tr data-cat="Sectioning"><td><code>&lt;h1&gt;</code></td><td>Sectioning</td><td>Top-level section heading</td></tr><tr data-cat="Sectioning"><td><code>&lt;h2&gt;</code></td><td>Sectioning</td><td>Second-level section heading</td></tr><tr data-cat="Sectioning"><td><code>&lt;h3&gt;</code></td><td>Sectioning</td><td>Third-level section heading</td></tr><tr data-cat="Sectioning"><td><code>&lt;h4&gt;</code></td><td>Sectioning</td><td>Fourth-level section heading</td></tr><tr data-cat="Sectioning"><td><code>&lt;h5&gt;</code></td><td>Sectioning</td><td>Fifth-level section heading</td></tr><tr data-cat="Sectioning"><td><code>&lt;h6&gt;</code></td><td>Sectioning</td><td>Sixth-level section heading</td></tr><tr data-cat="Structure"><td><code>&lt;head&gt;</code></td><td>Structure</td><td>Container for document metadata</td></tr><tr data-cat="Sectioning"><td><code>&lt;header&gt;</code></td><td>Sectioning</td><td>Introductory content for a page or section</td></tr><tr data-cat="Sectioning"><td><code>&lt;hgroup&gt;</code></td><td>Sectioning</td><td>Groups a heading with related secondary text</td></tr><tr data-cat="Text content"><td><code>&lt;hr&gt;</code></td><td>Text content</td><td>Thematic break between sections of content</td></tr><tr data-cat="Structure"><td><code>&lt;html&gt;</code></td><td>Structure</td><td>The root element of the document</td></tr><tr data-cat="Text content"><td><code>&lt;i&gt;</code></td><td>Text content</td><td>Text in an alternate voice, e.g. a technical term</td></tr><tr data-cat="Embedded"><td><code>&lt;iframe&gt;</code></td><td>Embedded</td><td>Embeds another full HTML document inline</td></tr><tr data-cat="Media"><td><code>&lt;img&gt;</code></td><td>Media</td><td>Embeds an image</td></tr><tr data-cat="Forms"><td><code>&lt;input&gt;</code></td><td>Forms</td><td>A form control; type varies its entire behavior</td></tr><tr data-cat="Text content"><td><code>&lt;ins&gt;</code></td><td>Text content</td><td>Text that has been inserted into a document</td></tr><tr data-cat="Text content"><td><code>&lt;kbd&gt;</code></td><td>Text content</td><td>Represents user keyboard input</td></tr><tr data-cat="Forms"><td><code>&lt;label&gt;</code></td><td>Forms</td><td>A caption for a form control, linked via for/id</td></tr><tr data-cat="Forms"><td><code>&lt;legend&gt;</code></td><td>Forms</td><td>Caption for a &lt;fieldset&gt;</td></tr><tr data-cat="Text content"><td><code>&lt;li&gt;</code></td><td>Text content</td><td>A list item inside ul/ol/menu</td></tr><tr data-cat="Metadata"><td><code>&lt;link&gt;</code></td><td>Metadata</td><td>Links an external resource, most often a stylesheet</td></tr><tr data-cat="Sectioning"><td><code>&lt;main&gt;</code></td><td>Sectioning</td><td>The dominant, unique content of the document</td></tr><tr data-cat="Media"><td><code>&lt;map&gt;</code></td><td>Media</td><td>Defines an image map with clickable areas</td></tr><tr data-cat="Text content"><td><code>&lt;mark&gt;</code></td><td>Text content</td><td>Text highlighted for reference/relevance</td></tr><tr data-cat="Text content"><td><code>&lt;menu&gt;</code></td><td>Text content</td><td>A list intended for interactive commands (rare)</td></tr><tr data-cat="Metadata"><td><code>&lt;meta&gt;</code></td><td>Metadata</td><td>Metadata that can't be expressed by other tags</td></tr><tr data-cat="Forms"><td><code>&lt;meter&gt;</code></td><td>Forms</td><td>A scalar value within a known range</td></tr><tr data-cat="Sectioning"><td><code>&lt;nav&gt;</code></td><td>Sectioning</td><td>A block of major navigation links</td></tr><tr data-cat="Metadata"><td><code>&lt;noscript&gt;</code></td><td>Metadata</td><td>Fallback content when JavaScript is disabled</td></tr><tr data-cat="Embedded"><td><code>&lt;object&gt;</code></td><td>Embedded</td><td>Embeds external resources like PDFs or plugins</td></tr><tr data-cat="Text content"><td><code>&lt;ol&gt;</code></td><td>Text content</td><td>An ordered (numbered) list</td></tr><tr data-cat="Forms"><td><code>&lt;optgroup&gt;</code></td><td>Forms</td><td>Groups related &lt;option&gt;s in a &lt;select&gt;</td></tr><tr data-cat="Forms"><td><code>&lt;option&gt;</code></td><td>Forms</td><td>An item in a &lt;select&gt;, &lt;datalist&gt;, or &lt;optgroup&gt;</td></tr><tr data-cat="Forms"><td><code>&lt;output&gt;</code></td><td>Forms</td><td>Displays the result of a calculation</td></tr><tr data-cat="Text content"><td><code>&lt;p&gt;</code></td><td>Text content</td><td>A paragraph of text</td></tr><tr data-cat="Media"><td><code>&lt;picture&gt;</code></td><td>Media</td><td>Container offering multiple image sources for art direction</td></tr><tr data-cat="Text content"><td><code>&lt;pre&gt;</code></td><td>Text content</td><td>Preformatted text, preserves whitespace and line breaks</td></tr><tr data-cat="Forms"><td><code>&lt;progress&gt;</code></td><td>Forms</td><td>Shows completion progress of a task</td></tr><tr data-cat="Text content"><td><code>&lt;q&gt;</code></td><td>Text content</td><td>A short, inline quotation</td></tr><tr data-cat="Text content"><td><code>&lt;rp&gt;</code></td><td>Text content</td><td>Fallback parentheses for browsers without ruby support</td></tr><tr data-cat="Text content"><td><code>&lt;rt&gt;</code></td><td>Text content</td><td>Pronunciation of characters in a ruby annotation</td></tr><tr data-cat="Text content"><td><code>&lt;ruby&gt;</code></td><td>Text content</td><td>East Asian typography annotation (pronunciation guides)</td></tr><tr data-cat="Text content"><td><code>&lt;s&gt;</code></td><td>Text content</td><td>Text that is no longer accurate or relevant (strikethrough)</td></tr><tr data-cat="Text content"><td><code>&lt;samp&gt;</code></td><td>Text content</td><td>Sample output from a computer program</td></tr><tr data-cat="Scripting"><td><code>&lt;script&gt;</code></td><td>Scripting</td><td>Embeds or references executable JavaScript</td></tr><tr data-cat="Sectioning"><td><code>&lt;section&gt;</code></td><td>Sectioning</td><td>A generic thematic grouping of content</td></tr><tr data-cat="Forms"><td><code>&lt;select&gt;</code></td><td>Forms</td><td>A dropdown control offering a list of options</td></tr><tr data-cat="Web components"><td><code>&lt;slot&gt;</code></td><td>Web components</td><td>A placeholder in a web component's shadow DOM</td></tr><tr data-cat="Text content"><td><code>&lt;small&gt;</code></td><td>Text content</td><td>Side comments and fine print</td></tr><tr data-cat="Media"><td><code>&lt;source&gt;</code></td><td>Media</td><td>Specifies alternate media resources for picture/audio/video</td></tr><tr data-cat="Text content"><td><code>&lt;span&gt;</code></td><td>Text content</td><td>Generic inline container with no semantic meaning</td></tr><tr data-cat="Text content"><td><code>&lt;strong&gt;</code></td><td>Text content</td><td>Strong importance, seriousness, or urgency</td></tr><tr data-cat="Metadata"><td><code>&lt;style&gt;</code></td><td>Metadata</td><td>Embeds CSS style information directly in the document</td></tr><tr data-cat="Text content"><td><code>&lt;sub&gt;</code></td><td>Text content</td><td>Subscript text</td></tr><tr data-cat="Interactive"><td><code>&lt;summary&gt;</code></td><td>Interactive</td><td>Visible heading for a &lt;details&gt; disclosure widget</td></tr><tr data-cat="Text content"><td><code>&lt;sup&gt;</code></td><td>Text content</td><td>Superscript text</td></tr><tr data-cat="Table"><td><code>&lt;table&gt;</code></td><td>Table</td><td>Represents tabular data</td></tr><tr data-cat="Table"><td><code>&lt;tbody&gt;</code></td><td>Table</td><td>Groups the main body rows of a table</td></tr><tr data-cat="Table"><td><code>&lt;td&gt;</code></td><td>Table</td><td>A single data cell in a table</td></tr><tr data-cat="Scripting"><td><code>&lt;template&gt;</code></td><td>Scripting</td><td>Inert HTML fragment, cloned via JavaScript</td></tr><tr data-cat="Forms"><td><code>&lt;textarea&gt;</code></td><td>Forms</td><td>A multi-line plain-text edit control</td></tr><tr data-cat="Table"><td><code>&lt;tfoot&gt;</code></td><td>Table</td><td>Groups the summary/footer rows of a table</td></tr><tr data-cat="Table"><td><code>&lt;th&gt;</code></td><td>Table</td><td>A header cell in a table</td></tr><tr data-cat="Table"><td><code>&lt;thead&gt;</code></td><td>Table</td><td>Groups the header rows of a table</td></tr><tr data-cat="Text content"><td><code>&lt;time&gt;</code></td><td>Text content</td><td>A specific period in time, machine-readable via datetime</td></tr><tr data-cat="Metadata"><td><code>&lt;title&gt;</code></td><td>Metadata</td><td>The document's title, shown in the browser tab</td></tr><tr data-cat="Table"><td><code>&lt;tr&gt;</code></td><td>Table</td><td>A row of cells in a table</td></tr><tr data-cat="Media"><td><code>&lt;track&gt;</code></td><td>Media</td><td>Text tracks (captions/subtitles) for audio/video</td></tr><tr data-cat="Text content"><td><code>&lt;u&gt;</code></td><td>Text content</td><td>An unarticulated, non-textual annotation (e.g. misspelling)</td></tr><tr data-cat="Text content"><td><code>&lt;ul&gt;</code></td><td>Text content</td><td>An unordered (bulleted) list</td></tr><tr data-cat="Text content"><td><code>&lt;var&gt;</code></td><td>Text content</td><td>A variable in a mathematical expression or code</td></tr><tr data-cat="Media"><td><code>&lt;video&gt;</code></td><td>Media</td><td>Embeds video content with playback controls</td></tr><tr data-cat="Text content"><td><code>&lt;wbr&gt;</code></td><td>Text content</td><td>A suggested line-break opportunity inside long text</td></tr>
      </table>
`,
  playground: () => `
<p class="topic-sub">One big canvas. Nothing is graded, nothing is saved to a server — write anything.</p>
      <div class="playground" data-pg="free-playground">
        <div class="pg-toolbar"><span class="pg-label">playground.html</span>
          <button class="pg-btn" data-act="run">▶ Run</button>
          <button class="pg-btn" data-act="format">✎ Format</button>
          <button class="pg-btn" data-act="reset">⟲ Reset</button>
          <button class="pg-btn" data-act="copy">⧉ Copy</button>
          <button class="pg-btn" data-act="download">⬇ Download</button>
          <button class="pg-btn" data-act="fullscreen">⛶ Fullscreen</button>
        </div>
        <div class="pg-body" style="height:520px;">
          <div class="pg-editor-wrap"><div class="line-numbers"></div><textarea class="pg-code" spellcheck="false">&lt;!-- Your canvas. Build one of the assignments, or anything you like. --&gt;
&lt;style&gt;
  body { font-family: sans-serif; padding: 10px; }
&lt;/style&gt;

&lt;h1&gt;Hello, playground!&lt;/h1&gt;
&lt;p&gt;Start typing...&lt;/p&gt;</textarea></div>
          <div class="pg-preview-wrap"><span class="pg-preview-label">Preview</span><iframe class="pg-frame" sandbox="allow-scripts allow-forms allow-popups"></iframe></div>
        </div>
      </div>
    </section>

    <!--SECTIONS-->
`,
};
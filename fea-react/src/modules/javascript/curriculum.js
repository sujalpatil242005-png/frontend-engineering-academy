/* ============================================================
   JavaScript module — curriculum metadata.
   Same {group, items} shape as html/curriculum.js and
   css/curriculum.js. Lesson bodies live in renderers.js.
   ============================================================ */

export const JAVASCRIPT_CURRICULUM = [
  { group: 'Getting Started', items: [
    { id: 'introduction', label: 'Introduction' },
    { id: 'how-js-works', label: 'How JavaScript Works' },
  ]},
  { group: 'Core Concepts', items: [
    { id: 'variables', label: 'Variables' },
    { id: 'data-types', label: 'Data Types' },
    { id: 'operators', label: 'Operators' },
    { id: 'type-coercion', label: 'Type Coercion' },
  ]},
  { group: 'Control Flow', items: [
    { id: 'conditionals', label: 'Conditionals' },
    { id: 'loops', label: 'Loops' },
  ]},
  { group: 'Functions', items: [
    { id: 'functions', label: 'Functions' },
    { id: 'scope', label: 'Scope' },
    { id: 'closures', label: 'Closures' },
    { id: 'this-keyword', label: 'The "this" Keyword' },
  ]},
  { group: 'Objects & Arrays', items: [
    { id: 'objects', label: 'Objects' },
    { id: 'arrays', label: 'Arrays' },
    { id: 'array-methods', label: 'Array Methods (Lab)' },
    { id: 'destructuring', label: 'Destructuring' },
  ]},
  { group: 'Modern JavaScript (ES6+)', items: [
    { id: 'arrow-functions', label: 'Arrow Functions' },
    { id: 'template-literals', label: 'Template Literals' },
    { id: 'spread-rest', label: 'Spread & Rest' },
    { id: 'modules', label: 'Modules (import/export)' },
  ]},
  { group: 'Asynchronous JavaScript', items: [
    { id: 'callbacks', label: 'Callbacks' },
    { id: 'promises', label: 'Promises' },
    { id: 'async-await', label: 'Async / Await' },
  ]},
  { group: 'The DOM', items: [
    { id: 'dom-basics', label: 'DOM Basics (Lab)' },
    { id: 'events', label: 'Events' },
  ]},
  { group: 'Practice', items: [
    { id: 'interview-questions', label: 'Interview Questions' },
    { id: 'cheatsheet', label: 'Cheatsheet' },
  ]},
  { group: 'Sandbox', items: [
    { id: 'playground', label: 'Free Playground' },
  ]},
];
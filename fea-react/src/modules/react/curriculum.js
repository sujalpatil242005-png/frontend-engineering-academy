/* ============================================================
   React module — curriculum metadata.
   Same {group, items} shape as html/curriculum.js, css/curriculum.js,
   and javascript/curriculum.js. Lesson bodies live in renderers.js.
   ============================================================ */

export const REACT_CURRICULUM = [
  { group: 'Getting Started', items: [
    { id: 'introduction', label: 'Introduction' },
    { id: 'jsx', label: 'JSX' },
  ]},
  { group: 'Core Concepts', items: [
    { id: 'components', label: 'Components' },
    { id: 'props', label: 'Props' },
    { id: 'state', label: 'State' },
    { id: 'events', label: 'Handling Events' },
  ]},
  { group: 'Hooks', items: [
    { id: 'use-state', label: 'useState' },
    { id: 'use-effect', label: 'useEffect' },
    { id: 'use-ref', label: 'useRef' },
    { id: 'custom-hooks', label: 'Custom Hooks' },
  ]},
  { group: 'Rendering Lists & Conditionals', items: [
    { id: 'lists-keys', label: 'Lists & Keys (Lab)' },
    { id: 'conditional-rendering', label: 'Conditional Rendering' },
  ]},
  { group: 'Forms', items: [
    { id: 'forms', label: 'Forms (Lab)' },
  ]},
  { group: 'Component Patterns', items: [
    { id: 'lifting-state-up', label: 'Lifting State Up' },
    { id: 'composition', label: 'Composition & children' },
    { id: 'context', label: 'Context' },
  ]},
  { group: 'Practice', items: [
    { id: 'interview-questions', label: 'Interview Questions' },
    { id: 'cheatsheet', label: 'Cheatsheet' },
  ]},
  { group: 'Sandbox', items: [
    { id: 'playground', label: 'Free Playground' },
  ]},
];
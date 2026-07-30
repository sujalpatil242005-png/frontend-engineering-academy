/* ============================================================
   CSS module — curriculum metadata ported from CSS Academy.
   Lesson bodies (explanations, examples, quizzes) stay in
   CSS Academy's existing renderer functions; they move into
   this module's renderers.js in Phase 5. This file only
   carries the structure the sidebar/dashboard/search need now.
   ============================================================ */

export const CSS_CURRICULUM = [
  { group: 'Getting Started', items: [
    { id: 'introduction', label: 'Introduction' },
    { id: 'how-css-works', label: 'How CSS Works' },
  ]},
  { group: 'Core Concepts', items: [
    { id: 'selectors', label: 'Selectors' },
    { id: 'specificity', label: 'Specificity' },
    { id: 'cascade', label: 'Cascade' },
    { id: 'inheritance', label: 'Inheritance' },
    { id: 'units', label: 'Units' },
    { id: 'colors', label: 'Colors' },
  ]},
  { group: 'Visual Styling', items: [
    { id: 'backgrounds', label: 'Backgrounds' },
    { id: 'borders', label: 'Borders' },
    { id: 'outline', label: 'Outline' },
    { id: 'typography', label: 'Typography' },
    { id: 'text', label: 'Text' },
    { id: 'shadows', label: 'Shadows' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'filters', label: 'Filters' },
    { id: 'backdrop-filter', label: 'Backdrop Filter' },
  ]},
  { group: 'Box Model & Layout', items: [
    { id: 'box-model', label: 'Box Model (Lab)' },
    { id: 'display', label: 'Display' },
    { id: 'position', label: 'Position' },
    { id: 'overflow', label: 'Overflow' },
    { id: 'float', label: 'Float' },
    { id: 'clear', label: 'Clear' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'spacing', label: 'Spacing' },
  ]},
  { group: 'Flexbox & Grid', items: [
    { id: 'flexbox', label: 'Flexbox (Lab)' },
    { id: 'grid', label: 'Grid (Lab)' },
    { id: 'alignment', label: 'Alignment' },
  ]},
  { group: 'Motion', items: [
    { id: 'transforms', label: 'Transforms' },
    { id: 'transitions', label: 'Transitions' },
    { id: 'animations', label: 'Animations' },
  ]},
  { group: 'Selectors Deep Dive', items: [
    { id: 'pseudo-classes', label: 'Pseudo Classes' },
    { id: 'pseudo-elements', label: 'Pseudo Elements' },
  ]},
  { group: 'Modern CSS', items: [
    { id: 'variables', label: 'Variables' },
    { id: 'functions', label: 'Functions' },
    { id: 'calc', label: 'calc()' },
    { id: 'clamp', label: 'clamp()' },
    { id: 'minmax-fn', label: 'min() / max()' },
    { id: 'aspect-ratio', label: 'aspect-ratio' },
    { id: 'object-fit', label: 'Object Fit' },
    { id: 'nesting', label: 'Nesting' },
    { id: 'is-where-has', label: ':is() :where() :has()' },
    { id: 'logical-props', label: 'Logical Properties' },
    { id: 'scroll-snap', label: 'Scroll Snap' },
    { id: 'container-queries', label: 'Container Queries' },
    { id: 'color-mix', label: 'Color Mix' },
  ]},
  { group: 'Responsive Design', items: [
    { id: 'media-queries', label: 'Media Queries' },
    { id: 'responsive-images', label: 'Responsive Images' },
    { id: 'mobile-first', label: 'Mobile First vs Desktop First' },
  ]},
  { group: 'Accessibility & Performance', items: [
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'performance', label: 'Performance' },
  ]},
  { group: 'Architecture', items: [
    { id: 'css-architecture', label: 'CSS Architecture' },
    { id: 'bem', label: 'BEM' },
    { id: 'utility-classes', label: 'Utility Classes' },
    { id: 'tailwind-concepts', label: 'Tailwind Concepts' },
    { id: 'print-css', label: 'Print CSS' },
  ]},
  { group: 'Practice', items: [
    { id: 'interview-questions', label: 'Interview Questions' },
    { id: 'mini-projects', label: 'Mini Projects' },
    { id: 'cheatsheet', label: 'Cheatsheet' },
    { id: 'property-reference', label: 'Property Reference' },
  ]},
  { group: 'Sandbox', items: [
    { id: 'playground', label: 'Free Playground' },
  ]},
];

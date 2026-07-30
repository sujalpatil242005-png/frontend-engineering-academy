const PROJECTS = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Site',
    difficulty: 'Beginner',
    stack: ['HTML', 'CSS'],
    description: 'A single-page site with an about section, a project grid, and a contact form. Focus on semantic HTML and a responsive Flexbox/Grid layout.',
  },
  {
    id: 'recipe-card-gallery',
    title: 'Recipe Card Gallery',
    difficulty: 'Beginner',
    stack: ['HTML', 'CSS'],
    description: 'A grid of recipe cards with images, titles, and tags. Good practice for the CSS Grid and box-model lessons.',
  },
  {
    id: 'todo-app',
    title: 'To-Do List App',
    difficulty: 'Intermediate',
    stack: ['JavaScript', 'DOM'],
    description: 'Add, complete, delete, and filter tasks, persisting them to localStorage. Covers events, array methods, and DOM manipulation end to end.',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    difficulty: 'Intermediate',
    stack: ['JavaScript', 'Fetch API'],
    description: 'Search a city, fetch live weather data, and render it. Good practice for async/await, error handling, and rendering dynamic data.',
  },
  {
    id: 'react-kanban',
    title: 'Kanban Board',
    difficulty: 'Advanced',
    stack: ['React', 'Hooks'],
    description: 'Draggable cards across columns (To Do / Doing / Done), state lifted to a shared parent, persisted to localStorage. Exercises useState, lifting state up, and lists & keys.',
  },
  {
    id: 'react-quiz-app',
    title: 'Quiz App with Score Tracking',
    difficulty: 'Advanced',
    stack: ['React', 'Context'],
    description: 'Multi-question quiz with a timer, score tracking across a session via Context, and a results screen. Exercises useEffect, useContext, and conditional rendering.',
  },
];

function ProjectCard({ project }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="tag-row" style={{ marginBottom: 8 }}>
        <span className="badge def">{project.difficulty}</span>
        {project.stack.map((s) => <span key={s} className="tag teal">{s}</span>)}
      </div>
      <h3 style={{ marginTop: 0 }}>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <h2>Projects</h2>
      <p className="lede">Build ideas to apply what you're learning, ordered roughly by how far into the curriculum they fit.</p>
      {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
    </>
  );
}

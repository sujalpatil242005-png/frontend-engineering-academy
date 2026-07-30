import { useState } from 'react';

const CHALLENGES = [
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Beginner',
    prompt: 'Write a function reverseString(str) that returns the string reversed, without using .reverse().',
    starter: `function reverseString(str) {
  // your code here
}`,
    solution: `function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}`,
  },
  {
    id: 'find-duplicates',
    title: 'Find Duplicates in an Array',
    difficulty: 'Beginner',
    prompt: 'Write findDuplicates(arr) that returns an array of values that appear more than once.',
    starter: `function findDuplicates(arr) {
  // your code here
}`,
    solution: `function findDuplicates(arr) {
  const seen = new Set();
  const dupes = new Set();
  for (const item of arr) {
    if (seen.has(item)) dupes.add(item);
    seen.add(item);
  }
  return [...dupes];
}`,
  },
  {
    id: 'flatten-array',
    title: 'Flatten a Nested Array',
    difficulty: 'Intermediate',
    prompt: 'Write flatten(arr) that flattens an arbitrarily nested array into a single-level array, without using Array.prototype.flat().',
    starter: `function flatten(arr) {
  // your code here
}`,
    solution: `function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}`,
  },
  {
    id: 'debounce',
    title: 'Implement debounce()',
    difficulty: 'Intermediate',
    prompt: 'Write debounce(fn, delay) that returns a wrapped version of fn which only runs after delay ms have passed with no new calls — a classic frontend interview question.',
    starter: `function debounce(fn, delay) {
  // your code here
}`,
    solution: `function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
  },
  {
    id: 'deep-clone',
    title: 'Deep Clone an Object',
    difficulty: 'Advanced',
    prompt: 'Write deepClone(obj) that returns a deep copy of a nested object/array structure, without using JSON.parse(JSON.stringify(obj)).',
    starter: `function deepClone(obj) {
  // your code here
}`,
    solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const result = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) result[key] = deepClone(obj[key]);
  }
  return result;
}`,
  },
  {
    id: 'event-emitter',
    title: 'Build a Mini Event Emitter',
    difficulty: 'Advanced',
    prompt: 'Implement a class EventEmitter with on(event, handler), off(event, handler), and emit(event, ...args) methods.',
    starter: `class EventEmitter {
  // your code here
}`,
    solution: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(event, handler) {
    (this.listeners[event] ||= []).push(handler);
  }
  off(event, handler) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(h => h !== handler);
  }
  emit(event, ...args) {
    (this.listeners[event] || []).forEach(h => h(...args));
  }
}`,
  },
];

function ChallengeCard({ challenge }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="tag-row" style={{ marginBottom: 8 }}>
        <span className={`badge def`}>{challenge.difficulty}</span>
      </div>
      <h3 style={{ marginTop: 0 }}>{challenge.title}</h3>
      <p>{challenge.prompt}</p>
      <div className="code-out">{challenge.starter}</div>
      <button className="btn" style={{ marginTop: 10 }} onClick={() => setShowSolution((v) => !v)}>
        {showSolution ? 'Hide solution' : 'Show solution'}
      </button>
      {showSolution && (
        <div className="code-out" style={{ marginTop: 10 }}>{challenge.solution}</div>
      )}
    </div>
  );
}

export default function Challenges() {
  return (
    <>
      <h2>Challenges</h2>
      <p className="lede">Small, focused coding problems — the kind that show up in real interviews. Try each one before revealing the solution.</p>
      {CHALLENGES.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
    </>
  );
}

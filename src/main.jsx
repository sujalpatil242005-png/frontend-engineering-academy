import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './modules/react/playground.js'; // side effect: registers window.__feaRenderLiveJsx

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/dashboard.css';
import './styles/lesson-chrome.css';
import './styles/lesson-content.css';
import './styles/css-visualizers.css';
import './styles/playground-unified.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

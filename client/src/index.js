import React from 'react';
import { AppProvider } from './Store/AppContext';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>

    </Router>

  </React.StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
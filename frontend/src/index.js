import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './locales/index';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// eslint-disable-next-line functional/no-expression-statements
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

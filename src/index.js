import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./Config Files/i18n"
import { BrowserRouter } from 'react-router-dom';
import './Config Files/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

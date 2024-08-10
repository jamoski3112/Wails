import React from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
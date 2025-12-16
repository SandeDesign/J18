import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './App.main.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);

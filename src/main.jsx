import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';
import './index.css';

// Set VITE_HASH_ROUTER=true when hosting somewhere without SPA rewrites.
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ShopProvider>
        <App />
      </ShopProvider>
    </Router>
  </StrictMode>
);

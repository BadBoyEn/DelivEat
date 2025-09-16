import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import DevErrorOverlay from './utils/DevErrorOverlay.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <DevErrorOverlay />
    <App />
  </BrowserRouter>
);

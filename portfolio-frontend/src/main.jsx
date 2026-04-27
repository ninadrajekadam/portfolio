import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import "./assets/scss/main.scss";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
) 
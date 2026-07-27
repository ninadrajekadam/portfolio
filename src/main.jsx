import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import "./assets/scss/main.scss";
import App from './App.jsx';
import { LoaderProvider } from "./context/LoaderProvider";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </BrowserRouter>
)
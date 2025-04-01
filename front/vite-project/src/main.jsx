import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { UsersProvider } from "./Context/UsersContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UsersProvider>
    
  </StrictMode>
)


















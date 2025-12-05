// main.jsx (CORRECTED)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// REMOVE: import { BrowserRouter } from "react-router-dom"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Added StrictMode for best practice */}
    {/* REMOVED: <BrowserRouter> */}
      <App />
    {/* REMOVED: </BrowserRouter> */}
  </React.StrictMode>
)
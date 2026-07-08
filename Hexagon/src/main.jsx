import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminPages from './pages/AdminPages.jsx'
import Editor from './pages/Editor.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin"          element={<AdminPages />} />
        <Route path="/editor/:pageKey/:lang" element={<Editor />} />
        <Route path="/*"              element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
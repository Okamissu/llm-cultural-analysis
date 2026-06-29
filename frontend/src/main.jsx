import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './i18n'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '14px 18px',
            fontSize: '14px',
            background: '#ffffff',
            color: '#0f172a',
            boxShadow: '0 10px 30px rgba(15,23,42,.12)',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)

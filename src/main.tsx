import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalProvider } from './app/GlobalProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
)

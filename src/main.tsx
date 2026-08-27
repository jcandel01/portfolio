import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fallback for non-Apple platforms; SF Pro resolves natively on macOS/iOS.
import '@fontsource-variable/inter'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

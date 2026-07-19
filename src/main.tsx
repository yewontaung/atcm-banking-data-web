import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './_providers/themes.provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
        <BrowserRouter>
          <QueryClientProvider client={client}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

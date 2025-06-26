import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createAppTheme } from './theme'

const savedTheme = localStorage.getItem('theme-mode') as 'light' | 'dark' | null
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialMode = savedTheme || (prefersDark ? 'dark' : 'light')

const theme = createAppTheme(initialMode)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
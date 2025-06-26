import { createTheme } from '@mui/material/styles'

export const createAppTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#6750A4',
    },
    secondary: {
      main: '#625B71',
    },
    background: {
      default: mode === 'light' ? '#FFFBFE' : '#1C1B1F',
      paper: mode === 'light' ? '#FFFBFE' : '#2B2930',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
})
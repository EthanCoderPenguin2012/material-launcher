import { createTheme } from '@mui/material/styles'

const themeColors = {
  purple: { main: '#6750A4', light: '#9A82DB', dark: '#4F378B' },
  blue: { main: '#1976D2', light: '#64B5F6', dark: '#1565C0' },
  green: { main: '#388E3C', light: '#81C784', dark: '#2E7D32' },
  orange: { main: '#F57C00', light: '#FFB74D', dark: '#EF6C00' },
  red: { main: '#D32F2F', light: '#E57373', dark: '#C62828' },
  teal: { main: '#00796B', light: '#4DB6AC', dark: '#00695C' },
}

export const createAppTheme = (mode: 'light' | 'dark', colorScheme: keyof typeof themeColors = 'purple') => createTheme({
  palette: {
    mode,
    primary: {
      main: themeColors[colorScheme].main,
      light: themeColors[colorScheme].light,
      dark: themeColors[colorScheme].dark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      light: '#8B83A0',
      dark: '#4A4458',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: mode === 'light' ? '#FEFBFF' : '#1C1B1F',
      paper: mode === 'light' ? '#FFFFFF' : '#2B2930',
    },
    text: {
      primary: mode === 'light' ? '#1C1B1F' : '#E6E1E5',
      secondary: mode === 'light' ? '#49454F' : '#CAC4D0',
    },
    divider: mode === 'light' ? '#E7E0EC' : '#49454F',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: mode === 'light' 
            ? '0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)'
            : '0 2px 8px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)',
          border: mode === 'light' ? '1px solid #F4F1F4' : '1px solid #49454F',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 4px 16px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)'
              : '0 4px 16px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 1px 4px rgba(0,0,0,0.06)'
            : '0 1px 4px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          borderRight: mode === 'light' ? '1px solid #E7E0EC' : '1px solid #49454F',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: mode === 'light' ? '1px solid #E7E0EC' : '1px solid #49454F',
        },
      },
    },
  },
})
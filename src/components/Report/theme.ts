// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Blue
    },
    secondary: {
      main: '#dc004e',   // Pink
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '8px 0',
          '&:before': {
            display: 'none', // Remove the default divider
          },
        },
      },
    },
  },
});
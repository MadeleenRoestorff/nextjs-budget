import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#424242',
      default: '#303030',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      textAlign: 'center',
    },
    h2: {
      textAlign: 'center',
    },
    subtitle2: {
      fontSize: '0.7rem',
    },
    overline: {
      fontSize: '1rem',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;

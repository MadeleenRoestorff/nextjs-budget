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
      paddingBottom: '16px',
    },
    h2: {
      //   textAlign: 'center',
      paddingBottom: '16px',
    },
    subtitle2: {
      fontSize: '0.7rem',
    },
    overline: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '56px',
          maxHeight: '56px',
        },
        startIcon: {
          margin: '0px',
        },
      },
      variants: [
        {
          props: {
            variant: 'small',
          },
          style: {
            minHeight: 'unset',
            maxHeight: 'unset',
          },
        },
      ],
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          minHeight: '55px',
        },
        action: {
          paddingTop: 0,
          alignItems: 'center',
          marginBottom: 'auto',
          marginTop: 'auto',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;

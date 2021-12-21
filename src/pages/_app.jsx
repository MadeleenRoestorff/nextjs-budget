// import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import GlobalStyle from '../components/general/GlobalStyle';

// const theme = {
//   colors: {
//     primary: '#0070f3',
//   },
// };
const theme = createTheme({
  palette: {
    type: 'dark',
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: 'rgb(255, 255, 255)',
      dark: 'rgb(178, 178, 178)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

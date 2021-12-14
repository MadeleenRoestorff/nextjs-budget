import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: #0070f3;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}
h1, h2 {
  a {
    color: #0070f3;
    text-decoration: none;
  }
  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
  margin: 0;
  line-height: 1.15;
  text-align: center;
}
h1 {
  font-size: 3.5rem;
}
h2 {
  font-size: 2.5rem;
}
button, .button {
  text-align: center;
  background-color: white;
  border: 1px solid black;
  :hover {
    background-color: lightgrey;
  }
  :active {
    background-color: grey;
  }
}

`;

export default GlobalStyle;

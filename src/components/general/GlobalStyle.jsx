import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  background-color: #232635;
  font-family:  -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
  line-height: 1.7rem;
  font-family:   -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color:white;
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
  font-size: 2.2rem;
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

.MuiTextField-root {
    & label.Mui-focused{
        color: white;
    }

  & .MuiInput-underline:after {
    border-color: white;
  }

  & .MuiInputBase-colorPrimary {
    color: white;
  }

  & label {
    color: white;
  }

  & .MuiOutlinedInput-root {
    & fieldset{
        border-color: white;
    }

    &:hover fieldset {
        border-color: white;
    }

    &.Mui-focused fieldset {
      border-color: white;
    }
  }
  & input:-webkit-autofill {
    -webkit-text-fill-color: rgb(255, 255, 255);
    caret-color: rgb(255, 255, 255);
    box-shadow: #232635 0px 0px 0px 100px inset;
  }

}

`;

export default GlobalStyle;

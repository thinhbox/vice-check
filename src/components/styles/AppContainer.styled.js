import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledAppContainer = styled(Container)`
  :root {
    --medium: 500;
    --bg-blue: #1b262c;
    --rmit-red: hsla(350, 100%, 45%, 1);
    --text-white: hsla(0, 0%, 100%, 1);
    --header-blue: rgba(51, 66, 87, 1);
  }

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 100vw;
  min-height: 100vh;

  background-color: black;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  label,
  footer,
  header,
  small {
    color: white;
  }

  body {
    color: white;
    background-color: black;
  }

  a {
    text-decoration: none;
  }
`;

export default StyledAppContainer;

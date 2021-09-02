import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DefaultNavBar() {
  return (
    <Navbar expand='md' variant='dark'>
      <Navbar.Brand href='/'>Vibe Check</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/'>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to='/signup'>
          Sign Up
        </Nav.Link>
        <Nav.Link as={Link} to='/login'>
          Login
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

function GeneralNavBar(props) {
  let navBar;
  if (props.page === 'default') {
    navBar = <DefaultNavBar />;
  }
  return navBar;
}

export default GeneralNavBar;

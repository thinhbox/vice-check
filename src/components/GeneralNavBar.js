import { Navbar, Nav, Button } from 'react-bootstrap';
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

function ProfileNavBar(props) {
  let user = props.user;
  return (
    <Navbar expand='md' variant='dark'>
      <Navbar.Brand href='/'>Vibe Check</Navbar.Brand>
      Hello, {user.firstName}
      <Nav>
        <Nav.Link as={Link} to='/profile'>
          My Profile
        </Nav.Link>
        <Nav.Link as={Link} to='/signin' onClick={props.onLogout}>
          Sign Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

function GeneralNavBar(props) {
  let navBar;
  if (props.user) {
    navBar = <ProfileNavBar user={props.user} onLogout={props.onLogout} />;
  } else {
    navBar = <DefaultNavBar />;
  }
  return navBar;
}

export default GeneralNavBar;

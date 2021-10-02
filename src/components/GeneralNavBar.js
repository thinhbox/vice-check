import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DefaultNavBar() {
  return (
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
  );
}

function ProfileNavBar() {
  return (
    <>
      <Nav>
        <Nav.Link as={Link} to='/profile'>
          My Profile
        </Nav.Link>
        <Nav.Link as={Link} to='/blog'>
          My Blog
        </Nav.Link>
        <Nav.Link onClick={null}>Sign Out</Nav.Link>
      </Nav>
    </>
  );
}

function GeneralNavBar() {
  const token = localStorage.getItem('userToken');
  const user = JSON.parse(localStorage.getItem(token));
  let navBar;
  if (user) {
    navBar = <ProfileNavBar user={user} />;
  } else {
    navBar = <DefaultNavBar />;
  }
  return (
    <Navbar expand='md' variant='dark'>
      <Navbar.Brand href='/'>Vibe Check</Navbar.Brand>
      {navBar}
    </Navbar>
  );
}

export default GeneralNavBar;

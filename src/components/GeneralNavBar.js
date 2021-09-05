import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

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

function ProfileNavBar(props) {
  return (
    <Fragment>
      <Nav>
        <Nav.Link as={Link} to='/profile'>
          My Profile
        </Nav.Link>
        <Nav.Link as={Link} to='/blog'>
          My Blog
        </Nav.Link>
        <Nav.Link onClick={props.onLogout}>Sign Out</Nav.Link>
      </Nav>
    </Fragment>
  );
}

function GeneralNavBar(props) {
  const token = localStorage.getItem('userToken');
  const user = JSON.parse(localStorage.getItem(token));
  const history = useHistory();
  function handleLogout() {
    localStorage.removeItem('userToken');
    history.push('/');
  }
  let navBar;
  if (user) {
    navBar = <ProfileNavBar user={user} onLogout={handleLogout} />;
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

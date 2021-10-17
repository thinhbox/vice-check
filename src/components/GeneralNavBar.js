/* eslint-disable react/prop-types */
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle
import { UserContext } from 'App';

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

function ProfileNavBar({ user, onSignOut }) {
  return (
    <Nav>
      <Nav.Link as={Link} to={`/profile/${user.email}`}>
        My Profile
      </Nav.Link>
      <Nav.Link as={Link} to={`/blog/${user.email}`}>
        My Blog
      </Nav.Link>
      <NavDropdown title={user.nickName} menuVariant='dark' align='end'>
        <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

function GeneralNavBar() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const onSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    history.replace('/');
  };

  let navBar = <DefaultNavBar />;
  if (user) {
    navBar = <ProfileNavBar user={user} onSignOut={onSignOut} />;
  }

  return (
    <StyledNavBar expand='md' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
        Vibe Check
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>{navBar}</Navbar.Collapse>
    </StyledNavBar>
  );
}

const StyledNavBar = styled(Navbar)`
  .nav-link {
    /* color: red !important; */
  }

  .navbar-collapse {
    justify-content: end;
  }

  .nav-link:focus,
  .nav-link:hover {
    color: white !important;
    text-decoration: overline !important;
  }

  .dropdown-menu {
    /* color: white; */
    background-color: black;
    border: 1px solid white;
    border-radius: 0;
  }

  .dropdown-item {
    /* color: white; */
  }

  .dropdown-menu-dark .dropdown-item:focus,
  .dropdown-menu-dark .dropdown-item:hover {
    color: #fff;
    background-color: rgb(255, 255, 255, 0.1);
    font-weight: bold;
  }
`;

export default GeneralNavBar;

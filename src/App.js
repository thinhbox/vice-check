import React, { useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import LandingPage from 'pages/welcome/LandingPage';
import Login from 'pages/login/Login';
import SignUp from 'pages/welcome/SignUpPage';
import Profile from 'pages/profile/Profile';
import GeneralNavBar from 'components/GeneralNavBar';

const date = new Date();
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];


function App() {
  const [userMap, setUserMap] = useState(
    new Map(JSON.parse(localStorage.getItem('userMap')))
  );
  const [currentUserToken, setToken] = useState(
    localStorage.getItem('currentUserToken')
  );
  const [user, setUser] = useState(userMap.get(currentUserToken));

  function reloadData() {
    setUserMap(new Map(JSON.parse(localStorage.getItem('userMap'))));
    setToken(localStorage.getItem('currentUserToken'));
    setUser(userMap.get(currentUserToken));
  }

  function handleSignup(user) {
    let result = false;
    if (userMap.get(user.email)) {
      alert('Existed user: ' + user.email);
    } else {
      user.joined = `${date.getUTCDate()}-${
        months[date.getUTCMonth()]
      }-${date.getUTCFullYear()} - UTC Time`;
      userMap.set(user.email, user);
      localStorage.setItem('userMap', JSON.stringify([...userMap]));
      result = true;
      reloadData();
    }

    return result;
  }

  function handleLogout() {
    localStorage.removeItem('currentUserToken');
    reloadData();
  }

  function handleLogin(token) {
    localStorage.setItem('currentUserToken', token);
    reloadData();
  }

  function handleProfileChange(user) {
    userMap.set(currentUserToken, user);
    localStorage.setItem('userMap', JSON.stringify([...userMap]));
    reloadData();
  }

  function isNotHave(token, action) {
    console.log('Log user info:');
    console.log(user);
    if (token) {
      return <Redirect to={'/profile/' + user.email} />;
    } else {
      return action;
    }
  }

  function UserProfile() {
    const { id } = useParams();
    return (
      <Profile
        userMap={userMap}
        userId={id}
        onProfileChange={handleProfileChange}
      />
    );
  }

  return (
    <Container className='App' fluid>
      <Router>
        <Row>
          <GeneralNavBar user={user} onLogout={handleLogout} />
        </Row>
        <Row>
          <Switch>
            <Route path='/profile/:id'>
              <UserProfile />
            </Route>
            <Route path='/profile'>
              {isNotHave(currentUserToken, <Redirect to='/login' />)}
            </Route>
            <Route path='/login'>
              {isNotHave(
                currentUserToken,
                <Login userMap={userMap} onLogin={handleLogin} />
              )}
            </Route>
            <Route path='/signup'>
              {isNotHave(
                currentUserToken,
                <SignUp userMap={userMap} onSignup={handleSignup} />
              )}
            </Route>
            <Route path='/'>
              {isNotHave(
                currentUserToken,
                <LandingPage content='welcome-message' />
              )}
            </Route>
          </Switch>
        </Row>
      </Router>
    </Container>
  );
}

export default App;

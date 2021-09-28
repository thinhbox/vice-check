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
import Blog from 'pages/blog/Blog';
import GeneralNavBar from 'components/GeneralNavBar';
import GeneralFooter from 'components/GeneralFooter';

function App() {
  function isNotLoggedIn(action) {
    let result;
    let token = localStorage.getItem('userToken');
    if (token) {
      result = <Redirect to={'/profile/' + token} />;
    } else {
      result = action;
    }
    return result;
  }

  function UserProfile() {
    const { id } = useParams();
    return <Profile userId={id} />;
  }

  const [userToken, setToken] = useState('');

  return (
    <Router forceRefresh={true}>
      <Container className='App' fluid>
        <Row>
          <GeneralNavBar />
        </Row>
        <Row>
          <Switch>
            <Route path='/blog'>
              <Blog />
            </Route>
            <Route path='/profile/:id'>
              <UserProfile />
            </Route>
            <Route path='/profile'>
              {isNotLoggedIn(<Redirect to='/login' />)}
            </Route>
            <Route path='/login'>{isNotLoggedIn(<Login />)}</Route>
            <Route path='/signup'>{isNotLoggedIn(<SignUp />)}</Route>
            <Route path='/'>
              {isNotLoggedIn(<LandingPage content='welcome-message' />)}
            </Route>
          </Switch>
        </Row>
        <GeneralFooter />
      </Container>
    </Router>
  );
}

export default App;

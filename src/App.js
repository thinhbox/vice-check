import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import LandingPage from 'pages/welcome/LandingPage';
import Login from 'pages/login/Login';
import SignUp from 'pages/welcome/SignUpPage';
import Profile from 'pages/profile/Profile';

function UserProfile() {
  const { id } = useParams();
  return <Profile userId={id} />;
}

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/profile/:id'>
            <UserProfile />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/'>
            <LandingPage content='welcome-message' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

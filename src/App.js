/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// *import './App.css';
import StyledAppContainer from 'components/styles/AppContainer.styled';
import LandingPage from 'components/welcome/LandingPage';
import Login from 'components/login/Login';
import SignUpPage from 'components/signup/SignUpPage';
import Profile from 'components/profile/Profile';
import Blog from 'components/blog/Blog';
// eslint-disable-next-line import/no-cycle
import Header from 'components/Header';
import Footer from 'components/Footer';
import { FetchUserProfileByToken } from 'services/user.service';

export const UserContext = React.createContext(null);

export function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function isLoggedIn(trueAction, falseAction) {
    return user ? trueAction : falseAction;
  }

  // Fetch user profile if the token exists
  function refreshUserState(state) {
    if (token && !user) {
      console.log('Found Token, Start fetching...');
      FetchUserProfileByToken(token)
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          console.error(err);
        });
    } else if (state || state === null) {
      setUser(state);
    }
  }

  function UserProfile() {
    const { id } = useParams();
    return <Profile userId={id} />;
  }

  function UserBlog() {
    const { id } = useParams();
    return <Blog userId={id} />;
  }

  // refreshUserState();

  useLayoutEffect(() => {
    refreshUserState();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUserState, token, setToken }}>
      <Router>
        <StyledAppContainer className='App' fluid>
          <Header />
          <Row>
            <Switch>
              <Route path='/blog/:id'>
                {isLoggedIn(<UserBlog />, <Redirect to='/login' />)}
              </Route>
              <Route path='/blog'>
                {isLoggedIn(
                  <Redirect to={`/blog/${user?.email}`} />,
                  <Redirect to='/login' />
                )}
                <Blog />
              </Route>
              <Route path='/profile/:id'>
                <UserProfile />
              </Route>
              <Route path='/profile'>
                {isLoggedIn(
                  <Redirect to={`/profile/${user?.email}`} />,
                  <Redirect to='/login' />
                )}
              </Route>
              <Route path='/login'>
                {isLoggedIn(
                  <Redirect to={`/profile/${user?.email}`} />,
                  <Login />
                )}
                {/* <Login /> */}
              </Route>
              <Route path='/signup'>
                {isLoggedIn(
                  <Redirect to={`/profile/${user?.email}`} />,
                  <SignUpPage />
                )}
              </Route>
              <Route path='/'>
                {isLoggedIn(
                  <Redirect to={`/profile/${user?.email}`} />,
                  <LandingPage />
                )}
              </Route>
            </Switch>
          </Row>
          <Footer />
        </StyledAppContainer>
      </Router>
    </UserContext.Provider>
  );
}

// export default App;

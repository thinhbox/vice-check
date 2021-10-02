// import { useState } from 'react';
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
import Header from 'components/Header';
import Footer from 'components/Footer';

function App() {
  function isNotLoggedIn(action) {
    let result;
    const token = localStorage.getItem('userToken');
    if (token) {
      result = <Redirect to={`/profile/${token}`} />;
    } else {
      result = action;
    }
    return result;
  }

  function UserProfile() {
    const { id } = useParams();
    return <Profile userId={id} />;
  }

  return (
    <Router forceRefresh={false}>
      <StyledAppContainer className='App' fluid>
        <Header />
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
            <Route path='/signup'>{isNotLoggedIn(<SignUpPage />)}</Route>
            <Route path='/'>
              {isNotLoggedIn(<LandingPage content='welcome-message' />)}
            </Route>
          </Switch>
        </Row>
        <Footer />
      </StyledAppContainer>
    </Router>
  );
}

export default App;

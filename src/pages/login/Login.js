import React from 'react';
import { Formik } from 'formik';
import BasicInputField from 'components/BasicInputField';
import GeneralFooter from 'components/GeneralFooter';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import GeneralNavBar from 'components/GeneralNavBar';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function Login(props) {
  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const username = rememberMe ? localStorage.getItem('username') : '';
  const schema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(8, `Must be 8-28 characters`)
      .max(28, `Must be 8-28 characters`)
      .required('Required'),
  });
  const history = useHistory();

  function identifyUser(email, password) {
    let userId = email.split('@')[0];
    let user = JSON.parse(localStorage.getItem(userId));
    console.log('Get User');
    console.log(user);
    if (user && user.password === password) {
      return true;
    }
    return false;
  }

  return (
    <Formik
      initialValues={{
        rememberMe: rememberMe,
        username: username,
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await sleep(500);

        if (identifyUser(values.username, values.password)) {
          localStorage.setItem('rememberMe', values.rememberMe);
          localStorage.setItem(
            'username',
            values.rememberMe ? values.username : ''
          );
          let userId = values.username.split('@')[0];
          localStorage.setItem('userToken', userId);
          // props.onLogin(true);
          history.push('/profile/' + userId);
        } else {
          alert('Login Failed!');
        }
      }}>
      {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <GeneralNavBar />
          </Row>
          <Container fluid className='vb-form'>
            <Col md={3} className='mx-auto mt-5'>
              <Row>
                <legend>
                  <h1>Login</h1>
                  <p>
                    Welcome back! 👋 <br />
                    How ya doing mate?
                  </p>
                </legend>
              </Row>
              <Row>
                <BasicInputField
                  label='Email'
                  name='username'
                  type='email'
                  placeholder='Eg: s1234567@student.rmit.edu.au'
                />
                <BasicInputField
                  label='Password'
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                />
              </Row>
              <Row>
                <Col>
                  <Link to='/reset-password'>Forgot password?</Link>
                </Col>
                <Col className='d-flex justify-content-end'>
                  <Form.Group controlId='rememberMe'>
                    <Form.Check
                      type='checkbox'
                      label='Remember Me'
                      checked={values.rememberMe}
                      onChange={(e) => {
                        setFieldValue('rememberMe', e.target.checked, false);
                      }}></Form.Check>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                className='full-width'
                variant='outline-light'
                size='lg'
                type='submit'
                disabled={isSubmitting}>
                {isSubmitting ? 'Loging In...' : 'Login'}
              </Button>
              <p className='mt-2'>
                Don't have an account?{' '}
                <Link to='/signup'>
                  <strong>Register here👈</strong>
                </Link>
              </p>
            </Col>
          </Container>
          <GeneralFooter />
        </Form>
      )}
    </Formik>
  );
}

export default Login;

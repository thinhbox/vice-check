import React from 'react';
import { Formik } from 'formik';
import BasicInputField from 'components/BasicInputField';
import GeneralNavBar from 'components/GeneralNavBar';
import GeneralFooter from 'components/GeneralFooter';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function identifyUser(email, password) {
  // fetch user database
  let userMap = new Map(JSON.parse(localStorage.getItem('userMap')));
  let userData = userMap.get(email);
  let result = false;
  if (userData && userData.password === password) {
    result = true;
  }
  console.log(
    `Identify result: 
    Username: ${userMap.get(email).email} 
    Password: ${userData.password}`
  );
  return result;
}

function Login(props) {
  const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
  const savedUsername = savedRememberMe ? localStorage.getItem('username') : '';
  const schema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(8, `Must be 8-28 characters`)
      .max(28, `Must be 8-28 characters`)
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        rememberMe: savedRememberMe,
        username: savedUsername,
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await sleep(1000);
        localStorage.setItem('rememberMe', values.rememberMe);
        localStorage.setItem(
          'username',
          values.rememberMe ? values.username : ''
        );
        if (identifyUser(values.username, values.password)) {
          alert('Login Success!');
        } else {
          alert('Login Failed!');
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container fluid className='vb-form'>
            <Row>
              <GeneralNavBar page='default' />
            </Row>
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
                      }}
                    ></Form.Check>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                className='full-width'
                variant='outline-light'
                size='lg'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loging In...' : 'Login'}
              </Button>
              <p className='mt-2'>
                Don't have an account?{' '}
                <Link to='/signup'>
                  <strong>Register here👈</strong>
                </Link>
              </p>
            </Col>
            <GeneralFooter />
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default Login;

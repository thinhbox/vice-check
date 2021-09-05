import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BasicInputField from 'components/BasicInputField';
import GeneralFooter from 'components/GeneralFooter';
import GeneralNavBar from 'components/GeneralNavBar';
import 'styles/SignUpPage.css';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function SuccessModal(props) {
  return (
    <Modal show={props.show} variant='dark'>
      <Modal.Header>
        <Modal.Title as='h4'>Signup Success!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Congratulation! Your Vibe Check account have been signed up
          successfully! An email have been sent to {props.email}. Please read it
          for instructions on how to activate your account. You can sign in at
          Vibe Check after activated your account. We will take you to Sign In
          page whenever you ready.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Link to='/'>
          <Button variant='outline-secondary'>Resend Email</Button>
        </Link>

        <Link to='/login'>
          <Button variant='outline-light'>I'm Ready</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

function SignUpPage(props) {
  const passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})');
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, `Must be 15 characters or less`)
      .required('Required'),
    lastName: Yup.string()
      .max(15, `Must be 15 characters or less`)
      .required('Required'),
    nickName: Yup.string()
      .max(15, `Must be 15 characters or less`)
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required')
      .test('existedEmail', 'Email is already used!', async (email) => {
        await sleep(50);
        if (email && localStorage.getItem(email.split('@')[0])) {
          return false;
        } else {
          return true;
        }
      }),
    password: Yup.string()
      .required('Required')
      .matches(
        passwordRegex,
        'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password not match')
      .required('Required'),
  });
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
  let showModal = false;

  function handleSignup(user) {
    user.id = user.email.split('@')[0];
    user.joined = `${date.getUTCDate()}-${
      months[date.getUTCMonth()]
    }-${date.getUTCFullYear()} - UTC Time`;
    if (localStorage.getItem(user.id)) {
      return false;
    } else {
      localStorage.setItem(user.id, JSON.stringify(user));
      return true;
    }
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        nickName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={async (user) => {
        // Extract student id
        await sleep(1000);

        showModal = handleSignup(user);
      }}>
      {({ handleSubmit, values, isSubmitting }) => (
        <Container fluid>
          <SuccessModal show={showModal} email={values.email} />
          <Row>
            <GeneralNavBar />
          </Row>
          <Form className='vb-form mb-5' noValidate onSubmit={handleSubmit}>
            <Row>
              <Col className='mx-auto mt-5' md={4}>
                <legend>
                  <h1>Register your Vibe Check account</h1>
                  <h5>
                    We need some basic informations to identify you when you
                    comeback.
                  </h5>
                </legend>
                <Row>
                  <BasicInputField
                    as={Col}
                    label='First Name'
                    name='firstName'
                    type='text'
                    placeholder='Eg: Kuva'
                  />
                  <BasicInputField
                    as={Col}
                    label='Last Name'
                    name='lastName'
                    type='text'
                    placeholder='Eg: Nguyen'
                  />
                </Row>
                <BasicInputField
                  label='Nick Name'
                  name='nickName'
                  type='text'
                  placeholder='colorful_Octopus'
                />
                <BasicInputField
                  label='Email'
                  name='email'
                  type='text'
                  placeholder='Eg: s1234567@student.rmit.edu.au'
                />
                <Row>
                  <BasicInputField
                    as={Col}
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                  />
                  <BasicInputField
                    as={Col}
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    placeholder='Re-enter Your Password'
                  />
                </Row>

                <h6 className='small-text mb-3'>
                  We dedicated this site for only RMIT’s students & alumni. Our
                  goal is to create a friendly and cool spaces for everyone so
                  we have our community guidelines. By registering, logining or
                  using this network, you are accepted our community guidelines.
                </h6>

                <Button
                  className='full-width'
                  variant='outline-light'
                  size='lg'
                  type='submit'
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </Button>
              </Col>
            </Row>
          </Form>
          <GeneralFooter />
        </Container>
      )}
    </Formik>
  );
}

export default SignUpPage;

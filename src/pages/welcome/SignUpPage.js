import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BasicInputField from 'components/BasicInputField';
import GeneralFooter from 'components/GeneralFooter';

import 'styles/SignUpPage.css';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function SuccessModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      variant='dark'
      bg='blue'
    >
      <Modal.Header>
        <Modal.Title as='h4'>Signup Success!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Congratulation! Your Vibe Check account have been signed up
          successfully! An email have been sent to your {props.email}. Please
          read it for instructions on how to activate your account. You can sign
          in at Vibe Check after activated your account. We will take you to
          Sign In page whenever you ready.
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
  const userMap = props.userMap;

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
        await sleep(500);
        if (userMap.get(email)) {
          return false;
        } else {
          return true;
        }
      }),
    password: Yup.string()
      .min(8, `Must be 8-28 characters`)
      .max(28, `Must be 8-28 characters`)
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password not match')
      .required('Required'),
  });
  let showModal = false;

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
      onSubmit={async (values) => {
        await sleep(1000);
        showModal = props.onSignup(values);
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
        isSubmitting,
      }) => (
        <Container fluid>
          <SuccessModal show={showModal} email={values.email} />
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
                  disabled={isSubmitting}
                >
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

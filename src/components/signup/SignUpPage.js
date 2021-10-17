import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Row, Col, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import FormInputField from 'components/BasicInputField';
import {
  StyledFormButton,
  StyledButton,
} from 'components/styles/Button.styled';
import { signupSchema } from 'components/validator/form.validator';
import { SignUpService } from 'services/user.service';
import { useState } from 'react';
import styled from 'styled-components';

function SignUpPage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = async (data) => {
    setSubmitting(true);
    console.log('Submit data: ', data);
    SignUpService(data).then((result) => {
      if (result) {
        setShowModal(true);
        setEmail(getValues('email'));
      } else {
        setSubmitting(false);
      }
    });
  };

  return (
    <Container fluid>
      <SuccessModal show={showModal} email={email} />
      <Form
        className='vb-form mb-5'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col className='mx-auto mt-5' md={4}>
            <legend>
              <h1>Register your Vibe Check account</h1>
              <h5>
                We need some basic information to identify you when you
                comeback.
              </h5>
            </legend>
            <Row>
              <FormInputField
                as={Col}
                label='First Name'
                id='firstName'
                name='firstName'
                placeholder='Eg: Kuva'
                register={register}
                errors={errors}
              />
              <FormInputField
                as={Col}
                label='Last Name'
                id='lastName'
                name='lastName'
                placeholder='Eg: Nguyen'
                register={register}
                errors={errors}
              />
            </Row>
            <FormInputField
              label='Nick Name'
              id='nickName'
              name='nickName'
              placeholder='colorful_Octopus'
              register={register}
              errors={errors}
            />
            <FormInputField
              label='Email'
              id='email'
              name='email'
              placeholder='Eg: s1234567@student.rmit.edu.au'
              register={register}
              errors={errors}
            />
            <Row>
              <FormInputField
                as={Col}
                label='Password'
                id='password'
                name='password'
                type='password'
                placeholder='Enter your password'
                register={register}
                errors={errors}
              />
              <FormInputField
                as={Col}
                label='Confirm Password'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Re-enter Your Password'
                register={register}
                errors={errors}
              />
            </Row>

            <h6 className='small-text mb-3'>
              We dedicated this site for only RMIT’s students & alumni. Our goal
              is to create a friendly and cool spaces for everyone so we have
              our community guidelines. By registering, logging or using this
              network, you are accepted our community guidelines.
            </h6>

            <StyledFormButton type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </StyledFormButton>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SignUpPage;

const SuccessModal = ({ show, email }) => (
  <StyledModal show={show} variant='dark' centered>
    <Modal.Header>
      <Modal.Title as='h4'>Signup Success!</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>
        Congratulation! Your Vibe Check account have been signed up
        successfully! An email with instructions on how to activate your account have
        been sent to:
      </p>
      <blockquote>
        <strong>{email}</strong>
      </blockquote>
    </Modal.Body>

    <Modal.Footer>
      <Link to='/'>
        <StyledButton variant='outline-secondary'>Resend Email</StyledButton>
      </Link>
      <Link to='/login'>
        <StyledButton variant='outline-light'>Take me to Login</StyledButton>
      </Link>
    </Modal.Footer>
  </StyledModal>
);

SuccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

const StyledModal = styled(Modal)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  label,
  strong {
    color: white;
  }

  blockquote {
    text-align: center;
    margin: 0 !important;
  }

  .modal-content {
    border-radius: 0;
  }

  .modal-header {
    background-color: black;
    border-radius: 0;
    border: 1px solid white;
  }

  .modal-body {
    background-color: black;
    border: 1px solid white;
    border-bottom: none;
  }

  .modal-footer {
    background-color: black;
    border-radius: 0;
    border: 1px solid white;
    border-top: 0px;
  }
`;

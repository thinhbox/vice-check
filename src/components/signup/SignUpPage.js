import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import FormInputField from 'components/BasicInputField';
import StyledFormButton from 'components/styles/Button.styled';
import { signupSchema } from 'components/validator/form.validator';
import { SignUpService } from 'services/user.service';

function SignUpPage() {
  const showModal = false;
  const isSubmitting = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    SignUpService(data);
  };

  return (
    <Container fluid>
      <SuccessModal show={showModal} email={showModal} />
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
                We need some basic informations to identify you when you
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
              our community guidelines. By registering, logining or using this
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
  <Modal show={show} variant='dark'>
    <Modal.Header>
      <Modal.Title as='h4'>Signup Success!</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>
        Congratulation! Your Vibe Check account have been signed up
        successfully! An email have been sent to {email}. Please read it for
        instructions on how to activate your account. You can sign in at Vibe
        Check after activated your account. We will take you to Sign In page
        whenever you ready.
      </p>
    </Modal.Body>

    <Modal.Footer>
      <Link to='/'>
        <Button variant='outline-secondary'>Resend Email</Button>
      </Link>

      <Link to='/login'>
        <Button variant='outline-light'>I`&apos;`m Ready</Button>
      </Link>
    </Modal.Footer>
  </Modal>
);

SuccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

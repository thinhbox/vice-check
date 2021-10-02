import FormInputField from 'components/BasicInputField';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { loginSchema } from 'components/validator/form.validator';
import StyledFormButton from 'components/styles/Button.styled';
import { LogInService } from 'services/user.service';

// * Add a constant to avoid typo and allow auto code completion
const key = {
  email: 'email',
  rememberMe: 'rememberMe',
  password: 'password',
};

function Login() {
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log('🚀 ~ file: Login.js ~ line 34 ~ onSubmit ~ data', data);
    setSubmitting(true);

    localStorage.setItem(key.rememberMe, getValues(key.rememberMe));
    // * Save email or not based on value of rememberMe
    getValues(key.rememberMe)
      ? localStorage.setItem(key.email, getValues(key.email))
      : localStorage.removeItem(key.email);

    LogInService(data).then(setSubmitting(false));
  };

  // * Set initial value for email field
  useEffect(() => {
    setValue(key.rememberMe, localStorage.getItem(key.rememberMe) === 'true');
    setValue(
      key.email,
      getValues(key.rememberMe) ? localStorage.getItem(key.email) : ''
    );
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
            <FormInputField
              label='Email'
              id={key.email}
              name={key.email}
              type='email'
              placeholder='Eg: s1234567@student.rmit.edu.au'
              register={register}
              errors={errors}
            />
            <FormInputField
              label='Password'
              id={key.password}
              name={key.password}
              type='password'
              placeholder='Enter your password'
              register={register}
              errors={errors}
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
                  {...register(key.rememberMe)}
                />
              </Form.Group>
            </Col>
          </Row>

          <StyledFormButton type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Loging In...' : 'Login'}
          </StyledFormButton>
          <p className='mt-2'>
            Don`&apos;`t have an account?{' '}
            <Link to='/signup'>
              <strong>Register here👈</strong>
            </Link>
          </p>
        </Col>
      </Container>
    </Form>
  );
}

export default Login;

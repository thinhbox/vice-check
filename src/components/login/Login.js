import FormInputField from 'components/BasicInputField';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import { loginSchema } from 'components/validator/form.validator';
import { StyledFormButton } from 'components/styles/Button.styled';
import { LogInService } from 'services/user.service';
import { UserContext } from 'App';

// * Add a constant to avoid typo and allow auto code completion
const keyword = {
  email: 'email',
  rememberMe: 'rememberMe',
  password: 'password',
};

function Login() {
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const { refreshUserState, setToken } = useContext(UserContext);
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

    localStorage.setItem(keyword.rememberMe, getValues(keyword.rememberMe));
    // * Save email or not based on value of rememberMe
    getValues(keyword.rememberMe)
      ? localStorage.setItem(keyword.email, getValues(keyword.email))
      : localStorage.removeItem(keyword.email);

    LogInService(data).then((result) => {
      if (result) {
        refreshUserState(result.userRecord);
        setToken(result.userToken);
        localStorage.setItem('token', result.userToken);
        history.replace(`/profile/${getValues(keyword.email)}`);
      } else {
        setSubmitting(false);
      }
    });
  };

  // * Set initial value for email field
  useEffect(() => {
    setValue(
      keyword.rememberMe,
      localStorage.getItem(keyword.rememberMe) === 'true'
    );
    setValue(
      keyword.email,
      getValues(keyword.rememberMe) ? localStorage.getItem(keyword.email) : ''
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
              id={keyword.email}
              name={keyword.email}
              type='email'
              placeholder='Eg: s1234567@student.rmit.edu.au'
              register={register}
              errors={errors}
            />
            <FormInputField
              label='Password'
              id={keyword.password}
              name={keyword.password}
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
                  {...register(keyword.rememberMe)}
                />
              </Form.Group>
            </Col>
          </Row>

          <StyledFormButton type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Loging In...' : 'Login'}
          </StyledFormButton>
          <p className='mt-2'>
            Don&apos;t have an account?{' '}
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

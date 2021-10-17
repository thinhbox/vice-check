import { useState, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from 'components/validator/form.validator';

import { Container, Row, Col, Card, Form, Image, Modal } from 'react-bootstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import FormInputGroup from 'components/BasicInputGroup';
import UserAvatar from 'images/avatar_mock_up.png';
import {
  DeleteUserProfile,
  FetchUserProfileByEmail,
  UpdateUserProfile,
} from 'services/user.service';
import StyledFormModal from 'components/styles/Modal.styled';
import { StyledButton } from 'components/styles/Button.styled';
import { UserContext } from 'App';

const keyword = {
  firstName: 'firstName',
  lastName: 'lastName',
  nickName: 'nickName',
  email: 'email',
  password: 'password',
  token: 'token',
};

// eslint-disable-next-line react/prop-types
function Profile({ userId }) {
  const history = useHistory();
  const { user, refreshUserState, token, setToken } = useContext(UserContext);

  console.log('email+token: ', userId, token);
  // userProfile is different from user state in App.js which is the logged in user
  const [userProfile, setUserProfile] = useState();
  console.log('Validating Editable: ', userId, user);
  let allowEdit = userId === user?.email;
  const [showModal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('FORM - USER UPDATE: ', data);
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        nickName: data.nickName,
        password: data.password,
      };
      const updatedUser = await UpdateUserProfile(token, userId, userData);
      refreshUserState();
      setUserProfile(updatedUser);
    } catch (error) {
      console.error(error);
      // Reset form back to init values
      reset();
    }
  };

  const handleReset = () => {
    reset();
  };

  // TODO: Contact to DB, delete, return true, delete token, log out
  const handleDelete = async () => {
    // eslint-disable-next-line react/prop-types
    if (await DeleteUserProfile(token, userId)) {
      localStorage.removeItem('token');
      setUserProfile(null);
      setToken(null);
      refreshUserState(null);
      history.replace('/');
    }
  };

  /*
   * Known bug: Due to useLayoutEffect in higher comps(App) so the page will call
   * its useLayoutEffect twice
   */
  useLayoutEffect(() => {
    console.log('Profile-Trigger Effect');
    FetchUserProfileByEmail(userId, token)
      .then((data) => {
        setUserProfile(data);
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          nickName: data.nickName,
          email: data.email,
          password: '',
        });
      })
      .catch((err) => {
        // If user not found, etc. Go back to login page
        console.error(err);
        history.replace('/login');
      });
  }, []);

  // Update form default values when receive updated user record
  useLayoutEffect(() => {
    if (userProfile) {
      console.log('TRIGGER RESET: ', userProfile);
      reset({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        nickName: userProfile.nickName,
        email: userProfile.email,
        password: '',
      });
      // setUser(userProfile);
    }
  }, [userProfile]);

  useLayoutEffect(() => {
    allowEdit = userId === user?.email;
  }, [user]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <StyledFormModal show={showModal} variant='dark'>
        <Modal.Header>
          <Modal.Title as='h4'>Before Proceed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account? This action will{' '}
            <strong>
              completely remove your account record and can not be recover!
            </strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </StyledButton>

          <StyledButton variant='outline-danger' onClick={handleDelete}>
            Proceed to Removal
          </StyledButton>
        </Modal.Footer>
      </StyledFormModal>

      <Container fluid>
        <Row>
          <Col className=' mt-5 mx-auto' md={6}>
            <Card className='' bg='transparent' border='light'>
              <Card.Body className='mx-5'>
                <Row className=' mb-3'>
                  <Col>
                    <Card.Title as='h1'>Profile</Card.Title>
                    <Card.Text>
                      Joined: {userProfile ? userProfile.createdAt : '...'}
                    </Card.Text>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Image
                      className='user-avatar'
                      src={UserAvatar}
                      alt='User avatar'
                      rounded
                      hidden
                    />
                  </Col>
                </Row>
                <Col className='d-grid gap-3 mb-3'>
                  <Row className=''>
                    <FormInputGroup
                      as={Col}
                      id={keyword.firstName}
                      name={keyword.firstName}
                      type='text'
                      label='First Name'
                      defaultValue={getValues(keyword.firstName)}
                      editable={allowEdit.toString()}
                      register={register}
                      errors={errors}
                    />
                    <FormInputGroup
                      as={Col}
                      id={keyword.lastName}
                      name={keyword.lastName}
                      type='text'
                      label='Last Name'
                      defaultValue={getValues(keyword.lastName)}
                      editable={allowEdit.toString()}
                      register={register}
                      errors={errors}
                    />
                  </Row>
                  <FormInputGroup
                    id={keyword.nickName}
                    name={keyword.nickName}
                    type='text'
                    label='Nickname'
                    defaultValue={getValues(keyword.nickName)}
                    editable={allowEdit.toString()}
                    register={register}
                    errors={errors}
                  />
                  <FormInputGroup
                    id={keyword.email}
                    name={keyword.email}
                    type='email'
                    label='Email'
                    defaultValue={getValues(keyword.email)}
                    register={register}
                    errors={errors}
                  />
                  <FormInputGroup
                    id={keyword.password}
                    name={keyword.password}
                    type='password'
                    label='Password'
                    defaultValue={getValues(keyword.password)}
                    placeholder='*************'
                    editable={allowEdit.toString()}
                    hidden={!allowEdit}
                    register={register}
                    errors={errors}
                  />
                </Col>
                <Row>
                  <Col>
                    <StyledButton
                      className='w-auto'
                      variant='outline-light'
                      onClick={() => {
                        setModal(true);
                      }}
                      disabled={!allowEdit}
                      hidden={!allowEdit}
                    >
                      <Fa className='mr-2' icon={faUserSlash} />
                      Delete Profile
                    </StyledButton>
                  </Col>
                  <Col className='d-flex justify-content-end' md={7}>
                    <StyledButton
                      className='w-auto mx-2'
                      variant='outline-light'
                      onClick={handleReset}
                      disabled={!allowEdit}
                      hidden={!allowEdit}
                    >
                      <Fa className='mr-2' icon={faTimes} />
                      Cancel
                    </StyledButton>
                    <StyledButton
                      className='w-auto'
                      variant='outline-light'
                      type='submit'
                      disabled={!allowEdit}
                      hidden={!allowEdit}
                    >
                      <Fa className='mr-2' icon={faCheck} />
                      Save Changes
                    </StyledButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default Profile;

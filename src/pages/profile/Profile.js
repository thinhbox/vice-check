import React, { useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Image,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import BasicInputGroup from 'components/BasicInputGroup';
import UserAvatar from 'images/avatar_mock_up.png';
import GeneralNavBar from 'components/GeneralNavBar';

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
  password: Yup.string()
    .min(8, `Must be 8-28 characters`)
    .max(28, `Must be 8-28 characters`)
    .required('Required'),
});

function Profile(props) {
  const history = useHistory();
  const user = FetchUserData(props.userId);

  function FetchUserData(token) {
    let userData = JSON.parse(localStorage.getItem(token));
    console.log('Fetched data:');
    console.log(userData);
    return userData;
  }

  // If user not exist
  if (!user) {
    history.push('/');
  }

  let allowEdit = props.userId === localStorage.getItem('userToken');

  function handleDelete() {
    localStorage.removeItem(props.userId);
    localStorage.removeItem('userToken');
    history.push('/');
  }

  const [showModal, setModal] = useState(false);
  return (
    <Formik
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        email: user.email,
        joined: user.joined,
        password: user.password,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        Object.assign(user, values);
        localStorage.setItem(user.id, JSON.stringify(user));
      }}>
      {({ handleSubmit, values, handleReset }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Modal show={showModal} variant='dark'>
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
              <Button
                variant='light'
                onClick={() => {
                  setModal(false);
                }}>
                Cancel
              </Button>

              <Button variant='outline-danger' onClick={handleDelete}>
                Proceed to Removal
              </Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <GeneralNavBar />
          </Row>
          <Container fluid>
            <Row>
              <Col className=' mt-5 mx-auto' md={6}>
                <Card className='' bg='transparent' border='light'>
                  <Card.Body className='mx-5'>
                    <Row className=' mb-3'>
                      <Col>
                        <Card.Title as='h1'>Profile</Card.Title>
                        <Card.Text>Joined: {user.joined}</Card.Text>
                      </Col>
                      <Col className='d-flex justify-content-end'>
                        <Image
                          className='user-avatar'
                          src={UserAvatar}
                          alt='User avatar'
                          rounded
                        />
                      </Col>
                    </Row>
                    <Col className='d-grid gap-3 mb-3'>
                      <Row className=''>
                        <BasicInputGroup
                          as={Col}
                          name='firstName'
                          type='text'
                          label='First Name'
                          value={values.firstName}
                          editable={allowEdit.toString()}
                        />
                        <BasicInputGroup
                          as={Col}
                          name='lastName'
                          type='text'
                          label='Last Name'
                          value={values.lastName}
                          editable={allowEdit.toString()}
                        />
                      </Row>
                      <BasicInputGroup
                        name='nickName'
                        type='text'
                        label='Nickname'
                        value={values.nickName}
                        editable={allowEdit.toString()}
                      />
                      <BasicInputGroup
                        name='email'
                        type='email'
                        label='Email'
                        value={values.email}
                      />
                      <BasicInputGroup
                        name='password'
                        type='password'
                        label='Password'
                        value={values.password}
                        editable={allowEdit.toString()}
                        hidden={!allowEdit}
                      />
                    </Col>
                    <Row>
                      <Col>
                        <Button
                          className='w-auto'
                          variant='outline-light'
                          onClick={() => {
                            setModal(true);
                          }}
                          disabled={!allowEdit}
                          hidden={!allowEdit}>
                          <Fa className='mr-2' icon={faUserSlash} />
                          Delete Profile
                        </Button>
                      </Col>
                      <Col className='d-flex justify-content-end' md={7}>
                        <Button
                          className='w-auto mx-2'
                          variant='outline-light'
                          onClick={handleReset}
                          disabled={!allowEdit}
                          hidden={!allowEdit}>
                          <Fa className='mr-2' icon={faTimes} />
                          Cancel
                        </Button>
                        <Button
                          className='w-auto'
                          variant='outline-light'
                          type='submit'
                          disabled={!allowEdit}
                          hidden={!allowEdit}>
                          <Fa className='mr-2' icon={faCheck} />
                          Save Changes
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default Profile;

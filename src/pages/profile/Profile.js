import React from 'react';
import * as Yup from 'yup';
import GeneralNavBar from 'components/GeneralNavBar';
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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import BasicInputGroup from 'components/BasicInputGroup';
import UserAvatar from 'images/avatar_mock_up.png';

const userMap = new Map(JSON.parse(localStorage.getItem('userMap')));

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

function FetchUserData(userId) {
  let userData = userMap.get(userId);
  if (userData) {
    console.log('Fetched data:');
    console.log(userData);
    return userData;
  } else {
    //If not found any data
  }
}

function Profile(props) {
  const user = FetchUserData(props.userId);
  // const user = {
  //   firstName: 'Thinh',
  //   lastName: 'Le',
  //   nickname: 'Colorful_octopus',
  //   email: 's1234456@rmit.edu.au',
  //   joined: '17-Sept-2021',
  // };
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
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit, values, isSubmitting, handleReset }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container fluid>
            <Row>
              <GeneralNavBar page='default' />
            </Row>
            <Row>
              <Col className=' mt-5 mx-auto' md={6}>
                <Card className='' bg='blue'>
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
                          editable
                        />
                        <BasicInputGroup
                          as={Col}
                          name='lastName'
                          type='text'
                          label='Last Name'
                          value={values.lastName}
                          editable
                        />
                      </Row>
                      <BasicInputGroup
                        name='nickName'
                        type='text'
                        label='Nickname'
                        value={values.nickName}
                        editable
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
                        editable
                      />
                    </Col>
                    <div className='d-flex justify-content-end'>
                      <Button
                        className='w-auto mx-2'
                        variant='outline-light'
                        onClick={handleReset}
                      >
                        <Fa icon={faTrash} />
                        Cancel
                      </Button>
                      <Button
                        className='w-auto'
                        variant='outline-light'
                        type='submit'
                      >
                        <Fa icon={faTrash} />
                        Save Changes
                      </Button>
                    </div>
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

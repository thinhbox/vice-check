import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Form,
  ListGroup,
} from 'react-bootstrap';
import BasicInputField from 'components/BasicInputField';
import UserAvatar from 'images/avatar_mock_up.png';

export default function Blog() {
  const schema = Yup.object().shape({
    postContent: Yup.string()
      .min(15, 'Must be at least 15 characters')
      .required('Must be at least 15 characters'),
  });
  const user = JSON.parse(
    localStorage.getItem(localStorage.getItem('userToken'))
  );
  if (user.postMap === undefined || null || false) {
    user.postMap = [];
  }
  const [postMap, setPostMap] = useState(user.postMap);
  const [postList, setPostList] = useState(
    postMap.map((post, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListGroup.Item key={index} variant='dark' className='post'>
        <h6>Post #{index}</h6>
        <p>{post}</p>
      </ListGroup.Item>
    ))
  );

  return (
    <Formik
      initialValues={{ postContent: '' }}
      validationSchema={schema}
      onSubmit={(values) => {
        postMap.push(values.postContent);
        user.postMap = postMap;
        setPostMap(postMap);
        localStorage.setItem(user.id, JSON.stringify(user));
        setPostList(
          postMap.map((post, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListGroup.Item key={index} variant='dark' className='post'>
              <h6>Post #{index}</h6>
              <p>{post}</p>
            </ListGroup.Item>
          ))
        );
        console.log(postMap[postMap.length - 1]);
      }}
    >
      {({ handleSubmit }) => (
        <Form className='mb-3' noValidate onSubmit={handleSubmit}>
          <Container fluid>
            <Row>
              <Col className='mx-auto mt-5' md={8}>
                <Card border='light' bg='transparent'>
                  <Card.Body>
                    <Card.Title>
                      <Image
                        className='user-avatar-blog'
                        src={UserAvatar}
                        alt='User avatar'
                        rounded
                      />
                      Hi {user.firstName}, what are you thinking?
                    </Card.Title>

                    <BasicInputField
                      name='postContent'
                      type='text'
                      textarea='true'
                      placeholder=''
                    />

                    <Button
                      className='mt-3'
                      type='submit'
                      variant='outline-light'
                    >
                      Post
                    </Button>
                  </Card.Body>
                  <ListGroup variant='flush'>{postList}</ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

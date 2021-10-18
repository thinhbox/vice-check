/* eslint-disable no-unused-vars */
import { useState, useContext, useLayoutEffect, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  // Image,
  Form,
  ListGroup,
} from 'react-bootstrap';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserContext } from 'App';
// import UserAvatar from 'images/avatar_mock_up.png';
import { FormInputArea } from 'components/BasicInputField';
import { postContentSchema } from 'components/validator/post.validator';
import { FetchBlogPost, Posting } from 'services/blog.service';
import Post from 'components/Post';

// eslint-disable-next-line react/prop-types
export default function Blog({ userId }) {
  const { user, token } = useContext(UserContext);
  const [postData, setPostData] = useState();
  const [postList, setPostList] = useState();
  const allowPosting = userId === user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(postContentSchema),
  });

  const onSubmit = (data) => {
    Posting(token, data)
      .then((newPost) => {
        if (postData) {
          const postArr = postData.posts;
          postArr.push(newPost);
          const newPostData = {
            owner: { nickName: postData.owner.nickName },
            posts: postArr,
          };
          setPostData(newPostData);
        } else {
          FetchBlogPost(userId, token).then((posts) => {
            setPostData(posts);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setError(
          'postContent',
          { message: `Can't post right now! Try again later.` },
          { shouldFocus: false }
        );
      });
  };

  useEffect(() => {
    FetchBlogPost(userId, token)
      .then((data) => {
        setPostData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useLayoutEffect(() => {
    console.log('TRIGGER LAYOUT EFFECT');
    if (user && postData) {
      const ownerNickname = postData.owner.nickName;
      const blogPosts = postData.posts.map(({ id, postContent, createdAt }) => (
        <Post
          key={id}
          id={id}
          ownerNickname={ownerNickname}
          postContent={postContent}
          createdAt={createdAt}
          register={register}
          errors={errors}
        />
      ));
      setPostList(blogPosts);
    }
  }, [postData]);

  return (
    <StyledBlogContainer fluid>
      <Row>
        <Col className='mx-auto mt-5' md={8}>
          {allowPosting && (
            <Form className='mb-3' noValidate onSubmit={handleSubmit(onSubmit)}>
              <Card border='light' bg='transparent'>
                <Card.Body>
                  <Card.Title>
                    Hi {user?.firstName}, what are you thinking?
                  </Card.Title>
                  <FormInputArea
                    className='post-content'
                    id='postContent'
                    name='postContent'
                    type='textArea'
                    textarea='true'
                    register={register}
                    errors={errors}
                  />
                  <Button type='submit' variant='outline-light'>
                    Post
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          )}
          <ListGroup variant='flush'>{postList}</ListGroup>
        </Col>
      </Row>
    </StyledBlogContainer>
  );
}

const StyledBlogContainer = styled(Container)`
  color: white;
  * {
    border-radius: 0;
  }

  .post-content {
    min-height: 4rem;
  }

  // Display post from latest to oldest
  .list-group {
    flex-direction: column-reverse;
  }
`;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { postContentSchema } from 'components/validator/post.validator';
import { Card, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import { postComment, FetchComment } from 'services/blog.service';
import { UserContext } from 'App';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { FormInputComment } from './BasicInputGroup';

export default function Post({ id, ownerNickname, postContent, createdAt }) {
  const { user, token } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    getValues,
    setError,
  } = useForm({
    resolver: yupResolver(postContentSchema),
  });

  const [commentData, setCommentData] = useState();
  const [commentList, setCommentList] = useState();

  const onSubmit = (data) => {
    console.log('SEND COMMENT');
    postComment(token, id, data)
      .then((comment) => {
        if (commentData) {
          const newCommentData = [...commentData];
          newCommentData.push(comment);
          setCommentData(newCommentData);
        } else {
          FetchComment(token, id).then((firstLoadData) => {
            setCommentData(firstLoadData);
          });
        }
      })
      .catch((err) => {
        setError(
          `comment${id}`,
          { message: `Can't post comment right now! Try again later.` },
          { shouldFocus: false }
        );
      });
  };

  // Workaround due to bug. Putting 2 forms in the same page break react hook
  // form?
  const handleComment = () => {
    const data = getValues(`comment${id}`);
    onSubmit(data);
    console.log('This works', data);
  };

  useEffect(() => {
    FetchComment(token, id)
      .then((data) => {
        setCommentData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (commentData) {
      const newCommentList = commentData.map(
        // eslint-disable-next-line no-shadow
        ({ id, commentOwner, commentContent }) => (
          <StyledComment key={id}>
            <Card.Title>
              <h6>{commentOwner}</h6>
            </Card.Title>
            <Card.Text>{commentContent}</Card.Text>
          </StyledComment>
        )
      );
      setCommentList(newCommentList);
    }
  }, [commentData]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <StyledCard>
        <Card.Img variant='top' src='' />
        <Card.Body>
          <Card.Title>
            <h6>
              {ownerNickname} - Posted on: {createdAt}
            </h6>
          </Card.Title>
          <Card.Subtitle className='text-muted mb-2 mini-text'>
            Ref id: {id}
          </Card.Subtitle>
          <Card.Text>{postContent}</Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroup.Item>
            <StyledInputGroup>
              <Form.Control
                {...register(`comment${id}`)}
                isInvalid={!!errors[`comment${id}`]}
              />
              <Button
                className='btn-input-group'
                variant='outline-light'
                type='submit'
                onClick={handleComment}
              >
                <Fa icon={faPaperPlane} />
              </Button>
              <Form.Control.Feedback type='invalid' className='error-message'>
                {errors[`comment${id}`]?.message}
              </Form.Control.Feedback>
            </StyledInputGroup>
          </ListGroup.Item>
          {commentList}
          {/* <StyledComment>
            <Card.Title>
              <h6>Commenter Name</h6>
            </Card.Title>
            <Card.Text>Comment Contenzt right here</Card.Text>
          </StyledComment> */}
        </ListGroup>
      </StyledCard>
    </Form>
  );
}

function FormInputComment({
  id,
  label,
  register,
  errors,
  as,
  hidden,
  editable,
  ...rest
}) {
  return (
    <StyledInputGroup as={as} hidden={hidden}>
      {label && (
        <InputGroup.Text bg='blue' className='min-label-width'>
          {label || ''}
        </InputGroup.Text>
      )}

      <Form.Control {...register(id)} {...rest} isInvalid={!!errors[id]} />

      <Button className='btn-input-group' variant='outline-light' type='submit'>
        <Fa icon={faPaperPlane} />
      </Button>

      <Form.Control.Feedback type='invalid' className='error-message'>
        {errors[id]?.message}
      </Form.Control.Feedback>
    </StyledInputGroup>
  );
}

const StyledInputGroup = styled(InputGroup)`
  background-color: black;

  .form-control {
    color: white;
    background-color: black;
  }
`;

const StyledCard = styled(Card)`
  background-color: black;
  border: 1px solid white;
  margin-top: 1.5rem;
  font-size: 1rem;

  .list-group-item {
    background-color: black !important;
  }

  .card-title {
    color: white;
  }

  .card-subtitle {
    font-size: 0.6rem !important;
  }
  .mini-text {
    font-size: 0.6rem !important;
  }

  .card-text {
    font-size: inherit !important;
  }
`;

const StyledComment = styled(ListGroup.Item)`
  background-color: black;
  border-bottom: 1px solid white;
`;

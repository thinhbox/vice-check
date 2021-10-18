/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const STATUS = {
  success: 200,
};

const apiAddress = 'http://localhost:8080/api';

const instant = axios.create({
  baseURL: apiAddress,
  headers: { 'content-type': 'application/json' },
});

// Fetch all posts in a blog
export const FetchBlogPost = async (email, token) => {
  const request = { email: email, secret_token: token };
  // console.log('GET BLOG POST BY EMAIL: ', request);
  const postMap = await instant({
    url: `/blog`,
    method: 'GET',
    params: request,
  })
    .then((res) => {
      // console.log('STATUS:', res.status, res.statusText);
      // console.log('RECEIVED DATA - GET BLOG POST BY EMAIL:', res.data);
      return res.data;
    })
    .catch((error) => {
      console.log('Error while fetching blog post:');
      throw error;
    });

  return postMap;
};

// Create new post in a blog
export const Posting = async (token, postContent) => {
  // console.log('POST NEW POST: ', token, postContent);
  const newPost = await instant({
    url: `/blog`,
    method: 'POST',
    params: { secret_token: token },
    data: postContent,
  })
    .then((res) => {
      // console.log('STATUS:', res.status, res.statusText);
      // console.log('RECEIVED DATA - POST NEW POST:', res.data);
      return res.data;
    })
    .catch((error) => {
      console.log('Error while posting blog post:');
      throw error;
    });

  return newPost;
};

// Create new comment in a post
export const postComment = async (token, postId, commentContent) => {
  // console.log('POST NEW COMMENT: ', token, postId, commentContent);
  const newComment = await instant({
    url: `/comment`,
    method: 'POST',
    params: { secret_token: token },
    data: { postId, commentContent },
  })
    .then((res) => {
      // console.log('STATUS:', res.status, res.statusText);
      // console.log('RECEIVED DATA - POST NEW COMMENT:', res.data);
      return res.data;
    })
    .catch((error) => {
      console.log('Error while posting comment:');
      throw error;
    });

  return newComment;
};

// Fetch all comment in a post
export const FetchComment = async (token, postId) => {
  const request = { postId, secret_token: token };
  // console.log('GET COMMENT BY TOKEN: ', request);
  const commentMap = await instant({
    url: `/comment`,
    method: 'GET',
    params: request,
  })
    .then((res) => {
      // console.log('STATUS:', res.status, res.statusText);
      // console.log('RECEIVED DATA - GET COMMENT BY TOKEN:', res.data);
      return res.data;
    })
    .catch((error) => {
      console.log('Error while fetching comment:');
      throw error;
    });

  return commentMap;
};

/* eslint-disable object-shorthand */
/* eslint-disable no-console */
// import { UserContext } from 'App';
import axios from 'axios';
// import { useContext } from 'react';
import { SHA3 } from 'sha3';

const STATUS = {
  success: 200,
};

const apiAddress = 'http://localhost:8080/api';

const instant = axios.create({
  baseURL: apiAddress,
  headers: { 'content-type': 'application/json' },
});

const useHash = (text) => {
  const hashAlgo = new SHA3(512);
  let result = '';
  try {
    hashAlgo.update(text);
    result = hashAlgo.digest('hex');
    // Remove hashes from hash object
    hashAlgo.reset();
  } catch (error) {
    console.log('!!!Error while hashing:', error);
  }
  return result;
};

// TODO: Hash password before send to server
export const SignUpService = async (data) => {
  const userRecord = {
    firstName: data.firstName,
    lastName: data.lastName,
    nickName: data.nickName,
    email: data.email,
    password: useHash(data.password),
  };

  console.log('🚀 Userdata send to Signup:', userRecord);
  const result = await instant({
    url: '/users/signup',
    method: 'POST',
    data: userRecord,
  })
    .then((res) => {
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.data);
      if (res.status === STATUS.success) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log('Error occured!');
      console.log(err);
      return false;
    });
  return result;
};

export const LogInService = async (data) => {
  // * Process data before send to backend
  const user = {
    email: data.email,
    password: useHash(data.password),
  };
  console.log('🚀 ~ USERDATA Login Data', data);

  // * Send to backend
  const result = await instant({
    url: '/users/login',
    method: 'POST',
    data: user,
  })
    .then((res) => {
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.data);
      if (res.status === STATUS.success) {
        // localStorage.setItem('token', res.data.userToken);
        return res.data;
      }
      return false;
    })
    .catch((error) => {
      console.log(error.response?.data);
      console.log(error.response?.status);
      if (error.request) {
        // In case of timeout
        console.log(error.request);
      }
    });
  return result;
};

export const FetchUserProfileByEmail = async (email, token) => {
  const request = { email: email, secret_token: token };
  console.log('GET USER BY EMAIL: ', request);
  const profile = await instant({
    url: `/users/profile`,
    headers: { 'content-type': 'application/json' },
    method: 'GET',
    params: request,
  })
    .then((res) => {
      console.log('STATUS:', res.status, res.statusText);
      console.log('RECEIVED DATA - GET BY EMAIL:', res.data);

      return res.data;
    })
    .catch((error) => {
      console.log('Error while fetching user profile:');
      throw error;
    });

  return profile;
};

export const FetchUserProfileByToken = async (token) => {
  console.log('GET USER BY TOKEN: ', token);

  const profile = await instant({
    url: `/users/profile/`,
    method: 'GET',
    params: { secret_token: token },
  })
    .then((res) => {
      console.log('RECEIVED DATA: ', res.data);
      return res.data;
    })
    .catch((error) => {
      throw error;
    });

  return profile;
};

export const UpdateUserProfile = async (token, email, user) => {
  console.log('UPDATE DATA: ', user);
  const profile = await instant({
    url: `/users/profile/`,
    method: 'PUT',
    params: { secret_token: token, email: email },
    data: user,
  })
    .then((res) => {
      console.log('RECEIVED DATA - UPDATE PROFILE: ', res.data.dataValues);
      return res.data.dataValues;
    })
    .catch((error) => {
      throw error;
    });

  return profile;
};

export const DeleteUserProfile = async (token, email) => {
  console.log('REMOVE USER: ', email);
  const result = await instant({
    url: `/users/profile`,
    method: 'DELETE',
    params: { secret_token: token, email: email },
  }).catch((err) => {
    throw err;
  });

  return result;
};

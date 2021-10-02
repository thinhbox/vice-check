import axios from 'axios';

const apiAddress = 'http://localhost:8080/api/users';

const hashData = (data) => data;

// TODO: Hash password before send to server
export const SignUpService = (data) => {
  axios
    .post(apiAddress, data)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log('Error occured!');
      console.log(err);
    });
};

export const LogInService = async (data) => {
  // * Process data before send to backend
  const user = {
    email: data.email,
    password: hashData(data.password),
  };

  // * Send to backend
  axios
    .post(apiAddress, user)
    .then((res) =>
      console.log(
        '🚀 ~ file: user.service.js ~ line 21 ~ LogInService ~ res',
        res
      )
    )
    .catch((err) => {
      console.log(
        '🚀 ~ file: user.service.js ~ line 22 ~ LogInService ~ err',
        err
      );
    });
};

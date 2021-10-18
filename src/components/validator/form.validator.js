import * as yup from 'yup';

/*
Each field has been extracted to allow quick reuse 
Not the best but it should help abstract a lot of 
thing and allow better DRY code
*/
const passwordRegex = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})'
);

const optionalPasswordRegex = new RegExp(
  `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})|`
);

const firstName = {
  firstName: yup
    .string()
    .max(15, `Must be 15 characters or less`)
    .required('Required'),
};

const lastName = {
  lastName: yup
    .string()
    .max(15, `Must be 15 characters or less`)
    .required('Required'),
};

const nickName = {
  nickName: yup
    .string()
    .max(15, `Must be 15 characters or less`)
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only allow alphabet characters'),
};

const email = {
  email: yup.string().email('Invalid email address').required('Required'),
};

const password = {
  password: yup
    .string()
    .required('Required')
    .matches(
      passwordRegex,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
};

const optionalPassword = {
  password: yup
    .string()
    .ensure()
    .matches(
      optionalPasswordRegex,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
};

const confirmPassword = {
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password not match')
    .required('Required'),
};

export const signupSchema = yup.object().shape({
  ...firstName,
  ...lastName,
  ...nickName,
  ...email,
  ...password,
  ...confirmPassword,
});

// Only valid selected field for login
export const loginSchema = signupSchema.pick(['email', 'password']);

export const updateProfileSchema = yup.object().shape({
  ...firstName,
  ...lastName,
  ...nickName,
  ...optionalPassword,
});

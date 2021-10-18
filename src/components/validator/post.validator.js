/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

const postContent = {
  postContent: yup
    .string()
    .min(15, `Must be 15-600 characters`)
    .max(600, `Must be 15-600 characters`)
    .required('Required'),
};

export const postContentSchema = yup.object().shape({
  ...postContent,
});

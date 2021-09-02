import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const BasicTextInput = ({ label, as, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group
      as={as ? as : 'div'}
      controlId={props.id || props.name}
      className='text-input-wrapper'
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        {...props}
        isInvalid={meta.touched && meta.error}
      />
      <Form.Control.Feedback type='invalid' className='error-message'>
        {meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default BasicTextInput;

import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useField } from 'formik';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function BasicInputGroup({ label, as, ...props }) {
  const [field, meta] = useField(props);
  const [input, toggleInput] = useState(false);

  return (
    <InputGroup as={as ? as : 'div'}>
      <InputGroup.Text bg='blue' className='min-label-width'>
        {label}
      </InputGroup.Text>
      <Form.Control
        disabled={!input}
        isInvalid={meta.touched && meta.error}
        {...field}
        {...props}
      />
      {props.editable && (
        <Button
          className='btn-input-group'
          variant='outline-secondary'
          type='button'
          onClick={() => {
            toggleInput(!input);
          }}
        >
          <Fa icon={faEdit} />
        </Button>
      )}
      <Form.Control.Feedback type='invalid' className='error-message'>
        {meta.error}
      </Form.Control.Feedback>
    </InputGroup>
  );
}

export default BasicInputGroup;

/* eslint-disable react/prop-types */
import { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function BasicInputGroup({
  id,
  label,
  register,
  errors,
  as,
  hidden,
  editable,
  ...rest
}) {
  const [input, toggleInput] = useState(false);

  return (
    <InputGroup as={as} hidden={hidden}>
      <InputGroup.Text bg='blue' className='min-label-width'>
        {label}
      </InputGroup.Text>
      <Form.Control
        disabled={!input}
        {...register(id)}
        {...rest}
        isInvalid={!!errors[id]}
      />
      {editable && (
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
        {errors[id]?.message}
      </Form.Control.Feedback>
    </InputGroup>
  );
}

export default BasicInputGroup;

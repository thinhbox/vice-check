import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const FormInputField = ({
  id,
  label,
  register,
  errors,
  as,
  ...rest
}) => (
  <StyledFormInputField as={as}>
    {label ? <Form.Label>{label}</Form.Label> : ''}
    <Form.Control {...register(id)} {...rest} isInvalid={!!errors[id]} />
    {errors[id] ? (
      <Form.Control.Feedback type='invalid' className='error-message'>
        {errors[id].message}
      </Form.Control.Feedback>
    ) : (
      // Act as a placeholder for error message
      <Form.Control.Feedback className='fake-invis'>.</Form.Control.Feedback>
    )}
  </StyledFormInputField>
);

FormInputField.defaultProps = {
  as: 'div',
};

FormInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

// To use in Blog
export const FormInputArea = ({ id, label, register, errors, as, ...rest }) => (
  <StyledFormInputField as={as}>
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Control
      {...register(id)}
      {...rest}
      as='textarea'
      isInvalid={!!errors[id]}
    />
    {errors[id] ? (
      <Form.Control.Feedback type='invalid' className='error-message'>
        {errors[id].message}
      </Form.Control.Feedback>
    ) : (
      // Act as a placeholder for error message
      <Form.Control.Feedback className='fake-invis'>.</Form.Control.Feedback>
    )}
  </StyledFormInputField>
);

FormInputArea.defaultProps = {
  as: 'div',
  label: null,
};

FormInputArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const StyledFormInputField = styled(Form.Group)`
  .form-control {
    border-radius: 0;
  }

  // Act as a placeholder for error message
  .fake-invis {
    display: block;
    opacity: 0;
  }

  .invalid-feedback {
    text-align: end;
  }
`;

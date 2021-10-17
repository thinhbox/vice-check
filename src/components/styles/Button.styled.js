import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const StyledFormButton = styled(Button).attrs(() => ({
  variant: 'outline-light',
  size: 'lg',
  className: 'full-width',
}))`
  border-radius: 0;
  width: 100%;
`;

export const StyledButton = styled(Button).attrs((props) => ({
  variant: props.variant || 'outline-light',
  className: 'full-width',
}))`
  border-radius: 0;
  width: 100%;
`;

import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const StyledFormButton = styled(Button).attrs(() => ({
  variant: 'outline-light',
  size: 'lg',
  className: 'full-width',
}))`
  border-radius: 0;
  width: 100%;
`;

export default StyledFormButton;

import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledFormModal = styled(Modal)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  label,
  strong {
    color: white;
  }

  blockquote {
    text-align: center;
    margin: 0 !important;
  }

  .modal-content {
    border-radius: 0;
  }

  .modal-header {
    background-color: black;
    border-radius: 0;
    border: 1px solid white;
  }

  .modal-body {
    background-color: black;
    border: 1px solid white;
    border-bottom: none;
  }

  .modal-footer {
    background-color: black;
    border-radius: 0;
    border: 1px solid white;
    border-top: 0px;
  }
`;

export default StyledFormModal;

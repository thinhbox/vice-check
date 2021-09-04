import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'styles/LandingPage.css';

import WelcomeMessage from 'pages/welcome/WelcomeMessage';
import GeneralFooter from 'components/GeneralFooter';

function LandingPage(props) {
  return (
    <Container fluid>
      <Row className='landing-page'>
        <Col className='landing-page-content'>
          <WelcomeMessage />
        </Col>
      </Row>
      <GeneralFooter />
    </Container>
  );
}

export default LandingPage;

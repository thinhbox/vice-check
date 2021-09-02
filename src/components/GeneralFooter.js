import { Row, Col } from 'react-bootstrap';

function GeneralFooter() {
  return (
    <Row as='footer' className='py-1'>
      <Col className='footer-nav'>
        Copyright © 2021 Thinh Le | Feedback | About | Contact | FAQ
      </Col>
      <Col className='footer-disclaim'>
        This website is a prototype for desmonstation purpose only RMIT
        University’s logo and materials are belong to RMIT University
        (www.rmit.edu.au) For more information about copyright owner please
        visit About page
      </Col>
    </Row>
  );
}

export default GeneralFooter;

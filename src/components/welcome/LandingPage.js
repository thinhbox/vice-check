import { Row, Col } from 'react-bootstrap';
import StyledFormButton from 'components/styles/Button.styled';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <Row className='landing-page'>
        <Col className='landing-page-content'>
          <Col
            className='landing-page-welcome-message d-grid gap-3 mx-auto my-5'
            md={4}
          >
            <h1 className='large-text text-center'>
              Welcome to Vice Check RMIT`&apos;`s Underground Social Network
            </h1>
            <div>
              <h5>Want To Join Us ʕ•́ᴥ•̀ʔっ ?</h5>
              <Link to='/signup' className='d-grid gap-2'>
                <StyledFormButton>Register now</StyledFormButton>
              </Link>
            </div>
            <div>
              <h5>Already registered?</h5>
              <Link to='/login' className='d-grid gap-2'>
                <StyledFormButton>Login with RMIT email</StyledFormButton>
              </Link>
            </div>
            <h6>
              We dedicated this site for only RMIT’s students & alumni. Our goal
              is to create a friendly and cool spaces for everyone so we have
              our community guidelines. By registering, logining or using this
              network, you are accepted our community guidelines.
            </h6>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default LandingPage;

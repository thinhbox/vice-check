import { Link } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';

function WelcomeMessage(props) {
  return (
    <Col
      className='landing-page-welcome-message d-grid gap-3 mx-auto my-5'
      md={4}
    >
      <h1 className='large-text text-center'>
        Welcome to Vice Check RMIT's Underground Social Network
      </h1>
      <div>
        <h5>Want To Join Us ʕ•́ᴥ•̀ʔっ ?</h5>
        <Link to='/signup' className='d-grid gap-2'>
          <Button variant='outline-light' size='lg'>
            Register now
          </Button>
        </Link>
      </div>
      <div>
        <h5>Already registered?</h5>
        <Link to='/login' className='d-grid gap-2'>
          <Button variant='outline-light' size='lg'>
            Login with RMIT email
          </Button>
        </Link>
      </div>
      <h6>
        We dedicated this site for only RMIT’s students & alumni. Our goal is to
        create a friendly and cool spaces for everyone so we have our community
        guidelines. By registering, logining or using this network, you are
        accepted our community guidelines.
      </h6>
    </Col>
  );
}

export default WelcomeMessage;

import { Nav, Navbar, Container } from 'react-bootstrap';
import styled from 'styled-components';

export default function Footer() {
  return (
    <StyledFooter fixed='bottom' bg='#16213E' variant='dark'>
      <Container fluid>
        <Container>
          <Nav>
            <Navbar.Text>Copyright © 2021 Thinh Le</Navbar.Text>
            <Nav.Link href='#about'>About</Nav.Link>
            <Nav.Link href='#faq'>FAQ</Nav.Link>
          </Nav>
        </Container>
        <Navbar.Text>
          This website is a prototype for desmonstation purpose only RMIT
          University’s logo and materials are belong to RMIT University
          (www.rmit.edu.au) For more information about copyright owner please
          visit About page
        </Navbar.Text>
      </Container>
    </StyledFooter>
  );
}

const StyledFooter = styled(Navbar)`
  background-color: ${({ bg }) => bg};

  * {
    font-size: small;
  }

  .navbar-text {
    max-width: 60%;
  }
`;

import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Brand
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="details-form">
            Enter Details
          </Nav.Link>
          <Nav.Link as={Link} to="generate-report">
            Generate Report
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;

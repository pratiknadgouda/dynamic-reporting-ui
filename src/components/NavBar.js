import React from "react";
import { NavDropdown, Navbar, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import profileImage from "../assets/profile.png";

const NavBar = () => {
  const userState = userStore((state) => state);
  const { logout, user } = userState;

  const handleLogout = (event) => {
    event.preventDefault();
    event.stopPropagation();
    logout();
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Brand
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as: {user}</Navbar.Text>
          <NavDropdown
            title={
              <Image
                src={profileImage}
                roundedCircle
                style={{ width: "30px", height: "30px" }}
                title={"User Image"}
                className={"ms-2"}
              />
            }
            id="user-image"
          >
            <NavDropdown.Item>View Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

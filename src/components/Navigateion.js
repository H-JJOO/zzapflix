import React from "react";

import {
  Navbar,
  Container,
  Form,
  Button,
  Nav,
  NavDropdown,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const Navigateion = () => {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            width={100}
            src="https://info.channel.seoul.kr/wp-content/uploads/2023/03/image-156-1024x512.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigateion;

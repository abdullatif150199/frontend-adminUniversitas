import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Dropdown } from "react-bootstrap";

export default function Header() {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar variant="dark" style={{ backgroundColor: "#006400" }} expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Dropdown>
              <Dropdown.Toggle variant="none" className="text-white">
                Admin Universitas
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="text-center" onClick={handleLogout}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/homme" className="nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar variant="dark" style={{ backgroundColor: "#006400" }}>
        <Container className="container-fluid">
          <Navbar.Brand href="#home">
            {" "}
            <Dropdown>
              <Dropdown.Toggle variant="none" className="text-white">
                Admin Universitas
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Brand>
          <Nav className="m-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </Nav>
        </Container>
      </Navbar> */}
    </div>
  );
}

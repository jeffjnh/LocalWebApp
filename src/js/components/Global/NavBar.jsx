import React from "react";
import styled from 'styled-components';
// import { AWS as AWSCOLORS } from "../../constants/Colors";
import { RETAIL } from "../../constants/Colors";
import logo from '../../../assets/img/logo/AWS_logo_RGB.svg';
// import logo from '../../../assets/img/logo/AWS_logo_RGB_REV.svg';
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

// https://react-bootstrap.github.io/components/navbar/

const NavbarStyle = {
  // backgroundColor: AWSCOLORS.SMILE_ORANGE,
  backgroundColor: RETAIL.SNOW,
}
const NavBarTitle = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  func = () => {};

  render() {
    return (
      <Navbar style={NavbarStyle} expand="lg" sticky="top">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        <NavBarTitle>Professional Services Portfolio</NavBarTitle>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/offerings">Offerings</Nav.Link>
            <Nav.Link href="/testing">Testing</Nav.Link>
            <Nav.Link href="/customer">Customer</Nav.Link>
            <Nav.Link href="/404">(404)</Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Testing
              </NavDropdown.Item>
            </NavDropdown> */}

          </Nav>

          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;

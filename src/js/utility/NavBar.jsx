import React from "react";
import styled from "styled-components";
// import { AWS as AWSCOLORS } from "../../constants/Colors";
import { RETAIL } from "../constants/Colors";
import logo from "../../assets/img/logo/AWS_logo_RGB.svg";
// import logo from '../../assets/img/logo/AWS_logo_RGB_REV.svg';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// https://react-bootstrap.github.io/components/navbar/

const NavbarStyle = {
  // backgroundColor: AWSCOLORS.SMILE_ORANGE,
  backgroundColor: RETAIL.SNOW
};
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
            alt="AWS logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-center"
          />
          <NavBarTitle>Professional Services Portfolio</NavBarTitle>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/offerings">Offerings</Nav.Link>
            <Nav.Link href="/customer">Customer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;

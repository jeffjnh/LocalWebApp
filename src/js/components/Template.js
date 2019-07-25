import React from 'react';
// import styled from 'styled-components';
import NavBar from './Global/NavBar';

class Template extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  func = () => {}

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
      </React.Fragment>
    );
  }

}

export default Template;

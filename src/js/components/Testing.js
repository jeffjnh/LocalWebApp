import React from 'react';
// import styled from 'styled-components';
import NavBar from '../utility/NavBar';

/*
 * Testing file, try out new ideas here
 * access this by going to localhost:3000/testing
 */
class Testing extends React.Component {

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

export default Testing;

import React from 'react';
// import styled from 'styled-components';
import NavBar from '../utility/NavBar';
import {isOfferingMatchOfAllFilters} from '../utility/Filtering';

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

        {isOfferingMatchOfAllFilters()}
      </React.Fragment>
    );
  }

}

export default Testing;

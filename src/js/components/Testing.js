import React from 'react';
import NavBar from './Global/NavBar';
import FilterBar from './FilterBar/FilterBar';
import { OFFERING_TYPE } from './../constants/FILTERS';
import { MATURITY_LEVEL } from './../constants/FILTERS';
import { GSP_INDUSTRYVERTICALS } from './../constants/FILTERS';
// import styled from 'styled-components';

class Testing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: {
        OFFERING_TYPE,
        MATURITY_LEVEL,
        GSP_INDUSTRYVERTICALS,
      }
    };
  }

  printAll = () => {
    const allData = [];

    for (let[key, value] of Object.entries(this.state.filters["OFFERING_TYPE"])) {
      allData.push(
          <div>
            {key} : {value.toString()}
          </div>
      )
    }

    for (let[key, value] of Object.entries(this.state.filters["MATURITY_LEVEL"])) {
      allData.push(
          <div>
            {key} : {value.toString()}
          </div>
      )
    }

    for (let[key, value] of Object.entries(this.state.filters["GSP_INDUSTRYVERTICALS"])) {
      allData.push(
          <div>
            {key} : {value.toString()}
          </div>
      )
    }

    return allData;
  }

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <FilterBar filters={this.state.filters}></FilterBar>
        { this.printAll() }
      </React.Fragment>
    );
  }

}

export default Testing;

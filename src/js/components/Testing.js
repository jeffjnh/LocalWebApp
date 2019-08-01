import React from "react";
// import styled from 'styled-components';
import NavBar from '../utility/NavBar';
// import Button from "react-bootstrap/Button";
// import Collapse from "react-bootstrap/Collapse";
import { firstBy } from "thenby";
import FilterBar from './FilterBar/FilterBar';
import { OFFERING_TYPE } from '../constants/Filters';
import { MATURITY_LEVEL } from '../constants/Filters';
import { GSP_INDUSTRYVERTICALS } from '../constants/Filters';
import { filterOfferings } from '../utility/Filtering';
import Card from "./Offerings/Card";
import { OFFERINGSDATA_SHORT } from "../constants/OfferingsData_Short";

// https://baymard.com/blog/horizontal-filtering-sorting-design

class Testing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showFilterBar: true,
      filters: {
        OFFERING_TYPE,
        MATURITY_LEVEL,
        GSP_INDUSTRYVERTICALS,
      },
    };
  }

  async componentWillMount() {
    this.setState({ data: OFFERINGSDATA_SHORT });
  }

  onHandleFilterChange = (filters) => {
    this.setState({ filters });
  }

  filterData = (data) => {
    let filteredData = filterOfferings(data, this.state.filters);
    return filteredData;
  }

  sortData = (data) => {
    const order_of_offering_types = [
      'Align Offering', 'V1 Align Offering',
      'Launch Offering', 'V1 Launch Offering', 'Foundation Launch',
      'Scale Offering', 'V1 Scale Offering',
      'Optimize Offering', 'V1 Optimize Offering',
      'DK', 'DK Only',
      'SK', 'SK Only',
      'TBD'
    ];
    var offerCompare = (o1, o2) => {
      return order_of_offering_types.indexOf(o1) - order_of_offering_types.indexOf(o2);
    }
    let sortedData = data.sort(
      firstBy("offering_type", { cmp: offerCompare, direction: 1 })
        .thenBy((o1, o2) => o1.offering_maturity_level - o2.offering_maturity_level, -1)
    );
    return sortedData;
  }

  appendDataToCard = () => {
    let data = this.state.data;

    data = this.filterData(data);
    data = this.sortData(data);

    let cards = data.map((offering) => {
      return (
        <Card
          key={`${offering.offering_name} + ${offering.offering_type}`}
          {...offering}
          onClick={() => {
            this.setState({ currentOfferingClicked: offering });
          }}
        />
      )
    })

    return cards;
  };

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>

        <FilterBar
            filters={this.state.filters}
            onHandleFilterChange={this.onHandleFilterChange}
          />

        <div id="root-offerings">

          <div className="offerings-card-container">
            {this.appendDataToCard()}
          </div>

        </div>
      </React.Fragment>
    );
  }

}

export default Testing;

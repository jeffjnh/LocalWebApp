import React from "react";
import styled from 'styled-components';
import NavBar from './Global/NavBar';
import FilterBar from './FilterBar/FilterBar';
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

// import { OFFERINGSDATA_SHORT } from "../constants/OFFERINGSDATA_SHORT";
import { OFFERING_TYPE } from './../constants/FILTERS';
import { MATURITY_LEVEL } from './../constants/FILTERS';
import { GSP_INDUSTRYVERTICALS } from './../constants/FILTERS';
import { firstBy } from "thenby";
import Card from "./Card"

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query";

const ButtonText = styled.div`
  display: inline-block;
  font-size: inherit;
  
  &::after {
    margin-left: 6px;
    font-size: 10px;
    content: "\u25BC";
  }
`;

// const OFFERINGS_HEADERS = {
    //   Index_Name = 'GSP-index',
    //   offering_name = '',
    //   Offering_Type = '',
    //   CAF_Perspective = '',
    //   Capability = '',
    //   gsp_vertical = '',
    //   Offering_Description = '',
    //   offering_maturity_level = '',
    //   Owner = '',
    //   Practice_Group = '',
    //   Wiki_Link = '',
    //   Delivery_Kit = '',
    //   Sales_Kit = '',
    // };

class Offerings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err_api_fetch: null,
      open: false,
      filters: {
        OFFERING_TYPE,
        MATURITY_LEVEL,
        GSP_INDUSTRYVERTICALS,
      },
      color: 'white',
    };
  }

  componentWillMount() {
    this.fetchAPI(url);
    // this.setState( {data: OFFERINGSDATA_SHORT} );
  }

  fetchAPI = (url) => {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json',
          'table_name':'Offerings',
          'index_name':'short-index'
        }
      }
    ).then(response => {
        if (!response.ok) {
          this.setState({ err_api_fetch: true });
          throw response;
        } else {
          this.setState({ err_api_fetch: false });
          console.log("Success: API fetched");
          console.log(response.body);
          return response.json();
        }
      }).then(response => {
        console.log("storing response to state");
        this.setState({ data: response });
      }).catch(err => {
        console.log("Error: API fetch error");
        console.log(err.message)
        console.log(this.state.err_api_fetch);
      });
  };

  sortData = () => {
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
    this.state.data.sort(
      firstBy("offering_type", {cmp: offerCompare, direction: 1})
      .thenBy((o1, o2) => o1.offering_maturity_level - o2.offering_maturity_level, -1)
    );
  }

  onClearFetchedData = () => {
    this.setState({ data: [] });
  }

  appendDataToCard = () => {
    this.sortData();

    let cards = this.state.data.map(offering => {
      return (
        <Card
          key={`${offering.offering_name} + ${offering.offering_type}`}
          {...offering}
        />
      )
    });

    return cards;
  };

  printAllFilteringStates = () => {
    const allData = [];
    for (let [key, value] of Object.entries(this.state.filters["OFFERING_TYPE"])) {
      allData.push(
        <div>
          {key} : {value.toString()}
        </div>
      )
    }
    for (let [key, value] of Object.entries(this.state.filters["MATURITY_LEVEL"])) {
      allData.push(
        <div>
          {key} : {value.toString()}
        </div>
      )
    }
    for (let [key, value] of Object.entries(this.state.filters["GSP_INDUSTRYVERTICALS"])) {
      allData.push(
        <div>
          {key} : {value.toString()}
        </div>
      )
    }
    return allData;
  }

  render() {
    return(
      // this.state.err_api_fetch === true ?
      // <div id="root-offerings">
      //   <h1>Error! Please check console for error messages</h1>
      // </div>
      //   :

      <div>
        <NavBar></NavBar>
        <div id="root-offerings">
          <Button
            variant="info"
            onClick={() => this.setState({showFilterBar: !this.state.showFilterBar})}
            aria-controls="example-collapse-text"
            aria-expanded={this.state.showFilterBar}
          >
            <ButtonText>Filter</ButtonText>
          </Button>
          <Collapse in={this.state.showFilterBar}>
            <div id="example-collapse-text">
              {/* {this.printAllFilteringStates()} */}
              <FilterBar filters={this.state.filters}></FilterBar>
            </div>
          </Collapse>

          <div className="offerings-card-container">
            {this.appendDataToCard()}
          </div>
        </div>
      </div>
    )
  }
}

export default Offerings;

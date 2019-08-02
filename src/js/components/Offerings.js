import React from "react";
// import styled from 'styled-components';
import NavBar from '../utility/NavBar';
import { firstBy } from "thenby";
import FilterBar from './FilterBar/FilterBar';
import { OFFERING_TYPE } from '../constants/Filters';
import { MATURITY_LEVEL } from '../constants/Filters';
import { GSP_INDUSTRYVERTICALS } from '../constants/Filters';
import { filterOfferings } from '../utility/Filtering';
import Card from "./Offerings/Card";
import CardModal from "./Offerings/CardModal";
import { getLoadingSpinner_Left } from "../utility/LoadingSpinner";
import { scrollToTop } from "../utility/ScrollToTop";

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query";
// import { OFFERINGSDATA_SHORT } from "../constants/OfferingsData_Short";

class Offerings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPageLoading: true,
      currentOfferingClicked: null,
      data: [],
      filters: {
        OFFERING_TYPE,
        MATURITY_LEVEL,
        GSP_INDUSTRYVERTICALS,
      },
    };
  }

  /*
   * Before component mounts:
   *  - Renders loading spinner by manipulating state:isPageLoading.
   *  - Fetch all offerings from API and store in data[].
   */
  async componentWillMount() {
    this.setState({ isPageLoading: true });
    await this.fetchAPI();
    // this.setState({ data: OFFERINGSDATA_SHORT });
    this.setState({ isPageLoading: false });
  }

  /*
   * Fetches all offerings from API, stores data in state:data[].
   */
  fetchAPI = () => {
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'table_name': 'Offerings',
        'index_name': 'short-index',
      }
    }
    ).then(response => {
      if (!response.ok) {
        throw response;
      } else {
        // console.log("Success: API fetched");
        // console.log(response.body);
        return response.json();
      }
    }).then(response => {
      // console.log("storing response to state");
      this.setState({ data: response });
    }).catch(err => {
      // console.log("Error: API fetch error");
      // console.log(err.message)
    });
  };

  /*
   * Sets state:filters{} to filters param passed in.
   */
  onHandleFilterChange = (filters) => {
    this.setState({ filters });
  }

  /*
   * Filters data according to checkboxes checked in state:filters.
   * Returns result as filteredData.
   */
  filterData = (data) => {
    let filteredData = filterOfferings(data, this.state.filters);
    return filteredData;
  }

  /*
   * Sorts data[] by custom order of offering_type,
   *   then sorts data[] by offering_maturity_level from high to low,
   * Returns result as sortedData.
   */
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

  /*
   * Returns cards[] with each offering as a Card,
   *   each card has an onClick() that stores the corresponding offering
   *   to this.state:currentOfferingClicked, to be passed to the Modal (expanded view)
   */
  appendDataToCard = () => {
    let data = this.state.data;

    data = this.filterData(data);
    data = this.sortData(data);

    let cards = data.map((offering) => {
      return (
        <Card
          key={`${offering.offering_name} + ${offering.offering_type}`}
          {...offering}
          url={url}
          onClick={() => {
            this.setState({ currentOfferingClicked: offering });
          }}
        />
      )
    })

    return cards;
  };

  /* 
   * CardModal isOpen={this.props.offering ? true : false},
   *   if a card was clicked, the offering of that card is stored to state: currentOfferingClicked,
   *   and offering is passed to the modal for modal to fetch from API.
   * onModalClose, currentOfferingClicked is reset to null.
   */
  render() {

    /* TODO: 
     * spinner is rendered when fetching the API, which is actually quite fast,
     * appendDataToCards() is the one that takes up so much time,
     * but I'm not sure where to setState to control that
     * (if I put that in appendDataToCards, then page will re-render infinitely till crash)
     */
    if (this.state.isPageLoading) {
      return getLoadingSpinner_Left();
    }

    return (
      <div>
        
        <NavBar></NavBar>

        <CardModal
          offering={this.state.currentOfferingClicked}
          onCloseModal={() => {
            this.setState({ currentOfferingClicked: null });
          }}
          url={url}
          fetch={true}
        />

        <div id="root-offerings">

          <FilterBar
            filters={this.state.filters}
            onHandleFilterChange={this.onHandleFilterChange}
          />

          <div className="offerings-card-container">
            {this.appendDataToCard()}
          </div>

          {scrollToTop()}

        </div>

      </div>
    )
  }
}

export default Offerings;

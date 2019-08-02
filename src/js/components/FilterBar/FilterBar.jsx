import React from "react";
import styled from "styled-components";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import FilterForm from "./FilterForm";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

const FilterBarText = styled.div`
  margin: auto 0;
  padding-right: 1rem;
  font-size: 1.2rem;
  color: ${AWSCOLORS.WHITE};
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        OFFERING_TYPE: this.props.filters["OFFERING_TYPE"],
        MATURITY_LEVEL: this.props.filters["MATURITY_LEVEL"],
        GSP_INDUSTRYVERTICALS: this.props.filters["GSP_INDUSTRYVERTICALS"]
      },
      dropdownIsActive: null
    };
  }

  // takes the category_name (which filter category), and
  // checkboxes within that filter category has been changed as param
  handleDataChange = (category_name, checkboxStates) => {
    // stores current state in currentFilters
    let currentFilters = this.state.filters;
    // push new changes of the checkboxes only into that category_name
    currentFilters[category_name] = checkboxStates;
    // set the state to currentFilters, updating everything
    this.setState({ filters: currentFilters }, () => {
      // parent function that sets the state of filters in parent component
      this.props.onHandleFilterChange(this.state.filters);
    });
  };

  // handleChange = eventKey => {
  //   console.log("key: " + eventKey);
  //   this.setState({ dropdownIsActive: eventKey }, () => {
  //     console.log("state after change: " + this.state.dropdownIsActive);
  //   });
  // };

  // resetFilters = (event) => {
  //   console.log(event.target.value);
  // }

  render() {
    return (
      <div
        className={"container"}
        // style={{ position: "fixed", marginTop: "1rem", marginLeft: "5rem", marginBottom: "3rem"}}
        style={{ marginTop: "1rem", marginLeft: "5rem" }}
      >
        <div className={"row"} style={{ marginTop: "1rem" }}>
          {/* <div className={"col-xl-2"} style={{ margin: "auto 0" }}> */}
          <FilterBarText>Filter by: </FilterBarText>
          {/* </div> */}

          {/* <div className={"col-xl"}> */}
          <FilterForm
            formName="Offering Type"
            category_name="OFFERING_TYPE"
            filters={this.state.filters["OFFERING_TYPE"]}
            onDataChange={this.handleDataChange}
          />
          {/* </div> */}

          {/* <div className={"col-xl"}> */}
          <FilterForm
            formName="Maturity Level"
            category_name="MATURITY_LEVEL"
            filters={this.state.filters["MATURITY_LEVEL"]}
            onDataChange={this.handleDataChange}
          />
          {/* </div> */}

          {/* <div className={"col-xl"}> */}
          <FilterForm
            formName="GSP / Industry Verticals"
            category_name="GSP_INDUSTRYVERTICALS"
            filters={this.state.filters["GSP_INDUSTRYVERTICALS"]}
            onDataChange={this.handleDataChange}
          />
          {/* </div> */}

          {/* <div className="col">
            <DropdownButton as={ButtonGroup} title="Filtering Type">
              <Dropdown.Item
                eventKey="Filter by All"
                onSelect={this.handleChange}
                active={
                  this.state.dropdownIsActive === this.eventKey ? true : false
                }
              >
                Filter by All Criteria
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Filter by Any"
                onSelect={this.handleChange}
                active={
                  this.state.dropdownIsActive === this.eventKey ? true : false
                }
              >
                Filter by Any Criteria
              </Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="col">
            <Button variant="primary"
              value={"reset filters"}
              onClick={this.resetFilters}>
            Reset All Filters</Button>
          </div> */}
          
        </div>
      </div>
    );
  }
}

export default FilterBar;

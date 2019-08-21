import React from "react";
import styled from "styled-components";
import FilterForm from "./FilterForm";
import { AWS as AWSCOLORS } from "../../constants/Colors";

const FilterBarText = styled.div`
  margin: auto 0;
  padding-top: 5px;
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
      dropdownIsOpen: {
        OFFERING_TYPE: this.props.dropdownIsOpen["OFFERING_TYPE"],
        MATURITY_LEVEL: this.props.dropdownIsOpen["MATURITY_LEVEL"],
        GSP_INDUSTRYVERTICALS: this.props.dropdownIsOpen["GSP_INDUSTRYVERTICALS"]
      }
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

  handleFilterDropdown = category_name => {
    let currentDrops = this.state.dropdownIsOpen;
    currentDrops[category_name] = !this.state.dropdownIsOpen[category_name];
    // force parent state update
    this.setState({ dropdownIsOpen: currentDrops }, () => {
      this.props.onFilterDropdown(this.state.dropdownIsOpen);
    });
  };

  render() {
    return (
      <div
        className={"container-fluid no-gutters"}
        style={{
          position: "fixed",
          zIndex: "1",
          margin: "1.5rem 0rem 3rem 5rem"
        }}
      >
        <div className={"row justify-content-start"}>
          <div className={"col-auto m-1 p-0"}>
            <FilterBarText>Filters: </FilterBarText>
          </div>

          <div className={"col-auto m-1 p-0"}>
            <FilterForm
              formName={"Offering Type"}
              category_name={"OFFERING_TYPE"}
              filters={this.state.filters["OFFERING_TYPE"]}
              dropdownIsOpen={this.state.dropdownIsOpen["OFFERING_TYPE"]}
              onDataChange={this.handleDataChange}
              onFilterDropdown={() => {this.handleFilterDropdown("OFFERING_TYPE")}}
            />
          </div>

          <div className={"col-auto m-1 p-0"}>
            <FilterForm
              formName={"Maturity Level"}
              category_name={"MATURITY_LEVEL"}
              filters={this.state.filters["MATURITY_LEVEL"]}
              dropdownIsOpen={this.state.dropdownIsOpen["MATURITY_LEVEL"]}
              onDataChange={this.handleDataChange}
              onFilterDropdown={() => {this.handleFilterDropdown("MATURITY_LEVEL")}}
            />
          </div>

          <div className={"col-auto m-1 p-0"}>
            <FilterForm
              formName={"GSP / Industry Verticals"}
              category_name={"GSP_INDUSTRYVERTICALS"}
              filters={this.state.filters["GSP_INDUSTRYVERTICALS"]}
              dropdownIsOpen={this.state.dropdownIsOpen["GSP_INDUSTRYVERTICALS"]}
              onDataChange={this.handleDataChange}
              onFilterDropdown={() => {this.handleFilterDropdown("GSP_INDUSTRYVERTICALS")}}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FilterBar;

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

  handleFilterBarDropdown = (name) => {
    this.setState(
      prevState => ({
        dropdownIsOpen: {
          ...prevState.dropdownIsOpen,
          [name]: !prevState.dropdownIsOpen[name]
        }
      }), () => {
        console.log(this.state.dropdownIsOpen[name]);
      }
    );
  };

  render() {
    return (
      <div
        className={"container-fluid no-gutters"}
        style={{ position: "fixed", zIndex: "1", margin: "1.5rem 0rem 3rem 5rem"}}
      >
        <div className={"row justify-content-start"}>
          <div className={"col-auto m-1 p-0"} >
            <FilterBarText>Filters: </FilterBarText>
          </div>

          <div className={"col-auto m-1 p-0"}>
            <FilterForm
              formName={"Offering Type"}
              category_name={"OFFERING_TYPE"}
              filters={this.state.filters["OFFERING_TYPE"]}
              onDataChange={this.handleDataChange}
              onFilterButtonClick={() => {this.props.onFilterButtonClick("OFFERING_TYPE")}}
            />
          </div>

          <div className={"col-auto m-1 p-0"}>
            <FilterForm
              formName={"Maturity Level"}
              category_name={"MATURITY_LEVEL"}
              filters={this.state.filters["MATURITY_LEVEL"]}
              onDataChange={this.handleDataChange}
              onFilterButtonClick={() => {this.props.onFilterButtonClick("MATURITY_LEVEL")}}
            />
          </div>

          <div className={"col-auto m-1 p-0"}>
            <FilterForm
              formName={"GSP / Industry Verticals"}
              category_name={"GSP_INDUSTRYVERTICALS"}
              filters={this.state.filters["GSP_INDUSTRYVERTICALS"]}
              onDataChange={this.handleDataChange}
              onFilterButtonClick={() => {this.props.onFilterButtonClick("GSP_INDUSTRYVERTICALS")}}
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default FilterBar;

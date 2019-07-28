import React from "react";
import styled from "styled-components";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import FilterForm from "./FilterForm";

// https://react-bootstrap.github.io/components/accordion/

const FilteringBar = styled.div`
  display: inline-block;
  position: relative;
  background-color: ${AWSCOLORS.SMILE_ORANGE};
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        OFFERING_TYPE: this.props.filters["OFFERING_TYPE"],
        MATURITY_LEVEL: this.props.filters["MATURITY_LEVEL"],
        GSP_INDUSTRYVERTICALS: this.props.filters["GSP_INDUSTRYVERTICALS"],
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

  render() {
    return (
      <FilteringBar
        style={{
          display: "inline-block",
          color: AWSCOLORS.DARK_SQUID_INK,
        }}
      >
        <Accordion defaultActiveKey="accd-1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-0">
              Offering Type
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-0">
              <Card.Body>
                <FilterForm
                  category_name="OFFERING_TYPE"
                  filters={this.state.filters["OFFERING_TYPE"]}
                  onDataChange={this.handleDataChange}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-1">
              Maturity Level
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-1">
              <Card.Body>
                <FilterForm
                  category_name="MATURITY_LEVEL"
                  filters={this.state.filters["MATURITY_LEVEL"]}
                  onDataChange={this.handleDataChange}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-2">
              GSP / Industry Verticals
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-2">
              <Card.Body>
                <FilterForm
                  category_name="GSP_INDUSTRYVERTICALS"
                  filters={this.state.filters["GSP_INDUSTRYVERTICALS"]}
                  onDataChange={this.handleDataChange}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </FilteringBar>
    );
  }
}

export default FilterBar;

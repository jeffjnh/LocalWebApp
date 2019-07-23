import React from "react";
import styled from "styled-components";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import { RETAIL } from "../../constants/Colors";
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

  render() {
    return (
      <FilteringBar
        style={{
          display: "inline-block",
          color: RETAIL.DARK_SQUID_INK
        }}
      >
        <Accordion defaultActiveKey="accd-0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-0">
              Offering Type
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-0">
              <Card.Body>
                <FilterForm filters={this.state.filters["OFFERING_TYPE"]}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-1">
              Maturity Level
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-1">
              <Card.Body>
              
                <FilterForm filters={this.state.filters["MATURITY_LEVEL"]}/>
              
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-2">
              GSP / Industry Verticals
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-2">
              <Card.Body>
                <FilterForm filters={this.state.filters["GSP_INDUSTRYVERTICALS"]}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </FilteringBar>
    );
  }
}

export default FilterBar;

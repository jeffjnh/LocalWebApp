import React from "react";
import styled from "styled-components";
// import { AWS as AWSCOLORS } from "../constants/Colors";
import { RETAIL } from "../../constants/Colors";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Checkbox_Form from "./Checkbox_Form";

// https://react-bootstrap.github.io/components/accordion/

// const OFFERING_TYPE = ["Align", "Launch", "Scale", "Optimize"];

// const MATURITY_LEVEL = ["5", "4", "3", "2", "1", "0"];

// const GSP_INDUSTRYVERTICALS = [
//   "Advisory", "AI", "Amazon Connect", "Analytics Big Data", "CAF", "Database", "DevOps", "Elemental", "End User Compute", "HPC", "IoT", "Microsoft", "Migrations", "Operational Integration", "SAP", "SAS (Security Assurance Services)", "Security",
//   "Automotive", "FinServ (Financial Services)", "Healthcare & Life Sciences", "Manufacturing", "Media & Entertainment", "Oil & Gas", "Retail", "Telecom"
// ];



const OFFERING_TYPE = {
  "Align": false,
  "Launch": false,
  "Scale": false,
  "Optimize": false
};

const MATURITY_LEVEL = {
  "5": false,
  "4": false,
  "3": false,
  "2": false,
  "1": false,
  "0": false
};

const GSP_INDUSTRYVERTICALS = {
  "Advisory": false,
  "AI": false,
  "Amazon Connect": false,
  "Analytics Big Data": false,
  "CAF": false,
  "Database": false,
  "DevOps": false,
  "Elemental": false,
  "End User Compute": false,
  "HPC": false,
  "IoT": false,
  "Microsoft": false,
  "Migrations": false,
  "Operational Integration": false,
  "SAP": false,
  "SAS (Security Assurance Services)": false,
  "Security": false,

  "Automotive": false,
  "FinServ (Financial Services)": false,
  "Healthcare & Life Sciences": false,
  "Manufacturing": false,
  "Media & Entertainment": false,
  "Oil & Gas": false,
  "Retail": false,
  "Telecom": false
};



const FilteringBar = styled.div`
  // backgroundColor: AWSCOLORS.SMILE_ORANGE,
  // backgroundColor: RETAIL.SNOW;
  display: inline-block;
  position: relative;
`;
const FilteringBarText = styled.div`
  position: absolute;
  margin-left: 10px;
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   checkboxes: OFFERING_TYPE.reduce(
    //     (options, isChecked) => ({
    //       ...options,
    //       [isChecked]: false
    //     }),
    //     {}
    //   ),
      
    // };

    this.state = {
      filters: {
        OFFERING_TYPE,
        MATURITY_LEVEL,
        GSP_INDUSTRYVERTICALS
      }
    };

  }

  render() {
    return (
      <FilteringBar
        style={{
          display: "inline-block",
          margin: "10px",
          color: RETAIL.DARK_SQUID_INK
        }}
      >
        <FilteringBarText style={{ display: "inline-block" }}>
          Filters:
        </FilteringBarText>

        <Accordion defaultActiveKey="0" style={{ width: "400px" }}>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-0">
              Offering Type
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-0">
              <Card.Body>
                <Checkbox_Form {...this.state.filters}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-1">
              Maturity Level
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-1">
              <Card.Body>
              
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-2">
              GSP / Industry Verticals
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-2">
              <Card.Body>
              
              </Card.Body>
            </Accordion.Collapse>
          </Card>

        </Accordion>
      </FilteringBar>
    );
  }
}

export default FilterBar;

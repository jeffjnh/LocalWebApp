import React from "react";
import styled from "styled-components";
// import { AWS as AWSCOLORS } from "../constants/Colors";
import { RETAIL } from "../../constants/Colors";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Checkbox from "./Checkbox";

// https://react-bootstrap.github.io/components/accordion/

const OFFERING_TYPE = ["Align", "Launch", "Scale", "Optimize"];

const MATURITY_LEVEL = ["5", "4", "3", "2", "1", "0"];

const GSP_INDUSTRYVERTICALS = [
  "Advisory", "AI", "Amazon Connect", "Analytics Big Data", "CAF", "Database", "DevOps", "Elemental", "End User Compute", "HPC", "IoT", "Microsoft", "Migrations", "Operational Integration", "SAP", "SAS (Security Assurance Services)", "Security",
  "Automotive", "FinServ (Financial Services)", "Healthcare & Life Sciences", "Manufacturing", "Media & Entertainment", "Oil & Gas", "Retail", "Telecom"
];

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
    this.state = {
      checkboxes: OFFERING_TYPE.reduce(
        (options, isChecked) => ({
          ...options,
          [isChecked]: false
        }),
        {}
      )

      // MATURITY_LEVEL.reduce(
      //   (options, isChecked) => ({
      //     ...options,
      //     [isChecked]: false
      //   }),
      //   {}
      // ),
      // GSP_INDUSTRYVERTICALS.reduce(
      //   (options, isChecked) => ({
      //     ...options,
      //     [isChecked]: false
      //   }),
      //   {}
      // ),

    };
  }

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log("Selected: ");

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log("[v] " + checkbox);
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes_OFFERINGTYPE = () => OFFERING_TYPE.map(this.createCheckbox);
  createCheckboxes_MATURITY = () => MATURITY_LEVEL.map(this.createCheckbox);
  createCheckboxes_GSP = () => GSP_INDUSTRYVERTICALS.map(this.createCheckbox);

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
                <form onSubmit={this.handleFormSubmit}>
                  {this.createCheckboxes_OFFERINGTYPE()}
                  <div className="form-group mt-2">
                    <button type="button" className="btn btn-outline-primary mr-2" onClick={this.selectAll}>
                      Select All
                    </button>
                    <button type="button" className="btn btn-outline-primary mr-2" onClick={this.deselectAll}>
                      Deselect All
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Apply
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-1">
              Maturity Level
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-1">
              <Card.Body>
              <form onSubmit={this.handleFormSubmit}>
                  {this.createCheckboxes_MATURITY()}
                  <div className="form-group mt-2">
                    <button type="button" className="btn btn-outline-primary mr-2" onClick={this.selectAll}>
                      Select All
                    </button>
                    <button type="button" className="btn btn-outline-primary mr-2" onClick={this.deselectAll}>
                      Deselect All
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Apply
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="accd-2">
              GSP / Industry Verticals
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="accd-2">
              <Card.Body>
              <form onSubmit={this.handleFormSubmit}>
                  {this.createCheckboxes_GSP()}
                  <div className="form-group mt-2">
                    <button type="button" className="btn btn-outline-primary mr-2" onClick={this.selectAll}>
                      Select All
                    </button>
                    <button type="button" className="btn btn-outline-primary mr-2" onClick={this.deselectAll}>
                      Deselect All
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Apply
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

        </Accordion>
      </FilteringBar>
    );
  }
}

export default FilterBar;

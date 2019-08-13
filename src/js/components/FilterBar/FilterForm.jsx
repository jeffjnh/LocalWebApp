import React, { Component } from "react";
import styled from "styled-components";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Checkbox from "./Checkbox";

// https://react-bootstrap.github.io/components/accordion/

const cardStyle = {
  margin: "0.3rem auto",
  border: "none",
  backgroundColor: AWSCOLORS.SMILE_ORANGE,
  color: AWSCOLORS.WHITE,
  fontFamily: "AmazonEmberMono_Rg",
  fontSize: "15px"
};

const cardHeaderStyle = {
  padding: "0.4rem 0.75rem"
};

const CardTitle = styled.div`
  padding-right: 20px;

  &::after {
    position: absolute;
    right: 0;
    padding-top: 6px;
    margin-right: 8px;
    font-size: 10px;
    content: "\u25BC";
  }
`;

const cardBodyStyle = {
  backgroundColor: AWSCOLORS.WHITE,
  color: AWSCOLORS.SQUID_INK,
  maxHeight: "70vh",
  overflowY: "scroll"
};

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: this.props.filters,
      dropdownIsOpen: this.props.dropdownIsOpen,
    };
  }

  // func createCheckbox = (single option from OPTIONS.map) => (JSX element[] to be returned)
  // Returns an array of OPTIONS.length instances of Checkbox components
  createCheckbox = option => (
    <Checkbox
      key={option}
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
    />
  );

  // func createCheckboxes = (pass in optional param to JSX) = > (JSX element[] to be returned)
  // Iterates over OPTIONS array and calls this.creatCheckbox function for each item in that array
  // If we want to do this as arrays:
  // createCheckboxes = () => (OPTIONS.map(this.createCheckbox));
  createCheckboxes = () => (
    Object.keys(this.state.checkboxes).map(this.createCheckbox)
  );

  createButtons = () => {
    return (
      <div
        className="form-group mt-3 mb-1"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <button
          type="button"
          className="btn-sm mr-2 py-1"
          style={{
            fontSize: "13px",
            backgroundColor: AWSCOLORS.SMILE_ORANGE,
            color: AWSCOLORS.WHITE
          }}
          onClick={this.selectAll}
        >
          Select All
        </button>
        <button
          type="button"
          className="btn-sm mr-2 py-1"
          style={{
            fontSize: "13px",
            backgroundColor: AWSCOLORS.SMILE_ORANGE,
            color: AWSCOLORS.WHITE
          }}
          onClick={this.unselectAll}
        >
          Unselect All
        </button>
        <Accordion.Toggle
          className="btn-sm mr-2 py-1"
          style={{
            fontSize: "13px",
            backgroundColor: AWSCOLORS.SMILE_ORANGE,
            color: AWSCOLORS.WHITE
          }}
          onClick={this.applyClicked}
          eventKey={this.props.formName}
        >
          Apply
        </Accordion.Toggle>
      </div>
    );
  };

  // handles change event of a checkbox
  handleCheckboxChange = changeEvent => {
    // name of checkbox that triggered changeEvent
    // becomes the key in the new state object in this.setState below
    const { name } = changeEvent.target;

    // prevState = current state before state is modified
    this.setState(
      prevState => ({
        // returns this new state below to be taken by this.setState which updates the render
        checkboxes: {
          // spreads out checkboxes from prevState
          ...prevState.checkboxes,
          // if name matches checkbox that was toggled, set it to the opposite value
          [name]: !prevState.checkboxes[name]
        }
      }), () => {
        // console.log('in handleCheckboxChange');
      }
    );
  };

  // selects all checkboxes
  selectAll = () => this.selectAllCheckboxes(true);

  // unselects all checkboxes
  unselectAll = () => this.selectAllCheckboxes(false);

  // func selectAllCheckboxes = () => {}
  // Iterates over checkboxes, for each checkbox,
  //   updates its state to the value of the isSelected parameter passed in by selectAll / unselectAll
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

  // form submit event
  handleFormSubmit = formSubmitEvent => {
    // prevents it from the default event of submitting the form which refreshes the page
    formSubmitEvent.preventDefault();
    console.log("Selected: ");

    // iterates through checkboxes
    Object.keys(this.state.checkboxes)
      // filter checkboxes that are selected
      .filter(checkbox => this.state.checkboxes[checkbox])
      // logs only the selected checkboxes in console
      .forEach(checkbox => {
        console.log("[v] " + checkbox);
      });
  };

  applyClicked = () => {
    this.props.onDataChange(this.props.category_name, this.state.checkboxes);
    this.props.onFilterDropdown(this.props.category_name);
  };

  render() {
    return (
      <Accordion style={{ paddingRight: "0.8rem" }}>
        <Card style={cardStyle}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={this.props.formName}
            style={cardHeaderStyle}
          >
            <CardTitle onClick={() => {this.props.onFilterDropdown(this.props.category_name)}}>
              {this.props.formName}
            </CardTitle>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey={this.props.formName}>
            <Card.Body style={cardBodyStyle}>
              <div className="row pl-2">
                <div className="col-sm mt-2">
                  {/* onFormSubmit */}
                  <form onSubmit={this.handleFormSubmit}>
                    {/* JSX element[] */}
                    {this.createCheckboxes()}
                    {this.createButtons()}
                  </form>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default FilterForm;

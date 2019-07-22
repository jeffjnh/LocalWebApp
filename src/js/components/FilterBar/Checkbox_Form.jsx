import React, { Component } from "react";
import Checkbox from "./Checkbox";

class Checkbox_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: this.props.filters,

      // If we want to do this as arrays:
      // Array<String>.reduce transforms array["1", "2", "3"] into object{"1": false, "2": false, "3": false}
      // checkboxes: this.OPTIONS.reduce(
      //   // key = options, value = isChecked
      //   (options, isChecked) => ({
      //     ...options,
      //     [isChecked]: false
      //   }),
      //   {}
      // )
    }
  }

  // func createCheckboxes = (pass in optional param to JSX) = > (JSX element[] to be returned)
  // Iterates over OPTIONS array and calls this.creatCheckbox function for each item in that array
  // If we want to do this as arrays:
  // createCheckboxes = () => (OPTIONS.map(this.createCheckbox));
  createCheckboxes = () => (Object.keys(this.state.checkboxes).map(this.createCheckbox));


  // func createCheckbox = (single option from OPTIONS.map) => (JSX element[] to be returned)
  // Returns an array of OPTIONS.length instances of Checkbox components
  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  // handles change event of a checkbox
  handleCheckboxChange = changeEvent => {

    // name of checkbox that triggered changeEvent
    // becomes the key in the new state object in this.setState below
    const { name } = changeEvent.target;

    // prevState = current state before state is modified
    this.setState(prevState => ({
      // returns this new state below to be taken by this.setState which updates the render
      checkboxes: {
        // spreads out checkboxes from prevState
        ...prevState.checkboxes,
        // if name matches checkbox that was toggled, set it to the opposite value
        [name]: !prevState.checkboxes[name]
      }
    }));
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

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">

            {/* onFormSubmit */}
            <form onSubmit={this.handleFormSubmit}>

              {/* JSX element[] */}
              {this.createCheckboxes()}

              <div className="form-group mt-2">
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.unselectAll}
                >
                  Unselect All
                </button>
                <button type="submit" className="btn btn-primary">
                  Apply
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default Checkbox_Form;

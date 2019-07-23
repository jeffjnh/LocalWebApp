import React from "react";

// props received:
// label: coming from OPTIONS array, string value of the checkbox
// key: same as label
// isSelected: boolean that tells Checkbox whether it should render as selected or unselected
// onCheckboxChange: callback function. Ref to this.handleCheckboxChange function, passes a change event back to parent when user interacts with input
const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        key={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;

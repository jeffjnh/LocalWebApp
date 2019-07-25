import React from "react";
import styled from "styled-components";
// import { AWS as AWSCOLORS } from "../../../constants/Colors";
import ReactTooltip from "react-tooltip";

const TAGS = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  margin-right: 2px;
  padding: 10px;

  span {
    padding: 2px 10px;
    border: 1px solid black;
    border-radius: 25px;
  }
`;

class Tags extends React.Component {
  render() {
    return (
      <TAGS>
        <div data-tip="Offering Type" data-for="offering_type">
          <span>{this.props.offering_type}</span>
          <ReactTooltip id="offering_type" place={this.props.place} type="dark" effect="solid" />
        </div>
        <div data-tip="Maturity Level" data-for="offering_maturity_level">
          <span>{this.props.offering_maturity_level}</span>
          <ReactTooltip id="offering_maturity_level" place={this.props.place} type="dark" effect="solid" />
        </div>
      </TAGS>
    );
  }
}

export default Tags;

import React, { Component } from "react";
import AutoField from "./AutoField";
import { AWS as AWSCOLORS } from "../constants/Colors";
import NavBar from "../utility/NavBar";

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/predictions/";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictor: "",
      predictee: "",
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
        "predictor_name_type": this.state.predictor,
        "predictee_name_type": this.state.predictee,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        } else {
          console.log("Success: API fetched");
          console.log(response.body);
          return response.json();
        }
      })
      .catch(err => {
        console.log("Error: API fetch error");
        console.log(err.message);
      });
  };

  onChangePredictor = (response_object, name) => {
    console.log(name);
    this.setState({ predictor: name });
  };

  onChangePredictee = (response_object, name) => {
    console.log(name);
    this.setState({ predictee: name });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
          <br />
          (Offering 1)
          <div style={{ color: AWSCOLORS.DARK_SQUID_INK }}>
            <AutoField
              table={"Offerings"}
              index={"offering_name-index"}
              indexedType={"offering_name"}
              placeText={"Offering Name"}
              stateSetter={this.onChangePredictor}
            />
          </div>
          <br /> &nbsp;&nbsp;&nbsp;&nbsp; should map to (Offering 2)
          <div style={{ color: AWSCOLORS.DARK_SQUID_INK }}>
            <AutoField
              table={"Offerings"}
              index={"offering_name-index"}
              indexedType={"offering_name"}
              placeText={"Offering Name"}
              stateSetter={this.onChangePredictee}
            />
          </div>
          <button
            onClick={this.writeSuggestion}
            style={{
              margin: "1em",
              borderRadius: "5px",
              verticalAlign: "center"
            }}
          >
            Submit
          </button>
        </form>
        <br /> <br /> <br /> <br />
        (show update success / failure message)
      </div>
    );
  }
}

export default Editor;

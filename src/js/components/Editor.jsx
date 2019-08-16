import React, { Component } from "react";
import NavBar from "../utility/NavBar";
import Toast from "react-bootstrap/Toast";
import AutoField from "./AutoField";
import { AWS as AWSCOLORS } from "../constants/Colors";

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/predict";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictor: "",
      predictee: "",
      showSubmitToast: false
    };

    this.onChangePredictor = this.onChangePredictor.bind(this);
    this.onChangePredictee = this.onChangePredictee.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*",
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

    this.setState({ showSubmitToast: true });
  };

  async onChangePredictor(response_object, name) {
    console.log(name);
    await this.setState({ predictor: name });
  };

  async onChangePredictee(response_object, name) {
    console.log(name);
    await this.setState({ predictee: name });
  };

  render() {
    return (
      <div>
        <NavBar />
        <form style={{ marginTop: "3rem" }} onSubmit={this.handleSubmit}>
          <h3 style={{ display: "flex", marginLeft: "3rem" }}>
            <div style={{ paddingRight: "7rem" }}>Offering (Predictor) </div>
            Offering (Predictee)
          </h3>
          <br />

          <div
            style={{
              display: "flex",
              marginTop: "-2.5rem",
              color: AWSCOLORS.DARK_SQUID_INK
            }}
          >
            <AutoField
              table={"Offerings"}
              index={"offering_name-index"}
              indexedType={"offering_name"}
              placeText={"Offering Name"}
              secondType={"offering_type"}
              jointData={true}
              stateSetter={this.onChangePredictor}
            />

            <AutoField
              table={"Offerings"}
              index={"offering_name-index"}
              indexedType={"offering_name"}
              placeText={"Offering Name"}
              secondType={"offering_type"}
              jointData={true}
              stateSetter={this.onChangePredictee}
            />

            <div style={{ marginTop: "-1.4rem", marginLeft: "2rem" }}>
              <button
                onClick={this.writeSuggestion}
                style={{
                  margin: "1em",
                  marginTop: "3rem",
                  height: "3rem",
                  borderRadius: "5px",
                  verticalAlign: "center"
                }}
              >
                Submit
              </button>
            </div>
          </div>

          <br />

          <Toast
            show={this.state.showSubmitToast}
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "2.5rem",
              padding: "1rem",
              maxWidth: "fit-content",
              backgroundColor: AWSCOLORS.GREEN_G2,
              fontFamily: "AmazonEmber_Rg",
              fontWeight: "bold"
            }}
            onClose={() => this.setState({ showSubmitToast: false })}
            delay={2000}
            autohide
          >
            <h4>Relationship successfully logged!!</h4>
          </Toast>
        </form>
      </div>
    );
  }
}

export default Editor;

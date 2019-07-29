import React from "react";
// import styled from "styled-components";
import Modal from "react-modal";
import { AWS as AWSCOLORS } from "../../../constants/Colors";
import Tags from "./Tags";
import logo_1_align from "../../../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../../../../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../../../../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../../../../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../../../../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../../../../assets/img/logo/proserve/sales_kit.svg";

// import Button from "react-bootstrap/Button";
// import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import Modal from "react-bootstrap/Modal";
// import ModalDialog from "react-bootstrap/ModalDialog";

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "purple",
    
    maxHeight: '80%',
    maxWidth: '80%',
    borderRadius: "12px",
    color: AWSCOLORS.DARK_SQUID_INK,
  },
  overlay: {
    // backgroundColor: "purple",
    // filter: "blur(8px)",
  }
};

const buttonStyle = {
  margin: "5rem",
};

const logoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  opacity: "0.10",
};

class CardLarge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      modalIsOpen: false,
      offering_type: "Align Offering",
      offering_name: "AWS CAF Align workshop",
    };
  }

  componentWillMount() {
    this.fetchAPI(url);
  }

  fetchAPI = (url) => {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'table_name': 'Offerings',
          'offering_type': this.state.offering_type,
          'offering_name': this.state.offering_name,
        }
      }
    ).then(response => {
        if (!response.ok) {
          this.setState({ err_api_fetch: true });
          throw response;
        } else {
          this.setState({ err_api_fetch: false });
          console.log("Success: API fetched");
          // console.log(response.body);
          return response.json();
        }
      }).then(response => {
        console.log("storing response to state");
        this.setState({data: response[0]});
      }).catch(err => {
        console.log("Error: API fetch error");
        console.log(err.message)
        console.log(this.state.err_api_fetch);
      });
  };

  getBackgroundImg = (offering_type) => {
    let logo = logo_sales_kit;
    switch (offering_type) {
      case "Align Offering":
      case "V1 Align Offering":
        logo = logo_1_align;
        break;
      case "Launch Offering":
      case "V1 Launch Offering":
      case "Foundation Launch":
        logo = logo_2_launch;
        break;
      case "Scale Offering":
      case "V1 Scale Offering":
        logo = logo_3_scale;
        break;
      case "Optimize Offering":
      case "V1 Optimize Offering":
        logo = logo_4_optimize;
        break;
      case "DK":
      case "DK Only":
        logo = logo_delivery_kit;
        break;
      case "SK":
      case "SK Only":
        logo = logo_sales_kit;
        break;
      // TODO : make a mystery logo??
      case "TBD":
      default:
        logo = logo_1_align;
    }

    return (
      <img alt="icon-background" src={logo} style={logoStyle} />
    );
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
    // console.log("openModal");
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed
    this.subtitle.style.color = AWSCOLORS.SMILE_ORANGE;
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    // console.log("closeModal");
  }

  setTextIfNull = (data) => {
    // console.log(data);
    if (data !== undefined || data != null) {
      // console.log("data is not null: " + data);
      return(
        <a href={data} target={"_blank"}>&nbsp;{data}</a>
      );
    } else {
      // console.log("data IS null: " + data);
      return " (N/A)";
    }
  }

  render() {
    
    return (

      <div style={{color: AWSCOLORS.DARK_SQUID_INK}}>
        
        <button onClick={this.openModal} style={buttonStyle}>
          Button: Open Expanded Card
        </button>

        <div onClick={this.openModal} style={{color: AWSCOLORS.SMILE_ORANGE, margin: "5rem"}}>
          div: Open Expanded Card
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Offering Info Expanded"
        >
          {this.getBackgroundImg(this.state.data.offering_type)}

          <Tags
            offering_type={this.state.data.offering_type}
            offering_maturity_level={this.state.data.offering_maturity_level}
            place={"bottom"}
          />

          <h1 ref={subtitle => (this.subtitle = subtitle)}>
            {this.state.data.offering_type} - {this.state.data.offering_name}
          </h1>
          <p />

          <div>{this.state.data.offering_description}</div>
          <p />

          <div>
            Capability: {this.state.data.capability}
          </div>
          <p />

          <div>
            GSP / Industry Vertical: {this.state.data.gsp_vertical}
          </div>
          <p />

          <div>
            Owner:&nbsp;
            <a href={`https://phonetool.amazon.com/search?query=${this.state.data.owner}&filter_type=All+fields`} target={"_blank"}>
              {this.state.data.owner}
            </a>
          </div>
          <p />

          <div>
            Practice Group: {this.state.data.practice_group}
          </div>
          <p />

          <div>
            CAF Perspective: {this.state.data.caf_perspective}
          </div>
          <p />

          <div>
            {/* {ProgressBar} */}
            (ProgressBar)
          </div>
          <p />

          <div>
            Delivery Kit:
            {this.setTextIfNull(this.state.data.delivery_kit)}
          </div>
          <p />

          <div>
            Sales Kit:
            {this.setTextIfNull(this.state.data.sales_kit)}
          </div>
          <p />

          <div>
            Wiki Link:
            {this.setTextIfNull(this.state.data.wiki_link)}
          </div>

        </Modal>
      </div>
    );
  }
}

Modal.setAppElement(document.getElementById("root"));
export default CardLarge;

import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { AWS as AWSCOLORS } from "../../../constants/Colors";
import ReactTooltip from 'react-tooltip';
import Tags from "./Tags";
import logo_1_align from "../../../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../../../../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../../../../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../../../../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../../../../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../../../../assets/img/logo/proserve/sales_kit.svg";

const CardStyle = styled.div`
  margin: 1rem;
  background-color: white;
  box-shadow: 2px 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: all 0.2s linear;

  overflow: hidden;
  // height: 300px;
  height: 200px;
  width: 453px;
  // width: 10%;
  // if use % then single card view gets screwed up for some reason, don't use

  &:hover {
    // h-offset v-offset blur color
    box-shadow: 0px 10px 45px rgba(255, 255, 255, 0.3);
    transform: translate3D(0, -2px, 0);
  }

  .card-wrapper {
    position: relative;
    height: 100%;
    
    .text {
      // position: relative;
      // display: flex;

      .offering-name {
        position: absolute;
        top: 24%;
        margin: 0 0 2rem 0;
        padding: 0.25rem 1.5rem 1rem 1.5rem;
  
        color: ${AWSCOLORS.SMILE_ORANGE};
        font-size: 1.5rem;
  
        // text-overflow: ellipsis;
        // white-space: nowrap;
        overflow: hidden;
        // flex-wrap: wrap;
      }
  
      .practice-group {
        position: absolute;
        bottom: 12%;
        margin: 0;
        padding: 0 1.5rem 0 1.5rem;
        font-style: italic;
      }
    }

  }

  /* screen / card responsive design */
  @media only screen and (min-width: 768px) {
    flex: 1 1 calc(50% - 2rem);
  }
  @media only screen and (min-width: 992px) {
    flex: 1 1 calc(33% - 2rem);
  }
  @media only screen and (min-width: 1200px) {
    flex: 1 1 calc(25% - 2rem);
  }
  
`;

const logoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  opacity: "0.15",
};

const modalStyle = {
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

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "white",
      data: {},
      modalIsOpen: false,
    };
  }

  getBackgroundImg = () => {
    let logo = logo_sales_kit;
    switch (this.props.offering_type) {
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
        logo = logo_sales_kit;
    }

    return (
      <img alt="icon-background" src={logo} style={logoStyle} />
    );
  }

  wrapToNumCharCeil = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen)
      return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
  }

  changeColor = () => {
    var newColor = this.state.color === "white" ? "black" : "white";
    this.setState({ color: newColor });
  };

  fetchAPI = (url) => {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'table_name': 'Offerings',
          'offering_type': this.props.offering_type,
          'offering_name': this.props.offering_name,
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
        this.setState({ data: response[0]} );
      }).catch(err => {
        console.log("Error: API fetch error");
        console.log(err.message)
        console.log(this.state.err_api_fetch);
      });
  };

  openModal = () => {
    this.fetchAPI(this.props.url);
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

  getModalContent = () => {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={modalStyle}
        contentLabel="Offering Info Expanded"
      >
        {this.getBackgroundImg()}

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
    );
  }

  render() {

    // trying to display an empty div before data for modal is fetched, doesn't work
    const offeringModal = (this.state.modalIsOpen) ? this.getModalContent() : <div/> ;

    return (
      // <CardStyle style={{background: this.state.color}} onClick={this.changeColor}>
      <CardStyle>
        <div className="card-wrapper" onClick={this.openModal}>
          {this.getBackgroundImg()}
          <Tags offering_type={this.props.offering_type} offering_maturity_level={this.props.offering_maturity_level} place={"top"} />
          <div className="text">
          <div className="offering-name">{this.wrapToNumCharCeil(this.props.offering_name, 30)}</div>
            <div className="practice-group">
              <div data-tip='Practice Group' data-for='practice_group'>{this.props.practice_group}</div>
              <ReactTooltip id='practice_group' place='bottom' type='dark' effect='solid' />
            </div>
          </div>
        </div>


        {/* {this.getModalContent()} */}
        {offeringModal}

      </CardStyle>
    )
  }
}

Modal.setAppElement(document.getElementById("root"));
export default Card;
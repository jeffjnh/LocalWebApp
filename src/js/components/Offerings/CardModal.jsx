import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { getLoadingSpinner_Left } from "../../utility/LoadingSpinner";
import CardTags from "./CardTags";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import logo_1_align from "../../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../../../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../../../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../../../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../../../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../../../assets/img/logo/proserve/sales_kit.svg";
import logo_TBD from "../../../assets/img/logo/proserve/TBD.svg";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80%",
    maxWidth: "80%",
    borderRadius: "12px"
  },
  overlay: {
    zIndex: "1000"
  }
};

const logoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%",
  opacity: "0.10",
  zIndex: "-1"
};

const ModalText = styled.div`
  margin: 0.8rem 1.3rem;
  color: ${AWSCOLORS.DARK_SQUID_INK};
  
  h1 {
    color: ${AWSCOLORS.SMILE_ORANGE};
    font-weight: 700;
  }

  .offering-desc {
    margin: 20px 0;
  }

  .capability {
    margin: 20px 0;
  }

  .gsp-vertical {
    margin: 20px 0;
  }

  .owner {
    margin: 20px 0;
  }

  .practice-group {
    margin: 20px 0;
  }

  .caf {
    margin: 20px 0;
  }

  .dk {
    margin: 20px 0;
  }

  .sk {
    margin: 20px 0;
  }

  .wiki {
    margin: 20px 0;
  }
`;

const Bold = styled.div`
  display: inline;
  margin-right: 5px;
  font-weight: bold;
  text-decoration: underline;
`;

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPageLoading: true,
      data: []
    };
  }

  // when parent component 'Offerings' updates which offering
  // has been clicked on in its state
  async componentDidUpdate(prevProps) {
    // if no offering has been clicked (null in parent state),
    // or if offering clicked is the same as previously clicked
    if (!this.props.offering) {
      return;
    } else if (this.props.offering !== prevProps.offering && !this.props.fetch) {
      await this.setState({ data: this.props.offering });
      console.log(this.props.offering);
    }

    // if a new offering was clicked
    // while fetching API, render spinner
    // after fetching is done, render modal content
    if (this.props.offering !== prevProps.offering) {
      this.setState({ isPageLoading: true });
      await this.fetchAPI(this.props.url, this.props.offering);
      this.setState({ isPageLoading: false });
    }
  }

  /*
   * Fetches 1 offering from API, stores data in state:data[].
   * Param:
   *  - url: address to fetch from
   *  - offering: used in header for .offering_type & .offering_name
   */
  fetchAPI = (url, offering) => {
    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        table_name: "Offerings",
        offering_type: offering.offering_type,
        offering_name: offering.offering_name
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        } else {
          // console.log("Success: API fetched");
          // console.log(response.body);
          return response.json();
        }
      })
      .then(response => {
        // console.log("storing response to state");
        // take first one, there will only be one
        console.log(response);

        this.setState({ data: response[0] });
      })
      .catch(err => {
        // console.log("Error: API fetch error");
        // console.log(err.message);
      });
  };

  getBackgroundImg = offering_type => {
    let logo = logo_TBD;
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
      case "TBD":
      default:
        logo = logo_TBD;
    }

    return (
      <img
        alt="icon-background"
        src={logo}
        style={logoStyle}
        draggable="false"
      />
    );
  };

  setTextIfNull = data => {
    // console.log(data);
    if (data !== undefined || data != null) {
      // console.log("data is not null: " + data);
      return (
        <a href={data} target={"_blank"}>
          &nbsp;{data}
        </a>
      );
    } else {
      // console.log("data IS null: " + data);
      return " (N/A)";
    }
  };

  getMultipleOwners = () => {
    let arr = this.state.data.owner.split(", ");
    return (
      <div style={{ display: "inline-block" }}>
        {arr.map((owner, index) => (
          <div style={{ display: "inline-block" }} key={owner}>
            <a
              href={`https://phonetool.amazon.com/search?query=${owner}&filter_type=All+fields`}
              target={"_blank"}
            >
              {owner}
            </a>
            {index !== arr.length - 1 ? (
              <div style={{ display: "inline-block" }}>,&nbsp;</div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
  };

  getModalContent = () => {
    return (
      <div id="modalContent">
        {this.getBackgroundImg(this.state.data.offering_type)}
        <CardTags
          offering_type={this.state.data.offering_type}
          offering_maturity_level={this.state.data.offering_maturity_level}
          place={"bottom"}
        />

        <ModalText>
          <h1>
            {this.state.data.offering_type} - {this.state.data.offering_name}
          </h1>

          <div className="offering-desc">
            {this.state.data.offering_description}
          </div>

          <div className="capability">
            <Bold>Capability:</Bold> {this.state.data.capability}
          </div>

          <div className="gsp-vertical">
            <Bold>GSP / Industry Vertical:</Bold> {this.state.data.gsp_vertical}
          </div>

          <div className="owners">
            <Bold>Owner:</Bold>&nbsp;
            {!this.state.data.owner.includes(", ") ? (
              <a
                href={`https://phonetool.amazon.com/search?query=${
                  this.state.data.owner
                }&filter_type=All+fields`}
                target={"_blank"}
              >
                {this.state.data.owner}
              </a>
            ) : (
              this.getMultipleOwners()
            )}
          </div>

          <div className="practice-group">
            <Bold>Practice Group:</Bold> {this.state.data.practice_group}
          </div>

          <div className="caf">
            <Bold>CAF Perspective:</Bold> {this.state.data.caf_perspective}
          </div>

          <div className="dk">
            <Bold>Delivery Kit:</Bold> {this.setTextIfNull(this.state.data.delivery_kit)}
          </div>

          <div className="sk">
            <Bold>Sales Kit:</Bold> {this.setTextIfNull(this.state.data.sales_kit)}
          </div>

          <div className="wiki">
            <Bold>Wiki Link:</Bold> {this.setTextIfNull(this.state.data.wiki_link)}
          </div>
        </ModalText>
      </div>
    );
  };

  render() {
    return (
      <Modal
        isOpen={this.props.offering ? true : false}
        onRequestClose={this.props.onCloseModal}
        style={modalStyle}
        contentLabel="Offering Info Expanded"
      >
        {this.state.isPageLoading
          ? getLoadingSpinner_Left()
          : this.getModalContent()}
      </Modal>
    );
  }
}

Modal.setAppElement(document.getElementById("root"));
export default CardModal;

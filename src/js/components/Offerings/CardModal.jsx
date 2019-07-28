import React from "react";
import Modal from "react-modal";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import { getLoadingSpinner_Left } from "../../utility/LoadingSpinner";
import CardTags from "./CardTags";
import logo_1_align from "../../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../../../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../../../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../../../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../../../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../../../assets/img/logo/proserve/sales_kit.svg";

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
    borderRadius: "12px",
    color: AWSCOLORS.DARK_SQUID_INK
  },
  overlay: {}
};

const logoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  opacity: "0.10"
};

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPageLoading: true,
      data: []
    };
  }

  // async componentDidMount() {
  //   let response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  //   let json = await response.json();
  // }

  // async componentWillMount() {
  //   await this.fetchAPI();
  //   this.setState({ isPageLoading: false });
  // }

  // when parent component 'Offerings' updates which offering
  // has been clicked on in its state
  async componentDidUpdate(prevProps) {
    // if no offering has been clicked (null in parent state),
    // or if offering clicked is the same as previously clicked
    if (!this.props.offering) {
      return;
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
        "Access-Control-Allow-Origin": "*",
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
        this.setState({ data: response[0] });
      })
      .catch(err => {
        // console.log("Error: API fetch error");
        // console.log(err.message);
      });
  };

  getBackgroundImg = offering_type => {
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
        logo = logo_sales_kit;
    }

    return <img alt="icon-background" src={logo} style={logoStyle} />;
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
      <div style={{ color: AWSCOLORS.DARK_SQUID_INK }}>
        {this.getBackgroundImg(this.state.data.offering_type)}
        <CardTags
          offering_type={this.state.data.offering_type}
          offering_maturity_level={this.state.data.offering_maturity_level}
          place={"bottom"}
        />
        <h1 style={{ color: AWSCOLORS.SMILE_ORANGE }}>
          {this.state.data.offering_type} - {this.state.data.offering_name}
        </h1>
        <p />
        <div>{this.state.data.offering_description}</div>
        <p />
        <div>Capability: {this.state.data.capability}</div>
        <p />
        <div>GSP / Industry Vertical: {this.state.data.gsp_vertical}</div>
        <p />
        <div>
          Owner:&nbsp;
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
        <p />
        <div>Practice Group: {this.state.data.practice_group}</div>
        <p />
        <div>CAF Perspective: {this.state.data.caf_perspective}</div>
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

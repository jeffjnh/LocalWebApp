import React from "react";
import styled from "styled-components";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CardTags from "./CardTags";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import logo_1_align from "../../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../../../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../../../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../../../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../../../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../../../assets/img/logo/proserve/sales_kit.svg";
import logo_TBD from "../../../assets/img/logo/proserve/TBD.svg";

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
  
      .gsp-vertical {
        position: absolute;
        bottom: 12%;
        margin: 0;
        padding: 0 1.5rem 0 1.5rem;
        // font-style: italic;
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
  height: "70%",
  opacity: "0.15"
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  getBackgroundImg = () => {
    let logo = logo_TBD;
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
      case "TBD":
      default:
        logo = logo_TBD;
    }

    return (
      <img alt="icon-background" src={logo} style={logoStyle} draggable="false" />
    );
  }

  wrapToNumCharCeil = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen)
      return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + " (...)";
  }

  render() {
    return (
      <CardStyle onClick={this.props.onClick}>
        <div className="card-wrapper">
          {this.getBackgroundImg()}
          <CardTags offering_type={this.props.offering_type} offering_maturity_level={this.props.offering_maturity_level} place={"top"} />
          <div className="text">
            <div className="offering-name">{this.wrapToNumCharCeil(this.props.offering_name, 30)}</div>
            <div className="gsp-vertical">
              <OverlayTrigger placement="bottom"
                overlay={<Tooltip id="gsp_vertical"> GSP / Industry Vertical </Tooltip>}
              >
                <div>{this.props.gsp_vertical}</div>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </CardStyle>
    )
  }
}

export default Card;

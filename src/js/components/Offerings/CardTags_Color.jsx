import React from "react";
import styled from "styled-components";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { RETAIL } from "../../constants/Colors";

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0.5rem;
  padding: 10px;
`;

const Text = styled.div`
  padding: 2px 10px;
  // border: 1px solid;
  border-radius: 25px;
`;

/* 
 * NOT IN USE
 * because it looks bad visually...
 */

class CardTags_Color extends React.Component {

  getOfferingTypeColor = () => {
    let customStyle = {};
    
    switch (this.props.offering_type) {
        case "Align Offering":
        case "V1 Align Offering":
          customStyle = {
            backgroundColor: RETAIL.AURORA,
            color: "white",
          }
          break;
        case "Launch Offering":
        case "V1 Launch Offering":
        case "Foundation Launch":
          customStyle = {
            backgroundColor: RETAIL.AQUA,
            color: "white",
          }
          break;
        case "Scale Offering":
        case "V1 Scale Offering":
          customStyle = {
            backgroundColor: RETAIL.TYPHOON,
            color: "white",
          }
          break;
        case "Optimize Offering":
        case "V1 Optimize Offering":
          customStyle = {
            backgroundColor: RETAIL.FOREST,
            color: "white",
          }
          break;
        case "DK":
        case "DK Only":
          customStyle = {
            backgroundColor: RETAIL.SUMMER,
            // color: "white",
          }
          break;
        case "SK":
        case "SK Only":
          customStyle = {
            backgroundColor: RETAIL.CORAL,
            color: "white",
          }
          break;
        case "TBD":
        default:
          customStyle = {
            backgroundColor: RETAIL.LUMOS,
            color: "white",
          }
      }

    return customStyle;
  }

  getMaturityLevelColor = () => {
    let customStyle = {};
    
    switch (this.props.offering_maturity_level) {
      case "0":
        customStyle = {
          backgroundColor: "#D73027",
          color: "white",
        }
        break;
      case "1":
        customStyle = {
          backgroundColor: "#FC8D59",
          color: "white",
        }
        break;
      case "2":
        customStyle = {
          backgroundColor: "#FEE08B",
          color: "white",
        }
        break;
      case "3":
        customStyle = {
          backgroundColor: "#D9EF8B",
          // color: "white",
        }
        break;
      case "4":
        customStyle = {
          backgroundColor: "#91CF60",
          // color: "white",
        }
        break;
      case "5":
        customStyle = {
          backgroundColor: "#1A9850",
          // color: "white",
        }
        break;
      default:
        customStyle = {
          backgroundColor: "#D73027",
          // color: "white",
        }
    }

    return customStyle;
  }

  render() {

    const offeringTypeStyle = this.getOfferingTypeColor();
    const maturityLevelStyle = this.getMaturityLevelColor();

    return (
      <Tags>
        <OverlayTrigger placement={this.props.place}
          overlay={<Tooltip id="offering_type"> Offering Type </Tooltip>}
        >
          <Text style={offeringTypeStyle}>{this.props.offering_type}</Text>
        </OverlayTrigger>

        <OverlayTrigger placement={this.props.place}
          overlay={<Tooltip id="offering_maturity_level"> Maturity Level </Tooltip>}
        >
          <Text style={maturityLevelStyle}>{this.props.offering_maturity_level}</Text>
        </OverlayTrigger>
      </Tags>
    );
  }
}

export default CardTags_Color;

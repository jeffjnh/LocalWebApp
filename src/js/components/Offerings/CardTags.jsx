import React from "react";
import styled from "styled-components";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AWS as AWSCOLORS } from "../../constants/Colors";

const Tags = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0.5rem;
  padding: 10px;
  color: ${AWSCOLORS.DARK_SQUID_INK};
`;

const Text = styled.div`
  padding: 2px 10px;
  border: 1px solid black;
  border-radius: 25px;
`;

class CardTags extends React.Component {
  render() {
    return (
      <Tags>
        <OverlayTrigger placement={this.props.place}
          overlay={<Tooltip id="offering_type"> Offering Type </Tooltip>}
        >
          <Text>{this.props.offering_type}</Text>
        </OverlayTrigger>

        <OverlayTrigger placement={this.props.place}
          overlay={<Tooltip id="offering_maturity_level"> Maturity Level </Tooltip>}
        >
          <Text>{this.props.offering_maturity_level}</Text>
        </OverlayTrigger>
      </Tags>
    );
  }
}

export default CardTags;

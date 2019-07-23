import React from "react";
import styled from "styled-components";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import NavBar from "./NavBar";
import ReactTooltip from "react-tooltip";
import logo_1_align from "../../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../..//../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../..//../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../..//../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../..//../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../..//../assets/img/logo/proserve/sales_kit.svg";

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";

class CardLarge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "white",
      modalShow: true
    };
  }

  // MyVerticallyCenteredModal(props) {
  //   return (
  //     <Modal
  //       {...props}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Modal heading
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <h4>Centered Modal</h4>
  //         <p>
  //           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
  //           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
  //           consectetur ac, vestibulum at eros.
  //         </p>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }

  changeColor = () => {
    var newColor = this.state.color === "white" ? "black" : "white";
    this.setState({ color: newColor });
    // filter: blur(8px);
  };

  render() {
    return (
      <div>
        <NavBar />

        <div style={{ background: this.state.color }} onClick={this.changeColor}>
          hi
          <Button
            variant="primary"
            onClick={this.setState()}
          >

          </Button>
          {/* <Button variant="primary" onClick={ this.setState({ modalShow: true }) }>
              Launch vertically centered modal
            </Button> */}
          {/* <MyVerticallyCenteredModal
              show={modalShow}
              onHide={ this.setState({ modalShow: true }) }
            /> */}
        </div>
      </div>
    );
  }
}

export default CardLarge;

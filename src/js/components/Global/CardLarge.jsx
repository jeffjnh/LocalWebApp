import React from "react";
// import styled from "styled-components";
import Modal from "react-modal";
import { AWS as AWSCOLORS } from "../../constants/Colors";
import NavBar from "./NavBar";
// import ReactTooltip from "react-tooltip";
// import logo_1_align from "../../../assets/img/logo/proserve/1_align_gray.png";
// import logo_2_launch from "../..//../assets/img/logo/proserve/2_launch_gray.png";
// import logo_3_scale from "../..//../assets/img/logo/proserve/3_scale_gray.png";
// import logo_4_optimize from "../..//../assets/img/logo/proserve/4_optimize_gray.png";
// import logo_delivery_kit from "../..//../assets/img/logo/proserve/delivery_kit.svg";
// import logo_sales_kit from "../..//../assets/img/logo/proserve/sales_kit.svg";

// import Button from "react-bootstrap/Button";
// import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import Modal from "react-bootstrap/Modal";
// import ModalDialog from "react-bootstrap/ModalDialog";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class CardLarge extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   color: "white",
    //   showModal: true
    // };

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = AWSCOLORS.SMILE_ORANGE;
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  // changeColor = () => {
  //   var newColor = this.state.color === "white" ? "black" : "white";
  //   this.setState({ color: newColor });
  //   // filter: blur(8px);
  // };

  render() {
    return (
      // <div>
      //   <NavBar />

      //   <div style={{ background: this.state.color }} onClick={this.changeColor}>
      //     hi
      //     <Button
      //       variant="primary"
      //       onClick={this.setState({showModal: true})}
      //     >

      //     </Button>
      //     {/* <Button variant="primary" onClick={ this.setState({ modalShow: true }) }>
      //         Launch vertically centered modal
      //       </Button> */}
      //     {/* <MyVerticallyCenteredModal
      //         show={modalShow}
      //         onHide={ this.setState({ modalShow: true }) }
      //       /> */}
      //   </div>
      // </div>

      <div>
        <NavBar />

        <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Offering Info Expanded"
        >

          <h1 ref={subtitle => (this.subtitle = subtitle)}>
            Title
          </h1>

          <div
            id="inside-the-modal"
            style={{ color: AWSCOLORS.DARK_SQUID_INK }}
          >
            Click button or outside the modal to close
          </div>

        </Modal>
      </div>
    );
  }
}

Modal.setAppElement(document.getElementById('root'));
export default CardLarge;

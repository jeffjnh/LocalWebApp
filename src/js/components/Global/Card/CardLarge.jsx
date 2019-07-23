import React from "react";
// import styled from "styled-components";
import Modal from "react-modal";
import { AWS as AWSCOLORS } from "../../../constants/Colors";
import { OFFERINGSDATA } from "../../../constants/OFFERINGSDATA";
import NavBar from "../NavBar";
import Tags from "./Tags";
// import ReactTooltip from "react-tooltip";
// import logo_1_align from "../../../../assets/img/logo/proserve/1_align_gray.png";
// import logo_2_launch from "../../../../assets/img/logo/proserve/2_launch_gray.png";
// import logo_3_scale from "../../../../assets/img/logo/proserve/3_scale_gray.png";
// import logo_4_optimize from "../../../../assets/img/logo/proserve/4_optimize_gray.png";
// import logo_delivery_kit from "../../../../assets/img/logo/proserve/delivery_kit.svg";
// import logo_sales_kit from "../../../../assets/img/logo/proserve/sales_kit.svg";

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
    transform: "translate(-50%, -50%)",

    color: AWSCOLORS.DARK_SQUID_INK
  }
};

// const modalContentStyle = {
//     display: "block",
// };

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

  // func createCheckboxes = (pass in optional param to JSX) = > (JSX element[] to be returned)
  // Iterates over OPTIONS array and calls this.creatCheckbox function for each item in that array
  // If we want to do this as arrays:
  // createCheckboxes = () => (OPTIONS.map(this.createCheckbox));
  // createCheckboxes = () => (Object.keys(this.state.checkboxes).map(this.createCheckbox));

  // func createCheckbox = (single option from OPTIONS.map) => (JSX element[] to be returned)
  // Returns an array of OPTIONS.length instances of Checkbox components
  // createCheckbox = option => (
  //   <Checkbox
  //     label={option}
  //     isSelected={this.state.checkboxes[option]}
  //     onCheckboxChange={this.handleCheckboxChange}
  //     key={option}
  //   />
  // );

  // changeColor = () => {
  //   var newColor = this.state.color === "white" ? "black" : "white";
  //   this.setState({ color: newColor });
  //   // filter: blur(8px);
  // };

  render() {
    const data = OFFERINGSDATA[0];

    // console.log(data);

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
          <Tags
            offering_type={data.offering_type}
            offering_maturity_level={data.offering_maturity_level}
          />

          <h1 ref={subtitle => (this.subtitle = subtitle)}>
            {data.offering_type} - {data.offering_name}
          </h1>
          <p />

          <div>{data.offering_description}</div>
          <p />

          <div>
            Capability: {data.capability}
          </div>
          <p />

          <div>
            GSP / Industry Vertical: {data.gsp_vertical}
          </div>
          <p />

          <div>
            Owner:&nbsp;
            <a href={`https://phonetool.amazon.com/search?query=${data.owner}&filter_type=All+fields`}>
              {data.owner}
            </a>
          </div>
          <p />

          <div>
            Practice Group: {data.practice_group}
          </div>
          <p />

          <div>
            CAF Perspective: {data.caf_perspective}
          </div>
          <p />

          <div>
            {/* {ProgressBar} */}
            (ProgressBar)
          </div>
          <p />

          <div>
            Delivery Kit: {data.delivery_kit}
          </div>
          <p />

          <div>
            Sales Kit: {data.sales_kit}
          </div>
          <p />

          <div>
            Wiki Link:
            <a href={data.wiki_link}>
              &nbsp;{data.wiki_link}
            </a>
          </div>

        </Modal>
      </div>
    );
  }
}

Modal.setAppElement(document.getElementById("root"));
export default CardLarge;

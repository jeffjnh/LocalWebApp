import React from "react";
import styled from "styled-components";
import ReactTooltip from 'react-tooltip'
import { firstBy } from "thenby";
import logo_1_align from "../../assets/img/logo/proserve/1_align_gray.png";
import logo_2_launch from "../../assets/img/logo/proserve/2_launch_gray.png";
import logo_3_scale from "../../assets/img/logo/proserve/3_scale_gray.png";
import logo_4_optimize from "../../assets/img/logo/proserve/4_optimize_gray.png";
import logo_delivery_kit from "../../assets/img/logo/proserve/delivery_kit.svg";
import logo_sales_kit from "../../assets/img/logo/proserve/sales_kit.svg";

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query/?Table_Name=Offerings";

const Card = styled.div`
  margin: 1rem;
  background-image: ${logo_1_align};
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
    
    .card-img {
      position: absolute;
      // width: 60%;
      width: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // z-index: -1;
    }

    .text {
      // position: relative;
  
      // display: flex;

      .offering-name {
        margin: 0 0 2rem 0;
        padding: 1.5rem 1.5rem 1rem 1.5rem;
  
        color: orange;
        font-size: 1.5rem;
  
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        // flex-wrap: wrap;
      }
  
      .practice-group {
        margin: 0;
        padding: 0 1.5rem 1.5rem 1.5rem;
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

const Tags = styled.div `
  margin-top: 0;
  margin-right: 2px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;

  .type {
    flex: 0 0 90%;
  }
  .maturity {
    flex: 1;
    text-align: right;
  }
  span {
    padding: 2px 10px;
    border: 1px solid black;
    border-radius: 25px;
  }
`;

class Testing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err_api_fetch: null,
      color: 'white'
    };
  }

  componentWillMount() {
    // const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query/?Table_Name=Offerings&Index_Name=GSP-index&GSP_Vertical=AI";
    this.fetchAPI(url);
  }

  fetchAPI = url => {
    fetch(url)
      // .then(response => response.json())
      .then(response => {
        console.log('fisrt then');
        if (!response.ok) {
          this.setState({ err_api_fetch: true });
          throw response;
        } else {
          this.setState({ err_api_fetch: false });
          console.log("Success: API fetched");
          return response.json();
        }
      })
      .then(response => {
        console.log("storing response to state");
        this.setState({ data: response });
      })
      .catch(err => {
        console.log("Error: API fetch error");
        console.log(this.state.err_api_fetch);
      });
  };

  appendQueryToURL = () => {
    // &Index_Name=GSP-index&GSP_Vertical=AI

  }

  sortData = () => {
    const order_of_offering_types = [
      'Align Offering', 'V1 Align Offering',
      'Launch Offering', 'V1 Launch Offering', 'Foundation Launch',
      'Scale Offering', 'V1 Scale Offering',
      'Optimize Offering', 'V1 Optimize Offering',
      'DK', 'DK Only',
      'SK', 'SK Only',
      'TBD'
    ];
    var offerCompare = (o1, o2) => {
      return order_of_offering_types.indexOf(o1) - order_of_offering_types.indexOf(o2);
    }
    this.state.data.sort(
      firstBy("Offering_Type", {cmp: offerCompare, direction: 1})
      .thenBy((o1, o2) => o1.Offering_Maturity_Level - o2.Offering_Maturity_Level, -1)
    );
  }

  appendDataToCard = (props) => {
    
    this.sortData();

    let cards = this.state.data.map(offering => {

      let logo = logo_sales_kit;
      let opacity = 0.15;

      switch (offering.Offering_Type) {
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
        // <Card style={{background:this.state.color}} onClick={this.changeColor} key={`${offering.Offering_Name} + ${offering.Offering_Type}`}>
        <Card style={{background:this.state.color}} key={`${offering.Offering_Name} + ${offering.Offering_Type}`}>
          
          <div className="card-wrapper" onClick={ this.enlargeCard } >
            <img alt="icon-background" className="card-img" src={logo} style={{opacity}} />
            <Tags>
              <div className="type">
                <tooltip data-tip='Offering Type' data-for='offering_type'><span>{offering.Offering_Type}</span></tooltip>
                <ReactTooltip id='offering_type' type='dark' delayShow={1000} effect='solid' />
              </div>
              <div className="maturity">
                <tooltip data-tip='Maturity Level' data-for='offering_maturity_level'><span>{offering.Offering_Maturity_Level}</span></tooltip>
                <ReactTooltip id='offering_maturity_level' type='warning' delayShow={1000} effect='solid' />
              </div>
            </Tags>
            <div className="text">
              <div className="offering-name">{offering.Offering_Name}</div>
              <div className="practice-group">
                <tooltip data-tip='Practice Group'>{offering.Practice_Group}</tooltip>
                <ReactTooltip place='bottom' type='success' delayShow={1000} effect='solid' />
              </div>
            </div>
          </div>

          {/*

          {offering.Offering_Type}
          {offering.Offering_Maturity_Level}

          {offering.Offering_Name}
          {offering.Offering_Description}
          {offering.Capability} / {offering.GSP_Vertical}
          {offering.Owner}
            <a href ={`https://phonetool.amazon.com/search?query=${offering.Owner}&filter_type=All+fields`}> {offering.Owner} </a>
          {offering.Practice_Group}
          {offering.CAF_Perspective}

          {ProgressBar}
          {offering.Delivery_Kit}
          {offering.Sales_Kit}
          {offering.Wiki_Link}
          
          */}

        </Card>
      );
    });
    return cards;
  };

  changeColor = () => {
    var newColor = this.state.color === 'white' ? 'black' : 'white';
    this.setState({ color: newColor });
  }

  render() {
    return(
      this.state.err_api_fetch === true ? 
      <div id="root-offerings">
        <h1>Error! Please check console for error messages</h1>
      </div>
        :
      <div id="root-offerings">
        <div className="offerings-card-container">
          {this.appendDataToCard()}
        </div>
      </div>
    )
  }
}

export default Testing;

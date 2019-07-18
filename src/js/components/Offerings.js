import React from "react";
import NavBar from './NavBar';
// import { OFFERINGSDATA_SHORT } from "../constants/OFFERINGSDATA_SHORT";
import { firstBy } from "thenby";
import Card from "../components/Card"

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query";

// const OFFERINGS_HEADERS = {
    //   Index_Name = 'GSP-index',
    //   offering_name = '',
    //   Offering_Type = '',
    //   CAF_Perspective = '',
    //   Capability = '',
    //   gsp_vertical = '',
    //   Offering_Description = '',
    //   offering_maturity_level = '',
    //   Owner = '',
    //   Practice_Group = '',
    //   Wiki_Link = '',
    //   Delivery_Kit = '',
    //   Sales_Kit = '',
    // };

class Offerings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      err_api_fetch: null,
      checkBoxValue: {},
      color: 'white',
    };
  }

  componentWillMount() {
    this.fetchAPI(url);
    // this.setState( {data: OFFERINGSDATA_SHORT} );
  }

  // onResetValue = event => {
  //   this.setState({ value: '&' });
  //   console.log(this.state.value);
  // }

  // onChangeValue = event => {
  //   this.setState({ value: this.state.value + event.target.value });
  //   console.log(this.state.value);
  // }

  appendQueryToURL = (event) => {
    // &Index_Name=GSP-index&gsp_vertical=AI

    if (event.target.value === "offering_maturity_level") {
      // this.setState({checkBoxValue : {'offering_maturity_level': event.target.value }});
      this.setState({checkBoxValue : {'offering_maturity_level': '3' }});
    }

    if (event.target.value === "gsp_vertical") {
      // this.setState({checkBoxValue : { 'gsp_vertical': event.target.value }});
      this.setState({checkBoxValue : { 'gsp_vertical': 'AI' }});
    }

    this.fetchAPI();
  }



  fetchAPI = (url) => {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json',
          'Table_Name':'Offerings',
          // "Index_Name":"short-index"
        }
      }
    ).then(response => {
        if (!response.ok) {
          this.setState({ err_api_fetch: true });
          throw response;
        } else {
          this.setState({ err_api_fetch: false });
          console.log("Success: API fetched");
          console.log(response.body);
          return response.json();
        }
      }).then(response => {
        console.log("storing response to state");
        this.setState({ data: response });
      }).catch(err => {
        console.log("Error: API fetch error");
        console.log(err.message)
        console.log(this.state.err_api_fetch);
      });
  };

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
      firstBy("offering_type", {cmp: offerCompare, direction: 1})
      .thenBy((o1, o2) => o1.offering_maturity_level - o2.offering_maturity_level, -1)
    );
  }

  onClearFetchedData = () => {
    this.setState({ data: [] });
  }

  appendDataToCard = () => {
    this.sortData();

    let cards = this.state.data.map(offering => {
      return (
        <Card
          key={`${offering.offering_name} + ${offering.offering_type}`}
          {...offering}
        />
      )
    });

    return cards;
  };

  changeColor = () => { 
    var newColor = this.state.color === 'white' ? 'black' : 'white'; 
    this.setState({ color: newColor });
    // filter: blur(8px);
  }

  render() {

    // console.log(this.state.checkBoxValue);

    return(
      // this.state.err_api_fetch === true ?
      // <div id="root-offerings">
      //   <h1>Error! Please check console for error messages</h1>
      // </div>
      //   :

      // <div id="root-offerings" style={{background:this.state.color}} onClick={this.changeColor}>
      <div>
        <NavBar></NavBar>
        <div id="root-offerings">
          {/* <div style={{color:'#ffffff'}}>
            Check:
            <label> offering_maturity_level = '3' </label>
            <input type="checkbox" value="offering_maturity_level" onChange={this.appendQueryToURL} />
            <label> gsp_vertical = 'AI' </label>
            <input type="checkbox" value="gsp_vertical" onChange={this.appendQueryToURL} />
            <input type="submit" name="reset" value="reset" onChange={this.onResetValue} />
          </div> */}

          <div className="offerings-card-container">
            {this.appendDataToCard()}
          </div>

        </div>
      </div>
    )
  }
}

export default Offerings;

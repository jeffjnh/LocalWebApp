import React from "react";
import { OFFERINGSDATA } from "../constants/OFFERINGSDATA";
import { firstBy } from "thenby";
import Card from "../components/Card"

// const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query/?Table_Name=Offerings";
const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query/";

// const OFFERINGS_HEADERS = {
    //   Index_Name = 'GSP-index',
    //   Offering_Name = '',
    //   Offering_Type = '',
    //   CAF_Perspective = '',
    //   Capability = '',
    //   GSP_Vertical = '',
    //   Offering_Description = '',
    //   Offering_maturity_Level = '',
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
      checkBoxValue: {}
    };
  }

  componentWillMount() {
    // this.fetchAPI(url);
    this.setState( {data: OFFERINGSDATA} );
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
    // &Index_Name=GSP-index&GSP_Vertical=AI

    if (event.target.value === "Offering_Maturity_Level") {
      // this.setState({checkBoxValue : {'Offering_Maturity_Level': event.target.value }});
      this.setState({checkBoxValue : {'Offering_Maturity_Level': '3' }});
    }

    if (event.target.value === "GSP_Vertical") {
      // this.setState({checkBoxValue : { 'GSP_Vertical': event.target.value }});
      this.setState({checkBoxValue : { 'GSP_Vertical': 'AI' }});
    }

    this.fetchAPI();
  }

  fetchAPI = (url) => {
    fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Table_Name' : 'Offerings'
        }
      }
      // ,
      // {
      //   method: 'GET',
      //   mode: 'cors',
      //   crossDomain: true,
      //   headers: {
      //     'Content-Type' : 'application/json',
      //     'Access-Control-Allow-Origin' : '*',
      //     'Table_Name' : 'Offerings',
      //     'CAF_Perspective' : 'CAF'
      //   }
      // }
    )
      .then(response => {
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

  onClearFetchedData = () => {
    this.setState({ data: [] });
  }

  appendDataToCard = () => {
    this.sortData();

    let cards = this.state.data.map(offering => {
      return (
        <Card
          key={`${offering.Offering_Name} + ${offering.Offering_Type}`}
          {...offering}
        />
      )
    });

    return cards;
  };

  render() {

    // console.log(this.state.checkBoxValue);

    return(
      // this.state.err_api_fetch === true ? 
      // <div id="root-offerings">
      //   <h1>Error! Please check console for error messages</h1>
      // </div>
      //   :

      <div id="root-offerings">
        
        {/* <div style={{color:'#ffffff'}}>
          Check: 
          <label> Offering_Maturity_Level = '3' </label>
          <input type="checkbox" value="Offering_Maturity_Level" onChange={this.appendQueryToURL} />
          <label> GSP_Vertical = 'AI' </label>
          <input type="checkbox" value="GSP_Vertical" onChange={this.appendQueryToURL} />
          <input type="submit" name="reset" value="reset" onChange={this.onResetValue} />
        </div> */}
        
        <div className="offerings-card-container">
          {this.appendDataToCard()}
        </div>

      </div>
    )
  }
}

export default Offerings;

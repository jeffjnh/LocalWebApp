import React from 'react';
import NavBar from './Global/NavBar';
import FilterBar from './FilterBar/FilterBar';
import Checkbox_Form from './FilterBar/Checkbox_Form';
// import styled from 'styled-components';


// const OFFERING_TYPE = ["Align", "Launch", "Scale", "Optimize"];

// const MATURITY_LEVEL = ["5", "4", "3", "2", "1", "0"];

// const GSP_INDUSTRYVERTICALS = [
//   "Advisory", "AI", "Amazon Connect", "Analytics Big Data", "CAF", "Database", "DevOps", "Elemental", "End User Compute", "HPC", "IoT", "Microsoft", "Migrations", "Operational Integration", "SAP", "SAS (Security Assurance Services)", "Security",
//   "Automotive", "FinServ (Financial Services)", "Healthcare & Life Sciences", "Manufacturing", "Media & Entertainment", "Oil & Gas", "Retail", "Telecom"
// ];

const OFFERING_TYPE = {
  "Align": false,
  "Launch": false,
  "Scale": false,
  "Optimize": false
};

const MATURITY_LEVEL = {
  "5": false,
  "4": false,
  "3": false,
  "2": false,
  "1": false,
  "0": false
};

const GSP_INDUSTRYVERTICALS = {
  "Advisory": false,
  "AI": false,
  "Amazon Connect": false,
  "Analytics Big Data": false,
  "CAF": false,
  "Database": false,
  "DevOps": false,
  "Elemental": false,
  "End User Compute": false,
  "HPC": false,
  "IoT": false,
  "Microsoft": false,
  "Migrations": false,
  "Operational Integration": false,
  "SAP": false,
  "SAS (Security Assurance Services)": false,
  "Security": false,

  "Automotive": false,
  "FinServ (Financial Services)": false,
  "Healthcare & Life Sciences": false,
  "Manufacturing": false,
  "Media & Entertainment": false,
  "Oil & Gas": false,
  "Retail": false,
  "Telecom": false
};

class Testing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: {
        OFFERING_TYPE,
        MATURITY_LEVEL,
        GSP_INDUSTRYVERTICALS
      }
    };

    // this.state = {

    // };
  }

  printAll = () => {
    const allData = [];

    for (let[key, value] of Object.entries(this.state.filters["OFFERING_TYPE"])) {
      allData.push(
          <div>
            {key} : {value.toString()}
          </div>
      )
    }

    for (let[key, value] of Object.entries(this.state.filters["MATURITY_LEVEL"])) {
      allData.push(
          <div>
            {key} : {value.toString()}
          </div>
      )
    }

    for (let[key, value] of Object.entries(this.state.filters["GSP_INDUSTRYVERTICALS"])) {
      allData.push(
          <div>
            {key} : {value.toString()}
          </div>
      )
    }

    return allData;
  }

  render() {

    return (
      <React.Fragment>
        <NavBar></NavBar>
        <FilterBar></FilterBar>

        {
          this.printAll()
        }

        {/* <Checkbox_Form></Checkbox_Form> */}
      </React.Fragment>
    );

    /*

    <!DOCTYPE html>
<html>
<body>

<script>

const filters = {
	type : {
      align: true,
      launch: false,
    },
  	maturity: {
      5: true,
      4: true,
	},
	gsp : {
      advisory: true,
      ai: true,
    }
}

for (let [key, value] of Object.entries(filters["gsp"])) {
  console.log(`${key}: ${value}`);
}

</script>

</body>
</html> 

     */
  }

}

export default Testing;

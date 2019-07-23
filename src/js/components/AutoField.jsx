import React from 'react';
import AutoSuggest from 'react-autosuggest';
import autofield from '../../scss/ui/autofield.scss';
import IsolatedScroll from 'react-isolated-scroll';

const url = "https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/db/query";

let customerNames = [];
let mappedFlag = false;

const getSuggestions = value => {
    if( !mappedFlag ){
        customerNames = [...new Set(customerNames)].sort();
        let tempData = customerNames.map( customer => {
            return ({name:customer})
        });
        customerNames = tempData;
        mappedFlag = true;
    }

    return(
        [...new Set(
            customerNames.filter(
                sug => sug.name.toLowerCase().startsWith(value.toLowerCase())).concat(
            customerNames.filter(
                obj => obj.name.toLowerCase().includes(value.toLowerCase())
            ))
        )]
    );
};



const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);



async function genData() {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json',
          'table_name':'OfferingSales',
          "index_name":"customer_name-index"
        }
      }
    ).then(response => {
        if (!response.ok) {
          throw response;
        } else {
            console.log("Success: API fetched");
            return response.json();
        }
      }).then(response =>{
        customerNames = response.map( obj => obj.customer_name);
      }).catch(err => {
        console.log("Error: API fetch error");
        console.log(err.message)
      });
}



class AutoField extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value:'',
            suggestions:[],
        };
        genData();
    }

    onChangeHandler = (event, {newValue}) => {
        this.setState({
            value:newValue
        });
    };
    
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions:[]
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json',
                    'table_name':'OfferingSales',
                    // "index_name":"customer_name-index"
                    'customer_name': suggestionValue,
                }
            }
        ).then(response => {
            if (!response.ok) {
                throw response;
            } else {
                console.log("Success: API fetched");
                return response.json();
            }
        }).then(response =>{
            // customerNames = response.map( obj => obj.customer_name);
            console.log(response);
            this.props.stateSetter(response, suggestionValue);
        }).catch(err => {
            console.log("Error: API fetch error");
            console.log(err.message)
        });
    };



    render(){

        const {value, suggestions} = this.state;

        const inputProps={
            placeholder:"Company Name",
            value,
            onChange:this.onChangeHandler

        }


        return(
            <AutoSuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={this.onSuggestionSelected}
                // renderSuggestionsContainer={renderSuggestionsContainer}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }

}

export default AutoField;
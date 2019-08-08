import React from 'react';
import AutoSuggest from 'react-autosuggest';
import autofield from '../../scss/ui/autofield.scss';

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
    // console.log( customerNames);

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






class AutoField extends React.Component{






    async genData() {
        console.log(this.props.table);
        console.log(this.props.index);
        fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json',
                    'table_name':this.props.table,
                    "index_name":this.props.index
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
            console.log(response);
            if( !this.props.jointData )
                customerNames = response.map(obj => obj[this.props.indexedType]);
            else
                customerNames = response.map(obj => (obj[this.props.indexedType] + "-" + obj[this.props.secondType]));
        }).catch(err => {
            console.log("Error: API fetch error");
            console.log(err.message)
        });
    }


    constructor(props){
        super(props);
        this.state = {
            value:'',
            suggestions:[],
        };
        if( customerNames.length === 0)
            this.genData();
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
                    'table_name':this.props.table,
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
            placeholder:this.props.placeText,
            value,
            onChange:this.onChangeHandler

        }


        return(
            <div>
                <link type={'text/scss'} rel={"stylesheet"} href={autofield}/>
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
            </div>
        );
    }

}

export default AutoField;
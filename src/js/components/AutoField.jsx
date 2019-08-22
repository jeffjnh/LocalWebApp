import React from "react";
import AutoSuggest from "react-autosuggest";

const url =
	"https://avqdv9au27.execute-api.us-east-1.amazonaws.com/PROD/api/db/query";

var customerNames = [];
let mappedFlag = false;

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class AutoField extends React.Component {
	wipe = () => {
		this.setState({ value: "" });
	};

	getSuggestions = value => {
		if (!mappedFlag) {
			customerNames = [...new Set(customerNames)].sort();
			customerNames = customerNames.map(customer => {
				return { name: customer };
			});
			mappedFlag = true;
		}
		// console.log( customerNames);
		let cnam = customerNames;
		try {
			console.log(cnam.length);
			console.log(value.toLowerCase());
			return [
				...new Set(
					cnam
						.filter(sug =>
							sug.name
								.toLowerCase()
								.startsWith(value.toLowerCase())
						)
						.concat(
							cnam.filter(obj =>
								obj.name
									.toLowerCase()
									.includes(value.toLowerCase())
							)
						)
				)
			];
		} catch (e) {
			mappedFlag = false;
			this.genData();
			console.log(e);
			return [];
		}
	};

	async genData() {
		console.log(this.props.table);
		console.log(this.props.index);
		fetch(url, {
			method: "GET",
			mode: "cors",
			headers: {
				// 'Access-Control-Allow-Origin':'*',
				"Content-Type": "application/json",
				table_name: this.props.table,
				index_name: this.props.index
			}
		})
			.then(response => {
				if (!response.ok) {
					throw response;
				} else {
					console.log("Success: API fetched");
					return response.json();
				}
			})
			.then(response => {
				console.log(response);
				if (!this.props.jointData)
					customerNames = response.map(
						obj => obj[this.props.indexedType]
					);
				else
					customerNames = response.map(
						obj =>
							obj[this.props.indexedType] +
							"|" +
							obj[this.props.secondType]
					);

				this.setState({ waiting: false });
			})
			.catch(err => {
				console.log("Error: API fetch error");
				console.log(err.message);
			});
	}

	constructor(props) {
		super(props);
		this.state = {
			value: "",
			suggestions: [],
			waiting: true,
			customerNames: []
		};
		if (customerNames.length === 0) {
			console.log("REGENDATAAAAAAAAAA");
			this.genData();
		}
	}

	onChangeHandler = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	onSuggestionSelected = (
		event,
		{ suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
	) => {
		fetch(url, {
			method: "GET",
			mode: "cors",
			headers: {
				// 'Access-Control-Allow-Origin':'*',
				"Content-Type": "application/json",
				table_name: this.props.table,
				// "index_name":"customer_name-index"
				customer_name: suggestionValue
			}
		})
			.then(response => {
				if (!response.ok) {
					throw response;
				} else {
					console.log("Success: API fetched");
					return response.json();
				}
			})
			.then(response => {
				// customerNames = response.map( obj => obj.customer_name);
				console.log(response);
				this.props.stateSetter(response, suggestionValue);
			})
			.catch(err => {
				console.log("Error: API fetch error");
				console.log(err.message);
			});
	};

	render() {
		const { value, suggestions } = this.state;

		const inputProps = {
			placeholder: this.props.placeText,
			value,
			onChange: this.onChangeHandler
		};

		return (
			<div style={{ margin: "0px" }}>
				<AutoSuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={
						this.onSuggestionsFetchRequested
					}
					onSuggestionsClearRequested={
						this.onSuggestionsClearRequested
					}
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

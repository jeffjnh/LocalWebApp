import React, { Component } from "react";
import NavBar from "../utility/NavBar";
// import Table from "react-bootstrap/Table";
import { AWS as AWSCOLORS } from "../constants/Colors";
// import Toggles from "./Toggles";
import AutoField from "./AutoField";
import "./CustomerStyles.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import Card from "./Offerings/Card";
// import CardModal from "./Offerings/CardModal";

const match_predict_url =
	"https://vdci4imfbh.execute-api.us-east-1.amazonaws.com/Prod/api/customer/match";

class Customer extends Component {
	state = {
		customer_name: "",
		customer_sales: [],
		matches: [],
		suggestions: [],
		visible: new Set(),
		row_selected: -1
	};

	customerStateUpdate = (response_object, name) => {
		this.setState({
			customer_sales: response_object,
			customer_name: name
		});

		this.findPredictions(response_object);
	};

	findPredictions = sales => {
		fetch(match_predict_url, {
			method: "GET",
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"access-control-allow-headers": "*",
				"Content-Type": "application/json",
				sales: JSON.stringify(sales)
			}
		})
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
				console.log(response);
				this.setState({
					matches: response["matches"],
					suggestions: response["suggestions"].flat()
				});
			})
			.catch(err => {
				console.log("Error: API fetch error");
				console.log(err.message);
				console.log(this.state.err_api_fetch);
			});
	};

	onRowClick = (state, rowInfo, column, instance) => {
		return {
			onClick: (e, handleOriginal) => {
				// console.log(rowInfo + " " + column + " " + state);
				console.log("This row clicked:", rowInfo.row);
				console.log("This State clicked:", state);
				console.log("This column clicked:", column);
				if (handleOriginal) {
					handleOriginal();
				}
			}
			// style
		};
	};

	onColorClick = (state, rowInfo, column) => {
		if (typeof rowInfo !== "undefined") {
			return {
				onClick: (e, handleOriginal) => {
					this.setState({
						row_selected: rowInfo.index
					});
					if (handleOriginal) {
						handleOriginal();
					}
				},
				style: {
					background:
						rowInfo.index === this.state.row_selected
							? "green"
							: "white",
					color:
						rowInfo.index === this.state.row_selected
							? "white"
							: "black"
				}
			};
		} else {
			return {
				onClick: (e, handleOriginal) => {
					if (handleOriginal) {
						handleOriginal();
					}
				},
				style: {
					background: "white",
					color: "black"
				}
			};
		}
	};
	render() {
		let titles = ["name", "idNum"];
		// const container_style = {
		// 	border: "3px solid white",
		// 	borderLeft: "3px solid red",
		// 	borderRight: "3px solid green",
		// 	width: "25%"
		// };
		console.log(titles[0]);
		return (
			<div>
				{/*Navigation Bar*/}
				<NavBar />

				{/*AutoField Search bar for Customer Data*/}
				<div style={{ color: AWSCOLORS.DARK_SQUID_INK }}>
					<AutoField stateSetter={this.customerStateUpdate} />
				</div>

				<div>
					<h2
						style={{ color: AWSCOLORS.SMILE_ORANGE }}
						className="text-center"
					>
						Recommended Offerings
					</h2>

					<div
						style={{
							margin: "40px",
							color: AWSCOLORS.BLACK,
							backgroundColor: AWSCOLORS.WHITE,
							borderRadius: "10px"
						}}
					>
						<ReactTable
							data={this.state.suggestions} // add data
							getTdProps={this.onRowClick}
							getTrProps={this.onColorClick}
							columns={[
								{
									Header: "Offering Information",
									columns: [
										{
											Header: "Offering Name",
											accessor: "offering_name"
										},
										{
											Header: "Offering Type",
											accessor: "offering_type"
										},
										{
											Header: "GSP Vertical",
											accessor: "gsp_vertical"
										},
										{
											Header: "Maturity Level",
											accessor: "offering_maturity_level"
										},
										{
											Header: "Owner",
											accessor: "owner"
										},
										{
											Header: "Wiki",
											accessor: "wiki_link",
											Cell: props => (
												<a
													target={"_blank"}
													href={props.value}
												>
													{props.value}
												</a>
											)
										},
										{
											Header: "Delivery Kit",
											accessor: "delivery_kit",
											Cell: props => (
												<a
													target={"_blank"}
													href={props.value}
												>
													{props.value}
												</a>
											)
										},
										{
											Header: "Sales Kit",
											accessor: "sales_kit",
											Cell: props => (
												<a
													target={"_blank"}
													href={props.value}
												>
													{props.value}
												</a>
											)
										}
									]
								}
							]}
							defaultPageSize={5}
							style={{
								height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
							}}
							className="-striped -highlight"
						/>
						<br />
						<br />
					</div>

					<h2
						style={{ color: AWSCOLORS.SMILE_ORANGE }}
						className="text-center"
					>
						Offerings from SalesForce
					</h2>

					<div
						style={{
							margin: "40px",
							color: AWSCOLORS.BLACK,
							backgroundColor: AWSCOLORS.WHITE,
							borderRadius: "10px"
						}}
					>
						<ReactTable
							data={this.state.customer_sales}
							getTdProps={this.onRowClick}
							columns={[
								{
									Header: "Customer Information",
									columns: [
										{
											Header: "Product Name",
											accessor: "product_name"
										},
										{
											Header: "Owner Name",
											accessor: "owner_name"
										},
										{
											Header: "Practice",
											accessor:
												"practice_lookup-practice_name"
										}
									]
								},
								{
									Header: "General Information",
									columns: [
										{
											Header: "Date",
											accessor: "close_date"
										},
										{
											Header: "Stage",
											accessor: "stage"
										},
										{
											id: "total_opportunity",
											Header: "Total Opportunity",
											accessor: value =>
												"$" + value.total_opportunity
										}
									]
								}
							]}
							defaultPageSize={5}
							style={{
								height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
							}}
							className="-striped -highlight"
						/>
						<br />
					</div>
				</div>
			</div>
		);
	}
}

export default Customer;

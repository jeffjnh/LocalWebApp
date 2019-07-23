import React, { Component } from "react";
import NavBar from "./Global/NavBar";
import { AWS as AWSCOLORS } from "../constants/Colors";
import Toggles from "./Toggles";
import AutoField from "./AutoField";
import "./CustomerStyles.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "./Card";

class Customer extends Component {

	state = {
		customer_sales: [],
		customer_name: ""
	};


	data = [
		{ key: 3, name: "Miffy", idNum: 3 },
		{ key: 2, name: "Edmund", idNum: 2 },
		{ key: 1, name: "Jeff", idNum: 1 },
		{ key: 4, name: "Jeff", idNum: 1 },
		{ key: 5, name: "Edmund", idNum: 2 },
		{ key: 6, name: "Miffy", idNum: 3 },
		{ key: 7, name: "Jeff", idNum: 1 },
		{ key: 8, name: "Edmund", idNum: 2 },
		{ key: 9, name: "Miffy", idNum: 3 },
		{ key: 10, name: "Jeff", idNum: 1 },
		{ key: 11, name: "Edmund", idNum: 2 },
		{ key: 12, name: "Miffy", idNum: 3 }
	];

	customerStateUpdate = (response_object, name) => {
		this.setState({
			customer_sales: response_object,
			customer_name: name
		});
	};

	render() {
		let titles = ["name", "idNum"];
		const container_style = {
			border: "3px solid white",
			borderLeft: "3px solid red",
			borderRight: "3px solid green",
			width: "25%"
		};
		console.log(titles[0]);
		return (
			<div>
				{/*Navigation Bar*/}
				<NavBar />

				{/*AutoField Search bar for Customer Data*/}
				<div style={{ color: AWSCOLORS.DARK_SQUID_INK }}>
					<AutoField stateSetter={this.customerStateUpdate} />
				</div>

				
				<div
					style={{
						// backgroundColor: AWSCOLORS.DARK_SQUID_INK
					}}
				>
					{/* <Toggles /> */}
					<div
						style={{
							display: "flex",
							height: "400px",
							margin: "40px",
							minWidth: "900px"
						}}
					>
						<div style={container_style}>
							<div id="root-offerings" style={{ margin: "10px" }}>
								<div
									className="offerings-card-container"
									style={{ margin: "20px" }}
								>
									<Card />
								</div>
							</div>
						</div>
						<div style={container_style} />
						<div style={container_style} />
						<div style={container_style} />
					</div>

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
							data={this.state.addDataHere} // add data
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
											Header: "CAF Perspective",
											accessor: "caf_perspective"
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
											Header: "Description",
											accessor: "offering_description"
										},
										{
											Header: "Owner",
											accessor: "owner"
										},
										{
											Header: "Wiki",
											accessor: "wiki_link"
										},
										{
											Header: "Delivery Kit",
											accessor: "delivery_kit"
										},
										{
											Header: "Sales Kit",
											accessor: "sales_kit"
										}
									]
								}
							]}
							defaultPageSize={5}
							style={{
								height: "300px" // This will force the table body to overflow and scroll, since there is not enough room
							}}
							className="-striped -highlight"
						/>
						<br />
						<br/>

					</div>

					<h2
						style={{ color: AWSCOLORS.SMILE_ORANGE }}
						className="text-center"
					>
						Completed Offerings
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
											Header: "Total Opportunity",
											accessor: "total_opportunity"
										}
									]
								}
							]}
							defaultPageSize={5}
							style={{
								height: "300px" // This will force the table body to overflow and scroll, since there is not enough room
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

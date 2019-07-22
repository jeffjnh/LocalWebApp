import React, { Component } from "react";
import NavBar from "./Global/NavBar";
// import Table from "react-bootstrap/Table";
import { AWS as AWSCOLORS } from "../constants/Colors";
import Toggles from "./Toggles";
import "./CustomerStyles.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Customer extends Component {
	state = {};
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
	render() {
		let titles = ["name", "idNum"];
		console.log(titles[0]);
		return (
			<div>
				<NavBar />

				<div
					style={{
						backgroundColor: AWSCOLORS.DARK_SQUID_INK
					}}
				>
					<Toggles />
					<vl
						style={{
							color: "white",
							backgroundColor: "white",
							height: 5
						}}
					/>
					<h2
						style={{ color: AWSCOLORS.SMILE_ORANGE }}
						className="text-center"
					>
						Completed Offerings
					</h2>

					<div
						style={{
							margin: "40px",
							color: AWSCOLORS.SMILE_ORANGE,
							backgroundColor: AWSCOLORS.SQUID_INK
						}}
					>
						<ReactTable
							data={this.data}
							columns={[
								{
									Header: "Name",
									columns: [
										{
											Header: "First Name",
											accessor: "key"
										},
										{
											Header: "Last Name",
											accessor: "name"
										}
									]
								},
								{
									Header: "Info",
									columns: [
										{
											Header: "Age",
											accessor: "idNum"
										}
									]
								}
							]}
							defaultPageSize={10}
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

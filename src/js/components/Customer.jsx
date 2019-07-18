import React, { Component } from "react";
import NavBar from "./Global/NavBar";
// import Table from "react-bootstrap/Table";
import { AWS as AWSCOLORS } from "../constants/Colors";
import Toggles from "./Toggles";
import "./CustomerStyles.css";

const rowStyle = {
	color: AWSCOLORS.SMILE_ORANGE,
	backgroundColor: AWSCOLORS.SQUID_INK,
	border: "none",
	borderCollapse: "separate"
};

class Customer extends Component {
	state = {};
	data = [
		{ key: 1, name: "Jeff", idNum: 1 },
		{ key: 2, name: "Edmund", idNum: 2 },
		{ key: 3, name: "Miffy", idNum: 3 },
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
					{/* <div class="container">
					<div class="row">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h4>Fixed Header Scrolling Table</h4>
							</div>
							<table class="table table-fixed">
								<thead>
									<tr>
										<th class="col-xs-2">#</th>
										<th class="col-xs-8">Name</th>
										<th class="col-xs-2">Points</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="col-xs-2">1</td>
										<td class="col-xs-8">Mike Adams</td>
										<td class="col-xs-2">23</td>
									</tr>
									<tr>
										<td class="col-xs-2">2</td>
										<td class="col-xs-8">Holly Galivan</td>
										<td class="col-xs-2">44</td>
									</tr>
									<tr>
										<td class="col-xs-2">3</td>
										<td class="col-xs-8">Mary Shea</td>
										<td class="col-xs-2">86</td>
									</tr>
									<tr>
										<td class="col-xs-2">4</td>
										<td class="col-xs-8">Jim Adams</td>
										<td>23</td>
									</tr>
									<tr>
										<td class="col-xs-2">5</td>
										<td class="col-xs-8">Henry Galivan</td>
										<td class="col-xs-2">44</td>
									</tr>
									<tr>
										<td class="col-xs-2">6</td>
										<td class="col-xs-8">Bob Shea</td>
										<td class="col-xs-2">26</td>
									</tr>
									<tr>
										<td class="col-xs-2">7</td>
										<td class="col-xs-8">Andy Parks</td>
										<td class="col-xs-2">56</td>
									</tr>
									<tr>
										<td class="col-xs-2">8</td>
										<td class="col-xs-8">Bob Skelly</td>
										<td class="col-xs-2">96</td>
									</tr>
									<tr>
										<td class="col-xs-2">9</td>
										<td class="col-xs-8">William Defoe</td>
										<td class="col-xs-2">13</td>
									</tr>
									<tr>
										<td class="col-xs-2">10</td>
										<td class="col-xs-8">Will Tripp</td>
										<td class="col-xs-2">16</td>
									</tr>
									<tr>
										<td class="col-xs-2">11</td>
										<td class="col-xs-8">Bill Champion</td>
										<td class="col-xs-2">44</td>
									</tr>
									<tr>
										<td class="col-xs-2">12</td>
										<td class="col-xs-8">Lastly Jane</td>
										<td class="col-xs-2">6</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div> */}

					<Toggles />

					<div className="container">
						<div className="row">
							{/* <div className="panel panel-default"> */}
							<div className="panel-heading">
								<h4>Fixed Header Scrolling Table</h4>
							</div>
							<table className="table table-fixed table-hover table-striped">
								<thead>
									<tr>
										{titles.map(title => (
											<th
												// className="col-xs-2"
												key={title}
											>
												{title}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="scroll">
									{this.data.map(item => (
										<tr key={item.key}>
											{titles.map(title => (
												<td
													// className="col-xs-2"
													key={title}
												>
													{item[title]}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
							{/* </div> */}
						</div>
					</div>

					<h2
						style={{ color: AWSCOLORS.SMILE_ORANGE }}
						className="text-center"
					>
						Completed Offerings
					</h2>
					<div
						className="panel-body panel-flex-table"
						style={
							{
								// margin: "40px",
								// height: "250px",
								// overflow: "scroll",
								// borderCollapse: "collapse"
							}
						}
					>
						<table
							style={rowStyle}
							className="table flex-table table-striped table-hover"
						>
							<thead
								style={{
									position: "sticky",
									// display: "block",
									width: "100%",
									top: 0,
									borderBottom: "none"
									// borderCollapse: "separate"
								}}
							>
								<tr
									style={{
										position: "sticky",
										// display: "block",
										width: "100%",
										top: 0,
										// borderCollapse: "collapse",
										borderBottom: "none"
									}}
								>
									{titles.map(title => (
										<th
											style={{
												position: "sticky",
												top: 0,
												width: "100%",
												// borderWidth: "0px",
												// border: "2px solid blue",
												backgroundColor:
													AWSCOLORS.DARK_SQUID_INK
											}}
											key={title}
										>
											{title}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="scroll">
								{this.data.map(item => (
									<tr key={item.key}>
										{titles.map(title => (
											<th
												style={{
													position: "sticky",
													top: 0,
													backgroundColor:
														AWSCOLORS.DARK_SQUID_INK
												}}
												key={title}
											>
												{title}
											</th>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Customer;

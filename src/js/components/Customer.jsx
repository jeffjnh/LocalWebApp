import React, { Component } from "react";
import NavBar from './Global/NavBar';
import Table from "react-bootstrap/Table";
import { AWS as AWSCOLORS } from "../constants/Colors";
import Toggles from "./Toggles";

const rowStyle = {
	color: AWSCOLORS.SMILE_ORANGE,
	backgroundColor: AWSCOLORS.DARK_SQUID_INK
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
				<NavBar></NavBar>
				
				<div
					style={{
						backgroundColor: AWSCOLORS.DARK_SQUID_INK
					}}
				>
					<Toggles />
					<h2
						style={{ color: AWSCOLORS.SMILE_ORANGE }}
						className="text-center"
					>
						Completed Offerings
					</h2>
					<div
						className="panel"
						style={{
							margin: "40px",
							height: "250px",
							overflow: "scroll"
						}}
					>
						<Table style={rowStyle} bordered hover>
							<thead
								style={{
									position: "sticky",
									top: 0
								}}
							>
								<tr
									style={{
										position: "sticky",
										top: 0
									}}
								>
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
							</thead>
							<tbody>
								{this.data.map(item => (
									<tr key={item.key}>
										{titles.map(title => (
											<td key={title}>{item[title]}</td>
										))}
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

export default Customer;

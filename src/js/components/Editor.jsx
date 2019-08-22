import React, { Component } from "react";
import NavBar from "../utility/NavBar";
import Button from "react-bootstrap/Button";
import ReactTable from "react-table";
import AutoField from "./AutoField";
import CardModal from "./Offerings/CardModal";
import { AWS as AWSCOLORS } from "../constants/Colors";

const url = "https://avqdv9au27.execute-api.us-east-1.amazonaws.com/PROD/api/db/predict";
const url2 = "https://avqdv9au27.execute-api.us-east-1.amazonaws.com/PROD/api/db/query";

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			predictor: "",
			predictee: "",
			showSubmit: false,
			tableVals: [],
			currentOfferingClicked: null
		};

		this.onChangePredictor = this.onChangePredictor.bind(this);
		this.onChangePredictee = this.onChangePredictee.bind(this);
	}

	clipboardTime = () => {
		if (!this.state.showSubmit) {
			this.setState({ showSubmit: true });
			this.refs.secondField.wipe();
			setTimeout(() => {
				this.setState({ showSubmit: false });
			}, 2000);
		}
	};
	onRowClick = (state, rowInfo, column) => {
		if (typeof rowInfo !== "undefined") {
			return {
				onClick: (e, t) => {
					this.setState({ currentOfferingClicked: rowInfo.original });
				}
			};
		} else {
			return {
				onClick: (e, handleOriginal) => {
					if (handleOriginal) {
						handleOriginal();
					}
				}
			};
		}
	};
	handleSubmit = event => {
		event.preventDefault();
		this.clipboardTime();

		fetch(url, {
			method: "GET",
			mode: "cors",
			headers: {
				// "Access-Control-Allow-Origin": "*",
				// "Access-Control-Allow-Headers": "*",
				"Content-Type": "application/json",
				predictor_name_type: this.state.predictor,
				predictee_name_type: this.state.predictee
			}
		})
			.then(response => {
				if (!response.ok) {
					throw response;
				} else {
					console.log("Success: API fetched");
					console.log(response.body);
					this.onChangePredictor(null, this.state.predictor);
					return response.json();
				}
			})
			.catch(err => {
				console.log("Error: API fetch error");
				console.log(err.message);
			});
	};

	async onChangePredictor(response_object, name) {
		console.log(name);
		fetch(url2, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				table_name: "OfferingPredictions",
				predictor_name_type: name
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
				var newResponse = response.map(el => {
					var newObj = {
						offering_name: el.predictee_name_type.split("|")[0],
						offering_type: el.predictee_name_type.split("|")[1]
					};
					return newObj;
				});
				this.setState({
					tableVals: newResponse,
					predictor: name
				});
			})
			.catch(err => {
				console.log("Error: API fetch error");
				console.log(err.message);
			});
	}

	async onChangePredictee(response_object, name) {
		console.log(name);
		await this.setState({ predictee: name });
	}

	render() {
		return (
			<div>
				<NavBar />
				<form style={{ margin: "auto" }} onSubmit={this.handleSubmit}>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							// alignItems: "stretch",
							margin: "0 auto",
							padding: "20px"
						}}
					>
						<div
							style={{
								margin: "10px auto",
								// padding: "20px",
								color: AWSCOLORS.DARK_SQUID_INK
							}}
						>
							<h3 style={{ textAlign: "center", color: "white" }}>
								Select offering to edit
							</h3>
							<AutoField
								style={{ margin: "none" }}
								table={"Offerings"}
								index={"offering_name-index"}
								indexedType={"offering_name"}
								placeText={"Offering Name"}
								secondType={"offering_type"}
								jointData={true}
								stateSetter={this.onChangePredictor}
							/>
						</div>
						<div
							style={{
								margin: "10px auto",
								color: AWSCOLORS.DARK_SQUID_INK
							}}
						>
							<h3 style={{ textAlign: "center", color: "white" }}>
								Select new prediction
							</h3>
							<AutoField
								ref="secondField"
								table={"Offerings"}
								index={"offering_name-index"}
								indexedType={"offering_name"}
								placeText={"Offering Name"}
								secondType={"offering_type"}
								jointData={true}
								stateSetter={this.onChangePredictee}
							/>
						</div>
						<div
							style={{
								width: "50%",
								flexBasis: "100%",
								padding: "0 auto",
								margin: "0 auto",
								marginTop: "20px",
								textAlign: "center"
								// display: "flex"
							}}
						>
							<Button
								onClick={this.handleSubmit}
								disabled={this.state.showSubmit}
								size="lg"
								style={{
									width: "50%",
									maxWidth: "1000px",
									alignItems: "center"
								}}
								variant={
									this.state.showSubmit
										? "success"
										: "success"
								}
							>
								{this.state.showSubmit
									? "Submitting prediction!"
									: "Submit"}
							</Button>
						</div>
					</div>
				</form>
				<CardModal
					offering={this.state.currentOfferingClicked}
					onCloseModal={() => {
						this.setState({ currentOfferingClicked: null });
					}}
					fetch={false}
					url={
						"https://avqdv9au27.execute-api.us-east-1.amazonaws.com/PROD/api/db/query"
					}
				/>
				<div
					style={{
						maxWidth: "1000px",
						margin: "20px auto",
						color: AWSCOLORS.BLACK,
						backgroundColor: AWSCOLORS.WHITE,
						borderRadius: "10px",
						whiteSpace: "unset"
					}}
				>
					<ReactTable
						className="highlight"
						data={this.state.tableVals} // add data
						getTrProps={this.onRowClick}
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
									}
								]
							}
						]}
						defaultPageSize={10}
						style={{
							height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
						}}
					/>
				</div>
			</div>
		);
	}
}

export default Editor;

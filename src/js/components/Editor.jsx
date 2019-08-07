import React, { Component } from "react";
import AutoField from "./AutoField";
import {AWS as AWSCOLORS} from "../constants/Colors";
import NavBar from "../utility/NavBar";

class Editor extends Component {
	state = {
		predictor: "",
		predicted: "",
	};

	async writeSuggestion(data, response){
	}


	render() {
		return(
			<div>

				<NavBar/>

				<div style={{
					color: AWSCOLORS.DARK_SQUID_INK,
					display: "flex",


				}}>

					<AutoField
						table={'Offerings'}
						index={"offering_name-index"}
						indexedType={'offering_name'}
						placeText={'Offering Name'}
					/>

					<AutoField
						table={'Offerings'}
						index={'offering_name-index'}w
						indexedType={'offering_name'}
						placeText={'Offering Name'}
					/>

					<button
						onClick={this.writeSuggestion}
						style={{
							margin: "1em",
							borderRadius: "5px",
							verticalAlign: "center",
						}}
					>Submit</button>

				</div>

			</div>
		);
	}
}

export default Editor;

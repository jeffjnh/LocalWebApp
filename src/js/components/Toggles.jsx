import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CardSmall from "./Global/Card/CardSmall";

class Toggle extends Component {
	state = {};
	render() {
		return (
			// <div className="col-md-3 text-center">
			<Button
				className="btn btn-lg m-4"
				// style={{ color: "black" }}
				variant={this.getButtonClass()}
				onClick={() => {
					this.props.onPress(this.props.button);
				}}
			>
				{this.props.button.label}
			</Button>
			// </div>
		);
	}
	getButtonClass = () => {
		if (this.props.button.pressed) {
			return "warning";
		} else {
			return "outline-warning";
		}
	};
}

// export default Toggle;

class Toggles extends Component {
	state = {
		buttons: [
			{ id: 1, pressed: false, label: "Launch" },
			{ id: 2, pressed: true, label: "Align" },
			{ id: 3, pressed: false, label: "Scale" },
			{ id: 4, pressed: false, label: "Optimize" }
		]
	};
	render() {
		return (
			<div>
				<div className="text-center" style={{ width: "100%" }}>
					{this.state.buttons.map(button => (
						<Toggle
							key={button.id}
							pressed={button.pressed}
							id={button.id}
							onPress={this.handlePress}
							button={button}
						/>
					))}{" "}
				</div>
				<div id="root-offerings" style={{ margin: "20px" }}>
					<div
						className="offerings-card-container"
						// style={{ margin: "20px" }}
					>
						{this.state.buttons[0].pressed ? <CardSmall /> : null}
						{this.state.buttons[1].pressed ? <CardSmall /> : null}
						{this.state.buttons[2].pressed ? <CardSmall /> : null}
						{this.state.buttons[3].pressed ? <CardSmall /> : null}
						{this.state.buttons[0].pressed ? <CardSmall /> : null}
						{this.state.buttons[1].pressed ? <CardSmall /> : null}
						{this.state.buttons[2].pressed ? <CardSmall /> : null}
						{this.state.buttons[3].pressed ? <CardSmall /> : null}
						{this.state.buttons[0].pressed ? <CardSmall /> : null}
						{this.state.buttons[1].pressed ? <CardSmall /> : null}
						{this.state.buttons[2].pressed ? <CardSmall /> : null}
						{this.state.buttons[3].pressed ? <CardSmall /> : null}
						{this.state.buttons[0].pressed ? <CardSmall /> : null}
						{this.state.buttons[1].pressed ? <CardSmall /> : null}
						{this.state.buttons[2].pressed ? <CardSmall /> : null}
						{this.state.buttons[3].pressed ? <CardSmall /> : null}
						{this.state.buttons[0].pressed ? <CardSmall /> : null}
						{this.state.buttons[1].pressed ? <CardSmall /> : null}
						{this.state.buttons[2].pressed ? <CardSmall /> : null}
						{this.state.buttons[3].pressed ? <CardSmall /> : null}
						{this.state.buttons[0].pressed ? <CardSmall /> : null}
						{this.state.buttons[1].pressed ? <CardSmall /> : null}
						{this.state.buttons[2].pressed ? <CardSmall /> : null}
						{this.state.buttons[3].pressed ? <CardSmall /> : null}
					</div>
				</div>
			</div>
		);
	}
	handlePress = button => {
		const buttons = this.state.buttons.map(btn => {
			if (button.id === btn.id) {
				btn.pressed = !button.pressed;
			}
			return btn;
		});
		this.setState({ buttons });
	};
}

export default Toggles;

import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "./scss/style.scss";
import App from "./App";
import Notfound from "./js/components/Notfound";
import Login from "./js/components/Login";
import Offerings from "./js/components/Offerings";
import Customer from "./js/components/Customer";
import Testing from "./js/components/Testing";
import Editor from "./js/components/Editor";

const routing = (
	<Router>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/app" component={App} />
			<Route path="/login" component={Login} />
			<Route path="/offerings" component={Offerings} />
			<Route path="/customer" component={Customer} />
			<Route path="/editor" component={Editor} />
			<Route path="/testing" component={Testing} />
			<Route path="/404" component={Notfound} />
			<Route component={Notfound} />
		</Switch>
	</Router>
);

// entry point for react rendering
ReactDOM.render(routing, document.getElementById("root"));

// default
// ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

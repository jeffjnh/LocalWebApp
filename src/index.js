import React from "react";
import ReactDOM from "react-dom";
// import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import App from "./js/components/app/App";
import Testing from "./js/components/testing/Testing";
import Login from "./js/components/login/Login";

const routing = (
  <Router>
    {/* <Link to="/"> Home </Link>|
    <Link to="/login"> Login </Link>|
    <Link to="/testing"> Testing </Link>| */}
    <Route exact path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/testing" component={Testing} />
  </Router>
);

// entry point for react rendering
ReactDOM.render(routing, document.getElementById("root"));

// default
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

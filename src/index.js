import React from "react";
import ReactDOM from "react-dom";
// import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import './scss/style.scss';
import App from "./App";
import Notfound from "./js/components/Notfound";
import Login from "./js/components/Login";
import Offerings from "./js/components/Offerings";
import Customer from "./js/components/Customer";
import Testing from "./js/components/Testing";
import Checkbox from "./js/components/testing/Testing_Checkbox";

const routing = (
  <Router>
    {/* <Link to="/"> Home </Link>|
    <Link to="/login"> Login </Link>|
    <Link to="/testing"> Testing </Link>| */}
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/offerings" component={Offerings} />
      <Route path="/testing" component={Testing} />
      <Route path="/customer" component={Customer} />
      <Route path="/checkbox" component={Checkbox} />
      <Route component={Notfound} />
    </Switch>
  </Router>
);

// entry point for react rendering
ReactDOM.render(routing, document.getElementById('root'));

// default
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

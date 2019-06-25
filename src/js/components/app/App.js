import React from 'react';
import logo from '../../../assets/img/logo/AWS_logo_RGB_REV.svg';
import './App.css';
// import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p style={{marginTop: "100px"}}>
          Edit <code>/src/js/App.js</code> and save to reload.
        </p>

        <div className="App-nav">
          <a className="App-link" href="/login" style={{marginRight: "20px"}}>Login</a>
          <a className="App-link" href="/signup" style={{marginRight: "20px"}}>Sign up</a>
          <a className="App-link" href="/offerings" style={{marginRight: "20px"}}>Offerings</a>
          <a className="App-link" href="/testing" style={{marginRight: "20px"}}>Test</a>
          <a className="App-link" href="/404">(404)</a>
        </div>

        {/* <Route render={({ history }) => (
          <button type='button' onClick={() => { history.push('/testing') }}>Test Page</button>
        )} />

        <Route render={({ history }) => (
          <button type='button' onClick={() => { history.push('/login') }}>Login Page</button>
        )} /> */}
      </header>
    </div>
  );
}

export default App;

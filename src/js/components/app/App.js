import React from 'react';
import logo from '../../../assets/img/logo/react_logo.svg';
import './App.css';
import { Route } from 'react-router-dom'

const Button = () => (
  <Route render={({ history }) => (
    <button
      type='button'
      onClick={() => { history.push('/new-location') }}
    >
      Click Me!
    </button>
  )} />
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p>
          Edit <code>/src/js/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
          Learn React
        </a>
        
        <Route render={({ history }) => (
          <button type='button' onClick={() => { history.push('/testing') }}>Test Page</button>
        )} />

        <Route render={({ history }) => (
          <button type='button' onClick={() => { history.push('/login') }}>Login Page</button>
        )} />
      </header>
    </div>
  );
}

export default App;

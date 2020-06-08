import React from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * Component to wrap the rest of the website with common components.
 * @return {!JSX} Returns site presentation for header, navigation,
 *     and shopping cart.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

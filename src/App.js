import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      /* <div>
        <Navigation />
        <div className="container">
          <h1>Rohit</h1>
        </div>
      </div> */
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;

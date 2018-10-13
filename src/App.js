import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <Routes />
      </div>
    );
  }
}

export default App;

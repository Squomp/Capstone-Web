import React, { Component } from 'react';
import '../styles/App.css';
import Navbar from './Navbar.js';

class App extends Component {

  componentDidMount = () => {
    document.title = "Easy Money";
  }

  render() {
    return (
      <div className="App">
        <div id='titlebar'>
          <span id='title'>Easy Money <img id='titleimg' src='moneywings.png' alt='' /></span>
          
        </div>
        <Navbar />
      </div>
    );
  }
}

export default App;

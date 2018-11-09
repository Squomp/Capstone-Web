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
        <Navbar />
      </div>
    );
  }
}

export default App;

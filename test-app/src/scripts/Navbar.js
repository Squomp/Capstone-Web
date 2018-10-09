import React, { Component } from 'react';
import '../styles/Navbar.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Log from "./Log";

class Navbar extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <div class="topnav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/log">Log</NavLink>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/log" component={Log}/>
          </header>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;

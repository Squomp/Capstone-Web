import React, { Component } from 'react';
import '../styles/Navbar.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Log from "./Log";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      expressRoot: 'https://localhost:3030'
    };
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <div className="topnav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/log">Log</NavLink>
              <NavLink to="/signUp">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/log" component={Log}/>
            <Route path="/signUp" render={(props) => <SignUp expressRoot={this.state.expressRoot} />}/>
            <Route path="/login" render={(props) => <LogIn expressRoot={this.state.expressRoot} />}/>
          </header>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;

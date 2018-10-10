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
import LogOut from "./LogOut";

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      isUserLoggedIn: false
    }
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
              <NavLink to="/logout">Log Out</NavLink>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/log" component={Log}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/logout" component={LogOut}/>
          </header>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;

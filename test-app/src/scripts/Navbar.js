import React, { Component } from 'react';
import '../styles/Navbar.css';
import '../styles/GlobalStyle.css';
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
import Plan from "./Plan";

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
        <div className="navbar">
          <header className="App-header">
            <div className="topnav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/plan">Plan</NavLink>
              <NavLink to="/log">Log</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/logout">Log Out</NavLink>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/plan" component={Plan}/>
            <Route path="/log" component={Log}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/logout" component={LogOut}/>
          </header>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;

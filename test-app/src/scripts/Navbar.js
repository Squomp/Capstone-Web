import React, { Component } from 'react';
import '../styles/Navbar.css';
import '../styles/GlobalStyle.css';
import {
  Route,
  NavLink,
  HashRouter,
} from "react-router-dom";
import Home from "./Home";
import Log from "./Log";
import LogOut from "./LogOut";
import Plan from "./Plan";
import Past from "./Past";

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
              <img src='/piggybank.png' style={{ width:'20%', height:'20%', padding:'4%', float: 'right' }}/>
              <NavLink exact to="/">Home</NavLink>
              <NavLink to="/plan">Plan</NavLink>
              <NavLink to="/past">Past</NavLink>
              <NavLink to="/logout">Log Out</NavLink>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/plan" component={Plan}/>
            <Route path="/past" component={Past}/>
            <Route path="/logout" component={LogOut}/>
          </header>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;

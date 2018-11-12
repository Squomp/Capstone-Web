import React, { Component } from 'react';
import '../styles/Navbar.css';
import '../styles/GlobalStyle.css';
import {
  Route,
  NavLink,
  HashRouter,
} from "react-router-dom";
import Home from "./Home";
import LogOut from "./LogOut";
import Past from "./Past";
import Transactions from './Transactions.js';

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
              <img src='/piggybank.png' alt='' style={{ width:'20%', height:'20%', padding:'4%', float: 'right' }}/>
              <NavLink exact to="/">Home</NavLink>
              <NavLink to="/transactions">Transactions</NavLink>
              <NavLink to="/past">Past</NavLink>
              <NavLink to="/logout">Log Out</NavLink>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/transactions" component={Transactions}/>
            <Route path="/past" component={Past}/>
            <Route path="/logout" component={LogOut}/>
          </header>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;

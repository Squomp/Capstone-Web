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
import Sidebar from 'react-sidebar';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      sidebarOpen: false
    }
  }

  render() {
    return (
      <div>
        <HashRouter>
          <div className="navbar">
            <Sidebar id='sidebar'
              sidebar={
                <div className="topnav">
                  <div>
                    <button class='collapseBtn sidebarBtn' onClick={() => this.setState({ sidebarOpen: false })}>
                      {/* <span><img style={{ width: '25px', height: '25px'}} src='/x.png' alt ='close'/></span> */}
                    </button>
                    <div id='piggyBank'>
                      {/* <img id='piggyBank' src='/piggybank.png' alt='' /> */}
                    </div>
                  </div>
                  <NavLink exact to="/" onClick={() => this.setState({ sidebarOpen: false })}>
                    <span>Home</span>
                  </NavLink>
                  <NavLink to="/transactions" onClick={() => this.setState({ sidebarOpen: false })}>Transactions</NavLink>
                  <NavLink to="/past" onClick={() => this.setState({ sidebarOpen: false })}>Past</NavLink>
                  <NavLink to="/logout" onClick={() => this.setState({ sidebarOpen: false })}>Log Out</NavLink>
                </div>
              }
              docked={this.state.sidebarOpen}
              onSetOpen={() => this.setState({ sidebarOpen: true })}>
              <button className='openBtn sidebarBtn' onClick={() => this.setState({ sidebarOpen: true })}>
                {/* <img style={{ width: '25px', height: '25px'}} src='/menu.png' alt='open'/> */}
              </button>
            </Sidebar>
            <Route exact path="/" component={Home} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/past" component={Past} />
            <Route path="/logout" component={LogOut} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Navbar;

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
import SideBar from 'react-fixed-sidebar';

class Navbar extends Component {

  constructor() {
    super();
    this.unHideBtn = this.unHideBtn.bind(this);
  }

  unHideBtn() {
    // this.setState({ hideButton: false });
    // console.log('state changed')
  }

  render() {
    return (
      <div>
        <button className='openBtn sidebarBtn' onClick={() => this.sidebar.open()}>
          {/* <img style={{ width: '25px', height: '25px'}} src='/menu.png' alt='open'/> */}
        </button>
        <div onClick={() => this.sidebar.close()}>
          <HashRouter>
            <div className="navbar">
              <SideBar id='sidebar' ref={(sidebar => this.sidebar = sidebar)}>
                <div className="topnav">
                  <div>
                    <button className='collapseBtn sidebarBtn' onClick={() => this.sidebar.close()}>
                      {/* <span><img style={{ width: '25px', height: '25px'}} src='/x.png' alt ='close'/></span> */}
                    </button>
                    <div id='piggyBank'>
                      {/* <img id='piggyBank' src='/piggybank.png' alt='' /> */}
                    </div>
                  </div>
                  <NavLink exact to="/" onClick={() => this.sidebar.close()}>
                    <span>Home</span>
                  </NavLink>
                  <NavLink to="/transactions" onClick={() => this.sidebar.close()}>Transactions</NavLink>
                  <NavLink to="/past" onClick={() => this.sidebar.close()}>Past</NavLink>
                  <NavLink to="/logout" onClick={() => this.sidebar.close()}>Log Out</NavLink>
                </div>
              </SideBar>
              <Route exact path="/" component={Home} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/past" component={Past} />
              <Route path="/logout" component={LogOut} />
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default Navbar;

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
    this.state = {
      sidebarOpen: false,
      hideButton: false,
    }
    this.unHideBtn = this.unHideBtn.bind(this);
  }

  unHideBtn () {
    // this.setState({ hideButton: false });
    // console.log('state changed')
  }

  render() {
    const openBtnClasses = this.state.hideButton ? 'hidden openBtn sidebarBtn' : 'openBtn sidebarBtn';
    return (
      <div>
        <HashRouter>
          <div className="navbar">
            <button className={openBtnClasses} onClick={() => this.sidebar.open()}>
              {/* <img style={{ width: '25px', height: '25px'}} src='/menu.png' alt='open'/> */}
            </button>
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
                <NavLink exact to="/" onClick={() => this.setState({ sidebarOpen: false })}>
                  <span>Home</span>
                </NavLink>
                <NavLink to="/transactions" onClick={() => this.setState({ sidebarOpen: false })}>Transactions</NavLink>
                <NavLink to="/past" onClick={() => this.setState({ sidebarOpen: false })}>Past</NavLink>
                <NavLink to="/logout" onClick={() => this.setState({ sidebarOpen: false })}>Log Out</NavLink>
              </div>
            </SideBar>
            <Route exact path="/" component={() => <Home update={this.unHideBtn} />} />
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

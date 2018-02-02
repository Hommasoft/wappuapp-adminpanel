import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import History from '../history';
import '../assets/css/header.css';
import logo from '../assets/img/logo.png';

class Header extends Component {
  render() {
    const admin = localStorage.getItem('admin');
    var currentPage = History.location.pathname.split('/')[1];
    currentPage = '/' + currentPage;
    if (admin === 'true') {
      return (
        <div className="headerBar">
          <div className="headerContentLogoLeft">
            <img src={logo} alt="logo" />
          </div>
          <div className="headerContent">
            <Nav justified bsStyle="tabs" activeKey={currentPage}>
              <NavItem eventKey="/" href="/">
                Front
              </NavItem>
              <NavItem eventKey="/feed" href="/feed">
                Feed
              </NavItem>
              <NavItem eventKey="/event" href="/event/0">
                Event
              </NavItem>
              <NavItem eventKey="/moderatorlist" href="/moderatorlist">
                ModList
              </NavItem>
              <NavDropdown eventKey="/account" title="Account" id="nav-dropdown">
                <MenuItem href="/account">Account Page</MenuItem>
                <MenuItem href="/logout">Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </div>
          <div className="headerContentLogoRight">
            <img src={logo} alt="logo" />
          </div>
        </div>
      );
    } else if (admin === 'false') {
      return (
        <div className="headerBar">
          <div className="headerContent">
            <Nav justified bsStyle="tabs" activeKey={currentPage}>
              <NavItem eventKey="/" href="/">
                Front
              </NavItem>
              <NavItem eventKey="/feed" href="/feed">
                Feed
              </NavItem>
              <NavItem eventKey="/event" href="/event/0">
                Event
              </NavItem>
              <NavDropdown eventKey="/account" title="Account" id="nav-dropdown">
                <MenuItem href="/account">Account Page</MenuItem>
                <MenuItem href="/logout">Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </div>
        </div>
      );
    } else {
      return (
        <div className="headerBar">
          <div className="headerContent">
            <Nav justified bsStyle="tabs" activeKey={currentPage}>
              <NavItem eventKey="/" href="/">
                Front
              </NavItem>
              <NavItem eventKey="/login" href="/login">
                Login
              </NavItem>
            </Nav>
          </div>
        </div>
      );
    }
  }
}

export default Header;

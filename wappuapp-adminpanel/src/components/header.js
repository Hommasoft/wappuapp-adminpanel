import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import History from '../history';
import '../assets/css/header.css';

class Header extends Component {
  render() {
    const admin = localStorage.getItem('admin');
    var currentPage = History.location.pathname.split('/')[1];
    currentPage = '/' + currentPage;
    if (admin === 'true') {
      return (
        <div className="headerBar">
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
      );
    } else if (admin === 'false') {
      return (
        <div>
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
      );
    } else {
      return (
        <div>
          <Nav justified bsStyle="tabs" activeKey={currentPage}>
            <NavItem eventKey="/" href="/">
              Front
            </NavItem>
            <NavItem eventKey="/login" href="/login">
              Login
            </NavItem>
          </Nav>
        </div>
      );
    }
  }
}

export default Header;

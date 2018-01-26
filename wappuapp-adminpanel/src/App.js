import React, { Component } from 'react';
import {
  Col,
  Jumbotron,
  Nav,
  NavItem,
  Row,
  Grid,
  NavDropdown,
  MenuItem,
  Well
} from 'react-bootstrap';

import History from './history';

class App extends Component {
  render() {
    const admin = localStorage.getItem('admin');
    var currentPage = History.location.pathname.split('/')[1];
    currentPage = '/' + currentPage;
    if (admin === 'true') {
      return (
        <Grid>
          <Row>
            <Col md={10} sm={12}>
              <Jumbotron>
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
                <br />
                <br />
                <Row>
                  <Col xs={12}>
                    <Well>{this.props.children}</Well>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      );
    } else if (admin === 'false') {
      return (
        <Grid>
          <Row>
            <Col md={10} sm={12}>
              <Jumbotron>
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
                <br />
                <br />
                <Row>
                  <Col xs={12}>
                    <Well>{this.props.children}</Well>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Row>
            <Col md={10} sm={12}>
              <Jumbotron>
                <Nav justified bsStyle="tabs" activeKey={currentPage}>
                  <NavItem eventKey="/" href="/">
                    Front
                  </NavItem>
                  <NavItem eventKey="/login" href="/login">
                    Login
                  </NavItem>
                </Nav>
                <br />
                <br />
                <Row>
                  <Col xs={12}>
                    <Well>{this.props.children}</Well>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default App;

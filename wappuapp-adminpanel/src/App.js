import React, { Component } from 'react';
import { Col, Jumbotron, Nav, NavItem, Row, Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    const admin = localStorage.getItem('admin');
    if (admin === 'true') {
      return (
        <Grid>
          <Row>
            <Col md={10} sm={12}>
              <Jumbotron>
                <Nav bsStyle="tabs">
                  <NavItem href="/">Front</NavItem>
                  <NavItem href="/logout">Logout</NavItem>
                  <NavItem href="/feed">Feed</NavItem>
                  <NavItem href="/moderatorlist">ModList</NavItem>
                  <NavItem href="/changepassword">ChangePassword</NavItem>
                </Nav>
                <Row>
                  <Col xs={12}>{this.props.children}</Col>
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
                <Nav bsStyle="tabs">
                  <NavItem href="/">Front</NavItem>
                  <NavItem href="/logout">Logout</NavItem>
                  <NavItem href="/feed">Feed</NavItem>
                  <NavItem href="/changepassword">ChangePassword</NavItem>
                </Nav>
                <Row>
                  <Col xs={12}>{this.props.children}</Col>
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
                <Nav bsStyle="tabs">
                  <NavItem href="/">Front</NavItem>
                  <NavItem href="/login">Login</NavItem>
                </Nav>
                <Row>
                  <Col xs={12}>{this.props.children}</Col>
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

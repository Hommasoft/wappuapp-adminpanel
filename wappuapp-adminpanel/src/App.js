import React, { Component } from 'react';
import { Col, Jumbotron, Nav, NavItem, Row, Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} sm={3}>
            <Jumbotron>
              <Nav bsStyle="tabs">
                <NavItem href="/">Front</NavItem>
                <NavItem href="/login">Login</NavItem>
                <NavItem href="/register">Register</NavItem>
                <NavItem href="/logout">Logout</NavItem>
                <NavItem href="/protected">Protected</NavItem>
                <NavItem href="/feed">Feed</NavItem>
              </Nav>
              <Row>
                <Col md={12}>{this.props.children}</Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';

import Header from './components/header';
import Content from './components/content';

import './assets/css/index.css';

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Content data={this.props.children} />
          </Col>
          <Col md={3} />
        </Row>
      </Grid>
    );
  }
}

export default App;

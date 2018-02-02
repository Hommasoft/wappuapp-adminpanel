import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';

import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

import './assets/css/index.css';

class App extends Component {
  render() {
    return (
      <Grid fluid className="data-container">
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <Content data={this.props.children} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

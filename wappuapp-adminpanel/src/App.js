import React, { Component } from 'react';
import { Col, Jumbotron, Row, Grid, Well } from 'react-bootstrap';

import Header from './components/header';
import Content from './components/content';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={10} sm={12}>
            <Jumbotron>
              <Header />
              <br />
              <br />
              <Row>
                <Col xs={12}>
                  <Content data={this.props.children} />
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

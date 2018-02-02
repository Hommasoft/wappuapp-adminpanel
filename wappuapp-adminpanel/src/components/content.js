import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

class Content extends Component {
  render() {
    return (
      <div>
        <Well>{this.props.data}</Well>
      </div>
    );
  }
}

export default Content;

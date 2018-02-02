import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

import '../assets/css/content.css';

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

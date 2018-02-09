import React, { Component } from 'react';

import '../assets/css/content.css';

class Content extends Component {
  render() {
    return (
      <div className="contentSpace">
        <div className="contentContent">{this.props.data}</div>
      </div>
    );
  }
}

export default Content;

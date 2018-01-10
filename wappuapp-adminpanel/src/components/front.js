import React, { Component } from 'react';

class Front extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div>
          <b>WhappuApp adminpanel</b>
        </div>
        <div>This is WhappuApps admin panel.</div>
      </div>
    );
  }
}

export default Front;

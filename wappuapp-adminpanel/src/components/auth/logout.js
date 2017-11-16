import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Auth from '../../actions/auth';

class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }
  render() {
    return <div>Logout</div>;
  }
}

export default connect(null, Auth)(Logout);

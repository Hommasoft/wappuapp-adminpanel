import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Auth from '../actions/auth';

class Protected extends Component {
  componentWillMount() {
    this.props.getProtectedData();
  }
  render() {
    if (!this.props.protected) {
      return <div>Data not received</div>;
    }
    return <div>{this.props.protected}</div>;
  }
}

const mapStateToProps = state => {
  return { protected: state.protected.protectedData };
};

export default connect(mapStateToProps, Auth)(Protected);

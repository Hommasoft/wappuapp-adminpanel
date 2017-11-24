import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Auth from '../actions/auth';

class ProtectedAdmin extends Component {
  componentWillMount() {
    this.props.getAdminProtectedData();
  }
  render() {
    if (!this.props.protected) {
      return <div>Data only accessible by admin</div>;
    }
    return <div>{this.props.protected}</div>;
  }
}

const mapStateToProps = state => {
  return { protected: state.protected.protectedData };
};

export default connect(mapStateToProps, Auth)(ProtectedAdmin);

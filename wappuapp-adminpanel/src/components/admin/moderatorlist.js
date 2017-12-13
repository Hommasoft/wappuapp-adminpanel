import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Admin from '../../actions/admin';

class Moderatorlist extends Component {
  componentWillMount() {
    this.props.getModlist();
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <string>Error: {this.props.errorMessage}</string>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        Moderator list will be here
        {this.renderError()}
        {this.props.protected}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { protected: state.protected.ModList };
};

export default connect(mapStateToProps, Admin)(Moderatorlist);

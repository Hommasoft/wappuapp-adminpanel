import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as Auth from '../../actions/auth';

class ActivateAccount extends Component {
  handleFormSubmit({ password }) {
    this.props.activateaccount({ password });
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
    const { handleSubmit } = this.props;
    return (
      <div>
        <div>Account activation</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>New password:</label>
            <Field className="form-control" name="password" component="input" type="password" />
          </fieldset>
          {this.renderError()}
          <button action="submit" className="btn btn-primary">
            Activate account
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error.error };
};

export default reduxForm({
  form: 'auth'
})(connect(mapStateToProps, Auth)(ActivateAccount));

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as Auth from '../../actions/auth';

class ForgottenPassword extends Component {
  handleFormSubmit({ email }) {
    this.props.forgottenpassword({ email });
  }

  renderError() {
    if (this.props.errorMessage) {
      if (this.props.errorMessage.error) {
        return <div className="alert alert-danger">{this.props.errorMessage.error}</div>;
      } else {
        return <div className="alert alert-danger">Error: {this.props.errorMessage}</div>;
      }
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div>Forgotten password</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field className="form-control" name="email" component="input" type="text" />
          </fieldset>
          {this.renderError()}
          <button action="submit" className="btn btn-primary">
            Send new activation mail
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'auth'
})(connect(mapStateToProps, Auth)(ForgottenPassword));

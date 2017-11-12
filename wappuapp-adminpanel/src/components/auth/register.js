import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as Auth from '../../actions/auth';

class Register extends Component {
  handleFormSubmit({ username, email, password }) {
    this.props.register({ username, email, password });
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
        <div>Register</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Username:</label>
            <Field className="form-control" name="username" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field className="form-control" name="email" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <Field className="form-control" name="password" component="input" type="password" />
          </fieldset>
          <fieldset className="form-group">
            <label>Password again:</label>
            <Field
              className="form-control"
              name="passwordagain"
              component="input"
              type="password"
            />
          </fieldset>
          {this.renderError()}
          <button action="submit" className="btn btn-primary">
            Register
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
  form: 'register'
})(connect(mapStateToProps, Auth)(Register));

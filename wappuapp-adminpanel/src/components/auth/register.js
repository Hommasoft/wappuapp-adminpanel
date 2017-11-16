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

  renderField({ input, label, type, meta: { error } }) {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input className="form-control" {...input} placeholder={label} type={type} />
          {error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div>Register</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field name="username" label="Username" component={this.renderField} type="text" />
          </fieldset>
          <fieldset className="form-group">
            <Field name="email" label="Email" component={this.renderField} type="text" />
          </fieldset>
          <fieldset className="form-group">
            <Field name="password" label="Password" component={this.renderField} type="password" />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="passwordagain"
              label="Password again"
              component={this.renderField}
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

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter a valid email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }
  if (!values.username) {
    errors.username = 'Please enter a username';
  }
  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (!values.passwordagain) {
    errors.passwordagain = 'Please re-type your password';
  } else if (values.password !== values.passwordagain) {
    errors.passwordagain = 'Passwords must match';
  }
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'register',
  validate
})(connect(mapStateToProps, Auth)(Register));

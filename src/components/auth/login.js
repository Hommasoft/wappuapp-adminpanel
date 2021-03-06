import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../../assets/css/login.css';

import * as Auth from '../../actions/auth';

class Login extends Component {
  handleFormSubmit({ email, password }) {
    this.props.login({ email, password });
  }

  renderError() {
    console.log(this.props.errorMessage);
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">Error: {this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div align="center">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            />
          </fieldset>
          {this.renderError()}
          <button action="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <a href="/forgottenpassword">Forgotten password</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'login'
})(connect(mapStateToProps, Auth)(Login));

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as Auth from '../../actions/auth';

class AccountPage extends Component {
  handleFormSubmit({ newpassword, oldpassword }) {
    this.props.changepassword({ newpassword, oldpassword });
  }

  renderError() {
    if (this.props.errorMessage) {
      console.log(this.props.errorMessage);
      return <div className="alert alert-danger">{this.props.errorMessage}</div>;
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
    var accountType = localStorage.getItem('admin');
    if (accountType === 'true') {
      accountType = 'admin';
    } else {
      accountType = 'moderator';
    }
    return (
      <div>
        <div>
          <h3>User details</h3>
          Email: {localStorage.getItem('email')} <br />
          Account type: {accountType} <br />
          Activated: {localStorage.getItem('activated')} <br />
        </div>
        <br />
        <div align="center">
          Change password
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <Field
                name="oldpassword"
                label="Old password"
                component={this.renderField}
                type="password"
              />
            </fieldset>
            <br />
            <fieldset className="form-group">
              <Field
                name="newpassword"
                label="New password"
                component={this.renderField}
                type="password"
              />
            </fieldset>
            <fieldset className="form-group">
              <Field
                name="newpasswordagain"
                label="New password again"
                component={this.renderField}
                type="password"
              />
            </fieldset>
            {this.renderError()}
            <button action="submit" className="btn btn-primary">
              Change password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  //if (values.newpassword && values.newpassword.length < 8) {
  //  errors.newpassword = 'Password has to be atleast 8 characters long'
  //}
  if (values.newpassword && values.oldpassword === values.newpassword) {
    errors.newpassword = 'New password can not be the same as old one';
  }
  if (values.newpasswordagain && values.newpassword !== values.newpasswordagain) {
    errors.newpasswordagain = 'New passwords need to match';
  }
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'auth',
  validate
})(connect(mapStateToProps, Auth)(AccountPage));

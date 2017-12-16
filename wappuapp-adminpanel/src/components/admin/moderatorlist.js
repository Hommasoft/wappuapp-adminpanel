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

  renderData() {
    if (!this.props.protected) {
      return <div>Table empty</div>;
    }
    console.log(this.props);
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Activated</th>
            <th>Admin</th>
            <th>Promote</th>
            <th>Demote</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.protected.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.email}</td>
                <td>{data.activated + ''}</td>
                <td>{data.admin + ''}</td>
                <td>
                  <button className="btn btn-primary">^</button>
                </td>
                <td>
                  <button className="btn btn-primary">v</button>
                </td>
                <td>
                  <button className="btn btn-primary">X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <a href="/register">
          <button className="btn btn-primary">Add new moderator</button>
        </a>
        {this.renderError()}
        {this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { protected: state.protected.protectedData };
};

export default connect(mapStateToProps, Admin)(Moderatorlist);

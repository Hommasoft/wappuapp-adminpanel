import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

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
    return (
      <Table striped>
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
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                      this.props.promoteMod(data.id);
                    }}
                  >
                    ^
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                      this.props.demoteMod(data.id);
                    }}
                  >
                    v
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                      this.props.deleteMod(data.id);
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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

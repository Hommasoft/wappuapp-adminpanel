import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Glyphicon } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import '../../assets/css/confirm-alert.css';

import History from '../../history';
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

  renderPromoteButton(data) {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to promote ' + data.email + '?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.props.promoteMod(data.id),
            onCancel: () => History.push('/moderatorlist')
          });
        }}
      >
        Promote
      </button>
    );
  }

  renderDemoteButton(data) {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to demote ' + data.email + '?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.props.demoteMod(data.id),
            onCancel: () => History.push('/moderatorlist')
          });
        }}
      >
        Demote
      </button>
    );
  }

  renderData() {
    if (!this.props.protected) {
      return <div>Table empty</div>;
    }
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>
              <center>Activated</center>
            </th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {this.props.protected.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.email}</td>
                <td>{data.admin ? 'admin' : 'moderator'}</td>
                <td>
                  <center>{data.activated ? 'x' : 'o'}</center>
                </td>
                <td align="center">
                  {data.admin ? this.renderDemoteButton(data) : this.renderPromoteButton(data)}
                </td>
                <td align="center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                      confirmAlert({
                        title: 'Confirm',
                        message: 'Are you sure you want to delete ' + data.email + '?',
                        confirmLabel: 'Confirm',
                        cancelLabel: 'Cancel',
                        onConfirm: () => this.props.deleteMod(data.id),
                        onCancel: () => History.push('/moderatorlist')
                      });
                    }}
                  >
                    Delete
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
        <br />
        <br />
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

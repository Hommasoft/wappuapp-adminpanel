import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import ReactTable from 'react-table';
import '../../assets/css/confirm-alert.css';

import History from '../../history';
import * as Admin from '../../actions/admin';
import 'react-table/react-table.css';

class Moderatorlist extends Component {
  componentWillMount() {
    this.props.getModlist();
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

  renderPromoteButton(id) {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          confirmAlert({
            title: 'Promote',
            message: 'Are you sure you want to promote ' + id.email + '?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.props.promoteMod(id.id),
            onCancel: () => History.push('/moderatorlist')
          });
        }}
      >
        Promote
      </button>
    );
  }

  renderDemoteButton(id) {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          confirmAlert({
            title: 'Demote',
            message: 'Are you sure you want to demote ' + id.email + '?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.props.demoteMod(id.id),
            onCancel: () => History.push('/moderatorlist')
          });
        }}
      >
        Demote
      </button>
    );
  }

  renderDeleteButton(id) {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete ' + id.email + '?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.props.deleteMod(id.id),
            onCancel: () => History.push('/moderatorlist')
          });
        }}
      >
        Delete
      </button>
    );
  }

  renderData() {
    if (!this.props.protected) {
      return <div>Table empty</div>;
    }
    const columns = [
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Admin',
        accessor: 'admin',
        Cell: props => (props.value ? 'admin' : 'moderator')
      },
      {
        Header: 'Activated',
        accessor: 'activated',
        Cell: props => <center>{props.value ? 'X' : 'O'}</center>
      },
      {
        Header: ' ',
        accessor: 'admin',
        // prettier-ignore
        Cell: props => (props.value ? this.renderDemoteButton(props.row) : this.renderPromoteButton(props.row))
      },
      {
        Header: ' ',
        accessor: 'id',
        Cell: props => this.renderDeleteButton(props.row)
      }
    ];

    return <ReactTable data={this.props.protected} columns={columns} defaultPageSize={10} />;
  }

  render() {
    return (
      <div>
        <a href="/register">
          <button className="btn btn-primary">Add new moderator</button>
        </a>
        <br />
        <br />
        {this.renderData()}
        {this.renderError()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { protected: state.protected.protectedData, errorMessage: state.protected.error };
};

export default connect(mapStateToProps, Admin)(Moderatorlist);

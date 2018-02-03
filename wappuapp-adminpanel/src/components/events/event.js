import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/login.css';
import { confirmAlert } from 'react-confirm-alert';
import ReactTable from 'react-table';
import '../../assets/css/confirm-alert.css';

import History from '../../history';
import * as Event from '../../actions/event';
import 'react-table/react-table.css';

class Events extends Component {
  componentWillMount() {
    this.props.getevents(0);
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

  renderUpdateEventButton(id) {
    return (
      <center>
        <a href={'/updateevent/' + id.id}>
          <button className="btn btn-primary">Edit</button>
        </a>
      </center>
    );
  }

  renderDeleteEventButton(id) {
    return (
      <center>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => {
            confirmAlert({
              title: 'Delete',
              message: 'Are you sure you want to delete event "' + id.name + '"?',
              confirmLabel: 'Confirm',
              cancelLabel: 'Cancel',
              onConfirm: () => this.props.deleteevent(id.id),
              onCancel: () => History.push('/event/0')
            });
          }}
        >
          Delete
        </button>
      </center>
    );
  }

  renderData() {
    if (!this.props.event) {
      return <div>No events in selected city</div>;
    }
    const columns = [
      {
        Header: 'Code',
        accessor: 'code'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Location',
        accessor: 'location_name'
      },
      {
        Header: 'Ogranizer',
        accessor: 'organizer'
      },
      {
        Header: 'City ID',
        accessor: 'city_id'
      },
      {
        Header: 'Show',
        accessor: 'show'
      },
      {
        Header: ' ',
        accessor: 'id',
        Cell: props => this.renderUpdateEventButton(props.row)
      },
      {
        Header: ' ',
        accessor: 'id',
        Cell: props => this.renderDeleteEventButton(props.row)
      }
    ];
    return (
      <div>
        <ReactTable data={this.props.event} columns={columns} defaultPageSize={10} />
      </div>
    );
  }
  render() {
    const currentPage = History.location.pathname;
    return (
      <div>
        <div>
          <a href="/addevent">
            <button className="btn btn-primary">Add new event</button>
          </a>
          <br />
          <br />
          {this.renderError()}
        </div>
        <div>
          <Nav justified bsStyle="tabs" activeKey={currentPage}>
            <NavItem eventKey="/event/0" href="/event/0">
              All
            </NavItem>
            <NavItem eventKey="/event/2" href="/event/2">
              Otaniemi
            </NavItem>
            <NavItem eventKey="/event/3" href="/event/3">
              Tampere
            </NavItem>
          </Nav>
        </div>
        <div>{this.renderData()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { event: state.event.eventsData, errorMessage: state.event.error };
};

export default connect(mapStateToProps, Event)(Events);

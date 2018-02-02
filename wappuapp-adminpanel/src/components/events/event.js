import React, { Component } from 'react';
import { Table, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/login.css';
import { confirmAlert } from 'react-confirm-alert';
import '../../assets/css/confirm-alert.css';

import History from '../../history';
import * as Event from '../../actions/event';

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

  renderData() {
    if (!this.props.event) {
      return <div>No events in selected city</div>;
    }
    return (
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Location</th>
            <th>Organizer</th>
            <th>City ID</th>
            <th>Show?</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {this.props.event.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.code}</td>
                <td>{data.name}</td>
                <td>{data.location_name}</td>
                <td>{data.organizer}</td>
                <td>{data.city_id}</td>
                <td>{data.show ? 'X' : 'O'}</td>
                <td>
                  <a href={'/updateevent/' + data.id}>
                    <button className="btn btn-primary">Edit</button>
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                      confirmAlert({
                        title: 'Confirm',
                        message: 'Are you sure you want to delete event ' + data.name + '?',
                        confirmLabel: 'Confirm',
                        cancelLabel: 'Cancel',
                        onConfirm: () => this.props.deleteevent(data.id),
                        onCancel: () => History.push('/event')
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

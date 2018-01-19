import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/login.css';

import * as Event from '../../actions/event';

class Events extends Component {
  componentWillMount() {
    this.props.getevents(0);
  }

  renderData() {
    if (!this.props.event) {
      return <div>No events in selected city</div>;
    }
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Location</th>
            <th>Organizer</th>
            <th>Contact</th>
            <th>Show?</th>
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
                <td>{data.contact_details}</td>
                <td>{data.show}</td>
                <td>
                  <a href={'updateevent/' + data.id}>
                    <button className="btn btn-primary">Edit</button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  render() {
    console.log(this.props.event);
    return (
      <div>
        <a href="/addevent">Add event</a>
        {this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { event: state.event.eventData };
};

export default connect(mapStateToProps, Event)(Events);

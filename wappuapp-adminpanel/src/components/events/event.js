import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../../assets/css/login.css';

import * as Event from '../../actions/event';

class Events extends Component {
  render() {
    return (
      <div>
        <a href="/addevent">Add event</a>
      </div>
    );
  }
}

export default Events;

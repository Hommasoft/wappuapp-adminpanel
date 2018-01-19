import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/login.css';

import * as Event from '../../actions/event';

class UpdateEvent extends Component {
  componentWillMount() {
    this.props.getevent();
  }

  handleFormSubmit({
    name,
    location_name,
    start_time,
    end_time,
    organizer,
    contact_details,
    fb_event_id,
    description
  }) {
    this.props.updateevent({
      name,
      location_name,
      start_time,
      end_time,
      organizer,
      contact_details,
      fb_event_id,
      description
    });
  }

  render() {
    if (!this.props.event) {
      return <div>Data not yet received</div>;
    }
    const { handleSubmit } = this.props;
    console.log(this.props.event[0].name);
    return (
      <div>
        <form key={this.props.event.id} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field className="form-control" name="code" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <Field className="form-control" name="name" component="input" type="text" />
          </fieldset>
          <button action="submit" className="btn btn-primary">
            Update event
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { event: state.event.eventData };
};

export default reduxForm({
  enableReninitialize: true,
  form: 'event',
  initialValues: {
    name: 'asd'
  }
})(connect(mapStateToProps, Event)(UpdateEvent));

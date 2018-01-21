import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../../assets/css/login.css';

import * as Event from '../../actions/event';

class UpdateEvent extends Component {
  componentWillMount() {
    this.props.getevent();
  }

  handleFormSubmit({
    id,
    code,
    name,
    location_name,
    start_time,
    end_time,
    organizer,
    contact_details,
    fb_event_id,
    description,
    show,
    teemu,
    city_id
  }) {
    this.props.updateevent({
      id,
      code,
      name,
      location_name,
      start_time,
      end_time,
      organizer,
      contact_details,
      fb_event_id,
      description,
      show,
      teemu,
      city_id
    });
  }

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.initialValues);
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Code</label>
            <Field className="form-control" name="id" component="input" type="text" disabled />
          </fieldset>
          <fieldset className="form-group">
            <label>Code</label>
            <Field className="form-control" name="code" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Name</label>
            <Field className="form-control" name="name" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Location name</label>
            <Field className="form-control" name="location_name" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Start Time</label>
            <Field className="form-control" name="start_time" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>End Time</label>
            <Field className="form-control" name="end_time" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Description</label>
            <Field className="form-control" name="description" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Organizer</label>
            <Field className="form-control" name="organizer" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Contact Details</label>
            <Field className="form-control" name="contact_details" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>FB event ID</label>
            <Field className="form-control" name="fb_event_id" component="input" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Show</label>
            <Field className="form-control" name="show" component="input" type="checkbox" />
          </fieldset>
          <fieldset className="form-group">
            <label>Teemu</label>
            <Field className="form-control" name="teemu" component="input" type="checkbox" />
          </fieldset>
          <fieldset className="form-group">
            <label>City</label>
            <Field className="form-control" name="city_id" component="select">
              <option value="0">Choose</option>
              <option value="2">Tampere</option>
              <option value="3">Otaniemi</option>
            </Field>
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
  return { initialValues: state.event.eventData };
};

export default connect(mapStateToProps, Event)(
  reduxForm({
    form: 'event',
    enableReinitialize: true
  })(UpdateEvent)
);

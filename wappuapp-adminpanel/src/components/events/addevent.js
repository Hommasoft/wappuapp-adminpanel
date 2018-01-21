import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../../assets/css/login.css';

import * as Event from '../../actions/event';

class Addevent extends Component {
  handleFormSubmit({
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
    this.props.addevent({
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

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <string>Error: {this.props.errorMessage}</string>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="code"
              component="input"
              type="text"
              placeholder="Code"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="name"
              component="input"
              type="text"
              placeholder="Event Name"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="location_name"
              component="input"
              type="text"
              placeholder="Event location"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="start_time"
              component="input"
              type="text"
              placeholder="Starting time (1999-01-08 04:05:06)"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="end_time"
              component="input"
              type="text"
              placeholder="Ending time (1999-01-08 04:05:06)"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="organizer"
              component="input"
              type="text"
              placeholder="Organizer"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="contact_details"
              component="input"
              type="text"
              placeholder="Contact details"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="fb_event_id"
              component="input"
              type="text"
              placeholder="Facebook event ID"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              name="description"
              component="input"
              type="textarea"
              placeholder="Description"
            />
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
          </fieldset>
          {this.renderError()}
          <button action="submit" className="btn btn-primary">
            Add event
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.event.error };
};

export default reduxForm({
  form: 'event'
})(connect(mapStateToProps, Event)(Addevent));

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isISO8601 } from 'validator';
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
    city_id,
    location
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
      city_id,
      location
    });
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

  renderField({ input, label, type, meta: { error } }) {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input className="form-control" {...input} placeholder={label} type={type} />
          {error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field name="code" component={this.renderField} label="Code" type="text" />
          </fieldset>
          <fieldset className="form-group">
            <Field name="name" component={this.renderField} type="text" label="Event Name" />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="location_name"
              component={this.renderField}
              type="text"
              label="Event location"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="start_time"
              component={this.renderField}
              type="text"
              label="Starting time (1999-01-08 04:05:06)"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="end_time"
              component={this.renderField}
              type="text"
              label="Ending time (1999-01-08 04:05:06)"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field name="organizer" component={this.renderField} type="text" label="Organizer" />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="contact_details"
              component={this.renderField}
              type="text"
              label="Contact details"
            />
          </fieldset>
          <label>Location coordinates</label>
          <fieldset className="form-group">
            <Field name="location.x" component="input" type="text" placeholder="Latitude" />
            <Field name="location.y" component="input" type="text" placeholder="Longitude" />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="cover_image"
              component={this.renderField}
              type="text"
              label="Cover Image (URL)"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="fb_event_id"
              component={this.renderField}
              type="text"
              label="Facebook event ID"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Description</label>
            <Field
              name="description"
              component="textarea"
              rows="8"
              cols="50"
              placeholder="description"
              type="text"
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
                <option value="3">Tampere</option>
                <option value="2">Otaniemi</option>
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

const validate = values => {
  const errors = {};
  if (!values.code) {
    errors.code = 'Code is required';
  }
  if (values.name && values.name.length > 99) {
    errors.name = 'Too long name';
  }
  if (values.location_name && values.location_name.length > 99) {
    errors.location_name = 'Too long location name';
  }
  if (values.description && values.description.length > 4999) {
    errors.description = 'Too long Description';
  }
  if (values.start_time && !isISO8601(values.start_time)) {
    errors.start_time = 'Wrong format';
  }
  if (values.end_time && !isISO8601(values.end_time)) {
    errors.start_time = 'Wrong format';
  }
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.event.error };
};

export default reduxForm({
  form: 'event',
  validate
})(connect(mapStateToProps, Event)(Addevent));

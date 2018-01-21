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
    code,
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
    const { handleSubmit } = this.props;
    console.log(this.props.initialValues);
    if (!this.props.initialValues) {
      return <div>Not ready yet</div>;
    }
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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

const mapStateToProps = ({ state }) => ({
  initialValues: { name: 'asd', code: 'asd' }
});

export default reduxForm({
  enableReinitialize: true,
  form: 'form'
})(connect(mapStateToProps, Event)(UpdateEvent));

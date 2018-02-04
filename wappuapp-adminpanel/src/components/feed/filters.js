import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  DropdownButton,
  MenuItem,
  Row,
  Modal,
  Button,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

import * as Filt from '../../actions/filters';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.changeCity = this.changeCity.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeReports = this.changeReports.bind(this);
    this.closeMsgBox = this.closeMsgBox.bind(this);
    this.showMsgBox = this.showMsgBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      showModal: false
    };
  }

  changeSort(sortType) {
    this.props.changeSort(sortType);
    this.props.fetchFeed();
  }

  changeType(feedType) {
    if (!feedType) {
      this.props.changeType('');
    } else {
      this.props.changeType('&type=' + feedType);
    }
    this.props.fetchFeed();
  }

  changeCity(cityId) {
    this.props.changeCity(cityId);
    this.props.fetchFeed();
  }

  changeReports(feedType) {
    if (feedType === 'reports') {
      this.props.fetchReports();
    } else {
      this.props.changeToFeed();
    }
  }

  showMsgBox() {
    this.setState({ showModal: true });
  }

  closeMsgBox() {
    this.setState({ showModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[1].value);
    this.props.sendSystemMsg(event.target[0].value, event.target[1].value);
    this.setState({ showModal: false });
    this.props.fetchFeed();
  }

  render() {
    return (
      <Row className="filters">
        <DropdownButton title="City" id="city">
          <MenuItem key="all" eventKey={0} onSelect={this.changeCity}>
            All
          </MenuItem>
          {this.props.cities.map(city => (
            <MenuItem key={city.id} eventKey={city.id} onSelect={this.changeCity}>
              {city.name}
            </MenuItem>
          ))}
        </DropdownButton>
        <DropdownButton title="Sort" id="sort">
          <MenuItem key="new" eventKey="new" onSelect={this.changeSort}>
            New
          </MenuItem>
          <MenuItem key="hot" eventKey="hot" onSelect={this.changeSort}>
            Hot
          </MenuItem>
        </DropdownButton>
        <DropdownButton title="Type" id="type">
          <MenuItem key="all" onSelect={this.changeType}>
            All
          </MenuItem>
          <MenuItem key="text" eventKey="TEXT" onSelect={this.changeType}>
            Text
          </MenuItem>
          <MenuItem key="image" eventKey="IMAGE" onSelect={this.changeType}>
            Image
          </MenuItem>
        </DropdownButton>
        <DropdownButton title="Select feed" id="feedselect">
          <MenuItem eventKey="feed" onSelect={this.changeReports}>
            Feed
          </MenuItem>
          <MenuItem eventKey="reports" onSelect={this.changeReports}>
            Reports
          </MenuItem>
        </DropdownButton>
        <Button onClick={this.showMsgBox}>Send message</Button>
        <Modal show={this.state.showModal} onHide={this.closeMsgBox}>
          <Modal.Header closeButton>
            <Modal.Title>Send system message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Text</ControlLabel>
                <FormControl type="text" placeholder="Hello World!" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl componentClass="select">
                  {this.props.cities.map(city => <option value={city.id}>{city.name}</option>)}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <Button type="submit">Submit</Button>
              </FormGroup>
            </form>
          </Modal.Body>
        </Modal>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    city: state.filters.city,
    sort: state.filters.sort,
    type: state.filters.type
  };
};

export default connect(mapStateToProps, Filt)(Filters);

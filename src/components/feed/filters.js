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
      showModal: false,
      reportSelect: 'Feed'
    };
  }

  changeSort(sortType) {
    this.props.changeSort(sortType);
    this.props.fetchFeed();
  }

  changeType(feedType) {
    this.props.changeType(feedType);
    this.props.fetchFeed();
  }

  changeCity(city) {
    this.props.changeCity(city);
    this.props.fetchFeed();
  }

  changeReports(feedType) {
    if (feedType === 'Reports') {
      this.props.fetchReports();
    } else {
      this.props.changeToFeed();
    }
    this.setState({ reportSelect: feedType });
  }

  showMsgBox() {
    this.setState({ showModal: true });
  }

  closeMsgBox() {
    this.setState({ showModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendSystemMsg(event.target[0].value, event.target[1].value);
    this.setState({ showModal: false });
    this.props.fetchFeed();
  }

  render() {
    return (
      <Row className="filters">
        <DropdownButton title={this.props.city.name} id="city">
          <MenuItem key="all" eventKey={{ id: 0, name: 'All' }} onSelect={this.changeCity}>
            All
          </MenuItem>
          {this.props.cities.map(city => (
            <MenuItem key={city.id} eventKey={city} onSelect={this.changeCity}>
              {city.name}
            </MenuItem>
          ))}
        </DropdownButton>
        <DropdownButton title={this.props.sort} id="sort">
          <MenuItem key="new" eventKey="New" onSelect={this.changeSort}>
            New
          </MenuItem>
          <MenuItem key="hot" eventKey="Hot" onSelect={this.changeSort}>
            Hot
          </MenuItem>
        </DropdownButton>
        <DropdownButton title={this.props.type} id="type">
          <MenuItem key="all" eventKey="Type" onSelect={this.changeType}>
            All
          </MenuItem>
          <MenuItem key="text" eventKey="TEXT" onSelect={this.changeType}>
            Text
          </MenuItem>
          <MenuItem key="image" eventKey="IMAGE" onSelect={this.changeType}>
            Image
          </MenuItem>
        </DropdownButton>
        <DropdownButton title={this.state.reportSelect} id="reportselect">
          <MenuItem eventKey="Feed" onSelect={this.changeReports}>
            Feed
          </MenuItem>
          <MenuItem eventKey="Reports" onSelect={this.changeReports}>
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
                  {this.props.cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
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

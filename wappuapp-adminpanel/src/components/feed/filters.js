import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem, Row } from 'react-bootstrap';

import * as Filt from '../../actions/filters';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.changeCity = this.changeCity.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeReports = this.changeReports.bind(this);
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

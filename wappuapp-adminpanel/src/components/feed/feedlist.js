import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, DropdownButton, MenuItem, Row } from 'react-bootstrap';

import * as Feed from '../../actions/feed';
import * as Filters from '../../actions/filters';
import loadingStates from '../../constants/loadingstates';

import FeedItem from './feeditem';

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.renderFeed = this.renderFeed.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.banUserid = this.banUserid.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeed();
    this.props.fetchCities();
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

  removeItem(id) {
    this.props.removeFeedItem(id);
  }

  banUserid(uuid) {
    this.props.banUser(uuid);
  }

  renderFeed(feedListState) {
    switch (feedListState) {
      case loadingStates.LOADING:
        return <p>Loading</p>;
      case loadingStates.FAILED:
        return <p>ERROR</p>;
      default:
        let items = this.props.feed;
        return (
          <ListGroup>
            {items.map(item => (
              <FeedItem
                item={item}
                key={item.id}
                removeItem={this.removeItem}
                banUser={this.banUserid}
              />
            ))}
          </ListGroup>
        );
    }
  }

  render() {
    const cities = this.props.cities;
    return (
      <div className="feedContainer">
        <Row className="filters">
          <DropdownButton title="City" id="city">
            <MenuItem key="all" eventKey={0} onSelect={this.changeCity}>
              All
            </MenuItem>
            {cities.map(city => (
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
        </Row>
        <Row>{this.renderFeed(this.props.feedListState)}</Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    feed: state.feed.feed,
    feedListState: state.feed.listState,
    cities: state.feed.cities
  };
};

const mapDispatchToProps = {
  ...Feed,
  ...Filters
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);

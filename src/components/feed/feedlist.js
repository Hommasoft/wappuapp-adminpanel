import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Row, Button } from 'react-bootstrap';

import * as Feed from '../../actions/feed';
import loadingStates from '../../constants/loadingstates';

import FeedItem from './feeditem';
import Filters from './filters';

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.renderFeed = this.renderFeed.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.banUserid = this.banUserid.bind(this);
    this.getMoreFeed = this.getMoreFeed.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeed();
    this.props.fetchCities();
  }

  removeItem(id) {
    this.props.removeFeedItem(id);
  }

  banUserid(uuid) {
    this.props.banUser(uuid);
  }

  getMoreFeed() {
    this.props.fetchMoreFeed();
  }

  renderFeed(feedListState) {
    switch (feedListState) {
      case loadingStates.LOADING:
        return <p>Loading</p>;
      case loadingStates.FAILED:
        return <p>ERROR</p>;
      default:
        let items;
        if (!this.props.reportsVisible) {
          items = this.props.feed;
        } else {
          items = this.props.reports;
        }
        return (
          <ListGroup>
            {items.map(item => (
              <FeedItem
                item={item}
                key={item.id}
                removeItem={this.removeItem}
                banUser={this.banUserid}
                renderReports={this.props.reportsVisible}
              />
            ))}
          </ListGroup>
        );
    }
  }

  render() {
    return (
      <div className="feedContainer">
        <Filters cities={this.props.cities} fetchFeed={this.props.fetchFeed} />
        <Row>{this.renderFeed(this.props.feedListState)}</Row>
        <Row className="moreFeedButton">
          <Button onClick={this.getMoreFeed} disabled={this.props.moreFeedButton}>
            Load more feed
          </Button>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    feed: state.feed.feed,
    feedListState: state.feed.listState,
    cities: state.feed.cities,
    moreFeedButton: state.feed.moreFeedButton,
    reports: state.filters.reports,
    reportsVisible: state.filters.reportsVisible
  };
};

export default connect(mapStateToProps, Feed)(FeedList);

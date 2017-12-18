import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import * as Feed from '../../actions/feed';
import loadingStates from '../../constants/loadingstates';

import FeedItem from './feeditem';

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.renderFeed = this.renderFeed.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeed();
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
          <ListGroup componentClass="feeditem">
            {items.map(item => (
              <FeedItem item={item} key={item.id} removeFeedItem={this.props.removeFeedItem} />
            ))}
          </ListGroup>
        );
    }
  }

  render() {
    return <div>{this.renderFeed(this.props.feedListState)}</div>;
  }
}
const mapStateToProps = state => {
  return {
    feed: state.feed.feed,
    feedListState: state.feed.listState
  };
};

export default connect(mapStateToProps, Feed)(FeedList);

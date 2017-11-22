import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import * as Feed from '../../actions/feed.js';
import loadingStates from '../../constants/loadingstates';

import FeedItem from './feeditem.js';

class FeedList extends Component {
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
            <p>Onnex on feediä :D</p>
            {items.map(item => <FeedItem item={item} key={item.id} />)}
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

import React, { Component } from 'react';
import { connect } from "react-redux";

import * as Feed from '../../actions/feed.js';
import loadingStates from '../../constants/loadingstates';

import { FeedItem } from './feeditem';

class FeedList extends Component {

  componentDidMount() {
    this.props.fetchFeed()
  }

  renderFeed(feedListState) {
    switch (feedListState) {
      case loadingStates.LOADING:
        return <p>Loading</p>
      case loadingStates.FAILED:
        return <p>ERROR</p>
      default:
        return (
          <div>
            <p>Oispafeediä</p>
            <p>{this.props.feed}</p>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.renderFeed(this.props.feedListState)}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { /*
    feed: state.feed.get('list'),
    feedListState: state.feed.get('listState') */
  }
};

export default connect(mapStateToProps, Feed)(FeedList);

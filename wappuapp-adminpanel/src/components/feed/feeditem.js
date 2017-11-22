import React, { Component } from 'react';
import propTypes from 'prop-types';

class FeedItem extends Component {
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div>
        <p>{item.author.name}</p>
        <p>{item.author.team}</p>
        <p>{item.text}</p>
      </div>
    );
  }
}

FeedItem.propTypes = {
  item: propTypes.object.isRequired
};

export default FeedItem;

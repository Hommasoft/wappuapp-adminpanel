import React, { Component } from 'react';
import propTypes from 'prop-types';

class CommentList extends Component {
  render() {
    return <p>Kommentteja jee </p>;
  }
}

CommentList.propTypes = {
  comments: propTypes.array.isRequired
};

export default CommentList;

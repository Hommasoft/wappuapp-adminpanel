import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import '../../assets/css/comments.css';

class CommentList extends Component {
  render() {
    const items = this.props.comments;
    return (
      <div>
        {items.map(item => (
          <div className="commentsContainer" key={item.id}>
            <Row>
              <h3>{item.author.name}</h3>
              <h5>{item.author.team}</h5>
            </Row>
            <Row>
              <p>{item.text}</p>
            </Row>
          </div>
        ))}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: propTypes.array.isRequired
};

export default CommentList;

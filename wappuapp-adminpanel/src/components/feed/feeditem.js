import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import time from '../../utils/time';

import './feed.css';

class FeedItem extends Component {
  render() {
    const { item } = this.props;
    console.log(item);
    let imgUrl;
    //for testing without imgix
    const ago = time.getTimeAgo(item.createdAt);
    const isItemImage = item.type === 'IMAGE';
    if (isItemImage) {
      imgUrl = item.url.replace('https://wappuapp.imgix.net/', '');
    }
    return (
      <div className="feedItemContainer">
        <div className="feedItem">
          <Row>
            <Col md={6} className="userInfo">
              <h3 className="user">{item.author.name}</h3>
              <p className="team">{item.author.team}</p>
            </Col>
            <Col md={6}>
              <h3 className="timeInfo">{ago}</h3>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {isItemImage ? (
                <img className="itemImage" src={imgUrl} />
              ) : (
                <p className="itemText">{item.text}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <p className="score"> {item.votes} </p>
            </Col>
            <Col md={6}>
              <p className="timeInfo"> Comments: 0 </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

FeedItem.propTypes = {
  item: propTypes.object.isRequired
};

export default FeedItem;

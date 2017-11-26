import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import time from '../../utils/time';

import '../../assets/css/feed.css';

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
            <Col xs={6} sm={6} md={6}>
              <h3 className="itemUser">{item.author.name}</h3>
              <h5 className="itemTeam">{item.author.team}</h5>
            </Col>
            <Col xs={6} sm={6} md={6}>
              <h3 className="itemTime">{ago}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              {isItemImage ? (
                <img className="itemImage" src={imgUrl} />
              ) : (
                <p className="itemText">{item.text}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6}>
              <h3 className="itemScore"> {item.votes} </h3>
            </Col>
            <Col xs={6} sm={6} md={6} className="timeInfo">
              <h3 className="itemComments"> Comments: 0 </h3>
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

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row, DropdownButton, MenuItem } from 'react-bootstrap';

import time from '../../utils/time';
import kebabmenu from '../../assets/img/kebabmenu.svg';

import '../../assets/css/feed.css';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.onClickBan = this.onClickBan.bind(this);
  }

  onClickRemove() {
    this.props.removeItem(this.props.item.id);
  }

  onClickBan() {
    this.props.banUser(this.props.item.author.id);
  }

  render() {
    const { item } = this.props;
    console.log(item);
    let imgUrl;
    const title = <img src={kebabmenu} width={20} height={20} alt="Menu" />;
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
              <DropdownButton
                key={item.id}
                id={'dropdownmenu' + item.id}
                title={title}
                noCaret={true}
                bsStyle="link"
                bsSize="xsmall"
              >
                <MenuItem onSelect={this.onClickRemove}>Delete</MenuItem>
                <MenuItem onSelect={this.onClickBan}>Ban user</MenuItem>
              </DropdownButton>
              <h3 className="itemTime">{ago}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              {isItemImage ? (
                <img className="itemImage" src={imgUrl} alt="Feed Item" />
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

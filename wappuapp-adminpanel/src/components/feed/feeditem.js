import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import time from '../../utils/time';
import kebabmenu from '../../assets/img/kebabmenu.svg';
import * as Comments from '../../actions/comments';
import loadingStates from '../../constants/loadingstates';

import CommentList from './commentlist';

import '../../assets/css/feed.css';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  onClickOpenComments() {
    this.props.fetchComments(this.props.item.id);
  }

  onClickRemove() {
    this.props.removeItem(this.props.item.id);
  }

  renderComments(commentListState) {
    switch (commentListState) {
      case loadingStates.LOADING:
        return <p>Loading</p>;
      case loadingStates.FAILED:
        return <p>ERROR</p>;
      default:
        let items = this.props.comments;
        console.log(items);
        if (items.length === 0) {
          return <p> No comments.</p>;
        }
        return <CommentList comments={items} />;
    }
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
              <Button onClick={this.props.onClickOpenComments}> Comments: 0 </Button>
            </Col>
          </Row>
        </div>
        <div className="commentsContainer">{this.renderComments(this.props.commentListState)}</div>
      </div>
    );
  }
}

FeedItem.propTypes = {
  item: propTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    listState: state.comments.listState
  };
};

export default connect(mapStateToProps, Comments)(FeedItem);

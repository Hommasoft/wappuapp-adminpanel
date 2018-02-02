import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import time from '../../utils/time';
import kebabmenu from '../../assets/img/kebabmenu.svg';
import commentArrowDown from '../../assets/img/ic_keyboard_arrow_down_black_24px.svg';
import commentArrowUp from '../../assets/img/ic_keyboard_arrow_up_black_24px.svg';
import * as Comments from '../../actions/comments';
import loadingStates from '../../constants/loadingstates';

import CommentList from './commentlist';

import '../../assets/css/feed.css';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.onClickRemove = this.onClickRemove.bind(this);
    this.onClickBan = this.onClickBan.bind(this);
    this.onClickOpenComments = this.onClickOpenComments.bind(this);
  }

  onClickOpenComments() {
    if (!this.state.isVisible) {
      this.props.fetchComments(this.props.item.id);
    }
    this.setState({ isVisible: !this.state.isVisible });
  }

  onClickRemove() {
    this.props.removeItem(this.props.item.id);
  }

  onClickBan() {
    this.props.banUser(this.props.item.author.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.visibleComment !== this.props.item.id) {
      if (nextState.isVisible !== this.state.isVisible && !nextState.isVisible) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  renderComments(commentListState) {
    switch (commentListState) {
      case loadingStates.LOADING:
        console.log('loading');
        return <p>Loading</p>;
      case loadingStates.FAILED:
        return <p>ERROR</p>;
      default:
        console.log(this.props.comments);
        return (
          <CommentList
            comments={this.props.comments}
            banUser={this.props.banUser}
            removeComment={this.props.removeComment}
          />
        );
    }
  }

  render() {
    const { item } = this.props;
    console.log(item);
    let imgUrl;
    let commentComponent = null;
    let commentArrow = <img src={commentArrowDown} width={20} height={20} alt="openComments" />;
    const title = <img src={kebabmenu} width={20} height={20} alt="Menu" />;
    const ago = time.getTimeAgo(item.createdAt);
    //for testing without imgix
    const isItemImage = item.type === 'IMAGE';
    if (isItemImage) {
      imgUrl = item.url.replace('https://wappuapp.imgix.net/', '');
    }
    if (this.props.visibleComment === item.id && this.state.isVisible) {
      commentComponent = this.renderComments(this.props.commentListState);
      commentArrow = <img src={commentArrowUp} width={20} height={20} alt="closeComments" />;
    }

    return (
      <div>
        <div className="feedItemContainer">
          <div className="feedItem">
            <Row>
              <Col xs={6} sm={6} md={6}>
                <h3 className="itemUser">{item.author.name}</h3>
                <h5 className="itemTeam">{item.author.team}</h5>
              </Col>
              <Col xs={6} sm={6} md={6} className="kebabMenu">
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
                <Button onClick={this.onClickOpenComments} bsSize="small" className="commentButton">
                  {' '}
                  Comments: {item.numberOfComments} {commentArrow}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div>{commentComponent}</div>
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
    listState: state.comments.listState,
    visibleComment: state.comments.visibleComment
  };
};

export default connect(mapStateToProps, Comments)(FeedItem);

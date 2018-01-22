import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';

import kebabmenu from '../../assets/img/kebabmenu.svg';

import '../../assets/css/comments.css';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.onClickBan = this.onClickBan.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  onClickBan(id) {
    this.props.banUser(id);
  }

  onClickRemove(id) {
    this.props.removeComment(id);
  }

  render() {
    const items = this.props.comments;
    const title = <img src={kebabmenu} width={14} height={14} alt="Menu" />;
    return (
      <div>
        {items.map(item => (
          <div className="commentsContainer" key={item.id}>
            <Row>
              <Col xs={6} sm={6} md={6}>
                <h3>{item.author.name}</h3>
                <h5>{item.author.team}</h5>
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
                  <MenuItem
                    onSelect={() => {
                      this.onClickRemove(item.id);
                    }}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem
                    onSelect={() => {
                      this.onClickBan(item.author.id);
                    }}
                  >
                    Ban user
                  </MenuItem>
                </DropdownButton>
              </Col>
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

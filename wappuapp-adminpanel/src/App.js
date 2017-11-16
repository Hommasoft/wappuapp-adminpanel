import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="jumbotron">
              <div>
                <a href="/">Front</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
                <a href="/logout">Logout</a>
                <a href="/protected">Protected</a>
              </div>
              <div className="row">
                <div className="col-md-12">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

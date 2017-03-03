import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Channel from './Channel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  handleLogin(e, auth) {
    this.setState({
      user: e,
      gapiAuth: auth
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Login onChange={this.handleLogin.bind(this)}/>

        <div>
          {this.state.user && this.state.gapiAuth?
            <Channel user={this.state.user}/>
            : ''
          }
        </div>
      </div>
    );
  }
}

export default App;

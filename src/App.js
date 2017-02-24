import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import Login from './Login';

class App extends Component {


  handleLogin(e) {
    this.setState({
      user: e
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

        <Login onChange={this.handleLogin}/>
      </div>
    );
  }
}

reactMixin(App.prototype, ReactFireMixin)

export default App;

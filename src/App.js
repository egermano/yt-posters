import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'

const ref = new Firebase("https://yt-posters.firebaseio.com");

class App extends Component {
  // mixins: [ReactFireMixin]

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
        <p>Entre com a sua conta do Google para começar...</p>
        <p><button onClick={this.login}>Entrar</button></p>
      </div>
    );
  }

  login() {
    var provider = new ref.auth.GoogleAuthProvider().then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...

      console.log(token, user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
}

reactMixin(App.prototype, ReactFireMixin)

export default App;

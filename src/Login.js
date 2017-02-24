import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged(function(firebaseUser) {
      // unsubscribe();
      this.setState({
        user: firebaseUser
      });

      // send to parent the user
      this.props.onChange(this.state.user);
    }.bind(this));
  }

  render() {
    return (
      <div className="Login">
        <p>{(this.state.user? this.state.user.displayName : 'Entre com a sua conta do Google para começar...')}</p>
        <p>
          {this.state.user ? (
            <button onClick={this.logout}>Sair</button>
          ) : (
            <button onClick={this.login}>Entrar</button>
          )}
        </p>
      </div>
    );
  }

  login() {
    var provider = new Firebase.auth.GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.addScope('https://www.googleapis.com/auth/youtube.readonly');

    Firebase.auth().signInWithPopup(provider);
  }

  logout() {
    Firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
      console.error('Error on logout', error);
    });
  }
}

reactMixin(Login.prototype, ReactFireMixin)

export default Login;

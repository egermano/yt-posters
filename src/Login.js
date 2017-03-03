import React, { Component } from 'react';
import Firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  handleGoogleApi() {
    console.log('handleGoogleApi');
    window.gapi.client.load('youtube', 'v3', this.handleYoutube.bind(this));
    this.setState({
      gapi: true
    });
    this.gapiAuth();
  }

  handleYoutube() {
    console.log('handleYoutube');
    this.setState({
      youtube: true
    });
    this.gapiAuth();
  }

  gapiAuth() {
    if (this.state.gapi && this.state.youtube && this.state.user && this.state.user.accessToken) {
      var tokenObject = {
        access_token: this.state.user.accessToken
      };

      // set the authentication token
      window.gapi.auth.setToken(tokenObject);

      this.setState({
        gapiAuth: true
      });

      console.log('gapiAuth');

      // send to parent the user
      this.props.onChange(this.state.user, this.state.gapiAuth);
      //
      // var results = window.gapi.client.youtube.channels.list('contentDetails', {mine: true});
    }
  }

  userStateChange(user) {
    if (user && this.props) {
      this.setState({
        user: user
      });

      // send to parent the user
      this.props.onChange(user);
      this.gapiAuth();
    }
  }

  componentWillMount() {
    // this.usersRef = Firebase.database().ref('users');

    Firebase.auth().onAuthStateChanged(function(firebaseUser) {
      // unsubscribe();
      if (firebaseUser) {
        var userId = firebaseUser.uid;
        Firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          var user = snapshot.val();

          return this.userStateChange(user);
        }.bind(this));
      } else {
        this.userStateChange(undefined);
      }


    }.bind(this));
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.handleGoogleApi.bind(this));
  }

  render() {
    return (
      <div className="Login">
        <p>{(this.state.user? this.state.user.name : 'Entre com a sua conta do Google para começar...')}</p>
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
    // inicia o provedor de login
    var provider = new Firebase.auth.GoogleAuthProvider();

    // adiciona os escopos da authenticação
    provider.addScope('profile');
    provider.addScope('email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.addScope('https://www.googleapis.com/auth/youtube.readonly');

    Firebase.auth().signInWithPopup(provider).then((authData) => {
      Firebase.database().ref('users/' + authData.user.uid).set({
        accessToken: authData.credential.accessToken,
        idToken: authData.credential.idToken,
        email: authData.user.email,
        photoURL: authData.user.photoURL,
        name: authData.user.displayName,
        user_uid: authData.user.uid
      });
    });
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


export default Login;

import React, { Component } from 'react';
import Firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  handleGoogleApi() {
    window.gapi.client.load('youtube', 'v3', this.handleYoutube.bind(this));
    this.setState({
      gapi: true
    });

  }

  handleYoutube() {
    console.log('youtube');
    this.setState({
      youtube: true
    });
  }

  componentWillUpdate(props, state) {
    if (state.gapi && state.youtube && state.user && state.user.accessToken) {
      // reformat the token object for the Google Drive API
      var tokenObject = {
        access_token: state.user.accessToken
      };

      // set the authentication token
      window.gapi.auth.setToken(tokenObject);

      var user = this.state.user;
      user.gapiAuth = true;

      this.setState({
        user: user
      });
      //
      // var results = window.gapi.client.youtube.channels.list('contentDetails', {mine: true});
    }
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.handleGoogleApi.bind(this));
  }

  userStateChange(user) {
    if (user && this.props) {
      this.setState({
        user: user
      });

      // send to parent the user
      this.props.onChange(user);
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

    Firebase.auth().signInWithPopup(provider).then(function(authData){
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

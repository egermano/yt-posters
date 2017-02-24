import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBtsJfugUQIO6hxK5TRLknHbDjHoWG90to",
  authDomain: "yt-posters.firebaseapp.com",
  databaseURL: "https://yt-posters.firebaseio.com",
  storageBucket: "yt-posters.appspot.com",
  messagingSenderId: "340211926316"
};

Firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

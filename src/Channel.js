import React, { Component } from 'react';

class Channel extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true
  }

  render() {
    return (<div></div>);
  }
}

export default Channel;

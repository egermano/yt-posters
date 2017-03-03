import React, { Component } from 'react';

class Channel extends Component {
  constructor(props) {
    super(props);
    // https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true
    this.channels = [];
    this.state = {
      channels: []
    };
  }

  componentWillMount() {
    var getAllPages= (request) => {
      request.execute((resp) => {
        this.populateChannels(resp.items);
        var nextPageToken = resp.nextPageToken;
        if (nextPageToken) {
          request = window.gapi.client.youtube.channels.list({
            'pageToken': nextPageToken
          });
          getAllPages(request);
        }
      });
    }

    var req = window.gapi.client.youtube.channels.list({part:'snippet', mine: true});
    getAllPages(req, []);
  }

  populateChannels(items) {
    items.forEach((item) => {
      item.snippet.etag = item.etag;
      this.channels.push(item.snippet);
    });

    this.setState({
      channels: this.channels
    });
  }

  render() {
    return (<div>
      Channels
      <ul>
        {this.state.channels.map((item) => (
          <li key={item.etag}>
            {item.title}
            <img src={item.thumbnails.default.url} alt={item.title}/>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>);
  }
}

export default Channel;

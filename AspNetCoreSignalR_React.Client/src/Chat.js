import React, { Component } from 'react';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: '',
      message: '',
      messages: [],
      hubConnection: null,
    };
  }

  componentDidMount = () => {
    const nick = window.prompt('Your name:', 'John');

    //const hubConnection = new HubConnection('http://localhost:5000/chat');
      const hubConnection = new signalR.HubConnectionBuilder()
          .withUrl("http://localhost:5000/chathub")
          .configureLogging(signalR.LogLevel.Debug)
          .build();
      hubConnection.start().catch(err => {
          console.error(err.toString());
          console.dir(err);
      });

    this.setState({ hubConnection, nick }, () => {
      /*this.state.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
          .catch(err => {
              console.log('Error while establishing connection :(');
              console.dir(err);
          });*/

      this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
        const text = `${nick}: ${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
    });
  };

  sendMessage = () => {
    this.state.hubConnection
      .invoke('sendToAll', this.state.nick, this.state.message)
      .catch(err => console.error(err));

      this.setState({message: ''});      
  };

  render() {
    return (
      <div>
        <br />
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />

        <button onClick={this.sendMessage}>Send</button>

        <div>
          {this.state.messages.map((message, index) => (
            <span style={{display: 'block'}} key={index}> {message} </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Chat;

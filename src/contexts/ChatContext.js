import React from "react";
import axios from "axios";

import ENDPOINT from "../ENDPOINT";

export const ChatContext = React.createContext();

export class ChatProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      chats: []
    };

    this.setChatList = this.setChatList.bind(this);
    this.updateChat = this.updateChat.bind(this);
  }

  updateChat(chats) {
    this.setState({
      chats: chats
    });
  }

  setChatList(chat) {
    this.setState({
      chats: [chat, ...this.state.chats]
    });
  }

  componentDidMount() {
    axios
      .get(`${ENDPOINT}api/chats`)
      .then((res) => {
        this.setState({
          chats: res.data.chat,
          isLoaded: true
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    const { chats, isLoaded } = this.state;
    return (
      <ChatContext.Provider
        value={{
          isLoaded,
          chats,
          setChatList: this.setChatList,
          updateChat: this.updateChat
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}

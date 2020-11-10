import React from "react";

import { chatApi } from '../apis';

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
    const getData = async () => {
      try {
        const data = await chatApi.getChat();
        this.setState({
          chats: data.data.chat,
          isLoaded: true
        });
      } catch (err) {
        console.log(err.response.data);
      }
    } 
    getData();
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

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import classNames from "classnames";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";

import { UserContext } from "../../contexts/UserContext";
import { ChatContext } from "../../contexts/ChatContext";

import ShowTime from "../../components/ShowTime/ShowTime";

import { ReactComponent as Send } from "../../assets/images/send.svg";
import ThankImg from "../../assets/images/thank.png";

import ENDPOINT from "../../ENDPOINT";
import { socket } from "../../services/socket";
import "./Help.css";

const { TextArea } = Input;

export default function () {
  const { currentUser, setErr } = useContext(UserContext);
  const { chats, setChatList, isLoaded } = useContext(ChatContext);

  const [content, setContent] = useState("");
  const [waitingPost, setWaitingPost] = useState(false);

  const onSubmit = (e) => {
    setWaitingPost(true);
    e.preventDefault();
    axios
      .post(`${ENDPOINT}chats/handleChat`, {
        authorName: currentUser.username,
        authorId: currentUser._id,
        avatar: currentUser.avatar,
        content,
        isRead: false,
        time: new Date()
      })
      .then((res) => {
        socket.emit("user-chat", res.data.chat);
        setWaitingPost(false);
        setChatList(res.data.chat);
        setContent("");
      })
      .catch((err) => setErr(err.response.data));
  };

  const onChange = (e) => {
    setContent(e.target.value);
  };

  if (!isLoaded) {
    return (
      <div className="home wrap-content">
        <div className="loading">
          <GridLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="help wrap-content">
      <div className="container">
        <div className="help-title">
          <img className="help-img" src={ThankImg} alt="" />
          <h5>Để lại phản hồi, đánh giá cho chúng tôi.</h5>
        </div>
        <form onSubmit={onSubmit}>
          <div className="help-header d-flex">
            <img src={currentUser.avatar} alt="" />
            <TextArea
              value={content}
              placeholder="Write something..."
              allowClear
              onChange={onChange}
            />
            <Send
              onClick={onSubmit}
              className={classNames({
                show: content.length > 0 && !waitingPost
              })}
            />
          </div>
        </form>
        <div className="help-chat">
          {chats.length === 0 && (
            <div style={{ textAlign: "center" }}>Chưa có bình luận nào</div>
          )}
          {chats.length > 0 &&
            chats.map((item, index) => (
              <div className="chat-item" key={index}>
                <Link to={`/profile/${item.authorId}`}>
                  <img src={item.avatar} alt="" />
                </Link>
                <div className="chat-item-content">
                  <Link to={`/profile/${item.authorId}`}>
                    <p className="mb-1 d-block">{item.authorName}</p>
                  </Link>
                  <p>{item.content}</p>
                  <div className="chat-item-bottom">
                    <ShowTime time={item.time} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

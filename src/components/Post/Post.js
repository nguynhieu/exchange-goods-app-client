import React, { useContext, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Tooltip, Modal, Select, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

import { ReactComponent as Heart } from "../../assets/images/heart.svg";
import { ReactComponent as Exchange } from "../../assets/images/exchange.svg";
import { ReactComponent as Comment } from "../../assets/images/comment.svg";
import { ReactComponent as Love } from "../../assets/images/love.svg";
import { ReactComponent as Send } from "../../assets/images/send.svg";

import { EffectContext } from "../../contexts/EffectApp";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import { NotificationContext } from "../../contexts/Notification";
import { ExchangeContext } from "../../contexts/ExchangeContext";

import { socket } from "../../services/socket";

import ShowTime from "../ShowTime/ShowTime";
import ENDPOINT from "../../ENDPOINT";

import "./Post.css";
const { Option } = Select;

const Post = (props) => {
  const { post } = props;
  const { handleShowLayerWhite } = useContext(EffectContext);
  const { addSwiperData, setNewPosts, allPost } = useContext(PostContext);
  const { currentUser, setErr } = useContext(UserContext);
  const { setNewNotification } = useContext(NotificationContext);
  const { setExchangeList } = useContext(ExchangeContext);

  const [liking, setLiking] = useState(false);
  const [content, setContent] = useState("");
  const [isShowComments, setIsShowComments] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [postOfCurrentUser, setPostOfCurrentUser] = useState([]);
  const [postId, setPostId] = useState(null);
  const [address, setAddress] = useState("");

  const textInput = useRef(null);

  useEffect(() => {
    const posts = allPost.filter((post) => post.userId === currentUser._id);
    setPostOfCurrentUser(posts);
  }, [allPost, currentUser]);

  const handleOk = () => {
    setConfirmLoading(true);
    axios
      .post(`${ENDPOINT}exchanges/request-exchange`, {
        sender: currentUser.username,
        senderId: currentUser._id,
        viewer: post.username,
        viewerId: post.userId,
        senderPostId: postId,
        address,
        viewerPostId: post.postId,
        time: new Date()
      })
      .then((res) => {
        socket.emit("user-request-exchange", res.data);
        setExchangeList(res.data);
        setPostId(null);
        setAddress("");
        setVisible(false);
        setConfirmLoading(false);
        console.log(res.data);
      })
      .catch((err) => setErr(err.response.data));
  };

  const onChange = (value) => {
    setPostId(value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const focusInput = () => {
    textInput.current.focus();
  };

  const handleLike = (sender, viewer, postId, post) => {
    setLiking(true)
    let type;

    const indexPost = allPost.findIndex((post) => post.postId === postId);
    const likes = post.likes;

    if (post.likes.includes(sender)) {
      type = "unlike";
      likes.splice(likes.indexOf(sender), 1);
      const newPost = { ...post, likes }
      setNewPosts(newPost, indexPost)

    } else {
      type = "like";
      likes.splice(likes.indexOf(sender), 0, sender);
      const newPost = { ...post, likes }
      setNewPosts(newPost, indexPost)

    };

    axios
      .post(`${ENDPOINT}posts/like`, {
        sender,
        viewer,
        postId,
        type
      })
      .then((res) => {
        setLiking(false)
        setNewNotification(res.data.newNotifications);
        socket.emit("user-like", {
          post: res.data.newPost,
          index: res.data.indexPost,
          newNotifications: res.data.newNotifications,
          sender,
          viewer,
          postId,
          time: new Date(),
          isRead: false,
          type
        });
      })
      .catch((err) => setErr(err.response.data));
  };

  const handleComment = (sender, avatar, viewer, postId, content) => {
    axios
      .post(`${ENDPOINT}posts/comment`, {
        sender,
        avatar,
        viewer,
        postId,
        content,
        time: new Date(),
        type: "comment"
      })
      .then((res) => {
        setNewPosts(res.data.newPost, res.data.indexPost);
        socket.emit("user-comment", {
          post: res.data.newPost,
          index: res.data.indexPost,
          newNotifications: res.data.newNotifications,
          sender,
          viewer,
          postId,
          time: new Date(),
          isRead: false,
          type: "comment"
        });
      })
      .catch((err) => setErr(err.response.data));
  };

  return (
    <div className="post">
      <div className="modal-exchange">
        <Modal
          cancelText="Hủy"
          okText="Gửi yêu cầu"
          title="Trao đổi"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{ disabled: postId === null || !address }}
        >
          <p className="modal-exchange-text">
            Bạn sẽ thực hiện trao đổi hàng hóa trong bài viết ID: {post.postId}
          </p>
          <Select
            onChange={onChange}
            showSearch
            style={{ width: 200 }}
            placeholder="Chọn bài viết của bạn"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {postOfCurrentUser.length === 0 && (
              <p>
                Bạn chưa có bài viết nào, đăng bài trước để thực hiện trao đổi
              </p>
            )}
            {postOfCurrentUser.length > 0 &&
              postOfCurrentUser.map((post, index) => (
                <Option key={index} value={post.postId}>
                  {post.postId}
                </Option>
              ))}
          </Select>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ của bạn"
          />
          <p className="modal-exchange-noti">
            Nếu người kia đồng ý trao đổi, phí mà bạn sẽ đóng khi nhận được hàng
            50.000 VNĐ (chưa tính ship)
          </p>
        </Modal>
      </div>
      <div className="post-header">
        <div className="post-header-infor">
          <Link to={`/profile/${post.userId}`}>
            <img src={post.avatar} alt="avatar" />
          </Link>
          <div>
            <Link to={`/profile/${post.userId}`}>
              <span>{post.username}</span>
            </Link>
            <ShowTime time={post.time} />
          </div>
        </div>
      </div>
      <div className="post-body">
        <div className="post-id">Post ID: {post.postId}</div>
        <div className="post-type">Type: #{post.typeGoods}</div>
        <div className="post-body-caption">{post.caption}</div>
        {post.images.length > 0 && (
          <div
            onClick={() => {
              if (post.images.length) {
                handleShowLayerWhite();
                addSwiperData(post.images);
              }
            }}
            className={classNames({
              "post-body-img": true,
              "multiple-img": post.images.length > 1
            })}
          >
            {/* <ImgSlide urls={post.images} /> */}
            {post.images.length > 1 &&
              post.images.map((src, index) => (
                <img src={src} key={index} alt="" />
              ))}
            {post.images.length === 1 &&
              post.images.map((src, index) => (
                <img src={src} key={index} alt="" className="post-single-img" />
              ))}
            {post.images.length - 2 > 0 && (
              <div className="multiple-img-layer">
                +{post.images.length - 2}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-footer">
        <div className="post-reaction">
          {!post.likes.includes(currentUser.username) && (
            <Tooltip placement="right" title={"Yêu thích"}>
              <button
                className={liking ? "disable-like": ""}
                onClick={() =>
                  handleLike(
                    currentUser.username,
                    post.username,
                    post.postId,
                    post
                  )
                }
              >
                <Heart />
              </button>
            </Tooltip>
          )}
          {post.likes.includes(currentUser.username) && (
            <Tooltip placement="right" title={"Hủy yêu thích"}>
              <button
                className={liking ? "disable-like": ""}
                onClick={() =>
                  handleLike(currentUser.username, post.username, post.postId, post)
                }
              >
                <Love />
              </button>
            </Tooltip>
          )}
          <Tooltip placement="right" title={"Bình luận"}>
            <button onClick={() => focusInput()}>
              <Comment />
            </button>
          </Tooltip>
          {currentUser.username === post.username && (
            <Tooltip placement="left">
              <button
                className="post-exchange disable-color"
                disabled
                onClick={() => setVisible(true)}
              >
                <Exchange />
              </button>
            </Tooltip>
          )}
          {currentUser.username !== post.username && (
            <Tooltip placement="left" title={"Trao đổi"}>
              <button
                className="post-exchange"
                onClick={() => setVisible(true)}
              >
                <Exchange />
              </button>
            </Tooltip>
          )}
        </div>
        {
          <div className="post-count">
            <Tooltip placement="bottomLeft" title={post.likes.join(", ")}>
              <div className="post-count-like">
                <p>{post.likes.length} người thích bài viết này</p>
              </div>
            </Tooltip>
            <button
              className="post-count-comment"
              onClick={() => setIsShowComments(!isShowComments)}
            >
              <p>{post.comments.length} bình luận</p>
            </button>
          </div>
        }
        {post.comments.length > 0 && isShowComments && (
          <div className="post-comments clearfix">
            {post.comments.map((cmt, index) => (
              <div className="post-cmt" key={index}>
                <div className="post-cmt-avatar">
                  <img src={cmt.avatar} alt="" />
                </div>
                <div className="post-cmt-main">
                  <span>{cmt.username}</span>
                  <span>{cmt.content}</span>
                  <ShowTime time={cmt.time} />
                </div>
              </div>
            ))}
            <button onClick={() => setIsShowComments(false)}>
              Ẩn bình luận
            </button>
          </div>
        )}
        {currentUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleComment(
                currentUser.username,
                currentUser.avatar,
                post.username,
                post.postId,
                content
              );
              setIsShowComments(true);
              setContent("");
            }}
          >
            <div className="post-chat">
              <img src={currentUser.avatar} alt="" />
              <input
                ref={textInput}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết bình luận..."
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleComment(
                    currentUser.username,
                    currentUser.avatar,
                    post.username,
                    post.postId,
                    content
                  );
                  setIsShowComments(true);
                  setContent("");
                }}
                className={classNames({
                  show: content.length > 0
                })}
              >
                <Send />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Post;

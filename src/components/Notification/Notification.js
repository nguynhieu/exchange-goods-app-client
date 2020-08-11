import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button, Badge } from "antd";

import { ReactComponent as NotificationIcon } from "../../public/images/notification.svg";

import { NotificationContext } from "../../contexts/Notification";
import { UserContext } from "../../contexts/UserContext";

import ShowTime from "../ShowTime/ShowTime";
import ENDPOINT from "../../ENDPOINT";
import "./Notification.css";

const Notification = () => {
  const { notifications, setNewNotification } = useContext(NotificationContext);
  const { currentUser, setErr } = useContext(UserContext);

  const notificationFiltered = notifications.filter(
    (item) => item.viewer === currentUser.username
  );

  const unreadNotifications = notificationFiltered.filter(
    (item) => !item.isRead
  );

  const onClick = () => {
    axios
      .post(`${ENDPOINT}notifications/update-notification`, {
        viewer: currentUser.username
      })
      .then((res) => setNewNotification(res.data.notifications))
      .catch((err) => setErr(err.response.data));
  };

  const notiMenu = (
    <Menu>
      {notificationFiltered.length === 0 && (
        <Menu.Item>Bạn chưa có thông báo nào</Menu.Item>
      )}
      {notificationFiltered.length > 0 &&
        notificationFiltered.map((item, index) => (
          <Menu.Item className="clearfix" key={index}>
            <Link to="/">
              <div>
                <span className="notification-sender">{item.sender}</span>
                <span>đã {item.type} bài viết của bạn</span>
                <span className="notification-postId">{item.postId}</span>
                <ShowTime time={item.time} />
              </div>
            </Link>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <div className="notification">
      <Dropdown overlay={notiMenu} placement="bottomRight" trigger={["click"]}>
        <Button onClick={() => onClick()}>
          {unreadNotifications.length > 0 && (
            <Badge dot>
              <NotificationIcon />
            </Badge>
          )}
          {unreadNotifications.length === 0 && <NotificationIcon />}
        </Button>
      </Dropdown>
    </div>
  );
};

export default Notification;

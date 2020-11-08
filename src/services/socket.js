import io from "socket.io-client";

import ENDPOINT from "../ENDPOINT";

export const socket = io.connect(ENDPOINT, {
  reconnect: false
});

const getUser = () => {
  const currentUser =
    localStorage.getItem("auth") &&
    JSON.parse(localStorage.getItem("auth")).user;
  return currentUser;
};

export const updateUserSocket = (currentUser) => {
  if (currentUser) {
    socket.emit("client-update-user", currentUser.username);
  }
}

export const userLogin = () => {
  const currentUser = getUser();
  if (currentUser) {
    socket.emit("user-login", { username: currentUser.username });
  }
};

export const userLogout = () => {
  const currentUser = getUser();
  socket.emit("user-logout", { username: currentUser.username });
};

export const handleLikeSocket = (setNewPosts) => {
  return socket.on("server-send-like", (data) => setNewPosts(data.post, data.index));
}

export const handleCommentSocket = (setNewPosts) => {
  return socket.on("server-send-comment", (data) =>
    setNewPosts(data.post, data.index)
  );
}

export const handleNotiSocket = (setNewNotification) => {
  return socket.on("server-send-notification", (data) => setNewNotification(data));
}

export const handleChangeDataSocket = (setIsNewExchange, setExchangeList) => {
  return socket.on("server-exchange-data", (data) => {
    setIsNewExchange(true); 
    setExchangeList(data)
  });
}

export const handleExchangeSocket = (setIsNewExchangeAccept, notifyAccept) => {
  return socket.on("server-accept-exchange", (data) => {
    setIsNewExchangeAccept(true);
    notifyAccept(data);
  });
}

export const handleChatSocket = (setChatList) => {
  return socket.on("server-send-chat", (data) => setChatList(data));
}
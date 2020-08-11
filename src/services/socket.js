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

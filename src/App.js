import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "./configs/axios";
import { PostContext, PostProvider } from "./contexts/PostContext";
import { EffectContext, EffectProvider } from "./contexts/EffectApp";
import { UserContext, UserProvider } from "./contexts/UserContext";
import { ExchangeProvider, ExchangeContext } from "./contexts/ExchangeContext";
import {
  NotificationProvider,
  NotificationContext
} from "./contexts/Notification";
import { ChatProvider, ChatContext } from "./contexts/ChatContext";

import { socket, userLogin } from "./services/socket";
import "./styles.css";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import CreatePost from "./components/CreatePost/CreatePost";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Swiper from "./components/ImgSlide/ImgSlide";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProfileUser from "./pages/ProfileUser/ProfileUser";
import ExchangeProposal from "./pages/ExchangeProposal/ExchangeProposal";
import ExchangeProposalSent from "./pages/ExchangeProposalSent/ExchangeProposalSent";
import ManagerTransaction from "./pages/ManagerTransaction/ManagerTransaction";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import Guide from "./pages/Guide/Guide";
import Help from "./pages/Help/Help";
import Event from "./pages/Event/Event";
import Gift from "./pages/Gift/Gift";
import About from "./pages/About/About";

import { ReactComponent as Closer } from "./assets/images/close.svg";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import PostToday from "./pages/PostToday/PostToday";

function AppWrapper() {
  return (
    <EffectProvider>
      <UserProvider>
        <NotificationProvider>
          <PostProvider>
            <ExchangeProvider>
              <ChatProvider>
                <App />
              </ChatProvider>
            </ExchangeProvider>
          </PostProvider>
        </NotificationProvider>
      </UserProvider>
    </EffectProvider>
  );
}

function App() {
  const {
    isShowLayer,
    isShowNavbar,
    isShowLayerWhite,
    isShowLayerWishlist,
    handleShowNavbar,
    handleShowLayer,
    handleShowWishlist,
    handleShowLayerWhite,
    handleShowLayerWishlist
  } = useContext(EffectContext);
  const { currentUser, error, setErr } = useContext(UserContext);
  const { setDefaultSwiperData, setNewPosts } = useContext(PostContext);
  const { setNewNotification } = useContext(NotificationContext);
  const { setExchangeList } = useContext(ExchangeContext);
  const { setChatList } = useContext(ChatContext);

  const [isNewExchange, setIsNewExchange] = useState(false);
  const [isNewExchangeAccept, setIsNewExchangeAccept] = useState(false);

  const notifyErr = () => {
    toast.error(error);
    setErr(null);
  };

  const notify = () => {
    toast.info("Bạn có 1 đề xuất trao đổi mới");
    setIsNewExchange(false);
  };

  const notifyAccept = (data) => {
    toast.success(`${data.viewer} đã chấp nhận yêu cầu trao đổi của bạn`);
    setIsNewExchangeAccept(false);
  };

  useEffect(() => {
    if (currentUser) {
      userLogin();
    }
  }, [currentUser]);

  useEffect(() => {
    socket.on("server-send-like", (data) => setNewPosts(data.post, data.index));
    socket.on("server-send-comment", (data) =>
      setNewPosts(data.post, data.index)
    );
    socket.on("server-send-notification", (data) => setNewNotification(data));
    socket.on("server-exchange-data", (data) => {setIsNewExchange(true); setExchangeList(data)});
    if (currentUser) {
      socket.emit("client-update-user", currentUser.username);
    }
    socket.on("server-accept-exchange", (data) => {
      setIsNewExchangeAccept(true);
      notifyAccept(data);
    });
    socket.on("server-send-chat", (data) => setChatList(data));
  }, [setNewPosts, setNewNotification, currentUser, setChatList]);

  return (
    <Router>
      <div className="app">
        {error && notifyErr()}
        {isNewExchange && notify()}
        <ToastContainer />
        <div
          onClick={() => {
            if (isShowLayer) {
              handleShowLayer();
            } else handleShowNavbar();
          }}
          className={classNames({
            layer: true,
            show: isShowLayer || isShowNavbar
          })}
        />
        <div
          onClick={() => {
            handleShowLayerWhite();
            setDefaultSwiperData();
          }}
          className={classNames({
            "layer-white": true,
            show: isShowLayerWhite
          })}
        />
        <div
          onClick={() => {
            handleShowLayerWishlist();
            handleShowWishlist(false, false);
          }}
          className={classNames({
            "layer-2": true,
            show: isShowLayerWishlist
          })}
        />

        <div className="closer-layer-white">
          {isShowLayerWhite && (
            <Closer onClick={() => handleShowLayerWhite()} />
          )}
        </div>
        <div
          className={classNames({
            wrapper: true,
            "max-height": isShowNavbar
          })}
        >
          {isShowLayerWhite && <Swiper />}
          <Header />
          {currentUser && <CreatePost />}
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute
              exact
              path="/exchange-proposal-list"
              component={ExchangeProposal}
            />
            <PrivateRoute
              path="/manager-transactions"
              component={ManagerTransaction}
            />
            <PrivateRoute
              exact
              path="/exchange-proposal-sent"
              component={ExchangeProposalSent}
            />
            <PrivateRoute
              exact
              path="/transactions-history"
              component={TransactionHistory}
            />
            <PrivateRoute exact path="/help" component={Help} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/posts-history" component={PostToday} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute path="/profile/:userId" component={ProfileUser} />
            <PublicRoute exact path="/guide" component={Guide} />
            <PublicRoute exact path="/event" component={Event} />
            <PublicRoute exact path="/gift" component={Gift} />
            <PublicRoute exact path="/about" component={About} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default AppWrapper;

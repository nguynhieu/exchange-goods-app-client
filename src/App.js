import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "./configs/axios";
import { PostContext, PostProvider } from "./contexts/PostContext";
import { EffectContext, EffectProvider } from "./contexts/EffectApp";
import { UserContext, UserProvider } from "./contexts/UserContext";
import { ExchangeProvider, ExchangeContext } from "./contexts/ExchangeContext";
import { NotificationProvider, NotificationContext } from "./contexts/Notification";
import { ChatProvider, ChatContext } from "./contexts/ChatContext";

import { 
  socket, 
  userLogin, 
  updateUserSocket, 
  handleLikeSocket, 
  handleCommentSocket, 
  handleNotiSocket,
  handleChangeDataSocket,
  handleExchangeSocket,
  handleChatSocket
} from "./services/socket";

import { 
  Home, 
  Login, 
  Signup, 
  ProfileUser, 
  ExchangeProposal, 
  ExchangeProposalSent, 
  ManagerTransaction, 
  TransactionHistory, 
  Guide,
  Help,
  Event,
  Gift, 
  About,
  PostToday
} from './pages'

import { PublicRoute, PrivateRoute} from "./routes";

import { CreatePost, Footer, Header, Swiper, notify, notifyAccept, notifyErr } from './components'

import { ReactComponent as Closer } from "./assets/images/close.svg";

import "./styles.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    if (currentUser) {
      userLogin();
    }
  }, [currentUser]);

  useEffect(() => {
    handleLikeSocket(setNewPosts);
    handleCommentSocket(setNewPosts);
    handleNotiSocket(setNewNotification);
    handleChangeDataSocket(setIsNewExchange, setExchangeList);
    updateUserSocket(currentUser);
    handleExchangeSocket(setIsNewExchangeAccept, notifyAccept);
    handleChatSocket(setChatList);
  }, [setNewPosts, setNewNotification, currentUser, setChatList]);

  return (
    <Router>
      <div className="app">
        {error && notifyErr(error)}
        {isNewExchange && notify(setIsNewExchange)}
        <ToastContainer />
        {isShowLayer && <div
          className="layer"
          onClick={() => {
            if (isShowLayer) {
              handleShowLayer();
            } else handleShowNavbar();
          }}
        />}
        {isShowLayerWhite && <div
          className="layer-white"
          onClick={() => {
            handleShowLayerWhite();
            setDefaultSwiperData();
          }}
        />}
        {isShowLayerWishlist && <div
          className="layer-2"
          onClick={() => {
            handleShowLayerWishlist();
            handleShowWishlist(false, false);
          }}
        />}

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

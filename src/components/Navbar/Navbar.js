import React, { useContext } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";

import { EffectContext } from "../../contexts/EffectApp";
import { UserContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";
import { ExchangeContext } from "../../contexts/ExchangeContext";

import { userLogout } from "../../services/socket";

import { ReactComponent as Closer } from "../../public/images/close.svg";
import { ReactComponent as WishList } from "../../public/images/wishlist.svg";
import { ReactComponent as Exchange } from "../../public/images/exchange-icon.svg";
import { ReactComponent as Request } from "../../public/images/request.svg";
import { ReactComponent as Address } from "../../public/images/address.svg";
import { ReactComponent as Gmail } from "../../public/images/gmail.svg";
import { ReactComponent as Phone } from "../../public/images/phone.svg";
import { ReactComponent as Post } from "../../public/images/post.svg";
import { ReactComponent as History } from "../../public/images/history.svg";
import { ReactComponent as Help } from "../../public/images/help.svg";
import { ReactComponent as Guide } from "../../public/images/guide.svg";
import { ReactComponent as Manager } from "../../public/images/administrator.svg";
import Notfind from "../../public/images/notfind2.png";
import MyWishList from "../WishList/WishList";
import Logo from "../Logo/Logo";

import ENDPOINT from "../../ENDPOINT";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout, setErr } = useContext(UserContext);
  const { filterPost, setIsLoaded, setIsFilter } = useContext(PostContext);
  const { exchanges, updateExchange, isLoaded } = useContext(ExchangeContext);

  const {
    isShowNavbar,
    handleShowNavbar,
    handleShowWishlist,
    handleShowLayerWishlist
  } = useContext(EffectContext);

  const exchangesListOfUser = exchanges.filter((item) => {
    if (currentUser) {
      return item.viewer === currentUser.username && item.status === "WAITING";
    } else return false;
  });

  const exchangeSent = exchanges.filter((item) => {
    if (currentUser) {
      return item.sender === currentUser.username;
    } else return false;
  });

  const unreadExchanges = exchangesListOfUser.filter((item) => !item.isRead);

  const filterType = (type) => {
    if (type !== "all") {
      setIsFilter(true);
    } else setIsFilter(false);

    setIsLoaded(false);
    axios
      .get(`${ENDPOINT}posts/${type}`)
      .then((res) => {
        filterPost(res.data.postsFiltered);
        setIsLoaded(true);
      })
      .catch((err) => setErr(err.response.data));
  };

  const onClick = () => {
    axios
      .post(`${ENDPOINT}exchanges/update-read`, {
        viewer: currentUser.username
      })
      .then((res) => {
        updateExchange(res.data.exchanges);
      })
      .catch((err) => setErr(err.response.data));
  };

  return (
    <div
      className={classNames({
        "navbar-site": true,
        show: isShowNavbar
      })}
    >
      <MyWishList />
      <div className="navbar-header d-flex">
        {!currentUser && (
          <div className="d-flex">
            <li className="signin" onClick={() => handleShowNavbar()}>
              <Link to="/login">
                Sign in{" "}
                <span>
                  <i className="far fa-user" />
                </span>
              </Link>
            </li>
            <li className="signup" onClick={() => handleShowNavbar()}>
              <Link to="/signup">
                Sign up{" "}
                <span>
                  <i className="fas fa-map-marker-alt" />
                </span>
              </Link>
            </li>
          </div>
        )}
        {currentUser && (
          <div className="d-flex">
            <Link
              onClick={() => handleShowNavbar()}
              to={`/profile/${currentUser._id}`}
            >
              <img src={currentUser.avatar} alt="" />
            </Link>
            <li
              className="logout"
              onClick={() => {
                handleShowNavbar();
                userLogout();
                logout();
              }}
            >
              <Link to="/">
                Log out{" "}
                <span>
                  <i className="fas fa-sign-out-alt" />
                </span>
              </Link>
            </li>
          </div>
        )}
        <div>
          <button onClick={() => handleShowNavbar()}>
            <Closer />
          </button>
        </div>
      </div>
      {!currentUser && (
        <div className="navbar-body-notuser">
          <h3>Bạn cần đăng nhập để hoạt động với chúng tôi</h3>
          <img src={Notfind} alt="" />
        </div>
      )}
      {currentUser && (
        <div className="navbar-body">
          {currentUser.isAdmin === true && <li
            className="navbar-body-title admin"
            onClick={() => {
              handleShowNavbar();
            }}
          >
            <Link to="/manager-transactions">
              <span>
                <Manager />
              </span>
              Quản lý
            </Link>
          </li>}
          <li className="navbar-body-title">Loại hàng hóa</li>
          <div className="navbar-body-link" onClick={() => handleShowNavbar()}>
            <Link to="/" onClick={() => filterType("all")}>
              Tất cả
            </Link>
            <Link to="/" onClick={() => filterType("skins")}>
              Trang phục
            </Link>
            <Link to="/" onClick={() => filterType("apparatus")}>
              Đồ trang trí
            </Link>
            <Link to="/" onClick={() => filterType("machines")}>
              Máy móc - Đồ điện tử
            </Link>
            <Link to="/" onClick={() => filterType("learningTools")}>
              Học tập
            </Link>
            <Link to="/" onClick={() => filterType("travels")}>
              Du lịch - Phượt
            </Link>
            <Link to="/" onClick={() => filterType("other")}>
              Khác
            </Link>
          </div>
          <li
            className="navbar-body-title"
            onClick={() => {
              handleShowLayerWishlist();
              handleShowNavbar();
              handleShowWishlist(true);
            }}
          >
            <a href>
              <span>
                <WishList />
              </span>
              My wish list
            </a>
          </li>
          <li
            className="navbar-body-title"
            onClick={() => {
              handleShowNavbar();
              onClick();
            }}
          >
            <Link to="/exchange-proposal-list">
              <span>
                <Exchange />
              </span>
              Ds. được yêu cầu trao đổi
            </Link>
            {!isLoaded && <span class="badge badge-light ml-1">loading</span>}
            {unreadExchanges.length === 0 && isLoaded && (
              <span class="badge badge-light ml-1">
                {exchangesListOfUser.length}
              </span>
            )}
            {unreadExchanges.length > 0 && (
              <span class="badge badge-danger ml-1">
                {exchangesListOfUser.length}
              </span>
            )}
          </li>
          <li className="navbar-body-title" onClick={() => handleShowNavbar()}>
            <Link to="/exchange-proposal-sent">
              <span>
                <Request />
              </span>
              Các đề nghị trao đổi đã gửi
            </Link>
            {!isLoaded && <span class="badge badge-light ml-1">loading</span>}
            {exchangeSent.length >= 0 && (
              <span class="badge badge-light ml-1">{exchangeSent.length}</span>
            )}
          </li>
          <li className="navbar-body-title" onClick={() => handleShowNavbar()}>
            <Link to="/transactions-history">
              <span>
                <History />
              </span>
              Lịch sử giao dịch
            </Link>
          </li>
          <li className="navbar-body-title" onClick={() => handleShowNavbar()}>
            <Link to="/posts-history">
              <span>
                <Post />
              </span>
              Lịch sử đăng bài
            </Link>
          </li>
          <li className="navbar-body-title" onClick={() => handleShowNavbar()}>
            <Link to="/help">
              <span>
                <Help />
              </span>
              Trợ giúp
            </Link>
          </li>
          <li className="navbar-body-title" onClick={() => handleShowNavbar()}>
            <Link to="/guide">
              <span>
                <Guide />
              </span>
              Hướng dẫn
            </Link>
          </li>
        </div>
      )}
      <div className="navbar-footer">
        <h3>contact with us</h3>
        <li className="navbar-footer-item">
          <span>
            <Address />
          </span>
          <span>8 Hà Văn Tính, p.Hòa Khánh, tp. Đà Nẵng</span>
        </li>
        <li className="navbar-footer-item">
          <span>
            <Phone />
          </span>
          <span>0123-456-789</span>
        </li>
        <li className="navbar-footer-item">
          <span>
            <Gmail />
          </span>
          <span>tthzicc@gmail.com</span>
        </li>
        <Logo />
      </div>
    </div>
  );
};

export default Navbar;

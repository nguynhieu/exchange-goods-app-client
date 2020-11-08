import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { NavHeader, Search, Navbar, ActionUser, Notification } from '../'
import { Logo } from "../../assets/images";

import { EffectContext } from "../../contexts/EffectApp";
import { UserContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";

import ENDPOINT from "../../ENDPOINT";
import "./Header.css";

const Header = () => {
  const { handleShowNavbar } = useContext(EffectContext);
  const { currentUser, setErr } = useContext(UserContext);
  const { filterPost } = useContext(PostContext);

  const location = useLocation();

  const loadData = () => {
    axios
      .get(`${ENDPOINT}api/posts`)
      .then(res => {
        filterPost(res.data);
      })
      .catch(err => setErr(err.response.data));
  };

  return (
    <div className="header">
      <Navbar />
      <NavHeader />
      <div className="site-header container">
        <div className="site-header-inner">
          <div className="site-header-logo">
            <Link to="/" onClick={() => loadData()}>
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="site-actions">
            <div className="site-header-action">
              <Search />
              <ActionUser />
            </div>
            {!currentUser && (
              <div className="site-actions-bottom d-none d-md-flex">
                <span>Bạn chưa có danh sách mong muốn?</span>
                <Link to="/login">đăng nhập </Link>
                <span>để thêm hoặc</span>
                <Link to="/signup">đăng kí</Link>
                bây giờ
              </div>
            )}
            {currentUser && (
              <div className="site-actions-bottom d-none d-md-flex">
                <span>
                  Chào mừng đến với REI, nơi tốt nhất để trao niềm tin!
                </span>
                <Link to="/about">Xem thêm về REI {">>"}</Link>
              </div>
            )}
            {currentUser && location.pathname !== "/login" && (
              <div className="site-actions-noti d-block d-md-none">
                <Notification />
              </div>
            )}
            <div
              className="site-actions-bars d-block d-md-none"
              onClick={() => handleShowNavbar()}
            >
              <i className="fas fa-bars" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

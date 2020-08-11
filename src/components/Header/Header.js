import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import NavHeader from "../NavHeader/NavHeader";
import Search from "../Search/Search";
import ActionUser from "../ActionUser/ActionUser";
import logo from "../../public/images/logo.png";
import Navbar from "../Navbar/Navbar";

import Notification from "../Notification/Notification";

import { EffectContext } from "../../contexts/EffectApp";
import { UserContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";

import ENDPOINT from "../../ENDPOINT";
import "./Header.css";

const Header = () => {
  const { handleShowNavbar } = useContext(EffectContext);
  const { currentUser, setErr } = useContext(UserContext);
  const { filterPost } = useContext(PostContext);

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
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="site-actions">
            <div className="site-header-action">
              <Search />
              <ActionUser />
            </div>
            {!currentUser && (
              <div className="site-actions-bottom d-none d-md-flex">
                <span>No wishlist yet?</span>
                <Link to="/login">Sign in </Link>
                <span>to exchange goods with others or</span>
                <Link to="/signup">sign up</Link>
                now
              </div>
            )}
            {currentUser && (
              <div className="site-actions-bottom d-none d-md-flex">
                <span>
                  Welcome to REI, best place to trust! We never forget you have
                  a choice.
                </span>
                <Link to="/about">ABOUT REI {">>"}</Link>
              </div>
            )}
            {currentUser && (
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

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";

import { UserContext } from "../../contexts/UserContext";
import { EffectContext } from "../../contexts/EffectApp";
import { ExchangeContext } from "../../contexts/ExchangeContext";

import { ReactComponent as WishList } from "../../assets/images/wishlist.svg";
import { ReactComponent as Logout } from "../../assets/images/logout.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { ReactComponent as Exchange } from "../../assets/images/exchange-icon.svg";
import { ReactComponent as Request } from "../../assets/images/request.svg";
import { ReactComponent as History } from "../../assets/images/history.svg";
import { ReactComponent as Manager } from "../../assets/images/administrator.svg";

import Notification from "../Notification/Notification";
import { userLogout } from "../../services/socket";

import "./ActionUser.css";

const SiteAction = () => {
  const { handleShowWishlist, handleShowLayerWishlist } = useContext(
    EffectContext
  );
  const { currentUser, logout } = useContext(UserContext);
  const { exchanges, isLoaded } = useContext(ExchangeContext);

  const exchangesListOfUser = exchanges.filter((item) => {
    if (currentUser) {
      return item.viewer === currentUser.username && item.status === "WAITING";
    } else return false;
  });
  const unreadExchanges = exchangesListOfUser.filter((item) => !item.isRead);

  const exchangeSent = exchanges.filter((item) => {
    if (currentUser) {
      return item.sender === currentUser.username;
    } else return false;
  });

  const userMenu = (
    <Menu>
      {currentUser && currentUser.isAdmin === true && <Menu.Item>
        <Link to="/manager-transactions">
          <Manager />
          <span>Quản lý</span>
        </Link>
      </Menu.Item>}
      <Menu.Item>
        <Link to={currentUser && `/profile/${currentUser._id}`}>
          <User />
          <span>Hồ sơ của tôi</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleShowLayerWishlist();
          handleShowWishlist(true, false);
        }}
      >
        <a href>
          <WishList />
          <span>Wish list của thôi</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link to="/exchange-proposal-list">
          <Exchange />
          <span>Ds. được yêu cầu trao đổi</span>
          {!isLoaded && <span className="badge badge-dark ml-2">loading</span>}
          {unreadExchanges.length > 0 && (
            <span className="badge badge-danger ml-2">
              {exchangesListOfUser.length}
            </span>
          )}
          {unreadExchanges.length === 0 && (
            <span className="badge badge-dark ml-2">
              {exchangesListOfUser.length}
            </span>
          )}
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/exchange-proposal-sent">
          <Request />
          <span>Các đề nghị trao đổi đã gửi</span>
          {!isLoaded && <span class="badge badge-dark ml-1">loading</span>}
          {exchangeSent.length >= 0 && (
            <span class="badge badge-dark ml-1">{exchangeSent.length}</span>
          )}
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/transactions-history">
          <History />
          <span>Lịch sử giao dịch</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/"
          onClick={() => {
            userLogout();
            logout();
          }}
        >
          <Logout />
          <span>Đăng xuất</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="action-user">
      {!currentUser && (
        <div className="site-action-user d-none d-md-flex">
          <li className="signin">
            <Link to="/login">
              Sign in{" "}
              <span>
                <i className="far fa-user" />
              </span>
            </Link>
          </li>
          <li className="signup">
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
        <div className="site-action-user d-none d-md-flex">
          <Notification />
          <Dropdown
            overlay={userMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button>
              <img src={currentUser.avatar} alt="" />
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default SiteAction;

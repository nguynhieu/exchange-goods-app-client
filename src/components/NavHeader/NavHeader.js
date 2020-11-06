import React from "react";
import { Link } from "react-router-dom";

import "./NavHeader.css";

const NavHeader = () => {
  return (
    <div className="header-nav">
      <div className="container">
        <nav>
          <Link to="/about">REI App</Link>
          <Link to="/event">Sự kiện</Link>
          <Link to="/gift">Quà tặng</Link>
          <Link to="/help">Giúp đỡ</Link>
          <Link to="/guide">Hướng dẫn</Link>
        </nav>
      </div>
    </div>
  );
};

export default NavHeader;

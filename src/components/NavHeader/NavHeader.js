import React from "react";
import { Link } from "react-router-dom";

import "./NavHeader.css";

const NavHeader = () => {
  return (
    <div className="header-nav">
      <div className="container">
        <nav>
          <Link to="/about">About REI</Link>
          <Link to="/event">Event</Link>
          <Link to="/gift">Gift</Link>
          <Link to="/help">Help</Link>
          <Link to="/guide">Guide</Link>
        </nav>
      </div>
    </div>
  );
};

export default NavHeader;

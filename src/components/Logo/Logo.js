import React from "react";

import LogoImg from "../../assets/images/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoImg} alt="" />
    </div>
  );
};

export default Logo;

import React from "react";

import LogoImg from "../../public/images/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoImg} alt="" />
    </div>
  );
};

export default Logo;

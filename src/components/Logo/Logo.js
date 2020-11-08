import React from "react";

import { Logo } from "../../assets/images";
import "./Logo.css";

const LogoComponent = () => {
  return (
    <div className="logo">
      <img src={Logo} alt="" />
    </div>
  );
};

export default LogoComponent;

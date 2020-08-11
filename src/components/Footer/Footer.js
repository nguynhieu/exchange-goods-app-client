import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Address } from "../../public/images/address.svg";
import { ReactComponent as Gmail } from "../../public/images/gmail.svg";
import { ReactComponent as Phone } from "../../public/images/phone.svg";

import Logo from "../../public/images/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container d-md-flex">
        <div className="footer-page mt-md-3">
          <div className="footer-logo">
            <img src={Logo} alt="" />
          </div>
          <div>The best place to trust.</div>
        </div>
        <div className="footer-infor">
          <li className="footer-infor-item">
            <span>
              <Address />
            </span>
            <span>8 Hà Văn Tính, p.Hòa Khánh, tp. Đà Nẵng</span>
          </li>
          <li className="footer-infor-item">
            <span>
              <Phone />
            </span>
            <span>0123-456-789</span>
          </li>
          <li className="footer-infor-item">
            <span>
              <Gmail />
            </span>
            <span>tthzicc@gmail.com</span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Footer;

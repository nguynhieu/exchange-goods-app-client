import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";

import { ReactComponent as Warning } from "../../public/images/warning.svg";
import ENDPOINT from "../../ENDPOINT.js";
import recommend from "../../public/images/recommend.png";
import image from "../../public/images/bgr.png";
import "./Signup.css";

const Signup = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (
      username.length > 5 &&
      password.length > 5 &&
      email &&
      phone &&
      address
    ) {
      setShowBtn(true);
    } else setShowBtn(false);
  }, [username, password, email, phone, address]);

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${ENDPOINT}auth/register`, {
        username,
        password,
        email,
        phone,
        address
      })
      .then(res => {
        setError("");
        setIsLoading(false);
        Swal.fire("Success!", "Thanks for your faith", "success");
        setIsRegistered(true);
      })
      .catch(err => {
        setError(err.response.data);
        setIsLoading(false);
      });
  };

  if (isRegistered === true) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="signup">
      <div className="container">
        <div className="signup-form">
          <form onSubmit={onSubmit}>
            <div className="signup-field">
              <p>Username phải có ít nhất 6 kí tự</p>
              <input
                required
                onChange={e => {
                  setUsername(e.target.value);
                  setError("");
                }}
                name="username"
                placeholder="Username"
                className={classNames({
                  error: error === "User has already exists"
                })}
              />
              <Warning
                className={classNames({
                  show: error === "User has already exists"
                })}
              />
            </div>
            <div className="signup-field">
              <p>Password phải có ít nhất 6 kí tự</p>
              <input
                required
                onChange={e => {
                  setPassword(e.target.value);
                  setError("");
                }}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="signup-field">
              <p>Dùng để bảo vệ tài khoản</p>
              <input
                required
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                }}
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className={classNames({
                  error: error === "Email already in use"
                })}
              />
              <Warning
                className={classNames({
                  show: error === "Email already in use"
                })}
              />
            </div>
            <div className="signup-field">
              <p>Dùng để làm việc với chúng tôi</p>
              <input
                required
                onChange={e => {
                  setPhone(e.target.value);
                  setError("");
                }}
                name="phone"
                placeholder="Phone number - eg 0123456789"
                className={classNames({
                  error: error === "Phone number incorrect"
                })}
              />
              <Warning
                className={classNames({
                  show: error === "Phone number incorrect"
                })}
              />
            </div>
            <div className="signup-field">
              <p>Địa chỉ của bạn</p>
              <input
                required
                onChange={e => {
                  setAddress(e.target.value);
                }}
                name="address"
                placeholder="Street, sub-distric, distric, city"
              />
            </div>
            <button
              className={classNames({
                "show-btn": showBtn && !isLoading
              })}
            >
              <span>
                {!isLoading && "Sign up"}
                {isLoading && <PulseLoader />}
              </span>
            </button>
            {<div className="show-error">{error}</div>}
          </form>
          <div className="signup-suggest-login">
            <div>
              <img src={recommend} alt="" />
              Have an account?<Link to="/login"> Log in</Link>
            </div>
          </div>
        </div>
        <div className="signup-background d-none d-md-block">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;

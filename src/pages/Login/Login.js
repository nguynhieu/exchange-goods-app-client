import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import PulseLoader from "react-spinners/PulseLoader";

import ENDPOINT from "../../ENDPOINT.js";

import { Recommend, Background, Welcome, Warning }  from "../../assets/images";

import { UserContext } from "../../contexts/UserContext";
import { userLogin } from '../../services/socket'
import "./Login.css";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      axios
        .post(`${ENDPOINT}auth/login`, {
          email,
          password
        })
        .then(res => {
          const { auth } = res.data;
          axios.defaults.headers.common["x-access-token"] = auth.token;
          setCurrentUser(auth.user);
          localStorage.setItem("auth", JSON.stringify(auth));
          setIsLoading(false);
          setIsLogined(true);
          userLogin();
        })
        .catch(err => {
          setIsLoading(false);
          setError(err.response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const auth = localStorage.getItem("auth");
  if (auth) {
    return <Redirect to="/" />;
  }

  if (isLogined === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login-main">
          <div className="login-welcome">
            <img src={Welcome} alt="" />
          </div>
          <form onSubmit={onSubmit}>
            <div className="login-form">
              {error && (
                <div className="login-error">
                  <p>{error}</p>
                  <Warning />
                </div>
              )}
              <input
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                }}
                name="email"
                type="email"
                placeholder="email"
              />
              <input
                onChange={e => {
                  setPassword(e.target.value);
                  setError("");
                }}
                name="password"
                placeholder="password"
                type="password"
              />
              <button
                className={classNames({
                  "show-btn":
                    email && password.length > 5 && isLoading === false
                })}
              >
                {!isLoading && "Đăng nhập"}
                {isLoading && <PulseLoader />}
              </button>
            </div>
            <div className="login-suggest-signup">
              <div>
                <img src={Recommend} alt="" />
                Chưa có tài khoản? <Link to="/signup">Đăng kí ngay</Link>
              </div>
            </div>
          </form>
        </div>
        <div className="signup-background d-none d-md-block">
          <img src={Background} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;

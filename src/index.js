import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

require("dotenv").config();

const accessToken =
  localStorage.getItem("auth") &&
  JSON.parse(localStorage.getItem("auth")).token;
if (accessToken) axios.defaults.headers.common["x-access-token"] = accessToken;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

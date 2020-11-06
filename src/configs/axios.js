import axios from "axios";

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      if (err.response.data === "jwt expired") {
        axios.defaults.headers.common["x-access-token"] = "";
        localStorage.removeItem("auth");
        return Promise.reject(err);
      }
      axios.defaults.headers.common["x-access-token"] = "";
      localStorage.removeItem("auth");
      return Promise.reject(err);
    } else return Promise.reject(err);
  }
);

export default axios;

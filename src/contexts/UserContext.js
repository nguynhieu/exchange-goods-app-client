import React from "react";
import axios from "axios";

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      currentUser:
        localStorage.getItem("auth") &&
        JSON.parse(localStorage.getItem("auth")).user
    };
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.logout = this.logout.bind(this);
    this.setErr = this.setErr.bind(this);
  }

  setErr(err) {
    this.setState({
      error: err
    });
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  logout() {
    this.setState({
      currentUser: null
    });
    axios.defaults.headers.common["x-access-token"] = "";
    localStorage.removeItem("auth");
  }

  render() {
    const { currentUser, error } = this.state;
    return (
      <UserContext.Provider
        value={{
          currentUser,
          error,
          setErr: this.setErr,
          logout: this.logout,
          setCurrentUser: this.setCurrentUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

import React from "react";
import axios from "axios";

import ENDPOINT from "../ENDPOINT";

export const NotificationContext = React.createContext();

export class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };

    this.setNewNotification = this.setNewNotification.bind(this);
  }

  setNewNotification(notifications) {
    this.setState({
      notifications: notifications
    });
  }

  componentDidMount() {
    axios
      .get(`${ENDPOINT}api/notifications`)
      .then(res =>
        this.setState({
          notifications: res.data.notifications
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { notifications } = this.state;

    return (
      <NotificationContext.Provider
        value={{
          notifications,
          setNewNotification: this.setNewNotification
        }}
      >
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}

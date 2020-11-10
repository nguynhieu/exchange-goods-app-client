import React from "react";

import { notificationApi } from '../apis';

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
    const getData = async () => {
      try {
        const data = await notificationApi.getNotifications();
        this.setState({
          notifications: data.data.notifications
        })
      } catch (err) {
        console.log(err);
      }
    }
    getData();
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

import { notification } from 'antd';
import axiosClient from './axiosClient';

const notificationApi = {
  getNotifications: () => {
    const url = 'api/notifications';
    return axiosClient.get(url);
  }
}

export default notificationApi;
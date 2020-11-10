import axiosClient from './axiosClient';

const adminApi = {
  adminDecline: data => {
    const url = 'exchanges/admin-decline';
    return axiosClient.post(url, data);
  },

  adminAccept: data => {
    const url = 'exchanges/admin-accept';
    return axiosClient.post(url, data);
  }
}

export default adminApi;
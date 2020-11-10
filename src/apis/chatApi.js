import axiosClient from './axiosClient';

const chatApi = {
  setReadChat: data => {
    const url = 'chats/setReadChat'
    return axiosClient.post(url, data);
  }
}

export default chatApi;
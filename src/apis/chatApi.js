import axiosClient from './axiosClient';

const chatApi = {
  getChat: () => {
    const url = 'api/chats';
    return axiosClient.get(url);
  },
  setReadChat: data => {
    const url = 'chats/setReadChat'
    return axiosClient.post(url, data);
  }
}

export default chatApi;
import aixosClient from './axiosClient';

const userApi = {
  login: data => {
    const url = 'auth/login';
    return aixosClient.post(url, data)
  }
}

export default userApi;
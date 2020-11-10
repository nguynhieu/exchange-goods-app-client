import axiosClient from './axiosClient';

const userApi = {
  login: data => {
    const url = 'auth/login';
    return axiosClient.post(url, data)
  },
  signup: data => {
    const url = 'auth/register';
    return axiosClient.post(url, data);
  },
  userProfile: (params) => {
    const url = `api/users/${params}`;
    return axiosClient.get(url)
  }
}

export default userApi;
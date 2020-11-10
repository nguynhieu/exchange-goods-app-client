import axiosClient from './axiosClient';

const postApi = {
  createPost: data => {
    const url = 'posts';
    return axiosClient.post(url, data)
  }
}

export default postApi;
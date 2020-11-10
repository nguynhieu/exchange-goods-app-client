import axiosClient from './axiosClient';

const postApi = {
  getPosts: () => {
    const url = 'api/posts';
    return axiosClient.get(url);
  },
  createPost: data => {
    const url = 'posts';
    return axiosClient.post(url, data)
  },
  exchange: () => {
    const url = 'exchanges';
    return axiosClient.get(url)
  }
}

export default postApi;
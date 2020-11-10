import axiosClient from './axiosClient';

const wishlistApi = {
  addWishlish: data => {
    const url = 'users/add-wishlist';
    return axiosClient.post(url, data)
  },
  removeItem: data => {
    const url = 'users/deleteItem';
    return axiosClient.post(url, data)
  }
}

export default wishlistApi;
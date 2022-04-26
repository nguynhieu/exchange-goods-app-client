import axiosClient from './axiosClient'

const bannerApi = {
  getBanners: () => {
    const url = 'api/banner'
    return axiosClient.get(url)
  },

  getDetail: (id) => {
    const url = `api/banner/${id}`
    return axiosClient.get(url)
  }
}

export default bannerApi

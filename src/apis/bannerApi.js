import axiosClient from './axiosClient'

import { bannerList } from './mockData'

const bannerApi = {
  getBanners: () => {
    // const url = '/banner'
    // return axiosClient.get(url)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bannerList)
      }, 250)
    })
  },

  getDetail: (id) => {
    // const url = `banner/${id}/detail`
    // return axiosClient.get(url)

    return new Promise((resolve) => {
      setTimeout(() => {
        const matchedBanner = bannerList.find((banner) => banner.id === id)
        resolve(matchedBanner)
      }, 250)
    })
  }
}

export default bannerApi

import axiosClient from './axiosClient'

import { tourList } from './mockData'

const tourApi = {
  getTours: () => {
    // const url = '/tour'
    // return axiosClient.get(url)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tourList)
      }, 250)
    })
  },

  getDetail: (id) => {
    // const url = `tour/${id}/detail`
    // return axiosClient.get(url)

    return new Promise((resolve) => {
      setTimeout(() => {
        const matchedTour = tourList.find((tour) => tour.id === id)
        resolve(matchedTour)
      }, 250)
    })
  },

  booking: (data) => {
    // const url = 'tour/booking'
    // return axiosClient.post(url, data)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 2000)
    })
  }
}

export default tourApi

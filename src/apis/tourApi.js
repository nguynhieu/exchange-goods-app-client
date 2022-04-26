import axiosClient from './axiosClient'

const tourApi = {
  getTours: () => {
    const url = 'api/tour'
    return axiosClient.get(url)
  },

  getDetail: (id) => {
    const url = `api/tour/${id}`
    return axiosClient.get(url)
  },

  booking: (data) => {
    const url = 'api/bill'
    return axiosClient.post(url, data)
  }
}

export default tourApi

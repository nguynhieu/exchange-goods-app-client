import axiosClient from './axiosClient'
import { billList } from './mockData'

const billApi = {
  getBills: () => {
    // const url = 'bill'
    // return axiosClient.get(url)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(billList)
      }, 250)
    })
  }
}

export default billApi
import axiosClient from './axiosClient'
import { billList } from './mockData'

const billApi = {
  getBills: () => {
    const url = 'api/bill'
    return axiosClient.get(url)
  }
}

export default billApi

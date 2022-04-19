import axios from 'axios'

console.log(process.env.REACT_APP_SERVER_URL)

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'content-type': 'application/json'
  }
})

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).token

  if (config.headers) {
    config.headers['x-access-token'] = accessToken
  }

  return config
})

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      if (err.response.data === 'jwt expired') {
        axios.defaults.headers.common['x-access-token'] = ''
        localStorage.removeItem('auth')
        return Promise.reject(err)
      }
      axios.defaults.headers.common['x-access-token'] = ''
      localStorage.removeItem('auth')
      return Promise.reject(err)
    } else return Promise.reject(err)
  }
)

export default axiosClient

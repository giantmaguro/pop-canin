import axios from 'axios'
import Cookies from 'js-cookie'
import config from '~/wconfig.json'

let axiosInstance, interceptor

/**
 *
 * @returns {axios} return axios instance
 */
const getInstance = () => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: config.apiURL
      // withCredentials: true
    })
    axiosInstance.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          const allData = Cookies.get('admin')
          const token = JSON.parse(allData)
          if (token) {
            config.headers.Authorization = `${token.token}`
          }
        }
        return config
      },
      error => Promise.reject(error)
    )
  }
  return axiosInstance
}

/**
 *
 * @param { String | Boolean } token
 * @param { String } type (JWT, BEARER)
 * @param { String } scope
 */
const setToken = (token, type, scope = 'common') => {
  const value = !token ? null : (type ? type + ' ' : '') + token
  if (!value) {
    delete axiosInstance.defaults.headers[scope]['Authorization']
    return
  }
  axiosInstance.defaults.headers[scope]['Authorization'] = value
}

/**
 *
 * @param { Function } error
 * @returns { Object } response.data
 */
const setInterceptors = error => {
  // axiosInstance.interceptors.response.eject(interceptor)

  interceptor = response => {
    switch (response.status) {
      case 200:
        return response.data
        break
      case 2107:
      case 5103:
        store().dispatch('auth/adminlogout')
        window.location = '/cms/login'
        break

      default:
        return Promise.reject('error')
    }
  }

  axiosInstance.interceptors.response.use(interceptor, error =>
    Promise.reject(error)
  )
}

export { getInstance, setToken, setInterceptors }

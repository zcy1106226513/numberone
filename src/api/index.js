import store from '../store/index'
// 配置根路径
import axios from 'axios'
import { getMyArtlist } from './art'
const request = axios.create({
  baseURL: '/api' // 'http://www.liulongbin.top:3008'
})
// 请求拦截添加请求头
request.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
},
err => {
  return Promise.reject(error)
}

)
// 返回数据脱壳
request.interceptors.response.use(res => {
  const data = res.data
  if (data.code === 0) {
    return data
  } else {
    return data
  }
},
error => {
  return Promise.reject('error')
})

export default request

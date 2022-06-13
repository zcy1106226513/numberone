import request from './index'
// 登录接口
export const login = (obj) => {
  return request.post('/api/login', obj)
}
// 获取用户信息的接口
export const userInfo = () => {
  return request.get('/my/userinfo')
}
// 侧边栏接口
export const menu = () => {
  return request.get('/my/menus')
}

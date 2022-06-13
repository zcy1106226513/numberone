import request from './index'

// 获取文章列表
export const artList = () => {
  return request.get('/my/cate/list')
}
// 添加文章分类的接口
export const addartCate = (obj) => {
  return request.post('/my/cate/add', obj)
}
// 修改文章弹窗获取已有的数据
export const getMyArtlist = (id) => {
  return request.get(`/my/cate/info?id=${id}`)
}
// 修改文章数据提交
export const subMyArtlist = (obj) => {
  return request.put('/my/cate/info', obj)
}
export const deleteArt = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}
// 获取文章列表数据接口
export const getArtCateList = (obj) => {
  return request.get('/my/article/list', { params: { ...obj } })
}
// 删除文章列表数据接口
export const delArtCateList = (id) => {
  return request.delete('/my/article/info', { params: { id } })
}
// 发表文章列表数据接口
export const ArtCateListAdd = (fd) => {
  return request.post('/my/article/add', fd)
}

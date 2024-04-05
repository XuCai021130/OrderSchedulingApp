import axios from '../../axios'

// 用户登录
export function userLogin(data) {
  return axios.post(`/login`, data)
}

// 修改密码
export function updatePassword(data) {
  return axios.post('/updatePassword', data)
}

// 获取用户信息
export function getUserInfo(username){
  return axios.get('/getUserInfo?username=' + username)
}

// 新建文章
export function articles(data) {
  return axios.post(`/articles`, data)
}

// 获取文章列表
export function getArtList(data) {
  return axios.get(`/getArtList`, data)
}

// 删除文章
export function deleteArticle(id) {
  return axios.post('/deleteArticle?id=' + id)
}

// 修改文章
export function updateArticle(data) {
  return axios.post('/updateArticle', data)
}

// 获取欧派任务中心 订单下单类型 任务列表
// 获取文章列表
export function getTaskList(data) {
  return axios.get(`/getTaskList`, data)
}



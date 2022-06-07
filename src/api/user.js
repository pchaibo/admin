import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
// 取用户list
export function fetchList(query) {
  return request({
    url: 'admin/user/list',
    method: 'get',
    params: query
  })
}
// 删除
export function userdel(id) {
  return request({
    url: 'admin/user/del',
    method: 'get',
    params: { id }
  })
}
export function useradd(data) {
  return request({
    url: 'admin/user/add',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/admin/adminlist',
    method: 'post',
    query
  })
}

export function add(data) {
  console.log('dd')
}

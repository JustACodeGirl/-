import { request, requestPostJson,requestPostForm } from '../../utils'
export async function query (params) {
  return request('/api/roles/query', {
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return requestPostJson('/api/roles/add', {
    method: 'post',
    data: params,
  })
}

export async function remove (roleId) {
  return request('/api/roles/delete/?roleId='+roleId, {
    method: 'post',
  })
}

export async function edit (params) {
  return requestPostJson('/api/roles/edit', {
    method: 'post',
    data: params,
  })
}


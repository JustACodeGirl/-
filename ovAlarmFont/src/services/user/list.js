import { request, requestPostJson, requestPostForm } from '../../utils'

export async function query (params) {
  return request('/api/users/query', {
    method: 'get',
    data:params,
  })
}
export async function create (params) {
  return requestPostJson('/api/users/add', {
    method: 'post',
    data: params,
  })
}
export async function edit (params) {
  const param = {
    userCode:params.userCode,
    userName:params.userName,
    roleId:params.roleId,
    password:params.password,
    phone:params.phone,
  };
  return requestPostJson('/api/users/edit/?newPassword='+params.newPassword, {
    method: 'post',
    data: param,
  })
}

export async function remove (userId) {
  return request('/api/users/delete/?userId='+userId, {
    method: 'post'
  })
}
export async function roleQuery (params) {
  return request('/api/roles/query', {
    method: 'get',
    data: params,
  })
}

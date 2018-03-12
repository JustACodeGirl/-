import { request ,requestPostJson} from '../utils'

export async function login (params) {
  return request('/api/users/login', {
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request('/api/users/logout', {
    method: 'post',
    data: params,
  })
}

export async function userInfo (params) {
  return request('/api/users/info', {
    method: 'get',
    data: params,
  })
}
export async function editUser (params) {
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

export async function roleQuery (params) {
  return request('/api/roles/query', {
    method: 'get',
    data: params,
  })
}
export async function query (params) {
  return request('/api/recs/box', {
    method: 'get',
    data:params,
  })
}

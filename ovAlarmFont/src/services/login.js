import { requestLogin} from '../utils'

export async function login (data) {
  return requestLogin({
    url: "/api/users/login",
    method: 'post',
    data,
  })
}

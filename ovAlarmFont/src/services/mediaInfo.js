/**
 * Created by nina.zheng on 2017/5/8.
 */
import { request } from '../utils'

export async function query (params) {
  return request('/api/patients', {
    method: 'get',
    data: params,
  })
}
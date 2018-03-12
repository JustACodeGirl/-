import { request } from '../utils'


export async function query (params) {
  return request('/api/recs/query', {
    method: 'get',
    data: params
  })
}
export async function recsAction (recId) {
  return request('/api/recs/acts/?recId='+recId, {
    method: 'get',
  })
}
export async function getMediaInfo (recId) {
  return request('/api/recs/medias/?recId=' + recId, {
    method: 'get',
  })
}

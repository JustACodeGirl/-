import { request ,requestPostJson} from '../utils'

export async function query (params) {
  return request('/api/recs/box', {
    method: 'get',
    data:params,
  })
}

export async function getMediaInfo (recId) {
  return request('/api/recs/medias/?recId=' + recId, {
    method: 'get',
  })
}

export async function recsDeal (params) {
  return requestPostJson('/api/recs/deal', {
    method: 'post',
    data:params,
  })
}
export async function recsActProcess (recId) {
  return request('/api/recs/acts/?recId='+recId, {
    method: 'get',
  })
}

//const mock = {}
//
//require('fs').readdirSync(require('path').join(`${__dirname}/mock`)).forEach((file) => {
//  Object.assign(mock, require('./mock/' + file))
//})
//
//module.exports = mock


module.exports = {
  // Forward 到另一个服务器
  'GET /api/*': 'http://116.211.106.183:58080/ovAlarmService',
  'POST /api/*': 'http://116.211.106.183:58080/ovAlarmService',
  'GET /*.ts': 'http://116.211.106.187:8080',
  'GET /getVideoStream*': 'http://116.211.106.187:8080',
  'GET /getm3u8*': 'http://116.211.106.187:8080',
}

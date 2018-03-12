const qs = require('qs');
const Mock = require('mockjs');
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('SchemeList', Mock.mock({
  'data|5': [
    {
      'id|+1': 1,
      name: '@cname',
      desc: '这是一个随访方案',
      createTime: '@datetime',
      updateTime: '@datetime'
    },
  ],
  page: {
    total: 5,
    current: 1,
  },
}));

let schemeListData = global[dataKey];

module.exports = {

  'GET /api/schemes' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = Number(page.pageSize) || 10;
    const currentPage = Number(page.page) || 1;

    schemeListData.page.current = currentPage;
    let data = schemeListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    res.json({ success: true, data, page: { ...schemeListData.page, pageSize: Number(pageSize) } })
  },

};

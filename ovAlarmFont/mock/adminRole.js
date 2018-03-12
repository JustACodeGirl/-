const qs = require('qs');
const Mock = require('mockjs');
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('AdminRoleList', [
  {
    id: 1,
    name: '管理员',
    desc: '具有查看、添加、删除、修改、导出所有患者权限',
    priority: 1
  },
  {
    id: 2,
    name: '科室主任',
    desc: '本科室所有患者的查看、添加、删除、修改、导出',
    priority: 2
  },
  {
    id: 3,
    name: '主治医生',
    desc: '自己患者信息查看、添加、删除、修改、导出',
    priority: 3
  },
  {
    id: 4,
    name: '其他医生',
    desc: '添加和修改患者信息的权限',
    priority: 4
  },
]);

let adminRoleListData = global[dataKey];

module.exports = {

  'GET /api/admin/role' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = Number(page.pageSize) || 10;
    const currentPage = Number(page.page) || 1;

    let data = adminRoleListData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    res.json({ success: true, data, page: { total: 4, current: 1, pageSize: Number(pageSize) } })
  },

};

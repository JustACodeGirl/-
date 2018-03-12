const qs = require('qs');
const Cookie = require('js-cookie')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('AdminUsers', [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    name: '管理员',
    role: '管理员',
    state: 1,
  },
])

let adminUsersData = global[dataKey]

module.exports = {
  'GET /api/admin/users' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = Number(page.pageSize) || 10;
    const currentPage = Number(page.page) || 1;

    let data = adminUsersData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    res.json({ success: true, data, page: { total: 1, current: 1, pageSize: Number(pageSize) } })
  },

  'POST /api/login' (req, res) {
    const userItem = {};
    req.body.split('&').map((param) => {
      const pairs = param.split('=');
      userItem[pairs[0]] = pairs[1];
    });

    const response = {
      success: false,
      message: '',
    }
    const d = global[dataKey].filter((item) => {
      console.log(item);
      return item.username === userItem.username
    })
    if (d.length) {
      if (d[0].password === userItem.password) {
        const now = new Date()
        now.setDate(now.getDate() + 1)
        Cookie.set('user_session', now.getTime(), { path: '/' })
        Cookie.set('user_name', userItem.username, { path: '/' })
        response.message = '登录成功'
        response.success = true
      } else {
        response.message = '密码不正确'
      }
    } else {
      response.message = '用户不存在'
    }
    res.json(response)
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      username: Cookie.get('user_name') || '',
      message: '',
    }
    res.json(response)
  },

  'POST /api/logout' (req, res) {
    Cookie.remove('user_session', { path: '/' })
    Cookie.remove('user_name', { path: '/' })
    res.json({
      success: true,
      message: '退出成功',
    })
  },
}

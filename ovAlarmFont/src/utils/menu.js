module.exports = [
  {
    key: 'workbench',
    name: '工作台',
    icon: 'desktop',
  },
  {
    key: 'query',
    name: '案件查询',
    icon: 'search',
  },
  {
    key: 'user',
    name: '用户管理',
    icon: 'lock',
    clickable: true,
    child: [
      {
        key: 'role',
        name: '岗位列表',
      },
      {
        key: 'list',
        name: '用户列表',
      }
    ],
  }
]

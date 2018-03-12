import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('ScheduleList', [
  {
    id: 1,
    title: '测试1',
    start: '2017-03-19 17:00:00',
    desc: '这是一个测试数据',
    state: 'done'
  },
  {
    id: 2,
    title: '测试2',
    start: '2017-03-20 17:00:00',
    desc: '这是一个测试数据',
    state: 'done'
  },
  {
    id: 3,
    title: '测试3',
    start: '2017-03-24 17:00:00',
    desc: '这是一个测试数据',
    state: 'doing'
  }
]);

let scheduleListData = global[dataKey];

module.exports = {
  'GET /api/schedules' (req, res) {
    let data = scheduleListData
    res.json({ success: true, data })
  },
}

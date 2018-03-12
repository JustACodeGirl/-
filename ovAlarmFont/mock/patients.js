const qs = require('qs');
const Mock = require('mockjs');
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('PatientList', Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      'patientNo|+1': 20170319000,
      name: '@cname',
      result: '流行性感冒',
      'age|11-99': 1,
      isMale: '@boolean',
      birth: '@datetime("yyyy-MM-dd")',
      nativePlace: '湖北武汉',
      'marryState|1-5': 1,
      'cardType|1-4': 1,
      cardNo: /^1\d{15}$/,
      email: '',
      phone: /^1[34578]\d{9}$/,
      job: '白领',
      address: '@county(true)',
      'educate|1-5': 1,
      doctor: '@cname',
      room: '内科',
      createTime: '@datetime',
      updateTime: '@datetime'
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
}));

let patientsListData = global[dataKey];

module.exports = {

  'GET /api/patients' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = Number(page.pageSize) || 10;
    const currentPage = Number(page.page) || 1;

    let data;
    let newPage;

    let newData = patientsListData.data.concat();

    if (page.field) {
      const d = newData.filter((item) => item[page.field].indexOf(decodeURI(page.keyword)) > -1);

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage,
        total: d.length,
      }
    } else {
      data = patientsListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      patientsListData.page.current = currentPage;
      newPage = patientsListData.page;
    }
    res.json({ success: true, data, page: { ...newPage, pageSize: Number(pageSize) } })
  },

  'POST /api/patients' (req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.id = patientsListData.data.length + 1;
    patientsListData.data.unshift(newData);

    patientsListData.page.total = patientsListData.data.length;
    patientsListData.page.current = 1;

    global[dataKey] = patientsListData;

    res.json({ success: true, data: patientsListData.data, page: patientsListData.page })
  },

  'DELETE /api/patients' (req, res) {
    const deleteItem = req.body;
    patientsListData.data = patientsListData.data.filter((item) => item.id !== deleteItem.id);

    patientsListData.page.total = patientsListData.data.length;

    global[dataKey] = patientsListData;

    res.json({ success: true, data: patientsListData.data, page: patientsListData.page })
  },

  'PUT /api/patients' (req, res) {
    const editItem = qs.parse(req.body);

    editItem.updateTime = Mock.mock('@now');
    patientsListData.data = patientsListData.data.map((item) => item.id !== editItem.id ? item : Object.assign({}, item, editItem));
    global[dataKey] = patientsListData;
    res.json({ success: true, data: patientsListData.data, page: patientsListData.page })
  },

}

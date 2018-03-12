import { getCustomer, getAccountManager, getFcstWeek } from '../services/common'
import { query } from '../services/dataQuery'
import { parse } from 'qs'
import { config } from '../utils'

export default {

  namespace: 'dataQuery',

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    queryData: {},
    queryInfo: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'dataInit',
          payload: location.query,
        })
      })
    },
  },


  effects: {
    *dataInit ({ payload }, { call, put }) {
      const customers = yield call(getCustomer, {})
      const managers = yield call(getAccountManager, {})
      const fsctweeks = yield call(getFcstWeek, {})
      if (customers && managers) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: [],
            pagination: {},
            queryData: {
              customer: customers,
              accountmanager: managers,
              fcstWeekDate: fsctweeks,
            },
            queryInfo: {},
          },
        })
      }
    },
    *query ({ payload }, { call, put }) {
      const queryMes = parse(payload)
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.results,
            pagination: { current: data.data.pageNo, pageSize: data.data.pageSize, total: data.data.totalRecodes },
            queryData: {},
            queryInfo: queryMes,
          },
        })
      }
    },
    *exportTable ({ payload }, { call }) {
      let params = ''
      for (let i in payload) {
        params += (i + '=' + payload[i] + '&')
      }
      window.location.href = config.ip + '/fcst/api/export?' + params
    }
  },

  reducers: {
    querySuccess (state, action) {
      const { list, pagination, queryData, queryInfo } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        queryData: {
          ...state.queryData,
          ...queryData,
        },
        queryInfo: {
          ...state.queryInfo,
          ...queryInfo,
        },
      }
    },
  },

}

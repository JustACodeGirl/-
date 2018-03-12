import {recsAction, query ,getMediaInfo} from '../services/query'
import { handle } from '../utils/handleList'
import { parse } from 'qs'

export default {
  namespace: 'queryItem',
  state: {
    list: [],
    currentItem: {},
    currentMedial: {},
    actProcessData: {},
    modalVisible: 0,
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 条`,
      index: 0,
      count: 10,
      current: 1,
      state: null,
      total: null,
    },
    selectedRowKeys: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/query') {
          dispatch({
            type: 'query',
            payload: query,
          });
        }
      });
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      const current = parseInt(payload.page);
      if (JSON.stringify(payload) == "{}") {
        payload = {
          index: 0,
          count: 10,
        }
      }
      else {
        payload = {
          index: payload.index,
          count: payload.count,
          startTime: payload.startTime,
          endTime: payload.endTime,
          state: payload.state,
          keyword: payload.keyword,
        }
      }
      const searchItem = {
        startTime: payload.startTime,
        endTime: payload.endTime,
        state: payload.state,
        keyword: payload.keyword,
      }
      const data = yield call(query, parse(payload));
      if (data.stateCode == "SUCCESS") {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            searchItem: searchItem,
            currentMedial: {},
            pagination: {
              total: data.data.totalSize,
              current: current,
            }
          },
        })
      }
    },
    *recsActionModal ({ payload }, { select, call, put }) {
      const data = yield call(recsAction, payload.recId);
      if (data.stateCode == "SUCCESS") {
        yield put({
          type: 'recActionSuccess',
          payload: {
            actProcessData: data.data,
          },
        })
      }
    },
    *mediaInfo ({ payload }, { call, put }) {
      const data = yield call(getMediaInfo, payload.id);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentMedial: data.data,
            list: payload.datasource
          },
        })
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      let {list, pagination, searchItem, currentMedial } = action.payload;
      list = handle(list, currentMedial);
      return {...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } ,
          currentMedial:{
        ...state.currentMedial,
        ...currentMedial,
        },
        searchItem: {
        ...state.searchItem,
        ...searchItem,
        }
      }
  },
  recActionSuccess (state, action) {
    const {actProcessData} = action.payload;
    return {...state, actProcessData, modalVisible: 1}
  },

  hideModal (state) {
    return {...state, modalVisible: 0}
  },
  selectRowKeys (state, action) {
    return {...state, selectedRowKeys: [...action.payload]}
  }
},
}

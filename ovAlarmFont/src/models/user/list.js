import { create, remove, query,roleQuery } from '../../services/user/list'
import { parse } from 'qs'
import { message } from 'antd'

export default {
  namespace: 'adminLists',
  state: {
    list: [],
    roleList: [],
    currentItem: {},
    modalVisible: 0,
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 条`,
      index: 0,
      count: 10,
      current: 1,
      total: null,
    },
    selectedRowKeys: [],
    selectedRecId: null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
        return history.listen(({ pathname, query }) => {
          if (pathname === '/user/list') {
            dispatch({
              type: 'query',
              payload: query,
            });
            dispatch({
              type: 'roleQuery',
              payload: roleQuery,
            })
          }
        });
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const current = parseInt(payload.page);
      if (JSON.stringify(payload)=="{}") {
        payload = {
          index: 0,
          count: 10,
        }
      } else {
        payload = {
          index: payload.index,
          count: payload.count,
          roleId: payload.roleId,

        }
      }
      const data = yield call(query, parse(payload));
      if (data.stateCode == "SUCCESS") {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              total: data.data.totalSize,
              current: current,
            }
          },
        })
      }
    },
    *roleQuery ({ payload }, {call, put}){
      const data = yield call(roleQuery, payload);
      if (data.stateCode === 'SUCCESS') {
        yield put({
          type: 'roleQuerySuccess',
          payload: {
            roleList: data.data.list,
          },
        })
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, parse(payload));
      if(data.stateCode == "UserCodeHasExisted"){
        message.error(`用户编码已存在！`, 5);
      }else if (data.stateCode === 'SUCCESS') {
        yield put({type: 'hideModal'});
        const payload = {
          index: 0,
          count: 10,
          current:1
        }
        const data = yield call(query, parse(payload));
       if (data.stateCode == "SUCCESS") {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.list,
              pagination: {
                total: data.data.totalSize,
                current: payload.current,
              }
            },
          })
        }
    }
  },
    *remove ({ payload }, {call, put,select}){
      const data = yield call(remove, payload);
      if(data.stateCode === 'RoleHasUnfinishedRecs'){
        message.info('用户有未完成的案件！');
        return;
      } else if (data.stateCode === 'SUCCESS') {
      const payload = {
        index: 0,
        count: 10,
        current:1
      }
      const data = yield call(query, parse(payload));
      if (data.stateCode == "SUCCESS") {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              total: data.data.totalSize,
              current: payload.current,
            }
          },
        })
      }
      yield put({type: 'hideModal'});
    }
  },
},
  reducers: {
    querySuccess (state, action) {
      const { list, pagination } = action.payload;
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
        ...pagination,
      } }
     },
    roleQuerySuccess (state, action) {
      const { roleList } = action.payload;
      return { ...state,
        roleList,
      }
    },
  showAddModal (state, action) {
    return { ...state, ...action.payload, modalVisible: 1 }
 },
hideModal (state) {
  return { ...state, modalVisible: 0 }
},
selectRowKeys (state, action) {
  return { ...state, selectedRowKeys: [...action.payload]}
}
},

};

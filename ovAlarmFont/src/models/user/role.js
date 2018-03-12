import { create, remove, query, edit } from '../../services/user/role'
import { parse } from 'qs'
import { message } from 'antd'

export default {
  namespace: 'adminRoles',
  state: {
    list: [],
    currentItem: {},
    modalVisible: 0,
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 条`,
      index:0,
      count:10,
      current: 1,
      total: null,
    },
    selectedRowKeys: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/role') {
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
      if(JSON.stringify(payload)=="{}"){
        payload={
          index:0,
          count:10,
        }
      }else{
        payload={
          index:payload.index,
          count:payload.count,
        }
      }
      const data = yield call(query, parse(payload));
      if (data.stateCode=="SUCCESS") {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              total: data.data.totalSize,
              current:current,
            }
          },
        })
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, parse(payload));
      if(data.stateCode === 'SUCCESS'){
       const payload={
          index:0,
          count:10,
         current:1,
        };
        const data = yield call(query, parse(payload));
        if (data.stateCode=="SUCCESS") {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.list,
              pagination: {
                total: data.data.totalSize,
                current:payload.current,
              }
            },
          })
        };
        yield put({ type: 'hideModal' });
      }
    },
    *edit ({ payload }, { select, call, put }) {
      const data = yield call(edit, parse(payload));
      if(data.stateCode === 'SUCCESS'){
        const payload={
          index:0,
          count:10,
          current:1,
        };
        const data = yield call(query, parse(payload));
        if (data.stateCode=="SUCCESS") {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.list,
              pagination: {
                total: data.data.totalSize,
                current:payload.current,
              }
            },
          })
        };
        yield put({ type: 'hideModal' });
      }
    },
    *remove ({ payload }, {call, put,select }){
      const data = yield call(remove, payload);
      if(data.stateCode === 'RoleHasUnfinishedRecs'){
        message.info('用户有未完成的案件！');
        return;
      } else if(data.stateCode === 'SUCCESS'){
        const payload={
          index:0,
          count:10,
          current:1,
        };
        const data = yield call(query, parse(payload));
        if (data.stateCode=="SUCCESS") {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.list,
              pagination: {
                total: data.data.totalSize,
                current:payload.current,
              }
            },
          })
        };
        yield put({ type: 'hideModal' });
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
  showAddModal (state, action) {
    return { ...state, ...action.payload, modalVisible: 1 }
},
showEditModal (state, action) {
  return { ...state, ...action.payload, modalVisible: 2 }
},
hideModal (state) {
  return { ...state, modalVisible: 0 }
},
selectRowKeys (state, action) {
  return { ...state, selectedRowKeys: [...action.payload]}
}
},

};

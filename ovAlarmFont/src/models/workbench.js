import {recsDeal, query, getMediaInfo,recsActProcess } from '../services/workbench'
import { handle } from '../utils/handleList'
import { parse } from 'qs'

export default {
  namespace: 'workbench',
  state: {
    list: [],
    currentMedial: {},
    currentItem: {},
    dealOptionItem: {},
    actProcessData: {},
    modalVisible: 0,
    modalAcceptVisible: 0,
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 条`,
      index: 0,
      count: 10,
      current: 1,
      total: null,
      boxType:"TODO",
    },
    selectedRowKeys: [],
    selectedBoxType :'TODO',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
          dispatch({
            type: 'query',
            payload: query,
          });
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
          boxType:"TODO"
        }
      }else{
        payload={
          index:payload.index,
          count:payload.count,
          boxType:payload.boxType,
        }
      }
      const selectedBoxType = payload.boxType;
      const data = yield call(query, payload);
      if (data.stateCode === 'SUCCESS') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            currentMedial: {},
            selectedBoxType: selectedBoxType,
            selectedRowKeys:[],
            pagination: {
              total: data.data.totalSize,
              current: current,
              boxType:selectedBoxType,
            }
          },
        });
      }
    },

    *dealOption({ payload }, {call, put}){
      const boxType = payload.boxType;
      const data = yield call(recsDeal, payload);
      if(data.stateCode === 'SUCCESS'){
        yield put({
          type: 'hideAcceptModal',
        });
        var tr = document.getElementsByTagName("tr");
        for(var i=0;i<tr.length;i++){
          tr[i].style.backgroundColor = '#fff';
        }
        const payload={
          index:0,
          count:10,
          boxType:boxType,
          current:1
        }
        const data = yield call(query, payload);
        if (data.stateCode === 'SUCCESS') {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.list,
              selectedRowKeys:[],
              currentMedial: {},
              pagination: {
                total: data.data.totalSize,
                current: payload.current,
                boxType:boxType,
              }
            },
          });
        }

        yield put({ type: 'hideAcceptModal' });
      }
    },
    *recsDeal ({ payload }, {call, put}){
        yield put({
          type: 'showAcceptItem',
          payload: {
            dealOptionItem: payload,
          },
        });
    },
    *recsActProcess ({ payload }, {call, put}){
      const data = yield call(recsActProcess, payload);
      if(data.stateCode === 'SUCCESS'){
        yield put({
          type: 'recsActsSuccess',
          payload: {
            actProcessData: data.data,
          },
        });
      }
    },
    *mediaInfo ({ payload }, { call, put }) {
      const data = yield call(getMediaInfo, payload.id);
      if (data.stateCode === 'SUCCESS') {
        yield put({
          type: 'querySuccess',
          payload: {
            currentMedial: data.data,
            selectedRowKeys:[],
            list: payload.datasource,
            selectedBoxType: payload.boxType,
          },
        })
      }
    },
  },
  reducers: {
    querySuccess (state, action) {
      let { list, currentMedial = {}, pagination,selectedBoxType,selectedRowKeys } = action.payload;
      list = handle(list, currentMedial);
      return { ...state,
        list,
        selectedBoxType,
        selectedRowKeys,
        currentMedial: {
          ...state.currentMedial,
        ...currentMedial,
        },
        pagination: {
          ...state.pagination,
            ...pagination,
        }
      }
    },
   recsActsSuccess(state, action){
     let{actProcessData} = action.payload;
     return {...state,
       actProcessData,
       modalVisible: 1}
   },
  showAcceptItem(state, action){
    let{dealOptionItem} = action.payload;
    return {...state, dealOptionItem, modalAcceptVisible: 1}
   },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: 1 }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    hideAcceptModal (state) {
      return { ...state, modalAcceptVisible: false }
    },
    selectRowKeys (state, action) {
      return { ...state, selectedRowKeys: [...action.payload]}
}
}
}

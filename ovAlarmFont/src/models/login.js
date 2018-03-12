import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL } from '../utils'
import {  message,Alert} from 'antd'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *queryUser ({payload}, { call, put }) {
      const data = yield call(userInfo, parse(payload))
      console.log(data);
      if (data.stateCode === 'SUCCESS') {
        yield put({
          type: 'loginSuccess',
          user: {
            name: data.userCode,
          },
        })
      }else if(data.stateCode === 'NotLogin'){
        //window.location.href = "login";
        yield put(routerRedux.push('/login'))
      }
    },
    *login ({payload,}, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const data = yield call(login, payload)
      yield put({ type: 'hideLoginLoading' })
      if(data.stateCode ==='UserCodeOrPasswordWrong'){
        message.error(`用户编码或密码错误！`, 5);
        yield put({ type: 'loginFail', })
      }else if(data.stateCode ==='UserIsNotExist'){
        message.error(`用户不存在！`, 5);
        yield put({ type: 'loginFail', })
      }else if(data.stateCode === 'InvalidAccessToken'){
        message.error(`登录无效！`, 5);
        yield put({ type: 'loginFail', })
      } else if (data.stateCode === 'SUCCESS') {
        const from = queryURL('from')
        yield put({ type: 'app/queryUser' })
        if (from) {
          yield put(routerRedux.push(from))
        }
        else {
          yield put(routerRedux.push('workbench'))
        }
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}

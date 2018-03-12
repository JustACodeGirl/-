import {  login, userInfo, logout,editUser,roleQuery } from '../services/app'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { parse } from 'qs'
import { config } from '../utils'
const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {
      name:"admin3"
    },
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: [],
  },

  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'queryUser' });
      let tid;
      window.onresize = () => {clearTimeout(tid)
        tid = setTimeout(() => {dispatch({ type: 'changeNavbar' })}, 300)
      };
      dispatch({
        type: 'roleQuery',
      })
    },
  },
  effects: {
    *userInfo ({ payload }, { call, put }) {
      const data = yield call(userInfo, parse(payload));
      const roleList = payload.roleList;
      if(data.stateCode === 'SUCCESS'){
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data.data,
            roleList: roleList,
          },
        });
      }
    },
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
    *logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.stateCode === 'SUCCESS') {
        yield put({ type: 'queryUser' })
      } else {
        throw (data)
      }
    },
    *editUser ({ payload }, { call, put }) {
      const reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(reg.test(payload.data.roleId)){
        payload.data.roleId =payload.item.roleId;
      };
      if(payload.data.newPassword === undefined){
        payload.data.newPassword = '';
      }
      const data = yield call(editUser, parse(payload.data));
      if(data.stateCode === 'PasswordCanNotBeNull'){
        message.info('密码不能为空！');
      } else if(data.stateCode === 'OldPasswordIsWrong'){
        message.info('原始密码错误！');
      } else if(data.stateCode === 'UserCodeOrPasswordWrong'){
        message.info('用户编码或密码错误！');
      }else if(data.stateCode === 'UserHasNotSettedRole'){
        message.info('用户尚未设置岗位！');
      }else if(data.stateCode === 'RoleHasUnfinishedRecs'){
        message.info('用户有未完成的案件！');
      } else if(data.stateCode === 'SUCCESS'){
        yield put({ type: 'hideModal' });
      }
    },
    *roleQuery ({ payload }, {call, put}){
      const data = yield call(roleQuery, payload);
      if(data.stateCode === 'SUCCESS'){
        yield put({
          type: 'roleQuerySuccess',
          payload: {
            roleList: data.data.list,
          },
        })
      }
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: 'SUCCESS',
        loginButtonLoading: false,
    }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: 'FAIL',
      }
    },
    roleQuerySuccess (state, action) {
      const { roleList } = action.payload;
      return { ...state,
        roleList,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
    showModal (state, action) {
      action.payload.currentItem.showButton = "false";
      return { ...state, ...action.payload, modalVisible: 1 }
    },
    hideModal (state) {
      return { ...state, modalVisible: 0 }
    },
  },
}

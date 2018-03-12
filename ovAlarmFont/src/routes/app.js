import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Header from '../components/layout/header'
import UserCenterModal from '../components/layout/userCenter'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { classnames, config } from '../utils'
import { Spin } from 'antd'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import '../components/layout/common.less'

const App = ({ children, location, dispatch, app }) => {
  const { login,currentItem,modalVisible, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys ,roleList} = app;
  const { patientNo } = location.query;
  const headerProps = {
    user,
    roleList,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    showModalItem(item){
      dispatch({
        type: 'app/userInfo',
        payload: {
          currentItem: item,
          roleList: roleList,
        },
      })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
    jumpTo (pathname) {
      dispatch(routerRedux.push({ pathname }));
    },
  };

  const UserCenterModalprops = {
    item: currentItem,
    roleList,
    visible: modalVisible === 1,
    onOk (data) {
      dispatch({
        type: 'app/editUser',
        payload: {
          data:data,
          item:currentItem,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'app/hideModal',
      })
    },

  };

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  };
  const UserCenterModalGen = () =><UserCenterModal {...UserCenterModalprops} />


  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }

  return (
    <div>
      <Helmet>
        <title>{config.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={config.logo} type="image/x-icon" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread location={location} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <UserCenterModalGen />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)

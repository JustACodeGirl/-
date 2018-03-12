import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}
const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/workbench'))
          cb(null, { component: require('./routes/workbench') })
        }, 'workbench')
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login'))
            }, 'login')
          },
        }, {
          path: 'workbench',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/workbench'))
              cb(null, require('./routes/workbench'))
            }, 'workbench')
          },
        },
        {
          path: 'query',
          name: 'query',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/query'));
              cb(null, require('./routes/query'));
            }, 'query')
          },
        },
        {
          path: 'user/role',
          name: 'user/role',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/role'))
              cb(null, require('./routes/user/role'))
            }, 'user-role')
          },
        }, {
          path: 'user/list',
          name: 'user/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/list'))
              cb(null, require('./routes/user/list'))
            }, 'user-list')
          },
        }, {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers

export const createRoutes = (store) => ({
  path: '/',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], (require) => {
      callback(null, [

      ])
    })
  },

  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('../layouts/CoreLayout').default)
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], (require) => {
      callback(null, { component: require('./Todo/containers/TodoContainer').default })
    })
  },

})


export default createRoutes

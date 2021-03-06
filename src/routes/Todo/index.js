
import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'todo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
       const HomeView = require('./containers/TodoContainer').default

      // const reducer = require('./modules/Help').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'help', reducer })

      /*  Return getComponent   */
      cb(null, Todo)

      /* Webpack named bundle   */
    }, 'todo')
  },
})

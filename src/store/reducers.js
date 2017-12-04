import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import Todo from '../routes/Todo/modules'


// Fix: "React-Redux: Combining reducers: Unexpected Keys"
// http://stackoverflow.com/a/33678198/789076
const initialReducers = {
  [Todo.consts.KEY]: (state = Todo.initial) => state,
}

export const makeRootReducer = (asyncReducers) => combineReducers({
  // Add sync reducers here
  router,
  form: formReducer,
  // app reducers
  ...initialReducers,
  [Todo.consts.KEY]: Todo.reducers,
  ...asyncReducers,
})

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TITLE = 'HOME.SET_TITLE'

// ------------------------------------
// Actions
// ------------------------------------
export function setTitle(value = 'Home') {
  return {
    type: SET_TITLE,
    payload: value,
  }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */

export const setTitleAsync = value => dispatch => new Promise(resolve => setTimeout(() => {
  dispatch(setTitle(value))
  resolve()
}, 200))

export const actions = {
  setTitle,
  setTitleAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TITLE]: (state, action) => ({ ...state, title: action.payload }),
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = { logged: false, title: 'Univer/IO' }
export const homeReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
export default homeReducer

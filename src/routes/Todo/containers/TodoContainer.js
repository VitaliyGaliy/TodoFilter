import { connect } from 'react-redux'
import { actions } from '../modules/actions'
import todos from '../modules/selectors'



/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import { TodoWrapper } from '../components/TodoWrapper'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  ...actions,
}

const mapStateToProps = (state) => {
  return{
    items: todos.getItems(state),
    currentPage: todos.getCurrentPage(state),
    currentTodos: todos.getCurrentTodos(state),
    pageNumbers: todos.getPageNumbers(state)
  }}

export default connect(mapStateToProps, mapActionCreators)(TodoWrapper)

import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import clone from 'clone'

import defaultLayout from '../../config/layout'

const propTypes = {
  layout: PropTypes.object,
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  routerKey: PropTypes.number,
  store: PropTypes.object.isRequired,
}

const AppContainer = ({ layout, history, routes, routerKey, store }) => (
  <Provider store={store}>
    <div id='inProvider'>
      <Helmet {...Object.assign(clone(defaultLayout), layout)} />
      <Router history={history} children={routes} key={routerKey}/>
    </div>
  </Provider>
)

AppContainer.propTypes = propTypes
export default AppContainer

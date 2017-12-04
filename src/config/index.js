/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import environments from './environments'

const debug = _debug('app:react')

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',
  Google: {
    clientId: '',
  },
  instagram: {
    host: 'https://api.instagram.com/',
    client_id: '330b5c5ab9ed4dd39f33a9a42c2475ab',
    client_secret: '',
    redirect_uri: 'http://localhost:3000/oauth/login',
    endpoints: {
      access_token: '/oauth/access_token',
    },
  },
  //
}

// ========================================================
// Environment Configuration
// ========================================================
const overrides = environments[config.env]
if (overrides) {
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

export default config

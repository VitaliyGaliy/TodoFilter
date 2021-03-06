/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'
import ip from 'ip'

const localip = ip.address()
const debug = _debug('global app:config')
debug('Creating default configuration.')

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_public: 'dist/public',
  dir_server: 'server',
  dir_test: 'tests',
  dir_uploads: 'dist/uploads',

  // ----------------------------------
  // Entry points
  // ----------------------------------
  entry_client: 'client.js',
  entry_server: 'server.js',

  // ----------------------------------
  // App mount point config
  // ----------------------------------
  app_mount_point: {
    id: 'root',
    style: { height: '100%' },
  },

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: process.env.HOST || localip,
  server_port: process.env.PORT || 3000,
  universal: {
    enabled: false,
    output: 'server.js',
    client_info: 'client_info.json',
  },

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules: true,
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compiler_vendor: [
    'babel-polyfill',
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' },
  ],
  api: [
    { mask: /^\/v1\//, host: 'http://api.univer.io', path: '/v1/' },
    { mask: /^\/api\/usrrolemgr/, host: 'http://localhost:8080', path: '/usrrolemgr/users' },
    { mask: /^\/api\/users/, host: `http://${localip}:${process.env.PORT || 3000}/`, path: '/data/users' },
  ],
  proxy: {
    enabled: true,
    options: {
      match: /^\/(api|auth)\//,
      customHost: http => {
        let result = `http://${config.server_host}:${config.server_port}`
        for (let i = 0, len = config.api.length; i < len; i++) {
          if (http.path.match(config.api[i].mask)) {
            result = config.api[i].host
            break
          }
        }
        // console.log('custom host', http.path, result)
        return result
      },
      customPath: http => {
        let result = http.path
        for (let i = 0, len = config.api.length; i < len; i++) {
          if (http.path.match(config.api[i].mask)) {
            result = result.replace(config.api[i].mask, config.api[i].path)
            break
          }
        }
        console.log('custom path', http.path, result)
        return result
      },
    },
  },

}

/************************************************
 -------------------------------------------------

 All Internal Configuration Below
 Edit at Your Own Risk

 -------------------------------------------------
 ************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env),
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__COVERAGE__': !argv.watch && config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || ''),
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base,
  src: base.bind(null, config.dir_src),
  dist: base.bind(null, config.dir_dist),
  public: base.bind(null, config.dir_public),
  uploads: base.bind(null, config.dir_uploads),
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments').default

const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

export default config

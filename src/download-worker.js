/* @flow */
require('babel-register')
const {join} = require('path')
const {isEqual} = require('lodash')

// regular requires to absolute paths because of `threads`
const download = require(join(__dirname, 'download.js')).default
const stores = require(join(__dirname, 'stores/index.js')).default

/*::
import type {DownloadRequest} from './process-changes'
import type {StoreConfig} from './stores'

type Task = {
  req: DownloadRequest,
  store: StoreConfig
}
*/

let store = new stores.Ipfs()
let storeConfig = {
  type: 'Ipfs',
  basePath: '/'
}

module.exports = (task /*: Task */, done/*: () => void*/) => {
  if (!sameConfig(task.store, storeConfig)) {
    store = new stores[task.store.type](task.store.basePath, task.store.opts)
    storeConfig = task.store
  }

  download(task.req.tarball, task.req.shasum)
    .then((c) => store.writeFile(task.req.target, c))
    .then(done)
    .catch((err) => {
      // Escape the promise wrapper
      process.nextTick(() => {
        throw err
      })
    })
}

function sameConfig (a/*: StoreConfig*/, b/*: StoreConfig*/)/*: boolean*/ {
  if (a.type !== b.type) return false
  if (a.basePath !== b.basePath) return false

  if (!isEqual(a.opts, b.opts)) return false

  return true
}

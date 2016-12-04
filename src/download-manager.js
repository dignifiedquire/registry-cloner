/* @flow */

import {Pool} from 'threads'
import {join} from 'path'

import type {DownloadRequest} from './process-changes'
import type {StoreConfig} from './stores'

export default class DownloadManager {
  pool: Pool
  storeConfig: StoreConfig

  constructor (storeConfig: StoreConfig) {
    this.pool = new Pool()
    this.pool.run(join(__dirname, 'download-worker.js'))
    this.storeConfig = storeConfig
  }

  async download (req: DownloadRequest): Promise<void> {
    return this.pool.send({
      store: this.storeConfig,
      req: req
    }).promise()
  }
}
